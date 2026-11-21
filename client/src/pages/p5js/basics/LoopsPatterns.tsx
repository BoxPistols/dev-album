import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。円弧2本のタイルを向きだけ変えて敷き詰める。ときどき1マスが向きを替え、クリックで全体を作り直す
const HERO_SKETCH = `let size = 50;
let tiles = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  shuffleTiles();
}

function shuffleTiles() {
  // マスごとに、向きを0か1のどちらかに決めておく
  tiles = [];
  let count = (width / size) * (height / size);
  for (let k = 0; k < count; k++) {
    tiles.push(floor(random(2)));
  }
}

function draw() {
  background(42, 12, 95);

  // 太い帯を全マスに描いてから、その中央に地の色の細い線を重ねる
  drawTiles(17, true);
  drawTiles(5, false);

  // ときどき1マスだけ向きを替える
  if (frameCount % 40 === 0) {
    let k = floor(random(tiles.length));
    tiles[k] = 1 - tiles[k];
  }
}

function drawTiles(weight, colored) {
  let cols = width / size;
  let rows = height / size;
  strokeWeight(weight);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * size;
      let y = j * size;

      // 左上から右下へ向かって、色相を少しずつ進める
      if (colored) {
        stroke(195 + (i + j) * 9, 62, 62);
      } else {
        stroke(42, 12, 95);
      }

      if (tiles[j * cols + i] === 0) {
        // 左上の角と右下の角を中心にした円弧
        arc(x, y, size, size, 0, HALF_PI);
        arc(x + size, y + size, size, size, PI, PI + HALF_PI);
      } else {
        // 右上の角と左下の角を中心にした円弧
        arc(x + size, y, size, size, HALF_PI, PI);
        arc(x, y + size, size, size, PI + HALF_PI, TWO_PI);
      }
    }
  }
}

function mousePressed() {
  // クリックで全マスの向きを決め直す
  shuffleTiles();
}`;

const FOR_SKETCH = `function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(235, 40, 9);

  // iを0から11まで1ずつ増やしながら、中の処理を12回くり返す
  for (let i = 0; i < 12; i++) {
    let x = 40 + i * 47;
    fill(180 + i * 12, 65, 100);
    circle(x, 150, 10 + i * 4);
  }
}`;

const GRID_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(235, 40, 9);

  // 外側のループが行（縦）、内側のループが列（横）を進める
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 12; i++) {
      let x = 25 + i * 50;
      let y = 25 + j * 50;
      fill(160 + i * 14, 30 + j * 9, 100);
      circle(x, y, 34);
    }
  }
}`;

const IF_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(40, 12, 95);

  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 12; i++) {
      let x = 25 + i * 50;
      let y = 25 + j * 50;

      // 行と列の番号の合計が偶数のマスと奇数のマスで、描くものを変える
      if ((i + j) % 2 === 0) {
        fill(222, 55, 38);
        circle(x, y, 36);
      } else {
        fill(12, 70, 85);
        square(x, y, 14);
      }
    }
  }
}`;

const TENPRINT_SKETCH = `let size = 25;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // draw()を1回だけ実行して止める
  noLoop();
}

function draw() {
  background(232, 60, 28);
  stroke(205, 35, 100);
  strokeWeight(3);

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      // マスごとに、半分の確率で斜線の向きを選ぶ
      if (random() < 0.5) {
        line(x, y, x + size, y + size);
      } else {
        line(x, y + size, x + size, y);
      }
    }
  }
}

function mousePressed() {
  // クリックでdraw()をもう1回実行する
  redraw();
}`;

const TRIANGLE_SKETCH = `let size = 50;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  noLoop();
}

function draw() {
  background(40, 12, 95);
  fill(222, 55, 38);

  for (let y = 0; y < height; y += size) {
    for (let x = 0; x < width; x += size) {
      // 0・1・2・3のどれかを選び、直角の角をどこに置くかを決める
      let r = floor(random(4));
      if (r === 0) {
        triangle(x, y, x + size, y, x, y + size);
      } else if (r === 1) {
        triangle(x, y, x + size, y, x + size, y + size);
      } else if (r === 2) {
        triangle(x + size, y, x + size, y + size, x, y + size);
      } else {
        triangle(x, y, x, y + size, x + size, y + size);
      }
    }
  }
}

function mousePressed() {
  redraw();
}`;

const NOISE_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(240, 45, 8);

  for (let j = 0; j < 16; j++) {
    for (let i = 0; i < 24; i++) {
      let x = 12.5 + i * 25;
      let y = 12.5 + j * 25;

      // 大きさ: 隣のマスと近い値になる乱数noise()で決める
      let n = noise(i * 0.12, j * 0.12, frameCount * 0.008);
      let d = n * n * 60;

      // 色相: キャンバスの中心からの距離で決める
      let far = dist(x, y, width / 2, height / 2);
      fill(170 + far * 0.5, 65, 100);
      circle(x, y, d);
    }
  }
}`;

export default function LoopsPatterns() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 5</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          繰り返しとパターン
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          同じ命令を何十回、何百回とくり返すfor文を使い、図形を並べて模様を作ります。下の枠は完成形で、
          1種類のタイルを向きだけ変えて敷き詰めたポスターです。ときどき1マスが向きを替え、線のつながり方が変わります。
          クリックすると全体が作り直されます。
        </p>

        <CodePreview
          title="円弧のタイルのポスター（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          1マスに描いているのは円弧2本だけです。向きは2通りしかありませんが、並べると線がつながり、
          輪や長い曲線が現れます。気に入った並びになったら、枠の下の「PNG保存」で残せます。
        </p>

        <WhyNowBox
          title="なぜ繰り返しを学ぶのか"
          tags={["for", "二重ループ", "if", "random()", "noLoop()"]}
        >
          <p>
            円を100個描くために、circle()を100行書く必要はありません。「くり返す回数」と「1回ごとに変える量」を書けば、
            残りはコンピュータが実行します。少ない決まりから、人の手では描ききれない量の絵が出てくることが、
            コードで描くことの大きな特徴です。このページの題材である10
            PRINTとTruchetタイルは、その代表例として広く知られています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              for文で横に並べる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={code}>
                for (let i = 0; i &lt; 12; i++) {"{ ... }"}
              </code>
              は、波かっこの中を12回くり返します。かっこの中は「iを0から始める」「iが12未満のあいだ続ける」「1回終わるごとにiを1増やす」の3つです。
              iは0, 1, 2, …,
              11と変わっていくので、位置や大きさや色の計算にiを使うと、1回ごとに違う図形になります。
            </p>
            <CodePreview
              title="12個の円を並べる"
              language="js"
              code={FOR_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>10 + i * 4</code>を
                  <code className={code}>54 - i * 4</code>
                  にする（右へ行くほど小さくなる）
                </li>
                <li>
                  <code className={code}>i &lt; 12</code>を
                  <code className={code}>i &lt; 40</code>に、
                  <code className={code}>40 + i * 47</code>を
                  <code className={code}>40 + i * 13</code>
                  にする（円が重なり、筒のような形になる）
                </li>
                <li>
                  <code className={code}>circle(x, 150, 10 + i * 4)</code>
                  の150を<code className={code}>150 + i * 8</code>
                  にする（右下がりに並ぶ）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              二重ループでグリッドを作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              for文の中にfor文を入れると、縦と横に並んだ格子（グリッド）になります。外側のループが1回進むあいだに、内側のループが最初から最後まで回ります。
              下のスケッチでは、外側のjが行の番号、内側のiが列の番号です。8行×12列で、円は96個描かれます。
            </p>
            <CodePreview
              title="8行12列のグリッド"
              language="js"
              code={GRID_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              位置の式<code className={code}>25 + i * 50</code>
              は、「最初の円の中心が25、そこから50ずつ右へ」という意味です。マスの幅が50なので、その半分の25が最初の中心になります。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>circle(x, y, 34)</code>
                  の34を70にする（隣どうしが重なり、別の模様に見える）
                </li>
                <li>
                  <code className={code}>circle(x, y, 34)</code>を
                  <code className={code}>circle(x, y, 6 + i * 3 + j * 2)</code>
                  にする（右下へ行くほど大きくなる）
                </li>
                <li>
                  <code className={code}>
                    fill(160 + i * 14, 30 + j * 9, 100)
                  </code>
                  の<code className={code}>i * 14</code>を
                  <code className={code}>(i + j) * 10</code>
                  にする（色が斜めの縞になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              条件分岐でマスごとに描き分ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ループの中にif文を置くと、マスの番号によって描くものを変えられます。
              <code className={code}>(i + j) % 2 === 0</code>
              は「行と列の番号の合計を2で割った余りが0」、つまり合計が偶数という条件です。偶数のマスと奇数のマスは市松模様に並びます。
            </p>
            <CodePreview
              title="市松に並ぶ円と四角"
              language="js"
              code={IF_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>(i + j) % 2 === 0</code>を
                  <code className={code}>(i + j) % 3 === 0</code>
                  にする（円が斜めの列に並ぶ）
                </li>
                <li>
                  <code className={code}>(i + j) % 2 === 0</code>を
                  <code className={code}>i % 2 === 0</code>
                  にする（縦の縞になる）
                </li>
                <li>
                  <code className={code}>(i + j) % 2 === 0</code>を
                  <code className={code}>(i * j) % 3 === 0</code>
                  にする（格子状の模様になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              10 PRINT: 斜線を乱数で選ぶ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              マスごとに「右下がりの斜線」か「右上がりの斜線」かを乱数で選ぶだけで、迷路のような模様になります。この模様は、
              家庭用コンピュータCommodore
              64のBASICで書かれた1行のプログラム
              <code className={code}>
                10 PRINT CHR$(205.5+RND(1)); : GOTO 10
              </code>
              で知られています。このプログラムだけを題材にした同名の書籍が、Nick
              Montfortら10人の共著で2012年にMIT
              Pressから出版されています。下のスケッチは、同じ考え方をp5.jsで書いたものです。クリックすると作り直されます。
            </p>
            <CodePreview
              title="10 PRINTの迷路"
              language="js"
              code={TENPRINT_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={code}>random()</code>
              は、呼ぶたびに0以上1未満のばらばらな数を返します。
              <code className={code}>random() &lt; 0.5</code>
              は、およそ半分の確率で成り立つ条件になります。
            </p>
            <InfoBox type="warning" title="random()は呼ぶたびに違う数を返す">
              <p>
                draw()はくり返し呼ばれるので、その中でrandom()を使うと、フレームごとに違う絵になり、模様が激しくちらつきます。
                止まった絵にしたいときは、setup()で
                <code className={code}>noLoop()</code>
                を呼んでdraw()を1回で止め、描き直したいときだけ
                <code className={code}>redraw()</code>
                を呼びます。同じ理由で、このスケッチは開き直すたびに違う模様になります。毎回同じ模様にする方法は
                <Link
                  href="/p5js/random/randomness"
                  className="text-primary underline"
                >
                  乱数と確率
                </Link>
                のページで扱います。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>random() &lt; 0.5</code>
                  の0.5を0.85にする（片方の向きが増え、斜めの縞が目立つ）
                </li>
                <li>
                  <code className={code}>let size = 25</code>
                  を10にする（細かい織物のような模様になる）。50にする（大きな迷路になる）
                </li>
                <li>
                  <code className={code}>strokeWeight(3)</code>
                  を12にする（線と地の面積が近づき、どちらが図か分かりにくくなる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Truchetタイル: 向きだけを変える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              回転すると見た目が変わる正方形のタイルを、向きを変えながら敷き詰めた模様をTruchetタイルと呼びます。
              Sébastien
              Truchetが1704年の論考で、対角線で2色に塗り分けた正方形のタイルの並べ方を調べたことに由来します。
              このタイルの向きは4通りあります。下のスケッチは、マスごとに4通りのどれかを乱数で選んでいます。
            </p>
            <CodePreview
              title="三角形のTruchetタイル"
              language="js"
              code={TRIANGLE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              冒頭のポスターは、もう1つのよく知られた形です。正方形の向かい合う2つの角を中心に、一辺の半分の半径の円弧を1本ずつ描いたタイルで、
              Cyril Stanley
              Smithが1987年に示しました。向きは2通りです。円弧の端が必ず辺の中点に来るので、どの向きで並べても隣のタイルと線がつながります。
              10
              PRINTの斜線も、向きが2通りのタイルを並べたものと見ることができます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>floor(random(4))</code>を
                  <code className={code}>floor(random(2))</code>
                  にする（向きが2通りに減り、模様の印象が変わる）
                </li>
                <li>
                  <code className={code}>let r = floor(random(4))</code>を
                  <code className={code}>
                    let r = (x / size + y / size) % 4
                  </code>
                  にする（乱数をやめ、決まった順で並べる。規則的な模様になる）
                </li>
                <li>
                  <code className={code}>let size = 50</code>
                  を20にする（細かい模様になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              位置から大きさと色を決める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              マスごとの大きさや色を、そのマスの位置から計算で決めると、グリッド全体になめらかな変化が生まれます。
              下のスケッチは、色相を中心からの距離（前のページのdist()）で、大きさを
              <code className={code}>noise()</code>
              で決めています。noise()は0から1の数を返す乱数の一種で、
              近い値を渡すと近い値が返ります。random()のようにばらばらにはならず、隣のマスと少しだけ違う値になります。
              3つ目の値にframeCountを使っているので、時間とともにゆっくり変わります。
            </p>
            <CodePreview
              title="noiseで波打つグリッド"
              language="js"
              code={NOISE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              noise()の使い方は
              <Link
                href="/p5js/random/noise"
                className="text-primary underline"
              >
                ノイズ
              </Link>
              のページで詳しく扱います。ここでは「渡す値の刻みが小さいほど、なだらかに変わる」ことを数字で確かめてください。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>i * 0.12</code>と
                  <code className={code}>j * 0.12</code>
                  の0.12を0.03にする（大きなうねりになる）。0.8にする（ばらばらに近づく）
                </li>
                <li>
                  <code className={code}>frameCount * 0.008</code>
                  の0.008を0.05にする（変化が速くなる）
                </li>
                <li>
                  <code className={code}>circle(x, y, d)</code>を
                  <code className={code}>square(x, y, d)</code>
                  に替え、setup()に
                  <code className={code}>rectMode(CENTER)</code>
                  を足す
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="グリッドに並べる"
              description="___ を埋めて、円が6行8列に並ぶようにしてください。列の番号はi、行の番号はjです。埋めるとプレビューが動きます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(235, 40, 9);
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 8; i++) {
      let x = 25 + ___;
      let y = 25 + ___;
      fill(180 + i * 15, 60, 100);
      circle(x, y, 30);
    }
  }
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(235, 40, 9);
  for (let j = 0; j < 6; j++) {
    for (let i = 0; i < 8; i++) {
      let x = 25 + i * 50;
      let y = 25 + j * 50;
      fill(180 + i * 15, 60, 100);
      circle(x, y, 30);
    }
  }
}`}
              keywords={["i * 50", "j * 50"]}
              hints={[
                "横の位置は列の番号iで決まります。マスの幅は50なので、i * 50と書きます",
                "縦の位置は行の番号jで決まります。マスの高さも50なので、j * 50と書きます",
              ]}
            />
            <CodingChallenge
              title="クリックで作り直す迷路"
              description="___ を埋めて、マスごとに半分の確率で斜線の向きが変わり、クリックで模様が作り直されるようにしてください。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  noLoop();
}

function draw() {
  background(34, 40, 90);
  stroke(250, 220, 160);
  strokeWeight(3);
  for (let y = 0; y < height; y += 25) {
    for (let x = 0; x < width; x += 25) {
      if (___() < 0.5) {
        line(x, y, x + 25, y + 25);
      } else {
        line(x, y + 25, x + 25, y);
      }
    }
  }
}

function mousePressed() {
  ___();
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  noLoop();
}

function draw() {
  background(34, 40, 90);
  stroke(250, 220, 160);
  strokeWeight(3);
  for (let y = 0; y < height; y += 25) {
    for (let x = 0; x < width; x += 25) {
      if (random() < 0.5) {
        line(x, y, x + 25, y + 25);
      } else {
        line(x, y + 25, x + 25, y);
      }
    }
  }
}

function mousePressed() {
  redraw();
}`}
              keywords={["random", "redraw"]}
              hints={[
                "0以上1未満のばらばらな数を返す関数randomを書きます。0.5より小さいかどうかで、向きを半々に分けます",
                "noLoop()で止めたdraw()をもう1回だけ実行する関数redrawを書きます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭のポスターは、タイルの大きさ・線の太さ・配色の3つで印象が決まります。クリックして並びを選び、PNGで保存すれば、そのまま1枚の作品になります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>let size = 50</code>
                を100にし、<code className={code}>drawTiles(17, true)</code>を
                <code className={code}>drawTiles(40, true)</code>に、
                <code className={code}>drawTiles(5, false)</code>を
                <code className={code}>drawTiles(14, false)</code>
                にする。大柄で力強いポスターになる
              </li>
              <li>
                <code className={code}>drawTiles(5, false);</code>
                の行を消す。帯が1色の太い線になる
              </li>
              <li>
                <code className={code}>195 + (i + j) * 9</code>を
                <code className={code}>20 + j * 4</code>
                にする。橙から黄へ、上から下に変わる配色になる
              </li>
              <li>
                <code className={code}>background(42, 12, 95)</code>と
                <code className={code}>stroke(42, 12, 95)</code>を
                <code className={code}>(240, 45, 10)</code>
                に、帯の彩度と明るさを<code className={code}>62, 62</code>
                から<code className={code}>60, 100</code>
                にする。暗い地に発色のよい線の、夜の配色になる
              </li>
              <li>
                <code className={code}>floor(random(2))</code>を
                <code className={code}>(k % 3 === 0) ? 1 : 0</code>
                にする。乱数をやめて規則で並べた模様になる
              </li>
            </ul>
            <InfoBox type="success" title="規則と偶然の割合を決める">
              <p>
                すべてを規則で決めると整った模様に、すべてを乱数で決めるとざらついた模様になります。
                「向きは乱数、色は位置から計算」のように、どこを規則にしてどこを偶然に任せるかを決めることが、
                パターンの作品づくりの中心になります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="外側のfor文が5回、内側のfor文が8回くり返すとき、内側の波かっこの中は合計で何回実行される？"
              options={[
                { label: "8回" },
                { label: "13回" },
                { label: "40回", correct: true },
                { label: "5回" },
              ]}
              explanation="外側が1回進むあいだに、内側は8回すべて回ります。それが5回くり返されるので、5×8で40回です。"
            />
            <Quiz
              question="draw()の中でrandom()を使って模様を描いたら、模様が激しくちらついた。止まった絵にするには？"
              options={[
                { label: "for文の回数を減らす" },
                {
                  label: "setup()でnoLoop()を呼び、draw()を1回で止める",
                  correct: true,
                },
                { label: "background()を消す" },
                { label: "random()をdist()に置き換える" },
              ]}
              explanation="draw()はくり返し呼ばれ、random()は呼ぶたびに違う数を返すので、フレームごとに違う絵になります。noLoop()でdraw()を1回で止めると絵が止まり、redraw()で好きなときに描き直せます。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "for文は、変数を少しずつ変えながら同じ処理をくり返す。二重にするとグリッドになる",
                  "ループの中のif文で、マスの番号に応じて描くものを変えられる",
                  "10 PRINTは、マスごとに2通りの斜線を乱数で選ぶだけで迷路のような模様になる",
                  "Truchetタイルは、1種類のタイルを向きだけ変えて敷き詰める模様",
                  "random()を使う止まった絵はnoLoop()で止め、redraw()で作り直す",
                  "位置から計算した距離やnoise()で大きさや色を決めると、なめらかな変化になる",
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
                  title: "p5.js Tutorials: Repeating with Loops",
                  url: "https://p5js.org/tutorials/repeating-with-loops/",
                  description: "for文でくり返し描く公式チュートリアル",
                },
                {
                  title: "p5.js Reference: noLoop()",
                  url: "https://p5js.org/reference/p5/noLoop/",
                  description: "draw()のくり返しを止める関数",
                },
                {
                  title: "p5.js Reference: random()",
                  url: "https://p5js.org/reference/p5/random/",
                  description: "乱数を返す関数。引数による範囲の決め方",
                },
                {
                  title: "Wikipedia: Truchet tiling",
                  url: "https://en.wikipedia.org/wiki/Truchet_tiling",
                  description:
                    "Truchetタイルの由来と種類。斜線のタイルと10 PRINTの関係にも触れている",
                },
                {
                  title: "Wolfram MathWorld: Truchet Tiling",
                  url: "https://mathworld.wolfram.com/TruchetTiling.html",
                  description:
                    "1704年のTruchetのタイルと、円弧2本のタイルの定義",
                },
                {
                  title: "The Coding Train: 10Print",
                  url: "https://thecodingtrain.com/challenges/76-10print",
                  description:
                    "10 PRINTをp5.jsで書く過程を追える動画。書籍『10 PRINT』への案内もある",
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
