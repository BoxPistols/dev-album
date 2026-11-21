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

// このページの完成形。開いた時点で波打ちながらゆっくり回り、ドラッグで視点を変えられる
const HERO_SKETCH = `function setup() {
  // 3つ目の引数にWEBGLを渡すと、3Dで描けるようになる
  createCanvas(600, 400, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  background(235, 45, 8);
  // ドラッグで回転、ホイールで拡大縮小
  orbitControl();

  // 全体を照らす弱い光と、斜め上から当たる光
  ambientLight(0, 0, 45);
  directionalLight(0, 0, 100, 0.5, 1, -0.4);

  // 斜め上から見下ろす向きにして、ゆっくり回す
  rotateX(-0.75);
  rotateY(frameCount * 0.004);

  let count = 15;
  let gap = 24;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let x = (i - (count - 1) / 2) * gap;
      let z = (j - (count - 1) / 2) * gap;
      // 中心からの距離をsin()に入れて、波紋のように高さを変える
      let d = dist(x, z, 0, 0);
      let h = 46 + sin(d * 0.045 - frameCount * 0.05) * 34;

      push();
      // 上向きはyのマイナス方向。高さの半分だけ持ち上げて、底をそろえる
      translate(x, -h / 2, z);
      fill(map(h, 12, 80, 215, 335), 60, 100);
      box(19, h, 19);
      pop();
    }
  }
}`;

const AXES_SKETCH = `function setup() {
  createCanvas(600, 360, WEBGL);
}

function draw() {
  background(20, 24, 44);
  orbitControl();
  // 少し斜めから見て、奥行きが分かるようにする
  rotateX(-0.35);
  rotateY(-0.5 + sin(frameCount * 0.01) * 0.25);

  // 原点(0, 0, 0)から伸びる3本の軸
  strokeWeight(3);
  // x軸（赤）: 右がプラス
  stroke(255, 110, 110);
  line(0, 0, 0, 160, 0, 0);
  // y軸（緑）: 下がプラス
  stroke(110, 230, 150);
  line(0, 0, 0, 0, 160, 0);
  // z軸（青）: 手前がプラス
  stroke(120, 170, 255);
  line(0, 0, 0, 0, 0, 160);

  // 原点に小さな球
  noStroke();
  fill(240);
  sphere(7);

  // z軸に沿って行き来する箱
  let z = sin(frameCount * 0.03) * 130;
  push();
  translate(0, 0, z);
  fill(255, 200, 90);
  box(34);
  pop();
}`;

const SHAPES_SKETCH = `function setup() {
  createCanvas(600, 380, WEBGL);
  noStroke();
}

function draw() {
  background(20, 24, 44);
  // 標準のライトをまとめて置く。ライトは次の節で扱う
  lights();
  fill(150, 190, 255);

  let a = frameCount * 0.012;
  // 上の段: box, sphere, torus
  place(-190, -90, a);
  box(80);
  pop();
  place(0, -90, a);
  sphere(50);
  pop();
  place(190, -90, a);
  torus(42, 16);
  pop();
  // 下の段: cylinder, cone, plane
  place(-190, 90, a);
  cylinder(36, 90);
  pop();
  place(0, 90, a);
  cone(44, 90);
  pop();
  place(190, 90, a);
  plane(90, 90);
  pop();
}

// 置く位置へ移動して、回す。pop()は呼び出した側で行う
function place(x, y, a) {
  push();
  translate(x, y, 0);
  rotateX(a);
  rotateY(a * 1.3);
}`;

const LIGHTS_SKETCH = `function setup() {
  createCanvas(600, 380, WEBGL);
  noStroke();
}

function draw() {
  background(14, 16, 30);

  // 環境光: 全体を一様に照らす。影になる側の色を決める
  ambientLight(40, 40, 70);
  // 平行光: 決まった向きから当たる光。ここでは右上の手前から
  directionalLight(120, 150, 255, -0.6, 0.5, -0.5);

  // 点光源: ある1点から四方へ広がる光。マウスが枠の外なら自動で回る
  let lx = cos(frameCount * 0.02) * 220;
  let ly = sin(frameCount * 0.03) * 120;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // 目印はz = 140にあり、カメラ（z = 800）に近いぶん大きく写る。660 / 800を掛けて、マウスの真下に重ねる
    lx = (mouseX - width / 2) * 660 / 800;
    ly = (mouseY - height / 2) * 660 / 800;
  }
  pointLight(255, 170, 90, lx, ly, 140);

  // 点光源の場所に、目印の小さな球を置く
  push();
  translate(lx, ly, 140);
  emissiveMaterial(255, 200, 130);
  sphere(5);
  pop();

  // 照らされる立体
  fill(235);
  push();
  translate(-130, 0, 0);
  sphere(85, 48, 32);
  pop();
  push();
  translate(130, 0, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.013);
  torus(62, 26, 48, 24);
  pop();
}`;

const MATERIALS_SKETCH = `function setup() {
  createCanvas(600, 300, WEBGL);
  noStroke();
}

function draw() {
  background(14, 16, 30);
  ambientLight(70);
  // 左右に動く点光源
  pointLight(255, 255, 255, sin(frameCount * 0.02) * 320, -120, 220);

  // 1. normalMaterial: 面の向きを色にする。ライトの影響を受けない
  push();
  translate(-210, 0, 0);
  normalMaterial();
  sphere(58, 48, 32);
  pop();

  // 2. ambientMaterial: 環境光のうち、どの色を反射するかを決める
  push();
  translate(-70, 0, 0);
  fill(70, 130, 255);
  ambientMaterial(70, 130, 255);
  sphere(58, 48, 32);
  pop();

  // 3. specularMaterial + shininess: 光源を映すつや
  push();
  translate(70, 0, 0);
  fill(70, 130, 255);
  specularMaterial(255);
  shininess(60);
  sphere(58, 48, 32);
  pop();

  // 4. emissiveMaterial: ライトに関係なく、その色で見える
  push();
  translate(210, 0, 0);
  // ライトを反射する分をなくすため、塗り色は黒にしておく
  fill(0);
  emissiveMaterial(235, 95, 150);
  sphere(58, 48, 32);
  pop();
}`;

const CAMERA_SKETCH = `function setup() {
  createCanvas(600, 400, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  background(235, 45, 8);

  // 視野の広さ（上下の角度）。数を大きくすると広角になり、広い範囲が写る
  perspective(PI / 3, width / height, 10, 5000);

  // カメラを原点のまわりで回す。camera(カメラの位置, 見る点, 上の向き)
  let t = frameCount * 0.006;
  camera(cos(t) * 470, -140, sin(t) * 470, 0, 0, 0, 0, 1, 0);

  ambientLight(0, 0, 50);
  directionalLight(0, 0, 100, 0.4, 1, -0.3);

  // 縦・横・奥行きに5個ずつ、格子状に球を並べる
  let gap = 70;
  for (let i = -2; i <= 2; i++) {
    for (let j = -2; j <= 2; j++) {
      for (let k = -2; k <= 2; k++) {
        push();
        translate(i * gap, j * gap, k * gap);
        // 位置を色相と大きさに使う
        fill(200 + i * 22 + k * 14, 55, 100);
        sphere(9 + (j + 2) * 3.5, 16, 12);
        pop();
      }
    }
  }
}`;

const TERRAIN_SKETCH = `function setup() {
  createCanvas(600, 400, WEBGL);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  background(225, 50, 8);
  orbitControl();
  ambientLight(0, 0, 40);
  directionalLight(0, 0, 100, -0.5, 1, -0.3);

  rotateX(-0.85);
  rotateY(0.6);

  let count = 22;
  let gap = 13;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      // noise()に格子の位置と時間を渡す。隣どうしが近い高さになる
      let n = noise(i * 0.13, j * 0.13, frameCount * 0.008);
      // noise()の値は0.5の近くに集まるので、0.25〜0.75を0〜1に引き伸ばす
      let k = map(n, 0.25, 0.75, 0, 1, true);
      let h = 8 + k * k * 130;
      push();
      translate((i - count / 2) * gap, -h / 2, (j - count / 2) * gap);
      // 低い所は深い青、高い所は明るい緑に近づける
      fill(lerp(225, 150, k), lerp(75, 30, k), lerp(55, 100, k));
      box(gap - 2, h, gap - 2);
      pop();
    }
  }
}`;

const SHAPE_ROWS: [string, string][] = [
  ["box(w, h, d)", "直方体。引数1つなら立方体"],
  ["sphere(r)", "球。rは半径"],
  ["torus(r, tubeR)", "ドーナツ形。輪の半径と、管の半径"],
  ["cylinder(r, h)", "円柱"],
  ["cone(r, h)", "円すい"],
  ["plane(w, h)", "厚みのない長方形の板"],
];

const LIGHT_ROWS: [string, string][] = [
  ["ambientLight(色)", "環境光。全体を一様に照らす。向きを持たない"],
  [
    "directionalLight(色, x, y, z)",
    "平行光。x, y, zは光の進む向き。太陽光のように、どこでも同じ向きから当たる",
  ],
  [
    "pointLight(色, x, y, z)",
    "点光源。x, y, zは光源の位置。電球のように、その1点から四方へ光が広がる",
  ],
];

const MATERIAL_ROWS: [string, string][] = [
  ["normalMaterial()", "面の向きを色にする。ライトなしで形を確かめるのに向く"],
  ["fill(色)", "ライトを受けて明るさが変わる、基本の塗り色"],
  ["ambientMaterial(色)", "環境光のうち、反射する色を決める"],
  ["specularMaterial(色) / shininess(数)", "光源を映すつやの色と、つやの鋭さ"],
  ["emissiveMaterial(色)", "ライトに関係なく、その色で表示する"],
];

function SimpleTable({
  head,
  rows,
}: {
  head: [string, string];
  rows: [string, string][];
}) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full text-sm border border-border rounded-lg">
        <thead>
          <tr className="bg-muted text-foreground">
            <th scope="col" className="text-left p-3 font-semibold">
              {head[0]}
            </th>
            <th scope="col" className="text-left p-3 font-semibold">
              {head[1]}
            </th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {rows.map(([name, meaning]) => (
            <tr key={name} className="border-t border-border">
              <th scope="row" className="text-left p-3 font-mono font-normal">
                {name}
              </th>
              <td className="p-3">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WebglBasics() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 20</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          WEBGLの基礎
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          createCanvas()の3つ目の引数にWEBGLを渡すと、キャンバスに奥行きが加わります。このページでは、立体を置き、光を当て、視点を動かすところまでを扱います。
          下の枠は完成形です。ドラッグで回転、ホイールで拡大縮小ができます。
        </p>

        <CodePreview
          title="波打つ立方体の群れ（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          2重のfor文でグリッドを作り、sin()で高さを変える。やっていることは2Dのページと同じで、描く図形がrect()からbox()に替わっただけです。
        </p>

        <WhyNowBox
          title="なぜここで学ぶのか"
          tags={[
            "WEBGL",
            "box() / sphere()",
            "orbitControl()",
            "ライト",
            "マテリアル",
          ]}
        >
          <p>
            for文・座標変換・sin()・noise()は、3Dでもそのまま使えます。新しく覚えるのは、z軸と、光と、カメラの3つです。
            これまでに作ったグリッドや波のスケッチに奥行きを足すと、同じアルゴリズムが別の表情を見せます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>原点は中央、z軸は手前へ</h2>
            <p className={para}>
              WEBGLモードでは、座標の決まりが2つ変わります。1つ目は、原点(0,
              0)がキャンバスの
              <strong className="text-foreground">中央</strong>
              になること。2つ目は、3本目の軸zが加わることです。zは画面の手前に向かって大きくなります。xは右、yは下が大きい向きで、ここは2Dと同じです。
            </p>
            <CodePreview
              title="3本の軸（赤がx、緑がy、青がz）"
              language="js"
              code={AXES_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              translate()・rotate()・scale()も3Dになります。
              <code className={code}>translate(x, y, z)</code>
              は3つ目の引数で奥行き方向へ動かせます。回転は、どの軸のまわりで回すかを
              <code className={code}>rotateX()</code>・
              <code className={code}>rotateY()</code>・
              <code className={code}>rotateZ()</code>
              で選びます。2Dのrotate()は、rotateZ()と同じ回り方です。
            </p>
            <InfoBox type="warning" title="2Dのスケッチを移すときは原点に注意">
              <p>
                2D用に書いたスケッチにWEBGLを足すと、絵が右下へずれます。原点が左上から中央へ移るためです。
                draw()の先頭に
                <code className={code}>translate(-width / 2, -height / 2)</code>
                を足すと、左上が原点の座標に戻せます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>立体を置く</h2>
            <p className={para}>
              2Dのrect()やcircle()にあたる、立体を描く関数が用意されています。どれも原点を中心に描かれるので、置きたい場所へは
              <code className={code}>translate()</code>
              で移動してから描きます。
            </p>
            <SimpleTable head={["関数", "描かれる立体"]} rows={SHAPE_ROWS} />
            <CodePreview
              title="6種類の立体"
              language="js"
              code={SHAPES_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>box(80)</code>を
                  <code className={code}>box(120, 20, 60)</code>
                  にする（幅・高さ・奥行きを別々に指定した板になる）
                </li>
                <li>
                  <code className={code}>sphere(50)</code>を
                  <code className={code}>sphere(50, 6, 4)</code>
                  にする（球を作る面の数が減り、角ばった宝石のような形になる）
                </li>
                <li>
                  <code className={code}>noStroke()</code>
                  を消す（面の境目に線が描かれ、立体が面の集まりであることが見える）
                </li>
              </ul>
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              球や円柱の曲面は、小さな平面をつなげて作られています。sphere()の2つ目と3つ目の引数は、その分割の細かさです。
              輪郭の線（stroke）は面の境目すべてに描かれて重くなるので、立体をたくさん並べるときは
              <code className={code}>noStroke()</code>を呼んでおきます。
            </p>
          </section>

          <section>
            <h2 className={h2}>orbitControl()で視点を動かす</h2>
            <p className={para}>
              draw()の中で<code className={code}>orbitControl()</code>
              を呼ぶと、マウスやタッチで視点を動かせるようになります。左ドラッグで回転、ホイールやピンチで拡大縮小、右ドラッグで平行移動です。
              冒頭のスケッチと、このページの多くのスケッチで使っています。作っている最中に立体を裏から確かめたいときにも役立ちます。
            </p>
            <p className={para}>
              orbitControl()が動かすのはカメラで、立体そのものではありません。冒頭のスケッチが自動で回っているのは、
              <code className={code}>rotateY(frameCount * 0.004)</code>
              で立体の側を回しているからです。
            </p>
          </section>

          <section>
            <h2 className={h2}>ライトを当てる</h2>
            <p className={para}>
              ライトを1つも置かないと、立体は塗り色1色で塗りつぶされ、形が読み取れません。面の向きによって明るさが変わって、はじめて立体に見えます。
              ライトはdraw()の中で毎フレーム置きます。
            </p>
            <SimpleTable head={["関数", "光の種類"]} rows={LIGHT_ROWS} />
            <p className={para}>
              下のスケッチは3種類を全部使っています。枠の中でマウスを動かすと、オレンジ色の点光源が付いてきます。
            </p>
            <CodePreview
              title="環境光・平行光・点光源"
              language="js"
              code={LIGHTS_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>ambientLight(40, 40, 70)</code>
                  の行を消す（光の当たらない側が真っ黒になる）
                </li>
                <li>
                  <code className={code}>directionalLight(...)</code>
                  の向きを<code className={code}>0, 1, 0</code>
                  にする（真上から当たる光になる）
                </li>
                <li>
                  <code className={code}>pointLight(255, 170, 90, ...)</code>
                  の色を<code className={code}>90, 255, 170</code>
                  にする（光の色が変わると、白い立体の色も変わる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox
              type="warning"
              title="directionalLight()の3つの数は「向き」"
            >
              <p>
                pointLight()の最後の3つは光源の
                <strong>位置</strong>
                ですが、directionalLight()の最後の3つは光が
                <strong>進む向き</strong>です。
                <code className={code}>0, 1, 0</code>
                は「yのプラス方向へ進む光」、つまり上から下へ当たる光です。位置のつもりで書くと、逆側が照らされます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>マテリアルで質感を変える</h2>
            <p className={para}>
              マテリアルは、表面が光をどう返すかの設定です。同じ球でも、マテリアルを替えると素材が違って見えます。
            </p>
            <SimpleTable head={["関数", "見え方"]} rows={MATERIAL_ROWS} />
            <CodePreview
              title="4つのマテリアル（左からnormal・ambient・specular・emissive）"
              language="js"
              code={MATERIALS_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              左から3つ目の球には、動く点光源が白い点として映り込みます。この映り込みがspecularMaterial()の効果で、shininess()の数を大きくするほど点が小さく鋭くなります。
              公式リファレンスはnormalMaterial()を「A normal material sets
              surfaces facing the x-axis to red, those facing the y-axis to
              green, and those facing the z-axis to blue.」と説明しています。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>shininess(60)</code>
                  を5にする（映り込みが大きくぼやける）、300にする（小さく鋭くなる）
                </li>
                <li>
                  <code className={code}>ambientLight(70)</code>
                  を0にする（ライトの影響を受けないnormalMaterial()とemissiveMaterial()の球は、明るさが変わらない）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>3次元のグリッドとカメラ</h2>
            <p className={para}>
              for文を3重にすると、立体を縦・横・奥行きに並べられます。下のスケッチは、orbitControl()の代わりに
              <code className={code}>camera()</code>
              でカメラの位置をコードから決め、格子のまわりを回らせています。引数は「カメラの位置」「見つめる点」「上の向き」の順に3つずつです。
            </p>
            <CodePreview
              title="125個の球と、回るカメラ"
              language="js"
              code={CAMERA_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={code}>perspective()</code>
              は遠近感の設定です。1つ目の引数は上下の視野角で、大きいほど広い範囲が写り（広角）、小さいほど狭い範囲が拡大されて写ります（望遠）。手前と奥の大きさの比はカメラから物までの距離で決まるので、視野角だけを変えても比は変わりません。
              何も指定しないときの値は、公式リファレンスに「By default, the
              camera is placed at (0, 0,
              800).」とあり、視野角はキャンバスの高さがちょうど収まるように決まります。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>PI / 3</code>を
                  <code className={code}>PI / 1.5</code>
                  にする（広角になり、格子が小さく写る）、
                  <code className={code}>PI / 10</code>
                  にする（望遠になり、格子の中央が拡大される）。手前と奥の球の大きさの比は、どちらでも変わらない
                </li>
                <li>
                  <code className={code}>cos(t) * 470</code>と
                  <code className={code}>sin(t) * 470</code>
                  の470を60にする（カメラが格子の中に入る）
                </li>
                <li>
                  <code className={code}>sphere(...)</code>を
                  <code className={code}>box(20)</code>
                  に替える
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>noiseで高さを決める</h2>
            <p className={para}>
              冒頭のスケッチはsin()で高さを決めていました。これを
              <Link
                href="/p5js/random/noise"
                className="text-primary underline"
              >
                noise()
              </Link>
              に替えると、規則的な波紋が、うねる地形に変わります。noise()の3つ目の引数に時間を渡しているので、地形はゆっくり形を変え続けます。
            </p>
            <CodePreview
              title="noiseで波打つ柱の群れ"
              language="js"
              code={TERRAIN_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>i * 0.13</code>と
                  <code className={code}>j * 0.13</code>
                  の0.13を0.4にする（起伏が細かく険しくなる）、0.04にする（なだらかになる）
                </li>
                <li>
                  <code className={code}>k * k * 130</code>を
                  <code className={code}>k * 130</code>
                  にする（低い所と高い所の差が縮まる）
                </li>
                <li>
                  <code className={code}>box(gap - 2, h, gap - 2)</code>を
                  <code className={code}>cylinder(gap / 2 - 1, h)</code>
                  に替える
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="仕様の60回と、3Dでの実測">
              <p>
                draw()は1秒に60回を目標に呼ばれますが、3Dは立体1つごとにGPUへ描画を頼むので、数を増やすと回数が先に落ちます。
                このスケッチは484本の柱を描いています。countを60にすると3600本になり、多くの端末で動きが遅くなります。
                数を増やしたいときは、次のページで扱う「たくさんの面を1つの形にまとめて描く」方法を使います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="回る立方体"
              description="___ を埋めて、3Dのキャンバスに立方体を描き、縦の軸のまわりで回してください。"
              preview
              initialCode={`function setup() {
  // 3つ目の引数で3Dのモードにする
  createCanvas(400, 300, ___);
}

function draw() {
  background(20, 24, 44);
  normalMaterial();
  rotateX(-0.4);
  // y軸（縦の軸）のまわりで回す
  ___(frameCount * 0.02);
  // 一辺120の立方体
  ___(120);
}`}
              answer={`function setup() {
  // 3つ目の引数で3Dのモードにする
  createCanvas(400, 300, WEBGL);
}

function draw() {
  background(20, 24, 44);
  normalMaterial();
  rotateX(-0.4);
  // y軸（縦の軸）のまわりで回す
  rotateY(frameCount * 0.02);
  // 一辺120の立方体
  box(120);
}`}
              keywords={["WEBGL", "rotateY", "box"]}
              hints={[
                "createCanvas()の3つ目の引数に定数WEBGLを渡すと、3Dで描けるようになります",
                "y軸のまわりの回転はrotateY()です。x軸ならrotateX()、z軸ならrotateZ()です",
                "直方体を描く関数はbox()です。引数が1つなら立方体になります",
              ]}
            />
            <CodingChallenge
              title="ライトを当てる"
              description="___ を埋めて、全体を弱く照らす環境光と、マウスに付いてくる点光源を置いてください。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300, WEBGL);
  noStroke();
}

function draw() {
  background(14, 16, 30);
  // 全体を一様に照らす弱い光
  ___(50, 50, 80);
  // マウスの位置にある点光源。原点が中央なので、幅と高さの半分を引く
  ___(255, 190, 120, mouseX - width / 2, mouseY - height / 2, 150);

  fill(235);
  rotateY(frameCount * 0.01);
  torus(80, 32, 48, 24);
}`}
              answer={`function setup() {
  createCanvas(400, 300, WEBGL);
  noStroke();
}

function draw() {
  background(14, 16, 30);
  // 全体を一様に照らす弱い光
  ambientLight(50, 50, 80);
  // マウスの位置にある点光源。原点が中央なので、幅と高さの半分を引く
  pointLight(255, 190, 120, mouseX - width / 2, mouseY - height / 2, 150);

  fill(235);
  rotateY(frameCount * 0.01);
  torus(80, 32, 48, 24);
}`}
              keywords={["ambientLight", "pointLight"]}
              hints={[
                "向きを持たず、全体を一様に照らす光はambientLight()です",
                "ある1点から広がる光はpointLight()です。色の3つの数のあとに、光源の位置を3つ渡します",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>冒頭の「波打つ立方体の群れ」を作り替えます。</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>dist(x, z, 0, 0)</code>を
                <code className={code}>x + z</code>
                に替える。波紋が、斜めに流れる波になる
              </li>
              <li>
                <code className={code}>box(19, h, 19)</code>を
                <code className={code}>sphere(h * 0.2)</code>
                に替える。高さの代わりに大きさが波打つ
              </li>
              <li>
                <code className={code}>directionalLight()</code>
                を2つにして、片方を暖色、もう片方を寒色にする。面の向きで色が分かれる
              </li>
              <li>
                前のページのパレットを使う。
                <code className={code}>fill()</code>
                に渡す色を、配列から選んだ3〜4色に絞る
              </li>
              <li>
                <Link
                  href="/p5js/random/particles"
                  className="text-primary underline"
                >
                  パーティクル
                </Link>
                のページのclassにz座標を足して、3Dの空間を漂う粒にする
              </li>
            </ul>
            <InfoBox type="success" title="Three.jsとの使い分け">
              <p>
                このサイトには
                <Link href="/threejs" className="text-primary underline">
                  Three.jsのマニュアル
                </Link>
                もあります。p5.jsのWEBGLモードは、2Dと同じ書き方のまま数行で立体を出せるので、スケッチや習作に向きます。
                3Dモデルの読み込み、影、多数の物体を扱う本格的な3Dシーンを作りたくなったら、Three.jsが向いています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="createCanvas(400, 300, WEBGL)のキャンバスで、座標(0, 0, 0)はどこ？"
              options={[
                { label: "左上の角" },
                { label: "キャンバスの中央", correct: true },
                { label: "左下の角" },
                { label: "右下の角" },
              ]}
              explanation="WEBGLモードでは原点がキャンバスの中央になります。xは右、yは下、zは手前がプラスの向きです。"
            />
            <Quiz
              question="directionalLight(255, 255, 255, 0, 1, 0)は、どんな光？"
              options={[
                { label: "座標(0, 1, 0)に置かれた電球のような光" },
                { label: "下から上へ当たる光" },
                {
                  label: "上から下へ（yのプラス方向へ）進む平行な光",
                  correct: true,
                },
                { label: "全体を一様に照らす、向きのない光" },
              ]}
              explanation="directionalLight()の最後の3つの数は、光源の位置ではなく光が進む向きです。yは下がプラスなので、(0, 1, 0)は上から下へ進む光になります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "createCanvas(w, h, WEBGL)で3Dになる。原点は中央、zは手前がプラス",
                  "box()・sphere()・torus()・cylinder()・cone()・plane()は原点に描かれる。translate()で置く場所へ動かす",
                  "rotateX()・rotateY()・rotateZ()で、回す軸を選ぶ",
                  "orbitControl()でドラッグ操作、camera()とperspective()でコードから視点を決める",
                  "ライトは環境光・平行光・点光源。マテリアルは表面が光を返す方法",
                  "for文・sin()・noise()は3Dでもそのまま使える",
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
                  title: "p5.js Tutorials: Coordinates and Transformations",
                  url: "https://p5js.org/tutorials/coordinates-and-transformations/",
                  description:
                    "WEBGLモードの座標と3Dの変換を扱う公式チュートリアル",
                },
                {
                  title: "p5.js Tutorials: Lights, Camera, Materials",
                  url: "https://p5js.org/tutorials/lights-camera-materials/",
                  description: "ライト・カメラ・マテリアルの公式チュートリアル",
                },
                {
                  title: "p5.js Reference: orbitControl()",
                  url: "https://p5js.org/reference/p5/orbitControl/",
                  description: "マウスとタッチで視点を動かす関数の仕様",
                },
                {
                  title: "p5.js Reference: camera()",
                  url: "https://p5js.org/reference/p5/camera/",
                  description: "カメラの位置・見る点・上の向きと、その既定値",
                },
                {
                  title: "p5.js Reference: perspective()",
                  url: "https://p5js.org/reference/p5/perspective/",
                  description: "視野角と、描画される奥行きの範囲",
                },
                {
                  title: "p5.js Reference: normalMaterial()",
                  url: "https://p5js.org/reference/p5/normalMaterial/",
                  description: "面の向きを色にするマテリアル",
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
