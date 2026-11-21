import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。自動で鳴る音の波形を、輪にして描く
const HERO_SKETCH = `let audio;    // 音の出入り口（クリックするまで作らない）
let analyser; // 鳴っている音を数値として取り出す部品
let wave = new Uint8Array(256);
// ラ（440Hz）から半音いくつ離れているか。どれを重ねても濁りにくい5種類の音
let scale = [-12, -10, -7, -5, -3, 0, 2, 5, 7, 9, 12];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  // 半透明で塗り重ねて、前の輪を少し残す
  background(250, 50, 8, 18);

  if (audio) {
    // 20フレームごとに1音鳴らす
    if (frameCount % 20 === 0) {
      playNote(random(scale), 1.2);
    }
    // いま鳴っている音の波形をwaveに受け取る（値は0〜255、無音は128）
    analyser.getByteTimeDomainData(wave);
  } else {
    // 音を始める前は、計算で作った波を代わりに入れておく
    for (let i = 0; i < wave.length; i++) {
      wave[i] = 128 + 60 * sin(i * 0.147 + frameCount * 0.04) * sin(frameCount * 0.013);
    }
  }

  // 波形を円周に巻きつけて描く
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(2);
  for (let ring = 0; ring < 3; ring++) {
    stroke((frameCount * 0.6 + ring * 40) % 360, 60, 100, 80);
    beginShape();
    for (let i = 0; i < wave.length; i++) {
      let angle = TWO_PI * i / wave.length;
      // 128からのずれを、半径の出入りに変える。輪の両端は0に寄せてつなぎ目を消す
      let edge = sin(PI * i / wave.length);
      let r = 70 + ring * 45 + (wave[i] - 128) * edge * (0.5 + ring * 0.35);
      vertex(cos(angle) * r, sin(angle) * r);
    }
    endShape(CLOSE);
  }

  if (!audio) {
    noStroke();
    fill(0, 0, 100);
    text('クリックすると音が出ます', 0, 0);
  }
}

function mousePressed() {
  if (audio) return;
  // 利用者の操作の中でAudioContextを作る
  audio = new AudioContext();
  analyser = audio.createAnalyser();
  analyser.fftSize = 512;
  // 全体の音量を絞る部品。耳に届く音はここで小さくする
  let master = audio.createGain();
  master.gain.value = 0.15;
  // 音 → analyser（波形を調べる）→ master（音量を絞る）→ スピーカー
  analyser.connect(master);
  master.connect(audio.destination);
}

// n: ラ（440Hz）からの半音の数、length: 音の長さ（秒）
function playNote(n, length) {
  let now = audio.currentTime;
  let osc = audio.createOscillator();
  let gain = audio.createGain();
  osc.frequency.value = 440 * pow(2, n / 12);
  // すばやく立ち上げてから、ゆっくり消す
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.5, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
  osc.connect(gain);
  gain.connect(analyser);
  osc.start(now);
  osc.stop(now + length);
}`;

// 発振器と音量をつなぎ、マウスで高さと大きさを変える
const TONE_SKETCH = `let audio;
let osc;  // 音の波を作る部品
let gain; // 音量を決める部品

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100);
  textSize(18);
}

function draw() {
  background(225, 45, 12);

  // マウスの横位置を周波数（110〜880Hz）に、縦位置を音量（0〜0.15）に変える
  let freq = map(constrain(mouseX, 0, width), 0, width, 110, 880);
  let volume = map(constrain(mouseY, 0, height), height, 0, 0, 0.15);

  if (audio) {
    // 押しているあいだだけ音量を上げる。値は少し時間をかけて変える
    let target = mouseIsPressed ? volume : 0;
    osc.frequency.setTargetAtTime(freq, audio.currentTime, 0.02);
    gain.gain.setTargetAtTime(target, audio.currentTime, 0.02);
  }

  // いまの周波数と音量を、波の細かさと高さで描く
  noFill();
  stroke(map(freq, 110, 880, 180, 330), 60, 100);
  strokeWeight(3);
  beginShape();
  for (let x = 0; x <= width; x += 4) {
    let y = height / 2 + sin(x * freq * 0.0003 - frameCount * 0.1) * volume * 700;
    vertex(x, y);
  }
  endShape();

  noStroke();
  fill(0, 0, 100);
  text(round(freq) + ' Hz   音量 ' + nf(volume, 1, 2), 16, 28);
  text('押しているあいだ音が出ます。左右で高さ、上下で音量', 16, height - 20);
}

function mousePressed() {
  if (audio) return;
  audio = new AudioContext();
  osc = audio.createOscillator();
  gain = audio.createGain();
  // 最初は音量0にしておく
  gain.gain.value = 0;
  // 発振器 → 音量 → スピーカー の順につなぐ
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
}`;

// 半音の数から周波数を求めて鳴らす鍵盤
const KEYS_SKETCH = `let audio;
// ド（C4）から上のド（C5）まで。数はラ（A4 = 440Hz）からの半音の数
let notes = [-9, -7, -5, -4, -2, 0, 2, 3];
let names = ['ド', 'レ', 'ミ', 'ファ', 'ソ', 'ラ', 'シ', 'ド'];
let keys = 'asdfghjk';
let glow = [0, 0, 0, 0, 0, 0, 0, 0]; // 鍵盤ごとの光り具合

function setup() {
  createCanvas(600, 320);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(260, 40, 12);
  let w = width / notes.length;

  for (let i = 0; i < notes.length; i++) {
    // 鳴らした鍵盤は明るくなり、だんだん元に戻る
    glow[i] *= 0.92;
    noStroke();
    fill(200 + i * 18, 55, 35 + glow[i] * 65);
    rect(i * w + 4, 60, w - 8, 240, 8);

    fill(0, 0, 100);
    textSize(22);
    text(names[i], i * w + w / 2, 230);
    textSize(15);
    text(keys[i], i * w + w / 2, 270);
    // この鍵盤の周波数
    text(round(440 * pow(2, notes[i] / 12)), i * w + w / 2, 90);
  }
  textSize(17);
  text('鍵盤をクリック、またはキーボードのasdfghjkで音が出ます', width / 2, 30);
}

function mousePressed() {
  let i = floor(mouseX / (width / notes.length));
  if (mouseY > 60 && i >= 0 && i < notes.length) play(i);
}

function keyPressed() {
  let i = keys.indexOf(key);
  if (i >= 0) play(i);
}

function play(i) {
  if (!audio) audio = new AudioContext();
  glow[i] = 1;
  let now = audio.currentTime;
  let osc = audio.createOscillator();
  let gain = audio.createGain();
  // 三角波は、サイン波より少し明るい音になる
  osc.type = 'triangle';
  // 半音をn個上がると、周波数は2の(n / 12)乗倍になる
  osc.frequency.value = 440 * pow(2, notes[i] / 12);
  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.8);
}`;

// 時間を区切って鳴らすシーケンサー
const SEQ_SKETCH = `let audio;
let playing = false;
let cols = 8;
// 上の行ほど高い音。数はラ（440Hz）からの半音の数
let rows = [7, 4, 0, -3, -5];
// 1がある所で音が鳴る。クリックで入れ替えられる
let grid = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0]
];
let step = -1;
let lastTime = 0;

function setup() {
  createCanvas(600, 340);
  colorMode(HSB, 360, 100, 100);
  textSize(17);
  let button = createButton('再生 / 停止（音が出ます）');
  button.mousePressed(toggle);
}

function draw() {
  background(200, 40, 11);

  // 0.25秒たつごとに、再生位置を1つ進めて、その列の音を鳴らす
  if (playing && millis() - lastTime > 250) {
    lastTime = millis();
    step = (step + 1) % cols;
    for (let r = 0; r < rows.length; r++) {
      if (grid[r][step] === 1) playNote(rows[r]);
    }
  }

  let w = width / cols;
  let h = 300 / rows.length;
  noStroke();
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols; c++) {
      let on = grid[r][c] === 1;
      let now = c === step;
      // 入っているマスは色つき、再生位置の列は明るく
      fill(160 + r * 35, on ? 65 : 25, on ? (now ? 100 : 75) : (now ? 32 : 20));
      rect(c * w + 4, r * h + 4, w - 8, h - 8, 6);
    }
  }
  fill(0, 0, 85);
  text('マスをクリックして、鳴らす場所を入れ替えられます', 12, 322);
}

function mousePressed() {
  let c = floor(mouseX / (width / cols));
  let r = floor(mouseY / (300 / rows.length));
  if (c >= 0 && c < cols && r >= 0 && r < rows.length) {
    grid[r][c] = 1 - grid[r][c];
  }
}

function toggle() {
  if (!audio) audio = new AudioContext();
  playing = !playing;
}

function playNote(n) {
  let now = audio.currentTime;
  let osc = audio.createOscillator();
  let gain = audio.createGain();
  osc.frequency.value = 440 * pow(2, n / 12);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.4);
}`;

// 発振器の波形とスペクトルを描く
const SCOPE_SKETCH = `let audio;
let osc;
let gain;
let analyser;
let wave;     // 波形（時間ごとの揺れ）
let spectrum; // スペクトル（周波数ごとの強さ）
let types = ['sine', 'triangle', 'square', 'sawtooth'];
let current = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  textSize(18);
}

function draw() {
  background(230, 45, 10);
  noStroke();
  fill(0, 0, 100);

  if (!audio) {
    textAlign(CENTER, CENTER);
    text('押しているあいだ音が出ます。押すたびに波の形が替わります', width / 2, height / 2);
    return;
  }
  // 押しているあいだだけ、耳に届く音量を上げる
  gain.gain.setTargetAtTime(mouseIsPressed ? 0.08 : 0, audio.currentTime, 0.02);

  textAlign(LEFT, BASELINE);
  text('波の形: ' + types[current] + '（220Hz）', 16, 28);

  // 上: 波形。値は0〜255で、128が真ん中
  analyser.getByteTimeDomainData(wave);
  noFill();
  stroke(180, 60, 100);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < 400; i++) {
    vertex(map(i, 0, 400, 0, width), map(wave[i], 0, 255, 200, 50));
  }
  endShape();

  // 下: スペクトル。左が低い周波数、右が高い周波数
  analyser.getByteFrequencyData(spectrum);
  noStroke();
  for (let i = 0; i < 120; i++) {
    let h = map(spectrum[i], 0, 255, 0, 170);
    fill(300 - i, 60, 100);
    rect(i * 5, 390 - h, 4, h);
  }
}

function mousePressed() {
  if (!audio) {
    audio = new AudioContext();
    osc = audio.createOscillator();
    gain = audio.createGain();
    analyser = audio.createAnalyser();
    analyser.fftSize = 2048;
    wave = new Uint8Array(analyser.fftSize);
    spectrum = new Uint8Array(analyser.frequencyBinCount);
    osc.frequency.value = 220;
    gain.gain.value = 0;
    // 発振器 → 解析 → 音量 → スピーカー
    // 音量を絞る前の波を調べるので、音を止めているあいだも波形が見える
    osc.connect(analyser);
    analyser.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    return;
  }
  // 2回目以降は、押すたびに波の形を次のものに替える
  current = (current + 1) % types.length;
  osc.type = types[current];
}`;

// マイクの音量と周波数で動く
const MIC_SKETCH = `let audio;
let analyser;
let spectrum = new Uint8Array(128);
let level = 0; // なめらかにした音量（0〜1）
let note = '「マイクを使う」を押すと、まわりの音で動きます';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(18);
  let button = createButton('マイクを使う');
  button.mousePressed(startMic);
}

function draw() {
  background(280, 50, 9, 30);

  if (analyser) {
    // 周波数ごとの強さ（0〜255）を受け取る
    analyser.getByteFrequencyData(spectrum);
  } else {
    // マイクが使えるまでは、ノイズで作った値を代わりに入れる
    for (let i = 0; i < spectrum.length; i++) {
      spectrum[i] = 200 * noise(i * 0.08, frameCount * 0.02) * (1 - i / 160);
    }
  }

  // 全体の平均を音量とみなし、急に変わらないようにならす
  let sum = 0;
  for (let i = 0; i < spectrum.length; i++) {
    sum += spectrum[i];
  }
  level = lerp(level, sum / spectrum.length / 255, 0.2);

  translate(width / 2, height / 2);
  // 中心の円は音量で大きくなる
  noStroke();
  fill(320, 60, 100, 60);
  circle(0, 0, 60 + level * 260);

  // まわりの線は、周波数ごとの強さで長さが変わる
  strokeWeight(3);
  for (let i = 0; i < spectrum.length; i++) {
    let angle = TWO_PI * i / spectrum.length - HALF_PI;
    let len = spectrum[i] * 0.45;
    stroke(180 + i * 1.2, 60, 100, 90);
    line(cos(angle) * 100, sin(angle) * 100, cos(angle) * (100 + len), sin(angle) * (100 + len));
  }

  if (!analyser) {
    noStroke();
    fill(0, 0, 100);
    text(note, 0, 180);
  }
}

function startMic() {
  if (audio) return;
  if (!navigator.mediaDevices) {
    note = 'この環境ではマイクを使えません。このまま眺められます';
    return;
  }
  audio = new AudioContext();
  note = '許可を待っています';
  // 許可されるとstream（マイクの音の流れ）が届く
  navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
    let source = audio.createMediaStreamSource(stream);
    let a = audio.createAnalyser();
    a.fftSize = 256;
    // スピーカーにはつながない。つなぐと自分の声が返ってきてしまう
    source.connect(a);
    analyser = a;
  }).catch(function () {
    note = 'マイクを使えませんでした。このまま眺められます';
  });
}`;

export default function Sound() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 16</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          音
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">音は空気の揺れで、プログラムからは数の並びとして作ることも読むこともできます。このページでは、ブラウザに備わっているWeb Audio APIで音を出し、鳴っている音の波形と周波数を絵にします。下の枠は、音の波形を輪にして描く完成形です。枠をクリックすると音が出ます。クリックするまでは、計算で作った波で動いています。</p>

        <CodePreview title={"音の輪（このページの完成形）"} language="js" code={HERO_SKETCH} />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">このページのスケッチは、クリックするかボタンを押すと音が出ます。音量は小さく設定してありますが、イヤホンを使っているときは先に端末の音量を確かめてください。音を止めるには、枠の下の「一時停止」か「最初から」を押します。</p>

        <WhyNowBox title={"なぜ音を扱うのか"} tags={["AudioContext", "OscillatorNode", "GainNode", "AnalyserNode"]}>
          <p>音を入力にすると、絵が音楽や声に合わせて動きます。音を出力にすると、絵の動きに音がつきます。どちらも、音を「数」として扱えるようになることが出発点です。</p>
          <p>p5.jsには音のための公式アドオンp5.soundがありますが、このページでは追加の読み込みが要らないWeb Audio APIを直接使います。そのままp5.js Web Editorに貼っても動きます。</p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              音を出す: 発振器と音量をつなぐ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">Web Audio APIでは、音を作る部品や加工する部品を順につなぎ、最後にスピーカーへ送ります。一番小さい構成は、波を作り続ける<code className={code}>OscillatorNode</code>（発振器）と、音量を決める<code className={code}>GainNode</code>の2つです。下のスケッチは、枠の中でマウスを押しているあいだ音が出ます。左右で音の高さ、上下で音量が変わります。</p>
            <CodePreview title={"マウスで鳴らす"} language="js" code={TONE_SKETCH} />
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
                    <th scope="row" className="text-left p-3 font-mono font-normal">new AudioContext()</th>
                    <td className="p-3">音の出入り口を作る。利用者の操作の中で呼ぶ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">audio.createOscillator()</th>
                    <td className="p-3">波を作り続ける部品（発振器）を作る</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">audio.createGain()</th>
                    <td className="p-3">通る音の大きさを変える部品を作る</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">a.connect(b)</th>
                    <td className="p-3">aの出力をbの入力につなぐ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">audio.destination</th>
                    <td className="p-3">最終的な出力先（スピーカーやイヤホン）</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">osc.frequency</th>
                    <td className="p-3">周波数（Hz）。1秒に何回揺れるか。大きいほど高い音</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">gain.gain</th>
                    <td className="p-3">音量の倍率。0で無音、1でそのまま。このページでは0.1前後に抑えている</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title={"クリックするまで音が出ない理由"}>
              <p>ブラウザは、ページが勝手に音を鳴らし始めることを制限しています。MDNはこの方針を「Create or resume context from inside a user gesture」とまとめています。</p>
              <p>そのため、<code className={code}>new AudioContext()</code>は<code className={code}>mousePressed()</code>やボタンの処理の中で呼びます。<code className={code}>setup()</code>の中で作ると、利用者の操作の外なので止まった状態（suspended）で作られ、音が出ません。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              音階: 半音ごとに同じ数を掛ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">周波数が2倍になると、1オクターブ上の同じ名前の音になります。広く使われている平均律では、1オクターブを12個の半音に等しく分け、半音上がるごとに周波数に同じ数（2の12乗根、約1.0595）を掛けます。基準はラの音（A4）の440Hzです。ラから半音n個ぶん上の音の周波数は<code className={code}>440 * pow(2, n / 12)</code>で求められます。下がるときはnを負の数にします。</p>
            <CodePreview title={"鍵盤"} language="js" code={KEYS_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>osc.type = 'triangle'</code>を<code className={code}>'square'</code>にする（硬い音色になる）</li>
                <li><code className={code}>now + 0.8</code>の2か所を<code className={code}>now + 0.15</code>にする（短く歯切れのよい音になる）</li>
                <li><code className={code}>notes[i] / 12</code>を<code className={code}>(notes[i] + 12) / 12</code>にする（全部が1オクターブ上がる）</li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title={"音量を下げていく行き先は、0にできない"}>
              <p>音をなめらかに消すために使っている<code className={code}>exponentialRampToValueAtTime()</code>は、行き先の値に0を指定するとエラーになります。MDNは「the value needs to be positive」と書いています。そのため、このページでは0の代わりに0.0001を指定しています。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              シーケンサー: 時間を区切って鳴らす
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">横に時間、縦に音の高さを取った表を用意し、再生位置を一定の間隔で右へ進めて、印のあるマスの音を鳴らします。枠の下のボタンで再生と停止を切り替え、マスをクリックして鳴らす場所を入れ替えられます。</p>
            <CodePreview title={"8マスのシーケンサー"} language="js" code={SEQ_SKETCH} />
            <InfoBox type="warning" title={"仕様の0.25秒と、実際の間隔"}>
              <p>仕様では、0.25秒ごとに次の列へ進みます。実測では、間隔が毎回少しずつずれます。時間がたったかどうかをdraw()が呼ばれたときにしか確かめていないので、最大で1フレームぶん（1秒に60回なら約17ミリ秒）、描画が重いときはそれ以上の遅れが入るからです。</p>
              <p>リズムの正確さが必要なときは、<code className={code}>osc.start(時刻)</code>に<code className={code}>audio.currentTime</code>を基準にした少し先の時刻を渡して、鳴らす時刻を予約します。このスケッチの<code className={code}>playNote()</code>の中の<code className={code}>now</code>がその時刻です。</p>
            </InfoBox>
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>&gt; 250</code>を<code className={code}>&gt; 125</code>にする（速さが2倍になる）</li>
                <li><code className={code}>rows</code>を<code className={code}>[12, 7, 4, 0, -5]</code>にする（音の組み合わせが変わる）</li>
                <li><code className={code}>let cols = 8</code>を<code className={code}>16</code>にし、<code className={code}>grid</code>の各行の数字も16個に増やす</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              音を見る: 波形とスペクトル
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed"><code className={code}>AnalyserNode</code>を途中につなぐと、通っている音を数として取り出せます。<code className={code}>getByteTimeDomainData()</code>は波形（時間ごとの揺れ）を、<code className={code}>getByteFrequencyData()</code>はスペクトル（周波数ごとの強さ）を、0〜255の数の配列に入れて返します。下のスケッチは、マウスを押しているあいだ音が出て、押すたびに発振器の波の形が替わります。</p>
            <CodePreview title={"波形とスペクトル"} language="js" code={SCOPE_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">サイン波（sine）は、スペクトルの山が1つだけです。三角波・矩形波・のこぎり波では、基本の周波数の整数倍の所にも山が並びます。同じ高さの音でも音色が違って聞こえるのは、この山の並び方が違うからです。</p>
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
                    <th scope="row" className="text-left p-3 font-mono font-normal">getByteTimeDomainData(配列)</th>
                    <td className="p-3">波形を受け取る。無音は128で、揺れると上下にずれる</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">getByteFrequencyData(配列)</th>
                    <td className="p-3">周波数ごとの強さを受け取る。配列の先頭が低い音、後ろが高い音</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">analyser.fftSize</th>
                    <td className="p-3">一度に調べる波の長さ。大きいほど周波数を細かく分けられる</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">analyser.frequencyBinCount</th>
                    <td className="p-3">スペクトルの配列の長さ。fftSizeの半分</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">スペクトルが時間とともにどう変わるかを1枚の絵にする「スペクトログラム」は、<Link href="/p5js/lab/acoustics" className="text-primary underline">音響解析</Link>のページで作ります。</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              マイクの音で動かす
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">入力を発振器からマイクに替えると、まわりの音や声で絵が動きます。<code className={code}>navigator.mediaDevices.getUserMedia({"{"} audio: true {"}"})</code>でマイクを使ってよいかを尋ね、届いた音を<code className={code}>AnalyserNode</code>につなぎます。尋ねるのは「マイクを使う」を押したときだけです。音はこのページの中で数値に変えられるだけで、録音も送信もされません。</p>
            <CodePreview title={"音で脈打つ"} language="js" code={MIC_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">マイクの音はスピーカーにつないでいません。つなぐと、スピーカーから出た音をマイクがまた拾い、音が回り続けてしまうからです。マイクが無い場合や許可しなかった場合は、ノイズで作った値のまま動き続けます。</p>
            <InfoBox type="info" title={"p5.soundというアドオン"}>
              <p>p5.jsには、音を扱う公式アドオンの<a href="https://p5js.org/reference/p5.sound/" target="_blank" rel="noopener noreferrer" className="text-primary underline">p5.sound</a>があります。公式リファレンスは「Extend p5.js with Web Audio functionality including audio input, playback, analysis and synthesis.」と紹介しています。音のファイルの再生や、マイク・発振器・解析を短く書ける関数が用意されています。p5.soundもWeb Audioの上に作られているので、このページで覚えた部品のつなぎ方はそのまま役に立ちます。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title={"部品をつないで音を出す"}
              description={"___ を埋めて、発振器の音がスピーカーまで届くようにしてください。埋めたあと、枠の中を押しているあいだ音が出ます。"}
              preview
              initialCode={`let audio;
let osc;
let gain;

function setup() {
  createCanvas(600, 240);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(24, 20, 48);
  fill(255);
  noStroke();
  text('押しているあいだ、440Hzの音が出ます', width / 2, height / 2);
  if (audio) {
    // 押しているあいだだけ音量を上げる
    gain.gain.setTargetAtTime(mouseIsPressed ? 0.1 : 0, audio.currentTime, 0.02);
    fill(255, 120, 180);
    circle(width / 2, 60, mouseIsPressed ? 50 : 16);
  }
}

function mousePressed() {
  if (audio) return;
  audio = new AudioContext();
  osc = audio.createOscillator();
  gain = audio.createGain();
  osc.frequency.value = 440;
  gain.gain.value = 0;
  // 発振器の出力を、音量の部品へつなぐ
  osc.___(gain);
  // 音量の部品の出力を、スピーカーへつなぐ
  gain.connect(audio.___);
  osc.start();
}`}
              answer={`let audio;
let osc;
let gain;

function setup() {
  createCanvas(600, 240);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(24, 20, 48);
  fill(255);
  noStroke();
  text('押しているあいだ、440Hzの音が出ます', width / 2, height / 2);
  if (audio) {
    // 押しているあいだだけ音量を上げる
    gain.gain.setTargetAtTime(mouseIsPressed ? 0.1 : 0, audio.currentTime, 0.02);
    fill(255, 120, 180);
    circle(width / 2, 60, mouseIsPressed ? 50 : 16);
  }
}

function mousePressed() {
  if (audio) return;
  audio = new AudioContext();
  osc = audio.createOscillator();
  gain = audio.createGain();
  osc.frequency.value = 440;
  gain.gain.value = 0;
  // 発振器の出力を、音量の部品へつなぐ
  osc.connect(gain);
  // 音量の部品の出力を、スピーカーへつなぐ
  gain.connect(audio.destination);
  osc.start();
}`}
              keywords={["connect", "destination"]}
              hints={[
                "部品の出力を次の部品へつなぐメソッドはconnectです。osc.connect(gain)と書きます",
                "最終的な出力先はaudio.destinationです。ここへつなぐと音が聞こえます",
              ]}
            />
            <CodingChallenge
              title={"波形を描く"}
              description={"___ を埋めて、鳴っている音の波形が線で描かれるようにしてください。クリックすると3秒間、音が出ます。"}
              preview
              initialCode={`let audio;
let analyser;
let wave = new Uint8Array(1024);

function setup() {
  createCanvas(600, 300);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(16, 20, 44);
  if (!audio) {
    fill(255);
    noStroke();
    text('クリックすると音が出て、波形が描かれます', width / 2, height / 2);
    return;
  }
  // いまの波形をwaveに受け取る
  analyser.___(wave);

  noFill();
  stroke(120, 255, 220);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < 600; i++) {
    // 無音のときの値を引いて、真ん中からのずれにする
    let offset = wave[i] - ___;
    vertex(i, height / 2 - offset);
  }
  endShape();
}

function mousePressed() {
  if (audio) return;
  audio = new AudioContext();
  let osc = audio.createOscillator();
  let gain = audio.createGain();
  analyser = audio.createAnalyser();
  osc.frequency.value = 330;
  // 3秒かけて消えていく音にする
  gain.gain.setValueAtTime(0.1, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 3);
  // 発振器 → 解析 → 音量 → スピーカー
  osc.connect(analyser);
  analyser.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 3);
}`}
              answer={`let audio;
let analyser;
let wave = new Uint8Array(1024);

function setup() {
  createCanvas(600, 300);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(16, 20, 44);
  if (!audio) {
    fill(255);
    noStroke();
    text('クリックすると音が出て、波形が描かれます', width / 2, height / 2);
    return;
  }
  // いまの波形をwaveに受け取る
  analyser.getByteTimeDomainData(wave);

  noFill();
  stroke(120, 255, 220);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < 600; i++) {
    // 無音のときの値を引いて、真ん中からのずれにする
    let offset = wave[i] - 128;
    vertex(i, height / 2 - offset);
  }
  endShape();
}

function mousePressed() {
  if (audio) return;
  audio = new AudioContext();
  let osc = audio.createOscillator();
  let gain = audio.createGain();
  analyser = audio.createAnalyser();
  osc.frequency.value = 330;
  // 3秒かけて消えていく音にする
  gain.gain.setValueAtTime(0.1, audio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 3);
  // 発振器 → 解析 → 音量 → スピーカー
  osc.connect(analyser);
  analyser.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 3);
}`}
              keywords={["getByteTimeDomainData", "128"]}
              hints={[
                "波形を配列に受け取るメソッドはgetByteTimeDomainDataです",
                "波形の値は0〜255で、無音のときは真ん中の128です。128を引くと、真ん中からのずれになります",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">音と絵を結びつけた作品を作ります。</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>冒頭の<code className={code}>scale</code>の配列を書き換えて、自分の音の組み合わせにする。<code className={code}>frameCount % 20</code>の20を変えると速さが変わる</li>
              <li>鍵盤の<code className={code}>play(i)</code>の中で、<Link href="/p5js/random/particles" className="text-primary underline">パーティクルと群れ</Link>の粒を出す。弾くたびに絵が増える楽器になる</li>
              <li>シーケンサーの表に自分のパターンを入れ、鳴ったマスから図形を広げる</li>
              <li>マイクのスケッチの円と線を、自分で決めた図形に替える。<code className={code}>level</code>を大きさ・色・回転のどれに使うかを選ぶ</li>
              <li><Link href="/p5js/game/game-loop" className="text-primary underline">ゲームの骨格</Link>で作るゲームに、<code className={code}>playNote()</code>を効果音として持ち込む</li>
            </ul>
            <InfoBox type="success" title={"音のある作品を公開するとき"}>
              <p>音が出る作品は、見る人が自分で始められるようにしておきます。「クリックで音が出ます」と画面に書き、最初のクリックまでは無音で動く絵を見せる、という冒頭の作品の形がそのまま使えます。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question={"ラ（440Hz）から半音12個ぶん上の音の周波数は？"}
              options={[
                { label: "452Hz" },
                { label: "660Hz" },
                { label: "880Hz", correct: true },
                { label: "5280Hz" },
              ]}
              explanation={"440 * pow(2, 12 / 12)は440 * 2で880Hzです。半音12個で1オクターブ上がり、周波数はちょうど2倍になります。"}
            />
            <Quiz
              question={"new AudioContext()をmousePressed()の中で呼ぶ理由は？"}
              options={[
                { label: "マウスの位置を音の高さに使うため" },
                { label: "ブラウザが、利用者の操作なしに音を鳴らし始めることを制限しているため", correct: true },
                { label: "setup()の中ではnewが使えないため" },
                { label: "音量を小さくするため" },
              ]}
              explanation={"ブラウザは自動再生を制限しています。クリックなどの操作の中でAudioContextを作ると、動いている状態で始まり、音を出せます。"}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "音は、部品を順につないでスピーカーへ送る。発振器（OscillatorNode）→ 音量（GainNode）→ audio.destination",
                  "AudioContextは、クリックやボタンなど利用者の操作の中で作る",
                  "ラ（440Hz）から半音n個ぶん離れた音の周波数は、440 * pow(2, n / 12)",
                  "AnalyserNodeで、波形（getByteTimeDomainData）とスペクトル（getByteFrequencyData）を数の配列として取り出せる",
                  "マイクは利用者がボタンを押してから尋ねる。使えないときも止まらない作りにする",
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
                  title: "MDN: Web Audio API",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API",
                  description: "ブラウザで音を作り、加工し、解析する仕組みの全体像（英語）",
                },
                {
                  title: "MDN: Web Audio API best practices",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices",
                  description: "自動再生の制限と、利用者の操作の中でAudioContextを作る書き方（英語）",
                },
                {
                  title: "MDN: Autoplay guide for media and Web Audio APIs",
                  url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay",
                  description: "ブラウザが音の自動再生を制限する条件（英語）",
                },
                {
                  title: "MDN: AnalyserNode",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode",
                  description: "波形とスペクトルを取り出す部品の仕様（英語）",
                },
                {
                  title: "p5.sound Reference",
                  url: "https://p5js.org/reference/p5.sound/",
                  description: "p5.jsの公式の音のアドオン。このページでは使わず、案内のみ",
                },
                {
                  title: "Wikipedia: Equal temperament",
                  url: "https://en.wikipedia.org/wiki/Equal_temperament",
                  description: "1オクターブを12の半音に等しく分ける音律と、2の12乗根の説明（英語）",
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
