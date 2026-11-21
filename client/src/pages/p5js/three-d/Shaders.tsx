import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";
const h2 = "text-3xl font-bold text-foreground mb-6";
const para = "text-muted-foreground mb-4 leading-relaxed";

// このページの完成形。noiseの地形の上を飛び続ける。ドラッグで視点を変えられる
const HERO_SKETCH = `// 格子の数を増やすほど細かくなるが、線を引く処理が重くなる（線の数は格子の数に比例する）
let cols = 34;
let rows = 25;
let cell = 31;
let fly = 0;
let heights = [];

function setup() {
  createCanvas(600, 400, WEBGL);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(255, 60, 7);
  orbitControl();
  // noiseに渡す位置を毎フレームずらす。地形の上を飛んでいるように見える
  fly -= 0.03;

  // 地形を奥へ寝かせて、見下ろす角度にする
  rotateX(1.15);
  translate(-cols * cell / 2, -rows * cell / 2 - 35, -110);

  // 各頂点の高さは、帯を2本描くときに2回ずつ使う。先にまとめて1回だけ計算しておく
  for (let y = 0; y < rows; y++) {
    heights[y] = [];
    for (let x = 0; x < cols; x++) {
      heights[y][x] = elevation(x, y);
    }
  }

  strokeWeight(1);
  for (let y = 0; y < rows - 1; y++) {
    // 手前の行ほど明るい線にする
    let near = y / rows;
    stroke(lerp(285, 185, near), 65, lerp(30, 100, near));
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      // この行の頂点と、1つ手前の行の頂点を交互に置く
      let a = heights[y][x];
      // 頂点ごとにfill()を呼ぶと、頂点のあいだは色が混ざる
      fill(lerp(255, 325, a), 70, lerp(8, 55, a) * near);
      vertex(x * cell, y * cell, a * 130);
      let b = heights[y + 1][x];
      fill(lerp(255, 325, b), 70, lerp(8, 55, b) * near);
      vertex(x * cell, (y + 1) * cell, b * 130);
    }
    endShape();
  }
}

// 格子の位置(x, y)の高さを0〜1で返す
function elevation(x, y) {
  let n = noise(x * 0.14, y * 0.14 + fly);
  return map(n, 0.25, 0.75, 0, 1, true);
}`;

const STRIP_SKETCH = `function setup() {
  createCanvas(600, 300, WEBGL);
}

function draw() {
  background(20, 24, 44);
  // 見せる頂点の数を、時間で3個から14個まで増やす
  let count = floor(frameCount / 25) % 12 + 3;

  stroke(230);
  strokeWeight(1.5);
  fill(90, 150, 255, 150);
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < count; i++) {
    // 上、下、上、下…と交互に、右へ進みながら頂点を置く
    let x = -260 + i * 40;
    let y = i % 2 === 0 ? -60 : 60;
    vertex(x, y, 0);
  }
  endShape();

  // 頂点の位置に印を付ける
  noStroke();
  fill(255, 200, 90);
  for (let i = 0; i < count; i++) {
    circle(-260 + i * 40, i % 2 === 0 ? -60 : 60, 9);
  }
}`;

const GEOMETRY_SKETCH = `let burr;

function setup() {
  createCanvas(600, 400, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  randomSeed(4);
  // 形を1回だけ組み立てて、1つの立体にまとめる
  burr = buildGeometry(makeBurr);
}

// この関数の中で描いた立体が、すべて1つにまとめられる
function makeBurr() {
  sphere(42);
  for (let i = 0; i < 500; i++) {
    push();
    // 無作為な向きへ回してから、細長い箱を外へ突き出す
    rotateY(random(TWO_PI));
    rotateX(random(TWO_PI));
    let len = random(20, 150);
    translate(0, 0, 40 + len / 2);
    box(5, 5, len);
    pop();
  }
}

function draw() {
  background(235, 45, 8);
  orbitControl();
  ambientLight(0, 0, 35);
  // 色の違う光を2方向から当てる
  directionalLight(200, 40, 100, 0.5, 0.8, -0.5);
  directionalLight(330, 60, 80, -0.6, -0.4, -0.3);
  rotateY(frameCount * 0.006);
  rotateX(frameCount * 0.004);
  fill(0, 0, 90);
  // まとめた立体は、model()で描く
  model(burr);
}`;

const WAVE_SKETCH = `let waveShader;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  // 関数wave()の中身を、GPUで動くシェーダーに変換する
  waveShader = buildMaterialShader(wave);
}

function wave() {
  let t = millis() * 0.001;
  // worldInputs: 頂点1つごとに実行され、位置を書き換えられる
  worldInputs.begin();
  let p = worldInputs.position;
  worldInputs.position.y += 26 * sin(t * 2 + p.x * 0.03) + 14 * sin(t * 1.3 + p.z * 0.05);
  worldInputs.end();
}

function draw() {
  background(14, 16, 30);
  orbitControl();
  ambientLight(40);
  directionalLight(160, 190, 255, 0.3, 1, -0.5);
  pointLight(255, 120, 190, -120, -160, 60);
  rotateX(1.2);
  // これ以降に描く立体に、シェーダーを使う
  shader(waveShader);
  fill(235);
  // 細かく分割した板。分割が粗いと、波がなめらかにならない
  plane(440, 320, 60, 40);
}`;

const BLOB_SKETCH = `let blobShader;

function setup() {
  createCanvas(600, 400, WEBGL);
  noStroke();
  blobShader = buildMaterialShader(blob);
}

function blob() {
  let t = millis() * 0.001;
  // 頂点の段から画素の段へ受け渡す値
  let bump = sharedFloat();

  // objectInputs: 拡大や回転をかける前の頂点に対して実行される
  objectInputs.begin();
  let p = objectInputs.position;
  // 3方向のsin()を掛け合わせて、0〜1のうねりを作る
  bump = 0.5 + 0.5 * sin(p.x * 3 + t) * sin(p.y * 4 - t * 0.7) * sin(p.z * 3.5 + t * 0.5);
  // 面の向き（法線）の方向へ、うねりの分だけ押し出す
  objectInputs.position += objectInputs.normal * (bump - 0.5) * 0.7;
  objectInputs.end();

  // finalColor: 画素1つごとに実行され、最後の色を書き換えられる
  finalColor.begin();
  let cool = [0.2, 0.45, 1, 1];
  let warm = [1, 0.4, 0.6, 1];
  finalColor.set(finalColor.color * mix(cool, warm, bump));
  finalColor.end();
}

function draw() {
  background(14, 16, 30);
  orbitControl();
  ambientLight(130);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  rotateY(frameCount * 0.004);
  shader(blobShader);
  fill(255);
  sphere(105, 80, 60);
}`;

const GLSL_SKETCH = `let ripple;

function setup() {
  createCanvas(600, 360, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // GLSLで書いたフラグメントシェーダー。文字列として渡す
  let fragSrc = [
    'precision highp float;',
    'varying vec2 vTexCoord;',
    'uniform sampler2D tex0;',
    'uniform float time;',
    'void main() {',
    '  vec2 uv = vTexCoord;',
    '  uv.x += sin(uv.y * 40.0 + time * 3.0) * 0.012;',
    '  float r = texture2D(tex0, uv + vec2(0.006, 0.0)).r;',
    '  float g = texture2D(tex0, uv).g;',
    '  float b = texture2D(tex0, uv - vec2(0.006, 0.0)).b;',
    '  gl_FragColor = vec4(r, g, b, 1.0);',
    '}',
  ].join(' ');
  ripple = createFilterShader(fragSrc);
}

function draw() {
  // まず普通に絵を描く
  background(235, 45, 8);
  ambientLight(0, 0, 45);
  directionalLight(0, 0, 100, 0.4, 0.8, -0.5);
  for (let i = 0; i < 7; i++) {
    push();
    translate((i - 3) * 78, sin(frameCount * 0.03 + i) * 50, 0);
    rotateX(frameCount * 0.01 + i);
    rotateY(frameCount * 0.013);
    fill(190 + i * 22, 60, 100);
    torus(26, 10);
    pop();
  }

  // 描き終えた画面全体に、シェーダーをかける
  ripple.setUniform('time', millis() / 1000);
  filter(ripple);
}`;

const HOOK_ROWS: [string, string, string][] = [
  ["objectInputs", "頂点ごと", "拡大・回転・移動をかける前の頂点の位置や法線"],
  ["worldInputs", "頂点ごと", "拡大・回転・移動をかけたあとの頂点の位置や法線"],
  ["cameraInputs", "頂点ごと", "カメラから見た頂点の位置や法線"],
  ["pixelInputs", "画素ごと", "表面の色・法線・つやなど、ライトの計算に使う値"],
  [
    "combineColors",
    "画素ごと",
    "環境光・拡散光・鏡面光を1つの色にまとめる方法",
  ],
  ["finalColor", "画素ごと", "ライトの計算が済んだあとの、最後の色"],
];

const GLSL_ROWS: [string, string][] = [
  [
    "precision highp float;",
    "小数の精度の指定。フラグメントシェーダーの先頭に書く",
  ],
  [
    "varying vec2 vTexCoord;",
    "いま処理している画素の位置。横・縦とも0〜1の範囲",
  ],
  ["uniform sampler2D tex0;", "filter()をかける前の画面。p5.jsが渡してくれる"],
  ["uniform float time;", "スケッチからsetUniform()で渡す値"],
  ["texture2D(tex0, uv)", "画面の位置uvの色を読む"],
  ["gl_FragColor = vec4(r, g, b, 1.0);", "この画素の色を決める。値は0.0〜1.0"],
];

export default function Shaders() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 21</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          形を作る・シェーダー
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          前のページでは、box()やsphere()という出来合いの立体を並べました。このページの前半では、頂点を1つずつ置いて自分で形を作ります。
          後半では、頂点や画素の1つ1つに対してGPUで計算を走らせる「シェーダー」を書きます。
          下の枠は前半の完成形で、noise()で作った地形の上を飛び続けます。ドラッグで視点を変えられます。
        </p>

        <CodePreview
          title="流れ続けるnoiseの地形（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          地形は、高さの違う頂点を三角形でつないだ1枚の面です。高さを決めているのはelevation()の中のnoise()だけです。
        </p>

        <WhyNowBox
          title="なぜここで学ぶのか"
          tags={[
            "beginShape()",
            "vertex()",
            "buildGeometry()",
            "p5.strands",
            "GLSL",
          ]}
        >
          <p>
            立体を並べる方法は、数が増えると遅くなります。地形や布のようにつながった面は、頂点から直接作るほうが軽く、形も自由です。
            さらにシェーダーを使うと、頂点を動かす計算と色を決める計算をGPUに任せられます。CPUでは重すぎた細かさの動きが、なめらかに動くようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>頂点を置いて面を作る</h2>
            <p className={para}>
              <code className={code}>beginShape()</code>と
              <code className={code}>endShape()</code>
              のあいだに
              <code className={code}>vertex(x, y, z)</code>
              を並べると、頂点をつないだ形が描かれます。3Dの面は三角形の集まりで作るのが基本で、beginShape()に
              <code className={code}>TRIANGLE_STRIP</code>
              を渡すと、置いた頂点が帯状の三角形としてつながります。3つ目の頂点で最初の三角形ができ、以降は頂点を1つ足すたびに、直前の2つと合わせた三角形が1つ増えます。
            </p>
            <CodePreview
              title="TRIANGLE_STRIP: 頂点を足すごとに三角形が増える"
              language="js"
              code={STRIP_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              頂点は「上、下、上、下」と交互に置いています。こうすると、帯が横へ伸びていきます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>vertex(x, y, 0)</code>の0を
                  <code className={code}>sin(i + frameCount * 0.05) * 60</code>
                  にして、draw()の先頭に
                  <code className={code}>rotateX(1)</code>
                  を足す（帯が奥行き方向に波打つ）
                </li>
                <li>
                  <code className={code}>TRIANGLE_STRIP</code>を
                  <code className={code}>TRIANGLES</code>
                  にする（頂点3つごとに、独立した三角形になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>帯を並べて地形にする</h2>
            <p className={para}>
              冒頭の地形は、この帯を奥から手前へ何本も並べたものです。構造は2重のfor文です。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                外側のfor文（y）:
                帯を1本ずつ描く。1本ごとにbeginShape()からendShape()まで
              </li>
              <li>
                内側のfor文（x）:
                「この行の頂点」と「1つ手前の行の頂点」を交互に置く
              </li>
              <li>
                頂点のz（高さ）:
                格子の位置をnoise()に渡して決める。隣の頂点と近い値になるので、なだらかにつながる
              </li>
            </ul>
            <p className={para}>
              飛んでいるように見えるのは、地形を動かしているからではありません。頂点の位置は毎フレーム同じで、noise()に渡すyに
              <code className={code}>fly</code>
              を足して、高さの模様のほうを手前へ送っています。 この作り方は、The
              Coding Trainが「3D Terrain Generation with Perlin
              Noise」として紹介している定番の構成です。
            </p>
            <InfoBox type="info" title="冒頭のスケッチの数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>fly -= 0.03</code>
                  を0.1にする（速く飛ぶ）、符号を+にする（後ろ向きに進む）
                </li>
                <li>
                  <code className={code}>a * 130</code>と
                  <code className={code}>b * 130</code>
                  の130を300にする（険しい山になる）
                </li>
                <li>
                  <code className={code}>x * 0.14</code>と
                  <code className={code}>y * 0.14</code>
                  の0.14を0.05にする（ゆるやかな丘になる）
                </li>
                <li>
                  2つのfill()を<code className={code}>noFill()</code>
                  に替える（向こう側が透けて見える、線だけの地形になる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="p5.jsの1.x系の記事との違い">
              <p>
                なめらかな曲線の頂点を置く関数は、1.x系ではcurveVertex()でしたが、2.x系ではsplineVertex()に変わりました。vertex()とbeginShape()・endShape()は同じ名前で使えます。
                外の記事のコードが動かないときは、関数名を公式リファレンスで確かめてください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>buildGeometry()で形をまとめる</h2>
            <p className={para}>
              形が毎フレーム変わらないなら、最初に1回だけ組み立てておけます。
              <code className={code}>buildGeometry()</code>
              に関数を渡すと、その中で描いた立体がすべて1つの形（p5.Geometry）にまとめられます。まとめた形は
              <code className={code}>model()</code>
              で描きます。公式リファレンスは「Creating a p5.Geometry object once
              and then drawing it will run faster than repeatedly drawing the
              individual pieces.」と説明しています。
            </p>
            <CodePreview
              title="500本の箱を1つの形にまとめる"
              language="js"
              code={GEOMETRY_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              このスケッチは球1つと箱500本でできていますが、draw()の中で描いているのはmodel()の1回だけです。
              前のページの最後で触れた「数を増やすと遅くなる」問題は、動かない形についてはこの方法で避けられます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>i &lt; 500</code>
                  を3000にする（組み立ては最初の1回だけなので、draw()の中はmodel()の1回のまま）
                </li>
                <li>
                  <code className={code}>box(5, 5, len)</code>を
                  <code className={code}>cone(6, len)</code>
                  にして、直前に
                  <code className={code}>rotateX(HALF_PI)</code>
                  を足す（とげの形になる）
                </li>
                <li>
                  <code className={code}>randomSeed(4)</code>
                  の数を変える（別の形になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>シェーダーとは</h2>
            <p className={para}>
              シェーダーは、GPUの上で動く小さなプログラムです。Web上の3Dで使うのは主に2種類です。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>
                <strong className="text-foreground">頂点シェーダー</strong>:
                頂点1つにつき1回実行され、その頂点を画面のどこに置くかを決める
              </li>
              <li>
                <strong className="text-foreground">
                  フラグメントシェーダー
                </strong>
                : 画素1つにつき1回実行され、その画素の色を決める
              </li>
            </ul>
            <p className={para}>
              これまでのスケッチでも、p5.jsが用意したシェーダーが裏で動いて、ライトの計算をしていました。自分でシェーダーを書くと、その計算に手を入れられます。
              for文で頂点を1つずつ処理するのと違い、シェーダーは全部の頂点・全部の画素に対して同じ計算を並列に実行します。
            </p>
            <p className={para}>
              シェーダーは本来GLSLという専用の言語で書きます。p5.jsの2.x系には、JavaScriptでシェーダーを書ける
              <strong className="text-foreground">p5.strands</strong>
              という機能が加わりました。書いた関数を、p5.jsがGLSLに変換します。このページではp5.strandsを中心に扱い、最後にGLSLを直接書く例を1つ見ます。
            </p>
            <InfoBox type="warning" title="p5.strandsは実験的な機能">
              <p>
                buildMaterialShader()などのリファレンスには「This API is
                experimental」「Its behavior may change in a future version of
                p5.js.」と書かれています。このページのスケッチは2.4.0で動作を確かめたものです。
                同じ2.x系でも、初期の記事には
                <code className={code}>baseMaterialShader().modify()</code>
                の中でgetWorldInputs()を呼ぶ書き方が載っています。版によって書き方が違うので、動かないときはリファレンスの例と見比べてください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>p5.strandsで頂点を動かす</h2>
            <p className={para}>
              手順は3つです。シェーダーの中身を関数として書く。
              <code className={code}>buildMaterialShader()</code>
              に渡してシェーダーを作る。draw()の中で
              <code className={code}>shader()</code>
              を呼んでから立体を描く。
            </p>
            <p className={para}>
              関数の中では、
              <code className={code}>worldInputs.begin()</code>と
              <code className={code}>worldInputs.end()</code>
              のあいだに、頂点1つに対する計算を書きます。
              <code className={code}>worldInputs.position</code>
              がその頂点の位置で、書き換えると頂点が動きます。下のスケッチは、xとzの位置と時間をsin()に入れて、yを上下させています。
            </p>
            <CodePreview
              title="板を波打たせるシェーダー"
              language="js"
              code={WAVE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>p.x * 0.03</code>
                  の0.03を0.1にする（波が細かくなる）
                </li>
                <li>
                  <code className={code}>plane(440, 320, 60, 40)</code>を
                  <code className={code}>plane(440, 320, 4, 4)</code>
                  にする（頂点が足りず、波が折れ線になる）
                </li>
                <li>
                  <code className={code}>shader(waveShader)</code>
                  の行を消す（平らな板に戻る）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="見た目はJavaScript、実行はGPU">
              <p>
                wave()はJavaScriptの関数に見えますが、頂点ごとに呼ばれているわけではありません。シェーダーを作るときに中身が読み取られ、GLSLに変換されてGPUで実行されます。
                そのため、中で使えるのはsin()やnoise()、mix()などシェーダー用に用意された関数です。millis()は特別に扱われ、毎フレームの時刻がシェーダーへ渡されます。
                スケッチ側の変数の値を渡したいときは、uniformFloat()などで受け口を作り、setUniform()で値を送ります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>p5.strandsで色を決める</h2>
            <p className={para}>
              位置を書き換える場所と色を書き換える場所は、名前で分かれています。これを「フック」と呼びます。buildMaterialShader()で使えるフックは次の6つです。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      フック
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      実行の単位
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      書き換えられるもの
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {HOOK_ROWS.map(([name, unit, target]) => (
                    <tr key={name} className="border-t border-border">
                      <th
                        scope="row"
                        className="text-left p-3 font-mono font-normal"
                      >
                        {name}
                      </th>
                      <td className="p-3">{unit}</td>
                      <td className="p-3">{target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={para}>
              下のスケッチは2つのフックを使います。objectInputsで球の頂点をsin()のうねりの分だけ外へ押し出し、finalColorで画素の色を決めます。
              押し出した量を色にも使いたいので、
              <code className={code}>sharedFloat()</code>
              で作った変数に入れて、頂点の段から画素の段へ受け渡しています。色は[赤,
              緑, 青, 不透明度]を0〜1で並べた配列で、
              <code className={code}>mix(a, b, 割合)</code>
              はlerp()と同じように2つを混ぜます。
            </p>
            <CodePreview
              title="波打ち、色が流れる球"
              language="js"
              code={BLOB_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>(bump - 0.5) * 0.7</code>
                  の0.7を2にする（大きく崩れる）、0にする（形は球のまま、色だけ流れる）
                </li>
                <li>
                  <code className={code}>p.x * 3</code>
                  の3を9にする（起伏が細かくなる）
                </li>
                <li>
                  <code className={code}>cool</code>と
                  <code className={code}>warm</code>
                  の数を変えて、好きな2色にする
                </li>
              </ul>
            </InfoBox>
            <InfoBox
              type="warning"
              title="objectInputsの位置は、拡大する前の大きさ"
            >
              <p>
                sphere(105)と書いても、objectInputs.positionに入っているのは半径105の球の座標ではありません。拡大をかける前の、半径1ほどの小さな球の座標です。
                そのため、押し出す量は0.7のような小さな数で足ります。画面上の大きさで計算したいときは、拡大や移動が済んだあとのworldInputsを使います。前の節の板のスケッチで0.03のような細かい係数を使ったのは、そちらが画面上の大きさだからです。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>GLSLを直接書く: 画面全体のフィルタ</h2>
            <p className={para}>
              最後に、GLSLを直接書く例です。
              <code className={code}>createFilterShader()</code>
              にフラグメントシェーダーの文字列を渡すと、
              <code className={code}>filter()</code>
              で画面全体にかけられるシェーダーができます。普通に絵を描いたあと、でき上がった画面を1枚の画像として受け取り、画素ごとに色を決め直します。
            </p>
            <p className={para}>
              下のスケッチのシェーダーは2つのことをしています。画素を読む位置を、縦の位置に応じて左右に揺らす。赤と青を、少し離れた位置から読む。これで、波打ちながら色がにじむ画面になります。
            </p>
            <CodePreview
              title="画面全体を揺らして、色をずらす"
              language="js"
              code={GLSL_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      GLSLの行
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {GLSL_ROWS.map(([line, meaning]) => (
                    <tr key={line} className="border-t border-border">
                      <th
                        scope="row"
                        className="text-left p-3 font-mono font-normal"
                      >
                        {line}
                      </th>
                      <td className="p-3">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={para}>
              GLSLはJavaScriptより型に厳しい言語です。小数は
              <code className={code}>40.0</code>
              のように小数点を付けて書き、変数には
              <code className={code}>float</code>や
              <code className={code}>vec2</code>
              といった型を書きます。行の終わりのセミコロンも省けません。
              同じフィルタはp5.strandsでも書けます。その場合は
              <code className={code}>buildFilterShader()</code>
              を使い、filterColorというフックの中で色を決めます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>* 0.012</code>
                  を0.05にする（揺れが大きくなる）
                </li>
                <li>
                  2か所の<code className={code}>0.006</code>
                  を0.03にする（赤と青が大きくずれる）
                </li>
                <li>
                  <code className={code}>
                    gl_FragColor = vec4(r, g, b, 1.0)
                  </code>
                  を
                  <code className={code}>
                    gl_FragColor = vec4(1.0 - r, 1.0 - g, 1.0 - b, 1.0)
                  </code>
                  にする（色が反転する）
                </li>
              </ul>
            </InfoBox>
            <InfoBox
              type="info"
              title="このスケッチでGLSLを配列で書いている理由"
            >
              <p>
                公式の例は、GLSLをバッククォートで囲んだ複数行の文字列として書いています。このページでは、ページ内のエディタの都合で、1行ずつの文字列を配列に入れてjoin()でつないでいます。
                p5.js Web
                Editorなど自分の環境では、公式の例と同じ複数行の文字列で書けます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="頂点をつないで、波打つ帯を作る"
              description="___ を埋めて、上下に並べた頂点を三角形の帯としてつないでください。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300, WEBGL);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(235, 45, 8);
  rotateX(1);
  stroke(190, 40, 100);
  fill(260, 60, 45);
  // 頂点を、帯状の三角形としてつなぐ
  beginShape(___);
  for (let i = 0; i < 16; i++) {
    let x = -150 + i * 20;
    let z = sin(i * 0.5 + frameCount * 0.05) * 30;
    // 奥の頂点と、手前の頂点を交互に置く
    ___(x, -50, z);
    ___(x, 50, z);
  }
  endShape();
}`}
              answer={`function setup() {
  createCanvas(400, 300, WEBGL);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(235, 45, 8);
  rotateX(1);
  stroke(190, 40, 100);
  fill(260, 60, 45);
  // 頂点を、帯状の三角形としてつなぐ
  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i < 16; i++) {
    let x = -150 + i * 20;
    let z = sin(i * 0.5 + frameCount * 0.05) * 30;
    // 奥の頂点と、手前の頂点を交互に置く
    vertex(x, -50, z);
    vertex(x, 50, z);
  }
  endShape();
}`}
              keywords={["TRIANGLE_STRIP", "vertex"]}
              hints={[
                "beginShape()に定数TRIANGLE_STRIPを渡すと、頂点が帯状の三角形としてつながります",
                "頂点を1つ置く関数はvertex()です。WEBGLモードでは3つ目の引数にzを渡せます",
              ]}
            />
            <CodingChallenge
              title="シェーダーを作って使う"
              description="___ を埋めて、関数ripple()からシェーダーを作り、球に使ってください。"
              preview
              initialCode={`let rippleShader;

function setup() {
  createCanvas(400, 300, WEBGL);
  noStroke();
  // 関数ripple()の中身から、シェーダーを作る
  rippleShader = ___(ripple);
}

function ripple() {
  let t = millis() * 0.001;
  worldInputs.begin();
  worldInputs.position.x += 12 * sin(t * 3 + worldInputs.position.y * 0.08);
  worldInputs.end();
}

function draw() {
  background(14, 16, 30);
  ambientLight(80);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  // これ以降に描く立体に、作ったシェーダーを使う
  ___(rippleShader);
  fill(255, 150, 190);
  sphere(90, 48, 48);
}`}
              answer={`let rippleShader;

function setup() {
  createCanvas(400, 300, WEBGL);
  noStroke();
  // 関数ripple()の中身から、シェーダーを作る
  rippleShader = buildMaterialShader(ripple);
}

function ripple() {
  let t = millis() * 0.001;
  worldInputs.begin();
  worldInputs.position.x += 12 * sin(t * 3 + worldInputs.position.y * 0.08);
  worldInputs.end();
}

function draw() {
  background(14, 16, 30);
  ambientLight(80);
  directionalLight(255, 255, 255, 0.4, 0.8, -0.5);
  // これ以降に描く立体に、作ったシェーダーを使う
  shader(rippleShader);
  fill(255, 150, 190);
  sphere(90, 48, 48);
}`}
              keywords={["buildMaterialShader", "shader(rippleShader)"]}
              hints={[
                "関数からライト対応のシェーダーを作るのはbuildMaterialShader()です",
                "作ったシェーダーは、立体を描く前にshader()へ渡して有効にします",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              地形とシェーダーは、数値と色を変えるだけで別の風景になります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                冒頭の地形で、stroke()を
                <code className={code}>noStroke()</code>
                にする。線が消えて、高さごとの色で見せる面の地形になる（このスケッチは頂点に面の向きを指定していないので、ライトを足しても陰影は付かない）
              </li>
              <li>
                elevation()の戻り値を2乗する。低い所が平らに広がり、山だけが立ち上がる。0.3より低い所を0.3にそろえると、水面のある風景になる
              </li>
              <li>
                地形の色を、
                <Link
                  href="/p5js/systems/composition"
                  className="text-primary underline"
                >
                  美しく仕上げる
                </Link>
                のページのパレットから取る。高さを3〜4段に区切って色を割り当てると、等高線の地図のようになる
              </li>
              <li>
                球のシェーダーを、torus()やbuildGeometry()でまとめた形にかける。shader()は、そのあとに描くどの立体にも効く
              </li>
              <li>
                フィルタのシェーダーを、これまでに作った2Dのスケッチにかける。createCanvas()にWEBGLを足し、原点のずれを
                <code className={code}>translate(-width / 2, -height / 2)</code>
                で戻してから、最後にfilter()を呼ぶ
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="beginShape(TRIANGLE_STRIP)で頂点を8個置くと、三角形はいくつできる？"
              options={[
                { label: "2個" },
                { label: "4個" },
                { label: "6個", correct: true },
                { label: "8個" },
              ]}
              explanation="最初の3つの頂点で三角形が1つでき、以降は頂点を1つ足すたびに1つ増えます。8個なら、8から2を引いた6個です。"
            />
            <Quiz
              question="p5.strandsのworldInputsとfinalColorの違いとして正しいのは？"
              options={[
                {
                  label:
                    "worldInputsは頂点ごとに実行されて位置などを変えられる。finalColorは画素ごとに実行されて色を変えられる",
                  correct: true,
                },
                {
                  label:
                    "worldInputsはsetup()で1回、finalColorはdraw()で毎フレーム実行される",
                },
                {
                  label: "worldInputsは2D用、finalColorは3D用である",
                },
                {
                  label: "worldInputsはCPUで、finalColorはGPUで実行される",
                },
              ]}
              explanation="どちらもGPUで動くシェーダーの一部です。worldInputsは頂点シェーダーの側で頂点1つごとに、finalColorはフラグメントシェーダーの側で画素1つごとに実行されます。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "beginShape(TRIANGLE_STRIP)とvertex(x, y, z)で、頂点から面を作れる",
                  "地形は、noise()で高さを決めた頂点の帯を並べたもの。noise()に渡す位置をずらすと流れる",
                  "動かない形はbuildGeometry()で1つにまとめ、model()で描く",
                  "シェーダーはGPUで動くプログラム。頂点ごとに位置を、画素ごとに色を決める",
                  "p5.strandsは、buildMaterialShader()に渡した関数をシェーダーに変換する。フックの中で位置や色を書き換える",
                  "createFilterShader()にGLSLを渡すと、filter()で画面全体にかけられる",
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
                  title: "p5.js Tutorials: p5.strands: Introduction to Shaders",
                  url: "https://p5js.org/tutorials/intro-to-p5-strands/",
                  description:
                    "JavaScriptでシェーダーを書くp5.strandsの公式チュートリアル",
                },
                {
                  title: "p5.js Reference: buildMaterialShader()",
                  url: "https://p5js.org/reference/p5/buildMaterialShader/",
                  description: "使えるフックの一覧と、頂点・画素を書き換える例",
                },
                {
                  title: "p5.js Reference: createFilterShader()",
                  url: "https://p5js.org/reference/p5/createFilterShader/",
                  description:
                    "GLSLで画面全体のフィルタを書くときに使える変数と例",
                },
                {
                  title: "p5.js Reference: buildGeometry()",
                  url: "https://p5js.org/reference/p5/buildGeometry/",
                  description: "複数の立体を1つの形にまとめる関数の仕様",
                },
                {
                  title: "MDN: GLSL Shaders",
                  url: "https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders",
                  description: "頂点シェーダーとフラグメントシェーダーの役割",
                },
                {
                  title:
                    "The Coding Train: 3D Terrain Generation with Perlin Noise",
                  url: "https://thecodingtrain.com/challenges/11-3d-terrain-generation-with-perlin-noise",
                  description: "TRIANGLE_STRIPとnoiseで流れる地形を作る解説",
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
