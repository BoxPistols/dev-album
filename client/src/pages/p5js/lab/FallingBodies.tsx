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

// このページの完成形。密度の違う球を同時に落とし、空気中と真空中を自動で入れ替える
const HERO_SKETCH = `// 落下実験装置: 密度の違う14個の球を同時に落とし、空気中と真空中で比べる
const G = 9.80665;      // 標準重力加速度 (m/s^2)
const RHO_AIR = 1.204;  // 20℃の空気の密度 (kg/m^3)
const CD = 0.47;        // 球の抗力係数
const SCALE = 17;       // 1mを17ピクセルで描く
const DROP = 20;        // 落とす高さ (m)
const TOP_Y = 30;       // 筒の上端のy座標 (px)。TOPはp5.jsの定数名なので使わない

let balls = [];
let inAir = true;
let clock = 0;
let button;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  button = createButton('真空に切り替える');
  button.mousePressed(toggleAir);
  release();
}

function toggleAir() {
  inAir = !inAir;
  button.html(inAir ? '真空に切り替える' : '空気を入れる');
  release();
}

function release() {
  balls = [];
  clock = 0;
  for (let i = 0; i < 14; i++) {
    // 密度を15〜8000 kg/m^3のあいだで段階的に変える。半径はすべて5cm
    let density = 15 * pow(8000 / 15, i / 13);
    let r = 0.05;
    balls.push({
      x: 62 + i * 13,
      y: 0,
      v: 0,
      mass: density * (4 / 3) * PI * r * r * r,
      area: PI * r * r,
      hue: map(i, 0, 13, 185, 25),
      landed: false,
      trace: [],
    });
  }
}

function advance(h) {
  for (let b of balls) {
    // 抗力 = 1/2 ρ v^2 Cd A。向きは速度と逆
    let drag = inAir ? 0.5 * RHO_AIR * b.v * b.v * CD * b.area : 0;
    let a = G - (b.v > 0 ? drag : -drag) / b.mass;
    b.v += a * h;
    b.y += b.v * h;
    if (b.y > DROP) {
      // 床で跳ね返る（反発係数0.55）
      b.y = DROP;
      b.v = abs(b.v) < 0.4 ? 0 : -b.v * 0.55;
      b.landed = true;
    }
  }
}

function draw() {
  background(225, 30, 9);
  let dt = min(deltaTime / 1000, 0.05);
  // 1フレームを4回に分けて進める
  for (let s = 0; s < 4; s++) advance(dt / 4);
  clock += dt;
  for (let b of balls) {
    if (!b.landed) b.trace.push({ t: clock, v: b.v });
  }
  drawChamber();
  drawGraph();
  // 7秒ごとに自動で真空と空気を入れ替える
  if (clock > 7) toggleAir();
}

function drawChamber() {
  // 筒
  stroke(220, 20, 45);
  strokeWeight(1);
  fill(210, 40, inAir ? 16 : 6);
  rect(50, TOP_Y, 193, DROP * SCALE + 6, 4);
  // 目盛り（5mごと）
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let m = 0; m <= DROP; m += 5) {
    let y = TOP_Y + m * SCALE;
    stroke(220, 20, 45);
    line(42, y, 50, y);
    noStroke();
    fill(220, 10, 70);
    text(m + ' m', 38, y);
  }
  // 球と、速さに比例した尾
  for (let b of balls) {
    let y = TOP_Y + b.y * SCALE;
    stroke(b.hue, 60, 100, 45);
    strokeWeight(3);
    line(b.x, y, b.x, y - b.v * 1.6);
    noStroke();
    fill(b.hue, 60, 100);
    circle(b.x, y, 9);
  }
  noStroke();
  fill(0, 0, 95);
  textAlign(LEFT, BASELINE);
  textSize(14);
  text(inAir ? '空気中 (1.204 kg/m³)' : '真空中', 50, 20);
}

function drawGraph() {
  let gx = 320, gy = 345, gw = 250, gh = 285; // 原点と大きさ
  let tMax = 4, vMax = 25;
  textSize(12);
  // 目盛り線
  for (let t = 0; t <= tMax; t++) {
    let x = gx + (t / tMax) * gw;
    stroke(220, 20, 22);
    strokeWeight(1);
    line(x, gy, x, gy - gh);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(t, x, gy + 5);
  }
  for (let v = 0; v <= vMax; v += 5) {
    let y = gy - (v / vMax) * gh;
    stroke(220, 20, 22);
    line(gx, y, gx + gw, y);
    noStroke();
    fill(220, 10, 70);
    textAlign(RIGHT, CENTER);
    text(v, gx - 6, y);
  }
  textAlign(CENTER, TOP);
  text('時間 (s)', gx + gw / 2, gy + 22);
  textAlign(LEFT, BASELINE);
  text('速さ (m/s)', gx - 22, gy - gh - 12);
  // 真空の理論値（破線）: v = g t
  stroke(0, 0, 100, 60);
  drawingContext.setLineDash([4, 5]);
  let tLand = sqrt((2 * DROP) / G);
  line(gx, gy, gx + (tLand / tMax) * gw, gy - ((G * tLand) / vMax) * gh);
  drawingContext.setLineDash([]);
  // 球ごとの速さの記録
  noFill();
  strokeWeight(1.5);
  for (let b of balls) {
    stroke(b.hue, 60, 100, 85);
    beginShape();
    for (let p of b.trace) {
      vertex(gx + (p.t / tMax) * gw, gy - (p.v / vMax) * gh);
    }
    endShape();
  }
  // 凡例
  noStroke();
  for (let i = 0; i < 14; i++) {
    fill(map(i, 0, 13, 185, 25), 60, 100);
    rect(gx + 12 + i * 7, gy - gh + 10, 7, 7);
  }
  fill(220, 10, 80);
  textAlign(LEFT, CENTER);
  text('軽い → 重い', gx + 118, gy - gh + 14);
  stroke(0, 0, 100, 60);
  drawingContext.setLineDash([4, 5]);
  line(gx + 12, gy - gh + 34, gx + 40, gy - gh + 34);
  drawingContext.setLineDash([]);
  noStroke();
  text('v = g t（真空）', gx + 48, gy - gh + 34);
}`;

const EULER_SKETCH = `const G = 9.80665; // 標準重力加速度 (m/s^2)
const SCALE = 16;  // 1mを16ピクセルで描く
const TOP_Y = 40;  // ものさしの上端のy座標 (px)

let y = 0;      // 落ちた距離 (m)
let v = 0;      // 速さ (m/s)
let t = 0;      // 経過時間 (s)
let rest = 0;
let marks = []; // 0.2秒ごとの位置の記録

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(225, 30, 9);
  // deltaTimeはミリ秒。1000で割って秒にする
  let dt = min(deltaTime / 1000, 0.05);

  if (y < 20) {
    // オイラー法: いまの速度で位置を、加速度で速度を、少しだけ進める
    y += v * dt;
    v += G * dt;
    t += dt;
    if (marks.length < t / 0.2) marks.push(y);
  } else {
    // 着地して1.5秒たったら最初から
    rest += dt;
    if (rest > 1.5) {
      y = 0; v = 0; t = 0; rest = 0; marks = [];
    }
  }

  // ものさし（1mごとに線、5mごとに数字）
  textSize(13);
  textAlign(RIGHT, CENTER);
  for (let m = 0; m <= 20; m++) {
    let py = TOP_Y + m * SCALE;
    stroke(220, 20, m % 5 === 0 ? 60 : 30);
    line(m % 5 === 0 ? 70 : 78, py, 86, py);
    if (m % 5 === 0) {
      noStroke();
      fill(220, 10, 75);
      text(m + ' m', 64, py);
    }
  }
  // 0.2秒ごとの位置（間隔がだんだん広がる）
  noStroke();
  for (let m of marks) {
    fill(45, 70, 100, 30);
    circle(150, TOP_Y + m * SCALE, 16);
  }
  fill(45, 70, 100);
  circle(150, TOP_Y + min(y, 20) * SCALE, 16);

  // 計器の表示
  fill(0, 0, 95);
  textAlign(LEFT, BASELINE);
  textSize(18);
  text('t = ' + nf(t, 1, 2) + ' s', 270, 90);
  text('v = ' + nf(v, 1, 2) + ' m/s', 270, 125);
  text('y = ' + nf(min(y, 20), 1, 2) + ' m', 270, 160);
  fill(190, 60, 100);
  text('½gt² = ' + nf(min(0.5 * G * t * t, 20), 1, 2) + ' m', 270, 210);
  fill(220, 10, 70);
  textSize(13);
  text('この1フレームのdt = ' + nf(dt * 1000, 1, 1) + ' ms', 270, 250);
  text('1 m = ' + SCALE + ' px', 270, 272);
}`;

const STEPSIZE_SKETCH = `const G = 9.80665;
let slider;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 2秒間を何回に分けて計算するか
  slider = createSlider(2, 60, 6, 1);
  slider.size(260);
  slider.attribute('aria-label', '分割数');
}

function draw() {
  background(225, 30, 9);
  let n = slider.value();
  let dt = 2 / n; // 刻み幅 (s)
  let gx = 70, gy = 340, gw = 480, gh = 270;
  let px = (t) => gx + (t / 2) * gw;
  let py = (d) => gy - (d / 22) * gh;

  // 軸と目盛り
  textSize(13);
  for (let i = 0; i <= 4; i++) {
    stroke(220, 20, 22);
    line(px(i * 0.5), gy, px(i * 0.5), gy - gh);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(nf(i * 0.5, 1, 1), px(i * 0.5), gy + 6);
  }
  for (let d = 0; d <= 20; d += 5) {
    stroke(220, 20, 22);
    line(gx, py(d), gx + gw, py(d));
    noStroke();
    fill(220, 10, 70);
    textAlign(RIGHT, CENTER);
    text(d, gx - 8, py(d));
  }
  textAlign(CENTER, TOP);
  text('時間 (s)', gx + gw / 2, gy + 26);
  textAlign(LEFT, BASELINE);
  text('落ちた距離 (m)', gx - 40, gy - gh - 12);

  // 解析解: y = 1/2 g t^2
  noFill();
  stroke(190, 60, 100);
  strokeWeight(2);
  beginShape();
  for (let t = 0; t <= 2.001; t += 0.02) vertex(px(t), py(0.5 * G * t * t));
  endShape();

  // オイラー法: 古い速度で位置を進めてから、速度を進める
  let y = 0, v = 0;
  stroke(30, 80, 100);
  strokeWeight(1.5);
  for (let i = 0; i < n; i++) {
    let y0 = y;
    y += v * dt;
    v += G * dt;
    line(px(i * dt), py(y0), px((i + 1) * dt), py(y));
    circle(px((i + 1) * dt), py(y), 5);
  }
  strokeWeight(1);

  // 読み取り値
  let exact = 0.5 * G * 4;
  noStroke();
  textAlign(LEFT, BASELINE);
  textSize(14);
  fill(190, 60, 100);
  text('解析解 ½gt²    ' + nf(exact, 1, 2) + ' m', 95, 80);
  fill(30, 80, 100);
  text('オイラー法      ' + nf(y, 1, 2) + ' m', 95, 102);
  fill(0, 0, 95);
  text('誤差 ' + nf(exact - y, 1, 2) + ' m (' + nf(((exact - y) / exact) * 100, 1, 1) + '%)', 95, 124);
  text('分割数 ' + n + '   dt = ' + nf(dt, 1, 3) + ' s', 95, 146);
}`;

const ENERGY_SKETCH = `// ばねにつないだおもりを、2つの計算方法で同時に進める
const K = 9;       // ばね定数 ÷ 質量 (1/s^2)
const DT = 1 / 60; // 比べやすいよう、刻み幅を固定する (s)

let a = { x: 1, v: 0 }; // オイラー法
let b = { x: 1, v: 0 }; // 半陰的オイラー法
let t = 0;
let logA = [];
let logB = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function energy(p) {
  // 運動エネルギー + ばねのエネルギー（質量1kgあたり）
  return 0.5 * p.v * p.v + 0.5 * K * p.x * p.x;
}

function draw() {
  background(225, 30, 9);

  // オイラー法: 位置も速度も「古い値」で進める
  let oldV = a.v;
  a.v += -K * a.x * DT;
  a.x += oldV * DT;

  // 半陰的オイラー法: 先に速度を進め、「新しい速度」で位置を進める
  b.v += -K * b.x * DT;
  b.x += b.v * DT;

  t += DT;
  logA.push(energy(a));
  logB.push(energy(b));
  if (t > 16) {
    a = { x: 1, v: 0 }; b = { x: 1, v: 0 }; t = 0; logA = []; logB = [];
  }

  drawSpring(a.x, 110, 30, 'オイラー法');
  drawSpring(b.x, 270, 150, '半陰的オイラー法');

  // エネルギーのグラフ
  let gx = 345, gy = 340, gw = 230, gh = 270;
  textSize(12);
  for (let i = 0; i <= 4; i++) {
    stroke(220, 20, 22);
    line(gx + (i / 4) * gw, gy, gx + (i / 4) * gw, gy - gh);
    line(gx, gy - (i / 4) * gh, gx + gw, gy - (i / 4) * gh);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(i * 4, gx + (i / 4) * gw, gy + 6);
    textAlign(RIGHT, CENTER);
    text(i * 10, gx - 6, gy - (i / 4) * gh);
  }
  textAlign(CENTER, TOP);
  text('時間 (s)', gx + gw / 2, gy + 24);
  textAlign(LEFT, BASELINE);
  text('エネルギー (J/kg)', gx - 24, gy - gh - 12);
  noFill();
  strokeWeight(2);
  plot(logA, 30, gx, gy, gw, gh);
  plot(logB, 150, gx, gy, gw, gh);
  strokeWeight(1);
}

function plot(data, hue, gx, gy, gw, gh) {
  stroke(hue, 70, 100);
  beginShape();
  for (let i = 0; i < data.length; i += 4) {
    vertex(gx + ((i * DT) / 16) * gw, gy - (min(data[i], 40) / 40) * gh);
  }
  endShape();
}

function drawSpring(x, y, hue, label) {
  let mx = 165 + x * 34; // おもりの位置 (px)
  stroke(220, 20, 50);
  line(24, y - 34, 24, y + 34);
  // ばねをジグザグの線で描く
  noFill();
  stroke(220, 10, 75);
  beginShape();
  vertex(24, y);
  for (let i = 1; i < 20; i++) {
    vertex(24 + ((mx - 16 - 24) * i) / 20, y + (i % 2 === 0 ? -9 : 9));
  }
  vertex(mx - 16, y);
  endShape();
  noStroke();
  fill(hue, 70, 100);
  rect(mx - 16, y - 16, 32, 32, 4);
  fill(hue, 50, 100);
  textAlign(LEFT, BASELINE);
  textSize(14);
  text(label, 24, y - 48);
}`;

const DRAG_SKETCH = `const G = 9.80665;     // 標準重力加速度 (m/s^2)
const RHO = 1.204;     // 空気の密度 (kg/m^3)
const CD = 0.47;       // 球の抗力係数
const R = 0.05;        // 球の半径 (m)
const AREA = Math.PI * R * R; // 進む向きから見た面積 (m^2)

let slider;
let clock = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 球の質量 (g)
  slider = createSlider(5, 200, 40, 5);
  slider.size(260);
  slider.attribute('aria-label', '球の質量');
}

function draw() {
  background(225, 30, 9);
  let mass = slider.value() / 1000; // kgに直す
  // 終端速度: 重力と抗力がつり合う速さ
  let vt = sqrt((2 * mass * G) / (RHO * CD * AREA));

  clock += min(deltaTime / 1000, 0.05);
  if (clock > 8) clock = 0;

  let gx = 215, gy = 340, gw = 355, gh = 270;
  let px = (t) => gx + (t / 8) * gw;
  let py = (v) => gy - (v / 35) * gh;

  // 軸と目盛り
  textSize(13);
  for (let t = 0; t <= 8; t += 2) {
    stroke(220, 20, 22);
    line(px(t), gy, px(t), gy - gh);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(t, px(t), gy + 6);
  }
  for (let v = 0; v <= 30; v += 10) {
    stroke(220, 20, 22);
    line(gx, py(v), gx + gw, py(v));
    noStroke();
    fill(220, 10, 70);
    textAlign(RIGHT, CENTER);
    text(v, gx - 8, py(v));
  }
  textAlign(CENTER, TOP);
  text('時間 (s)', gx + gw / 2, gy + 26);
  textAlign(LEFT, BASELINE);
  text('速さ (m/s)', gx - 30, gy - gh - 12);

  // 終端速度の線（破線）
  stroke(330, 60, 100);
  drawingContext.setLineDash([5, 5]);
  line(gx, py(vt), gx + gw, py(vt));
  drawingContext.setLineDash([]);
  noStroke();
  fill(330, 60, 100);
  text('終端速度 ' + nf(vt, 1, 1) + ' m/s', gx + 150, py(vt) - 6);

  // 0〜8秒を細かい刻みで計算して曲線にする
  let v = 0, vNow = 0;
  let h = 1 / 120;
  noFill();
  stroke(45, 70, 100);
  strokeWeight(2);
  beginShape();
  for (let t = 0; t <= 8; t += h) {
    vertex(px(t), py(v));
    if (t <= clock) vNow = v;
    let drag = 0.5 * RHO * v * v * CD * AREA;
    v += (G - drag / mass) * h;
  }
  endShape();
  strokeWeight(1);
  noStroke();
  fill(0, 0, 100);
  circle(px(clock), py(vNow), 9);

  // 左: 球にかかる2つの力を矢印で表す
  let dragNow = 0.5 * RHO * vNow * vNow * CD * AREA;
  let len = 90; // 重力の矢印の長さ (px)
  noStroke();
  fill(45, 70, 100);
  circle(100, 200, 20 + slider.value() / 8);
  arrow(100, 200, len, 190, '重力');
  arrow(100, 200, (-len * dragNow) / (mass * G), 330, '抗力');
  fill(0, 0, 95);
  textAlign(CENTER, BASELINE);
  textSize(14);
  text('質量 ' + slider.value() + ' g', 100, 40);
  text(nf(vNow, 1, 1) + ' m/s', 100, 62);
}

function arrow(x, y, len, hue, label) {
  if (abs(len) < 2) return;
  let tip = y + len;
  let d = len > 0 ? 1 : -1;
  stroke(hue, 60, 100);
  strokeWeight(3);
  line(x, y, x, tip);
  line(x, tip, x - 6, tip - 8 * d);
  line(x, tip, x + 6, tip - 8 * d);
  strokeWeight(1);
  noStroke();
  fill(hue, 60, 100);
  textAlign(LEFT, CENTER);
  textSize(13);
  text(label, x + 14, y + len * 0.7);
}`;

const BOUNCE_SKETCH = `const G = 9.80665; // 標準重力加速度 (m/s^2)
const SCALE = 140; // 1mを140ピクセルで描く
const FLOOR = 350; // 床のy座標 (px)

let slider;
let h = 2;   // 床からの高さ (m)
let v = 0;   // 上向きの速度 (m/s)
let t = 0;
let trace = [];
let lastE = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 反発係数 × 100
  slider = createSlider(30, 95, 80, 5);
  slider.size(260);
  slider.attribute('aria-label', '反発係数');
}

function restart() {
  h = 2; v = 0; t = 0; trace = [];
}

function draw() {
  background(225, 30, 9);
  let e = slider.value() / 100;
  if (e !== lastE) { restart(); lastE = e; }

  let dt = min(deltaTime / 1000, 0.05);
  // 床の近くでのずれを減らすため、1フレームを8回に分ける
  for (let s = 0; s < 8; s++) {
    v -= G * (dt / 8);
    h += v * (dt / 8);
    if (h < 0) {
      // 床に当たったら、速度の向きを反転して反発係数を掛ける
      h = 0;
      v = -v * e;
    }
  }
  t += dt;
  trace.push({ t: t, h: h });
  if (t > 6) restart();

  // 左: ボールとものさし
  textSize(13);
  for (let m = 0; m <= 2; m += 0.5) {
    stroke(220, 20, 45);
    line(40, FLOOR - m * SCALE, 50, FLOOR - m * SCALE);
    noStroke();
    fill(220, 10, 70);
    textAlign(RIGHT, CENTER);
    text(nf(m, 1, 1), 34, FLOOR - m * SCALE);
  }
  stroke(220, 20, 60);
  line(40, FLOOR, 580, FLOOR);
  noStroke();
  fill(150, 60, 100);
  circle(105, FLOOR - h * SCALE - 10, 20);

  // 右: 高さの記録
  let gx = 200, gw = 370;
  for (let s = 0; s <= 6; s++) {
    stroke(220, 20, 22);
    line(gx + (s / 6) * gw, FLOOR, gx + (s / 6) * gw, FLOOR - 2 * SCALE);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(s, gx + (s / 6) * gw, FLOOR + 6);
  }
  text('時間 (s)', gx + gw / 2, FLOOR + 24);
  textAlign(LEFT, BASELINE);
  text('高さ (m)', 20, 50);

  // 跳ねるたびに高さはe×e倍になる（破線が予測値）
  stroke(330, 60, 100, 70);
  drawingContext.setLineDash([4, 5]);
  let peak = 2;
  for (let i = 0; i < 5; i++) {
    peak *= e * e;
    line(gx, FLOOR - peak * SCALE, gx + gw, FLOOR - peak * SCALE);
  }
  drawingContext.setLineDash([]);

  noFill();
  stroke(150, 60, 100);
  strokeWeight(2);
  beginShape();
  for (let p of trace) vertex(gx + (p.t / 6) * gw, FLOOR - p.h * SCALE);
  endShape();
  strokeWeight(1);

  noStroke();
  fill(0, 0, 95);
  textSize(14);
  text('反発係数e = ' + nf(e, 1, 2) + '   1回ごとの高さ = e² = ' + nf(e * e, 1, 2) + '倍', 200, 30);
}`;

export default function FallingBodies() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 24</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          落下と数値計算
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          物が落ちる動きを、運動方程式を小さな時間刻みで進める「数値積分」で再現します。
          下の枠は、密度の違う14個の球を同時に落とす実験装置です。空気中では軽い球ほど早く速さが頭打ちになり、
          真空中ではすべての球が同時に落ちます。7秒ごとに自動で入れ替わり、ボタンでも切り替えられます。
        </p>

        <CodePreview
          title="落下実験装置（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          右のグラフは、球ごとの速さを着地まで記録したものです。破線は真空中の理論値v
          = g
          tです。球の大きさは見やすいよう実際の縮尺より大きく描いています。
        </p>

        <WhyNowBox
          title="なぜ落下から始めるのか"
          tags={["オイラー法", "deltaTime", "抗力", "終端速度", "反発係数"]}
        >
          <p>
            このセクションでは、研究や設計の現場で使われる手法の原理を、教材の規模で再現します。
            流体も建物の揺れも、中身は「いまの状態から、少し先の状態を計算する」のくり返しです。
            落下は式が短く、正解（解析解）と比べられるので、このくり返しがどれだけ正確かを自分の目で確かめられます。
            速度と加速度の考え方は
            <Link href="/p5js/math/vectors-forces" className="text-primary underline">
              ベクトルと力
            </Link>
            のページで扱いました。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              オイラー法: 少しだけ進める、をくり返す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              落ちる物の加速度は重力加速度gです。短い時間dtのあいだは加速度も速度もほぼ変わらないとみなし、
              <code className={code}>y += v * dt</code>と
              <code className={code}>v += G * dt</code>
              で位置と速度を少しだけ進めます。これを毎フレームくり返すのがオイラー法です。
              オイラー法はLeonhard
              Eulerが1768〜1770年の著書で示した方法で、常微分方程式を数値で解く最も基本的な手順です。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              gには標準重力加速度9.80665m/s²を使います。計算はメートルと秒で行い、描くときだけ
              <code className={code}>SCALE</code>
              （1mを何ピクセルで描くか）を掛けます。dtには
              <code className={code}>deltaTime</code>
              を使います。公式リファレンスはdeltaTimeを「A Number variable that
              tracks the number of milliseconds it took to draw the last
              frame.」と説明し、「It's useful for simulating
              physics.」と書いています。ミリ秒なので1000で割って秒にします。
            </p>
            <CodePreview
              title="実時間で落とす"
              language="js"
              code={EULER_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書いたもの
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      deltaTime / 1000
                    </th>
                    <td className="p-3">
                      前のフレームからの経過時間（秒）。端末が遅くても、進む時間は実時間に合う
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      min(..., 0.05)
                    </th>
                    <td className="p-3">
                      タブを切り替えた直後などにdtが大きくなりすぎるのを防ぐ上限
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      y += v * dt
                    </th>
                    <td className="p-3">
                      いまの速度で位置を進める（単位はm）
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      v += G * dt
                    </th>
                    <td className="p-3">加速度で速度を進める（単位はm/s）</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      TOP_Y + y * SCALE
                    </th>
                    <td className="p-3">
                      メートルをピクセルに直す。描くときだけ使う
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>const G = 9.80665</code>
                  を1.62にする（月面の重力に近い値。落ちるのに時間がかかる）
                </li>
                <li>
                  <code className={code}>const SCALE = 16</code>
                  を8にする（同じ20mが半分の長さで描かれる。計算結果の数字は変わらない）
                </li>
                <li>
                  <code className={code}>t / 0.2</code>
                  の0.2を0.1にする（残像の間隔が細かくなる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              刻み幅と誤差: 解析解と比べる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              空気抵抗のない自由落下には、式で書ける正解があります。t秒後の落下距離はy
              =
              ½gt²です。これを解析解と呼びます。下のスケッチは、2秒間の落下をオイラー法で計算した結果（橙）を解析解（水色）に重ねています。
              スライダーで分割数を変えると、刻み幅dtが変わります。
            </p>
            <CodePreview
              title="分割数を変えて誤差を見る"
              language="js"
              code={STEPSIZE_SKETCH}
            />
            <InfoBox type="warning" title="式の値と、計算で出る値">
              <p>
                式の上では2秒後の落下距離は19.61mですが、オイラー法の結果はそれより小さくなることがあります。
                理由は、刻みの中で速度が変わり続けているのに、刻みの始めの速度のまま進めているからです。
                この例のずれは½·g·t·dtで、刻み幅dtに比例します。分割数を6から60にすると、誤差は10分の1になります。
                オイラー法は1次の方法で、全体の誤差が刻み幅に比例する性質を持ちます。
              </p>
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              1つ前のスケッチで結果がほぼ合っていたのは、1フレーム（約1/60秒）という細かい刻みで進めていたからです。
              端末が遅くてフレームが落ちると刻みが粗くなり、誤差も増えます。
              精度が要る場面では、1フレームをさらに数回に分けて進めます。冒頭のスケッチは4回に分けています。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              半陰的オイラー法: 順番を変えるだけで安定する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              オイラー法は、位置も速度も「刻みの始めの値」で進めます。先に速度を進め、その「新しい速度」で位置を進める方法を、半陰的オイラー法（シンプレクティック・オイラー法）と呼びます。
              違いは1行の順番だけですが、ばねのように行ったり来たりする運動では結果が大きく変わります。
            </p>
            <CodePreview
              title="ばねの振動で2つの方法を比べる"
              language="js"
              code={ENERGY_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              摩擦のないばねでは、エネルギーは一定のはずです。オイラー法（橙）はエネルギーが増え続け、振れ幅がだんだん大きくなります。
              半陰的オイラー法（緑）は小さく上下するだけで、増えていきません。
              どちらも1次の方法で精度の次数は同じですが、エネルギーの保たれ方が違います。
              このセクションの残りのページでは、振動を扱うので半陰的オイラー法を使います。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>const DT = 1 / 60</code>
                  を1 / 240にする（オイラー法のエネルギーの増え方がゆるやかになる）
                </li>
                <li>
                  <code className={code}>const K = 9</code>
                  を36にする（振動が速くなり、オイラー法の破綻が早まる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              空気抵抗と終端速度
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              空気中を速く動く物には、進む向きと逆向きに抗力がかかります。抗力の式はF
              =
              ½ρv²C<sub>d</sub>
              Aです。ρは空気の密度、vは速さ、C<sub>d</sub>
              は形で決まる抗力係数、Aは進む向きから見た面積です。速さの2乗に比例するので、落ちて速くなるほど抗力が増え、
              やがて重力とつり合って速さが一定になります。この速さを終端速度と呼び、√(2mg
              / (ρC<sub>d</sub>A))で求められます。
            </p>
            <CodePreview
              title="質量を変えて終端速度を見る"
              language="js"
              code={DRAG_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              左の2本の矢印は重力と抗力です。抗力の矢印が伸びて重力と同じ長さになったところで、グラフの曲線が破線（終端速度）に張りつきます。
              スライダーで質量を増やすと、同じ大きさの球でも終端速度が上がります。
              冒頭のスケッチで軽い球が遅れたのは、この終端速度が低いからです。真空中では抗力が0なので、質量に関係なく同じ動きになります。
            </p>
            <InfoBox type="info" title="このスケッチで使った値">
              <p>
                空気の密度は20℃・1気圧の乾燥空気の値（約1.204kg/m³）、抗力係数は球の代表的な値として0.47を使っています。
                抗力係数は実際には一定ではなく、速さ（レイノルズ数）で変わります。ここでは定数として扱っています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              反発係数で跳ねるボール
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              床に当たったボールは、当たる直前より遅い速さで跳ね返ります。跳ね返った後の速さを当たる前の速さで割った値が反発係数eです。
              コードでは、床を越えたら位置を床に戻し、
              <code className={code}>v = -v * e</code>
              で速度の向きを反転して小さくします。跳ね上がる高さは速さの2乗に比例するので、1回跳ねるごとにe²倍になります。
            </p>
            <CodePreview
              title="反発係数を変える"
              language="js"
              code={BOUNCE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              破線は「e²倍ずつ低くなる」という予測で、計算したボールの山がこの線に届きます。
              スライダーを0.95にするとなかなか止まらず、0.3にすると2〜3回で止まります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              現場ではどう使われているか
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
              <li>
                落下塔（drop
                tower）は、物を落として短時間の無重力に近い状態を作る実験施設です。ブレーメン大学の落下塔では、試料を打ち上げる方式で約9.3秒まで延ばせること、NASAグレン研究センターの施設は地下へのびる縦穴であることが
                <Ext href="https://en.wikipedia.org/wiki/Drop_tube">
                  Wikipedia「Drop tube」
                </Ext>
                にまとめられています。筒の中を真空に近づけるのは、冒頭のスケッチで見た空気抵抗の影響を除くためです。
              </li>
              <li>
                包装や製品の落下試験は、輸送中に落としたときの衝撃に耐えるかを確かめる試験です。自由落下で行う試験方法は規格（ASTM
                D5276など）になっています（
                <Ext href="https://en.wikipedia.org/wiki/Package_testing">
                  Wikipedia「Package testing」
                </Ext>
                ）。
              </li>
              <li>
                航空機や宇宙機の試験機を高い所から放して飛び方や着地を確かめる試験も、drop
                testと呼ばれます（
                <Ext href="https://en.wikipedia.org/wiki/Drop_test">
                  Wikipedia「Drop test」
                </Ext>
                ）。
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このシミュレーションの限界
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                抗力係数を定数にしています。実際は速さや表面の状態で変わり、回転や風の影響も受けます
              </li>
              <li>
                空気の浮力、横方向の動き、高さによる空気の密度の変化を入れていません
              </li>
              <li>
                反発係数を定数にしています。実際の衝突は、速さ・材質・変形の仕方で変わります
              </li>
              <li>
                オイラー法と半陰的オイラー法はどちらも1次の方法です。実務の解析では、より次数の高い方法や、誤差を見ながら刻み幅を変える方法が使われます
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              このページのスケッチは原理を確かめるためのもので、実際の試験や解析ソフトの代わりにはなりません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="オイラー法で落とす"
              description="___ を埋めて、球が重力で加速しながら落ちるようにしてください。加速度と、刻み幅を入れます。"
              preview
              initialCode={`const G = 9.80665;
const SCALE = 16;
let y = 0;
let v = 0;

function setup() {
  createCanvas(400, 360);
}

function draw() {
  background(16, 18, 30);
  let dt = min(deltaTime / 1000, 0.05);
  let a = ___;
  y += v * ___;
  v += a * dt;
  if (y > 20) {
    y = 0;
    v = 0;
  }
  noStroke();
  fill(255, 200, 80);
  circle(200, 20 + y * SCALE, 20);
}`}
              answer={`const G = 9.80665;
const SCALE = 16;
let y = 0;
let v = 0;

function setup() {
  createCanvas(400, 360);
}

function draw() {
  background(16, 18, 30);
  let dt = min(deltaTime / 1000, 0.05);
  let a = G;
  y += v * dt;
  v += a * dt;
  if (y > 20) {
    y = 0;
    v = 0;
  }
  noStroke();
  fill(255, 200, 80);
  circle(200, 20 + y * SCALE, 20);
}`}
              keywords={["a = G", "v * dt"]}
              hints={[
                "落ちる物の加速度は重力加速度です。上で定義した定数Gを書きます",
                "位置は「速度 × 経過時間」だけ進みます。経過時間が入った変数dtを書きます",
              ]}
            />
            <CodingChallenge
              title="空気抵抗を入れる"
              description="___ を埋めて、抗力で速さが頭打ちになるようにしてください。抗力の式の最後に掛ける量と、力を加速度に直すときに割る量を入れます。"
              preview
              initialCode={`const G = 9.80665;
const RHO = 1.204;
const CD = 0.47;
const AREA = 0.00785;
const MASS = 0.02;
let v = 0;
let trace = [];

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  let dt = min(deltaTime / 1000, 0.05);
  let drag = 0.5 * RHO * v * v * CD * ___;
  let a = G - drag / ___;
  v += a * dt;
  trace.push(v);
  if (trace.length > 380) {
    trace = [];
    v = 0;
  }
  noFill();
  stroke(255, 200, 80);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < trace.length; i++) {
    vertex(10 + i, 280 - trace[i] * 20);
  }
  endShape();
  noStroke();
  fill(230);
  textSize(14);
  text('速さ ' + nf(v, 1, 1) + ' m/s', 12, 24);
}`}
              answer={`const G = 9.80665;
const RHO = 1.204;
const CD = 0.47;
const AREA = 0.00785;
const MASS = 0.02;
let v = 0;
let trace = [];

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  let dt = min(deltaTime / 1000, 0.05);
  let drag = 0.5 * RHO * v * v * CD * AREA;
  let a = G - drag / MASS;
  v += a * dt;
  trace.push(v);
  if (trace.length > 380) {
    trace = [];
    v = 0;
  }
  noFill();
  stroke(255, 200, 80);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < trace.length; i++) {
    vertex(10 + i, 280 - trace[i] * 20);
  }
  endShape();
  noStroke();
  fill(230);
  textSize(14);
  text('速さ ' + nf(v, 1, 1) + ' m/s', 12, 24);
}`}
              keywords={["CD * AREA", "drag / MASS"]}
              hints={[
                "抗力の式（½ρv²CdA）の最後のAは、進む向きから見た面積です。定数AREAを書きます",
                "力を加速度に直すには質量で割ります（a = F / m）。定数MASSを書きます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の実験装置を、自分の実験や作品に作り替えます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>const G = 9.80665</code>
                を別の値にして「別の天体の実験室」にする。月面は約1.62、火星は約3.72
              </li>
              <li>
                <code className={code}>-b.v * 0.55</code>
                の0.55を球ごとに変える。よく跳ねる球と跳ねない球が混ざる
              </li>
              <li>
                球を増やす。<code className={code}>release()</code>の
                <code className={code}>i &lt; 14</code>
                を40にし、同じ関数の
                <code className={code}>i / 13</code>を
                <code className={code}>i / 39</code>に、
                <code className={code}>i * 13</code>を
                <code className={code}>i * 4.3</code>に、
                <code className={code}>map(i, 0, 13, 185, 25)</code>
                の13を39にする。空気中では、密度の順に並んだ球が曲線を描いて落ちる
              </li>
              <li>
                球の位置を毎フレーム消さずに重ねる（
                <code className={code}>background</code>
                を半透明の四角に替える）。ストロボ写真のような軌跡になる
              </li>
              <li>
                横向きの速度を足して放物線にする。
                <Link
                  href="/p5js/math/vectors-forces"
                  className="text-primary underline"
                >
                  ベクトルと力
                </Link>
                のp5.Vectorを使うと、xとyをまとめて扱える
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="オイラー法で自由落下を計算したら、解析解とのずれが大きかった。ずれを小さくする方法は？"
              options={[
                { label: "キャンバスを大きくする" },
                {
                  label: "刻み幅dtを小さくする（1フレームを何回かに分けて進める）",
                  correct: true,
                },
                { label: "SCALE（1mあたりのピクセル数）を大きくする" },
                { label: "重力加速度の桁数を増やす" },
              ]}
              explanation="オイラー法の誤差は刻み幅に比例します。dtを半分にすれば誤差もほぼ半分になります。SCALEは描くときの換算で、計算結果には影響しません。"
            />
            <Quiz
              question="同じ大きさで質量だけが違う2つの球を、空気中で同時に落とした。先に着地するのは？"
              options={[
                { label: "軽い球" },
                { label: "重い球", correct: true },
                { label: "必ず同時" },
                { label: "毎回ランダムに変わる" },
              ]}
              explanation="大きさが同じなら同じ速さでの抗力は同じですが、重い球のほうが重力が大きいので、つり合う速さ（終端速度）が高くなります。真空中では抗力がないので同時に着地します。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "オイラー法は「加速度で速度を、速度で位置を、dtだけ進める」のくり返し",
                  "dtにdeltaTimeを使うと、端末の速さによらず実時間で進む。計算はメートルと秒で行い、描くときだけピクセルに直す",
                  "数値計算には誤差があり、オイラー法では刻み幅に比例する",
                  "先に速度を進める半陰的オイラー法は、振動でエネルギーが増え続けない",
                  "抗力は速さの2乗に比例し、重力とつり合う速さが終端速度になる",
                  "反発係数eを掛けて速度を反転すると、跳ねる高さはe²倍ずつ下がる",
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
                  title: "p5.js Reference: deltaTime",
                  url: "https://p5js.org/reference/p5/deltaTime/",
                  description: "前のフレームを描くのにかかった時間（ミリ秒）",
                },
                {
                  title: "p5.js Reference: createSlider()",
                  url: "https://p5js.org/reference/p5/createSlider/",
                  description: "スライダーを作る関数。最小・最大・初期値・刻みを渡す",
                },
                {
                  title: "Wikipedia: Semi-implicit Euler method",
                  url: "https://en.wikipedia.org/wiki/Semi-implicit_Euler_method",
                  description:
                    "半陰的オイラー法と、オイラー法とのエネルギーの保たれ方の違い",
                },
                {
                  title: "Wikipedia: Drag equation",
                  url: "https://en.wikipedia.org/wiki/Drag_equation",
                  description: "抗力の式と各記号の意味",
                },
                {
                  title: "Wikipedia: Terminal velocity",
                  url: "https://en.wikipedia.org/wiki/Terminal_velocity",
                  description: "終端速度の定義と式",
                },
                {
                  title: "The Nature of Code: Forces",
                  url: "https://natureofcode.com/forces/",
                  description:
                    "力から加速度を求めて動かす考え方を、p5.jsのコードで解説した章",
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
