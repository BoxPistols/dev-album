import CodePreview from "@/components/CodePreview";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。180フレームで元に戻るので、GIFにすると切れ目なくくり返す
const HERO_SKETCH = `// めぐる輪: 180フレームでちょうど元に戻るアニメーション
// sキー: PNGで保存 / gキー: ループするGIFで保存
const LOOP_FRAMES = 180;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // tは0から1へ進み、1に届いたところで0に戻る
  const t = (frameCount % LOOP_FRAMES) / LOOP_FRAMES;
  const phase = TWO_PI * t;

  background(250, 60, 8);
  translate(width / 2, height / 2);
  noStroke();

  for (let ring = 1; ring <= 11; ring++) {
    const count = ring * 6;
    for (let i = 0; i < count; i++) {
      // 動きはすべてsin(phase)の形にする。phaseが1周すると全部が元に戻る
      const a = (i / count) * TWO_PI + sin(phase + ring * 0.45) * 0.7;
      const r = ring * 19 + sin(phase * 2 + i * 0.5) * 5;
      const size = 5 + 3 * sin(phase + ring * 0.6);
      const hue = (205 + ring * 13 + 30 * sin(phase)) % 360;
      const x = cos(a) * r;
      const y = sin(a) * r;
      fill(hue, 60, 100, 12);
      circle(x, y, size * 3);
      fill(hue, 45, 100, 90);
      circle(x, y, size);
    }
  }
}

function keyPressed() {
  if (key === 's') {
    // いまの1枚をPNGで保存する
    saveCanvas('meguru-wa', 'png');
  }
  if (key === 'g') {
    // 1周ぶん（180フレーム）をGIFで保存する
    saveGif('meguru-wa', LOOP_FRAMES, { units: 'frames' });
  }
}`;

const SEED_SKETCH = `// seedの番号で絵が決まる。番号をファイル名に入れて保存する
// クリックか → キー: 次の番号 / ← キー: 前の番号 / sキー: 保存
let seed = 1;

function setup() {
  createCanvas(480, 360);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // 同じ番号を渡すと、random()とnoise()は毎回同じ値を返す
  // 隣の番号と最初の乱数が似ないように、1000倍して渡す
  randomSeed(seed * 1000);
  noiseSeed(seed);

  const hue = random(360);
  background(hue, 12, 96);
  noStroke();

  // 太陽
  fill((hue + 180) % 360, 30, 100);
  circle(random(120, 360), random(90, 150), random(70, 130));

  // 奥から手前へ、山を重ねる
  for (let layer = 0; layer < 6; layer++) {
    fill((hue + 200 + layer * 8) % 360, 22 + layer * 9, 88 - layer * 12);
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 8) {
      const n = noise(x * 0.006, layer * 10);
      vertex(x, 130 + layer * 34 + n * 110);
    }
    vertex(width, height);
    endShape(CLOSE);
  }

  fill(0, 0, 100, 85);
  textSize(13);
  text('seed ' + seed, 14, height - 14);
}

function mousePressed() {
  seed += 1;
}

function keyPressed() {
  if (key === 'ArrowRight') seed += 1;
  if (key === 'ArrowLeft' && seed > 1) seed -= 1;
  if (key === 's') {
    // 例: yama-seed-7.png
    saveCanvas('yama-seed-' + seed, 'png');
  }
}`;

const DENSITY_SKETCH = `// クリックでpixelDensityを1 → 2 → 4と切り替える
let density = 1;

function setup() {
  createCanvas(480, 300);
  pixelDensity(density);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(250, 60, 8);
  noFill();
  strokeWeight(0.6);
  // 細い線は、ピクセルが細かいほどなめらかに出る
  for (let i = 0; i < 46; i++) {
    stroke(190 + i * 2, 50, 100, 80);
    const wobble = sin(frameCount * 0.01 + i * 0.2) * 20;
    circle(330 + wobble, 150, 20 + i * 9);
  }

  // キャンバスが実際に持っているピクセル数を調べる
  const realW = drawingContext.canvas.width;
  const realH = drawingContext.canvas.height;
  noStroke();
  fill(0, 0, 100, 90);
  textSize(14);
  text('createCanvas(' + width + ', ' + height + ')', 16, 30);
  text('pixelDensity(' + density + ')', 16, 54);
  fill(46, 45, 100);
  text('保存されるPNG: ' + realW + ' × ' + realH + 'ピクセル', 16, 84);
  fill(0, 0, 100, 60);
  textSize(12);
  text('クリックで切り替え / sキーで保存', 16, height - 14);
}

function mousePressed() {
  density = density === 1 ? 2 : density === 2 ? 4 : 1;
  pixelDensity(density);
}

function keyPressed() {
  if (key === 's') saveCanvas('density-' + density, 'png');
}`;

const PRINT_SKETCH = `// A4の紙に印刷する大きさで描き、画面には縮めて見せる
// クリック: 別の案 / sキー: 大きいほうの絵を保存
const DPI = 150;
const W_MM = 210;
const H_MM = 297;
let pg;
let seed = 3;

function setup() {
  createCanvas(360, 480);
  // ミリをピクセルに直す: ミリ ÷ 25.4 × dpi
  const w = round(W_MM / 25.4 * DPI);
  const h = round(H_MM / 25.4 * DPI);
  pg = createGraphics(w, h);
  pg.pixelDensity(1);
  paint();
}

// 大きなバッファに描く。長さはすべて「紙の幅の100分の1」を単位にする
function paint() {
  randomSeed(seed * 1000);
  const u = pg.width / 100;
  pg.colorMode(HSB, 360, 100, 100, 100);
  pg.background(42, 8, 96);
  const hue = random(360);
  // 半透明の面を重ねる
  pg.noStroke();
  for (let i = 0; i < 16; i++) {
    pg.fill((hue + (i % 2) * 150) % 360, 55, 85, 30);
    pg.circle(random(25, 75) * u, random(30, 100) * u, random(14, 46) * u);
  }
  // その上に細い輪を重ねる
  pg.noFill();
  for (let i = 0; i < 40; i++) {
    pg.stroke(hue, 40, 30, 70);
    pg.strokeWeight(u * random(0.1, 0.45));
    pg.circle(random(22, 78) * u, random(28, 104) * u, random(4, 40) * u);
  }
  pg.noStroke();
  pg.fill(0, 0, 25);
  pg.textSize(u * 2.2);
  pg.text('seed ' + seed, 8 * u, 132 * u);
}

function draw() {
  background(24, 26, 40);
  // 画面には280×396に縮めて表示する
  image(pg, 40, 24, 280, 396);
  noStroke();
  fill(255);
  textSize(13);
  textAlign(CENTER);
  text(pg.width + ' × ' + pg.height + 'ピクセル（A4・' + DPI + 'dpi）', width / 2, 452);
}

function mousePressed() {
  seed += 1;
  paint();
}

function keyPressed() {
  if (key === 's') {
    // 画面のキャンバスではなく、大きいバッファを保存する
    save(pg, 'a4-' + DPI + 'dpi-seed-' + seed + '.png');
  }
}`;

const LOOP_SKETCH = `// 左: 時間をそのままnoise()に渡す（つながらない）
// 右: 時間を円周上の点に直して渡す（つながる）
const LOOP_FRAMES = 150;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(13);
  textAlign(CENTER);
}

// 輪郭がゆらぐ形を描く。(nx, ny)はnoise()の中で見る位置
function blob(cx, cy, nx, ny) {
  beginShape();
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * TWO_PI;
    const r = 50 + noise(2 + cos(a) + nx, 2 + sin(a) + ny) * 70;
    vertex(cx + cos(a) * r, cy + sin(a) * r);
  }
  endShape(CLOSE);
}

function draw() {
  const t = (frameCount % LOOP_FRAMES) / LOOP_FRAMES;
  background(250, 60, 8);
  noStroke();

  // 左: 見る位置がまっすぐ進む。tが1から0へ戻る瞬間に、形が飛ぶ
  fill(190, 55, 95, 85);
  blob(150, 140, t * 3, 0);

  // 右: 見る位置が円を1周して戻るので、形もなめらかに戻る
  fill(46, 55, 100, 85);
  blob(450, 140, 1.2 * cos(TWO_PI * t), 1.2 * sin(TWO_PI * t));

  fill(0, 0, 100, 80);
  text('位置 = t * 3  終わりで形が飛ぶ', 150, 262);
  text('位置 = cos, sin  つながる', 450, 262);

  // 1周の進み具合
  fill(0, 0, 100, 15);
  rect(40, 282, 520, 6, 3);
  fill(0, 0, 100, 70);
  rect(40, 282, 520 * t, 6, 3);
}`;

const SVG_SKETCH = `// 線だけで描いた絵をSVGで保存する
// クリック: 別の案 / vキー: SVGで保存 / sキー: PNGで保存
let seed = 5;

function setup() {
  createCanvas(480, 480);
}

function draw() {
  noiseSeed(seed);
  background(250, 247, 240);
  noFill();
  stroke(30, 50, 90);
  strokeWeight(1);

  // 中心から外へ、ゆがんだ輪を重ねる
  for (let ring = 0; ring < 34; ring++) {
    const base = 14 + ring * 6;
    beginShape();
    for (let i = 0; i <= 120; i++) {
      const a = (i / 120) * TWO_PI;
      const n = noise(1.5 + cos(a) * 0.9, 1.5 + sin(a) * 0.9, ring * 0.06);
      const r = base + n * ring * 3.2;
      vertex(240 + cos(a) * r, 240 + sin(a) * r);
    }
    endShape();
  }
}

function mousePressed() {
  seed += 1;
}

function keyPressed() {
  if (key === 'v') {
    // 次のフレームで描いた内容がSVGとして保存される
    saveSVG('wa-seed-' + seed + '.svg');
  }
  if (key === 's') saveCanvas('wa-seed-' + seed, 'png');
}`;

const VIDEO_SKETCH = `// rキーで3秒間録画し、動画ファイルとして保存する
let chunks = [];
let endAt = 0; // 録画を止める時刻 (ms)
let message = 'rキーで3秒間の録画を始める';

function setup() {
  createCanvas(480, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(250, 60, 8);
  noStroke();
  for (let i = 0; i < 40; i++) {
    const a = frameCount * 0.02 + i * 0.4;
    fill(200 + i * 3, 55, 100, 80);
    circle(240 + cos(a) * (40 + i * 4), 150 + sin(a * 1.3) * (20 + i * 2), 10);
  }

  const remain = (endAt - millis()) / 1000;
  fill(0, 0, 100, 85);
  textSize(13);
  text(remain > 0 ? '録画中 のこり' + ceil(remain) + '秒' : message, 14, 24);
}

function keyPressed() {
  if (key !== 'r' || millis() < endAt) return;
  if (typeof MediaRecorder === 'undefined') {
    message = 'このブラウザでは録画できません';
    return;
  }
  // キャンバスの映像を流れ（ストリーム）として取り出し、録画する
  const stream = drawingContext.canvas.captureStream(60);
  const rec = new MediaRecorder(stream);
  chunks = [];
  rec.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  rec.onstop = function () {
    // 録画の形式はブラウザが選ぶ（WebMやMP4）。受け取ったデータの形式に合わせて拡張子を付ける
    const type = chunks.length > 0 && chunks[0].type ? chunks[0].type : rec.mimeType;
    const blob = new Blob(chunks, { type: type });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sketch.' + (type.indexOf('mp4') >= 0 ? 'mp4' : 'webm');
    link.click();
    message = '保存しました。rキーでもう一度';
  };
  rec.start();
  endAt = millis() + 3000;
  // 止めるのはdraw()ではなくタイマーで行う。一時停止などでdraw()が止まっても、3秒で保存される
  setTimeout(function () {
    rec.stop();
  }, 3000);
}`;

const SAVE_FRAMES_CODE = `function keyPressed() {
  if (key === 'f') {
    // frame0.png, frame1.png ... を、2秒間・毎秒20枚で保存する
    saveFrames('frame', 'png', 2, 20);
  }
}`;

export default function Export() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 28</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          書き出す
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          画面の中で動いている作品を、画像・GIF・動画・印刷用の大きな画像として手元に残す方法を扱います。
          下の枠は、180フレームでちょうど元に戻るアニメーションです。枠をクリックしてからsキーを押すとPNGが、gキーを押すと切れ目なくくり返すGIFが保存されます。
        </p>

        <CodePreview
          title="めぐる輪（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          キーは、プレビュー枠を1回クリックしてフォーカスを入れてから押します。枠の下の「PNG保存」ボタンも、同じsaveCanvas()を呼んでいます。
          GIFの保存には数秒かかり、進み具合が枠の中に表示されます。
        </p>

        <WhyNowBox
          title="なぜ書き出しを学ぶのか"
          tags={["saveCanvas()", "pixelDensity()", "saveGif()", "randomSeed()"]}
        >
          <p>
            スケッチは実行するたびに描かれて消えるものです。人に見せる、印刷して壁に貼る、SNSに載せる、といった場面では、ファイルとして取り出す必要があります。
            取り出し方によって必要なピクセル数や形式が変わるので、行き先（画面・紙・SNS）から逆算して選びます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              PNGで保存し、seedで再現できるようにする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={code}>saveCanvas('名前', 'png')</code>
              は、いまのキャンバスを画像として保存します。公式リファレンスの説明は「Saves
              the current canvas as an
              image.」で、形式はpng・webp・jpgから選べます。draw()の中に書くと毎フレーム保存されてしまうので、
              <code className={code}>keyPressed()</code>
              の中に書いて、キーを押したときだけ保存します。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              乱数を使った作品は、保存した絵と同じものを二度と出せなくなりがちです。
              <code className={code}>randomSeed(seed)</code>と
              <code className={code}>noiseSeed(seed)</code>
              に同じ番号を渡すと、random()とnoise()は毎回同じ値の並びを返します。その番号をファイル名に入れておけば、あとから同じ絵を呼び出して、大きく書き出し直すことも、色だけ変えることもできます。
            </p>
            <CodePreview
              title="seedの番号をファイル名に入れて保存する"
              language="js"
              code={SEED_SKETCH}
            />
            <InfoBox type="warning" title="隣り合う番号は、最初の乱数が似る">
              <p>
                仕様では番号が違えば乱数の並びも違いますが、実測では、1と2のように隣り合う番号を渡すと最初の1個がほぼ同じ値になります。p5.js
                2.4.0で試すと、randomSeed(1)・(2)・(3)の直後のrandom()は0.2365・0.2368・0.2372でした。2個目からは大きく変わります。
                最初の乱数を色相に使うと、どの番号でも同じ色になってしまうので、上のスケッチでは番号を1000倍して渡しています（1000・2000・3000では0.6236・0.0112・0.3987）。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>let seed = 1</code>
                  の1を、気に入った番号に書き換える（開いた時点でその絵になる）
                </li>
                <li>
                  <code className={code}>layer &lt; 6</code>
                  の6を3にする（山が減る。seedが同じなら太陽の位置は変わらない）
                </li>
                <li>
                  <code className={code}>saveCanvas(..., 'png')</code>の
                  <code className={code}>'png'</code>を
                  <code className={code}>'jpg'</code>
                  にする（写真向きの形式で保存される）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ピクセル数を増やす（pixelDensity）
            </h2>
            <InfoBox
              type="warning"
              title="createCanvasの数と、保存される画像の大きさ"
            >
              <p>
                仕様では
                <code className={code}>createCanvas(480, 300)</code>
                は幅480・高さ300のキャンバスを作りますが、実測では保存した画像が960×600や1440×900になることがあります。
                p5.jsは画面の細かさに合わせてピクセルを増やすためで、公式リファレンスは「By
                default, the pixel density is set to match the display's
                density.」と書いています。同じスケッチでも、端末によって保存される大きさが変わります。
              </p>
            </InfoBox>
            <p className="text-muted-foreground my-4 leading-relaxed">
              <code className={code}>pixelDensity(n)</code>
              を呼ぶと、この倍率を自分で決められます。座標や
              <code className={code}>width</code>
              の値はそのままで、1つの座標あたりのピクセルだけがn倍に細かくなります。保存される画像は縦横ともn倍です。下のスケッチはクリックで倍率が切り替わり、実際のピクセル数を表示します。
            </p>
            <CodePreview
              title="pixelDensityと保存される大きさ"
              language="js"
              code={DENSITY_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              どの端末でも同じ大きさで保存したいときは、setup()で
              <code className={code}>pixelDensity(1)</code>や
              <code className={code}>pixelDensity(2)</code>
              と明示します。倍率を上げるとピクセル数は倍率の2乗で増え、描画は重くなります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              印刷する大きさで描く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              紙に印刷するときは、紙の大きさと印刷の細かさ（dpi:
              1インチあたりの点の数）から、必要なピクセル数を計算します。1インチは25.4ミリです。
            </p>
            <div className="rounded-xl border border-border bg-card p-5 my-4">
              <p className="font-mono text-sm text-foreground">
                ピクセル数 = 紙の長さ（ミリ） ÷ 25.4 × dpi
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                A4（210×297ミリ）を300dpiで印刷する場合: 210 ÷ 25.4 × 300 =
                2480、297 ÷ 25.4 × 300 =
                3508。必要な画像は2480×3508ピクセルです。
              </p>
            </div>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      用紙
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      大きさ（ミリ）
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      150dpi
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      300dpi
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      A5
                    </th>
                    <td className="p-3">148 × 210</td>
                    <td className="p-3">874 × 1240</td>
                    <td className="p-3">1748 × 2480</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      A4
                    </th>
                    <td className="p-3">210 × 297</td>
                    <td className="p-3">1240 × 1754</td>
                    <td className="p-3">2480 × 3508</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      A3
                    </th>
                    <td className="p-3">297 × 420</td>
                    <td className="p-3">1754 × 2480</td>
                    <td className="p-3">3508 × 4961</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              この大きさのキャンバスは画面に収まりません。そこで
              <code className={code}>createGraphics(w, h)</code>
              で画面に見えない大きなバッファを作り、そこへ描いて、画面には縮めて表示します。保存するときは
              <code className={code}>save(pg, 'ファイル名.png')</code>
              でバッファのほうを渡します。線の太さや位置を「紙の幅の100分の1」のような割合で書いておくと、dpiを変えても同じ絵になります。
            </p>
            <CodePreview
              title="A4の大きさのバッファに描いて保存する"
              language="js"
              code={PRINT_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>const DPI = 150</code>
                  の150を300にする（表示は同じまま、保存される画像が2480×3508になる）
                </li>
                <li>
                  <code className={code}>W_MM</code>と
                  <code className={code}>H_MM</code>
                  を148と210にする（A5になる。縦横の比は同じなので表示はそのまま。表示とファイル名の「A4」は自分で書き換える）
                </li>
                <li>
                  <code className={code}>u * random(0.1, 0.45)</code>
                  の0.45を2にする（輪の線が太くなる。紙に対する太さなので、dpiを変えても見た目は同じ）
                </li>
              </ul>
            </InfoBox>
            <InfoBox
              type="warning"
              title="大きすぎるキャンバスは作れないことがある"
            >
              <p>
                ブラウザと端末には、作れるキャンバスの大きさの上限があります。上限を超えると何も描かれない画像になることがあるので、大きな紙に出すときは、まず小さいdpiで保存できることを確かめてから数字を上げてください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ループするGIFを作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={code}>saveGif(名前, 長さ, オプション)</code>
              は、スケッチを指定した長さだけ記録してGIFにします。公式リファレンスの説明は「Generates
              a gif from a sketch and saves it to a
              file.」です。長さの単位は既定では秒で、オプションに
              <code className={code}>{"{ units: 'frames' }"}</code>
              を渡すとフレーム数で指定できます。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      オプション
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      既定値
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
                      delay
                    </th>
                    <td className="p-3">0</td>
                    <td className="p-3">記録を始めるまでに待つ長さ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      units
                    </th>
                    <td className="p-3 font-mono">'seconds'</td>
                    <td className="p-3">
                      長さとdelayの単位。'seconds'か'frames'
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      silent
                    </th>
                    <td className="p-3 font-mono">false</td>
                    <td className="p-3">
                      trueにすると進み具合の表示を出さない
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              切れ目なくくり返すGIFにするコツは、最後のフレームの次が最初のフレームにつながるように、動きをすべて周期のある式で書くことです。
              0から1へ進む値
              <code className={code}>t</code>
              を作り、動きを
              <code className={code}>sin(TWO_PI * t)</code>
              の形で書けば、tが1周したときに全部が元に戻ります。frameCountをそのまま足し続ける動きや、時間をそのまま渡したnoise()は元に戻らないので、つなぎ目で形が飛びます。noise()を使いたいときは、時間を円周上の点に直して渡します。
            </p>
            <CodePreview
              title="つながらないループ、つながるループ"
              language="js"
              code={LOOP_SKETCH}
            />
            <InfoBox
              type="info"
              title="記録する長さは、周期のちょうど整数倍にする"
            >
              <p>
                冒頭の作品は周期が180フレームなので、
                <code className={code}>
                  saveGif('meguru-wa', 180, {"{ units: 'frames' }"})
                </code>
                と書いています。どのフレームから記録を始めても、180フレーム後には同じ絵に戻るのでつながります。
                このページのスケッチで試したところ、保存されたGIFはpixelDensity()の倍率にかかわらずcreateCanvas()で指定した大きさ（480×480）になり、1コマの表示時間は20ミリ秒、ファイルは約6.5MBでした。大きすぎるときは、キャンバスを小さくするか周期を短くします。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              連番の画像と動画
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              GIFより長いもの、色をきれいに残したいものは、動画にします。p5.jsだけでできる方法と、ブラウザの機能を使う方法があります。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      方法
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      できるもの
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      向いている場面
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      saveGif()
                    </th>
                    <td className="p-3">ループするGIF 1つ</td>
                    <td className="p-3">数秒の短いループ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      saveFrames()
                    </th>
                    <td className="p-3">
                      連番の画像ファイル（1枚ずつダウンロードされる）
                    </td>
                    <td className="p-3">
                      動画編集ソフトで読み込んで動画にする。最長15秒、毎秒22枚まで
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      MediaRecorder
                    </th>
                    <td className="p-3">動画ファイル1つ</td>
                    <td className="p-3">
                      音のない映像をそのまま録画する。形式はブラウザによって変わる
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      画面収録
                    </th>
                    <td className="p-3">動画ファイル1つ</td>
                    <td className="p-3">
                      OSの画面収録機能を使う。マウス操作や音も一緒に残せる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CodeBlock
              language="js"
              title="saveFrames()で連番の画像を保存する"
              code={SAVE_FRAMES_CODE}
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              saveFrames()の上限は、公式リファレンスに「The maximum duration is
              15 seconds.」「The maximum frame rate value is
              22.」と書かれています。ブラウザ標準のMediaRecorderを使うと、キャンバスの映像を1つの動画ファイルとして録画できます。下のスケッチは、枠をクリックしてからrキーを押すと3秒間録画します。
            </p>
            <CodePreview
              title="MediaRecorderでキャンバスを録画する"
              language="js"
              code={VIDEO_SKETCH}
            />
            <InfoBox type="info" title="録画アドオンという選択肢">
              <p>
                p5.jsの公式サイトのライブラリ一覧には、録画のためのアドオンも載っています。長い作品を決まった形式で書き出したいときは、一覧の「Export」の分類を見てください。アドオンは外部のファイルを読み込むので、このページのプレビュー枠ではなく、自分の環境で使います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              SVGとペンプロッタ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              PNGはピクセルの集まりなので、拡大するとぼやけます。SVGは線や円を式として持つ形式で、どれだけ拡大しても線のままです。ペンで紙に線を引く機械（ペンプロッタ）や、カッティングマシンに渡す絵にも使われます。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              このマニュアルが使っているp5.js 2.4.0には
              <code className={code}>saveSVG()</code>
              があり、キーを押した次のフレームで描いた内容をSVGとして保存できます。公式リファレンスには「This
              API is experimental」「Its behavior may change in a future version
              of
              p5.js.」と書かれているので、版が変わると書き方が変わる可能性があります。下のスケッチは、枠をクリックしてからvキーを押すとSVGが保存されます。
            </p>
            <CodePreview
              title="線の絵をSVGで保存する"
              language="js"
              code={SVG_SKETCH}
            />
            <InfoBox type="info" title="プロッタ向けに描くときの考え方">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  塗りは使わず、線だけで描く（
                  <code className={code}>noFill()</code>
                  ）。ペンは面を塗れない
                </li>
                <li>半透明や重ね塗りに頼らない。線の密度で濃淡を作る</li>
                <li>色ごとにペンを替えるので、色数は少なくする</li>
              </ul>
              <p className="mt-2">
                p5.jsの公式サイトのライブラリ一覧には、プロッタ向けのSVGを書き出す外部ライブラリ（p5.plotSvg）も載っています。saveSVG()が使えない版や、プロッタ向けの細かい制御が要る場合の選択肢です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="番号つきで保存できる模様"
              description="___ を埋めて、seedの番号で模様が決まり、sキーで番号つきのPNGが保存されるようにしてください。クリックで次の番号に進みます。"
              preview
              initialCode={`let seed = 1;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // 同じ番号なら、同じ乱数の並びになる
  ___(seed);
  const hue = (seed * 47) % 360;
  background(hue, 8, 96);
  noStroke();
  for (let i = 0; i < 40; i++) {
    fill((hue + random(150, 210)) % 360, 50, 75, 50);
    circle(random(width), random(height), random(10, 80));
  }
  fill(0, 0, 20);
  textSize(13);
  text('seed ' + seed, 12, height - 12);
}

function mousePressed() {
  seed += 1;
}

function keyPressed() {
  if (key === 's') {
    // いまのキャンバスを、番号つきの名前で保存する
    ___('moyou-seed-' + seed, 'png');
  }
}`}
              answer={`let seed = 1;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // 同じ番号なら、同じ乱数の並びになる
  randomSeed(seed);
  const hue = (seed * 47) % 360;
  background(hue, 8, 96);
  noStroke();
  for (let i = 0; i < 40; i++) {
    fill((hue + random(150, 210)) % 360, 50, 75, 50);
    circle(random(width), random(height), random(10, 80));
  }
  fill(0, 0, 20);
  textSize(13);
  text('seed ' + seed, 12, height - 12);
}

function mousePressed() {
  seed += 1;
}

function keyPressed() {
  if (key === 's') {
    // いまのキャンバスを、番号つきの名前で保存する
    saveCanvas('moyou-seed-' + seed, 'png');
  }
}`}
              keywords={["randomSeed", "saveCanvas"]}
              hints={[
                "乱数の並びを番号で固定する関数randomSeedを書きます。draw()の最初で呼ぶと、毎フレーム同じ模様になります",
                "いまのキャンバスを画像として保存する関数saveCanvasを書きます。引数はファイル名と形式です",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              これまでのページで作ったスケッチを1つ選び、手元に残る形にします。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                乱数を使ったスケッチに
                <code className={code}>seed</code>
                を足し、気に入った番号を3つ選んでPNGで保存する。3枚を並べると連作になる
              </li>
              <li>
                動くスケッチの式を
                <code className={code}>sin(TWO_PI * t)</code>
                の形に書き直し、ループするGIFにする
              </li>
              <li>
                静止画のスケッチをcreateGraphics()の大きなバッファに描くよう書き換え、A4で印刷して壁に貼る
              </li>
              <li>
                線だけで描いたスケッチをSVGで保存し、ベクター編集ソフトで開いて拡大してみる
              </li>
            </ul>
            <InfoBox type="success" title="ファイル名に入れておくと助かるもの">
              <p>
                題名、seedの番号、日付の3つです。たとえば
                <code className={code}>yama-seed-7-20260115.png</code>
                のようにしておくと、数か月後に見返したときにも、どのスケッチのどの案かが分かります。次のページでは、こうして書き出した作品を公開する方法を扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="A4（210×297ミリ）を300dpiで印刷するために必要なピクセル数は？"
              options={[
                { label: "210 × 297" },
                { label: "630 × 891" },
                { label: "2480 × 3508", correct: true },
                { label: "63000 × 89100" },
              ]}
              explanation="ピクセル数=ミリ ÷ 25.4 × dpiです。210 ÷ 25.4 × 300 = 2480、297 ÷ 25.4 × 300 = 3508になります。"
            />
            <Quiz
              question="切れ目なくくり返すGIFを作るために必要なことは？"
              options={[
                {
                  label:
                    "frameRate()を上げて、なるべく多くのフレームを記録する",
                },
                {
                  label:
                    "動きを周期のある式で書き、記録する長さを周期の整数倍にする",
                  correct: true,
                },
                { label: "saveGif()をdraw()の中で毎フレーム呼ぶ" },
                { label: "pixelDensity()を大きくする" },
              ]}
              explanation="最後のフレームの次が最初のフレームと同じ絵になっていれば、つなぎ目は見えません。sin(TWO_PI * t)のように1周で元に戻る式を使い、ちょうど1周ぶんを記録します。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "saveCanvas()はkeyPressed()の中で呼び、押したときだけ保存する",
                  "randomSeed()とnoiseSeed()に番号を渡し、その番号をファイル名に入れると、同じ絵を再現できる",
                  "保存される画像の大きさは、createCanvas()の数 × pixelDensity()で決まる",
                  "印刷に必要なピクセル数は、ミリ ÷ 25.4 × dpi。大きな絵はcreateGraphics()に描いて保存する",
                  "ループするGIFは、周期のある式で動きを書き、1周ぶんをsaveGif()で記録する",
                  "拡大に強い線の絵は、SVGで保存する（saveSVG()は試験的な機能）",
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
                  title: "p5.js Reference: saveCanvas()",
                  url: "https://p5js.org/reference/p5/saveCanvas/",
                  description: "キャンバスを画像として保存する関数。使える形式",
                },
                {
                  title: "p5.js Reference: pixelDensity()",
                  url: "https://p5js.org/reference/p5/pixelDensity/",
                  description:
                    "ピクセルの倍率を決める関数。既定では画面の細かさに合わせる",
                },
                {
                  title: "p5.js Reference: saveGif()",
                  url: "https://p5js.org/reference/p5/saveGif/",
                  description:
                    "スケッチをGIFとして記録する関数と、そのオプション",
                },
                {
                  title: "p5.js Reference: saveFrames()",
                  url: "https://p5js.org/reference/p5/saveFrames/",
                  description: "連番の画像を保存する関数。長さと枚数の上限",
                },
                {
                  title: "p5.js Reference: saveSVG()",
                  url: "https://p5js.org/reference/p5/saveSVG/",
                  description: "描いた内容をSVGで保存する試験的な関数",
                },
                {
                  title: "MDN: MediaRecorder",
                  url: "https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder",
                  description: "映像や音声を録画・録音するブラウザ標準のAPI",
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
