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

// このページの完成形。振動する板の上で、砂が節線に集まって模様になる
const HERO_SKETCH = `// クラドニ図形: 振動する正方形の板の上で、砂が「揺れない線」に集まる
const PLATE = 360; // 板の一辺 (px)
const OX = 20;
const OY = 20;
// 触るまでのあいだ、順に見せる(n, m)の組
const TOUR = [[1, 2], [2, 3], [1, 4], [3, 5], [2, 6], [4, 7], [3, 8], [5, 6]];

let sand = [];
let nSlider, mSlider;
let auto = true;
let tourIndex = 0;
let tourStart = 0;
let mapImage;
let mapKey = '';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < 6000; i++) sand.push({ x: random(), y: random() });
  nSlider = createSlider(1, 8, TOUR[0][0], 1);
  nSlider.size(220);
  nSlider.attribute('aria-label', 'n');
  mSlider = createSlider(1, 8, TOUR[0][1], 1);
  mSlider.size(220);
  mSlider.attribute('aria-label', 'm');
  mapImage = createImage(40, 40);
}

// 板の上の点(x, y)の揺れの大きさ。x, yは0〜1。0になる所が節線
function amplitude(x, y, n, m) {
  // n = mのときは引き算が全体で0になるので、1つの波だけを使う
  if (n === m) return cos(n * PI * x) * cos(n * PI * y);
  return cos(n * PI * x) * cos(m * PI * y) - cos(m * PI * x) * cos(n * PI * y);
}

function draw() {
  background(225, 30, 9);

  // スライダーに触るまでは、6秒ごとに次の組へ進む
  if (auto) {
    if (nSlider.value() !== TOUR[tourIndex][0] || mSlider.value() !== TOUR[tourIndex][1]) {
      auto = false;
    } else if (millis() - tourStart > 6000) {
      tourIndex = (tourIndex + 1) % TOUR.length;
      nSlider.value(TOUR[tourIndex][0]);
      mSlider.value(TOUR[tourIndex][1]);
      tourStart = millis();
    }
  }
  let n = nSlider.value();
  let m = mSlider.value();

  // 板
  stroke(35, 30, 45);
  fill(30, 35, 13);
  rect(OX, OY, PLATE, PLATE, 2);

  // 砂: 揺れの大きい場所ほど大きく跳ね、揺れない節線の上にたまっていく
  stroke(42, 30, 100, 80);
  strokeWeight(1.5);
  for (let g of sand) {
    let hop = abs(amplitude(g.x, g.y, n, m)) * 0.04 + 0.0004;
    g.x = constrain(g.x + random(-hop, hop), 0, 1);
    g.y = constrain(g.y + random(-hop, hop), 0, 1);
    point(OX + g.x * PLATE, OY + g.y * PLATE);
  }
  strokeWeight(1);

  // 右: 読み取り値と、揺れの大きさの地図
  noStroke();
  fill(0, 0, 95);
  textSize(22);
  text('n = ' + n, 410, 50);
  text('m = ' + m, 500, 50);
  fill(220, 10, 70);
  textSize(12);
  text('cos(nπx)cos(mπy)', 410, 80);
  text('  − cos(mπx)cos(nπy) = 0', 410, 97);

  if (mapKey !== n + ',' + m) {
    mapKey = n + ',' + m;
    mapImage.loadPixels();
    for (let j = 0; j < 40; j++) {
      for (let i = 0; i < 40; i++) {
        let a = abs(amplitude((i + 0.5) / 40, (j + 0.5) / 40, n, m)) / 2;
        let k = 4 * (i + j * 40);
        mapImage.pixels[k] = 30 + 225 * a;
        mapImage.pixels[k + 1] = 30 + 150 * a;
        mapImage.pixels[k + 2] = 45 + 60 * a;
        mapImage.pixels[k + 3] = 255;
      }
    }
    mapImage.updatePixels();
  }
  image(mapImage, 410, 130, 160, 160);
  noFill();
  stroke(35, 30, 45);
  rect(410, 130, 160, 160);
  noStroke();
  fill(220, 10, 70);
  text('揺れの大きさ', 410, 310);
  text('（暗い線が節線）', 410, 327);
  text(auto ? '自動で切り替え中' : 'スライダーで操作中', 410, 372);
}`;

const FOURIER_SKETCH = `let slider;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 足し合わせる正弦波の本数
  slider = createSlider(1, 30, 3, 1);
  slider.size(260);
  slider.attribute('aria-label', '正弦波の本数');
}

function draw() {
  background(225, 30, 9);
  let terms = slider.value();
  let shift = millis() / 1500;
  let mid = 130;
  let amp = 70;

  // めざす矩形波
  stroke(220, 20, 40);
  noFill();
  beginShape();
  for (let px = 30; px <= 570; px++) {
    let x = map(px, 30, 570, 0, 2 * TWO_PI) + shift;
    vertex(px, mid - (sin(x) >= 0 ? amp : -amp));
  }
  endShape();

  // 足す前の正弦波を1本ずつ（最初の5本まで）
  for (let k = 0; k < min(terms, 5); k++) {
    let h = 2 * k + 1; // 1, 3, 5, ... 倍の周波数
    stroke(190 + k * 30, 50, 90, 45);
    beginShape();
    for (let px = 30; px <= 570; px += 2) {
      let x = map(px, 30, 570, 0, 2 * TWO_PI) + shift;
      vertex(px, mid - ((4 / PI) * amp * sin(h * x)) / h);
    }
    endShape();
  }

  // 全部を足した波
  stroke(45, 70, 100);
  strokeWeight(2);
  beginShape();
  for (let px = 30; px <= 570; px++) {
    let x = map(px, 30, 570, 0, 2 * TWO_PI) + shift;
    let y = 0;
    for (let k = 0; k < terms; k++) {
      let h = 2 * k + 1;
      y += ((4 / PI) * sin(h * x)) / h;
    }
    vertex(px, mid - y * amp);
  }
  endShape();
  strokeWeight(1);

  // 下: どの周波数の波を、どの強さで足したか
  let base = 360;
  stroke(220, 20, 40);
  line(30, base, 570, base);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  for (let h = 1; h <= 59; h += 2) {
    let used = (h + 1) / 2 <= terms;
    fill(45, 70, 100, used ? 100 : 15);
    let bar = ((4 / PI) * 90) / h;
    rect(30 + h * 9 - 3, base - bar, 6, bar);
    if (h % 10 === 1 || h === 5) {
      fill(220, 10, 70);
      text(h, 30 + h * 9, base + 5);
    }
  }
  fill(220, 10, 70);
  textAlign(LEFT, BASELINE);
  text('周波数（基本の何倍か）と強さ', 330, 260);
  fill(0, 0, 95);
  textSize(14);
  text('正弦波 ' + terms + '本', 30, 28);
}`;

const SPECTRUM_SKETCH = `let audio, osc, analyser, bins;
let button, slider;
let message = 'ボタンを押すと、小さな音量で音が出ます';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  button = createButton('音を出す');
  button.mousePressed(toggleSound);
  // 鳴らす音の周波数 (Hz)
  slider = createSlider(110, 880, 440, 10);
  slider.size(260);
  slider.attribute('aria-label', '周波数');
}

function toggleSound() {
  if (!audio) {
    try {
      audio = new AudioContext();
    } catch (e) {
      message = 'このブラウザでは音を扱えません';
      return;
    }
    // オシレーター → アナライザー → 音量 → スピーカー
    osc = audio.createOscillator();
    osc.type = 'square';
    analyser = audio.createAnalyser();
    analyser.fftSize = 2048;
    // 縦軸に割り当てるデシベルの範囲を広げ、強い音が上端で頭打ちにならないようにする
    analyser.minDecibels = -80;
    analyser.maxDecibels = 0;
    bins = new Uint8Array(analyser.frequencyBinCount);
    let volume = audio.createGain();
    volume.gain.value = 0.04;
    osc.connect(analyser);
    analyser.connect(volume);
    volume.connect(audio.destination);
    osc.start();
    button.html('音を止める');
  } else if (audio.state === 'running') {
    audio.suspend();
    button.html('音を出す');
  } else {
    audio.resume();
    button.html('音を止める');
  }
}

function draw() {
  background(225, 30, 9);
  let gx = 50, gy = 340, gw = 520, gh = 250;
  let maxHz = 8000;

  // 軸（1000Hzごと）
  textSize(12);
  for (let hz = 0; hz <= maxHz; hz += 1000) {
    let x = gx + (hz / maxHz) * gw;
    stroke(220, 20, 22);
    line(x, gy, x, gy - gh);
    noStroke();
    fill(220, 10, 70);
    textAlign(CENTER, TOP);
    text(hz / 1000, x, gy + 6);
  }
  text('周波数 (kHz)', gx + gw / 2, gy + 24);
  textAlign(LEFT, BASELINE);
  text('強さ (dB)', gx - 30, gy - gh - 30);
  stroke(220, 20, 45);
  line(gx, gy, gx + gw, gy);

  let freq = slider.value();
  noStroke();
  fill(0, 0, 95);
  textSize(14);
  if (!analyser) {
    text(message, gx + 10, 24);
    return;
  }
  osc.frequency.value = freq;
  analyser.getByteFrequencyData(bins);

  // ビン1つぶんの幅 = サンプルレート ÷ fftSize
  let binHz = audio.sampleRate / analyser.fftSize;
  noStroke();
  for (let i = 0; i < bins.length; i++) {
    let hz = i * binHz;
    if (hz > maxHz) break;
    let level = bins[i] / 255;
    fill(260 - 220 * level, 70, 100);
    rect(gx + (hz / maxHz) * gw, gy - level * gh, 2, level * gh);
  }

  // 矩形波に含まれるはずの周波数（1, 3, 5, ... 倍）に印をつける
  textAlign(CENTER, BASELINE);
  textSize(12);
  fill(0, 0, 100, 80);
  for (let h = 1; h * freq <= maxHz; h += 2) {
    let x = gx + ((h * freq) / maxHz) * gw;
    triangle(x - 4, gy - gh - 8, x + 4, gy - gh - 8, x, gy - gh - 1);
    if (h <= 9) text(h + '倍', x, gy - gh - 12);
  }
  textAlign(LEFT, BASELINE);
  fill(0, 0, 95);
  textSize(13);
  text(freq + ' Hzの矩形波   ビン幅 = ' + audio.sampleRate + ' ÷ ' + analyser.fftSize + ' = ' + nf(binHz, 1, 1) + ' Hz', gx + 10, 24);
}`;

const SPECTROGRAM_SKETCH = `const GX = 55;   // グラフの左端
const GY = 20;   // グラフの上端
const GW = 525;
const GH = 320;
const MAX_HZ = 5000;

let audio, analyser, bins, osc;
let sweepButton;
let column = 0;
let message = '「スイープ音を出す」を押すと始まります（小さな音量）';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(225, 30, 9);
  sweepButton = createButton('スイープ音を出す');
  sweepButton.mousePressed(toggleSweep);
  createButton('マイクも使う（任意）').mousePressed(startMic);
  // 周波数の目盛り
  textSize(12);
  textAlign(RIGHT, CENTER);
  noStroke();
  fill(220, 10, 70);
  for (let hz = 0; hz <= MAX_HZ; hz += 1000) {
    text(hz / 1000 + ' kHz', GX - 6, GY + GH - (hz / MAX_HZ) * GH);
  }
}

function ready() {
  if (audio) return true;
  try {
    audio = new AudioContext();
  } catch (e) {
    message = 'このブラウザでは音を扱えません';
    return false;
  }
  analyser = audio.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.2;
  bins = new Uint8Array(analyser.frequencyBinCount);
  return true;
}

function toggleSweep() {
  if (!ready()) return;
  if (osc) {
    // 鳴っているときに押したら止める
    osc.stop();
    osc = null;
    sweepButton.html('スイープ音を出す');
    return;
  }
  // 倍音を多く含むのこぎり波を、ゆっくり上下させる
  osc = audio.createOscillator();
  osc.type = 'sawtooth';
  let volume = audio.createGain();
  volume.gain.value = 0.03;
  osc.connect(analyser);
  osc.connect(volume);
  volume.connect(audio.destination);
  osc.start();
  sweepButton.html('スイープ音を止める');
  message = '時間 →  縦: 周波数  色: 強さ';
}

function startMic() {
  if (!ready()) return;
  if (!navigator.mediaDevices) {
    message = 'マイクを使えない環境です。スイープ音で試せます';
    return;
  }
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // マイクの音はアナライザーにだけつなぐ（スピーカーには出さない）
      audio.createMediaStreamSource(stream).connect(analyser);
      message = 'マイクの音を表示中。声を出したり手をたたいたりしてみる';
    })
    .catch(() => {
      message = 'マイクを使えませんでした。スイープ音で試せます';
    });
}

function draw() {
  // 下の案内文だけ塗り直す。グラフは塗り直さず、1列ずつ上書きしていく
  noStroke();
  fill(225, 30, 9);
  rect(0, GY + GH + 4, width, height);
  fill(0, 0, 95);
  textSize(14);
  textAlign(LEFT, BASELINE);
  text(message, GX, GY + GH + 30);
  if (!analyser) {
    noFill();
    stroke(220, 20, 30);
    rect(GX, GY, GW, GH);
    return;
  }

  if (osc) {
    // 200〜1600Hzのあいだを行き来する
    let t = audio.currentTime;
    osc.frequency.value = 200 * pow(2, 1.5 + 1.5 * sin(t * 0.7));
  }
  analyser.getByteFrequencyData(bins);
  let binHz = audio.sampleRate / analyser.fftSize;
  let count = floor(MAX_HZ / binHz);
  let cell = GH / count;
  noStroke();
  for (let i = 0; i < count; i++) {
    let level = bins[i] / 255;
    // 弱い音は暗い青、強い音は明るい黄
    fill(250 - 200 * level, 85, 100 * pow(level, 1.4));
    rect(GX + column, GY + GH - (i + 1) * cell, 2, cell + 0.5);
  }
  // 次に描く列に目印の線を引く
  column = (column + 2) % GW;
  fill(0, 0, 100);
  rect(GX + column, GY, 2, GH);
}`;

const STRING_SKETCH = `let slider;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 振動モードの番号
  slider = createSlider(1, 8, 3, 1);
  slider.size(260);
  slider.attribute('aria-label', 'モードの番号');
}

function draw() {
  background(225, 30, 9);
  let n = slider.value();
  let x0 = 60, x1 = 540, mid = 210, amp = 80;
  let t = millis() / 1000;
  // モードの番号が大きいほど速く振動する（周波数は基本のn倍）
  let swing = cos(TWO_PI * 0.35 * n * t);

  // 弦が動く範囲（うすい線）
  noFill();
  stroke(190, 40, 60, 40);
  for (let side = -1; side <= 1; side += 2) {
    beginShape();
    for (let px = x0; px <= x1; px += 4) {
      vertex(px, mid + side * amp * sin((n * PI * (px - x0)) / (x1 - x0)));
    }
    endShape();
  }

  // いまの弦
  stroke(190, 60, 100);
  strokeWeight(2.5);
  beginShape();
  for (let px = x0; px <= x1; px += 2) {
    vertex(px, mid + amp * swing * sin((n * PI * (px - x0)) / (x1 - x0)));
  }
  endShape();
  strokeWeight(1);

  // 節（動かない点）と腹（いちばん大きく動く点）
  textAlign(CENTER, BASELINE);
  textSize(13);
  for (let i = 0; i <= n; i++) {
    let px = x0 + ((x1 - x0) * i) / n;
    noStroke();
    fill(45, 80, 100);
    circle(px, mid, 9);
    if (n <= 5) text('節', px, mid + 28);
  }
  for (let i = 0; i < n; i++) {
    let px = x0 + ((x1 - x0) * (i + 0.5)) / n;
    fill(330, 50, 100);
    if (n <= 5) text('腹', px, mid - amp - 12);
    stroke(330, 50, 100, 50);
    line(px, mid - amp, px, mid + amp);
  }

  noStroke();
  fill(220, 20, 50);
  rect(x0 - 12, mid - 30, 6, 60);
  rect(x1 + 6, mid - 30, 6, 60);
  fill(0, 0, 95);
  textAlign(LEFT, BASELINE);
  textSize(14);
  text('モード ' + n + '   節 ' + (n + 1) + '個（両端を含む）  腹 ' + n + '個  周波数は基本の' + n + '倍', 30, 40);
}`;

const NODAL_SKETCH = `const CELLS = 90; // 板を90×90のマスに分けて計算する
let nSlider, mSlider;
let values = new Float32Array(CELLS * CELLS);
let img;
let lastKey = ''; // 前に計算したn, m。keyはp5.jsの変数名なので使わない

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  img = createImage(CELLS, CELLS);
  nSlider = createSlider(1, 8, 2, 1);
  nSlider.size(220);
  nSlider.attribute('aria-label', 'n');
  mSlider = createSlider(1, 8, 5, 1);
  mSlider.size(220);
  mSlider.attribute('aria-label', 'm');
}

function draw() {
  background(16, 18, 30);
  let n = nSlider.value();
  let m = mSlider.value();

  // n, mが変わったときだけ、各マスの値を計算し直す
  if (lastKey !== n + ',' + m) {
    lastKey = n + ',' + m;
    for (let j = 0; j < CELLS; j++) {
      for (let i = 0; i < CELLS; i++) {
        let x = (i + 0.5) / CELLS;
        let y = (j + 0.5) / CELLS;
        let f = cos(n * PI * x) * cos(m * PI * y) - cos(m * PI * x) * cos(n * PI * y);
        if (n === m) f = 2 * cos(n * PI * x) * cos(n * PI * y);
        values[i + j * CELLS] = f / 2;
      }
    }
  }

  // 板はゆっくり上下に振動する。上がった所を橙、下がった所を青で塗る
  let swing = cos(millis() / 600);
  img.loadPixels();
  for (let k = 0; k < values.length; k++) {
    let f = values[k] * swing;
    let up = max(f, 0);
    let down = max(-f, 0);
    // 値が0に近いマス（節線）は白くする
    let line0 = abs(values[k]) < 0.04 ? 1 : 0;
    img.pixels[4 * k] = min(255, 20 + 235 * up + 30 * down + 235 * line0);
    img.pixels[4 * k + 1] = min(255, 22 + 130 * up + 120 * down + 233 * line0);
    img.pixels[4 * k + 2] = min(255, 36 + 40 * up + 219 * down + 219 * line0);
    img.pixels[4 * k + 3] = 255;
  }
  img.updatePixels();
  image(img, 20, 20, 360, 360);

  noStroke();
  fill(240);
  textSize(22);
  text('n = ' + n, 410, 50);
  text('m = ' + m, 500, 50);
  textSize(13);
  fill(255, 160, 60);
  rect(410, 90, 14, 14);
  fill(70, 140, 255);
  rect(410, 116, 14, 14);
  fill(255);
  rect(410, 142, 14, 14);
  fill(200);
  text('上がっている所', 432, 102);
  text('下がっている所', 432, 128);
  text('節線（動かない所）', 432, 154);
}`;

const th = "text-left p-3 font-semibold";
const rowTh = "text-left p-3 font-normal";

export default function Acoustics() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 27</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          音響解析
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          音や振動を「どの周波数が、どれだけ含まれるか」に分けて見る方法と、振動が作る形を扱います。
          下の枠はクラドニ図形のシミュレーションです。振動する正方形の板に砂をまくと、揺れない線（節線）の上に砂が集まって模様になります。
          6秒ごとに模様が切り替わり、スライダーでnとmを変えると別の模様になります。
        </p>

        <CodePreview
          title="クラドニ図形（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          上のスライダーがn、下のスライダーがmです。右の小さな図は板の各点の揺れの大きさで、暗い線が砂の集まる節線にあたります。
          節線の式は正方形の板を単純化した近似で、実物の板の模様と細部まで一致するものではありません。
        </p>

        <WhyNowBox
          title="なぜ周波数に分けて見るのか"
          tags={["フーリエ級数", "FFT", "スペクトログラム", "定在波", "クラドニ図形"]}
        >
          <p>
            音の波形をそのまま見ても、どんな音かは読み取りにくいものです。周波数ごとの強さに分けると、音の高さ、音色、雑音の正体が見えるようになります。
            AudioContextとAnalyserNodeの基本は
            <Link href="/p5js/media/sound" className="text-primary underline">
              音
            </Link>
            のページで扱いました。このページではその中身（フーリエ変換の考え方）と、時間方向に並べたスペクトログラム、
            振動が空間に作る形（定在波とクラドニ図形）へ進みます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              どんな波も正弦波の足し合わせ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              周期的な波は、周波数の違う正弦波を足し合わせて表せます。これがフーリエ級数の考え方です。
              たとえば矩形波（角ばった波）は、基本の周波数の1倍、3倍、5倍…の正弦波を、強さ1、1/3、1/5…で足すと近づいていきます。
              スライダーで足す本数を増やしてください。
            </p>
            <CodePreview
              title="正弦波を足して矩形波に近づける"
              language="js"
              code={FOURIER_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              下の棒グラフは「どの周波数の正弦波を、どの強さで足したか」です。これをスペクトルと呼びます。
              上の波形と下のスペクトルは、同じ波の2通りの表し方です。波形からスペクトルを求める計算がフーリエ変換です。
            </p>
            <InfoBox type="warning" title="本数を増やしても消えない「角」">
              <p>
                本数を増やせば矩形波にどこまでも近づくように思えますが、角のすぐ横の跳ね上がりは消えません。
                跳ね上がりは細くなるだけで、高さは段差の約9%のまま残ります。これはギブズ現象と呼ばれ、計算の誤りではなくフーリエ級数の性質です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              FFTで音を周波数に分ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              フーリエ変換を高速に計算する方法がFFT（高速フーリエ変換）です。ブラウザではWeb
              Audio APIの
              <code className={code}>AnalyserNode</code>
              が計算してくれます。下のスケッチは、ボタンを押すと矩形波の音を小さな音量で鳴らし、その音をFFTにかけた結果を描きます。
              三角の印は、矩形波に含まれるはずの1倍、3倍、5倍…の周波数です。
            </p>
            <CodePreview
              title="矩形波のスペクトルを測る"
              language="js"
              code={SPECTRUM_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className={th}>
                      プロパティ・メソッド
                    </th>
                    <th scope="col" className={th}>
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      fftSize
                    </th>
                    <td className="p-3">
                      1回のFFTに使うサンプル数。32〜32768の2のべき乗で、既定は2048
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      frequencyBinCount
                    </th>
                    <td className="p-3">
                      結果のデータ点（ビン）の数。常にfftSizeの半分
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      getByteFrequencyData(配列)
                    </th>
                    <td className="p-3">
                      各ビンの強さ（デシベル値を0〜255に割り当てたもの）を配列に書き込む。ビンは0Hzからサンプルレートの半分まで等間隔に並ぶ
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className={rowTh + " font-mono"}>
                      sampleRate ÷ fftSize
                    </th>
                    <td className="p-3">
                      ビン1つぶんの周波数の幅。i番目のビンはi × この幅の周波数を表す
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title="仕様のビン幅と、手元で表示されるビン幅">
              <p>
                ビン幅はサンプルレート ÷
                fftSizeで決まりますが、サンプルレートは端末の音声出力の設定で変わります。
                48000Hzなら約23.4Hz、44100Hzなら約21.5Hzです。スケッチの上部に、手元の環境での値が出ます。
                また、440Hzの音は1本の線ではなく、すその広がった山として現れます。
                音を有限の長さで切り取って計算するので、となりのビンにも成分がにじむからです。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>osc.type = 'square'</code>
                  を'sine'にする（山が1つだけになる）。'sawtooth'にすると、偶数倍にも山が立つ
                </li>
                <li>
                  <code className={code}>analyser.fftSize = 2048</code>
                  を256にする（ビン幅が8倍に広がり、山が太くなる）
                </li>
                <li>スライダーで周波数を下げる（山の間隔がつまる）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              スペクトログラム: 時間 × 周波数 × 強さ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スペクトルは一瞬の切り口です。これを時間の順に横へ並べ、強さを色にした図がスペクトログラムです。
              「スイープ音を出す」を押すと、高さがゆっくり上下する音が鳴り、その軌跡が描かれていきます。同じボタンをもう一度押すと音が止まります。
              マイクのボタンは任意で、押すとまわりの音や声も重ねて表示します。マイクの音はスピーカーには出しません。
            </p>
            <CodePreview
              title="スイープ音と声のスペクトログラム"
              language="js"
              code={SPECTROGRAM_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              何本もの線が平行に上下するのは、のこぎり波が基本の周波数の2倍、3倍…の成分（倍音）を含むからです。
              マイクに向かって「あー」「いー」と声を出すと、母音ごとに強い帯の位置が変わります。手をたたくと、全部の周波数に広がる縦の線になります。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>osc.type = 'sawtooth'</code>
                  を'sine'にする（線が1本だけになる）
                </li>
                <li>
                  <code className={code}>sin(t * 0.7)</code>
                  の0.7を3にする（音の上下が速くなり、波の形がつまる）
                </li>
                <li>
                  <code className={code}>const MAX_HZ = 5000</code>
                  を2000にする（低い周波数の部分を拡大して見られる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              定在波: 弦の振動モード、節と腹
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              両端を固定した弦をはじくと、波が両端で反射して重なり、進まずにその場で振動する波になります。これが定在波です。
              まったく動かない点を節、いちばん大きく動く点を腹と呼びます。
              両端が節になる形しか残れないので、弦は決まった形（振動モード）でだけ振動します。
            </p>
            <CodePreview
              title="弦の振動モード"
              language="js"
              code={STRING_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              n番目のモードには、両端を含めてn +
              1個の節とn個の腹があります。周波数は基本（n =
              1）のn倍です。楽器の弦の音は、これらのモードが同時に鳴ったもので、前のスケッチで見た倍音の正体です。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              クラドニ図形: 面の定在波
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              弦の節は点ですが、板や膜のような面では節が線になります。Ernst
              Chladniは、砂をうすくまいた金属板を弓でこすって共鳴させ、砂が節線に集まって模様になる方法を1787年の著書で発表しました。
              この模様がクラドニ図形です。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              四角い面の定在波は「x方向の波 ×
              y方向の波」の形で表せます。正方形では(n, m)の波と(m,
              n)の波が同じ周波数になるので、2つを重ねた形も同じ周波数で振動できます。
              ふちが自由に動く板を想定して波をcosで書き、2つの差を取ったものが、冒頭で使った式です。
            </p>
            <div className="rounded-xl border border-border bg-card p-5 my-4 overflow-x-auto">
              <p className="font-mono text-foreground text-center whitespace-nowrap">
                cos(nπx) cos(mπy) − cos(mπx) cos(nπy) = 0
              </p>
            </div>
            <CodePreview
              title="節線と、上下に動く領域"
              language="js"
              code={NODAL_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              白い線が式の値が0になる節線で、線をはさんだ両側は逆向きに動きます。冒頭のスケッチでは、砂の1粒ずつを「その場所の揺れが大きいほど大きく跳ねる」規則で動かしました。
              節線の上では跳ねないので、砂は節線にたどり着くとそこにとどまり、模様が浮かび上がります。
            </p>
            <InfoBox type="warning" title="この式は近似">
              <p>
                この式は、膜の定在波の形を板に当てはめた単純化です。実際の板の振動は板の曲げを扱う方程式（キルヒホッフ–ラブの板理論など）に従い、
                板の厚さ、材質、支え方、こする位置で模様が変わります。対称性のよく似た模様は得られますが、実物の節線の位置と一致することを保証するものではありません。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              部屋の響き: 残響時間とセイビンの式
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              部屋の中の音も、壁で反射をくり返す波です。音を止めてから響きが60デシベル下がるまでの時間を残響時間（RT60）と呼びます。
              Wallace Clement
              Sabineは19世紀の終わりにハーバード大学で実験を行い、残響時間が部屋の大きさに比例し、吸音の量に反比例することを見つけました。
              セイビンの式はT<sub>60</sub> ≈ 0.161 × V ÷
              Aです。Vは部屋の容積（m³）、Aは壁や床の面積に吸音率を掛けて合計した量（m²）です。
              容積が同じなら、吸音する面を増やすほど響きは短くなります。この式は実験から得られた経験式で、部屋の形や空気による吸収は考えに入っていません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              現場ではどう使われているか
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-muted-foreground leading-relaxed">
              <li>
                スペクトログラムは、音楽、言語学、ソナー、レーダー、音声処理、地震学、鳥類学などで広く使われ、話された言葉を音声学的に識別したり、動物の鳴き声を分析したりする用途があります（
                <Ext href="https://en.wikipedia.org/wiki/Spectrogram">
                  Wikipedia「Spectrogram」
                </Ext>
                ）。
              </li>
              <li>
                クラドニの方法を発展させた手法は、バイオリン、ギター、チェロなどの楽器の設計と製作でいまも使われています。20世紀以降は、弓の代わりに信号発生器で鳴らすスピーカーを板の上か下に置く方法が一般的になりました（
                <Ext href="https://en.wikipedia.org/wiki/Ernst_Chladni">
                  Wikipedia「Ernst Chladni」
                </Ext>
                ）。
              </li>
              <li>
                残響時間は、用途に合った響きが求められる空間の建築設計で特に考慮されます。測り方はISO
                3382などの規格で定められています（
                <Ext href="https://en.wikipedia.org/wiki/Reverberation">
                  Wikipedia「Reverberation」
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
                クラドニ図形の式は近似で、実物の板の厚さ・材質・支え方を反映していません。砂の動きも、粒の跳ね方を単純な規則に置き換えたものです
              </li>
              <li>
                AnalyserNodeの値は、表示向けに0〜255へ丸められ、時間方向にならされています。マイクも校正されていないので、音の大きさの絶対値（何デシベルか）は測れません
              </li>
              <li>
                周波数の細かさはビン幅で決まります。ビン幅より近い2つの音は見分けられません
              </li>
              <li>
                弦のモデルは理想的な弦です。実際の弦は太さやかたさを持ち、倍音が整数倍から少しずれます
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              このページのスケッチは原理を見るためのもので、騒音の測定や楽器・建築の設計に使う計測器や解析ソフトの代わりにはなりません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="矩形波を作る"
              description="___ を埋めて、奇数倍の正弦波だけを、倍率で割った強さで足してください。波が角ばった形になります。1つ目は奇数を作るために足す数、2つ目は割る数です。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  noFill();
  stroke(255, 200, 80);
  strokeWeight(2);
  beginShape();
  for (let px = 0; px <= width; px++) {
    let x = map(px, 0, width, 0, 2 * TWO_PI) + frameCount * 0.02;
    let y = 0;
    // 1, 3, 5, ... 倍の周波数の正弦波を8本足す
    for (let k = 0; k < 8; k++) {
      let h = 2 * k + ___;
      y += sin(h * x) / ___;
    }
    vertex(px, 150 - y * 80);
  }
  endShape();
}`}
              answer={`function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(16, 18, 30);
  noFill();
  stroke(255, 200, 80);
  strokeWeight(2);
  beginShape();
  for (let px = 0; px <= width; px++) {
    let x = map(px, 0, width, 0, 2 * TWO_PI) + frameCount * 0.02;
    let y = 0;
    // 1, 3, 5, ... 倍の周波数の正弦波を8本足す
    for (let k = 0; k < 8; k++) {
      let h = 2 * k + 1;
      y += sin(h * x) / h;
    }
    vertex(px, 150 - y * 80);
  }
  endShape();
}`}
              keywords={["k + 1", "/ h"]}
              hints={[
                "kが0, 1, 2…のとき、2 * kに1を足すと1, 3, 5…（奇数）になります",
                "h倍の周波数の波は、強さをhぶんの1にします。sin(h * x)をhで割ります",
              ]}
            />
            <CodingChallenge
              title="節線を描く"
              description="___ を埋めて、クラドニ図形の式を完成させてください。引き算の後ろは、前の項のnとmを入れ替えた形です。"
              preview
              initialCode={`const n = 3;
const m = 5;

function setup() {
  createCanvas(300, 300);
  noLoop();
}

function draw() {
  background(16, 18, 30);
  noStroke();
  for (let j = 0; j < 60; j++) {
    for (let i = 0; i < 60; i++) {
      let x = (i + 0.5) / 60;
      let y = (j + 0.5) / 60;
      let f = cos(n * PI * x) * cos(m * PI * y) - cos(___ * PI * x) * cos(___ * PI * y);
      // 0に近い所（節線）ほど明るく塗る
      fill(255, 220, 160, 255 * max(0, 1 - abs(f) * 6));
      rect(i * 5, j * 5, 5, 5);
    }
  }
}`}
              answer={`const n = 3;
const m = 5;

function setup() {
  createCanvas(300, 300);
  noLoop();
}

function draw() {
  background(16, 18, 30);
  noStroke();
  for (let j = 0; j < 60; j++) {
    for (let i = 0; i < 60; i++) {
      let x = (i + 0.5) / 60;
      let y = (j + 0.5) / 60;
      let f = cos(n * PI * x) * cos(m * PI * y) - cos(m * PI * x) * cos(n * PI * y);
      // 0に近い所（節線）ほど明るく塗る
      fill(255, 220, 160, 255 * max(0, 1 - abs(f) * 6));
      rect(i * 5, j * 5, 5, 5);
    }
  }
}`}
              keywords={["cos(m * PI * x)", "cos(n * PI * y)"]}
              hints={[
                "前の項ではxにnが掛かっていました。後ろの項ではxにmを掛けます",
                "前の項ではyにmが掛かっていました。後ろの項ではyにnを掛けます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭のクラドニ図形とスペクトログラムを、自分の作品に作り替えます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>const TOUR</code>
                の組を好きな(n, m)に書き替える。気に入った模様だけを順に見せる作品になる
              </li>
              <li>
                <code className={code}>i &lt; 6000</code>
                を15000にして
                <code className={code}>strokeWeight(1.5)</code>
                を1にする。細かい砂で線がくっきりする
              </li>
              <li>
                <code className={code}>stroke(42, 30, 100, 80)</code>
                の色相を、砂の位置や時間で変える。模様が切り替わるたびに色が流れる
              </li>
              <li>
                式の引き算を足し算に替える。同じ(n,
                m)でも別の模様になる
              </li>
              <li>
                スペクトログラムにマイクで自分の声や楽器を入れ、「PNG保存」で1枚の絵にする。音を描いた作品になる
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="サンプルレート48000Hz、fftSizeが2048のとき、ビン1つぶんの周波数の幅は？"
              options={[
                { label: "約2.3Hz" },
                { label: "約23.4Hz", correct: true },
                { label: "約46.9Hz" },
                { label: "2048Hz" },
              ]}
              explanation="ビン幅はサンプルレート ÷ fftSizeです。48000 ÷ 2048 ≈ 23.4Hz。fftSizeを大きくすると周波数は細かく見分けられますが、1回の分析に使う時間が長くなります。"
            />
            <Quiz
              question="クラドニ図形で、砂が集まるのは板のどこ？"
              options={[
                { label: "いちばん大きく揺れる所（腹）" },
                { label: "揺れない線（節線）", correct: true },
                { label: "板の中心" },
                { label: "板のふち" },
              ]}
              explanation="揺れの大きい場所の砂は跳ね飛ばされて移動し、揺れない節線の上にたどり着くととどまります。そのため砂の模様は節線の形になります。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "周期的な波は正弦波の足し合わせで表せる。どの周波数がどれだけあるかがスペクトル",
                  "AnalyserNodeのFFTで音のスペクトルが得られる。ビン幅はサンプルレート ÷ fftSize",
                  "スペクトルを時間の順に並べ、強さを色にしたものがスペクトログラム",
                  "定在波には動かない節と大きく動く腹があり、決まった振動モードだけが残る",
                  "面の節は線になり、砂が集まるとクラドニ図形になる。このページの式は近似",
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
                  title: "MDN: AnalyserNode",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode",
                  description:
                    "周波数と波形のデータを取り出すノード。fftSize・frequencyBinCountの説明へのリンクがある",
                },
                {
                  title: "MDN: AnalyserNode.getByteFrequencyData()",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData",
                  description: "周波数ごとの強さを0〜255の配列で受け取るメソッド",
                },
                {
                  title: "Wikipedia: Square wave (waveform)",
                  url: "https://en.wikipedia.org/wiki/Square_wave_(waveform)",
                  description: "矩形波が奇数倍の周波数成分だけでできていること",
                },
                {
                  title: "Wikipedia: Spectrogram",
                  url: "https://en.wikipedia.org/wiki/Spectrogram",
                  description: "スペクトログラムの定義と使われる分野",
                },
                {
                  title: "Wikipedia: Standing wave",
                  url: "https://en.wikipedia.org/wiki/Standing_wave",
                  description:
                    "定在波、節と腹、弦と四角い面の振動モードの式",
                },
                {
                  title: "Wikipedia: Ernst Chladni",
                  url: "https://en.wikipedia.org/wiki/Ernst_Chladni",
                  description: "クラドニ図形の由来と、楽器製作での利用",
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
