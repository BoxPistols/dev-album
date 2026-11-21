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

// このページの完成形。2か所から広がる波を足し合わせ、点の大きさと色にする
const HERO_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(236, 60, 7);
  let t = frameCount * 0.05;

  // 波の出どころを2つ置く。1つは自動で回り、もう1つはマウスに合わせる
  let ax = 300 + cos(frameCount * 0.008) * 170;
  let ay = 200 + sin(frameCount * 0.011) * 110;
  let bx = 300 - cos(frameCount * 0.006) * 150;
  let by = 200 - sin(frameCount * 0.009) * 90;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    bx = mouseX;
    by = mouseY;
  }

  for (let y = 6; y < height; y += 12) {
    for (let x = 6; x < width; x += 12) {
      // 出どころからの距離のぶんだけ、波の位相をずらす
      let a = sin(dist(x, y, ax, ay) * 0.09 - t);
      let b = sin(dist(x, y, bx, by) * 0.09 - t);
      // 2つの波を足す。山どうしが重なる所は大きく、山と谷が重なる所は消える
      let wave = a + b;
      fill(map(wave, -2, 2, 185, 330), 70, map(wave, -2, 2, 45, 100));
      circle(x, y, map(wave, -2, 2, 1, 11));
    }
  }
}`;

const UNIT_CIRCLE_SKETCH = `let trail = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(232, 35, 10);
  let a = frameCount * 0.02;
  let cx = 150;
  let cy = 210;
  let r = 100;

  // 角度aのとき、円周上の点は (cos(a), sin(a)) に半径を掛けた位置
  let x = cx + r * cos(a);
  let y = cy + r * sin(a);

  // 円と軸
  noFill();
  stroke(232, 15, 40);
  strokeWeight(1);
  circle(cx, cy, r * 2);
  line(cx - r - 20, cy, 580, cy);
  line(cx, cy - r - 20, cx, cy + r + 20);

  // 半径、cosの長さ（横）、sinの長さ（縦）
  stroke(0, 0, 80);
  line(cx, cy, x, y);
  strokeWeight(4);
  stroke(190, 70, 100);
  line(cx, cy, x, cy);
  stroke(330, 70, 100);
  line(x, cy, x, y);

  // sinの値を記録して右へ流すと、波になる
  trail.unshift(y);
  if (trail.length > 290) trail.pop();
  noFill();
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < trail.length; i++) {
    vertex(290 + i, trail[i]);
  }
  endShape();
  strokeWeight(1);
  stroke(330, 40, 60);
  line(x, y, 290, y);

  noStroke();
  fill(0, 0, 95);
  circle(x, y, 10);
  fill(0, 0, 85);
  text('a = ' + nf(a % TWO_PI, 1, 2), 16, 28);
  fill(190, 70, 100);
  text('cos(a) = ' + nf(cos(a), 1, 2), 16, 50);
  fill(330, 70, 100);
  text('sin(a) = ' + nf(sin(a), 1, 2), 16, 72);
}`;

const ORBIT_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(232, 35, 8);
}

function draw() {
  background(232, 35, 8, 10);
  let cx = width / 2;
  let cy = height / 2;

  noStroke();
  fill(45, 60, 100);
  circle(cx, cy, 26);

  for (let i = 0; i < 7; i++) {
    // 外側ほど半径が大きく、回る速さが遅い
    let r = 36 + i * 24;
    let a = frameCount * 0.05 / (1 + i * 0.45) + i * 2;

    // 中心に、半径ぶんのcosとsinを足すと円運動になる
    let x = cx + r * cos(a);
    let y = cy + r * sin(a);

    fill(190 + i * 22, 70, 100);
    circle(x, y, 6 + i * 1.5);
  }
}`;

const WAVE_SKETCH = `// 振幅: 波の高さ
let amp = 90;
// 周期: 山から次の山までの横幅
let period = 240;
// 速さ: 1フレームに進む位相
let speed = 0.04;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(232, 35, 10);
  let phase = frameCount * speed;

  for (let x = 10; x < width; x += 12) {
    // xがperiodだけ進むと、角度がちょうど1周（TWO_PI）進む
    let a = TWO_PI * x / period - phase;
    let y = height / 2 + amp * sin(a);
    fill(map(sin(a), -1, 1, 200, 330), 70, 100);
    circle(x, y, 10);
  }
}`;

const ADD_WAVES_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(232, 35, 10);
  let t = frameCount * 0.03;
  noFill();

  // もとになる3つの波を薄く描く
  strokeWeight(1);
  stroke(200, 60, 80, 45);
  drawWave(1, t);
  stroke(280, 60, 80, 45);
  drawWave(2, t);
  stroke(330, 60, 80, 45);
  drawWave(3, t);

  // 3つを足した波
  strokeWeight(3);
  stroke(45, 70, 100);
  drawWave(0, t);
}

function drawWave(which, t) {
  beginShape();
  for (let x = 0; x <= width; x += 4) {
    let w1 = 60 * sin(x * 0.02 - t);
    let w2 = 30 * sin(x * 0.05 + t * 1.3);
    let w3 = 14 * sin(x * 0.13 - t * 2.1);
    let y = w1 + w2 + w3;
    if (which == 1) y = w1;
    if (which == 2) y = w2;
    if (which == 3) y = w3;
    vertex(x, height / 2 + y);
  }
  endShape();
}`;

const ROSE_SKETCH = `// 花びらの数を決める数
let k = 4;
let a = 0;
let rest = 0;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
  background(250, 45, 7);
}

function draw() {
  translate(width / 2, height / 2);

  // 描き終えたら少し待ち、kを変えて描き直す
  if (a > TWO_PI) {
    rest += 1;
    if (rest > 120) nextRose();
    return;
  }

  strokeWeight(2);
  for (let i = 0; i < 3; i++) {
    // 極座標: 角度aと、中心からの距離rで位置を決める
    let r1 = 210 * cos(k * a);
    let x1 = r1 * cos(a);
    let y1 = r1 * sin(a);
    a += 0.008;
    let r2 = 210 * cos(k * a);
    let x2 = r2 * cos(a);
    let y2 = r2 * sin(a);

    // 角度に合わせて色相を進める
    stroke((200 + a * 28) % 360, 65, 100, 85);
    line(x1, y1, x2, y2);
  }
}

function nextRose() {
  k = k + 1;
  if (k > 7) k = 2;
  a = 0;
  rest = 0;
  background(250, 45, 7);
}

function mousePressed() {
  // クリックで次の形へ
  nextRose();
}`;

const LISSAJOUS_SKETCH = `// 横と縦の振動の回数
let fx = 3;
let fy = 2;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(250, 45, 7);
  translate(width / 2, height / 2);

  // 位相のずれを少しずつ進めると、図形がねじれるように変わる
  let shift = frameCount * 0.008;

  strokeWeight(2);
  let steps = 500;
  for (let i = 0; i < steps; i++) {
    let t1 = TWO_PI * i / steps;
    let t2 = TWO_PI * (i + 1) / steps;
    // xはcos、yはsin。回数が違うので円にならない
    let x1 = 190 * cos(fx * t1 + shift);
    let y1 = 190 * sin(fy * t1);
    let x2 = 190 * cos(fx * t2 + shift);
    let y2 = 190 * sin(fy * t2);
    stroke(190 + 140 * i / steps, 65, 100);
    line(x1, y1, x2, y2);
  }
}`;

const ATAN2_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(232, 35, 10);

  // 目標はマウス。枠の外にあるあいだは自動で動く
  let tx = width / 2 + cos(frameCount * 0.017) * 220;
  let ty = height / 2 + sin(frameCount * 0.029) * 130;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    tx = mouseX;
    ty = mouseY;
  }

  strokeWeight(3);
  for (let y = 25; y < height; y += 50) {
    for (let x = 25; x < width; x += 50) {
      // 自分から見た目標の方向（角度）を求める。引数はy、xの順
      let a = atan2(ty - y, tx - x);
      let d = dist(x, y, tx, ty);

      push();
      translate(x, y);
      rotate(a);
      // 角度を色相に、距離を長さにする
      stroke(map(a, -PI, PI, 180, 340), 70, 100);
      line(-6, 0, map(d, 0, 600, 8, 26, true), 0);
      pop();
    }
  }

  noStroke();
  fill(0, 0, 95);
  circle(tx, ty, 10);
}`;

function Row({ name, desc }: { name: string; desc: string }) {
  return (
    <tr className="border-t border-border">
      <th scope="row" className="text-left p-3 font-mono font-normal">
        {name}
      </th>
      <td className="p-3">{desc}</td>
    </tr>
  );
}

export default function Trigonometry() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 8</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          三角関数と波
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          sin()とcos()は、角度を入力すると-1〜1のあいだを行き来する数を返す関数です。この2つがあれば、
          円運動、波、花のような曲線、マウスの方を向く動きが作れます。
          下の模様は、2か所から広がる波を足し合わせて点の大きさと色にしたものです。枠の中でマウスを動かすと、波の出どころが1つついてきます。
        </p>

        <CodePreview
          title="波の干渉（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          2か所の
          <code className={code}>* 0.09</code>
          を0.2にすると波が細かくなり、0.02にするとゆったりした大きな波になります。
        </p>

        <WhyNowBox
          title="なぜここで三角関数を扱うのか"
          tags={["sin()", "cos()", "TWO_PI", "極座標", "atan2()"]}
        >
          <p>
            くり返す動き、回る動き、ゆらぐ形は、ジェネラティブアートで最もよく使う材料です。どれもsin()とcos()から作れます。
            公式や証明は使いません。「角度を進めると、値が-1と1のあいだを滑らかに往復する」という性質だけを使います。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>単位円で見るsinとcos</h2>
            <p className={para}>
              半径1の円（単位円）の上を点が回るとき、角度aの位置にある点の横の位置が
              <code className={code}>cos(a)</code>
              、縦の位置が
              <code className={code}>sin(a)</code>
              です。下のスケッチは半径を100倍にして描いています。水色の線がcos、ピンクの線がsinの長さです。
              sinの値を時間の順に右へ並べると、波の形になります。
            </p>
            <CodePreview
              title="単位円とsin・cos"
              language="js"
              code={UNIT_CIRCLE_SKETCH}
            />
            <InfoBox type="warning" title="数学の図とは回る向きが逆に見える">
              <p>
                数学の教科書では、角度が増えると点は反時計回りに進みます。p5.jsでは同じ式で時計回りに進みます。
                理由は、キャンバスのyが下向きだからです。sin(a)が正のとき、点は中心より下に来ます。式は同じで、見え方だけが上下に反転しています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>角度の単位はラジアン</h2>
            <p className={para}>
              p5.jsのsin()とcos()は、角度をラジアンという単位で受け取ります。1周（360度）が2
              × π（約6.28）ラジアンです。p5.jsにはこの数が
              <code className={code}>TWO_PI</code>
              という名前で用意されています。度で考えたいときは
              <code className={code}>radians()</code>
              で変換できます。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      度
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      ラジアン
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      p5.jsでの書き方
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {[
                    ["90度（4分の1周）", "約1.57", "HALF_PI / radians(90)"],
                    ["180度（半周）", "約3.14", "PI / radians(180)"],
                    ["360度（1周）", "約6.28", "TWO_PI / radians(360)"],
                  ].map(([deg, rad, how]) => (
                    <tr key={deg} className="border-t border-border">
                      <th scope="row" className="text-left p-3 font-normal">
                        {deg}
                      </th>
                      <td className="p-3">{rad}</td>
                      <td className="p-3 font-mono">{how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={para}>
              「1周をn等分した角度」は
              <code className={code}>TWO_PI / n</code>
              と書けます。円周上に物を等間隔で並べるときの定番の書き方です。
            </p>
            <InfoBox
              type="warning"
              title="sin(PI)はぴったり0にならないことがある"
            >
              <p>
                仕様（数学）ではsin(π)は0です。実測では
                <code className={code}>sin(PI)</code>
                が0.00000000000000012のような、ごく小さい数になることがあります。理由は、πを有限の桁数の小数で近似して計算しているためです。
                絵を描くうえでは差は見えませんが、
                <code className={code}>if (sin(a) == 0)</code>
                のような「ぴったり等しい」の判定は成り立たないことがあります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>円運動: 中心に半径ぶんのcosとsinを足す</h2>
            <p className={para}>
              単位円の点を半径r倍して、中心(cx,
              cy)へずらすと、好きな場所で好きな大きさの円運動になります。
              <code className={code}>x = cx + r * cos(a)</code>、
              <code className={code}>y = cy + r * sin(a)</code>
              の2行です。角度aを毎フレーム進めれば回ります。
            </p>
            <CodePreview
              title="中心のまわりを回る"
              language="js"
              code={ORBIT_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>y = cy + r * sin(a)</code>の
                  <code className={code}>r</code>を
                  <code className={code}>r * 0.4</code>
                  にする（横長のだ円の軌道になる）
                </li>
                <li>
                  <code className={code}>sin(a)</code>を
                  <code className={code}>sin(a * 2)</code>
                  にする（8の字を描く）
                </li>
                <li>
                  <code className={code}>i &lt; 7</code>
                  を14にする（外側にも点が増える。はみ出すなら24を12にする）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>波: 振幅・周期・位相</h2>
            <p className={para}>
              横に並べた点の高さをsin()で決めると波になります。波の形は3つの数で決まります。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      名前
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row
                    name="振幅（amp）"
                    desc="波の高さ。sin()は-1〜1を返すので、掛けた数がそのまま上下の幅になる"
                  />
                  <Row
                    name="周期（period）"
                    desc="山から次の山までの長さ。短くすると細かい波になる"
                  />
                  <Row
                    name="位相（phase）"
                    desc="波の横方向のずれ。毎フレーム進めると、波が流れて見える"
                  />
                </tbody>
              </table>
            </div>
            <CodePreview
              title="波を作る3つの数"
              language="js"
              code={WAVE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>let amp = 90;</code>
                  を160にする（波が高くなる）
                </li>
                <li>
                  <code className={code}>let period = 240;</code>
                  を60にする（細かい波になる）
                </li>
                <li>
                  <code className={code}>let speed = 0.04;</code>
                  を-0.04にする（逆向きに流れる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>波を足し合わせる</h2>
            <p className={para}>
              振幅と周期の違う波を足すと、単純なくり返しに見えない複雑な波になります。水面や音の波形も、
              単純な波がいくつも重なったものとして表せます。下の黄色い線は、薄く描いた3つの波をそのまま足したものです。
              冒頭の作品は、2か所から広がる波を同じように足しています。
            </p>
            <CodePreview
              title="3つの波の合成"
              language="js"
              code={ADD_WAVES_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>14 * sin(x * 0.13 ...)</code>
                  の14を50にする（細かい波が強く出て、ぎざぎざした線になる）
                </li>
                <li>
                  <code className={code}>30 * sin(x * 0.05 ...)</code>
                  の0.05を0.021にする（1つ目とわずかに周期の違う波が重なり、大きくなったり小さくなったりする「うなり」が出る）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>極座標とバラ曲線</h2>
            <p className={para}>
              位置を(x,
              y)ではなく「角度」と「中心からの距離」で表す方法を極座標と呼びます。円運動の式で、半径rを角度に応じて変えると、
              円ではない曲線になります。
              <code className={code}>r = cos(k * a)</code>
              で描ける花の形の曲線はバラ曲線（rose
              curve）と呼ばれます。kが整数のとき、花びらの数はkが奇数ならk枚、偶数なら2
              × k枚です。クリックでkが変わります。
            </p>
            <CodePreview
              title="バラ曲線を描いていく"
              language="js"
              code={ROSE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>let k = 4;</code>を
                  <code className={code}>let k = 2.5;</code>に、
                  <code className={code}>a &gt; TWO_PI</code>を
                  <code className={code}>a &gt; TWO_PI * 2</code>
                  にする（kが整数でないと1周では閉じず、花びらが重なり合う）
                </li>
                <li>
                  <code className={code}>210 * cos(k * a)</code>の2か所を
                  <code className={code}>130 + 80 * cos(k * a)</code>
                  にする（中心を通らない、波打つ輪になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>リサージュ図形</h2>
            <p className={para}>
              円運動はxをcos、yをsinで、同じ速さで動かしたものでした。xとyの振動の回数を変えると、
              リサージュ図形（Lissajous
              curve）と呼ばれる曲線になります。下は横に3回、縦に2回振動させたものです。位相のずれを少しずつ進めているので、立体が回っているように見えます。
            </p>
            <CodePreview
              title="リサージュ図形"
              language="js"
              code={LISSAJOUS_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>fx</code>と
                  <code className={code}>fy</code>
                  を1と2、5と4、7と6にする（比が変わると形が変わる）
                </li>
                <li>
                  両方を同じ数にする（だ円になり、位相のずれで線と円を行き来する）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>atan2()で相手の方を向く</h2>
            <p className={para}>
              sin()とcos()は「角度から位置」を求めました。
              <code className={code}>atan2()</code>
              はその逆で、「位置から角度」を求めます。自分から相手への横の差と縦の差を渡すと、相手のいる方向の角度が返ります。
              引数は
              <code className={code}>atan2(縦の差, 横の差)</code>
              の順で、yが先です。返る角度は-π〜πの範囲です。
            </p>
            <CodePreview
              title="目標の方を向く針"
              language="js"
              code={ATAN2_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>rotate(a)</code>を
                  <code className={code}>rotate(a + HALF_PI)</code>
                  にする（目標を囲んで渦を巻く向きになる）
                </li>
                <li>2か所の50を25にする（針が細かく並ぶ。25は12にする）</li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="円を描いて回る点"
              description="___ を埋めて、点がキャンバスの中央のまわりを半径100で回るようにしてください。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(232, 35, 10);
}

function draw() {
  background(232, 35, 10, 8);
  let a = frameCount * 0.03;
  let x = 200 + 100 * ___(a);
  let y = 150 + 100 * ___(a);
  noStroke();
  fill(320, 70, 100);
  circle(x, y, 16);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(232, 35, 10);
}

function draw() {
  background(232, 35, 10, 8);
  let a = frameCount * 0.03;
  let x = 200 + 100 * cos(a);
  let y = 150 + 100 * sin(a);
  noStroke();
  fill(320, 70, 100);
  circle(x, y, 16);
}`}
              keywords={["cos", "sin"]}
              hints={[
                "横の位置には、単位円の横の位置を返す関数cosを使います",
                "縦の位置には、単位円の縦の位置を返す関数sinを使います",
              ]}
            />
            <CodingChallenge
              title="マウスの方を向く矢印"
              description="___ を埋めて、中央の矢印がマウスの方を向くようにしてください。位置の差から角度を求める関数を使います。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(232, 35, 10);
  let a = ___(mouseY - 150, mouseX - 200);
  translate(200, 150);
  rotate(a);
  stroke(190, 70, 100);
  strokeWeight(6);
  line(-40, 0, 40, 0);
  line(40, 0, 22, -14);
  line(40, 0, 22, 14);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(232, 35, 10);
  let a = atan2(mouseY - 150, mouseX - 200);
  translate(200, 150);
  rotate(a);
  stroke(190, 70, 100);
  strokeWeight(6);
  line(-40, 0, 40, 0);
  line(40, 0, 22, -14);
  line(40, 0, 22, 14);
}`}
              keywords={["atan2"]}
              hints={[
                "縦の差、横の差の順に渡すと角度を返す関数atan2を使います",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭の「波の干渉」は、波を決める数と、波を何に変えるかの2か所を替えると別の作品になります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>circle(x, y, ...)</code>を
                <code className={code}>
                  square(x, y, map(wave, -2, 2, 1, 11))
                </code>
                に替え、setup()に
                <code className={code}>rectMode(CENTER)</code>
                を足す。織物のような模様になる
              </li>
              <li>
                点の大きさを固定し、
                <code className={code}>circle(x, y + wave * 6, 5)</code>
                のように位置をずらす。布が波打つような動きになる
              </li>
              <li>
                波の出どころを3つに増やす。
                <code className={code}>
                  let c = sin(dist(x, y, 300, 200) * 0.09 - t);
                </code>
                を足し、
                <code className={code}>wave = a + b + c</code>
                にして、map()の範囲を-3〜3にする
              </li>
              <li>
                バラ曲線の
                <code className={code}>background(250, 45, 7)</code>
                を描き直しのときに呼ばないようにする。kの違う花が重なった1枚の絵になる
              </li>
            </ul>
            <InfoBox type="success" title="静止画として残す">
              <p>
                バラ曲線とリサージュ図形は、数を2つ3つ変えるだけで形が大きく変わります。気に入った形が出たら、
                枠の下の「PNG保存」で画像にできます。数の組み合わせをメモしておくと、あとで同じ形を再現できます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="x = cx + r * cos(a)、y = cy + r * sin(a)で、aを毎フレーム増やすと点はどう動く？"
              options={[
                { label: "右へまっすぐ進む" },
                {
                  label: "(cx, cy)を中心に、半径rの円を描いて回る",
                  correct: true,
                },
                { label: "(cx, cy)に向かって近づいていく" },
                { label: "上下に往復する" },
              ]}
              explanation="cos(a)とsin(a)は単位円上の点の横と縦の位置です。半径rを掛けて中心(cx, cy)を足すと、その中心のまわりの円運動になります。"
            />
            <Quiz
              question="y = 50 * sin(x * 0.1)の波を、高さはそのままで細かくするには？"
              options={[
                { label: "50を100にする" },
                { label: "50を10にする" },
                { label: "0.1を0.3にする", correct: true },
                { label: "0.1を0.01にする" },
              ]}
              explanation="sin()の外で掛ける数（50）が振幅、中でxに掛ける数（0.1）が波の細かさを決めます。中の数を大きくすると、同じ幅の中に山が多く入ります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "cos(a)とsin(a)は、単位円上で角度aにある点の横と縦の位置。どちらも-1〜1を往復する",
                  "角度の単位はラジアン。1周はTWO_PI、度からはradians()で変換する",
                  "x = cx + r * cos(a)、y = cy + r * sin(a)で円運動になる",
                  "波は振幅・周期・位相で決まり、足し合わせると複雑な形になる",
                  "半径を角度で変えるとバラ曲線、xとyの回数を変えるとリサージュ図形になる",
                  "atan2(縦の差, 横の差)で、相手のいる方向の角度が求まる",
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
                  title: "p5.js Reference: sin()",
                  url: "https://p5js.org/reference/p5/sin/",
                  description:
                    "sin()の仕様。既定でラジアンを使うことと、-1〜1を往復することが書かれている",
                },
                {
                  title: "p5.js Reference: radians()",
                  url: "https://p5js.org/reference/p5/radians/",
                  description: "度からラジアンへの変換と、2つの単位の関係",
                },
                {
                  title: "p5.js Reference: atan2()",
                  url: "https://p5js.org/reference/p5/atan2/",
                  description:
                    "位置から角度を求める関数の仕様。引数の順番と返る範囲が書かれている",
                },
                {
                  title: "The Nature of Code: Chapter 3 Oscillation",
                  url: "https://natureofcode.com/oscillation/",
                  description:
                    "Daniel Shiffmanによる、角度・三角関数・波・振動の解説",
                },
                {
                  title: "Wolfram MathWorld: Rose Curve",
                  url: "https://mathworld.wolfram.com/RoseCurve.html",
                  description: "バラ曲線の式と、花びらの数の決まり方",
                },
                {
                  title: "Wikipedia: Lissajous curve",
                  url: "https://en.wikipedia.org/wiki/Lissajous_curve",
                  description: "リサージュ図形の式と、回数の比による形の違い",
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
