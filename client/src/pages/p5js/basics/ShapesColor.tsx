import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。色相環に並べた光を加算で重ねる。マウスがなくても輪が呼吸する
const HERO_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  // 塗り直すときは、通常の重ね方に戻しておく
  blendMode(BLEND);
  background(250, 45, 7);

  // ここから先は、重なった所の色が足し合わされて明るくなる
  blendMode(ADD);

  // 輪の広がり。マウスが枠の中にあれば、横位置で決める
  let spread = 78 + sin(frameCount * 0.012) * 26;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    spread = mouseX / 5;
  }

  let count = 12;
  for (let i = 0; i < count; i++) {
    let angle = TWO_PI * i / count + frameCount * 0.004;
    let x = width / 2 + cos(angle) * spread;
    let y = height / 2 + sin(angle) * spread;

    // 色相を360度に均等に割り当てる
    let h = 360 * i / count;

    // 輪郭のはっきりした大きな円を1枚
    fill(h, 80, 100, 11);
    circle(x, y, 190);

    // その中心に、小さくなるほど重なって明るくなる光の芯
    for (let d = 110; d > 10; d -= 20) {
      fill(h, 60, 100, 7);
      circle(x, y, d);
    }
  }
}`;

const SHAPES_SKETCH = `function setup() {
  createCanvas(600, 400);
  textSize(14);
  textAlign(CENTER);
}

function draw() {
  background(22, 26, 46);
  noStroke();

  fill(255, 138, 128);
  circle(90, 100, 90);

  fill(255, 196, 112);
  ellipse(230, 100, 120, 70);

  fill(140, 220, 190);
  rect(315, 62, 110, 76);

  fill(120, 190, 255);
  square(468, 58, 84);

  fill(190, 160, 255);
  triangle(90, 232, 40, 318, 140, 318);

  fill(255, 150, 200);
  arc(230, 275, 96, 96, 0, PI + HALF_PI);

  // 線は塗りではなくstrokeの色で描かれる
  stroke(240, 240, 250);
  strokeWeight(3);
  line(325, 240, 415, 312);
  noStroke();

  // 5つ目の数を足すと角が丸くなる
  fill(150, 230, 120);
  square(468, 233, 84, 20);

  // 名前を添える
  fill(200, 205, 225);
  text('circle', 90, 172);
  text('ellipse', 230, 172);
  text('rect', 370, 172);
  text('square', 510, 172);
  text('triangle', 90, 350);
  text('arc', 230, 350);
  text('line', 370, 350);
  text('square（角丸）', 510, 350);
}`;

const STROKE_SKETCH = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(238, 232, 220);

  // 塗りなし。線の太さだけを変えた3つの円
  noFill();
  stroke(40, 52, 80);
  strokeWeight(1);
  circle(200, 200, 330);
  strokeWeight(4);
  circle(200, 200, 250);
  strokeWeight(14);
  circle(200, 200, 160);

  // 四角形の基準を「左上」から「中心」に替える
  rectMode(CENTER);
  stroke(206, 84, 58);
  strokeWeight(3);
  square(200, 200, 76);

  // 線なし。塗りだけの円
  noStroke();
  fill(206, 84, 58);
  circle(200, 200, 26);
}`;

const VERTEX_SKETCH = `function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(244, 236, 222);

  // 太陽
  fill(226, 110, 80);
  circle(430, 130, 110);

  // 奥の山。頂点を順に結んだ形になる
  fill(150, 170, 180);
  beginShape();
  vertex(0, 400);
  vertex(0, 260);
  vertex(120, 170);
  vertex(230, 250);
  vertex(340, 150);
  vertex(470, 260);
  vertex(600, 200);
  vertex(600, 400);
  endShape(CLOSE);

  // 手前の山
  fill(52, 72, 96);
  beginShape();
  vertex(0, 400);
  vertex(0, 330);
  vertex(160, 250);
  vertex(300, 340);
  vertex(450, 270);
  vertex(600, 350);
  vertex(600, 400);
  endShape(CLOSE);
}`;

const HSB_SKETCH = `function setup() {
  createCanvas(600, 400);
  // 色相0〜360、彩度0〜100、明るさ0〜100、不透明度0〜100で指定する
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(240, 30, 8);

  // 横に色相、縦に彩度を変えた色見本
  for (let col = 0; col < 12; col++) {
    for (let row = 0; row < 5; row++) {
      let h = col * 30;
      let s = 100 - row * 20;
      fill(h, s, 100);
      circle(col * 50 + 25, row * 70 + 60, 40);
    }
  }
}`;

const LERP_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  // 上の色と下の色を決める
  let top = color(250, 70, 22);
  let bottom = color(18, 65, 96);

  // 1行ずつ、2色のあいだの色で横線を引く
  for (let y = 0; y < height; y++) {
    let amount = y / height;
    stroke(lerpColor(top, bottom, amount));
    line(0, y, width, y);
  }

  // 半透明の円を3枚重ねた太陽
  noStroke();
  fill(45, 25, 100, 22);
  circle(300, 240, 260);
  circle(300, 240, 170);
  circle(300, 240, 90);
}`;

const BLEND_SKETCH = `let additive = true;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  blendMode(BLEND);
  if (additive) {
    // 光の重なり: 暗い地に足し算
    background(0, 0, 5);
    blendMode(ADD);
  } else {
    // インクの重なり: 明るい地に掛け算
    background(40, 8, 96);
    blendMode(MULTIPLY);
  }

  for (let i = 0; i < 3; i++) {
    let angle = TWO_PI * i / 3 + frameCount * 0.01;
    let x = width / 2 + cos(angle) * 70;
    let y = height / 2 + sin(angle) * 70;
    if (additive) {
      // 赤・緑・青の光
      fill(i * 120, 100, 100);
    } else {
      // シアン・マゼンタ・黄のインク
      fill((180 + i * 120) % 360, 100, 100);
    }
    circle(x, y, 220);
  }
}

function mousePressed() {
  // クリックで光とインクを切り替える
  additive = !additive;
}`;

export default function ShapesColor() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 3</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          図形と色
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          円・四角形・線などの基本図形と、色の指定方法を扱います。色は赤・緑・青の強さで決めるRGBに加えて、
          色相・彩度・明るさで決めるHSBを使います。下の枠は、12色の光を色相の順に並べて重ねた完成形です。
          枠の中でマウスを左右に動かすと、輪の広がりが変わります。
        </p>

        <CodePreview
          title="色相環の光（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          使っているのは円だけです。色の決め方（HSB）、透明度、重ね方（blendMode）の3つで、この見た目になります。
          このページで1つずつ確かめます。
        </p>

        <WhyNowBox
          title="なぜ図形と色を先に押さえるのか"
          tags={["circle()", "stroke()", "colorMode(HSB)", "blendMode()"]}
        >
          <p>
            このマニュアルの作品は、どれだけ複雑に見えても、最後は円・線・四角形を画面に置く命令に行き着きます。
            違いを生むのは、どこに・どの色で・どう重ねるかです。色をHSBで扱えるようになると、
            「色相だけを少しずつずらす」といった指定が1行で書けるようになり、以降のページの配色がすべてこの方法になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              基本図形をひととおり置く
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              図形を描く関数は、位置と大きさを数で受け取ります。どの数が何を表すかは図形ごとに決まっています。
              下のスケッチの数字を変えて、形がどう変わるかを確かめてください。
            </p>
            <CodePreview
              title="基本図形の一覧"
              language="js"
              code={SHAPES_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      関数
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      数の意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      circle(x, y, d)
                    </th>
                    <td className="p-3">中心の位置と直径</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      ellipse(x, y, w, h)
                    </th>
                    <td className="p-3">中心の位置、幅、高さ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      rect(x, y, w, h)
                    </th>
                    <td className="p-3">左上の角の位置、幅、高さ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      square(x, y, s)
                    </th>
                    <td className="p-3">左上の角の位置、一辺の長さ</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      triangle(x1, y1, x2, y2, x3, y3)
                    </th>
                    <td className="p-3">3つの頂点の位置</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      arc(x, y, w, h, start, stop)
                    </th>
                    <td className="p-3">
                      中心の位置、幅、高さ、描き始めと描き終わりの角度
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      line(x1, y1, x2, y2)
                    </th>
                    <td className="p-3">始点と終点の位置</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              arc()の角度は右向きを0として、時計回りに測ります。単位はラジアンで、半周が
              <code className={code}>PI</code>、4分の1周が
              <code className={code}>HALF_PI</code>、1周が
              <code className={code}>TWO_PI</code>
              です。公式リファレンスは「Arcs are always drawn clockwise from
              start to stop.」と書いています。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>
                    arc(230, 275, 96, 96, 0, PI + HALF_PI)
                  </code>
                  の最後を<code className={code}>PI</code>
                  にする（下半分の半円になる）
                </li>
                <li>
                  <code className={code}>square(468, 233, 84, 20)</code>
                  の20を42にする（角の丸みが一辺の半分になり、円になる）
                </li>
                <li>
                  <code className={code}>ellipse(230, 100, 120, 70)</code>
                  の120と70を同じ数にする（円になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              線と塗りを分けて決める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              図形には「塗り」と「輪郭線」があり、別々に指定します。塗りは
              <code className={code}>fill()</code>、線の色は
              <code className={code}>stroke()</code>、線の太さは
              <code className={code}>strokeWeight()</code>
              です。<code className={code}>noFill()</code>
              で塗りを、<code className={code}>noStroke()</code>
              で線を描かなくなります。これらの設定は、次に変えるまで後続のすべての図形に効きます。
            </p>
            <CodePreview
              title="線の太さと塗りの有無"
              language="js"
              code={STROKE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={code}>rectMode(CENTER)</code>
              を呼ぶと、rect()とsquare()の最初の2つの数が「左上の角」ではなく「中心」の位置になります。
              円と四角形を同じ中心にそろえたいときに使います。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>strokeWeight(14)</code>
                  を40にする（輪が帯になり、印象が重くなる）
                </li>
                <li>
                  <code className={code}>rectMode(CENTER)</code>
                  の行を消す（四角形が右下へずれる）
                </li>
                <li>
                  <code className={code}>background(238, 232, 220)</code>を
                  <code className={code}>background(24, 28, 40)</code>
                  にして、線の色を明るくする
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              頂点を結んで自由な形を作る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              用意された図形にない形は、頂点を順に並べて作ります。
              <code className={code}>beginShape()</code>と
              <code className={code}>endShape()</code>のあいだに
              <code className={code}>vertex(x, y)</code>
              を書くと、その順に結んだ形になります。
              <code className={code}>endShape(CLOSE)</code>
              とすると、最後の頂点と最初の頂点も結ばれます。
            </p>
            <CodePreview
              title="頂点で描く山並み"
              language="js"
              code={VERTEX_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>vertex(340, 150)</code>
                  の150を60にする（奥の山の頂上が高くなる）
                </li>
                <li>
                  手前の山に<code className={code}>vertex(380, 300)</code>
                  を1行足す（稜線に起伏が増える。足す位置で形が変わる）
                </li>
                <li>
                  3つ目の山を、もう1組のbeginShape()〜endShape()で描き足す
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              HSBで色を決める
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ここまでの色は赤・緑・青の強さ（RGB）で指定しました。RGBは「この色を少し淡くしたい」「隣の色相にずらしたい」
              といった調整がしにくい方式です。
              <code className={code}>colorMode(HSB, 360, 100, 100, 100)</code>
              を呼ぶと、以降の色を色相・彩度・明るさで指定できます。
            </p>
            <CodePreview
              title="色相と彩度の色見本"
              language="js"
              code={HSB_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      順番
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      名前
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      範囲と意味
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      1つ目
                    </th>
                    <td className="p-3">色相（Hue）</td>
                    <td className="p-3">
                      0〜360。色の種類を円周上の角度で表す。0が赤、120が緑、240が青
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      2つ目
                    </th>
                    <td className="p-3">彩度（Saturation）</td>
                    <td className="p-3">0〜100。0は無彩色、100は最も鮮やか</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      3つ目
                    </th>
                    <td className="p-3">明るさ（Brightness）</td>
                    <td className="p-3">0〜100。0は黒</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      4つ目
                    </th>
                    <td className="p-3">不透明度</td>
                    <td className="p-3">
                      0〜100。0は透明、100は不透明。省くと不透明になる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              colorMode()に渡した360・100・100・100は、それぞれの数の最大値です。この範囲は自分で決められるので、
              ほかの人のスケッチを読むときは、最初にcolorMode()の行を確認します。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>fill(h, s, 100)</code>
                  の100を60にする（全体が暗く落ち着く）
                </li>
                <li>
                  <code className={code}>let h = col * 30</code>を
                  <code className={code}>let h = 180 + col * 5</code>
                  にする（青緑から青までの狭い範囲だけの配色になる）
                </li>
                <li>
                  <code className={code}>let s = 100 - row * 20</code>を
                  <code className={code}>let s = 40</code>
                  にする（淡い色だけの見本になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              透明度と、2色のあいだの色
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              色の4つ目の数を小さくすると半透明になり、下の色が透けて見えます。薄い色を何枚も重ねると、
              重なった所ほど濃くなり、やわらかい光や影になります。
              <code className={code}>lerpColor(a, b, amount)</code>
              は2つの色のあいだの色を返す関数で、amountが0ならa、1ならb、0.5ならその中間です。
              少しずつamountを変えながら線を引くと、グラデーションになります。
            </p>
            <CodePreview
              title="グラデーションと半透明の重ね"
              language="js"
              code={LERP_SKETCH}
            />
            <InfoBox type="warning" title="あいだの色は、colorModeで変わる">
              <p>
                lerpColor()が返す「あいだの色」は、1通りに決まっているわけではありません。公式リファレンスは「The
                way that colors are interpolated depends on the current
                colorMode() or on the passed options
                object.」と書いています。HSBのときは色相の輪に沿って補間するので、
                青と橙のあいだに紫や赤が現れます。RGBのときは赤・緑・青の強さをそれぞれ補間するので、この2色では
                あいだはくすんだ色になります。思った色と違うときは、colorMode()を確認してください。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>color(18, 65, 96)</code>
                  の18を180にする（下の色が青緑になり、あいだの色も変わる）
                </li>
                <li>
                  <code className={code}>fill(45, 25, 100, 22)</code>
                  の22を60にする（重なりの段がはっきり見える）
                </li>
                <li>
                  <code className={code}>let amount = y / height</code>を
                  <code className={code}>
                    let amount = (y / height) * (y / height)
                  </code>
                  にする（上の色が広く残り、下で急に変わる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              blendModeで重ね方を変える
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              通常は、あとから描いた図形が下の絵を上書きします。
              <code className={code}>blendMode()</code>
              を呼ぶと、新しく描く色と、すでにある色の混ぜ方を変えられます。
              <code className={code}>ADD</code>
              は色の値を足すので、重なるほど明るくなります。光を重ねた見た目になり、暗い背景に向きます。
              <code className={code}>MULTIPLY</code>
              は色の値を掛けるので、重なるほど暗くなります。インクや色セロファンを重ねた見た目になり、明るい背景に向きます。
              枠をクリックすると2つが切り替わります。
            </p>
            <CodePreview
              title="光の重なりとインクの重なり"
              language="js"
              code={BLEND_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      モード
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      混ぜ方
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      向いている背景
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      BLEND
                    </th>
                    <td className="p-3">上書きする（最初の状態）</td>
                    <td className="p-3">どちらでも</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      ADD
                    </th>
                    <td className="p-3">足す。重なるほど明るい</td>
                    <td className="p-3">暗い背景</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      SCREEN
                    </th>
                    <td className="p-3">明るくなるが、ADDより白く飛びにくい</td>
                    <td className="p-3">暗い背景</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      MULTIPLY
                    </th>
                    <td className="p-3">掛ける。重なるほど暗い</td>
                    <td className="p-3">明るい背景</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title="background()の前にBLENDへ戻す">
              <p>
                blendMode()の設定は、次に変えるまで残ります。background()にも効くので、ADDのまま暗い色で塗り直すと、
                前のフレームに暗い色が足されるだけで絵が消えず、少しずつ明るくなって、やがて画面全体が白く飛びます。
                draw()の先頭で<code className={code}>blendMode(BLEND)</code>
                に戻してからbackground()を呼ぶ、という順番を決まりにしておくと安全です。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>blendMode(ADD)</code>を
                  <code className={code}>blendMode(SCREEN)</code>
                  にする（重なりの白がやわらぐ）
                </li>
                <li>
                  <code className={code}>cos(angle) * 70</code>と
                  <code className={code}>sin(angle) * 70</code>
                  の70を100にする（3つの円が離れ、重なりが小さくなる）
                </li>
                <li>
                  <code className={code}>fill(i * 120, 100, 100)</code>
                  の彩度100を50にする（淡い光の重なりになる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="3つの光を重ねる"
              description="___ を埋めて、色をHSBで指定できるようにし、重なった所が明るくなる重ね方にしてください。埋めるとプレビューが動きます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(___, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  blendMode(BLEND);
  background(240, 40, 8);
  blendMode(___);

  fill(200, 80, 100, 60);
  circle(150, 130, 160);
  fill(300, 80, 100, 60);
  circle(250, 130, 160);
  fill(50, 80, 100, 60);
  circle(200, 200, 160);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  blendMode(BLEND);
  background(240, 40, 8);
  blendMode(ADD);

  fill(200, 80, 100, 60);
  circle(150, 130, 160);
  fill(300, 80, 100, 60);
  circle(250, 130, 160);
  fill(50, 80, 100, 60);
  circle(200, 200, 160);
}`}
              keywords={["HSB", "ADD"]}
              hints={[
                "色相・彩度・明るさで色を指定する方式の名前を、colorMode()の最初に書きます。3文字の大文字です",
                "色の値を足し合わせる重ね方の名前を、blendMode()に書きます。足し算を表す英単語の大文字です",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の「色相環の光」は、数を少し変えるだけで別の作品になります。気に入った状態になったら、
              枠の下の「PNG保存」で画像にできます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>let count = 12</code>
                を3にする。光の三原色に近い重なりになる。60にすると、なめらかな光の輪になる
              </li>
              <li>
                <code className={code}>let h = 360 * i / count</code>を
                <code className={code}>let h = 180 + 80 * i / count</code>
                にする。青緑から紫までの範囲に絞った配色になる
              </li>
              <li>
                2か所の<code className={code}>circle(</code>を
                <code className={code}>square(</code>
                に替え、setup()に<code className={code}>rectMode(CENTER)</code>
                を足す。四角い光の重なりになる
              </li>
              <li>
                背景を<code className={code}>background(40, 8, 96)</code>
                に、<code className={code}>blendMode(ADD)</code>を
                <code className={code}>blendMode(MULTIPLY)</code>
                に替える。紙に刷った版画のような印象になる
              </li>
            </ul>
            <InfoBox type="success" title="配色を決めるときの手がかり">
              <p>
                色相を広く使うとにぎやかに、狭い範囲に絞ると落ち着いた印象になります。まず色相の範囲を決め、
                次に彩度と明るさをそろえる、という順で決めると、色どうしがなじみます。配色と構図の考え方は「美しく仕上げる」のページで詳しく扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="colorMode(HSB, 360, 100, 100, 100)のとき、fill(120, 100, 100)はどんな色？"
              options={[
                { label: "鮮やかな赤" },
                { label: "鮮やかな緑", correct: true },
                { label: "鮮やかな青" },
                { label: "灰色" },
              ]}
              explanation="1つ目の数は色相で、0が赤、120が緑、240が青です。彩度と明るさがどちらも最大の100なので、鮮やかな緑になります。"
            />
            <Quiz
              question="blendMode(ADD)のままdraw()の先頭でbackground()を呼ぶと、どうなる？"
              options={[
                { label: "いつもどおり背景色で塗り直される" },
                { label: "エラーになる" },
                {
                  label:
                    "背景色が前のフレームに足されるだけで、絵が消えずに明るくなっていく",
                  correct: true,
                },
                { label: "キャンバスが透明になる" },
              ]}
              explanation="blendMode()の設定はbackground()にも効きます。塗り直す前にblendMode(BLEND)へ戻すと、通常どおり上書きされます。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "図形の関数は位置と大きさを数で受け取る。自由な形はbeginShape()・vertex()・endShape()で作る",
                  "塗りはfill()、線はstroke()とstrokeWeight()。noFill()・noStroke()で片方だけにできる",
                  "colorMode(HSB, 360, 100, 100, 100)で、色相・彩度・明るさ・不透明度による指定になる",
                  "lerpColor()は2色のあいだの色を返す。あいだの色はcolorModeによって変わる",
                  "blendMode(ADD)は光、blendMode(MULTIPLY)はインクの重なり。塗り直す前にBLENDへ戻す",
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
                  title: "p5.js Reference: colorMode()",
                  url: "https://p5js.org/reference/p5/colorMode/",
                  description: "RGB・HSBなどの色の方式と、数の範囲の決め方",
                },
                {
                  title: "p5.js Reference: blendMode()",
                  url: "https://p5js.org/reference/p5/blendMode/",
                  description: "ADD・MULTIPLY・SCREENなど、重ね方の一覧と説明",
                },
                {
                  title: "p5.js Reference: lerpColor()",
                  url: "https://p5js.org/reference/p5/lerpColor/",
                  description:
                    "2色のあいだの色を求める関数。補間がcolorModeに従うことも書かれている",
                },
                {
                  title: "p5.js Reference: arc()",
                  url: "https://p5js.org/reference/p5/arc/",
                  description: "円弧の角度の測り方と、閉じ方の指定",
                },
                {
                  title: "p5.js Reference: beginShape()",
                  url: "https://p5js.org/reference/p5/beginShape/",
                  description: "頂点を並べて形を作る方法",
                },
                {
                  title: "p5.js Tutorials: Color Gradients",
                  url: "https://p5js.org/tutorials/color-gradients/",
                  description:
                    "lerpColor()でグラデーションを作る公式チュートリアル",
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
