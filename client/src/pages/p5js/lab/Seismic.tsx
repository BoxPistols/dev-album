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

// このページの完成形。高さの違う5つの建物を、同じ地面の揺れで揺らす
const HERO_SKETCH = `// 高さの違う5つの建物を、同じ地面の揺れで揺らす
const FLOORS = [5, 10, 18, 28, 40]; // 階数
const FLOOR_M = 4;    // 1階ぶんの高さ (m)
const ZETA = 0.05;    // 減衰比
const AMP = 3;        // 地面の揺れ幅（見やすいよう拡大した表示上の値）
const GROUND_Y = 250;

let buildings = [];
let slider;
let phase = 0;
let record = []; // 地面の揺れの記録

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < FLOORS.length; i++) {
    let h = FLOORS[i] * FLOOR_M;
    buildings.push({
      floors: FLOORS[i],
      period: 0.03 * h, // 固有周期の略算（鉄骨造）: 0.03 × 高さ(m)
      x: 0,             // 頂部の、地面に対するずれ
      v: 0,
      peak: 0,
      cx: 66 + i * 117,
    });
  }
  // 地面が揺れる周期 (s)
  slider = createSlider(0.3, 6, 1.2, 0.05);
  slider.size(300);
  slider.attribute('aria-label', '地面の揺れの周期');
}

function draw() {
  background(225, 30, 9);
  let groundT = slider.value();
  let wg = TWO_PI / groundT;
  let dt = min(deltaTime / 1000, 0.05);
  // 始めの3秒で、地面の揺れを0からだんだん大きくする
  let ramp = min(1, millis() / 3000);

  // 1フレームを8回に分けて進める（半陰的オイラー法）
  for (let s = 0; s < 8; s++) {
    let h = dt / 8;
    phase += wg * h;
    let ag = -AMP * ramp * wg * wg * sin(phase); // 地面の加速度
    for (let b of buildings) {
      let w = TWO_PI / b.period;
      b.v += (-2 * ZETA * w * b.v - w * w * b.x - ag) * h;
      b.x += b.v * h;
    }
  }
  let ground = AMP * ramp * sin(phase);
  record.push(ground);
  if (record.length > 380) record.shift();

  // 地面
  noStroke();
  fill(220, 20, 22);
  rect(0, GROUND_Y, width, 8);
  stroke(220, 20, 45);
  for (let x = -20; x < width + 20; x += 14) {
    line(x + ground, GROUND_Y + 8, x + ground - 6, GROUND_Y + 16);
  }

  textAlign(CENTER, BASELINE);
  for (let b of buildings) {
    b.peak = max(b.peak * 0.997, abs(b.x));
    let ratio = b.peak / AMP;
    // よく揺れている建物ほど暖色にする
    let hue = map(constrain(ratio, 0, 8), 0, 8, 200, 20);
    let fh = 4.6; // 1階ぶんの高さ (px)
    stroke(hue, 60, 100);
    strokeWeight(1);
    fill(hue, 60, 100, 14);
    // 上の階ほど大きくずれる形（1/4周期のサインカーブ）で描く
    beginShape();
    for (let f = 0; f <= b.floors; f++) {
      vertex(b.cx - 23 + ground + b.x * sin((HALF_PI * f) / b.floors), GROUND_Y - f * fh);
    }
    for (let f = b.floors; f >= 0; f--) {
      vertex(b.cx + 23 + ground + b.x * sin((HALF_PI * f) / b.floors), GROUND_Y - f * fh);
    }
    endShape(CLOSE);
    stroke(hue, 60, 100, 40);
    for (let f = 1; f < b.floors; f++) {
      let off = ground + b.x * sin((HALF_PI * f) / b.floors);
      line(b.cx - 23 + off, GROUND_Y - f * fh, b.cx + 23 + off, GROUND_Y - f * fh);
    }
    noStroke();
    fill(220, 10, 75);
    textSize(13);
    text(b.floors + '階  ' + nf(b.period, 1, 1) + ' s', b.cx, GROUND_Y + 36);
    fill(hue, 60, 100);
    textSize(17);
    text('×' + nf(ratio, 1, 1), b.cx, GROUND_Y + 58);
  }

  // 地面の揺れの記録
  noFill();
  stroke(0, 0, 100, 70);
  beginShape();
  for (let i = 0; i < record.length; i++) vertex(20 + i, 360 + record[i] * 4);
  endShape();
  noStroke();
  fill(0, 0, 95);
  textAlign(LEFT, BASELINE);
  textSize(14);
  text('地面の周期 ' + nf(groundT, 1, 2) + ' s', 420, 365);
  fill(220, 10, 70);
  textSize(12);
  text('× は地面の揺れ幅に対する倍率', 420, 384);
}`;

const FREE_SKETCH = `let massSlider, stiffSlider;
let x = 10;   // 頂部のずれ (cm)
let v = 0;
let t = 0;
let trace = [];
let crossings = []; // 右から左へ中心を通った時刻
let lastKey = '';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 質量 (t) と、柱のかたさ (kN/m)
  massSlider = createSlider(10, 200, 50, 5);
  massSlider.size(260);
  massSlider.attribute('aria-label', '質量');
  stiffSlider = createSlider(500, 8000, 2000, 100);
  stiffSlider.size(260);
  stiffSlider.attribute('aria-label', '柱のかたさ');
}

function pluck() {
  x = 10; v = 0; t = 0; trace = []; crossings = [];
}

function draw() {
  background(225, 30, 9);
  let m = massSlider.value();
  let k = stiffSlider.value();
  // 固有周期の式: T = 2π√(m/k)。単位はt ÷ (kN/m) = s^2
  let period = TWO_PI * sqrt(m / k);
  let w = TWO_PI / period;
  if (m + ',' + k !== lastKey) { pluck(); lastKey = m + ',' + k; }

  let dt = min(deltaTime / 1000, 0.05);
  for (let s = 0; s < 8; s++) {
    let h = dt / 8;
    let before = x;
    v += (-2 * 0.03 * w * v - w * w * x) * h; // 減衰比は0.03に固定
    x += v * h;
    t += h;
    if (before > 0 && x <= 0) crossings.push(t);
  }
  trace.push({ t: t, x: x });
  if (t > 8) pluck();

  // 左: 柱の上におもりが載ったモデル
  let baseY = 330;
  let topX = 110 + x * 5;
  stroke(220, 20, 45);
  line(40, baseY, 180, baseY);
  noFill();
  stroke(220, 10, 75);
  strokeWeight(1 + k / 1600);
  bezier(110, baseY, 110, baseY - 80, topX, 190, topX, 150);
  strokeWeight(1);
  noStroke();
  fill(45, 70, 100);
  let size = 24 + m / 6;
  rect(topX - size / 2, 150 - size, size, size, 4);

  // 右: ずれの記録
  let gx = 230, gw = 340, mid = 200;
  textSize(13);
  for (let s = 0; s <= 8; s += 2) {
    stroke(220, 20, 22);
    line(gx + (s / 8) * gw, mid - 100, gx + (s / 8) * gw, mid + 100);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(s, gx + (s / 8) * gw, mid + 106);
  }
  text('時間 (s)', gx + gw / 2, mid + 124);
  stroke(220, 20, 35);
  line(gx, mid, gx + gw, mid);
  noStroke();
  textAlign(RIGHT, CENTER);
  text('+10', gx - 6, mid - 90);
  text('0', gx - 6, mid);
  text('-10', gx - 6, mid + 90);
  textAlign(LEFT, BASELINE);
  text('ずれ (cm)', gx - 30, mid - 110);
  noFill();
  stroke(45, 70, 100);
  strokeWeight(2);
  beginShape();
  for (let p of trace) vertex(gx + (p.t / 8) * gw, mid - p.x * 9);
  endShape();
  strokeWeight(1);

  // 読み取り値
  noStroke();
  fill(0, 0, 95);
  textSize(14);
  text('質量 ' + m + ' t   かたさ ' + k + ' kN/m', 230, 30);
  fill(190, 60, 100);
  text('T = 2π√(m/k) = ' + nf(period, 1, 2) + ' s', 230, 52);
  if (crossings.length >= 2) {
    fill(45, 70, 100);
    text('グラフから測った周期 ' + nf(crossings[1] - crossings[0], 1, 2) + ' s', 230, 74);
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) pluck();
}`;

const RESONANCE_SKETCH = `const NATURAL_T = 1.0; // 建物の固有周期 (s)
const AMP = 2;         // 地面の揺れ幅 (cm)

let periodSlider, dampSlider;
let x = 0, v = 0, phase = 0, peak = 0;
let logGround = [];
let logBuilding = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 地面が揺れる周期 (s)
  periodSlider = createSlider(0.3, 3, 1, 0.05);
  periodSlider.size(260);
  periodSlider.attribute('aria-label', '地面の揺れの周期');
  // 減衰比 (%)
  dampSlider = createSlider(3, 30, 5, 1);
  dampSlider.size(260);
  dampSlider.attribute('aria-label', '減衰比');
}

function draw() {
  background(225, 30, 9);
  let groundT = periodSlider.value();
  let zeta = dampSlider.value() / 100;
  let w = TWO_PI / NATURAL_T;
  let wg = TWO_PI / groundT;
  let dt = min(deltaTime / 1000, 0.05);

  for (let s = 0; s < 8; s++) {
    let h = dt / 8;
    phase += wg * h;
    // 運動方程式: x'' = -2ζω x' - ω² x - (地面の加速度)
    let ag = -AMP * wg * wg * sin(phase);
    v += (-2 * zeta * w * v - w * w * x - ag) * h;
    x += v * h;
  }
  let ground = AMP * sin(phase);
  peak = max(peak * 0.998, abs(x));
  logGround.push(ground);
  logBuilding.push(x);
  if (logGround.length > 340) {
    logGround.shift();
    logBuilding.shift();
  }

  // 左: 地面と建物（1cmを2pxで描く）
  let baseY = 330;
  let gxp = 110 + ground * 2;
  let topX = gxp + x * 2;
  noStroke();
  fill(220, 20, 22);
  rect(gxp - 80, baseY, 160, 10);
  noFill();
  stroke(220, 10, 75);
  strokeWeight(3);
  bezier(gxp, baseY, gxp, baseY - 80, topX, 200, topX, 160);
  strokeWeight(1);
  noStroke();
  fill(20, 70, 100);
  rect(topX - 20, 120, 40, 40, 4);

  // 右: 2本の記録
  let gx = 230, mid = 205;
  stroke(220, 20, 35);
  line(gx, mid, gx + 340, mid);
  noFill();
  strokeWeight(1.5);
  stroke(0, 0, 100, 60);
  beginShape();
  for (let i = 0; i < logGround.length; i++) vertex(gx + i, mid - logGround[i] * 3);
  endShape();
  stroke(20, 70, 100);
  beginShape();
  for (let i = 0; i < logBuilding.length; i++) vertex(gx + i, mid - logBuilding[i] * 3);
  endShape();
  strokeWeight(1);

  noStroke();
  textSize(14);
  textAlign(LEFT, BASELINE);
  fill(0, 0, 95);
  text('建物の固有周期 ' + nf(NATURAL_T, 1, 2) + ' s', 230, 30);
  text('地面の周期 ' + nf(groundT, 1, 2) + ' s   減衰比 ' + dampSlider.value() + '%', 230, 52);
  fill(20, 70, 100);
  text('建物のずれ ÷ 地面の揺れ幅 = ' + nf(peak / AMP, 1, 1) + '倍', 230, 74);
  textSize(13);
  fill(0, 0, 100, 60);
  text('白: 地面の動き', 230, 370);
  fill(20, 70, 100);
  text('橙: 建物の、地面に対するずれ', 340, 370);
}`;

const MULTI_SKETCH = `// 5階建てを「5つのおもりと5本のばね」で表す（せん断型モデル）
const N = 5;
const K = 487;   // 各階のばね定数 ÷ 各階の質量 (1/s^2)
const C = 4.6;   // 各階の減衰係数 ÷ 各階の質量 (1/s)
const AMP = 2;   // 地面の揺れ幅 (cm)

let slider;
let x = [], v = [], peak = [];
let phase = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < N; i++) {
    x.push(0);
    v.push(0);
    peak.push(0);
  }
  slider = createSlider(0.2, 2, 1, 0.01);
  slider.size(300);
  slider.attribute('aria-label', '地面の揺れの周期');
}

function draw() {
  background(225, 30, 9);
  let groundT = slider.value();
  let wg = TWO_PI / groundT;
  let dt = min(deltaTime / 1000, 0.05);

  for (let s = 0; s < 10; s++) {
    let h = dt / 10;
    phase += wg * h;
    let ag = -AMP * wg * wg * sin(phase);
    // 先に全部の階の速度を進め、そのあと位置を進める
    for (let i = 0; i < N; i++) {
      let below = i === 0 ? 0 : x[i - 1];
      let belowV = i === 0 ? 0 : v[i - 1];
      // 下の階とのずれが、ばねとダンパーの力になる
      let a = -K * (x[i] - below) - C * (v[i] - belowV);
      // 上に階があれば、その反作用も受ける
      if (i < N - 1) a += K * (x[i + 1] - x[i]) + C * (v[i + 1] - v[i]);
      v[i] += (a - ag) * h;
    }
    for (let i = 0; i < N; i++) x[i] += v[i] * h;
  }
  let ground = AMP * sin(phase);

  // 左: 建物（1cmを2pxで描く）
  let baseY = 350, cx = 150, fh = 54;
  noStroke();
  fill(220, 20, 22);
  rect(cx - 110 + ground * 2, baseY, 220, 10);
  for (let i = 0; i < N; i++) {
    let lower = cx + (ground + (i === 0 ? 0 : x[i - 1])) * 2;
    let upper = cx + (ground + x[i]) * 2;
    let y = baseY - (i + 1) * fh;
    stroke(220, 10, 60);
    line(lower - 45, y + fh, upper - 45, y);
    line(lower + 45, y + fh, upper + 45, y);
    noStroke();
    fill(200 - i * 35, 60, 100);
    rect(upper - 55, y - 5, 110, 10, 3);
  }

  // 右: 階ごとの最大のずれ
  let gx = 400;
  stroke(220, 20, 35);
  line(gx, baseY, gx, baseY - N * fh - 10);
  textSize(13);
  for (let i = 0; i < N; i++) {
    peak[i] = max(peak[i] * 0.997, abs(x[i]));
    let y = baseY - (i + 1) * fh;
    noStroke();
    fill(200 - i * 35, 60, 100);
    rect(gx, y - 6, min(peak[i] * 3, 170), 12);
    fill(220, 10, 80);
    textAlign(RIGHT, CENTER);
    text(i + 1 + '階', gx - 8, y);
    textAlign(LEFT, CENTER);
    text(nf(peak[i], 1, 1) + ' cm', gx + min(peak[i] * 3, 170) + 6, y);
    // いまの瞬間のずれを白い線で重ねる
    stroke(0, 0, 100);
    line(gx + x[i] * 3, y - 9, gx + x[i] * 3, y + 9);
  }
  noStroke();
  fill(0, 0, 95);
  textAlign(LEFT, BASELINE);
  textSize(14);
  text('地面の周期 ' + nf(groundT, 1, 2) + ' s', 330, 30);
  fill(220, 10, 70);
  textSize(13);
  text('帯: 各階の最大のずれ  白線: いまのずれ', 330, 50);
}`;

const ISOLATION_SKETCH = `// 同じ5階建てを3棟並べる: そのまま・免震・制振
const N = 5;
const K = 487;   // 各階のばね定数 ÷ 質量 (1/s^2)
const C = 4.6;   // 各階の減衰係数 ÷ 質量 (1/s)
const AMP = 4;   // 地面の揺れ幅 (cm)

let slider;
let models = [];
let phase = 0;

function makeModel(label, ks, cs, cx) {
  let m = { label: label, ks: ks, cs: cs, cx: cx, x: [], v: [], drift: 0 };
  for (let i = 0; i < ks.length; i++) {
    m.x.push(0);
    m.v.push(0);
  }
  return m;
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  let k5 = [K, K, K, K, K];
  // そのまま
  models.push(makeModel('そのまま', k5, [C, C, C, C, C], 100));
  // 免震: いちばん下に、やわらかくて減衰の大きい層を1つ足す
  models.push(makeModel('免震', [26, K, K, K, K, K], [3.8, C, C, C, C, C], 300));
  // 制振: 各階のダンパーを8倍にする
  models.push(makeModel('制振', k5, [C * 8, C * 8, C * 8, C * 8, C * 8], 500));
  slider = createSlider(0.3, 4, 1, 0.05);
  slider.size(300);
  slider.attribute('aria-label', '地面の揺れの周期');
}

function advance(m, ag, h) {
  let n = m.x.length;
  for (let i = 0; i < n; i++) {
    let below = i === 0 ? 0 : m.x[i - 1];
    let belowV = i === 0 ? 0 : m.v[i - 1];
    let a = -m.ks[i] * (m.x[i] - below) - m.cs[i] * (m.v[i] - belowV);
    if (i < n - 1) {
      a += m.ks[i + 1] * (m.x[i + 1] - m.x[i]) + m.cs[i + 1] * (m.v[i + 1] - m.v[i]);
    }
    m.v[i] += (a - ag) * h;
  }
  for (let i = 0; i < n; i++) m.x[i] += m.v[i] * h;
}

function draw() {
  background(225, 30, 9);
  let groundT = slider.value();
  let wg = TWO_PI / groundT;
  let dt = min(deltaTime / 1000, 0.05);
  for (let s = 0; s < 10; s++) {
    let h = dt / 10;
    phase += wg * h;
    let ag = -AMP * wg * wg * sin(phase);
    for (let m of models) advance(m, ag, h);
  }
  let ground = AMP * sin(phase);

  let baseY = 300, fh = 40;
  noStroke();
  fill(220, 20, 22);
  rect(0, baseY, width, 8);
  stroke(220, 20, 45);
  for (let gx = -20; gx < width + 20; gx += 14) {
    line(gx + ground, baseY + 8, gx + ground - 6, baseY + 16);
  }

  for (let m of models) {
    let n = m.x.length;
    let extra = n - N; // 免震層があれば1
    // 上部5階ぶんの、階と階のずれ（層間変形）の最大
    let worst = 0;
    for (let i = extra; i < n; i++) {
      worst = max(worst, abs(m.x[i] - (i === 0 ? 0 : m.x[i - 1])));
    }
    m.drift = max(m.drift * 0.997, worst);
    let hue = m.label === 'そのまま' ? 20 : m.label === '免震' ? 190 : 140;

    for (let i = 0; i < n; i++) {
      let lower = m.cx + ground + (i === 0 ? 0 : m.x[i - 1]);
      let upper = m.cx + ground + m.x[i];
      let top = baseY - 12 * extra - (i + 1 - extra) * fh;
      if (i === 0 && extra === 1) {
        // 免震層: 地面と建物のあいだの、変形する支え
        noStroke();
        fill(190, 60, 100, 70);
        quad(lower - 34, baseY, lower - 22, baseY, upper - 22, baseY - 12, upper - 34, baseY - 12);
        quad(lower + 22, baseY, lower + 34, baseY, upper + 34, baseY - 12, upper + 22, baseY - 12);
        fill(hue, 50, 100);
        rect(upper - 46, baseY - 15, 92, 5);
        continue;
      }
      stroke(220, 10, 60);
      line(lower - 38, top + fh, upper - 38, top);
      line(lower + 38, top + fh, upper + 38, top);
      if (m.label === '制振') {
        // ダンパーを斜めの線で表す
        stroke(140, 60, 100);
        line(lower - 38, top + fh, upper + 38, top);
      }
      noStroke();
      fill(hue, 50, 100);
      rect(upper - 46, top - 4, 92, 8, 2);
    }
    noStroke();
    textAlign(CENTER, BASELINE);
    fill(hue, 50, 100);
    textSize(15);
    text(m.label, m.cx, baseY + 40);
    fill(0, 0, 95);
    textSize(13);
    text('層間変形の最大', m.cx, baseY + 60);
    textSize(17);
    text(nf(m.drift, 1, 1) + ' cm', m.cx, baseY + 82);
  }
  fill(0, 0, 95);
  textAlign(LEFT, BASELINE);
  textSize(14);
  text('地面の周期 ' + nf(groundT, 1, 2) + ' s   揺れ幅 ' + AMP + ' cm', 12, 24);
}`;

const th = "text-left p-3 font-semibold";
const rowTh = "text-left p-3 font-normal";

export default function Seismic() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 26</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          建物の揺れ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          建物を「おもりとばねとダンパー」に置き換えて、地面が揺れたときの動きを計算します。
          下の枠には高さの違う5つの建物が並び、同じ地面の揺れを受けています。
          スライダーで地面が揺れる周期を変えると、大きく揺れる建物が入れ替わります。
        </p>

        <CodePreview
          title="5つの建物と地面の揺れ（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          建物の下の数字は、階数、固有周期（その建物が揺れやすい周期）、地面の揺れ幅に対する倍率です。
          周期を0.6秒にすると左端の低い建物が、4.8秒にすると右端の高い建物がいちばん揺れます。
          揺れ幅は見やすいよう拡大して描いています。
        </p>

        <WhyNowBox
          title="なぜ建物をばねで表すのか"
          tags={["固有周期", "共振", "減衰比", "多質点系", "免震・制振"]}
        >
          <p>
            建物は地震のとき、柱や壁がしなって元に戻ろうとします。この「ずれると戻る」性質はばねと同じ式で書けます。
            ばねの振動は
            <Link
              href="/p5js/lab/falling-bodies"
              className="text-primary underline"
            >
              落下と数値計算
            </Link>
            のページで半陰的オイラー法を使って計算しました。同じ数行のコードで、共振や免震といった耐震の基本的な考え方を自分で確かめられます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              固有周期: 建物ごとに決まった揺れのリズム
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              いちばん単純なモデルは、1本の柱の上におもりが1つ載った形です（1自由度系）。おもりを横に引いて離すと、決まった周期で揺れます。
              この周期を固有周期と呼び、質量mとばね定数（柱のかたさ）kからT =
              2π√(m/k)で求められます。重いほど長く、かたいほど短くなります。
            </p>
            <CodePreview
              title="引いて離す（質量とかたさを変える）"
              language="js"
              code={FREE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              上のスライダーが質量、下のスライダーが柱のかたさです。水色の数字は式で求めた周期、黄色の数字はグラフの波から測った周期です。
              キャンバスをクリックすると、もう一度引いて離します。
              揺れがだんだん小さくなるのは減衰（エネルギーが熱などに変わって失われること）を入れているからです。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  質量のスライダーを4倍にする（50から200へ。周期は2倍になる）
                </li>
                <li>
                  <code className={code}>-2 * 0.03 * w * v</code>
                  の0.03を0にする（減衰がなくなり、揺れが続く）
                </li>
                <li>同じ0.03を0.3にする（1〜2回揺れただけで止まる）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              共振: 地面の周期が固有周期に近いと大きく揺れる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              次に、地面を正弦波で左右に揺らします。建物の「地面に対するずれ」をxとすると、運動方程式は次の形になります。
            </p>
            <div className="rounded-xl border border-border bg-card p-5 my-4 overflow-x-auto">
              <p className="font-mono text-foreground text-center whitespace-nowrap">
                m x″ + c x′ + k x = −m a<sub>g</sub>(t)
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
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      m x″
                    </th>
                    <td className="p-3">質量 × 加速度</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      c x′
                    </th>
                    <td className="p-3">
                      ダンパーの力。速度に比例して動きを弱める
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      k x
                    </th>
                    <td className="p-3">ばねの力。ずれに比例して元へ戻す</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      −m a<sub>g</sub>(t)
                    </th>
                    <td className="p-3">
                      地面が加速度a<sub>g</sub>
                      で動くことで、建物が逆向きに受ける見かけの力
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              両辺をmで割ると、x″ = −2ζω x′ − ω² x − a<sub>g</sub>
              になります。ωは2π ÷ 固有周期、ζは減衰比（c ÷
              2√(mk)）です。スケッチの中で速度vを進めている1行が、この式を書いたものです。
            </p>
            <CodePreview
              title="地面の周期と減衰比を変える"
              language="js"
              code={RESONANCE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              上のスライダーが地面の周期、下のスライダーが減衰比です。建物の固有周期は1.00秒に固定しています。
              地面の周期を1.00秒に合わせると、地面の揺れ幅の約10倍まで揺れます（減衰比5%のとき）。これが共振です。
              周期を0.3秒や3秒へ離すと、揺れは地面と同じ程度かそれ以下になります。減衰比を上げると、共振のときの倍率が下がります。
            </p>
            <InfoBox type="warning" title="式の固有周期と、スライダーで探した周期">
              <p>
                式の上では、揺れが最大になるのは地面の周期が固有周期にほぼ一致するときです。スライダーで探すと、少しずれた所で最大に見えることがあります。
                理由は、周期を変えた直後は前の揺れが残っていること、倍率の表示が直近の最大値をゆっくり忘れる作りになっていることです。
                数秒待ってから読むと、式に近い結果になります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              多質点系: 階ごとに揺れ方が違う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              階数のある建物は、各階の床をおもり、階と階のあいだの柱をばねとダンパーとみなして、おもりを縦につなげた形で表せます。
              これを多質点系（せん断型モデル）と呼びます。各階が受ける力は、下の階とのずれと、上の階とのずれで決まります。
            </p>
            <CodePreview
              title="5階建てを5つのおもりで表す"
              language="js"
              code={MULTI_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              このモデルは揺れやすい周期を複数持ちます。この設定では、長いほうから2つが約1.00秒と約0.34秒です。
              スライダーを1.00秒にすると、全部の階が同じ向きに揺れ、上の階ほど大きく揺れます。
              0.34秒にすると、上の階と下の階が逆向きに動くS字の揺れ方になります。揺れ方の形を振動モードと呼びます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>const K = 487</code>
                  を4倍の1948にする（建物がかたくなり、揺れやすい周期が半分の約0.5秒へ移る）
                </li>
                <li>
                  <code className={code}>const C = 4.6</code>
                  を20にする（減衰が増え、共振しても揺れが育ちにくい）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              高さと固有周期、応答スペクトル
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              高い建物ほど固有周期は長くなる傾向があります。
              <Ext href="https://ja.wikipedia.org/wiki/%E9%95%B7%E5%91%A8%E6%9C%9F%E5%9C%B0%E9%9C%87%E5%8B%95">
                Wikipedia「長周期地震動」
              </Ext>
              は「高層建築では振動数が低く長周期となることが一般的である」とし、略算として鉄筋コンクリート造は0.02×高さ(m)、鉄骨造は0.03×高さ(m)という式を紹介しています。
              冒頭のスケッチは、1階ぶんを4mと仮定して鉄骨造の略算式で固有周期を決めました。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              そのため、短い周期でガタガタ揺れる地震動では低い建物が、ゆっくり大きく揺れる長周期の地震動では高い建物が揺れやすくなります。
              1985年のメキシコ地震では、軟らかい地盤の揺れの周期が中層の建物の固有周期に近く、それより低い建物や高い建物より中層の被害が大きかったことが
              <Ext href="https://en.wikipedia.org/wiki/Response_spectrum">
                Wikipedia「Response spectrum」
              </Ext>
              に書かれています。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              冒頭のスケッチのように「固有周期の違うおもりを同じ揺れで揺らし、それぞれの最大の揺れを並べたもの」を応答スペクトルと呼びます。
              ある地震動がどの周期の建物を強く揺らすかを、1枚のグラフで読み取るための道具です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              免震と制振をパラメータで比べる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              揺れを減らす代表的な方法が2つあります。免震は、建物と地面のあいだにやわらかい層を入れて固有周期を長くし、地面の揺れが伝わりにくくする方法です。
              制振（制震とも書きます）は、建物の中にダンパーを入れて減衰を増やし、揺れのエネルギーを吸収する方法です。
              下のスケッチは同じ5階建てを3棟並べ、モデルのパラメータだけを変えています。
            </p>
            <CodePreview
              title="そのまま・免震・制振"
              language="js"
              code={ISOLATION_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className={th}>
                      モデル
                    </th>
                    <th scope="col" className={th}>
                      変えたパラメータ
                    </th>
                    <th scope="col" className={th}>
                      ねらい
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh}>
                      そのまま
                    </th>
                    <td className="p-3">なし（固有周期は約1.0秒）</td>
                    <td className="p-3">比較の基準</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh}>
                      免震
                    </th>
                    <td className="p-3">
                      いちばん下に、ばね定数が約19分の1の層を足す（固有周期は約3.1秒）
                    </td>
                    <td className="p-3">周期を伸ばして共振を避ける</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh}>
                      制振
                    </th>
                    <td className="p-3">各階の減衰係数を8倍にする</td>
                    <td className="p-3">減衰を増やして揺れを吸収する</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              数字は層間変形（階と階のずれ）の最大値で、柱や壁がどれだけゆがむかの目安です。地面の周期が1.0秒のとき、そのままの建物は大きくゆがみ、
              免震の建物は下の層だけが動いて上の階はほとんどゆがみません。スライダーを3秒付近にすると、今度は免震の建物の動きが大きくなります。
              伸ばした周期が地面の周期と重なるからです。このモデルでは、方法ごとに得意な周期と苦手な周期があることが分かります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              現場ではどう使われているか
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
              <li>
                計算だけでなく、実物を揺らす実験も行われます。防災科学技術研究所の実大三次元震動破壊実験施設（愛称E－ディフェンス、兵庫県三木市）について、
                <Ext href="https://www.bosai.go.jp/study/edefense.html">
                  同研究所の施設紹介
                </Ext>
                は「実大規模の建物（戸建2棟分、中層建物もそのまま）などに兵庫県南部地震クラスの地震の揺れを前後・左右・上下の三次元に直接与えることで、その揺れや損傷、崩壊の過程を詳細に検討できます」と説明しています。
                震動台の大きさは20m×15m、最大搭載荷重は12MN（1200tonf）です。
              </li>
              <li>
                免震と制振の違いは
                <Ext href="https://ja.wikipedia.org/wiki/%E5%85%8D%E9%9C%87">
                  Wikipedia「免震」
                </Ext>
                に「免震の場合には長周期化による地震力の低減が主、減衰による変位の抑制が従であるのに対し、制震の場合には減衰による地震力、変位の低減を主とする」と整理されています。上のスケッチのパラメータの変え方はこの整理に沿っています。
              </li>
              <li>
                応答スペクトルは、ある地震動に対して固有周期の違う振動系がどれだけ揺れるかを並べたグラフで、建物の地震時の最大応答を見積もる用途に使われます（
                <Ext href="https://en.wikipedia.org/wiki/Response_spectrum">
                  Wikipedia「Response spectrum」
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
                ばねは「ずれに比例して戻る」線形のままです。実際の建物は大きく変形すると部材が傷み、かたさが変わります（非線形）
              </li>
              <li>
                揺れは横の1方向だけです。実際の地震動は前後・左右・上下に同時に揺れ、建物はねじれもします
              </li>
              <li>
                地面の揺れは1つの周期の正弦波です。実際の地震動はさまざまな周期が混ざり、時間とともに変わります
              </li>
              <li>
                地盤は建物の影響を受けずに動くものとしています。実際は地盤と建物が互いに影響し合います
              </li>
              <li>
                質量・ばね定数・減衰の値は、動きが見やすいように選んだものです。固有周期の略算式も目安で、実際の建物の値ではありません
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              実際の耐震設計は、これらをすべて扱う解析と実験、法令にもとづいて行われます。
              このページの単純なモデルで、特定の建物の安全性を判断することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="固有周期を計算する"
              description="___ を埋めて、質量とかたさから固有周期を計算してください。埋めると、おもりがその周期で揺れます。"
              preview
              initialCode={`const mass = 40;    // 質量 (t)
const stiff = 1600; // 柱のかたさ (kN/m)
let x = 10;
let v = 0;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  // 固有周期の式: T = 2π√(m/k)
  let period = TWO_PI * sqrt(___ / ___);
  let w = TWO_PI / period;
  let h = min(deltaTime / 1000, 0.05) / 8;
  for (let s = 0; s < 8; s++) {
    v += -w * w * x * h;
    x += v * h;
  }
  stroke(200);
  strokeWeight(3);
  line(200, 280, 200 + x * 8, 120);
  noStroke();
  fill(255, 200, 80);
  rect(180 + x * 8, 80, 40, 40, 4);
  fill(230);
  textSize(14);
  text('固有周期 ' + nf(period, 1, 2) + ' s', 12, 24);
}`}
              answer={`const mass = 40;    // 質量 (t)
const stiff = 1600; // 柱のかたさ (kN/m)
let x = 10;
let v = 0;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  // 固有周期の式: T = 2π√(m/k)
  let period = TWO_PI * sqrt(mass / stiff);
  let w = TWO_PI / period;
  let h = min(deltaTime / 1000, 0.05) / 8;
  for (let s = 0; s < 8; s++) {
    v += -w * w * x * h;
    x += v * h;
  }
  stroke(200);
  strokeWeight(3);
  line(200, 280, 200 + x * 8, 120);
  noStroke();
  fill(255, 200, 80);
  rect(180 + x * 8, 80, 40, 40, 4);
  fill(230);
  textSize(14);
  text('固有周期 ' + nf(period, 1, 2) + ' s', 12, 24);
}`}
              keywords={["sqrt(mass", "stiff)"]}
              hints={[
                "T = 2π√(m/k)のmは質量です。割り算の左側に定数massを書きます",
                "T = 2π√(m/k)のkはかたさです。割り算の右側に定数stiffを書きます",
              ]}
            />
            <CodingChallenge
              title="地面の揺れで共振させる"
              description="___ を埋めて、運動方程式を半陰的オイラー法で進めてください。ばねの力に使う量と、位置を進めるのに使う量を入れます。"
              preview
              initialCode={`const ZETA = 0.05;     // 減衰比
const NATURAL_T = 1.0; // 建物の固有周期 (s)
const GROUND_T = 1.0;  // 地面が揺れる周期 (s)
const AMP = 2;         // 地面の揺れ幅 (cm)
let x = 0;
let v = 0;
let phase = 0;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  let w = TWO_PI / NATURAL_T;
  let wg = TWO_PI / GROUND_T;
  let h = min(deltaTime / 1000, 0.05) / 8;
  for (let s = 0; s < 8; s++) {
    phase += wg * h;
    let ag = -AMP * wg * wg * sin(phase);
    // 先に速度を進め、新しい速度で位置を進める
    v += (-2 * ZETA * w * v - w * w * ___ - ag) * h;
    x += ___ * h;
  }
  let ground = AMP * sin(phase);
  let gx = 200 + ground * 3;
  noStroke();
  fill(70, 74, 90);
  rect(gx - 80, 270, 160, 10);
  stroke(200);
  strokeWeight(3);
  line(gx, 270, gx + x * 3, 130);
  noStroke();
  fill(255, 140, 80);
  rect(gx + x * 3 - 20, 90, 40, 40, 4);
}`}
              answer={`const ZETA = 0.05;     // 減衰比
const NATURAL_T = 1.0; // 建物の固有周期 (s)
const GROUND_T = 1.0;  // 地面が揺れる周期 (s)
const AMP = 2;         // 地面の揺れ幅 (cm)
let x = 0;
let v = 0;
let phase = 0;

function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  let w = TWO_PI / NATURAL_T;
  let wg = TWO_PI / GROUND_T;
  let h = min(deltaTime / 1000, 0.05) / 8;
  for (let s = 0; s < 8; s++) {
    phase += wg * h;
    let ag = -AMP * wg * wg * sin(phase);
    // 先に速度を進め、新しい速度で位置を進める
    v += (-2 * ZETA * w * v - w * w * x - ag) * h;
    x += v * h;
  }
  let ground = AMP * sin(phase);
  let gx = 200 + ground * 3;
  noStroke();
  fill(70, 74, 90);
  rect(gx - 80, 270, 160, 10);
  stroke(200);
  strokeWeight(3);
  line(gx, 270, gx + x * 3, 130);
  noStroke();
  fill(255, 140, 80);
  rect(gx + x * 3 - 20, 90, 40, 40, 4);
}`}
              keywords={["w * w * x", "v * h"]}
              hints={[
                "ばねの力は「地面に対するずれ」に比例します。空欄には、ずれを表す変数xを書きます",
                "位置は、いま進めたばかりの速度で進めます。空欄には、速度を表す変数vを書きます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の5つの建物を、自分の街や作品に作り替えます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>const FLOORS = [5, 10, 18, 28, 40]</code>
                の数を変える。階数の近い建物を並べると、周期を少し動かしただけで揺れる建物が移っていく
              </li>
              <li>
                <code className={code}>const ZETA = 0.05</code>
                を0.02にする。共振したときの揺れが大きくなり、ゆらゆらと長く続く
              </li>
              <li>
                地面の揺れを2つの正弦波の和にする（
                <code className={code}>sin(phase) + 0.5 * sin(phase * 3.1)</code>
                など）。複数の建物が同時に揺れる
              </li>
              <li>
                建物を草や木、海藻の形に描き替える。同じ式で、風にそよぐ植物のアニメーションになる
              </li>
              <li>
                マウスの左右の動きを地面の動きにする。自分の手で「どの速さで揺するとどれが揺れるか」を探せる
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="固有周期1.0秒の建物（減衰比5%）がいちばん大きく揺れるのは、地面がどの周期で揺れるとき？"
              options={[
                { label: "0.1秒（とても速い揺れ）" },
                { label: "1.0秒付近", correct: true },
                { label: "10秒（とてもゆっくりした揺れ）" },
                { label: "周期には関係しない" },
              ]}
              explanation="地面の周期が建物の固有周期に近いと、揺れが1回ごとに積み重なって大きくなります（共振）。離れた周期では、地面と同じ程度かそれ以下の揺れにとどまります。"
            />
            <Quiz
              question="このページのモデルで、免震はどのパラメータを変えて揺れを減らしている？"
              options={[
                { label: "建物全体の質量を軽くする" },
                { label: "各階のダンパーを強くする" },
                {
                  label:
                    "建物の下にやわらかい層を入れ、固有周期を長くする",
                  correct: true,
                },
                { label: "地面の揺れ幅を小さくする" },
              ]}
              explanation="免震は、やわらかい層で固有周期を伸ばし、地面の揺れの周期から離すことで揺れを伝わりにくくします。ダンパーで減衰を増やすのは制振の考え方です。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "建物は、おもり・ばね・ダンパーでできた振動系として表せる",
                  "固有周期はT = 2π√(m/k)。重いほど長く、かたいほど短い",
                  "地面の周期が固有周期に近いと共振し、減衰が小さいほど大きく揺れる",
                  "多質点系は揺れやすい周期を複数持ち、周期ごとに揺れ方の形が違う",
                  "免震は周期を伸ばし、制振は減衰を増やす",
                  "単純な線形モデルは原理を確かめるためのもので、建物の安全性の判断には使えない",
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
                  title: "防災科学技術研究所: E－ディフェンス（施設紹介）",
                  url: "https://www.bosai.go.jp/study/edefense.html",
                  description:
                    "実大三次元震動破壊実験施設の概要と、震動台の基本仕様",
                },
                {
                  title: "Wikipedia: Harmonic oscillator",
                  url: "https://en.wikipedia.org/wiki/Harmonic_oscillator",
                  description:
                    "ばねとダンパーの振動の式、減衰比、外から揺らしたときの共振",
                },
                {
                  title: "Wikipedia: Mechanical resonance",
                  url: "https://en.wikipedia.org/wiki/Mechanical_resonance",
                  description: "機械的な共振の定義と、構造物での例",
                },
                {
                  title: "Wikipedia: Response spectrum",
                  url: "https://en.wikipedia.org/wiki/Response_spectrum",
                  description: "応答スペクトルの定義と、地震工学での使い方",
                },
                {
                  title: "Wikipedia: 長周期地震動",
                  url: "https://ja.wikipedia.org/wiki/%E9%95%B7%E5%91%A8%E6%9C%9F%E5%9C%B0%E9%9C%87%E5%8B%95",
                  description: "建物の高さと固有周期の関係、略算式",
                },
                {
                  title: "Wikipedia: 免震",
                  url: "https://ja.wikipedia.org/wiki/%E5%85%8D%E9%9C%87",
                  description: "免震・制震・耐震の考え方の違い",
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
