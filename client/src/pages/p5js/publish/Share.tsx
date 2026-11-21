import { Link } from "wouter";
import CodePreview from "@/components/CodePreview";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";
const link = "text-primary underline";

// このページの完成形。題名・作者名・seedを隅に入れた、そのまま公開できる形のポスター
const HERO_SKETCH = `// 題名: 風の地図
// 作者: your name
// 日付: 2026-01-15
// ライセンス: CC BY-NC-SA 4.0
// クリック: 別の案 / sキー: PNGで保存

const TITLE = '風の地図';
const AUTHOR = 'your name';
const MARGIN = 36;
const TOTAL = 560;
let seed = 12;
let drawn = 0;
let hue = 0;
let sun;

function setup() {
  createCanvas(420, 560);
  colorMode(HSB, 360, 100, 100, 100);
  newPoster();
}

function newPoster() {
  // seedの番号で、色と円の位置と線の流れが決まる
  randomSeed(seed * 1000);
  noiseSeed(seed);
  drawn = 0;
  hue = random(360);
  sun = { x: random(130, 290), y: random(150, 300), r: random(70, 110) };

  // 紙の色で塗り、円を置く
  background(42, 9, 95);
  noStroke();
  fill((hue + 190) % 360, 48, 92);
  circle(sun.x, sun.y, sun.r * 2);
  drawSignature();

  // 画面を見られない人のための説明文
  describe('生成りの紙に、風の流れのような細い線が一面に引かれ、大きな円が1つ浮かんでいるポスター。左下に題名、右下に作者名とseedの番号がある');
}

function draw() {
  // 1フレームに8本ずつ線を足し、決めた本数で止める
  if (drawn >= TOTAL) return;
  for (let i = 0; i < 8; i++) {
    drawStream();
    drawn += 1;
  }
}

// ノイズの向きに沿って進む線を1本引く
function drawStream() {
  let x = random(MARGIN, width - MARGIN);
  let y = random(MARGIN, height - MARGIN - 44);
  const pick = random();
  strokeWeight(random(0.6, 1.5));
  for (let s = 0; s < 90; s++) {
    const a = noise(x * 0.005, y * 0.005) * TWO_PI * 2;
    const nx = x + cos(a) * 3;
    const ny = y + sin(a) * 3;
    if (nx < MARGIN || nx > width - MARGIN) break;
    if (ny < MARGIN || ny > height - MARGIN - 44) break;
    // 円の中では紙の色、外ではインクの色で引く
    if (dist(nx, ny, sun.x, sun.y) < sun.r) stroke(42, 9, 95, 75);
    else if (pick < 0.7) stroke(hue, 55, 38, 60);
    else stroke((hue + 30) % 360, 60, 68, 65);
    line(x, y, nx, ny);
    x = nx;
    y = ny;
  }
}

// 署名: 題名・作者名・seedを隅に小さく入れる
function drawSignature() {
  noStroke();
  fill(0, 0, 20);
  textSize(15);
  textAlign(LEFT, BASELINE);
  text(TITLE, MARGIN, height - 34);
  fill(0, 0, 38);
  textSize(12);
  textAlign(RIGHT, BASELINE);
  text(AUTHOR + '  /  seed ' + seed, width - MARGIN, height - 34);
}

function mousePressed() {
  seed += 1;
  newPoster();
}

function keyPressed() {
  if (key === 's') saveCanvas('kaze-no-chizu-seed-' + seed, 'png');
}`;

const DESCRIBE_SKETCH = `// クリックで夕方と夜が入れ替わり、説明文も変わる
let night = false;

function setup() {
  createCanvas(480, 320);
  colorMode(HSB, 360, 100, 100, 100);
  updateDescription();
}

function updateDescription() {
  // キャンバス全体の説明
  // LABELを付けると、確認用に説明文が画面にも表示される
  if (night) {
    describe('夜の海。濃い青の空に白い月が浮かび、水面に月の光が細い帯になって揺れている', LABEL);
    // 絵の中の要素ごとの説明
    describeElement('空の円', '白い月。画面の中央やや上にある', LABEL);
  } else {
    describe('夕方の海。橙色の空に赤い太陽が浮かび、水面に夕日の光が細い帯になって揺れている', LABEL);
    describeElement('空の円', '赤い太陽。画面の中央やや上にある', LABEL);
  }
}

function draw() {
  const skyHue = night ? 235 : 22;
  const lightHue = night ? 50 : 8;
  noStroke();
  // 空: 下へ行くほど明るい帯を重ねる
  for (let i = 0; i < 10; i++) {
    fill(skyHue, night ? 60 : 55, (night ? 14 : 70) + i * (night ? 2 : 3));
    rect(0, i * 19, width, 20);
  }
  fill(lightHue, night ? 8 : 70, 100);
  circle(240, 112, 76);

  // 海
  fill(night ? 240 : 255, 45, night ? 10 : 26);
  rect(0, 190, width, 130);
  // 水面に映る光: 下へ行くほど幅が広がり、左右に揺れる
  stroke(lightHue, night ? 10 : 60, 100, 70);
  strokeWeight(2);
  for (let i = 0; i < 16; i++) {
    const y = 198 + i * 8;
    const w = 14 + i * 5;
    const shift = sin(frameCount * 0.04 + i * 0.8) * (4 + i);
    line(240 - w + shift, y, 240 + w + shift, y);
  }
}

function mousePressed() {
  night = !night;
  updateDescription();
}`;

const TEXT_OUTPUT_SKETCH = `function setup() {
  createCanvas(400, 240);
  // 描いた図形の一覧を、p5.jsが自動で文章にする
  // LABELを付けると、その文章が画面にも表示される
  textOutput(LABEL);
}

function draw() {
  background(30, 40, 90);
  noStroke();
  fill(255, 200, 80);
  circle(110, 110, 110);
  fill(120, 200, 255);
  square(220, 60, 100);
  fill(255, 120, 180);
  triangle(60, 220, 200, 220, 130, 150);
}`;

const SERIES_SKETCH = `// 1つのアルゴリズムから、番号ちがいの連作を作る
// クリック: 次の6枚
let first = 1;

function setup() {
  createCanvas(600, 420);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(42, 9, 95);
  for (let i = 0; i < 6; i++) {
    const cx = 100 + (i % 3) * 200;
    const cy = 100 + floor(i / 3) * 205;
    piece(cx, cy, first + i);
  }
}

// 1枚ぶんを描く。変わるのはseedだけ
function piece(cx, cy, seed) {
  randomSeed(seed * 1000);
  noiseSeed(seed);
  const hue = random(360);
  const rings = floor(random(7, 18));
  const wobble = random(0.4, 2.2);
  const gap = 72 / rings;

  noFill();
  stroke(hue, 55, 42);
  strokeWeight(1);
  for (let ring = 1; ring <= rings; ring++) {
    beginShape();
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * TWO_PI;
      const n = noise(2 + cos(a) * wobble, 2 + sin(a) * wobble, ring * 0.08);
      const r = ring * gap * (0.6 + n * 0.75);
      vertex(cx + cos(a) * r, cy + sin(a) * r);
    }
    endShape(CLOSE);
  }

  noStroke();
  fill(0, 0, 30);
  textSize(12);
  textAlign(CENTER);
  text('輪No.' + seed, cx, cy + 96);
}

function mousePressed() {
  first += 6;
}`;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>風の地図</title>
    <!-- p5.js本体を読み込む -->
    <script src="https://cdn.jsdelivr.net/npm/p5@2.4.0/lib/p5.min.js"></script>
    <!-- 自分のスケッチを読み込む -->
    <script src="sketch.js"></script>
  </head>
  <body>
    <main></main>
  </body>
</html>`;

const HEADER_COMMENT = `// 題名: 風の地図
// 作者: your name
// 日付: 2026-01-15
// ライセンス: CC BY-NC-SA 4.0
//
// 参考にしたもの:
// - 流れに沿って線を引く考え方（フローフィールド）
//   The Nature of Code / Daniel Shiffman  https://natureofcode.com/
// - 変えたところ: 円の中だけ線の色を紙の色にした。配色は自分で決めた`;

const JOURNEY: { href: string; title: string; text: string }[] = [
  {
    href: "/p5js/basics/first-sketch",
    title: "描いて動かす",
    text: "setup()とdraw()、色、くり返し、座標変換",
  },
  {
    href: "/p5js/math/trigonometry",
    title: "数学で描く",
    text: "イージング、sinとcos、ベクトルと力",
  },
  {
    href: "/p5js/random/noise",
    title: "偶然を設計する",
    text: "乱数、ノイズ、パーティクルと群れ",
  },
  {
    href: "/p5js/media/image-pixels",
    title: "メディアを素材にする",
    text: "画像、文字、カメラ、音",
  },
  {
    href: "/p5js/systems/fractals",
    title: "生成のアルゴリズム",
    text: "フラクタル、L-system、セルオートマトン、仕上げ",
  },
  {
    href: "/p5js/three-d/webgl-basics",
    title: "3D表現",
    text: "立体、ライト、シェーダー",
  },
  {
    href: "/p5js/game/game-loop",
    title: "ゲームを作る",
    text: "状態、入力、当たり判定、演出",
  },
  {
    href: "/p5js/lab/falling-bodies",
    title: "研究の現場を再現する",
    text: "落下、流体、建物の揺れ、音響",
  },
  {
    href: "/p5js/publish/export",
    title: "作品を世に出す",
    text: "書き出しと公開",
  },
];

export default function Share() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 29</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          公開する
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          作ったスケッチを、ほかの人が見られる場所に置きます。公開先の選び方、ライセンスとクレジットの書き方、画面を見られない人のための説明文、そして作り続けるための習慣を扱います。
          下の枠は、題名・作者名・seedの番号を隅に入れたポスターです。クリックすると別の案が描かれます。
        </p>

        <CodePreview
          title="風の地図（署名入りの完成作品）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          コードの
          <code className={code}>const AUTHOR = 'your name'</code>
          を自分の名前に、
          <code className={code}>TITLE</code>
          を自分の題名に書き換えてください。枠をクリックしてからsキーを押すと、番号つきのPNGが保存されます。この1枚は、書き換えた時点であなたの作品です。
        </p>

        <WhyNowBox
          title="なぜ公開まで扱うのか"
          tags={["describe()", "ライセンス", "クレジット", "連作"]}
        >
          <p>
            スケッチは、人に見せたときに初めて返事が返ってきます。感想、質問、作り替えた版。それらが次に作るものを決める材料になります。
            公開に必要な手順は多くありません。置く場所を選び、名前と条件を書き、説明文を付ける。このページを読み終えると、その3つがそろいます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              公開先を選ぶ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              このマニュアルのスケッチはグローバルモードで書いてあるので、どの公開先にもコードをそのまま貼れます。行き先によって、見せられるものと手間が変わります。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      公開先
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      見せられるもの
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      向いている場面
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      p5.js Web Editor
                    </th>
                    <td className="p-3">
                      動くスケッチとコード。共有リンクと埋め込みが作れる
                    </td>
                    <td className="p-3">
                      最初の公開。コードを見てもらいたいとき
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      OpenProcessing
                    </th>
                    <td className="p-3">動くスケッチとコード</td>
                    <td className="p-3">
                      ほかの人の作品と並べて見てもらいたいとき
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      自分のサイト
                    </th>
                    <td className="p-3">
                      動くスケッチ。見せ方をすべて自分で決められる
                    </td>
                    <td className="p-3">作品集を作るとき。長く残したいとき</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      SNS
                    </th>
                    <td className="p-3">画像、GIF、短い動画</td>
                    <td className="p-3">
                      多くの人の目に触れさせたいとき。動くスケッチへのリンクを添える
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              p5.js Web Editorで共有する
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              <a
                href="https://editor.p5js.org/"
                target="_blank"
                rel="noopener noreferrer"
                className={link}
              >
                p5.js Web Editor
              </a>
              は公式のエディタです。アカウントを作ってスケッチを保存すると、メニューのFileからShareを選んで共有用のリンクを取り出せます。公式チュートリアルは共有の方法を3つ挙げています。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      種類
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      公式の説明（原文）
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      使いどころ
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      Embed
                    </th>
                    <td className="p-3">
                      Add your p5.js sketch to a website or blog that uses html
                      (does not show code).
                    </td>
                    <td className="p-3">ブログや自分のサイトに埋め込む</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      Fullscreen
                    </th>
                    <td className="p-3">
                      Share your project with a link (does not show code).
                    </td>
                    <td className="p-3">作品だけを見せる。SNSに貼る</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      Edit
                    </th>
                    <td className="p-3">
                      Share your project code in the p5.js editor with a link.
                    </td>
                    <td className="p-3">
                      コードごと見せる。質問するとき、教えるとき
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title="貼ったら動きが違うとき">
              <p>
                このマニュアルのスケッチはp5.jsの2.x系で動かしています。仕様では同じコードは同じに動きますが、実測では公開先が読み込むp5.jsの版によって結果が変わることがあります。1.x系と2.x系では書き方が違う箇所があるためです。公開先の設定でp5.jsの版を確かめ、2.x系を選んでください。
              </p>
            </InfoBox>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              自分のサイトに置く
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              自分のサイトに置く場合、必要なファイルは2つです。p5.js本体を読み込むindex.htmlと、スケッチを書いたsketch.jsです。p5.js本体は、公式のダウンロードページに載っているCDNのURLを
              <code className={code}>&lt;script&gt;</code>
              タグで読み込みます。この2つのファイルを、静的なファイルを配信できる場所に置けば公開できます。
            </p>
            <CodeBlock
              language="html"
              title="index.html（最小構成）"
              code={INDEX_HTML}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              URLの中の
              <code className={code}>p5@2.4.0</code>
              は版の番号です。番号を書いておくと、p5.jsが新しくなっても作品の動きが変わりません。長く残したい作品では、p5.min.jsをダウンロードして自分のサイトに一緒に置く方法もあります。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              SNSに載せる
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              SNSではスケッチそのものは動かせないので、
              <Link href="/p5js/publish/export" className={link}>
                前のページ
              </Link>
              で書き出した画像・GIF・動画を載せます。動く版へのリンク、題名、使った技法をひとこと添えると、見た人がたどれます。画像には代替テキスト（説明文）を付けてください。書き方はこのページの後半で扱います。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              発表の場とコミュニティ
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              1人で作り続けるより、同じお題や同じタグで作っている人がいる場所に出すほうが、見てもらいやすく、続けやすくなります。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      場
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      どんなものか
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      Genuary
                    </th>
                    <td className="p-3">
                      1月のあいだ、1日に1つのお題に沿ってコードで作品を作る催し。公式サイトは「GENUARY
                      is an artificially generated month of time where we build
                      code that makes beautiful
                      things.」と説明している。使う言語や道具は自由で、
                      <code className={code}>#genuary</code>
                      のタグで投稿する
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      #つぶやきProcessing
                    </th>
                    <td className="p-3">
                      SNSの1投稿に収まる短いコードで作品を作り、コードと一緒に投稿するハッシュタグ
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      Processing Community Day
                    </th>
                    <td className="p-3">
                      各地のコミュニティが開く集まり。Processingの公式サイトは「events
                      organized by local communities」と書いている
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      p5.js公式サイトのCommunity
                    </th>
                    <td className="p-3">
                      世界の利用者が作ったスケッチ、ライブラリ、催しが紹介されているページ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="お題は守らなくてよい">
              <p>
                Genuaryの公式サイトは、お題に厳密に従う必要も、毎日投稿する必要もないと書いています。FAQには「Genuary
                is not a
                competition.」とあります。1つだけ参加する、あとから作る、という関わり方で十分です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ライセンスとクレジット
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              公開するときは、「誰が作ったか」と「ほかの人がどう使ってよいか」を書いておきます。書いていない作品は、見た人が使ってよいのか判断できません。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              p5.js本体のライセンス
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              p5.js本体はLGPL 2.1で公開されています。公式サイトには「The p5.js
              library is free software; you can redistribute it and/or modify it
              under the terms of the GNU Lesser General Public License as
              published by the Free Software Foundation, version
              2.1.」と書かれています。この条件が定めているのはp5.js本体の扱いです。p5.jsを読み込んで動かす自分のスケッチと、それが描いた絵をどういう条件で公開するかは、作者である自分が決めます。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              自分の作品の条件を決める
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              条件を自分で文章にするのは大変なので、決まった型を使います。Creative
              Commons（CC）ライセンスは、作品の利用条件を4つの要素の組み合わせで示す型です。公式サイトは「There
              are six different license types, listed from most to least
              permissive here」として次の6つを挙げています。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      ライセンス
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      改変
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      商用利用
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      条件
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      CC BY
                    </th>
                    <td className="p-3">できる</td>
                    <td className="p-3">できる</td>
                    <td className="p-3">作者を表示する</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      CC BY-SA
                    </th>
                    <td className="p-3">できる</td>
                    <td className="p-3">できる</td>
                    <td className="p-3">
                      作者を表示する。改変したものも同じ条件で公開する
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      CC BY-ND
                    </th>
                    <td className="p-3">できない</td>
                    <td className="p-3">できる</td>
                    <td className="p-3">
                      作者を表示する。そのままの形でのみ配れる
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      CC BY-NC
                    </th>
                    <td className="p-3">できる</td>
                    <td className="p-3">できない</td>
                    <td className="p-3">作者を表示する</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      CC BY-NC-SA
                    </th>
                    <td className="p-3">できる</td>
                    <td className="p-3">できない</td>
                    <td className="p-3">
                      作者を表示する。改変したものも同じ条件で公開する
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      CC BY-NC-ND
                    </th>
                    <td className="p-3">できない</td>
                    <td className="p-3">できない</td>
                    <td className="p-3">
                      作者を表示する。そのままの形でのみ配れる
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              記号の意味は、BYが作者の表示、SAが同じ条件での共有、NCが非商用、NDが改変なしです。迷ったら「自分がほかの人の作品をどう使わせてもらいたいか」から考えると決めやすくなります。p5.jsの公式サイトも、リファレンスとサンプルのページをCC
              BY-NC-SA 4.0で公開しています。
            </p>

            <h3 className="text-xl font-bold text-foreground mt-8 mb-3">
              スケッチの冒頭に書く
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              題名・作者・日付・ライセンスの4つを、スケッチの最初のコメントに書く習慣を付けます。コードがどこへ貼られても、この4行が一緒に付いていきます。ほかの人のコードや解説を参考にしたときは、何を・誰の・どこから参考にし、自分はどこを変えたかを続けて書きます。
            </p>
            <CodeBlock
              language="js"
              title="スケッチ冒頭のコメント"
              code={HEADER_COMMENT}
            />
            <InfoBox type="info" title="参考にすることと、写すこと">
              <p>
                技法（フローフィールド、Boids、L-systemなど）は誰でも使えます。出典を書けば十分です。一方、ほかの人が公開しているコードをそのまま、または少し変えて公開するときは、元の作品のライセンスが許しているかを先に確かめ、作者名と元の場所を書きます。ライセンスが書かれていない作品は、作者に尋ねてから使います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              説明文を付ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              キャンバスに描いた絵は、そのままでは画面を読み上げるソフト（スクリーンリーダー）に何も伝わりません。p5.jsには、絵に説明文を付ける関数が4つあります。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      関数
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      公式リファレンスの説明（原文）
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
                      describe()
                    </th>
                    <td className="p-3">
                      Creates a screen reader-accessible description of the
                      canvas.
                    </td>
                    <td className="p-3">絵の全体を自分の言葉で説明する</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      describeElement()
                    </th>
                    <td className="p-3">
                      Creates a screen reader-accessible description of elements
                      in the canvas.
                    </td>
                    <td className="p-3">
                      絵の中の要素に名前を付けて、1つずつ説明する
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      textOutput()
                    </th>
                    <td className="p-3">
                      Creates a screen reader-accessible description of shapes
                      on the canvas.
                    </td>
                    <td className="p-3">
                      描いた図形の色・位置・大きさを、自動で一覧にする
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th
                      scope="row"
                      className="text-left p-3 font-mono font-normal"
                    >
                      gridOutput()
                    </th>
                    <td className="p-3">
                      Creates a screen reader-accessible description of shapes
                      on the canvas.
                    </td>
                    <td className="p-3">
                      図形の位置を、キャンバスを区切った表の形で伝える
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              基本は
              <code className={code}>describe('説明文')</code>
              です。既定では説明文は画面に表示されず、スクリーンリーダーにだけ伝わります。2つ目の引数に
              <code className={code}>LABEL</code>
              を渡すと、キャンバスの横に文字として表示されます。公式リファレンスは、LABELは読み上げが重複するので開発中の確認にだけ使うよう勧めています。下のスケッチは、確認のためにLABELを付けています。クリックで絵が変わり、説明文も一緒に変わります。
            </p>
            <CodePreview
              title="describe()とdescribeElement()で説明文を付ける"
              language="js"
              code={DESCRIBE_SKETCH}
            />
            <InfoBox type="info" title="伝わる説明文の書き方">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  何が描かれているかを、見たことがない人に電話で伝えるつもりで書く
                </li>
                <li>
                  色・形・配置・動きを具体的に書く（「きれいな模様」ではなく「暗い青の地に、黄色い点が渦を巻いて回る」）
                </li>
                <li>操作できることを書く（「クリックすると夜に変わる」）</li>
                <li>
                  絵が変わったら説明文も変える。describe()は何度呼んでもよい
                </li>
                <li>
                  文末の句点は書かなくてよい。p5.jsは説明文の最後にピリオドを自動で足す（上のスケッチで確かめられる）
                </li>
              </ul>
            </InfoBox>
            <p className="text-muted-foreground my-4 leading-relaxed">
              <code className={code}>textOutput()</code>
              は、説明文を自分で書く代わりに、描いた図形の一覧をp5.jsが自動で作ります。単純な図形の絵には手早い方法ですが、作品の意図までは伝わらないので、describe()と使い分けます。
            </p>
            <CodePreview
              title="textOutput()が作る図形の一覧"
              language="js"
              code={TEXT_OUTPUT_SKETCH}
            />
            <InfoBox type="warning" title="一覧は英語で作られる">
              <p>
                textOutput()とgridOutput()が作る文章は英語で、色は近い色の名前に置き換えられます。図形が数百個ある作品では一覧が長くなり、かえって伝わりにくくなります。このマニュアルで作ってきたような作品には、自分の言葉で書くdescribe()が向いています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作り続ける
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              公開は1回で終わりではありません。続けるための方法は、どれも小さなものです。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-6">
              <li>
                毎日、小さく作る。15分で作れる大きさに区切り、できたところで止める。完成度より回数を優先する
              </li>
              <li>
                1つのアルゴリズムから連作を作る。seedや数字を1つ変えた版を並べると、1枚では見えなかった幅が見える
              </li>
              <li>
                題名を付ける。題名を考えると、自分がその絵のどこを気に入っているかが言葉になる
              </li>
              <li>
                制作メモを残す。何を試し、どの数字で何が起きたかを、スケッチの冒頭のコメントに数行書く。次に作るときの出発点になる
              </li>
            </ul>
            <CodePreview
              title="1つのアルゴリズムから連作を作る"
              language="js"
              code={SERIES_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>random(0.4, 2.2)</code>
                  の2.2を6にする（輪のゆがみが大きい版が混ざる）
                </li>
                <li>
                  <code className={code}>floor(random(7, 18))</code>
                  の18を40にする（線の密な版が混ざる）
                </li>
                <li>
                  <code className={code}>'輪No.'</code>
                  を自分の連作の題名にする
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="夜空に説明文を付ける"
              description="___ を埋めて、キャンバスに説明文を付け、確認のために画面にも表示してください。埋めると、絵の近くに説明文が出ます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 260);
  colorMode(HSB, 360, 100, 100, 100);
  // キャンバスの説明文を付け、確認用に画面にも表示する
  ___('濃い青の夜空に、大小の白い星が散らばっている。星はゆっくり明るさを変える', ___);
}

function draw() {
  background(235, 60, 12);
  randomSeed(7);
  noStroke();
  for (let i = 0; i < 90; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(1, 4);
    fill(50, 10, 100, 60 + sin(frameCount * 0.03 + i) * 35);
    circle(x, y, size);
  }
}`}
              answer={`function setup() {
  createCanvas(400, 260);
  colorMode(HSB, 360, 100, 100, 100);
  // キャンバスの説明文を付け、確認用に画面にも表示する
  describe('濃い青の夜空に、大小の白い星が散らばっている。星はゆっくり明るさを変える', LABEL);
}

function draw() {
  background(235, 60, 12);
  randomSeed(7);
  noStroke();
  for (let i = 0; i < 90; i++) {
    const x = random(width);
    const y = random(height);
    const size = random(1, 4);
    fill(50, 10, 100, 60 + sin(frameCount * 0.03 + i) * 35);
    circle(x, y, size);
  }
}`}
              keywords={["describe", "LABEL"]}
              hints={[
                "キャンバスの説明文を付ける関数describeを書きます。1つ目の引数が説明文です",
                "説明文を画面にも表示する定数LABELを2つ目の引数に書きます。公開するときは消します",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              これまでのページで作ったスケッチから1つ選び、次の順で公開まで進めます。全部で30分ほどの作業です。
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                題名を付ける。迷ったら、絵の中でいちばん目立つものの名前にする
              </li>
              <li>
                スケッチの冒頭に、題名・作者・日付・ライセンス・参考にしたものを書く
              </li>
              <li>
                <code className={code}>describe()</code>
                で説明文を付ける
              </li>
              <li>
                p5.js Web Editorに貼って保存し、Fullscreenのリンクを取り出す
              </li>
              <li>
                <Link href="/p5js/publish/export" className={link}>
                  書き出す
                </Link>
                のページの方法で、画像かGIFを1つ保存する
              </li>
              <li>リンクと画像を、見てほしい人に送る。または投稿する</li>
            </ol>
            <InfoBox type="success" title="最初の1つは、小さくてよい">
              <p>
                公開する作品は、大作である必要はありません。このページ冒頭の「風の地図」の名前と題名を書き換えたものでも、数字を1つ変えた
                <Link href="/p5js/basics/first-sketch" className={link}>
                  光の筆
                </Link>
                でも、それはあなたが選んだ数字で描かれた、あなたの作品です。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="p5.js本体のライセンス（LGPL 2.1）と、自分が書いたスケッチのライセンスの関係として正しいものは？"
              options={[
                {
                  label:
                    "p5.jsを使ったスケッチは、必ずLGPL 2.1で公開しなければならない",
                },
                {
                  label:
                    "LGPL 2.1はp5.js本体の扱いを定めるもので、自分のスケッチの公開条件は自分で決める",
                  correct: true,
                },
                {
                  label: "p5.jsを使ったスケッチには、ライセンスを付けられない",
                },
                { label: "p5.jsを使った作品は、公開すると著作権がなくなる" },
              ]}
              explanation="ライセンスが定めているのはp5.js本体の再配布と改変の条件です。自分のスケッチには、Creative Commonsなどの型から自分で条件を選んで書きます。"
            />
            <Quiz
              question="describe('説明文') を呼ぶと、既定ではどうなる？"
              options={[
                { label: "キャンバスの中に説明文が描かれる" },
                { label: "保存するPNGのファイル名に説明文が入る" },
                {
                  label:
                    "画面には表示されず、スクリーンリーダーに説明文が伝わるようになる",
                  correct: true,
                },
                { label: "説明文が英語に翻訳される" },
              ]}
              explanation="既定（FALLBACK）では、説明文はスクリーンリーダーにだけ伝わります。LABELを渡すとキャンバスの横にも表示されますが、読み上げが重複するので開発中の確認にだけ使います。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "公開先は、見せたいもの（コード・動く作品・画像）から選ぶ。最初はp5.js Web Editorの共有リンクが手早い",
                  "自分のサイトに置くには、p5.jsを読み込むindex.htmlとsketch.jsの2つがあればよい",
                  "p5.js本体はLGPL 2.1。自分のスケッチの条件は、Creative Commonsなどの型から自分で選ぶ",
                  "スケッチの冒頭に、題名・作者・日付・ライセンス・参考にしたものを書く",
                  "describe()で、画面を見られない人にも絵の内容を伝える",
                  "小さく作り、連作にし、題名とメモを残すと、作り続けられる",
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
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ここまでの道のりと、次の一歩
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              このマニュアルは、円を1つ描くところから始まりました。ここまでに扱ったものを並べると、次のようになります。どのセクションも、ここから戻って作り直せます。
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 mb-6">
              {JOURNEY.map((item) => (
                <li
                  key={item.href}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <Link
                    href={item.href}
                    className="font-semibold text-primary underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              どのページの作品も、setup()とdraw()の中に、数と式を並べて作りました。新しい作品を作るときにすることも同じです。気になる式を1つ選び、数字を変え、起きたことを見て、気に入った所で止める。そのくり返しが制作です。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              次に進む先をいくつか挙げます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                2つのページの技法を組み合わせる。
                <Link href="/p5js/random/noise" className={link}>
                  ノイズ
                </Link>
                で動かす
                <Link href="/p5js/media/typography" className={link}>
                  文字
                </Link>
                、
                <Link href="/p5js/media/sound" className={link}>
                  音
                </Link>
                に反応する
                <Link href="/p5js/systems/fractals" className={link}>
                  フラクタル
                </Link>
                、
                <Link href="/p5js/media/camera" className={link}>
                  カメラ
                </Link>
                の映像を素材にした
                <Link href="/p5js/random/particles" className={link}>
                  パーティクル
                </Link>
              </li>
              <li>
                3D表現を深める。
                <Link href="/threejs" className={link}>
                  Three.jsマニュアル
                </Link>
                では、3Dの場面をより細かく組み立てる方法を扱っています
              </li>
              <li>
                動きと力の考え方を深める。The Nature of
                Codeは、このマニュアルの「数学で描く」「偶然を設計する」の先を1冊かけて扱う本で、Web上で全文を読めます
              </li>
              <li>
                公式サイトのExamplesを読む。短いスケッチが分野ごとに並んでいて、知らない関数に出会えます
              </li>
            </ul>
            <InfoBox type="success" title="作ったら、見せてください">
              <p>
                このページの最初のスケッチに戻り、
                <code className={code}>'your name'</code>
                を自分の名前に書き換えるところから始められます。1つ公開すると、2つ目は1つ目よりずっと短い時間で出せます。
              </p>
            </InfoBox>
          </section>

          <section>
            <ReferenceLinks
              links={[
                {
                  title: "p5.js Web Editor",
                  url: "https://editor.p5js.org/",
                  description:
                    "スケッチを書いて保存し、共有リンクと埋め込みを作れる公式エディタ",
                },
                {
                  title: "p5.js Tutorials: Setting Up Your Environment",
                  url: "https://p5js.org/tutorials/setting-up-your-environment/",
                  description:
                    "Web Editorでの保存と共有（Embed / Fullscreen / Edit）の手順",
                },
                {
                  title: "p5.js: Download",
                  url: "https://p5js.org/download/",
                  description:
                    "p5.js本体のダウンロードと、scriptタグで読み込むCDNのURL",
                },
                {
                  title: "p5.js: Copyright and Acknowledgement",
                  url: "https://p5js.org/copyright/",
                  description: "p5.js本体（LGPL 2.1）と公式サイトのライセンス",
                },
                {
                  title: "Creative Commons: About CC Licenses",
                  url: "https://creativecommons.org/share-your-work/cclicenses/",
                  description: "6種類のCCライセンスと、4つの要素の意味",
                },
                {
                  title:
                    "p5.js Tutorials: Writing Accessible Canvas Descriptions",
                  url: "https://p5js.org/tutorials/writing-accessible-canvas-descriptions/",
                  description:
                    "describe()・describeElement()・textOutput()・gridOutput()の使い方",
                },
                {
                  title: "Genuary",
                  url: "https://genuary.art/",
                  description: "1月に、日替わりのお題でコードの作品を作る催し",
                },
                {
                  title: "OpenProcessing",
                  url: "https://openprocessing.org/",
                  description: "スケッチを投稿して公開できるコミュニティサイト",
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
