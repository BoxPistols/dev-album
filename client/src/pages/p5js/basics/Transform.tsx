import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。1本の線を、回転と鏡映で16か所に複製する万華鏡。マウスがなくても筆先が自動で進む
const HERO_SKETCH = `let symmetry = 8;
let px = 0;
let py = 0;
let hue = 190;
let usingMouse = false;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
  background(250, 45, 7);
}

function draw() {
  // 筆先の位置を、キャンバスの中心から測った座標で決める
  let x = cos(frameCount * 0.013) * 140 + cos(frameCount * 0.047) * 70;
  let y = sin(frameCount * 0.019) * 110 + sin(frameCount * 0.031) * 60;

  // マウスが枠の中にあれば、マウスの位置を筆先にする
  let inside = mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height;
  if (inside) {
    x = mouseX - width / 2;
    y = mouseY - height / 2;
  }

  // 自動とマウスが切り替わった瞬間は、線を引かずに位置だけ覚える
  if (inside !== usingMouse || frameCount === 1) {
    px = x;
    py = y;
    usingMouse = inside;
  }

  hue = (hue + 0.5) % 360;
  stroke(hue, 60, 100, 60);
  strokeWeight(2);

  // 原点をキャンバスの中心へ移す
  translate(width / 2, height / 2);

  for (let i = 0; i < symmetry; i++) {
    // 1周を等分した角度だけ回してから、同じ線を描く
    rotate(TWO_PI / symmetry);
    line(px, py, x, y);

    // 上下を反転した鏡像も描く
    push();
    scale(1, -1);
    line(px, py, x, y);
    pop();
  }

  px = x;
  py = y;

  // 自動で描いているあいだは、ときどき最初から描き直す
  if (!inside && frameCount % 1500 === 0) {
    background(250, 45, 7);
  }
}

function mousePressed() {
  // クリックで消す
  background(250, 45, 7);
}`;

const TRANSLATE_SKETCH = `function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(240, 45, 9);

  // 原点を(110, 150)へ移してから、花を描く
  translate(110, 150);
  drawFlower(330);

  // そこからさらに右へ190。移動は積み重なる
  translate(190, 0);
  drawFlower(200);

  translate(190, 0);
  drawFlower(45);
}

// 原点(0, 0)のまわりに花を描く。どこに描かれるかは、呼ぶ前のtranslate()で決まる
function drawFlower(h) {
  fill(h, 60, 100, 55);
  circle(0, -32, 64);
  circle(32, 0, 64);
  circle(0, 32, 64);
  circle(-32, 0, 64);
  fill(50, 30, 100);
  circle(0, 0, 22);
}`;

const ROTATE_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 角度を度（1周が360）で指定する
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(240, 45, 9);

  // 原点を中心へ移してから、1フレームに1度ずつ回す
  translate(width / 2, height / 2);
  rotate(frameCount);

  // 原点に置いた正方形は、その場で回る
  noStroke();
  fill(190, 65, 100);
  square(0, 0, 110);

  // 原点から離して置いた円は、原点のまわりを回る
  stroke(190, 30, 100, 50);
  strokeWeight(1);
  line(0, 0, 160, 0);
  noStroke();
  fill(330, 60, 100);
  circle(160, 0, 34);
}`;

const PUSHPOP_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  noFill();
  strokeWeight(3);
}

function draw() {
  background(240, 45, 9);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 5; i++) {
      // ここからpop()までの変換は、このマスだけに効く
      push();
      translate(60 + i * 120, 75 + j * 125);
      // 右の列ほど速く回す
      rotate(frameCount * (i + 1) * 0.4);
      // 下の行ほど大きくする
      scale(0.6 + j * 0.35);
      stroke(180 + i * 35, 60, 100);
      square(0, 0, 60);
      pop();
    }
  }
}`;

const ORDER_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  textSize(14);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  background(240, 45, 9);

  // 目印: 2つの基準点
  fill(0, 0, 60);
  circle(150, 180, 6);
  circle(430, 180, 6);

  // 左: 移動してから回転。正方形はその場で回る
  push();
  translate(150, 180);
  rotate(frameCount);
  fill(190, 65, 100);
  square(0, 0, 80);
  pop();

  // 右: 回転してから移動。回った軸に沿って動くので、基準点のまわりを回る
  push();
  translate(430, 180);
  rotate(frameCount);
  translate(90, 0);
  fill(330, 60, 100);
  square(0, 0, 50);
  pop();

  fill(0, 0, 85);
  text('translate → rotate', 150, 350);
  text('rotate → translate', 430, 350);
}`;

const MANDALA_SKETCH = `let count = 12;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  blendMode(BLEND);
  background(250, 45, 7);
  blendMode(ADD);

  translate(width / 2, height / 2);
  // 全体をゆっくり回す
  rotate(frameCount * 0.1);

  for (let i = 0; i < count; i++) {
    // 360度をcount等分した角度ずつ回しながら、同じ形を描く
    rotate(360 / count);

    // 外側の花びら
    fill(205, 75, 100, 40);
    ellipse(0, -130, 84, 170);

    // 内側の花びら
    fill(310, 65, 100, 40);
    ellipse(0, -70, 56, 120);

    // 先端の点
    fill(45, 50, 100, 80);
    circle(0, -224, 7);
  }
}`;

const SPIRO_SKETCH = `let angle = 0;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noStroke();
  background(250, 45, 7);
}

function draw() {
  // 1フレームに16歩進めて、線を早く育てる
  for (let k = 0; k < 16; k++) {
    angle += 0.5;

    push();
    translate(width / 2, height / 2);

    // 1本目の腕: 中心のまわりを回り、腕の先へ移動する
    rotate(angle);
    translate(125, 0);

    // 2本目の腕: 1本目の先で、逆向きに速く回る
    rotate(angle * -5.03);
    translate(75, 0);

    // 2本目の腕の先に点を打つ
    fill((angle * 0.05) % 360, 60, 100, 50);
    circle(0, 0, 2.5);
    pop();
  }
}

function mousePressed() {
  // クリックで消す
  background(250, 45, 7);
}`;

export default function Transform() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 6</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          座標変換
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          図形の座標を1つずつ計算する代わりに、座標の基準そのものを動かす・回す・拡大するのが座標変換です。
          下の枠は完成形の万華鏡です。枠の中でマウスを動かすと、描いた線が回転と鏡映で16か所に複製されます。
          マウスを置かなくても、筆先が自動で進みます。クリックで消せます。
        </p>

        <CodePreview
          title="万華鏡（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          線を引く命令は<code className={code}>line(px, py, x, y)</code>
          の1種類だけです。それをtranslate()・rotate()・scale()で向きを変えながらくり返しています。
          式に出てくるcos()とsin()は筆先を自動で動かすためのもので、次の章で詳しく扱います。
        </p>

        <WhyNowBox
          title="なぜ座標変換を学ぶのか"
          tags={["translate()", "rotate()", "scale()", "push() / pop()"]}
        >
          <p>
            「中心のまわりに花びらを12枚並べる」を座標の計算で書こうとすると、1枚ごとに位置と傾きを求める式が必要です。
            座標変換を使うと、「少し回して、同じ花びらを描く」を12回くり返すだけで済みます。
            回転対称の模様、腕の先でさらに回る動き、あとの章の再帰で描く木も、この考え方で書きます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              translate()で原点を動かす
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={code}>translate(x, y)</code>
              は、原点(0,
              0)を指定した分だけ移動します。それ以降に描く図形はすべて、新しい原点から測った位置に描かれます。
              図形を「原点のまわり」に描くように書いておけば、translate()を変えるだけで好きな場所に置けます。
              下のスケッチのdrawFlower()は、(0,
              0)のまわりに花を1つ描く自作の関数です。
            </p>
            <CodePreview
              title="同じ花を3か所に置く"
              language="js"
              code={TRANSLATE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              変換は積み重なります。2回目の
              <code className={code}>translate(190, 0)</code>
              は「いまの原点からさらに右へ190」という意味で、キャンバスの左上から測った190ではありません。
            </p>
            <InfoBox type="info" title="変換はdraw()のたびに元に戻る">
              <p>
                積み重なるのは1回のdraw()のあいだだけです。公式リファレンスは「Transformations
                are reset at the beginning of the draw
                loop.」と書いています。次のフレームの最初には、原点は左上に戻っています。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>translate(110, 150)</code>を
                  <code className={code}>translate(mouseX, mouseY)</code>
                  にする（3つの花がまとまってマウスについてくる）
                </li>
                <li>
                  2か所の<code className={code}>translate(190, 0)</code>を
                  <code className={code}>translate(190, 40)</code>
                  にする（右下がりに並ぶ）
                </li>
                <li>
                  drawFlower()の中の4か所の32を50にする（3つの花がすべて同じように開く）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              rotate()は原点を中心に回す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <code className={code}>rotate(角度)</code>
              は、原点を中心に座標全体を回します。正の角度で時計回りです。回転の中心はいつも原点なので、
              図形をその場で回したいときは、先にtranslate()で原点を図形の中心へ移してから回します。
              原点から離れた位置に描いた図形は、原点のまわりを回ります。
            </p>
            <CodePreview
              title="その場で回る・まわりを回る"
              language="js"
              code={ROTATE_SKETCH}
            />
            <InfoBox type="warning" title="角度の単位は、最初はラジアン">
              <p>
                p5.jsの角度は、何も指定しなければラジアン（1周が2π、約6.28）です。公式リファレンスは「Functions
                such as rotate() and sin() expect angles measured radians by
                default. Calling angleMode(DEGREES) switches to
                degrees.」と書いています。このページでは
                <code className={code}>angleMode(DEGREES)</code>
                で度（1周が360）に切り替えています。この行を書かずに
                <code className={code}>rotate(90)</code>
                と書くと、90度ではなく90ラジアン（14周と少し）回り、意図しない向きになります。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>rotate(frameCount)</code>を
                  <code className={code}>rotate(frameCount * 3)</code>
                  にする（3倍の速さで回る）。
                  <code className={code}>rotate(-frameCount)</code>
                  にする（反時計回りになる）
                </li>
                <li>
                  <code className={code}>translate(width / 2, height / 2)</code>
                  の行を消す（左上の角を中心に回り、ほとんどが枠の外に出る）
                </li>
                <li>
                  <code className={code}>rotate(frameCount)</code>を
                  <code className={code}>rotate(mouseX)</code>
                  にする（マウスの横位置で角度が決まる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              push()とpop()で変換を閉じ込める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              変換は積み重なるので、図形を何個も別々に動かそうとすると、前の図形の変換が次の図形に影響します。
              <code className={code}>push()</code>
              はいまの状態を保存し、<code className={code}>pop()</code>
              は保存した状態に戻します。この2つで挟んだあいだの変換は、外に漏れません。変換だけでなく、
              fill()やstroke()などの設定も一緒に保存され、戻ります。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              下のスケッチでは、15個の正方形がそれぞれ自分の位置・速さ・大きさを持っています。
              <code className={code}>scale(倍率)</code>
              は座標全体を拡大・縮小する変換で、1が等倍、2が2倍、0.5が半分です。
            </p>
            <CodePreview
              title="1つずつ別々に回す"
              language="js"
              code={PUSHPOP_SKETCH}
            />
            <InfoBox type="warning" title="scale()は線の太さも変える">
              <p>
                scale()は図形の大きさだけでなく、座標全体を拡大します。そのため同じ
                <code className={code}>strokeWeight(3)</code>
                でも、scale(2)のあとでは6ピクセル相当の太さで描かれます。上のスケッチで下の行ほど線が太いのはこのためです。
                太さをそろえたいときは、scale()を使わずに図形の大きさの数を変えるか、strokeWeight()を倍率で割ります。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>push();</code>と
                  <code className={code}>pop();</code>
                  の2行を消す（変換が次のマスへ持ち越され、正方形が枠の外へ飛んでいく）
                </li>
                <li>
                  <code className={code}>scale(0.6 + j * 0.35)</code>を
                  <code className={code}>scale(1, 0.4)</code>
                  にする（横はそのまま、縦だけ縮んだ形で回る）
                </li>
                <li>
                  <code className={code}>frameCount * (i + 1) * 0.4</code>を
                  <code className={code}>(i + j) * 12</code>
                  にする（動きを止め、少しずつ傾きの違う静止した模様にする）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              変換は順序で結果が変わる
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              「移動してから回転」と「回転してから移動」は、別の結果になります。rotate()のあとは座標の軸そのものが回っているので、
              そのあとのtranslate()は回った軸に沿って進むためです。左は移動→回転で、その場で回ります。
              右は回転→移動で、基準点のまわりを回ります。
            </p>
            <CodePreview
              title="移動→回転と、回転→移動"
              language="js"
              code={ORDER_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書く順
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      見た目
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      使いどころ
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      translate → rotate
                    </th>
                    <td className="p-3">置いた場所で、その場で回る</td>
                    <td className="p-3">風車、歯車、傾いたタイル</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      rotate → translate
                    </th>
                    <td className="p-3">原点のまわりを回る</td>
                    <td className="p-3">花びらの配置、周回する点</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  右の<code className={code}>translate(90, 0)</code>
                  の90を30にする（回る円が小さくなる）
                </li>
                <li>
                  右の<code className={code}>translate(90, 0)</code>
                  の次の行に<code className={code}>rotate(frameCount * 3)</code>
                  を足す（周回しながら、自分でも回る）
                </li>
                <li>
                  左の<code className={code}>rotate(frameCount)</code>の次の行に
                  <code className={code}>scale(2, 0.5)</code>
                  を足す（横長になった形が回る）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              回転対称にくり返す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              for文の中で「少し回して、同じ形を描く」をくり返すと、中心のまわりに形が等間隔に並びます。
              1周の360度をくり返しの回数で割った角度ずつ回せば、ちょうど1周で元に戻ります。曼荼羅や花、雪の結晶のような
              回転対称の模様は、この数行で作れます。冒頭の万華鏡は、これに上下反転の
              <code className={code}>scale(1, -1)</code>
              を加えて、鏡に映した形も描いています。
            </p>
            <CodePreview
              title="12回の回転でできる花"
              language="js"
              code={MANDALA_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>let count = 12</code>
                  を5にする（五弁の花になる）。36にする（細かいレースのようになる）
                </li>
                <li>
                  <code className={code}>ellipse(0, -130, 84, 170)</code>
                  の84を20にする（細い花びらになり、重なりがなくなる）
                </li>
                <li>
                  外側の花びらの行の前に<code className={code}>push();</code>と
                  <code className={code}>rotate(20);</code>
                  を、後ろに<code className={code}>pop();</code>
                  を足す（外側の花びらだけが傾く）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              回転を入れ子にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              回した先でさらに回すと、腕の先に付いた腕のような動きになります。「回す→腕の長さだけ移動→さらに回す→移動」と書き、
              2本目の腕の先に点を打ち続けると、花のような曲線が現れます。歯車の内側や外側で別の歯車を転がして曲線を描く
              製図用の道具と同じ種類の曲線です。背景を塗り直さずに点を重ねているので、線が少しずつ育ちます。クリックで消せます。
            </p>
            <CodePreview
              title="腕の先で回る腕"
              language="js"
              code={SPIRO_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              2本目の腕の速さ<code className={code}>-5.03</code>
              が、花びらの数と向きを決めています。ちょうど-5にすると同じ線の上をなぞり続け、少しずらすと1周ごとに線がずれて、帯が埋まっていきます。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>angle * -5.03</code>
                  の-5.03を-5にする（閉じた1本の曲線になる）。-2.02や7.03にする（花びらの数と形が変わる）
                </li>
                <li>
                  <code className={code}>translate(75, 0)</code>
                  の75を125にする（2本の腕が同じ長さになり、線が中心を通る）
                </li>
                <li>
                  <code className={code}>translate(125, 0)</code>
                  の125を60に、<code className={code}>translate(75, 0)</code>
                  の75を150にする（内側に輪のある形になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="中心で回る正方形"
              description="___ を埋めて、正方形がキャンバスの中心で回り続けるようにしてください。原点を中心へ移してから、回します。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(240, 45, 9);
  ___(width / 2, height / 2);
  ___(frameCount);
  fill(170, 60, 100);
  square(0, 0, 120);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(240, 45, 9);
  translate(width / 2, height / 2);
  rotate(frameCount);
  fill(170, 60, 100);
  square(0, 0, 120);
}`}
              keywords={["translate", "rotate"]}
              hints={[
                "原点を移動する関数translateを書きます。渡している2つの数は、キャンバスの中心の座標です",
                "原点を中心に座標を回す関数rotateを書きます。frameCountを渡すと、1フレームに1度ずつ回ります",
              ]}
            />
            <CodingChallenge
              title="8枚の花びらを並べる"
              description="___ を埋めて、花びらが中心のまわりに8枚、等間隔に並ぶようにしてください。8回のくり返しでちょうど1周する角度を書きます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(250, 45, 7);
  translate(width / 2, height / 2);
  for (let i = 0; i < 8; i++) {
    rotate(___);
    fill(320, 55, 100, 60);
    ellipse(0, -90, 50, 150);
  }
}`}
              answer={`function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  noStroke();
}

function draw() {
  background(250, 45, 7);
  translate(width / 2, height / 2);
  for (let i = 0; i < 8; i++) {
    rotate(360 / 8);
    fill(320, 55, 100, 60);
    ellipse(0, -90, 50, 150);
  }
}`}
              keywords={["360 / 8"]}
              hints={[
                "1周は360度です。8回で1周するには、1回あたり360を8で割った角度を回します。360 / 8と書きます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の万華鏡は、対称の数・線の太さ・色の3つを変えるだけで違う道具になります。自分で線を描いて、気に入ったところでPNG保存すれば、
              同じものが二度とできない1枚になります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>let symmetry = 8</code>
                を3にする。大柄な模様になる。24にする。細かいレースのような模様になる
              </li>
              <li>
                <code className={code}>strokeWeight(2)</code>を
                <code className={code}>
                  strokeWeight(dist(px, py, x, y) / 4 + 1)
                </code>
                にする。速く動かした所ほど太い線になり、筆で描いたような強弱が付く
              </li>
              <li>
                <code className={code}>line(px, py, x, y)</code>の2か所を
                <code className={code}>circle(x, y, 12)</code>
                に替える。線ではなく、点の連なりで描く万華鏡になる
              </li>
              <li>
                push()からpop()までの4行を消す。鏡像がなくなり、渦を巻く回転対称の模様になる
              </li>
              <li>
                背景を<code className={code}>background(40, 10, 96)</code>
                に、線を<code className={code}>stroke(hue, 70, 45, 60)</code>
                にする。紙にインクで描いた印象になる
              </li>
            </ul>
            <InfoBox type="success" title="正方形の入れ子も試す">
              <p>
                for文の中で
                <code className={code}>
                  rotate(5); scale(0.94); square(0, 0, 400);
                </code>
                を40回くり返すと、少しずつ回りながら小さくなる正方形の渦ができます。「少し変換して、同じ形を描く」のくり返しは、
                回転だけでなく拡大・縮小と組み合わせても使えます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="キャンバスの中央に置いた正方形を、その場で回したい。正しい順は？"
              options={[
                {
                  label:
                    "translate()で原点を中央へ移す → rotate()で回す → 原点に正方形を描く",
                  correct: true,
                },
                {
                  label:
                    "rotate()で回す → translate()で中央へ移す → 原点に正方形を描く",
                },
                { label: "正方形を中央に描く → rotate()で回す" },
                { label: "scale()で拡大する → rotate()で回す" },
              ]}
              explanation="rotate()は原点を中心に回します。先にtranslate()で原点を中央へ移しておくと、原点に描いた正方形がその場で回ります。順を逆にすると、回った軸に沿って移動するので、左上の角のまわりを回ります。描いたあとのrotate()は、すでに描いた図形には効きません。"
            />
            <Quiz
              question="push()とpop()で挟む目的は？"
              options={[
                { label: "描画を速くする" },
                { label: "図形をコピーして2つにする" },
                {
                  label:
                    "あいだで行った変換や色の設定を、挟んだ外に影響させない",
                  correct: true,
                },
                { label: "draw()のくり返しを一時的に止める" },
              ]}
              explanation="push()はいまの変換と描画の設定を保存し、pop()は保存した状態に戻します。図形ごとに挟むと、それぞれを別々に移動・回転・拡大できます。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "translate()は原点を動かし、rotate()は原点を中心に回し、scale()は座標全体を拡大・縮小する",
                  "変換は積み重なり、draw()のたびに元に戻る",
                  "push()とpop()で挟むと、変換と描画の設定をそのあいだに閉じ込められる",
                  "移動→回転はその場で回り、回転→移動は原点のまわりを回る",
                  "angleMode(DEGREES)で角度を度で書ける。指定しなければラジアン",
                  "「少し回して同じ形を描く」のくり返しで、回転対称の模様ができる",
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
                  title: "p5.js Reference: translate()",
                  url: "https://p5js.org/reference/p5/translate/",
                  description:
                    "原点を移動する関数。変換が積み重なること、draw()ごとに戻ることも書かれている",
                },
                {
                  title: "p5.js Reference: rotate()",
                  url: "https://p5js.org/reference/p5/rotate/",
                  description: "原点を中心に座標を回す関数",
                },
                {
                  title: "p5.js Reference: scale()",
                  url: "https://p5js.org/reference/p5/scale/",
                  description:
                    "座標を拡大・縮小する関数。縦横で別の倍率も指定できる",
                },
                {
                  title: "p5.js Reference: push()",
                  url: "https://p5js.org/reference/p5/push/",
                  description:
                    "変換と描画の設定を保存する関数。pop()と組で使う",
                },
                {
                  title: "p5.js Reference: angleMode()",
                  url: "https://p5js.org/reference/p5/angleMode/",
                  description: "角度の単位をラジアンと度で切り替える関数",
                },
                {
                  title: "p5.js Tutorials: Coordinates and Transformations",
                  url: "https://p5js.org/tutorials/coordinates-and-transformations/",
                  description: "座標と変換を扱う公式チュートリアル",
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
