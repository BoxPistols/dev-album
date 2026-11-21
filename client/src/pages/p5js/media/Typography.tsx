import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。文字を画素として調べ、粒の行き先にする
const HERO_SKETCH = `let pg;             // 文字を描いておく、見えないキャンバス
let particles = []; // 文字の形に集まる粒
let field;          // 文字を打ち替える入力欄

function setup() {
  createCanvas(600, 400);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  pg = createGraphics(600, 400);
  for (let i = 0; i < 1800; i++) {
    particles.push({ x: random(width), y: random(height), vx: 0, vy: 0, tx: 300, ty: 200 });
  }
  // ここに打った文字が、粒の集まる形になる
  field = createInput('ことば');
  field.input(makeTargets);
  makeTargets();
}

// 文字を見えないキャンバスに描き、白い画素の位置を粒の行き先にする
function makeTargets() {
  let word = field.value();
  pg.background(0);
  pg.fill(255);
  pg.textFont('sans-serif');
  pg.textStyle(BOLD);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(180);
  // 幅に収まらないときは文字を小さくする
  if (pg.textWidth(word) > 540) {
    pg.textSize(180 * 540 / pg.textWidth(word));
  }
  pg.text(word, 300, 200);

  pg.loadPixels();
  let points = [];
  for (let y = 0; y < pg.height; y += 4) {
    for (let x = 0; x < pg.width; x += 4) {
      if (pg.pixels[(y * pg.width + x) * 4] > 128) {
        // 格子が目立たないよう、少しずらして覚える
        points.push({ x: x + random(-2, 2), y: y + random(-2, 2) });
      }
    }
  }
  points = shuffle(points);
  for (let i = 0; i < particles.length; i++) {
    let p = points.length > 0 ? points[i % points.length] : { x: 300, y: 200 };
    particles[i].tx = p.x;
    particles[i].ty = p.y;
  }
}

function draw() {
  // 半透明で塗り重ねて、粒の残像を残す
  background(245, 45, 9, 28);
  noStroke();

  // ときどき粒を散らす。散ったあと、また文字に戻ってくる
  let burst = frameCount % 420 === 300;

  for (let p of particles) {
    if (burst) {
      p.vx = random(-14, 14);
      p.vy = random(-14, 14);
    }
    // 行き先へ引き寄せる力
    p.vx += (p.tx - p.x) * 0.012;
    p.vy += (p.ty - p.y) * 0.012;
    // マウスが近いと押しのける
    let d = dist(mouseX, mouseY, p.x, p.y);
    if (d < 70 && d > 0) {
      p.vx += (p.x - mouseX) / d * 1.6;
      p.vy += (p.y - mouseY) / d * 1.6;
    }
    p.vx *= 0.9;
    p.vy *= 0.9;
    p.x += p.vx;
    p.y += p.vy;

    // 行き先の横位置で色相を変える
    fill(map(p.tx, 0, width, 175, 330), 65, 100, 85);
    circle(p.x, p.y, 3.4);
  }
}`;

// text()と書体・揃え方
const BASICS_SKETCH = `function setup() {
  createCanvas(480, 360);
}

function draw() {
  background(244, 240, 230);

  // 揃える基準になる縦線（x = 240）
  stroke(220, 90, 60);
  strokeWeight(1);
  line(240, 20, 240, 340);
  noStroke();
  fill(34, 30, 48);

  // textFont(名前) で書体、textSize(大きさ) で大きさを決める
  textFont('serif');
  textSize(40);
  // textAlign(横, 縦) で、指定した点を文字のどこに合わせるかを決める
  textAlign(LEFT, BASELINE);
  text('文字（serif）', 240, 90);

  textFont('sans-serif');
  textAlign(CENTER, BASELINE);
  text('文字（sans）', 240, 180);

  textFont('monospace');
  textAlign(RIGHT, BASELINE);
  text('文字（mono）', 240, 270);

  // 説明の小さい文字
  textFont('sans-serif');
  textSize(14);
  fill(120, 110, 130);
  textAlign(LEFT, BASELINE);
  text('LEFT: 点が左端', 250, 112);
  textAlign(CENTER, BASELINE);
  text('CENTER: 点が中央', 240, 202);
  textAlign(RIGHT, BASELINE);
  text('RIGHT: 点が右端', 230, 292);
}`;

// 1文字ずつ置いて波打たせる
const WAVE_SKETCH = `let field;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100);
  textFont('sans-serif');
  textStyle(BOLD);
  textSize(54);
  textAlign(LEFT, CENTER);
  field = createInput('なみうつ文字・wave');
}

function draw() {
  background(235, 45, 12);
  let word = field.value();

  // 全体の幅を先に測り、中央に来るよう書き出しの位置を決める
  let x = (width - textWidth(word)) / 2;

  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    // 文字ごとに、少しずつ遅れたsinで上下させる
    let y = height / 2 + sin(frameCount * 0.05 - i * 0.5) * 40;
    fill((190 + i * 14) % 360, 60, 100);
    text(ch, x, y);
    // この文字の幅だけ右へ進む
    x += textWidth(ch);
  }
}`;

// 文字を円周に沿わせる
const CIRCLE_SKETCH = `let field;

function setup() {
  createCanvas(440, 440);
  colorMode(HSB, 360, 100, 100);
  textFont('serif');
  textAlign(CENTER, BASELINE);
  field = createInput('めぐる文字はどこまでもつづく・');
}

function draw() {
  background(28, 12, 95);
  let word = field.value();
  translate(width / 2, height / 2);

  // 半径の違う輪を3本、向きと速さを変えて回す
  for (let ring = 0; ring < 3; ring++) {
    let radius = 190 - ring * 58;
    let direction = ring % 2 === 0 ? 1 : -1;
    textSize(30 - ring * 6);
    fill(250 + ring * 50, 60, 45);

    for (let i = 0; i < word.length; i++) {
      // 1周を文字数で等分した角度に、時間で進む角度を足す
      let angle = TWO_PI * i / word.length + frameCount * 0.006 * direction;
      push();
      rotate(angle);
      // 回した先で上へ半径ぶん進み、そこに1文字置く
      translate(0, -radius);
      text(word[i], 0, 0);
      pop();
    }
  }
}`;

// 文字を画素として使うグリッド
const GRID_SKETCH = `// 画数の少ない字から多い字へ。濃さの段階として使う
let ramp = '　・一十木林森';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  textFont('sans-serif');
  textSize(19);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(150, 35, 10);
  let cell = 20;

  for (let y = 0; y < height / cell; y++) {
    for (let x = 0; x < width / cell; x++) {
      // その場所の濃さ（0〜1）。ノイズを時間で流す
      let v = noise(x * 0.13, y * 0.13, frameCount * 0.008);
      // 見やすいように差を広げる
      v = constrain(map(v, 0.25, 0.75, 0, 1), 0, 0.999);
      // 濃さを、何番目の字を使うかに変える
      let ch = ramp[floor(v * ramp.length)];
      fill(100 + v * 60, 55, 55 + v * 45);
      text(ch, x * cell + cell / 2, y * cell + cell / 2);
    }
  }
}`;

// 行ごとに流れて伸び縮みする文字
const KINETIC_SKETCH = `let field;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  textFont('sans-serif');
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  field = createInput('うごく ');
}

function draw() {
  background(350, 70, 92);
  let word = field.value();
  if (word.length === 0) return;

  let rows = 6;
  let rowHeight = height / rows;
  textSize(rowHeight * 0.9);
  // 入力した文字を、横幅が埋まるまで繰り返してつなぐ
  let unit = textWidth(word);
  let line = '';
  for (let i = 0; i < ceil(width / unit) + 2; i++) {
    line += word;
  }

  for (let r = 0; r < rows; r++) {
    // 行ごとに速さと向きを変えて横へ流す
    let speed = (r % 2 === 0 ? 1 : -1) * (0.6 + r * 0.25);
    let offset = (frameCount * speed) % unit;
    // 行の高さをsinで伸び縮みさせる
    let stretch = 0.6 + 0.4 * sin(frameCount * 0.03 + r * 0.9);

    push();
    translate(offset - unit, r * rowHeight + rowHeight / 2);
    scale(1, stretch);
    fill(r % 2 === 0 ? color(45, 15, 100) : color(260, 80, 25));
    text(line, 0, 0);
    pop();
  }
}`;

// 文字の形から点の位置を取り出す
const POINTS_SKETCH = `let pg;
let points = [];
let field;

function setup() {
  createCanvas(600, 300);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);
  pg = createGraphics(600, 300);
  field = createInput('点・dots');
  field.input(scan);
  scan();
}

// 文字を見えないキャンバスに描いて、白い画素の位置を集める
function scan() {
  pg.background(0);
  pg.fill(255);
  pg.textFont('serif');
  pg.textStyle(BOLD);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(150);
  pg.text(field.value(), 300, 150);

  pg.loadPixels();
  points = [];
  // 6画素おきに調べる。この数が点の細かさを決める
  let step = 6;
  for (let y = 0; y < pg.height; y += step) {
    for (let x = 0; x < pg.width; x += step) {
      let i = (y * pg.width + x) * 4;
      if (pg.pixels[i] > 128) {
        points.push({ x: x, y: y });
      }
    }
  }
}

function draw() {
  background(215, 50, 12);
  noStroke();
  for (let p of points) {
    // 点ごとの大きさを、ノイズでゆっくり変える
    let n = noise(p.x * 0.02, p.y * 0.02, frameCount * 0.02);
    fill(40 + n * 40, 70, 100, 90);
    circle(p.x, p.y, 2 + n * 8);
  }
}`;

export default function Typography() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 14</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          文字とタイポグラフィ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">文字も、図形と同じように位置・大きさ・色を決めて描けます。このページでは、文字を1文字ずつ動かす方法と、文字の形を点の集まりに変える方法を扱います。下の枠は、粒が集まって文字になる完成形です。枠の下の入力欄に好きな文字を打つと、その形に集まり直します。</p>

        <CodePreview title={"粒が集まって文字になる（このページの完成形）"} language="js" code={HERO_SKETCH} />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">粒は数秒ごとに散り、また文字に戻ります。マウスを近づけると粒が逃げます。ひらがな・漢字・英数字のどれでも打てます。</p>

        <WhyNowBox title={"なぜ文字を素材にするのか"} tags={["text()", "textAlign()", "textWidth()", "createInput()"]}>
          <p>文字は読むための記号であり、同時に形でもあります。ここまでに学んだ座標変換・sin・ノイズ・パーティクルを文字に当てはめると、自分の名前や好きなことばが、そのまま作品の素材になります。</p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              text()で文字を置く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed"><code className={code}>text(文字, x, y)</code>で文字を描きます。色は<code className={code}>fill()</code>、大きさは<code className={code}>textSize()</code>、書体は<code className={code}>textFont()</code>で決めます。<code className={code}>textAlign()</code>は、指定した点を文字の左端・中央・右端のどこに合わせるかを決めます。下のスケッチでは、3行とも同じx座標（縦線の位置）を指定しています。</p>
            <CodePreview title={"書体と揃え方"} language="js" code={BASICS_SKETCH} />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">textFont()に渡す名前</th>
                    <th scope="col" className="text-left p-3 font-semibold">選ばれる書体</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">'serif'</th>
                    <td className="p-3">線の端に飾りのある書体。日本語では明朝体の仲間</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">'sans-serif'</th>
                    <td className="p-3">飾りのない書体。日本語ではゴシック体の仲間</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-mono font-normal">'monospace'</th>
                    <td className="p-3">英数字の幅がすべて同じ書体（等幅）</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title={"仕様の書体名と、実際に表示される書体"}>
              <p>仕様では、<code className={code}>textFont('serif')</code>は「飾りのある書体」という種類を指定するだけです。実測では、同じスケッチでもWindows・macOS・スマートフォンで違う書体が表示されます。'serif'などは総称の名前で、その端末に入っている書体の中からブラウザが1つを選ぶからです。</p>
              <p>どの端末でも同じ書体にしたいときは、フォントファイルを用意して<code className={code}>loadFont()</code>で読み込みます。このマニュアルのプレビューは外部のファイルを読めないので、総称の名前だけを使っています。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              textWidth()で1文字ずつ置く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">文字列をまとめて描くと、全体が1つの塊として動きます。1文字ずつ別々に動かすには、for文で1文字ずつ<code className={code}>text()</code>を呼び、<code className={code}>textWidth(文字)</code>で測った幅だけ右へ進みます。<code className={code}>word[i]</code>は、文字列のi番目の1文字です。入力欄の文字を打ち替えて試せます。</p>
            <CodePreview title={"波打つ文字"} language="js" code={WAVE_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>i * 0.5</code>を<code className={code}>i * 1.5</code>にする（隣の文字との遅れが大きくなり、波が細かくなる）</li>
                <li><code className={code}>* 40</code>を<code className={code}>* 100</code>にする（上下の幅が大きくなる）</li>
                <li><code className={code}>(190 + i * 14) % 360</code>を<code className={code}>(frameCount + i * 14) % 360</code>にする（色が流れる）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              文字を円周に沿わせる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed"><Link href="/p5js/basics/transform" className="text-primary underline">座標変換</Link>のページの<code className={code}>rotate()</code>と<code className={code}>translate()</code>を1文字ごとに使うと、文字を円周に並べられます。1周（<code className={code}>TWO_PI</code>）を文字数で割った角度ずつ回し、回した先で半径のぶん上へ進んでから、そこに1文字置きます。</p>
            <CodePreview title={"回る文字の輪"} language="js" code={CIRCLE_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">入力欄の文を長くすると文字の間隔が詰まり、短くすると広がります。1周を文字数で等分しているからです。</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              文字を画素として使う
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">画面をマス目に区切り、マスごとに1文字を置きます。どの文字を置くかをその場所の「濃さ」で決めると、文字が画素の役目をします。下のスケッチは、画数の少ない字から多い字へ並べた「・一十木林森」を濃さの段階として使い、ノイズの値で字を選んでいます。</p>
            <CodePreview title={"文字のグリッド"} language="js" code={GRID_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">濃さをノイズの代わりに画像やカメラの明るさから取ると、文字で描いた写真や映像になります。<Link href="/p5js/media/camera" className="text-primary underline">カメラ</Link>のページで実際に作ります。</p>
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li>1行目の<code className={code}>ramp</code>を、自分で選んだ字の並びに替える（薄い字から濃い字の順に並べる）</li>
                <li><code className={code}>x * 0.13</code>と<code className={code}>y * 0.13</code>を<code className={code}>0.04</code>にする（模様が大きくなる）</li>
                <li><code className={code}>frameCount * 0.008</code>を<code className={code}>frameCount * 0.03</code>にする（模様の変化が速くなる）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              キネティックタイポグラフィ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">文字を動かして見せる表現は、キネティックタイポグラフィと呼ばれます。下のスケッチは、入力した文字を横に繰り返してつなぎ、行ごとに速さと向きを変えて流しながら、<code className={code}>scale()</code>で行の高さを伸び縮みさせています。</p>
            <CodePreview title={"流れる文字"} language="js" code={KINETIC_SKETCH} />
            <InfoBox type="info" title={"数字を変えてみる"}>
              <ul className="list-disc pl-5 space-y-1">
                <li><code className={code}>let rows = 6</code>を<code className={code}>12</code>にする（行が細くなり、縞模様に近づく）</li>
                <li><code className={code}>scale(1, stretch)</code>を<code className={code}>scale(stretch, 1)</code>にする（横に伸び縮みする）</li>
                <li><code className={code}>background(350, 70, 92)</code>と2つの<code className={code}>color(...)</code>を替えて、3色の組み合わせを作る</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              文字の形から点を取り出す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">冒頭の作品の仕組みです。文字を<code className={code}>createGraphics()</code>の見えないキャンバスに白で描き、<Link href="/p5js/media/image-pixels" className="text-primary underline">前のページ</Link>の<code className={code}>loadPixels()</code>で画素を調べて、白い画素の位置を配列に集めます。集めた位置に点を置けば、文字の形をした点の集まりになります。</p>
            <CodePreview title={"文字を点にする"} language="js" code={POINTS_SKETCH} />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">冒頭の作品は、この点の位置を粒の「行き先」として配り、粒をそこへ引き寄せています。</p>
            <InfoBox type="info" title={"textToPoints()との違い"}>
              <p>p5.jsには、文字の輪郭を点の列で返す<code className={code}>textToPoints()</code>もあります。これは<code className={code}>loadFont()</code>で読み込んだフォント（p5.Font）が持つ機能なので、フォントファイルが必要です。画素を調べる方法はフォントファイルが要らず、端末に入っているどの書体でも、日本語の文字でも同じように使えます。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title={"文字を波打たせる"}
              description={"___ を埋めて、文字が1文字ずつ上下に揺れながら、重ならずに横へ並ぶようにしてください。"}
              preview
              initialCode={`function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100);
  textFont('sans-serif');
  textStyle(BOLD);
  textSize(48);
  textAlign(LEFT, CENTER);
}

function draw() {
  background(235, 45, 12);
  let word = 'ゆれる文字';
  let x = 180;

  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    // 文字ごとに少しずつ遅れて上下する
    let y = height / 2 + ___(frameCount * 0.05 - i * 0.6) * 30;
    fill(190 + i * 30, 60, 100);
    text(ch, x, y);
    // この文字の幅だけ右へ進む
    x += ___(ch);
  }
}`}
              answer={`function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100);
  textFont('sans-serif');
  textStyle(BOLD);
  textSize(48);
  textAlign(LEFT, CENTER);
}

function draw() {
  background(235, 45, 12);
  let word = 'ゆれる文字';
  let x = 180;

  for (let i = 0; i < word.length; i++) {
    let ch = word[i];
    // 文字ごとに少しずつ遅れて上下する
    let y = height / 2 + sin(frameCount * 0.05 - i * 0.6) * 30;
    fill(190 + i * 30, 60, 100);
    text(ch, x, y);
    // この文字の幅だけ右へ進む
    x += textWidth(ch);
  }
}`}
              keywords={["sin", "textWidth"]}
              hints={[
                "上下に行き来する値を作る関数はsinです。sin(...)は-1から1のあいだを往復します",
                "文字の幅を測る関数はtextWidthです。textWidth(ch)のぶんだけxを進めます",
              ]}
            />
            <CodingChallenge
              title={"文字を星の点にする"}
              description={"___ を埋めて、文字の形に並んだ点がまたたくようにしてください。"}
              preview
              initialCode={`let pg;
let points = [];

function setup() {
  createCanvas(600, 300);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);
  // 見えないキャンバスに、白い文字を描く
  pg = createGraphics(600, 300);
  pg.background(0);
  pg.fill(255);
  pg.textStyle(BOLD);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(170);
  pg.text('星', 300, 150);

  // 画素を調べられるようにする
  pg.___();
  for (let y = 0; y < pg.height; y += 7) {
    for (let x = 0; x < pg.width; x += 7) {
      let i = (y * pg.width + x) * 4;
      // 白い画素の位置だけを配列に足す
      if (pg.pixels[i] > 128) {
        points.___({ x: x, y: y });
      }
    }
  }
}

function draw() {
  background(240, 50, 10);
  noStroke();
  for (let p of points) {
    // 点ごとにずれたタイミングで、明るさを変える
    let twinkle = 60 + 40 * sin(frameCount * 0.05 + p.x * 0.1 + p.y * 0.07);
    fill(50, 50, twinkle);
    circle(p.x, p.y, 5);
  }
}`}
              answer={`let pg;
let points = [];

function setup() {
  createCanvas(600, 300);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100);
  // 見えないキャンバスに、白い文字を描く
  pg = createGraphics(600, 300);
  pg.background(0);
  pg.fill(255);
  pg.textStyle(BOLD);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(170);
  pg.text('星', 300, 150);

  // 画素を調べられるようにする
  pg.loadPixels();
  for (let y = 0; y < pg.height; y += 7) {
    for (let x = 0; x < pg.width; x += 7) {
      let i = (y * pg.width + x) * 4;
      // 白い画素の位置だけを配列に足す
      if (pg.pixels[i] > 128) {
        points.push({ x: x, y: y });
      }
    }
  }
}

function draw() {
  background(240, 50, 10);
  noStroke();
  for (let p of points) {
    // 点ごとにずれたタイミングで、明るさを変える
    let twinkle = 60 + 40 * sin(frameCount * 0.05 + p.x * 0.1 + p.y * 0.07);
    fill(50, 50, twinkle);
    circle(p.x, p.y, 5);
  }
}`}
              keywords={["loadPixels", "push"]}
              hints={[
                "pixels配列を使う前に呼ぶ関数はloadPixelsです。pg.loadPixels()と書きます",
                "配列の末尾に要素を足すのはpushです。points.push(...)で位置を覚えます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">自分の名前や好きなことばを素材に、1枚の作品にします。</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>冒頭の粒の入力欄に自分の名前を打ち、<code className={code}>i &lt; 1800</code>の粒の数と<code className={code}>0.012</code>（引き寄せる強さ）を変えて、集まり方を好みに合わせる</li>
              <li>冒頭の<code className={code}>circle(p.x, p.y, 3.4)</code>を<code className={code}>text('*', p.x, p.y)</code>に替える。文字でできた文字になる</li>
              <li>文字の輪に、自分で書いた短い文を入れる。<code className={code}>ring &lt; 3</code>を増やすと輪が増える</li>
              <li>流れる文字の配色と行数を決めて、ポスターにする</li>
              <li>文字のグリッドの<code className={code}>ramp</code>を、名前に含まれる字だけで作る</li>
            </ul>
            <InfoBox type="success" title={"画像にして残す"}>
              <p>気に入った瞬間に、枠の下の「一時停止」で止めてから「PNG保存」を押すと、その1枚を画像にできます。大きく印刷するための書き出しは<Link href="/p5js/publish/export" className="text-primary underline">書き出す</Link>のページで扱います。</p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question={"1文字ずつtext()で描くとき、次の文字を置く位置はどう決める？"}
              options={[
                { label: "毎回、同じ数だけ右へ進む" },
                { label: "textWidth()でいまの文字の幅を測り、そのぶん右へ進む", correct: true },
                { label: "textSize()の値をそのまま足す" },
                { label: "textAlign(CENTER)にすれば自動で並ぶ" },
              ]}
              explanation={"文字の幅は字によって違います（「i」と「W」、ひらがなと英数字など）。textWidth()で1文字ずつ幅を測って進むと、重ならずに並びます。"}
            />
            <Quiz
              question={"textFont('serif')と書いたスケッチを別の端末で開いたら、違う書体で表示された。理由は？"}
              options={[
                { label: "'serif'は総称の名前で、端末に入っている書体からブラウザが選ぶから", correct: true },
                { label: "p5.jsの不具合だから" },
                { label: "textSize()を指定していないから" },
                { label: "キャンバスの大きさが違うから" },
              ]}
              explanation={"'serif'・'sans-serif'・'monospace'は書体の種類を表す総称です。実際に使われる書体は端末ごとに違います。同じ書体に揃えるには、フォントファイルをloadFont()で読み込みます。"}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "text(文字, x, y)で描く。fill()・textSize()・textFont()・textAlign()で見た目と基準点を決める",
                  "'serif'などの総称の名前は、端末によって違う書体になる",
                  "for文とtextWidth()で1文字ずつ置くと、文字ごとに動き・色・向きを変えられる",
                  "マス目に文字を置き、濃さで字を選ぶと、文字が画素の役目をする",
                  "文字を見えないキャンバスに描いて画素を調べると、文字の形を点の位置として取り出せる",
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
                  title: "p5.js Reference: text()",
                  url: "https://p5js.org/reference/p5/text/",
                  description: "文字を描く関数の仕様",
                },
                {
                  title: "p5.js Reference: textFont()",
                  url: "https://p5js.org/reference/p5/textFont/",
                  description: "書体の指定。端末の書体名と、読み込んだフォントの両方を受け取る",
                },
                {
                  title: "p5.js Reference: textWidth()",
                  url: "https://p5js.org/reference/p5/textWidth/",
                  description: "文字列の幅を測る関数",
                },
                {
                  title: "p5.js Reference: textAlign()",
                  url: "https://p5js.org/reference/p5/textAlign/",
                  description: "横と縦の揃え方",
                },
                {
                  title: "p5.js Reference: p5.Font textToPoints()",
                  url: "https://p5js.org/reference/p5.Font/textToPoints/",
                  description: "読み込んだフォントから、文字の輪郭の点を得る方法",
                },
                {
                  title: "MDN: font-family",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-family",
                  description: "serif・sans-serif・monospaceなど、総称の書体名の説明（英語）",
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
