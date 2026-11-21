import type { ReactNode } from "react";
import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline"
    >
      {children}
    </a>
  );
}

// このページの完成形。2つの噴き出し口から色つきの煙が出続け、マウスでかき混ぜられる
const HERO_SKETCH = `// 色つきの煙: Jos Stamの格子法（Stable Fluids）を小さな格子で動かす
const W = 72;   // 格子の列数
const H = 48;   // 格子の行数
const ITER = 10; // 連立方程式を解く反復の回数
const SIZE = (W + 2) * (H + 2); // 外周に1マスずつ壁用のマスを足す

let u, v, u0, v0;       // 速度（x方向・y方向）と作業用
let dye = [];           // 染料（赤・緑・青の3枚）
let dye0, p, div;
let img;
let speedSlider, viscSlider;

function IX(i, j) {
  return i + (W + 2) * j;
}

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  u = new Float32Array(SIZE);
  v = new Float32Array(SIZE);
  u0 = new Float32Array(SIZE);
  v0 = new Float32Array(SIZE);
  p = new Float32Array(SIZE);
  div = new Float32Array(SIZE);
  dye0 = new Float32Array(SIZE);
  for (let c = 0; c < 3; c++) dye.push(new Float32Array(SIZE));
  img = createImage(W, H);
  speedSlider = createSlider(0, 30, 16, 1);
  speedSlider.size(220);
  speedSlider.attribute('aria-label', '噴き出す速さ');
  viscSlider = createSlider(0, 20, 0, 1);
  viscSlider.size(220);
  viscSlider.attribute('aria-label', '粘性');
}

// 壁の処理。b=1はx方向の速度、b=2はy方向の速度（壁に垂直な成分を打ち消す）
function setBound(b, x) {
  for (let i = 1; i <= W; i++) {
    x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
    x[IX(i, H + 1)] = b === 2 ? -x[IX(i, H)] : x[IX(i, H)];
  }
  for (let j = 1; j <= H; j++) {
    x[IX(0, j)] = b === 1 ? -x[IX(1, j)] : x[IX(1, j)];
    x[IX(W + 1, j)] = b === 1 ? -x[IX(W, j)] : x[IX(W, j)];
  }
}

// 「各マス = 自分 + a × 上下左右」の連立方程式を、くり返し代入で解く
function linSolve(b, x, x0, a, c) {
  for (let k = 0; k < ITER; k++) {
    for (let j = 1; j <= H; j++) {
      for (let i = 1; i <= W; i++) {
        let n = IX(i, j);
        x[n] = (x0[n] + a * (x[n - 1] + x[n + 1] + x[n - W - 2] + x[n + W + 2])) / c;
      }
    }
    setBound(b, x);
  }
}

// 拡散: となりのマスと量をならす
function diffuse(b, x, x0, rate, dt) {
  let a = dt * rate * H * H;
  linSolve(b, x, x0, a, 1 + 4 * a);
}

// 移流: 各マスから流れを逆にたどり、たどり着いた場所の値を持ってくる
function advect(b, d, d0, dt) {
  let dt0 = dt * H;
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      let x = constrain(i - dt0 * u0[n], 0.5, W + 0.5);
      let y = constrain(j - dt0 * v0[n], 0.5, H + 0.5);
      let i0 = floor(x);
      let j0 = floor(y);
      let s = x - i0;
      let t = y - j0;
      let m = IX(i0, j0);
      d[n] =
        (1 - s) * ((1 - t) * d0[m] + t * d0[m + W + 2]) +
        s * ((1 - t) * d0[m + 1] + t * d0[m + W + 3]);
    }
  }
  setBound(b, d);
}

// 射影: 速度から「湧き出し・吸い込み」の成分を引き、発散を0に近づける
function project() {
  let h = 1 / H;
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      div[n] = -0.5 * h * (u[n + 1] - u[n - 1] + v[n + W + 2] - v[n - W - 2]);
      p[n] = 0;
    }
  }
  setBound(0, div);
  setBound(0, p);
  linSolve(0, p, div, 1, 4);
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      u[n] -= (0.5 * (p[n + 1] - p[n - 1])) / h;
      v[n] -= (0.5 * (p[n + W + 2] - p[n - W - 2])) / h;
    }
  }
  setBound(1, u);
  setBound(2, v);
}

// (i, j)のまわりに速度と染料を足す
function inject(i, j, vx, vy, hue, amount) {
  for (let dj = -1; dj <= 1; dj++) {
    for (let di = -1; di <= 1; di++) {
      let n = IX(constrain(i + di, 1, W), constrain(j + dj, 1, H));
      u[n] = vx;
      v[n] = vy;
      // 色相を赤・緑・青の量に分ける
      for (let c = 0; c < 3; c++) {
        dye[c][n] += amount * (0.5 + 0.5 * cos(TWO_PI * (hue - c / 3)));
      }
    }
  }
}

function draw() {
  let dt = min(deltaTime / 1000, 0.033);
  let time = millis() / 1000;
  let speed = speedSlider.value() / 10;
  let visc = viscSlider.value() / 20000;

  // 1. 外から力を加える（2つの噴き出し口とマウス）
  let sway = sin(time * 0.9) * 0.5;
  inject(22, H - 2, speed * sin(0.5 + sway), -speed * cos(0.5 + sway), time * 0.05, 0.7);
  inject(W - 21, H - 2, -speed * sin(0.5 - sway), -speed * cos(0.5 - sway), time * 0.05 + 0.45, 0.7);
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mi = floor((mouseX / width) * W) + 1;
    let mj = floor((mouseY / height) * H) + 1;
    inject(mi, mj, (mouseX - pmouseX) * 0.12, (mouseY - pmouseY) * 0.12, time * 0.05 + 0.75, 0.6);
  }

  // 2. 速度を拡散（粘性）
  if (visc > 0) {
    u0.set(u);
    v0.set(v);
    diffuse(1, u, u0, visc, dt);
    diffuse(2, v, v0, visc, dt);
  }
  // 3. 射影 → 速度自身を移流 → もう一度射影
  project();
  u0.set(u);
  v0.set(v);
  advect(1, u, u0, dt);
  advect(2, v, v0, dt);
  project();
  // 4. 染料を速度に乗せて運び、少しずつ薄める
  u0.set(u);
  v0.set(v);
  for (let c = 0; c < 3; c++) {
    dye0.set(dye[c]);
    advect(0, dye[c], dye0, dt);
    for (let n = 0; n < SIZE; n++) dye[c][n] *= 0.992;
  }

  // 格子の値を小さな画像に書き、キャンバス全体に引きのばして描く
  img.loadPixels();
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let n = IX(i + 1, j + 1);
      let k = 4 * (i + j * W);
      img.pixels[k] = 8 + 247 * (1 - exp(-dye[0][n]));
      img.pixels[k + 1] = 10 + 245 * (1 - exp(-dye[1][n]));
      img.pixels[k + 2] = 22 + 233 * (1 - exp(-dye[2][n]));
      img.pixels[k + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);

  noStroke();
  fill(255, 255, 255, 170);
  textSize(13);
  text('格子 ' + W + '×' + H + '  反復 ' + ITER + '回  ' + round(frameRate()) + ' fps', 10, 20);
  text('速さ ' + nf(speed, 1, 1) + '  粘性 ' + viscSlider.value(), 10, 38);
}`;

const VIEWS_SKETCH = `// 同じ流れを2つの見方で描く: 固定した格子の矢印と、流れに乗って動く粒子
let particles = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < 90; i++) {
    particles.push({ x: random(width), y: random(height), trail: [] });
  }
}

// 位置(x, y)・時刻tでの流れの速度。渦が横に並んでゆっくり動く
function flowAt(x, y, t) {
  let k = TWO_PI / 300;
  return {
    x: 60 * sin(k * x + t * 0.4) * cos(k * y),
    y: -60 * cos(k * x + t * 0.4) * sin(k * y),
  };
}

function draw() {
  background(225, 30, 9);
  let t = millis() / 1000;
  let dt = min(deltaTime / 1000, 0.05);

  // 格子で見る: 場所は固定で、そこを通る流れの向きと速さを矢印にする
  stroke(200, 30, 55);
  strokeWeight(1);
  for (let gy = 20; gy < height; gy += 40) {
    for (let gx = 20; gx < width; gx += 40) {
      let f = flowAt(gx, gy, t);
      line(gx, gy, gx + f.x * 0.25, gy + f.y * 0.25);
      noStroke();
      fill(200, 30, 55);
      circle(gx, gy, 3);
      stroke(200, 30, 55);
    }
  }

  // 粒子で追う: 粒子が流れに乗って動き、通った道すじを残す
  for (let q of particles) {
    let f = flowAt(q.x, q.y, t);
    q.x += f.x * dt;
    q.y += f.y * dt;
    // 画面の外へ出たら、どこかに置き直す
    if (q.x < 0 || q.x > width || q.y < 0 || q.y > height) {
      q.x = random(width);
      q.y = random(height);
      q.trail = [];
    }
    q.trail.push({ x: q.x, y: q.y });
    if (q.trail.length > 40) q.trail.shift();
    noFill();
    stroke(35, 80, 100, 60);
    strokeWeight(1.5);
    beginShape();
    for (let s of q.trail) vertex(s.x, s.y);
    endShape();
    noStroke();
    fill(35, 60, 100);
    circle(q.x, q.y, 5);
  }

  noStroke();
  fill(200, 30, 80);
  textSize(13);
  text('矢印: 格子（場所を固定して見る）', 12, 20);
  fill(35, 60, 100);
  text('点と線: 粒子（流れに乗って追う）', 12, 38);
}

function mousePressed() {
  // クリックした場所に粒子を足す
  particles.push({ x: mouseX, y: mouseY, trail: [] });
}`;

const DIFFUSE_SKETCH = `const W = 60;
const H = 40;
const SIZE = (W + 2) * (H + 2);
let d, d0, img, slider;

function IX(i, j) {
  return i + (W + 2) * j;
}

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  noSmooth(); // マス目が見えるよう、ぼかさずに拡大する
  d = new Float32Array(SIZE);
  d0 = new Float32Array(SIZE);
  img = createImage(W, H);
  slider = createSlider(0, 40, 8, 1);
  slider.size(260);
  slider.attribute('aria-label', '拡散の速さ');
}

function drop(i, j) {
  for (let dj = -1; dj <= 1; dj++) {
    for (let di = -1; di <= 1; di++) {
      d[IX(constrain(i + di, 1, W), constrain(j + dj, 1, H))] += 4;
    }
  }
}

function draw() {
  let dt = min(deltaTime / 1000, 0.033);
  // 1秒ごとに、どこかへ染料を落とす
  if (frameCount % 60 === 1) {
    drop(floor(noise(frameCount) * W) + 1, floor(noise(frameCount + 500) * H) + 1);
  }

  // 拡散: 「拡散後の値 = 拡散前の値 + a × (上下左右の合計 - 4 × 自分)」を
  // 拡散後の値について解く。くり返し代入で少しずつ正しい値に近づける
  let a = dt * (slider.value() / 10000) * H * H;
  d0.set(d);
  for (let k = 0; k < 10; k++) {
    for (let j = 1; j <= H; j++) {
      for (let i = 1; i <= W; i++) {
        let n = IX(i, j);
        d[n] = (d0[n] + a * (d[n - 1] + d[n + 1] + d[n - W - 2] + d[n + W + 2])) / (1 + 4 * a);
      }
    }
  }

  img.loadPixels();
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let s = 1 - exp(-d[IX(i + 1, j + 1)]);
      let k = 4 * (i + j * W);
      img.pixels[k] = 10 + 240 * s * s;
      img.pixels[k + 1] = 14 + 220 * s;
      img.pixels[k + 2] = 30 + 200 * sqrt(s);
      img.pixels[k + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);

  noStroke();
  fill(255, 255, 255, 200);
  textSize(13);
  text('拡散の速さ ' + slider.value() + '（クリックで染料を落とす）', 10, 20);
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    drop(floor((mouseX / width) * W) + 1, floor((mouseY / height) * H) + 1);
  }
}`;

const ADVECT_SKETCH = `const W = 60;
const H = 40;
const SIZE = (W + 2) * (H + 2);
let d, d0, u, v, img;

function IX(i, j) {
  return i + (W + 2) * j;
}

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  d = new Float32Array(SIZE);
  d0 = new Float32Array(SIZE);
  u = new Float32Array(SIZE);
  v = new Float32Array(SIZE);
  img = createImage(W, H);
  // 速度は変化させず、中心のまわりを回る渦に固定する（中心に近いほど速く回る）
  for (let j = 0; j <= H + 1; j++) {
    for (let i = 0; i <= W + 1; i++) {
      let x = i - W / 2;
      let y = j - H / 2;
      let w = 1.6 / (1 + (x * x + y * y) / 60);
      u[IX(i, j)] = (-y * w) / H;
      v[IX(i, j)] = (x * w) / H;
    }
  }
}

function draw() {
  let dt = min(deltaTime / 1000, 0.033);
  // 7秒ごとに消して、横一本の染料の帯を置き直す
  if (frameCount % 420 === 1) {
    d.fill(0);
    for (let i = 6; i <= 55; i++) {
      for (let j = 19; j <= 22; j++) d[IX(i, j)] = 2;
    }
  }

  // 移流: マス(i, j)の新しい値は、流れを逆にdtだけたどった場所の値
  d0.set(d);
  let dt0 = dt * H;
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      let x = constrain(i - dt0 * u[n], 0.5, W + 0.5);
      let y = constrain(j - dt0 * v[n], 0.5, H + 0.5);
      // たどり着いた場所はマスの中間なので、まわり4マスの値を距離に応じて混ぜる
      let i0 = floor(x);
      let j0 = floor(y);
      let s = x - i0;
      let t = y - j0;
      let m = IX(i0, j0);
      d[n] =
        (1 - s) * ((1 - t) * d0[m] + t * d0[m + W + 2]) +
        s * ((1 - t) * d0[m + 1] + t * d0[m + W + 3]);
    }
  }

  img.loadPixels();
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let s = 1 - exp(-d[IX(i + 1, j + 1)] * 1.2);
      let k = 4 * (i + j * W);
      img.pixels[k] = 10 + 245 * s;
      img.pixels[k + 1] = 14 + 180 * s * s;
      img.pixels[k + 2] = 30 + 90 * s;
      img.pixels[k + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);

  // マウスの下のマスについて、逆にたどる道すじを描く（見やすいよう30倍に伸ばす）
  let cw = width / W;
  let inside = mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
  let mi = inside ? floor(mouseX / cw) + 1 : 40;
  let mj = inside ? floor(mouseY / cw) + 1 : 12;
  let n = IX(mi, mj);
  let px = (mi - 0.5) * cw;
  let py = (mj - 0.5) * cw;
  stroke(160, 255, 255);
  strokeWeight(2);
  line(px, py, px - u[n] * dt0 * 30 * cw, py - v[n] * dt0 * 30 * cw);
  noFill();
  rect(px - cw / 2, py - cw / 2, cw, cw);
  fill(160, 255, 255);
  noStroke();
  circle(px - u[n] * dt0 * 30 * cw, py - v[n] * dt0 * 30 * cw, 6);
  fill(255, 255, 255, 200);
  textSize(13);
  text('四角: いま計算するマス  丸: 値を取ってくる場所', 10, 20);
}`;

const PROJECT_SKETCH = `const W = 60;
const H = 40;
const SIZE = (W + 2) * (H + 2);
let u, v, u0, v0, d, d0, p, div, img, box;

function IX(i, j) {
  return i + (W + 2) * j;
}

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  u = new Float32Array(SIZE);
  v = new Float32Array(SIZE);
  u0 = new Float32Array(SIZE);
  v0 = new Float32Array(SIZE);
  d = new Float32Array(SIZE);
  d0 = new Float32Array(SIZE);
  p = new Float32Array(SIZE);
  div = new Float32Array(SIZE);
  img = createImage(W, H);
  box = createCheckbox(' 射影する（発散を0に近づける）', true);
}

function setBound(b, x) {
  for (let i = 1; i <= W; i++) {
    x[IX(i, 0)] = b === 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
    x[IX(i, H + 1)] = b === 2 ? -x[IX(i, H)] : x[IX(i, H)];
  }
  for (let j = 1; j <= H; j++) {
    x[IX(0, j)] = b === 1 ? -x[IX(1, j)] : x[IX(1, j)];
    x[IX(W + 1, j)] = b === 1 ? -x[IX(W, j)] : x[IX(W, j)];
  }
}

function advect(b, q, q0, dt) {
  let dt0 = dt * H;
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      let x = constrain(i - dt0 * u0[n], 0.5, W + 0.5);
      let y = constrain(j - dt0 * v0[n], 0.5, H + 0.5);
      let i0 = floor(x);
      let j0 = floor(y);
      let s = x - i0;
      let t = y - j0;
      let m = IX(i0, j0);
      q[n] =
        (1 - s) * ((1 - t) * q0[m] + t * q0[m + W + 2]) +
        s * ((1 - t) * q0[m + 1] + t * q0[m + W + 3]);
    }
  }
  setBound(b, q);
}

function project() {
  let h = 1 / H;
  // 発散: そのマスから出ていく流れ - 入ってくる流れ
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      div[n] = -0.5 * h * (u[n + 1] - u[n - 1] + v[n + W + 2] - v[n - W - 2]);
      p[n] = 0;
    }
  }
  setBound(0, div);
  // 発散を打ち消す「圧力」pを、くり返し代入で求める
  for (let k = 0; k < 20; k++) {
    for (let j = 1; j <= H; j++) {
      for (let i = 1; i <= W; i++) {
        let n = IX(i, j);
        p[n] = (div[n] + p[n - 1] + p[n + 1] + p[n - W - 2] + p[n + W + 2]) / 4;
      }
    }
    setBound(0, p);
  }
  // 圧力の坂（勾配）を速度から引く
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      let n = IX(i, j);
      u[n] -= (0.5 * (p[n + 1] - p[n - 1])) / h;
      v[n] -= (0.5 * (p[n + W + 2] - p[n - W - 2])) / h;
    }
  }
  setBound(1, u);
  setBound(2, v);
}

function draw() {
  let dt = min(deltaTime / 1000, 0.033);
  // 左の壁ぎわから右向きに吹き出す
  for (let k = -2; k <= 2; k++) {
    let n = IX(4, H / 2 + k);
    u[n] = 1.4;
    v[n] = 0.25 * sin(millis() / 700);
    d[n] = 1.5;
  }

  if (box.checked()) project();
  u0.set(u);
  v0.set(v);
  advect(1, u, u0, dt);
  advect(2, v, v0, dt);
  if (box.checked()) project();
  u0.set(u);
  v0.set(v);
  d0.set(d);
  advect(0, d, d0, dt);
  for (let n = 0; n < SIZE; n++) d[n] *= 0.995;

  img.loadPixels();
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let s = 1 - exp(-d[IX(i + 1, j + 1)] * 1.5);
      let k = 4 * (i + j * W);
      img.pixels[k] = 10 + 120 * s * s;
      img.pixels[k + 1] = 14 + 200 * s;
      img.pixels[k + 2] = 30 + 225 * s;
      img.pixels[k + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);

  // 3マスおきに、速度を短い線で描く
  let cw = width / W;
  stroke(255, 255, 255, 150);
  strokeWeight(1);
  for (let j = 2; j <= H; j += 3) {
    for (let i = 2; i <= W; i += 3) {
      let n = IX(i, j);
      let x = (i - 0.5) * cw;
      let y = (j - 0.5) * cw;
      line(x, y, x + u[n] * 14, y + v[n] * 14);
    }
  }
}`;

const th = "text-left p-3 font-semibold";
const rowTh = "text-left p-3 font-normal";

export default function Fluids() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 25</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          流体
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          煙や水の流れを、キャンバスを格子に区切って計算します。使うのはJos
          Stamが1999年のSIGGRAPHで発表した「Stable
          Fluids」の手順です。下の枠では、2つの噴き出し口から色つきの煙が出続けています。
          枠の中でマウスを動かすと、その向きに流れが生まれて煙がかき混ぜられます。
        </p>

        <CodePreview
          title="色つきの煙（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          上のスライダーは噴き出す速さ、下のスライダーは粘性です。粘性を上げると、渦が育ちにくいねっとりした流れになります。
          コードは長く見えますが、中身は「拡散」「移流」「射影」の3つの関数です。このページで1つずつ動かします。
        </p>

        <WhyNowBox
          title="なぜ流体を格子で計算するのか"
          tags={["格子法", "拡散", "移流", "射影", "Stable Fluids"]}
        >
          <p>
            パーティクルは1粒ずつ独立に動かせましたが、流体は「となりを押すと、その先も動く」というつながりを持ちます。
            キャンバスを格子に区切り、マスごとに速度と煙の濃さを持たせると、このつながりを「となりのマスとのやりとり」として計算できます。
            前のページで見た「小さな刻みで少しずつ進める」考え方を、1点から面全体に広げたものです。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              流れの2つの見方: 格子で見る・粒子で追う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              流れの表し方には2つあります。場所を固定して「そこを通る流れ」を見るのがオイラー的な見方、流れに乗って動く1点を追いかけるのがラグランジュ的な見方です。
              川にたとえると、前者は岸に座って目の前を通る水を見ること、後者は舟に乗って流されることにあたります。
              下のスケッチは同じ流れを両方で描いています。クリックすると、その場所に粒子が増えます。
            </p>
            <CodePreview
              title="同じ流れを矢印と粒子で描く"
              language="js"
              code={VIEWS_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              矢印は動きませんが、向きと長さが変わります。粒子は場所そのものが変わります。
              このページでは格子（オイラー的な見方）で計算し、移流の計算でだけ「流れをたどる」ラグランジュ的な考えを借ります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ナビエ–ストークス方程式の各項を読む
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              流体の速度uがどう変わるかは、ナビエ–ストークス方程式で表されます。縮まない（非圧縮の）流体では次の形になります。
            </p>
            <div className="rounded-xl border border-border bg-card p-5 my-4 overflow-x-auto">
              <p className="font-mono text-foreground text-center whitespace-nowrap">
                ∂u/∂t = −(u·∇)u − (1/ρ)∇p + ν∇²u + f　　かつ　　∇·u = 0
              </p>
            </div>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className={th}>
                      項
                    </th>
                    <th scope="col" className={th}>
                      意味
                    </th>
                    <th scope="col" className={th}>
                      このページの関数
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      −(u·∇)u
                    </th>
                    <td className="p-3">
                      移流。速度が流れ自身に乗って運ばれる
                    </td>
                    <td className="p-3 font-mono">advect</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      ν∇²u
                    </th>
                    <td className="p-3">
                      拡散。粘性νによって、となりとの速度の差がならされる
                    </td>
                    <td className="p-3 font-mono">diffuse</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      f
                    </th>
                    <td className="p-3">外から加える力。噴き出し口やマウス</td>
                    <td className="p-3 font-mono">inject</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      −(1/ρ)∇p
                    </th>
                    <td className="p-3">
                      圧力pの勾配。流体が集まりすぎた所から押し戻す働きをする
                    </td>
                    <td className="p-3 font-mono">project</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      ∇·u = 0
                    </th>
                    <td className="p-3">
                      発散が0。どのマスでも、入る量と出る量が等しい（縮まない）
                    </td>
                    <td className="p-3 font-mono">project</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Stamの方法は、この式を一度に解かず、1フレームのあいだに「力を加える → 拡散 → 移流 →
              射影」を順に行います。それぞれを、大きな時間刻みでも値が発散しない形で解くのが要点です。
              ゲーム向けの解説論文は目的を「Our solvers on the other hand are
              geared towards visual quality. Our emphasis is on stability and
              speed, which means that our simulations can be advanced with
              arbitrary time steps.」と書いています。物理的な正確さより、見た目と安定性と速さを優先した方法です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階1: 拡散だけ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              まず速度は考えず、染料がにじんで広がる拡散だけを計算します。各マスは上下左右のマスと染料をやりとりし、濃い所から薄い所へ移っていきます。
              1秒ごとにどこかへ染料が落ち、クリックした場所にも落とせます。マス目が見えるよう、ぼかさずに描いています。
            </p>
            <CodePreview
              title="染料の拡散"
              language="js"
              code={DIFFUSE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              「いまの値にとなりとの差を足す」と素直に書くと、拡散が速いときに値が振動して壊れます。Stamの論文はこの書き方について「For
              large diffusion rates a the density values start to oscillate,
              become negative and finally
              diverge」と書いています。そこで「拡散した後の値」を未知数とする連立方程式を立て、
              くり返し代入（ガウス–ザイデル法）で解きます。スケッチの
              <code className={code}>for (let k = 0; k &lt; 10; k++)</code>
              がそのくり返しです。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>スライダーを右端にする（落ちた染料がすぐ全体に広がる）</li>
                <li>
                  <code className={code}>k &lt; 10</code>
                  を1にする（くり返しが足りず、広がり方が鈍くなる）
                </li>
                <li>
                  <code className={code}>noSmooth()</code>
                  の行を消す（マスの境目がぼけて、なめらかな煙に見える）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階2: 速度による移流
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              次に、染料を流れに乗せて運びます。ここでは速度を「中心のまわりを回る渦」に固定しています。
              移流の計算は、各マスから流れを逆向きにdtだけたどり、たどり着いた場所の値を持ってくる方法です。
              たどり着く先はマスの中間になるので、まわり4マスの値を距離に応じて混ぜます。
              格子の上で粒子の動きをたどるので、セミラグランジュ法と呼ばれます。
            </p>
            <CodePreview
              title="固定した渦で染料を運ぶ"
              language="js"
              code={ADVECT_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              横一本の帯が、中心に近いほど速く回る渦に巻き取られていきます。マウスを載せたマス（四角）について、値を取ってくる場所（丸）を線で結んでいます。
              帯がだんだんぼやけるのは、4マスの値を混ぜる計算をくり返すからです。これは実際の拡散ではなく、計算方法が生む「数値的な拡散」です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階3: 射影で渦のある流れにする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最後に、速度そのものも流れに乗せて運びます。ただし運んだだけの速度は、あるマスに流れが集まりすぎたり、湧き出したりします。
              射影は、各マスの発散（出る量−入る量）を打ち消す圧力を求め、その勾配を速度から引く処理です。
              Stamの論文はこの処理について「Visually it forces the flow to have many
              vortices which produce realistic swirly-like
              flows.」と書いています。チェックを外すと、射影なしの流れと比べられます。
            </p>
            <CodePreview
              title="射影あり・なしを比べる"
              language="js"
              code={PROJECT_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              射影ありでは、吹き出した流れが壁に当たる前から左右に分かれ、渦を巻いて戻ってきます。白い短い線が各マスの速度です。
              射影なしでは、流れはまっすぐ進むだけで、まわりの流体を押しのけません。
              冒頭のスケッチは、この3段階に粘性の拡散と色を足したものです。
            </p>
            <InfoBox type="warning" title="式の「発散0」と、計算で得られる値">
              <p>
                式の上では発散はちょうど0ですが、スケッチの中の発散は0に近い値にとどまります。
                理由は、圧力を求めるくり返し代入を決まった回数（20回）で打ち切っているからです。
                回数を増やすほど0に近づき、そのぶん計算は重くなります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              粘性とレイノルズ数
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              流れがなめらかになるか乱れるかの目安に、レイノルズ数Re = ρvL /
              μがあります。ρは密度、vは速さ、Lは代表的な長さ、μは粘性係数で、慣性の力と粘性の力の比を表します。
              レイノルズ数が小さいと層になって流れる層流に、大きいと乱流になりやすくなります。
              円管の中の流れでは、およそ2300より小さいと層流、2900より大きいと乱流になることが実験で知られています。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              冒頭のスケッチで速さを下げて粘性を上げると（レイノルズ数を下げる向き）、渦が育たずに煙がまとまって流れます。
              逆に粘性0で速さを上げると、渦が次々に生まれます。
              ただしこのスケッチには数値的な拡散が含まれるので、スライダーの値から実際のレイノルズ数は求められません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              現場ではどう使われているか
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
              <li>
                流れを数値で解く分野は数値流体力学（CFD）と呼ばれます。
                <Ext href="https://en.wikipedia.org/wiki/Computational_fluid_dynamics">
                  Wikipedia「Computational fluid dynamics」
                </Ext>
                は用途として、空気力学と航空宇宙、気象のシミュレーション、環境工学、産業機器の設計、エンジンと燃焼の解析、映画やゲームの視覚効果などを挙げています。
              </li>
              <li>
                同じ記事は、解析ソフトの最初の検証には風洞などの実験装置が使われると書いています。計算は実験を置き換えるものではなく、互いに確かめ合う関係です。
              </li>
              <li>
                Stamの論文は映像とゲームのための方法です。SIGGRAPHの論文「Stable
                Fluids」は、煙・水・炎を表現する特殊効果での需要を背景に挙げています。論文は
                <Ext href="https://www.dgp.toronto.edu/public_user/stam/reality/Research/pub.html">
                  Stamの論文一覧
                </Ext>
                から読めます。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このシミュレーションの限界
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>2次元で、格子は72×48マスです。実務の解析は3次元で、マスの数もこれよりずっと多くなります</li>
              <li>
                数値的な拡散で、細かい渦がすぐにならされます。乱流の細部は再現できません
              </li>
              <li>
                圧力のくり返し計算を決まった回数で打ち切るので、発散は0に近いだけで、0にはなりません
              </li>
              <li>
                壁は四方を閉じた箱だけです。物体のまわりの流れ、温度による浮力、水面は扱っていません
              </li>
              <li>
                実験や理論との照合（検証）をしていません。見た目がそれらしいことと、数値が正しいことは別です
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              この方法は見た目と安定性を優先して作られたもので、力や圧力の値を設計に使う解析ソフトと同じ精度ではありません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="流れを逆にたどる"
              description="___ を埋めて、染料が流れに乗って右へ運ばれるようにしてください。x方向とy方向の速度を入れます。"
              preview
              initialCode={`const W = 60;
const H = 40;
let d = new Float32Array((W + 2) * (H + 2));
let d0 = new Float32Array((W + 2) * (H + 2));
let img;

function IX(i, j) {
  return i + (W + 2) * j;
}

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  img = createImage(W, H);
}

function draw() {
  let dt0 = min(deltaTime / 1000, 0.033) * H;
  // 左はしの3マスから染料を出す
  for (let k = -1; k <= 1; k++) d[IX(2, 20 + k)] = 2;
  d0.set(d);
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      // 流れの速度: 右向きで、上下にうねる
      let u = 0.5;
      let v = 0.3 * sin(i * 0.3 + frameCount * 0.03);
      // 流れを逆にたどった場所
      let x = constrain(i - dt0 * ___, 0.5, W + 0.5);
      let y = constrain(j - dt0 * ___, 0.5, H + 0.5);
      let i0 = floor(x);
      let j0 = floor(y);
      let s = x - i0;
      let t = y - j0;
      let m = IX(i0, j0);
      d[IX(i, j)] =
        (1 - s) * ((1 - t) * d0[m] + t * d0[m + W + 2]) +
        s * ((1 - t) * d0[m + 1] + t * d0[m + W + 3]);
    }
  }
  img.loadPixels();
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let c = 1 - exp(-d[IX(i + 1, j + 1)] * 1.5);
      let k = 4 * (i + j * W);
      img.pixels[k] = 10 + 120 * c * c;
      img.pixels[k + 1] = 14 + 200 * c;
      img.pixels[k + 2] = 30 + 225 * c;
      img.pixels[k + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);
}`}
              answer={`const W = 60;
const H = 40;
let d = new Float32Array((W + 2) * (H + 2));
let d0 = new Float32Array((W + 2) * (H + 2));
let img;

function IX(i, j) {
  return i + (W + 2) * j;
}

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  img = createImage(W, H);
}

function draw() {
  let dt0 = min(deltaTime / 1000, 0.033) * H;
  // 左はしの3マスから染料を出す
  for (let k = -1; k <= 1; k++) d[IX(2, 20 + k)] = 2;
  d0.set(d);
  for (let j = 1; j <= H; j++) {
    for (let i = 1; i <= W; i++) {
      // 流れの速度: 右向きで、上下にうねる
      let u = 0.5;
      let v = 0.3 * sin(i * 0.3 + frameCount * 0.03);
      // 流れを逆にたどった場所
      let x = constrain(i - dt0 * u, 0.5, W + 0.5);
      let y = constrain(j - dt0 * v, 0.5, H + 0.5);
      let i0 = floor(x);
      let j0 = floor(y);
      let s = x - i0;
      let t = y - j0;
      let m = IX(i0, j0);
      d[IX(i, j)] =
        (1 - s) * ((1 - t) * d0[m] + t * d0[m + W + 2]) +
        s * ((1 - t) * d0[m + 1] + t * d0[m + W + 3]);
    }
  }
  img.loadPixels();
  for (let j = 0; j < H; j++) {
    for (let i = 0; i < W; i++) {
      let c = 1 - exp(-d[IX(i + 1, j + 1)] * 1.5);
      let k = 4 * (i + j * W);
      img.pixels[k] = 10 + 120 * c * c;
      img.pixels[k + 1] = 14 + 200 * c;
      img.pixels[k + 2] = 30 + 225 * c;
      img.pixels[k + 3] = 255;
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);
}`}
              keywords={["dt0 * u", "dt0 * v"]}
              hints={[
                "x方向は、x方向の速度のぶんだけ逆にたどります。1つ目の空欄には変数uを書きます",
                "y方向は、y方向の速度のぶんだけ逆にたどります。2つ目の空欄には変数vを書きます",
              ]}
            />
            <CodingChallenge
              title="粒子を流れに乗せる"
              description="___ を埋めて、粒子がその場所の流れの速度で動くようにしてください（ラグランジュ的な見方）。"
              preview
              initialCode={`let particles = [];

function setup() {
  createCanvas(400, 300);
  background(16, 18, 30);
  for (let i = 0; i < 300; i++) {
    particles.push({ x: random(width), y: random(height) });
  }
}

// 位置(x, y)での流れの速度
function flowAt(x, y) {
  let k = TWO_PI / 200;
  return {
    x: 50 * sin(k * x) * cos(k * y),
    y: -50 * cos(k * x) * sin(k * y),
  };
}

function draw() {
  // うすく塗り重ねて、通った跡を残す
  noStroke();
  fill(16, 18, 30, 12);
  rect(0, 0, width, height);
  let dt = min(deltaTime / 1000, 0.05);
  fill(255, 190, 90);
  for (let q of particles) {
    let f = flowAt(q.x, q.y);
    q.x += ___ * dt;
    q.y += ___ * dt;
    circle(q.x, q.y, 2);
  }
}`}
              answer={`let particles = [];

function setup() {
  createCanvas(400, 300);
  background(16, 18, 30);
  for (let i = 0; i < 300; i++) {
    particles.push({ x: random(width), y: random(height) });
  }
}

// 位置(x, y)での流れの速度
function flowAt(x, y) {
  let k = TWO_PI / 200;
  return {
    x: 50 * sin(k * x) * cos(k * y),
    y: -50 * cos(k * x) * sin(k * y),
  };
}

function draw() {
  // うすく塗り重ねて、通った跡を残す
  noStroke();
  fill(16, 18, 30, 12);
  rect(0, 0, width, height);
  let dt = min(deltaTime / 1000, 0.05);
  fill(255, 190, 90);
  for (let q of particles) {
    let f = flowAt(q.x, q.y);
    q.x += f.x * dt;
    q.y += f.y * dt;
    circle(q.x, q.y, 2);
  }
}`}
              keywords={["f.x", "f.y"]}
              hints={[
                "x座標は、流れの速度のx成分（f.x）に時間dtを掛けたぶんだけ進みます",
                "y座標は、流れの速度のy成分（f.y）に時間dtを掛けたぶんだけ進みます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の煙を、自分の作品に作り替えます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>time * 0.05</code>
                の0.05を0.3にする。煙の色が速く移り変わり、虹色の層になる
              </li>
              <li>
                <code className={code}>dye[c][n] *= 0.992</code>
                の0.992を0.999にする。煙が長く残り、画面全体が色で満ちる
              </li>
              <li>
                <code className={code}>inject(22, H - 2, ...)</code>
                の位置を変えたり、行を増やしたりする。噴き出し口を左右の壁に置くと、中央でぶつかり合う
              </li>
              <li>
                マウスの行の
                <code className={code}>0.12</code>
                を0.4にする。指でかき混ぜる絵の具のように、強く反応する
              </li>
              <li>
                <code className={code}>8 + 247 * (...)</code>
                などの色の式を入れ替える。白い地に墨を流したような配色も作れる
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="このページの移流（advect）は、マスの新しい値をどうやって決めている？"
              options={[
                { label: "となりの4マスの平均を取る" },
                {
                  label:
                    "流れを逆向きにたどった場所の値を、まわり4マスから混ぜて持ってくる",
                  correct: true,
                },
                { label: "マスの値を、流れの先のマスへ押し出す" },
                { label: "乱数で少しずつずらす" },
              ]}
              explanation="各マスから速度の逆向きにdtだけたどり、その場所の値を4マスの値から補間して持ってきます。値を押し出す書き方と違い、大きな時間刻みでも値が発散しません。"
            />
            <Quiz
              question="射影（project）を省くと、流れはどうなる？"
              options={[
                { label: "エラーになって止まる" },
                { label: "煙の色が変わる" },
                {
                  label:
                    "流体が押しのけ合わなくなり、渦を巻いて戻る流れが生まれにくくなる",
                  correct: true,
                },
                { label: "計算が遅くなる" },
              ]}
              explanation="射影は、各マスで入る量と出る量が等しくなるように速度を直す処理です。これによって、押された流体が横へ逃げ、渦のある流れになります。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "流れは、場所を固定して見る方法（格子）と、動く点を追う方法（粒子）で表せる",
                  "Stamの方法は、1フレームで「力を加える → 拡散 → 移流 → 射影」を順に行う",
                  "拡散は、連立方程式をくり返し代入で解くと、速い拡散でも壊れない",
                  "移流は、流れを逆にたどった場所の値を持ってくる（セミラグランジュ法）",
                  "射影は発散を0に近づけ、渦のある流れを作る",
                  "見た目と安定性を優先した方法で、設計に使う解析と同じ精度ではない",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="text-primary font-bold mt-0.5"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "Jos Stam: Real-Time Fluid Dynamics for Games (GDC 2003, PDF)",
                  url: "https://www.dgp.toronto.edu/public_user/stam/reality/Research/pdf/GDC03.pdf",
                  description:
                    "このページの実装のもとになった解説論文。C言語のコードつきで、拡散・移流・射影を順に説明している",
                },
                {
                  title: "Jos Stam: Stable Fluids (SIGGRAPH 99, PDF)",
                  url: "https://www.dgp.toronto.edu/public_user/stam/reality/Research/pdf/ns.pdf",
                  description: "方法を最初に発表した論文",
                },
                {
                  title:
                    "Wikipedia: Lagrangian and Eulerian specification of the flow field",
                  url: "https://en.wikipedia.org/wiki/Lagrangian_and_Eulerian_specification_of_the_flow_field",
                  description: "流れの2つの見方の定義と、川のたとえ",
                },
                {
                  title: "Wikipedia: Reynolds number",
                  url: "https://en.wikipedia.org/wiki/Reynolds_number",
                  description: "レイノルズ数の定義と、層流・乱流の目安",
                },
                {
                  title: "Wikipedia: Computational fluid dynamics",
                  url: "https://en.wikipedia.org/wiki/Computational_fluid_dynamics",
                  description: "数値流体力学の用途と方法の概観",
                },
                {
                  title: "p5.js Reference: createImage()",
                  url: "https://p5js.org/reference/p5/createImage/",
                  description:
                    "格子の値を書き込む小さな画像を作る関数。pixelsの使い方も載っている",
                },
              ]}
            />
          </section>
        </div>

        <PageNavigation />
      </div>
    </div>
  );
}
