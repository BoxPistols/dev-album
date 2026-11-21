import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。前のページのゲームに、画面遷移・記録・演出・音・一時停止を足したもの
const HERO_SKETCH = `// ひかりうけ（仕上げ版）
// 操作: マウスか ← → キー / Pで一時停止 / Mで音の入り切り
let state = 'title';
let paused = false;
let player;
let items = [];
let sparks = [];
let stars = [];
let trail = [];
let score = 0;
let shown = 0;
let best = 0;
let newBest = false;
let life = 3;
let combo = 0;
let elapsed = 0;
let spawnTimer = 0;
let overTimer = 0;
let shake = 0;
let glow = 0;
let safe = 0;
let audioCtx = null;
let muted = false;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textFont('sans-serif');
  for (let i = 0; i < 70; i++) {
    stars.push({ x: random(width), y: random(height), s: random(1, 2.4) });
  }
  // 前に遊んだときの最高点を読む
  const saved = getItem('hikariuke-best');
  if (typeof saved === 'number') best = saved;
  resetGame();
}

function resetGame() {
  player = { x: width / 2, y: height - 46, r: 24 };
  items = [];
  sparks = [];
  trail = [];
  score = 0;
  shown = 0;
  life = 3;
  combo = 0;
  elapsed = 0;
  spawnTimer = 0;
  safe = 0;
  newBest = false;
}

function startGame() {
  resetGame();
  state = 'play';
  paused = false;
  beep(660, 0.1, 'triangle');
}

function endGame() {
  state = 'over';
  overTimer = 0;
  if (score > best) {
    best = score;
    newBest = true;
    // 最高点をブラウザに保存する
    storeItem('hikariuke-best', best);
  }
  beep(196, 0.5, 'triangle');
}

function draw() {
  const dt = min(deltaTime, 50) / 1000;
  if (!paused) update(dt);

  push();
  // 画面の揺れ: 揺れの量だけ全体をずらして描く
  translate(random(-shake, shake), random(-shake, shake));
  drawScene();
  pop();
  drawHud();
}

function update(dt) {
  // 演出用の値は、時間とともに0へ戻る
  shake = max(0, shake - 30 * dt);
  glow = max(0, glow - 3 * dt);
  safe = max(0, safe - dt);
  // 表示用の点は、本当の点へ少しずつ近づく
  shown += (score - shown) * min(1, 8 * dt);

  for (const p of sparks) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 320 * dt;
    p.life -= 1.6 * dt;
  }
  sparks = sparks.filter((p) => p.life > 0);

  if (state === 'over') {
    overTimer += dt;
    return;
  }
  movePlayer(dt);
  trail.push(player.x);
  if (trail.length > 9) trail.shift();

  elapsed += dt;
  // 難易度曲線: はじめは早く上がり、3に近づくほどゆるやかになる
  const level = state === 'play' ? 1 + 2 * (1 - exp(-elapsed / 40)) : 1;
  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = 0.7 / level;
    const isRock = random() < 0.3;
    items.push({
      kind: isRock ? 'rock' : 'light',
      x: random(30, width - 30),
      y: -20,
      r: isRock ? 15 : 10,
      vy: random(110, 170) * (0.5 + level * 0.5),
      gone: false,
    });
  }

  for (const it of items) {
    it.y += it.vy * dt;
    const touching = dist(it.x, it.y, player.x, player.y) < it.r + player.r;
    if (it.kind === 'light') {
      if (touching) {
        it.gone = true;
        glow = 1;
        burst(it.x, it.y, 46, 10);
        if (state === 'play') {
          combo += 1;
          score += 10 + min(combo, 10) * 2;
          // 続けて受けるほど高い音にする
          beep(440 * pow(1.06, min(combo, 12)), 0.12, 'triangle');
        }
      } else if (it.y > height + 20 && state === 'play') {
        combo = 0;
      }
    } else if (touching && state === 'play' && safe <= 0) {
      it.gone = true;
      life -= 1;
      combo = 0;
      shake = 7;
      safe = 1.2;
      burst(it.x, it.y, 228, 16);
      beep(110, 0.3, 'sawtooth');
      if (life <= 0) endGame();
    }
  }
  items = items.filter((it) => !it.gone && it.y < height + 30);
}

function movePlayer(dt) {
  const speed = 420;
  if (state === 'play') {
    if (keyIsDown(LEFT_ARROW)) player.x -= speed * dt;
    if (keyIsDown(RIGHT_ARROW)) player.x += speed * dt;
    if (mouseX !== pmouseX && mouseY > 0 && mouseY < height) player.x = mouseX;
  } else {
    // タイトル画面では自動で動く
    let target = null;
    for (const it of items) {
      if (it.kind === 'light' && (target === null || it.y > target.y)) target = it;
    }
    if (target !== null) {
      player.x += constrain(target.x - player.x, -speed * dt * 0.7, speed * dt * 0.7);
    }
  }
  player.x = constrain(player.x, player.r, width - player.r);
}

// 粒を放射状に飛ばす
function burst(x, y, hue, count) {
  for (let i = 0; i < count; i++) {
    const a = random(TWO_PI);
    const v = random(60, 220);
    sparks.push({ x: x, y: y, vx: cos(a) * v, vy: sin(a) * v - 80, life: 1, hue: hue });
  }
}

function drawScene() {
  noStroke();
  fill(236, 50, 9);
  rect(-20, -20, width + 40, height + 40);
  for (let i = 0; i < 7; i++) {
    fill(268, 55, 42, 7);
    rect(-20, height - 170 + i * 24, width + 40, 190 - i * 24);
  }
  fill(220, 20, 95, 55);
  for (const s of stars) circle(s.x, s.y, s.s);
  fill(240, 45, 6);
  ellipse(150, height + 60, 520, 170);
  ellipse(480, height + 70, 460, 170);

  for (const it of items) {
    if (it.kind === 'light') {
      stroke(46, 50, 100, 30);
      strokeWeight(2);
      line(it.x, it.y - it.r * 4.5, it.x, it.y);
      noStroke();
      fill(46, 70, 100, 14);
      circle(it.x, it.y, it.r * 4.4);
      fill(46, 60, 100, 28);
      circle(it.x, it.y, it.r * 2.8);
      fill(50, 25, 100);
      circle(it.x, it.y, it.r * 1.5);
    } else {
      push();
      translate(it.x, it.y);
      rotate(it.y * 0.02);
      fill(228, 25, 38);
      stroke(228, 15, 78);
      strokeWeight(2);
      square(-it.r, -it.r, it.r * 2);
      pop();
    }
  }

  noStroke();
  for (const p of sparks) {
    fill(p.hue, 45, 100, p.life * 90);
    circle(p.x, p.y, 2 + p.life * 4);
  }

  // ランタンの残像: 少し前の位置を薄く描く
  for (let i = 0; i < trail.length; i++) {
    fill(40, 60, 100, i * 1.2);
    circle(trail[i], player.y, player.r * 2);
  }
  // 当たった直後は薄く描いて、当たらない時間であることを示す
  const alpha = safe > 0 ? 45 : 100;
  fill(40, 70, 100, 10 + glow * 14);
  circle(player.x, player.y, player.r * (3.6 + glow * 1.6));
  fill(40, 60, 100, 20);
  circle(player.x, player.y, player.r * 2.7);
  fill(44, 30 - glow * 20, 100, alpha);
  circle(player.x, player.y, player.r * 2);
  noFill();
  stroke(30, 55, 62, alpha);
  strokeWeight(3);
  circle(player.x, player.y, player.r * 2 - 9);
  arc(player.x, player.y - player.r, player.r, player.r, PI, TWO_PI);
}

function drawHud() {
  noStroke();
  textAlign(LEFT, TOP);
  if (state !== 'title') {
    fill(0, 0, 100, 92);
    textSize(18);
    text('SCORE ' + round(shown), 16, 14);
    if (combo >= 2) {
      textSize(15);
      fill(46, 50, 100);
      text('れんぞく ' + combo, 16, 40);
    }
    // 残りは、数と印の両方で示す
    textAlign(RIGHT, TOP);
    textSize(15);
    fill(0, 0, 100, 80);
    text('のこり ' + life, width - 16 - 3 * 22, 16);
    for (let i = 0; i < 3; i++) {
      if (i < life) fill(44, 30, 100);
      else fill(0, 0, 100, 15);
      circle(width - 24 - i * 22, 24, 14);
    }
  }

  textAlign(CENTER, CENTER);
  if (state === 'title') {
    fill(236, 50, 9, 55);
    rect(0, 0, width, height);
    fill(46, 35, 100);
    textSize(46);
    text('ひかりうけ', width / 2, 128);
    fill(0, 0, 100, 85);
    textSize(17);
    text('落ちてくる光を受けて、四角い岩をよける', width / 2, 178);
    textSize(21);
    fill(0, 0, 100);
    text('クリックかEnterキーで開始', width / 2, 236);
    textSize(15);
    fill(0, 0, 100, 75);
    text('← → キーかマウスで移動   P: 一時停止   M: 音の入り切り', width / 2, 274);
    if (best > 0) text('BEST ' + best, width / 2, 304);
  }
  if (state === 'over') {
    fill(236, 50, 9, 72);
    rect(0, 0, width, height);
    fill(0, 0, 100);
    textSize(32);
    text('おしまい', width / 2, 140);
    textSize(22);
    text('SCORE ' + round(shown), width / 2, 190);
    textSize(16);
    fill(46, 45, 100);
    text(newBest ? '最高点を更新しました' : 'BEST ' + best, width / 2, 224);
    fill(0, 0, 100, 80);
    text('クリックかEnterキーでもう一度', width / 2, 266);
  }
  if (paused) {
    fill(236, 50, 9, 70);
    rect(0, 0, width, height);
    fill(0, 0, 100);
    textSize(22);
    text('一時停止中', width / 2, height / 2 - 12);
    textSize(16);
    text('Pキーで再開', width / 2, height / 2 + 22);
  }
  if (muted) {
    textAlign(LEFT, BOTTOM);
    textSize(14);
    fill(0, 0, 100, 75);
    text('音: 切', 12, height - 10);
  }
}

// 音は、クリックやキー入力のあとで始める
function startAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (audioCtx === null && AC) audioCtx = new AC();
  if (audioCtx !== null && audioCtx.state === 'suspended') audioCtx.resume();
}

// 短い音を1つ鳴らす
function beep(freq, len, type) {
  if (audioCtx === null || muted) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.05, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + len);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + len);
}

function mousePressed() {
  startAudio();
  if (state === 'title') startGame();
  else if (state === 'over' && overTimer > 0.6) startGame();
}

function keyPressed() {
  startAudio();
  if (key === 'Enter') {
    if (state === 'title') startGame();
    else if (state === 'over' && overTimer > 0.6) startGame();
  }
  if ((key === 'p' || key === 'P') && state === 'play') paused = !paused;
  if (key === 'm' || key === 'M') muted = !muted;
}`;

const STATE_SKETCH = `// 3つの画面を1つの変数で切り替える
let state = 'title';
let timer = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
}

function draw() {
  // いまの状態に合った関数だけを呼ぶ
  if (state === 'title') drawTitle();
  else if (state === 'play') drawPlay();
  else drawOver();

  noStroke();
  fill(0, 0, 100, 70);
  textSize(13);
  text('state = ' + state, width / 2, 20);
}

function drawTitle() {
  background(236, 50, 12);
  fill(46, 35, 100);
  textSize(34);
  text('タイトル', width / 2, 130);
  fill(0, 0, 100, 80);
  textSize(15);
  text('クリックで開始', width / 2, 180);
}

function drawPlay() {
  background(200, 55, 22);
  // 5秒たったら終了へ移る
  timer += deltaTime / 1000;
  if (timer > 5) state = 'over';
  noStroke();
  fill(46, 50, 100);
  circle(width / 2 + cos(timer * 2) * 160, 150, 40);
  fill(0, 0, 100, 80);
  textSize(15);
  text('プレイ中  のこり' + ceil(5 - timer) + '秒', width / 2, 250);
}

function drawOver() {
  background(330, 45, 20);
  fill(0, 0, 100);
  textSize(34);
  text('おしまい', width / 2, 130);
  fill(0, 0, 100, 80);
  textSize(15);
  text('クリックでタイトルへ', width / 2, 180);
}

function mousePressed() {
  // 状態ごとに、次に移る先を決める
  if (state === 'title') {
    timer = 0;
    state = 'play';
  } else if (state === 'over') {
    state = 'title';
  }
}`;

const BEST_SKETCH = `let count = 0;
let best = 0;

function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100, 100);
  // 保存された値を読む。まだ無いときはnullが返る
  const saved = getItem('click-best');
  if (typeof saved === 'number') best = saved;
}

function draw() {
  background(236, 50, 10);
  noStroke();
  textAlign(CENTER, CENTER);
  fill(46, 35, 100);
  textSize(44);
  text(count, width / 2, 92);
  fill(0, 0, 100, 80);
  textSize(15);
  text('クリックで1増える   最高記録: ' + best, width / 2, 150);
  textSize(13);
  fill(0, 0, 100, 60);
  text('枠の下の「最初から」を押しても、最高記録は残る（Rキーで記録を消す）', width / 2, 200);
}

function mousePressed() {
  count += 1;
  if (count > best) {
    best = count;
    // 名前を付けてブラウザに保存する
    storeItem('click-best', best);
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    removeItem('click-best');
    best = 0;
    count = 0;
  }
}`;

const FX_SKETCH = `let sparks = [];
let shake = 0;
let timer = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  const dt = min(deltaTime, 50) / 1000;

  // 何もしなくても、1.5秒ごとにどこかで起きる
  timer += dt;
  if (timer > 1.5) hitAt(random(80, width - 80), random(60, height - 60));

  // 揺れは時間とともに0へ戻る
  shake = max(0, shake - 30 * dt);

  push();
  translate(random(-shake, shake), random(-shake, shake));
  noStroke();
  fill(236, 50, 10);
  rect(-20, -20, width + 40, height + 40);
  // 揺れが分かるように、動かない格子を描く
  stroke(0, 0, 100, 12);
  strokeWeight(1);
  for (let x = 0; x <= width; x += 50) line(x, 0, x, height);
  for (let y = 0; y <= height; y += 50) line(0, y, width, y);

  noStroke();
  for (const p of sparks) {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    // 重力で落ち、時間とともに消える
    p.vy += 320 * dt;
    p.life -= 1.4 * dt;
    fill(p.hue, 50, 100, p.life * 90);
    circle(p.x, p.y, 2 + p.life * 5);
  }
  sparks = sparks.filter((p) => p.life > 0);
  pop();

  noStroke();
  fill(0, 0, 100, 75);
  textSize(14);
  text('クリックした場所で、粒が飛んで画面が揺れる', 16, 26);
}

function hitAt(x, y) {
  timer = 0;
  shake = 7;
  const hue = random(20, 60);
  for (let i = 0; i < 24; i++) {
    const a = random(TWO_PI);
    const v = random(60, 240);
    sparks.push({ x: x, y: y, vx: cos(a) * v, vy: sin(a) * v - 80, life: 1, hue: hue });
  }
}

function mousePressed() {
  hitAt(mouseX, mouseY);
}`;

const EASE_SKETCH = `let score = 0;
let shown = 0;
let timer = 0;

function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  const dt = min(deltaTime, 50) / 1000;
  background(236, 50, 10);

  // 1.2秒ごとに点が入る（クリックでも入る）
  timer += dt;
  if (timer > 1.2) addScore();
  if (score > 9000) {
    score = 0;
    shown = 0;
  }

  // 表示の値は、差の一部ずつ本当の値へ近づく
  shown += (score - shown) * min(1, 8 * dt);

  noStroke();
  fill(0, 0, 100, 60);
  textSize(13);
  text('本当の値（すぐ変わる）', 40, 50);
  text('表示の値（追いかける）', 320, 50);
  textSize(40);
  fill(0, 0, 100, 60);
  text(score, 40, 110);
  fill(46, 35, 100);
  text(round(shown), 320, 110);

  // 2つの値を棒の長さで比べる
  fill(0, 0, 100, 15);
  rect(40, 160, 520, 10, 5);
  rect(40, 184, 520, 10, 5);
  fill(0, 0, 100, 55);
  rect(40, 160, 520 * score / 9000, 10, 5);
  fill(46, 50, 100);
  rect(40, 184, 520 * shown / 9000, 10, 5);
}

function addScore() {
  timer = 0;
  score += round(random(2, 9)) * 100;
}

function mousePressed() {
  addScore();
}`;

const TRAIL_SKETCH = `let trail = [];

function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(236, 50, 10);

  // マウスが枠の中にあればマウスに、なければ自動で動く
  let x = width / 2 + sin(frameCount * 0.04) * 230;
  let y = 120 + sin(frameCount * 0.09) * 50;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    x = mouseX;
    y = mouseY;
  }

  // 位置を配列の末尾に足し、古いものを先頭から捨てる
  trail.push({ x: x, y: y });
  if (trail.length > 16) trail.shift();

  // 古い位置ほど薄く、小さく描く
  noStroke();
  for (let i = 0; i < trail.length; i++) {
    const t = i / trail.length;
    fill(40, 60, 100, t * 30);
    circle(trail[i].x, trail[i].y, 20 + t * 28);
  }
  fill(44, 30, 100);
  circle(x, y, 48);
}`;

const SOUND_SKETCH = `let audioCtx = null;
let rings = [];

function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(236, 50, 10);
  noFill();
  strokeWeight(2);
  for (const r of rings) {
    r.size += 3;
    r.life -= 0.03;
    stroke(r.hue, 50, 100, r.life * 80);
    circle(r.x, r.y, r.size);
  }
  rings = rings.filter((r) => r.life > 0);

  // 1・2・3のキーに対応する印
  for (let i = 1; i <= 3; i++) {
    stroke(i * 60, 40, 100, 50);
    strokeWeight(1.5);
    noFill();
    circle(i * 150, 130, 54);
    noStroke();
    fill(0, 0, 100, 80);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(i, i * 150, 130);
  }

  noStroke();
  fill(0, 0, 100, 80);
  textAlign(LEFT, BASELINE);
  textSize(14);
  if (audioCtx === null) {
    text('枠をクリックすると音が始まります（音量は小さめ）', 16, 26);
  } else {
    text('クリック: 左ほど低く右ほど高い   1: 受けた音   2: 当たった音   3: 終わりの音', 16, 26);
  }
}

// AudioContextは、利用者の操作のあとで作る
function startAudio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (audioCtx === null && AC) audioCtx = new AC();
  if (audioCtx !== null && audioCtx.state === 'suspended') audioCtx.resume();
}

function beep(freq, len, type) {
  if (audioCtx === null) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  // 小さな音量で始め、lenの秒数でほぼ0まで下げる
  gain.gain.setValueAtTime(0.05, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + len);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + len);
}

function mousePressed() {
  startAudio();
  beep(map(mouseX, 0, width, 220, 880), 0.15, 'triangle');
  rings.push({ x: mouseX, y: mouseY, size: 10, life: 1, hue: 46 });
}

function keyPressed() {
  startAudio();
  if (key === '1') beep(660, 0.12, 'triangle');
  if (key === '2') beep(110, 0.3, 'sawtooth');
  if (key === '3') beep(196, 0.5, 'triangle');
  if (key === '1' || key === '2' || key === '3') {
    rings.push({ x: Number(key) * 150, y: 130, size: 10, life: 1, hue: Number(key) * 60 });
  }
}`;

const CURVE_SKETCH = `function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(12);
}

// 3つの難易度曲線。tは経過秒数
function linear(t) {
  return 1 + t / 30;
}
function capped(t) {
  return min(3, 1 + t / 30);
}
function eased(t) {
  return 1 + 2 * (1 - exp(-t / 40));
}

// グラフ上の位置に直す
function px(t) {
  return map(t, 0, 120, 50, 540);
}
function py(level) {
  return map(level, 1, 5, 260, 40);
}

function plot(f, hue, weight) {
  noFill();
  stroke(hue, 50, 100);
  strokeWeight(weight);
  beginShape();
  for (let t = 0; t <= 120; t += 2) vertex(px(t), py(f(t)));
  endShape();
}

function draw() {
  background(236, 50, 10);
  stroke(0, 0, 100, 25);
  strokeWeight(1);
  line(50, 260, 540, 260);
  line(50, 260, 50, 40);
  noStroke();
  fill(0, 0, 100, 60);
  text('0秒', 44, 278);
  text('120秒', 520, 278);
  text('難易度', 12, 44);

  plot(linear, 190, 1.5);
  plot(capped, 300, 1.5);
  plot(eased, 46, 3);

  // 凡例は線と文字を並べて、色だけに頼らずに見分けられるようにする
  legend('直線: 上がり続ける', 190, 1.5, 56);
  legend('上限つき: 3で止まる', 300, 1.5, 76);
  legend('ゆるやかに3へ近づく', 46, 3, 96);

  // いまの時刻を動かして、3つの値を点で示す
  const t = (frameCount * 0.25) % 120;
  stroke(0, 0, 100, 30);
  strokeWeight(1);
  line(px(t), 40, px(t), 260);
  noStroke();
  fill(190, 50, 100);
  circle(px(t), py(linear(t)), 8);
  fill(300, 40, 100);
  circle(px(t), py(capped(t)), 8);
  fill(46, 50, 100);
  circle(px(t), py(eased(t)), 10);
  fill(0, 0, 100, 80);
  text(round(t) + '秒', px(t) + 6, 34);
}

function legend(label, hue, weight, y) {
  stroke(hue, 50, 100);
  strokeWeight(weight);
  line(70, y, 96, y);
  noStroke();
  fill(0, 0, 100, 80);
  text(label, 104, y + 4);
}`;

export default function GamePolish() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 23</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          手ざわりを仕上げる
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          前のページで作った「ひかりうけ」に、タイトルと終了の画面、最高点の保存、当たったときの演出、効果音、一時停止を足します。
          決まりは変えていません。変わるのは、遊んだときの手ごたえです。下の枠が完成形です。枠をクリックすると始まります。
        </p>

        <CodePreview
          title="ひかりうけ 仕上げ版（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          マウスか ← →
          キーで動かします。光を続けて受けると点と音の高さが上がり、岩に当たると画面が揺れます。
          Pキーで一時停止、Mキーで音の入り切りができます。音は最初のクリックかキー入力のあとから鳴ります。最高点はブラウザに保存され、ページを開き直しても残ります。
        </p>

        <WhyNowBox
          title="なぜ仕上げに1ページを使うのか"
          tags={[
            "状態機械",
            "storeItem() / getItem()",
            "OscillatorNode",
            "一時停止",
          ]}
        >
          <p>
            決まりが同じでも、受けた瞬間に音と光が返ってくるゲームと、数字だけが増えるゲームでは、もう一度遊びたくなる度合いが違います。
            ここで扱う部品はどれも短く、1つずつ独立しています。必要なものだけを自分のゲームに足せるように、部品ごとに小さなスケッチで示します。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              画面遷移は1つの変数で持つ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              タイトル・プレイ中・終了の3つの画面は、
              <code className={code}>state</code>
              という1つの変数で切り替えます。取りうる値と、どの値からどの値へ移れるかを決めておく作り方を状態機械と呼びます。
              前のページの<code className={code}>over</code>
              （trueかfalse）を、3つの値を持つ変数に広げたものです。draw()はいまの状態に合った関数だけを呼び、入力はいまの状態に応じて次の状態を決めます。
            </p>
            <CodePreview
              title="title → play → overを切り替える"
              language="js"
              code={STATE_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      いまの状態
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      きっかけ
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      次の状態
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      'title'
                    </th>
                    <td className="p-3">クリック、Enterキー</td>
                    <td className="p-3 font-mono">'play'</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      'play'
                    </th>
                    <td className="p-3">残りが0になる</td>
                    <td className="p-3 font-mono">'over'</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      'over'
                    </th>
                    <td className="p-3">クリック、Enterキー（もう一度）</td>
                    <td className="p-3 font-mono">'play'</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              完成形では、終了の直後0.6秒はもう一度の入力を受け付けていません（
              <code className={code}>overTimer &gt; 0.6</code>
              ）。夢中でクリックしている最中に終わると、結果を見る前に次が始まってしまうためです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              最高点を保存する
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              変数の値は、ページを閉じると消えます。
              <code className={code}>storeItem(名前, 値)</code>
              はブラウザの保存領域（localStorage）に値を書き、
              <code className={code}>getItem(名前)</code>
              はそれを読みます。公式リファレンスはgetItem()を「Returns a value
              in the web browser's local
              storage.」と説明しています。保存された値は、ページを再読み込みしても、ブラウザを開き直しても残ります。
            </p>
            <CodePreview
              title="最高記録を保存して読む"
              language="js"
              code={BEST_SKETCH}
            />
            <InfoBox type="warning" title="保存した値が読めないことがある">
              <p>
                仕様では保存した値は次に開いたときも読めますが、実測では読めない場合があります。保存先はブラウザごと・サイトごとに分かれていて、別のブラウザや端末、プライベートブラウズの窓、閲覧データを消したあとでは値がありません。
                そのためスケッチでは、読んだ値が数であることを
                <code className={code}>typeof saved === 'number'</code>
                で確かめてから使い、無ければ0から始めています。p5.js Web
                Editorなどに貼ったときも、記録はそのサイトの側に別に保存されます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              当たった手ごたえ: 揺れと粒
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              画面の揺れは、描く前に
              <code className={code}>
                translate(random(-shake, shake), random(-shake, shake))
              </code>
              で全体を少しずらすだけです。
              <code className={code}>shake</code>
              は当たった瞬間に7を入れ、毎フレーム減らして0に戻します。粒（パーティクル）は、当たった位置から放射状の速度を持たせて配列に足し、重力と寿命を与えます。パーティクルのページで作ったものと同じ仕組みです。
            </p>
            <CodePreview
              title="揺れとパーティクル"
              language="js"
              code={FX_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>shake = 7</code>
                  の7を2や20にする（2は気づく程度、20は画面が読めなくなる）
                </li>
                <li>
                  <code className={code}>shake - 30 * dt</code>
                  の30を8にする（揺れが長く続く）
                </li>
                <li>
                  <code className={code}>i &lt; 24</code>
                  の24を80にする（粒の量が増える）
                </li>
                <li>
                  <code className={code}>p.vy += 320 * dt</code>
                  の320を0にする（落ちずに広がる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              数字と動きをなめらかにする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              点が入ったときに数字が一瞬で切り替わると、増えたことに気づきにくくなります。本当の値
              <code className={code}>score</code>
              とは別に表示用の値
              <code className={code}>shown</code>
              を持ち、毎フレーム、差の一部だけ近づけます。イージングのページで扱った「目標との差に割合を掛ける」動きです。
            </p>
            <CodePreview
              title="追いかけて増えるスコア表示"
              language="js"
              code={EASE_SKETCH}
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              残像は、少し前の位置を配列に覚えておき、古いものほど薄く描いて作ります。背景を半透明で塗り重ねる方法と違い、文字や背景には跡が付かず、動く物だけに尾が付きます。
            </p>
            <CodePreview
              title="位置を覚えて描く残像"
              language="js"
              code={TRAIL_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>min(1, 8 * dt)</code>
                  の8を2にする（表示がゆっくり追いつく）
                </li>
                <li>
                  <code className={code}>trail.length &gt; 16</code>
                  の16を60にする（尾が長くなる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              効果音を鳴らす
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              効果音は音声ファイルを使わず、Web Audio
              APIの発振器（OscillatorNode）で作ります。
              <code className={code}>beep(周波数, 長さ, 波形)</code>
              は、発振器を1つ作り、音量を小さな値から0近くまで下げながら鳴らして止めます。周波数が高いほど高い音になり、波形を
              <code className={code}>'triangle'</code>
              にするとやわらかく、
              <code className={code}>'sawtooth'</code>
              にするとざらついた音になります。
            </p>
            <CodePreview
              title="発振器で作る短い音"
              language="js"
              code={SOUND_SKETCH}
            />
            <InfoBox type="warning" title="音は操作のあとで始める">
              <p>
                ブラウザは、利用者が操作する前にページが音を鳴らすことを制限しています。MDNはこの決まりを「Create
                or resume context from inside a user
                gesture」とまとめています。そのためAudioContextは
                <code className={code}>mousePressed()</code>や
                <code className={code}>keyPressed()</code>
                の中で作ります。音量は
                <code className={code}>0.05</code>
                から始めています。突然の大きな音は遊ぶ人を驚かせるので、効果音は小さめにし、切る手段（完成形ではMキー）を用意します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              難易度曲線
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              時間とともに難しくなる度合いを、経過秒数の関数として書いたものが難易度曲線です。直線は書きやすい反面、長く遊ぶと人の反応が追いつかない速さまで上がり続けます。上限を付けるか、上限へゆるやかに近づく式にすると、慣れた人が長く遊べます。
              完成形は
              <code className={code}>1 + 2 * (1 - exp(-elapsed / 40))</code>
              を使っています。はじめは早く上がり、3に近づくほどゆるやかになります。
            </p>
            <CodePreview
              title="3つの難易度曲線を比べる"
              language="js"
              code={CURVE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>exp(-t / 40)</code>
                  の40を10にする（すぐに上限近くへ達する）
                </li>
                <li>
                  <code className={code}>1 + 2 * (...)</code>
                  の2を3にする（近づく先が4になる）
                </li>
                <li>
                  完成形の同じ式を書き換えて、遊んだ感じがどう変わるか確かめる
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              誰でも遊べるようにする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              演出を足すときは、それが遊べる人を減らしていないかを同時に確かめます。完成形で行っている対応は次のとおりです。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      配慮
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      完成形での対応
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      WCAGの達成基準
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      色だけに頼らない
                    </th>
                    <td className="p-3">
                      受ける物は丸、よける物は四角。残りは数と印の両方で示す
                    </td>
                    <td className="p-3">1.4.1 Use of Color</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      点滅を避ける
                    </th>
                    <td className="p-3">
                      当たった直後の無敵時間は、点滅ではなく薄い表示のままにする。揺れは0.3秒以内で止める
                    </td>
                    <td className="p-3">
                      2.3.1 Three Flashes or Below Threshold
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      キーボードで遊べる
                    </th>
                    <td className="p-3">
                      開始・移動・もう一度・一時停止のすべてにキーを割り当てる
                    </td>
                    <td className="p-3">2.1.1 Keyboard</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      止められる
                    </th>
                    <td className="p-3">
                      Pキーで更新を止める。描画は続けるので画面は消えない
                    </td>
                    <td className="p-3">2.2.2 Pause, Stop, Hide</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      音を切れる
                    </th>
                    <td className="p-3">
                      Mキーで音を切る。音が無くても、光と数字で同じ情報が伝わる
                    </td>
                    <td className="p-3">1.4.2 Audio Control</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              一時停止は
              <code className={code}>if (!paused) update(dt)</code>
              の1行です。更新と描画を分けて書いてあるので、更新だけを飛ばせます。前のページで「描画は状態を読むだけにする」と決めたことが、ここで役に立ちます。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="いちばん長く押した時間を残す"
              description="___ を埋めて、マウスを押し続けた最長時間が保存され、「最初から」を押しても残るようにしてください。"
              preview
              initialCode={`let held = 0;
let best = 0;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  // 保存された値を読む
  const saved = ___('hold-best');
  if (typeof saved === 'number') best = saved;
}

function draw() {
  background(236, 50, 10);
  if (mouseIsPressed) {
    held += deltaTime / 1000;
  } else {
    held = 0;
  }
  if (held > best) {
    best = held;
    // 値を保存する
    ___('hold-best', best);
  }
  noStroke();
  fill(46, 50, 100);
  circle(200, 130, 40 + held * 40);
  fill(0, 0, 100, 85);
  textSize(15);
  text('押し続けた時間: ' + nf(held, 1, 1) + '秒', 200, 240);
  text('最長: ' + nf(best, 1, 1) + '秒', 200, 266);
}`}
              answer={`let held = 0;
let best = 0;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  // 保存された値を読む
  const saved = getItem('hold-best');
  if (typeof saved === 'number') best = saved;
}

function draw() {
  background(236, 50, 10);
  if (mouseIsPressed) {
    held += deltaTime / 1000;
  } else {
    held = 0;
  }
  if (held > best) {
    best = held;
    // 値を保存する
    storeItem('hold-best', best);
  }
  noStroke();
  fill(46, 50, 100);
  circle(200, 130, 40 + held * 40);
  fill(0, 0, 100, 85);
  textSize(15);
  text('押し続けた時間: ' + nf(held, 1, 1) + '秒', 200, 240);
  text('最長: ' + nf(best, 1, 1) + '秒', 200, 266);
}`}
              keywords={["getItem", "storeItem"]}
              hints={[
                "保存された値を名前で読む関数getItemを書きます。まだ保存が無いときはnullが返ります",
                "名前と値を渡してブラウザに保存する関数storeItemを書きます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              前のページで題材を替えた自分のゲームに、このページの部品を足していきます。1つ足すたびに遊んで、手ごたえが変わったかを確かめてください。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                音階を付ける。
                <code className={code}>pow(1.06, min(combo, 12))</code>
                の1.06を1.122（全音ぶん）にすると、続けて受けたときの上がり方が変わる
              </li>
              <li>
                タイトル画面を自分の絵にする。drawHud()のタイトルの部分に、これまでのページで作った模様を背景として描く
              </li>
              <li>
                粒の色と形を題材に合わせる。雨粒なら青い線、落ち葉なら回転する四角
              </li>
              <li>
                終了画面に、遊んだ秒数や受けた数を出す。数字が増えると、次の目標が立てやすくなる
              </li>
              <li>
                難易度曲線を自分で決める。遊んでもらった人が何秒で終わるかを見て、式の数字を直す
              </li>
            </ul>
            <InfoBox type="success" title="人に遊んでもらう">
              <p>
                仕上げの判断にいちばん役立つのは、説明せずに人に遊んでもらって様子を見ることです。どこで止まったか、何を押そうとしたかが、次に直す場所になります。
                公開の方法はこのマニュアルの最後のセクションで扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="state = 'title' | 'play' | 'over' のように、画面を1つの変数で持つ利点は？"
              options={[
                { label: "draw()が呼ばれる回数が減って軽くなる" },
                {
                  label:
                    "いまどの画面かが常に1つに決まり、画面ごとの処理と移り先を分けて書ける",
                  correct: true,
                },
                { label: "変数の値がブラウザに自動で保存される" },
                { label: "キーボードの入力が不要になる" },
              ]}
              explanation="isTitle・isOverのような真偽値を並べると、両方がtrueになる矛盾した組み合わせが作れてしまいます。値が1つの変数なら、状態は必ずどれか1つです。"
            />
            <Quiz
              question="効果音のためのAudioContextを、mousePressed()やkeyPressed()の中で作るのはなぜ？"
              options={[
                { label: "setup()の中ではJavaScriptの音の機能が使えないから" },
                { label: "クリックのたびに作り直さないと音が鳴らないから" },
                {
                  label:
                    "ブラウザが、利用者の操作より前に音を鳴らすことを制限しているから",
                  correct: true,
                },
                { label: "音量を小さくするため" },
              ]}
              explanation="ブラウザの自動再生の制限により、音の再生は利用者の操作をきっかけに始める必要があります。作るのは最初の1回だけで、以降は同じAudioContextを使い回します。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "画面遷移は1つの変数stateで持ち、状態ごとに描く関数と移り先を決める",
                  "storeItem()とgetItem()で、最高点をブラウザに保存して読める",
                  "揺れはtranslate()に乱数を足す。粒は位置・速度・寿命を持つ配列で作る",
                  "表示用の値を本当の値へ少しずつ近づけると、数字の変化がなめらかになる",
                  "効果音は発振器で作り、利用者の操作のあとに小さな音量で鳴らす",
                  "色以外の手がかり、点滅しない表現、キーボード操作、一時停止を用意する",
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
                  title: "p5.js Reference: storeItem()",
                  url: "https://p5js.org/reference/p5/storeItem/",
                  description: "ブラウザのlocalStorageに値を保存する関数",
                },
                {
                  title: "p5.js Reference: getItem()",
                  url: "https://p5js.org/reference/p5/getItem/",
                  description: "保存した値を名前で読む関数",
                },
                {
                  title: "MDN: OscillatorNode",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode",
                  description:
                    "決まった周波数の波形を出す発振器。波形の種類と周波数の指定",
                },
                {
                  title: "MDN: Web Audio API best practices",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices",
                  description:
                    "自動再生の制限と、利用者の操作のあとでAudioContextを始める書き方",
                },
                {
                  title:
                    "W3C: Understanding SC 2.3.1 Three Flashes or Below Threshold",
                  url: "https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html",
                  description: "1秒に3回を超える閃光を避ける達成基準の解説",
                },
                {
                  title: "W3C: Understanding SC 2.2.2 Pause, Stop, Hide",
                  url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html",
                  description:
                    "動き続ける表示を止められるようにする達成基準の解説",
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
