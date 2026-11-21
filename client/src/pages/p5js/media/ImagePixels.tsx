import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。元の絵から色を拾い、短い線で描き直し続ける
const HERO_SKETCH = `let src; // 色を拾う相手になる「元の絵」

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(150, 100);
  background(14, 10, 26);
  // 自分の写真を選ぶと、その写真を筆あとで描き直す
  createFileInput(handleFile);
}

function draw() {
  // 1フレームに何本も、短い筆あとを置いていく
  for (let i = 0; i < 80; i++) {
    let x = random(width);
    let y = random(height);
    // 元の絵の同じ場所から色を拾う
    let c = src.get(floor(x / width * src.width), floor(y / height * src.height));
    // 筆の向きはノイズで決める。近い場所は似た向きになる
    let angle = (noise(x * 0.005, y * 0.005, frameCount * 0.003) - 0.5) * PI * 1.5;
    let len = random(10, 28);
    stroke(red(c), green(c), blue(c), 170);
    strokeWeight(random(2, 6));
    line(x, y, x + cos(angle) * len, y + sin(angle) * len);
  }
}

function mousePressed() {
  // クリックで白紙に戻して描き直す
  background(14, 10, 26);
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    // 元の絵と同じ大きさに、はみ出す分を切り落として描き込む
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
  });
}`;

// image()とtint()で同じ絵を並べる
const IMAGE_SKETCH = `let src;

function setup() {
  createCanvas(480, 320);
  pixelDensity(1);
  src = makePicture(240, 160);
  createFileInput(handleFile);
}

function draw() {
  // image(絵, x, y) で左上の位置を決めて置く
  image(src, 0, 0);

  // tint() は、このあと置く絵に色を掛ける
  tint(255, 170, 120);
  image(src, 240, 0);

  tint(120, 200, 255);
  image(src, 0, 160);

  // 幅と高さを足すと、その大きさに伸び縮みする
  noTint();
  image(src, 240, 160, 120, 80);
  image(src, 360, 160, 120, 160);
  image(src, 240, 240, 120, 80);
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    // 元の絵と同じ大きさに、はみ出す分を切り落として描き込む
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
  });
}`;

// get()で1点の色を拾う
const DROPPER_SKETCH = `let src;

function setup() {
  createCanvas(480, 380);
  pixelDensity(1);
  src = makePicture(480, 300);
  textFont('monospace');
  textSize(15);
  createFileInput(handleFile);
}

function draw() {
  background(14, 10, 26);
  image(src, 0, 0);

  // 色を拾う位置。マウスが絵の外にあるあいだは自動で動く
  let x = 240 + cos(frameCount * 0.013) * 200;
  let y = 150 + sin(frameCount * 0.021) * 120;
  if (mouseX > 0 && mouseX < 480 && mouseY > 0 && mouseY < 300) {
    x = mouseX;
    y = mouseY;
  }

  // get(x, y) は、その1点の色を [赤, 緑, 青, 不透明度] で返す
  let c = src.get(floor(x), floor(y));

  noFill();
  stroke(255);
  strokeWeight(2);
  circle(x, y, 26);

  // 拾った色を見本として塗り、数値も出す
  noStroke();
  fill(c);
  rect(16, 316, 96, 48, 6);
  fill(235);
  text('R ' + c[0] + '  G ' + c[1] + '  B ' + c[2], 128, 336);
  text('brightness ' + round(brightness(c)), 128, 358);
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    // 元の絵と同じ大きさに、はみ出す分を切り落として描き込む
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
  });
}`;

// pixels配列を式で読み、粗さの変わるモザイクにする
const MOSAIC_SKETCH = `let src;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(120, 80);
  // pixels配列を使う前に、必ずloadPixels()を呼ぶ
  src.loadPixels();
  noStroke();
  createFileInput(handleFile);
}

function draw() {
  background(14, 10, 26);
  // マス目の粗さ。1（細かい）から10（粗い）をゆっくり往復する
  let step = floor(map(sin(frameCount * 0.015), -1, 1, 1, 11));
  let s = width / src.width;

  for (let y = 0; y < src.height; y += step) {
    for (let x = 0; x < src.width; x += step) {
      // (x, y) の画素が、配列の何番目から始まるか
      let i = (y * src.width + x) * 4;
      fill(src.pixels[i], src.pixels[i + 1], src.pixels[i + 2]);
      rect(x * s, y * s, step * s - 1, step * s - 1);
    }
  }
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
    // 絵が変わったので、pixels配列を読み直す
    src.loadPixels();
  });
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`;

// 明るさを点の大きさに変える
const HALFTONE_SKETCH = `let src;
let dark = []; // 各画素の暗さ（0〜1）
let ink = 0;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);
  src = makePicture(75, 50);
  measure();
  noStroke();
  createFileInput(handleFile);
}

// 絵の各画素の暗さを調べて覚えておく
function measure() {
  dark = [];
  src.loadPixels();
  for (let i = 0; i < src.pixels.length; i += 4) {
    // 赤・緑・青の平均を、その画素の明るさとする
    let b = (src.pixels[i] + src.pixels[i + 1] + src.pixels[i + 2]) / 3;
    dark.push(1 - b / 255);
  }
}

function draw() {
  // 紙の色
  background(40, 8, 96);
  // インクの色。クリックのたびに色相が変わる
  fill((230 + ink * 70) % 360, 70, 35);

  let cell = width / src.width;
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      // 暗い所ほど大きい点にする
      let d = dark[y * src.width + x] * cell * 1.1;
      // 1行おきに半マスずらして、点を互い違いに並べる
      let shift = (y % 2) * cell / 2;
      circle(x * cell + shift + cell / 2, y * cell + cell / 2, d);
    }
  }
}

function mousePressed() {
  ink = (ink + 1) % 5;
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
    measure();
  });
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`;

// 列ごとに画素を明るい順へ並べ替える
const SORT_SKETCH = `let src;
let out; // 並べ替えた結果を入れる画像

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(150, 100);
  src.loadPixels();
  out = createImage(150, 100);
  // 拡大したときにぼかさず、画素をくっきり見せる
  noSmooth();
  createFileInput(handleFile);
}

function draw() {
  let w = src.width;
  let h = src.height;
  out.loadPixels();
  // まず元の絵をそのまま写す
  for (let i = 0; i < src.pixels.length; i++) {
    out.pixels[i] = src.pixels[i];
  }

  for (let x = 0; x < w; x++) {
    // 並べ替えを始める高さ。列ごと・時間ごとに波打たせる
    let top = floor(h * (0.45 + 0.3 * sin(frameCount * 0.012 + x * 0.045)));
    // この列の、topより下の画素を取り出す
    let column = [];
    for (let y = top; y < h; y++) {
      let i = (y * w + x) * 4;
      column.push([src.pixels[i], src.pixels[i + 1], src.pixels[i + 2]]);
    }
    // 明るい順に並べ替える
    column.sort(function (a, b) {
      return (b[0] + b[1] + b[2]) - (a[0] + a[1] + a[2]);
    });
    // 並べ替えた順で書き戻す
    for (let k = 0; k < column.length; k++) {
      let i = ((top + k) * w + x) * 4;
      out.pixels[i] = column[k][0];
      out.pixels[i + 1] = column[k][1];
      out.pixels[i + 2] = column[k][2];
    }
  }
  // 配列を書き換えたらupdatePixels()で絵に反映する
  out.updatePixels();
  image(out, 0, 0, width, height);
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
    src.loadPixels();
  });
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`;

// filter()の種類を見比べる
const FILTER_SKETCH = `let src;
let panels = [];
let names = ['元の絵', 'GRAY', 'INVERT', 'POSTERIZE, 4', 'BLUR, 3', 'THRESHOLD, 0.45'];

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(200, 200);
  textFont('monospace');
  textSize(14);
  makePanels();
  createFileInput(handleFile);
}

// 元の絵の写しを6枚作り、1枚ずつ別のフィルターを掛ける
function makePanels() {
  panels = [];
  for (let i = 0; i < 6; i++) {
    panels.push(src.get());
  }
  panels[1].filter(GRAY);
  panels[2].filter(INVERT);
  panels[3].filter(POSTERIZE, 4);
  panels[4].filter(BLUR, 3);
  panels[5].filter(THRESHOLD, 0.45);
}

function draw() {
  for (let i = 0; i < 6; i++) {
    let x = (i % 3) * 200;
    let y = floor(i / 3) * 200;
    image(panels[i], x, y);
    // 名札
    noStroke();
    fill(14, 10, 26, 200);
    rect(x + 6, y + 6, textWidth(names[i]) + 12, 24, 4);
    fill(255);
    text(names[i], x + 12, y + 23);
  }
}

// 手元の写真に差し替える（ファイルは端末の外へ送られない）
function handleFile(file) {
  if (file.type !== 'image') return;
  loadImage(file.data).then(function (img) {
    src.image(img, 0, 0, src.width, src.height, 0, 0, img.width, img.height, COVER);
    makePanels();
  });
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`;

export default function ImagePixels() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 13</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          画像とピクセル
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">画像は、色のついた小さな点（画素、ピクセル）が縦横に並んだものです。このページでは、画像から色を1点ずつ取り出し、線・円・マス目などの図形に置き換えて描き直します。下の枠は、夕焼けの絵を短い筆あとで描き直し続ける完成形です。枠の下のファイル選択ボタンで手元の写真を選ぶと、その写真が素材になります。</p>

        <CodePreview title={"筆あとで描き直す（このページの完成形）"} language="js" code={HERO_SKETCH} />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">クリックすると白紙に戻って描き直します。選んだ写真はブラウザの中で読み込まれるだけで、端末の外へは送られません（スケッチに送信の処理は無く、プレビューの枠も外部への送信を遮断しています）。このページのスケッチはどれも、同じ方法で自分の写真に差し替えられます。</p>

        <WhyNowBox title={"なぜ画素を読むのか"} tags={["image()", "get()", "loadPixels()", "pixels", "filter()"]}>
          <p>画像をそのまま表示するだけでなく、色の情報として読み取れるようになると、手元の1枚の写真が作品の素材になります。「色を拾って、別の図形で置き直す」という1つの考え方から、点描もハーフトーンもモザイクも作れます。次のカメラのページでも、ここで扱う画素の読み方をそのまま使います。</p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              素材は2通り: コードで描いた絵と、手元の写真
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">このマニュアルのプレビューは外部のサイトから画像を読み込めないので、素材を2通りの方法で用意します。1つは、<code className={code}>createGraphics()</code>で作った見えないキャンバスにコードで描いた絵です。もう1つは、<code className={code}>createFileInput()</code>のボタンで利用者が選んだ手元の写真です。どちらも<code className={code}>image(絵, x, y)</code>でキャンバスに置けます。</p>
            <CodePreview title={"絵を置く・色を掛ける・大きさを変える"} language="js" code={IMAGE_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed"><code className={code}>tint()</code>は、そのあとに置く画像に色を掛けます。<code className={code}>noTint()</code>で元に戻ります。<code className={code}>image()</code>に幅と高さを足すと、その大きさに伸び縮みします。スケッチの後半にある<code className={code}>makePicture()</code>が夕焼けの絵を描く関数、<code className={code}>handleFile()</code>が写真を受け取る関数です。この2つは以降のスケッチでも同じものを使います。</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">書いたもの</th>
                    <th scope="col" className="text-left p-3 font-semibold">意味</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">createFileInput(handleFile)</th>
                    <td className="p-3">ファイル選択ボタンを作る。ファイルが選ばれるとhandleFileが呼ばれる</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">file.type</th>
                    <td className="p-3">ファイルの種類。画像なら'image'</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">file.data</th>
                    <td className="p-3">画像の中身を1本の文字列にしたもの（データURL）</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">loadImage(file.data)</th>
                    <td className="p-3">その文字列を画像として読み込む</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">COVER</th>
                    <td className="p-3">縦横比を保ったまま枠全体を覆う。はみ出した分は描かれない</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title={"2.x系では、画像が届くのを待つ"}>
              <p>p5.jsの1.x系では、画像を<code className={code}>preload()</code>という関数の中で読み込みました。このマニュアルが使う2.x系には<code className={code}>preload()</code>が無く、<code className={code}>loadImage()</code>は「あとで画像が届く約束」（Promise）を返します。公式リファレンスは「This function returns a Promise and should be used in an async setup with await」と書いています。</p>
              <p>決まったファイルを最初に読むときは、<code className={code}>async function setup()</code>の中で<code className={code}>img = await loadImage('photo.jpg')</code>と書きます。このページではファイルが選ばれたあとに読むので、<code className={code}>loadImage(file.data).then(...)</code>の形で「届いたら実行する処理」を渡しています。外の記事の多くは1.x系の書き方なので、<code className={code}>preload()</code>が出てきたらこの形に読み替えてください。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              get(x, y)で1点の色を拾う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed"><code className={code}>get(x, y)</code>は、その位置の色を[赤, 緑, 青, 不透明度]の配列で返します。それぞれ0〜255の数です。この配列を<code className={code}>brightness()</code>に渡すと、明るさ（0〜100）が得られます。枠の中でマウスを動かすと、その位置の色を拾います。</p>
            <CodePreview title={"色を拾う"} language="js" code={DROPPER_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">冒頭の作品は、ランダムな位置の色を<code className={code}>get()</code>で拾い、その色の線を同じ位置に置くことを繰り返しているだけです。色を拾って、別の図形で置き直す。これがこのページ全体の考え方です。</p>
            <InfoBox type="warning" title={"brightness()の値と、見た目の明るさ"}>
              <p><code className={code}>brightness()</code>が返すのはHSBの明るさで、赤・緑・青のうち一番大きい値で決まります。そのため、鮮やかな赤（255, 0, 0）も白（255, 255, 255）も同じ100になり、見た目の明るさとはずれます。見た目に近い値が欲しいときは、3つの平均<code className={code}>(r + g + b) / 3</code>を使います。このあとのハーフトーンでは平均を使っています。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              pixels配列: 全部の画素をまとめて読む
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed"><code className={code}>get()</code>は手軽ですが、何千回も呼ぶと遅くなります。公式リファレンスも「get() is easy to use but it's not as fast as pixels」と書いています。たくさんの画素を読むときは、<code className={code}>loadPixels()</code>を呼んでから<code className={code}>pixels</code>という配列を使います。</p>
            <p className="text-muted-foreground mb-4 leading-relaxed"><code className={code}>pixels</code>は1本の長い配列で、1画素につき赤・緑・青・不透明度の4つの数が、左上から右へ、上の行から下の行へ順に並んでいます。(x, y)の画素の赤は<code className={code}>(y * 幅 + x) * 4</code>番目にあり、緑はその次、青はさらにその次です。</p>
            <CodePreview title={"モザイク"} language="js" code={MOSAIC_SKETCH} />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">幅120の絵での位置</th>
                    <th scope="col" className="text-left p-3 font-semibold">赤が入っている番号</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">(0, 0)</th>
                    <td className="p-3"><code className={code}>(0 * 120 + 0) * 4</code>で0</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">(1, 0)</th>
                    <td className="p-3"><code className={code}>(0 * 120 + 1) * 4</code>で4。1画素進むと4つ進む</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">(0, 1)</th>
                    <td className="p-3"><code className={code}>(1 * 120 + 0) * 4</code>で480。1行下がると幅×4だけ進む</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">(5, 2)</th>
                    <td className="p-3"><code className={code}>(2 * 120 + 5) * 4</code>で980</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title={"仕様の画素数と、実際の配列の長さ"}>
              <p>仕様では、100×100のキャンバスのpixels配列は100×100×4で40,000個です。実測では、高精細な画面でこれが160,000個になることがあります。画面が1点を縦横2個ずつの画素で表示していて（画素密度2）、p5.jsがそれに合わせてキャンバスを細かく作るからです。</p>
              <p>このページのスケッチが最初に<code className={code}>pixelDensity(1)</code>を呼んでいるのは、どの画面でも「1点 = 1画素」に揃えて、上の式がそのまま使えるようにするためです。消すと、高精細な画面でだけ絵が崩れます。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              明るさを点の大きさに変える: ハーフトーン
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">ハーフトーンは、点の大きさや間隔を変えて濃淡を表す印刷の技法です。画素の明るさを調べ、暗い所ほど大きい点を置くと、1色のインクだけで絵になります。クリックするとインクの色が替わります。</p>
            <CodePreview title={"ハーフトーン"} language="js" code={HALFTONE_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>makePicture(75, 50)</code>を<code className={code}>makePicture(38, 25)</code>にする（点が粗くなる）</li>
                <li><code className={code}>cell * 1.1</code>を<code className={code}>cell * 0.7</code>にする（全体が淡くなる）</li>
                <li><code className={code}>circle(</code>を<code className={code}>square(</code>に替える（点が四角になる）</li>
                <li><code className={code}>(y % 2) * cell / 2</code>を<code className={code}>0</code>にする（点が互い違いにならず、まっすぐ並ぶ）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              画素を並べ替える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">画素は配列に入っているので、順番を入れ替えることもできます。下のスケッチは、縦の列ごとに、ある高さから下の画素を明るい順に並べ替えています。並べ替えを始める高さを波打たせているので、絵が溶け落ちるように動きます。画素を明るさなどの順に並べ替えて絵を崩すこの表現は、ピクセルソートと呼ばれます。</p>
            <CodePreview title={"列ごとに並べ替える"} language="js" code={SORT_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">書き換えた配列は、<code className={code}>updatePixels()</code>を呼ぶまで絵に反映されません。読む前に<code className={code}>loadPixels()</code>、書いたあとに<code className={code}>updatePixels()</code>と覚えます。</p>
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>x * 0.045</code>を<code className={code}>x * 0.2</code>にする（波が細かくなる）</li>
                <li><code className={code}>0.45 + 0.3 * sin(...)</code>の式全体を<code className={code}>0</code>にする（列の全部が並べ替えられ、色の帯になる）</li>
                <li>並べ替えの<code className={code}>(b[0] + b[1] + b[2]) - (a[0] + a[1] + a[2])</code>の<code className={code}>a</code>と<code className={code}>b</code>を入れ替える（暗い順になる）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              filter()で定番の加工を掛ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">白黒にする、ぼかすといった定番の加工は<code className={code}>filter()</code>に用意されています。キャンバス全体に掛けるときは<code className={code}>filter(GRAY)</code>、1枚の画像だけに掛けるときは<code className={code}>img.filter(GRAY)</code>と書きます。</p>
            <CodePreview title={"フィルターを見比べる"} language="js" code={FILTER_SKETCH} />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">書き方</th>
                    <th scope="col" className="text-left p-3 font-semibold">結果</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">filter(GRAY)</th>
                    <td className="p-3">白黒の濃淡にする</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">filter(INVERT)</th>
                    <td className="p-3">色を反転する</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">filter(POSTERIZE, 4)</th>
                    <td className="p-3">色の段階を減らす。数が小さいほど段階が少ない</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">filter(BLUR, 3)</th>
                    <td className="p-3">ぼかす。数が大きいほど強くぼける</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">filter(THRESHOLD, 0.45)</th>
                    <td className="p-3">白と黒の2色にする。数（0〜1）より明るい所が白になる</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title={"点描を完成させる"}
              description={"___ を埋めて、元の絵から拾った色の円が置かれていくようにしてください。埋めるとプレビューが動きます。"}
              preview
              initialCode={`let src;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(150, 100);
  background(14, 10, 26);
  noStroke();
}

function draw() {
  for (let i = 0; i < 40; i++) {
    // 元の絵の中から、ランダムな1点を選ぶ
    let x = floor(random(src.width));
    let y = floor(random(src.height));
    // その点の色を拾う
    let c = src.___(x, y);
    fill(c[0], c[1], c[2], 180);
    // キャンバスの同じ場所に、拾った色の円を置く
    ___(x * 4, y * 4, random(4, 14));
  }
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`}
              answer={`let src;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(150, 100);
  background(14, 10, 26);
  noStroke();
}

function draw() {
  for (let i = 0; i < 40; i++) {
    // 元の絵の中から、ランダムな1点を選ぶ
    let x = floor(random(src.width));
    let y = floor(random(src.height));
    // その点の色を拾う
    let c = src.get(x, y);
    fill(c[0], c[1], c[2], 180);
    // キャンバスの同じ場所に、拾った色の円を置く
    circle(x * 4, y * 4, random(4, 14));
  }
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`}
              keywords={["get", "circle"]}
              hints={[
                "1点の色を拾う関数はgetです。src.get(x, y)で、元の絵の(x, y)の色が配列で返ります",
                "円を描く関数はcircleです。circle(中心のx, 中心のy, 直径)の順に渡します",
              ]}
            />
            <CodingChallenge
              title={"pixels配列から色を読む"}
              description={"___ を埋めて、pixels配列から読んだ色の円が並ぶようにしてください。"}
              preview
              initialCode={`let src;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(60, 40);
  // pixels配列を使えるようにする
  src.___();
  noStroke();
}

function draw() {
  background(14, 10, 26);
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      // (x, y) の画素が、配列の何番目から始まるか
      let i = (y * src.width + x) ___;
      fill(src.pixels[i], src.pixels[i + 1], src.pixels[i + 2]);
      // 少しずつ大きさの違う円で置き直す
      let d = 6 + 3 * sin(frameCount * 0.05 + x * 0.3 + y * 0.3);
      circle(x * 10 + 5, y * 10 + 5, d);
    }
  }
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`}
              answer={`let src;

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  src = makePicture(60, 40);
  // pixels配列を使えるようにする
  src.loadPixels();
  noStroke();
}

function draw() {
  background(14, 10, 26);
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      // (x, y) の画素が、配列の何番目から始まるか
      let i = (y * src.width + x) * 4;
      fill(src.pixels[i], src.pixels[i + 1], src.pixels[i + 2]);
      // 少しずつ大きさの違う円で置き直す
      let d = 6 + 3 * sin(frameCount * 0.05 + x * 0.3 + y * 0.3);
      circle(x * 10 + 5, y * 10 + 5, d);
    }
  }
}

// 元の絵: 夕焼けの海をコードで描く
function makePicture(w, h) {
  let pg = createGraphics(w, h);
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.noStroke();
  let horizon = h * 0.62;
  // 空: 上は紺、水平線に向かって橙
  for (let y = 0; y < horizon; y++) {
    let k = y / horizon;
    pg.fill(lerp(245, 385, k) % 360, lerp(75, 85, k), lerp(22, 100, k));
    pg.rect(0, y, w, 1);
  }
  // 太陽と、そのまわりの光
  for (let r = 12; r > 0; r--) {
    pg.fill(45, 60, 100, 6);
    pg.circle(w * 0.6, horizon - h * 0.08, h * 0.07 * r);
  }
  pg.fill(50, 25, 100);
  pg.circle(w * 0.6, horizon - h * 0.08, h * 0.2);
  // 海: 暗い青に、太陽の照り返し
  for (let y = horizon; y < h; y++) {
    let k = (y - horizon) / (h - horizon);
    pg.fill(lerp(275, 235, k), 70, lerp(42, 14, k));
    pg.rect(0, y, w, 1);
    let spread = w * (0.03 + k * 0.2);
    pg.fill(35, 70, 100, 80 - k * 50);
    for (let i = 0; i < 4; i++) {
      pg.rect(w * 0.6 + random(-spread, spread), y, random(w * 0.02, w * 0.08), 1);
    }
  }
  // 手前の山
  pg.fill(260, 60, 10);
  pg.beginShape();
  pg.vertex(0, h);
  for (let x = 0; x <= w * 0.5; x += 2) {
    let taper = 1 - x / (w * 0.5);
    pg.vertex(x, horizon + h * 0.03 - noise(x / w * 5) * h * 0.4 * taper);
  }
  pg.vertex(w * 0.28, h);
  pg.endShape(CLOSE);
  return pg;
}`}
              keywords={["loadPixels", "* 4"]}
              hints={[
                "pixels配列を使う前に呼ぶ関数はloadPixelsです。src.loadPixels()と書きます",
                "1画素は赤・緑・青・不透明度の4つの数でできているので、画素の番号に* 4を掛けます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">自分の写真を1枚選び、このページの技法で描き直した絵を作品にします。</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>冒頭の筆あとの<code className={code}>line(...)</code>を<code className={code}>circle(x, y, len)</code>に替える。点描になる</li>
              <li>冒頭の<code className={code}>random(10, 28)</code>を<code className={code}>random(40, 120)</code>にする。筆あとが長くなり、輪郭が溶ける</li>
              <li>ハーフトーンの紙の色とインクの色を、好きな2色の組み合わせにする</li>
              <li>ピクセルソートの内側と外側のfor文の役割を入れ替え、行ごとに横へ並べ替える</li>
              <li>モザイクの<code className={code}>rect(...)</code>を<code className={code}>text(...)</code>に替え、マスごとに文字を置く（次のページで扱います）</li>
            </ul>
            <InfoBox type="success" title={"写真を素材にするとき"}>
              <p>作品として公開するなら、自分で撮った写真を使うのが確実です。人が写っている写真は、公開の前に写っている人の了解を得ます。仕上がった絵は枠の下の「PNG保存」で画像にできます。公開のしかたとライセンスは<Link href="/p5js/publish/share" className="text-primary underline">公開する</Link>のページで扱います。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question={"幅200・高さ100の絵で、(10, 3)の画素の赤が入っているのはpixels配列の何番目？"}
              options={[
                { label: "610" },
                { label: "2440", correct: true },
                { label: "13" },
                { label: "1210" },
              ]}
              explanation={"(y * 幅 + x) * 4なので、(3 * 200 + 10) * 4で2440です。1画素が4つの数でできているので、最後に4を掛けます。"}
            />
            <Quiz
              question={"pixels配列を使うスケッチで、最初にpixelDensity(1)を呼ぶ理由は？"}
              options={[
                { label: "絵を明るくするため" },
                { label: "draw()が呼ばれる回数を増やすため" },
                { label: "高精細な画面でも「1点 = 1画素」に揃え、位置から番号を求める式をそのまま使えるようにするため", correct: true },
                { label: "画像の読み込みを待つため" },
              ]}
              explanation={"高精細な画面では、p5.jsがキャンバスを縦横2倍などの細かさで作るので、pixels配列の長さが変わります。pixelDensity(1)で揃えると、どの画面でも同じ式で読めます。"}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "素材は、createGraphics()でコードが描いた絵か、createFileInput()で選んだ手元の写真",
                  "get(x, y)は1点の色を[赤, 緑, 青, 不透明度]で返す。手軽だが、たくさん呼ぶと遅い",
                  "loadPixels()のあと、(x, y)の赤はpixels[(y * 幅 + x) * 4]にある。pixelDensity(1)で式を揃える",
                  "拾った色や明るさを、線・円・マス目・点の大きさに置き換えると、絵を描き直せる",
                  "2.x系にはpreload()が無い。loadImage()の結果はawaitか.then()で受け取る",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5" aria-hidden="true">
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
                  title: "p5.js Reference: pixels",
                  url: "https://p5js.org/reference/p5/pixels/",
                  description: "pixels配列の並び方と、画素密度による長さの違い",
                },
                {
                  title: "p5.js Reference: get()",
                  url: "https://p5js.org/reference/p5/get/",
                  description: "1点の色や、絵の一部を取り出す関数",
                },
                {
                  title: "p5.js Reference: loadImage()",
                  url: "https://p5js.org/reference/p5/loadImage/",
                  description: "画像の読み込み。2.x系でのawaitを使った書き方",
                },
                {
                  title: "p5.js Reference: createFileInput()",
                  url: "https://p5js.org/reference/p5/createFileInput/",
                  description: "利用者が選んだファイルをスケッチで受け取る方法",
                },
                {
                  title: "p5.js Reference: filter()",
                  url: "https://p5js.org/reference/p5/filter/",
                  description: "GRAY・POSTERIZE・BLURなど、用意されている加工の一覧",
                },
                {
                  title: "Wikipedia: Halftone",
                  url: "https://en.wikipedia.org/wiki/Halftone",
                  description: "点の大きさや間隔で濃淡を表す印刷技法の解説（英語）",
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
