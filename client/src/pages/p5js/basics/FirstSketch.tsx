import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。マウスを動かさなくても筆先が動き、開いた時点で絵ができていく
const HERO_SKETCH = `let hue = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(240, 30, 8);
}

function draw() {
  // マウスが枠の外にあるあいだは、筆先が自動で動く
  let x = width / 2 + cos(frameCount * 0.021) * 220;
  let y = height / 2 + sin(frameCount * 0.034) * 140;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    x = mouseX;
    y = mouseY;
  }

  // 少しずつ色相を進めながら、半透明の円を重ねる
  hue = (hue + 0.8) % 360;
  noStroke();
  for (let i = 0; i < 6; i++) {
    fill(hue, 70, 100, 12);
    circle(x + random(-18, 18), y + random(-18, 18), random(6, 46));
  }
}

function mousePressed() {
  // クリックで描き直す
  background(240, 30, 8);
}`;

const MINIMAL_SKETCH = `function setup() {
  // 最初に1回だけ実行される
  createCanvas(400, 300);
}

function draw() {
  // 1秒に約60回、くり返し実行される
  background(20, 24, 48);
  fill(255, 120, 180);
  noStroke();
  circle(200, 150, 120);
}`;

const COORDINATE_SKETCH = `function setup() {
  createCanvas(400, 300);
  textSize(14);
}

function draw() {
  background(20, 24, 48);

  // マウスの位置に十字線を引く
  stroke(120, 200, 255);
  line(mouseX, 0, mouseX, height);
  line(0, mouseY, width, mouseY);

  // いまの座標を文字で出す
  noStroke();
  fill(255);
  text('x: ' + round(mouseX) + '  y: ' + round(mouseY), 12, 24);
  text('(0, 0)', 4, 44);
  text('(' + width + ', ' + height + ')', width - 84, height - 8);
}`;

const TRAIL_SKETCH = `function setup() {
  createCanvas(400, 300);
  background(20, 24, 48);
}

function draw() {
  // 次の行の // を消すと、毎フレーム塗り直されて軌跡が消える
  // background(20, 24, 48);
  noStroke();
  fill(255, 200, 80, 60);
  circle(mouseX, mouseY, 30);
}`;

export default function FirstSketch() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 2</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          はじめてのスケッチ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          p5.jsのプログラムは「スケッチ」と呼びます。このページでは、スケッチを形づくる2つの関数
          setup()とdraw()、画面上の位置を表す座標を確認し、マウスで描ける筆を作ります。
          下の枠はそのまま動く完成形です。枠の中でマウスを動かし、クリックで描き直せます。
        </p>

        <CodePreview
          title="光の筆（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          左のコードは編集できます。書き換えると右の絵に反映されます。枠の下の「PNG保存」で、
          いま見えている絵を画像として保存できます。
        </p>

        <WhyNowBox
          title="なぜここから始めるのか"
          tags={["setup()", "draw()", "createCanvas()", "mouseX / mouseY"]}
        >
          <p>
            このマニュアルに出てくる作品は、フラクタルも流体のシミュレーションも、すべて
            setup()とdraw()の2つの関数の中に書かれています。この2つの役割と座標の向きが分かれば、
            以降のページのコードはどれも読めるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              setup()は1回、draw()はくり返し
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              スケッチには決まった名前の関数を2つ書きます。
              <code className={code}>setup()</code>
              は開始時に1回だけ呼ばれ、キャンバスの大きさなどの準備を書きます。
              <code className={code}>draw()</code>
              はそのあとくり返し呼ばれ、1回呼ばれるごとに1枚の絵を描きます。この1枚を「フレーム」と呼びます。
            </p>
            <CodePreview
              title="最小のスケッチ"
              language="js"
              code={MINIMAL_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書いたもの
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
                      createCanvas(400, 300)
                    </th>
                    <td className="p-3">
                      幅400・高さ300ピクセルのキャンバスを作る
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      background(20, 24, 48)
                    </th>
                    <td className="p-3">
                      全体を1色で塗る。3つの数は赤・緑・青の強さ（0〜255）
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      fill(255, 120, 180)
                    </th>
                    <td className="p-3">これ以降に描く図形の塗り色を決める</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      noStroke()
                    </th>
                    <td className="p-3">図形の輪郭線を描かない</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      circle(200, 150, 120)
                    </th>
                    <td className="p-3">中心が(200, 150)、直径120の円を描く</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>circle(200, 150, 120)</code>
                  の120を300にする（円がキャンバスからはみ出す）
                </li>
                <li>
                  <code className={code}>fill(255, 120, 180)</code>
                  の3つの数を入れ替える（色が変わる）
                </li>
                <li>
                  <code className={code}>circle(...)</code>
                  の行をコピーして、位置と大きさを変えた円を増やす
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="仕様の「60回」と実測の回数">
              <p>
                公式リファレンスはdraw()について「By default, draw() tries to
                run 60 times per second. The actual rate depends on many
                factors.」と書いています。60回は目標値で、実際の回数は端末の性能や描く量で下がります。
                動きの速さを回数に頼らず決める方法は、落下のシミュレーションのページで扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              座標は左上が原点、yは下向き
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キャンバス上の位置は(x, y)の2つの数で表します。原点(0,
              0)は左上の角で、xは右へ、yは下へ進むほど大きくなります。数学のグラフとはyの向きが逆です。
              <code className={code}>mouseX</code>と
              <code className={code}>mouseY</code>
              には、いまのマウスの位置が入っています。枠の中でマウスを動かして、数の変わり方を確かめてください。
            </p>
            <CodePreview
              title="座標を確かめる"
              language="js"
              code={COORDINATE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              <code className={code}>width</code>と
              <code className={code}>height</code>
              はキャンバスの幅と高さです。位置を
              <code className={code}>width / 2</code>
              のように書いておくと、キャンバスの大きさを変えても中央のままになります。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              塗り直さなければ、絵は残る
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キャンバスは描いたものを覚えています。draw()の中で
              <code className={code}>background()</code>
              を呼ぶと毎フレーム塗り直されて動く図形になり、呼ばなければ前のフレームの上に重なって軌跡が残ります。
              冒頭の筆は、この「塗り直さない」を使っています。
            </p>
            <CodePreview
              title="軌跡を残す・消す"
              language="js"
              code={TRAIL_SKETCH}
            />
            <InfoBox type="info" title="4つ目の数は透明度">
              <p>
                <code className={code}>fill(255, 200, 80, 60)</code>
                の4つ目の数は不透明度（0が透明、255が不透明）です。半透明の図形を重ねると、重なった所ほど濃くなります。
                色の指定方法は次のページで詳しく扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="マウスについてくる円"
              description="___ を埋めて、円がマウスの位置に描かれるようにしてください。埋めるとプレビューが動きます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  background(20, 24, 48);
}

function draw() {
  noStroke();
  fill(120, 220, 255, 40);
  circle(___, ___, 36);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  background(20, 24, 48);
}

function draw() {
  noStroke();
  fill(120, 220, 255, 40);
  circle(mouseX, mouseY, 36);
}`}
              keywords={["mouseX", "mouseY"]}
              hints={[
                "円の中心のx座標に、マウスの横位置が入った変数mouseXを書きます",
                "円の中心のy座標に、マウスの縦位置が入った変数mouseYを書きます",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              冒頭の「光の筆」を自分の筆に作り替えます。変える場所は少しで足ります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>circle(...)</code>を
                <code className={code}>square(...)</code>
                に替える。筆先が四角になる
              </li>
              <li>
                <code className={code}>random(-18, 18)</code>
                の幅を広げる。筆がかすれたように散る
              </li>
              <li>
                <code className={code}>hue + 0.8</code>
                の0.8を5にする。色の移り変わりが速くなる
              </li>
              <li>
                <code className={code}>background(240, 30, 8)</code>
                を明るい色に替える。紙に描いたような印象になる
              </li>
            </ul>
            <InfoBox type="success" title="自分の環境で続ける">
              <p>
                このマニュアルのスケッチは、公式の
                <a
                  href="https://editor.p5js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  p5.js Web Editor
                </a>
                にそのまま貼って動かせます。インストールは要りません。アカウントを作ると保存と共有ができます。
                このマニュアルはp5.jsの2.x系で動かしています。Web
                Editorで動きが違うときは、エディタの設定でp5.jsの版を確認してください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="draw()の中でbackground()を呼ばないと、どうなる？"
              options={[
                { label: "エラーになって何も描かれない" },
                {
                  label:
                    "前のフレームで描いたものが残り、その上に重ねて描かれる",
                  correct: true,
                },
                { label: "自動で白く塗り直される" },
                { label: "draw()が1回しか実行されなくなる" },
              ]}
              explanation="キャンバスは描いた内容を保持します。background()で塗り直さない限り前のフレームの絵が残るので、動く図形は軌跡になります。"
            />
            <Quiz
              question="createCanvas(400, 300)のキャンバスで、右下の角に最も近い座標は？"
              options={[
                { label: "(0, 0)" },
                { label: "(400, 0)" },
                { label: "(0, 300)" },
                { label: "(400, 300)", correct: true },
              ]}
              explanation="原点(0, 0)は左上で、xは右へ、yは下へ大きくなります。右下の角は(width, height)、つまり(400, 300)です。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "setup()は開始時に1回、draw()はくり返し呼ばれる",
                  "座標の原点は左上。xは右へ、yは下へ大きくなる",
                  "mouseX・mouseYでマウスの位置、width・heightでキャンバスの大きさが取れる",
                  "background()で塗り直すと動きに、塗り直さないと軌跡になる",
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
                  title: "p5.js Reference: setup()",
                  url: "https://p5js.org/reference/p5/setup/",
                  description: "開始時に1回呼ばれる関数の仕様",
                },
                {
                  title: "p5.js Reference: draw()",
                  url: "https://p5js.org/reference/p5/draw/",
                  description:
                    "くり返し呼ばれる関数の仕様。既定の回数と実際の回数の違いも書かれている",
                },
                {
                  title: "p5.js Tutorials: Get Started",
                  url: "https://p5js.org/tutorials/get-started/",
                  description:
                    "Web Editorで最初のスケッチを作る公式チュートリアル",
                },
                {
                  title: "p5.js Web Editor",
                  url: "https://editor.p5js.org/",
                  description:
                    "ブラウザだけでスケッチを書いて共有できる公式エディタ",
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
