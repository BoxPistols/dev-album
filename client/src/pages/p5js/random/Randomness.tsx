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

// このページの完成形。seedごとに別の絵になり、同じseedなら同じ絵に戻るポスター
const HERO_SKETCH = `let seed = 1;
let shown = 0;

function setup() {
  createCanvas(480, 480);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(13);
}

function draw() {
  // 同じseedなら、random()は毎回同じ並びの数を返す
  // 1と2のように隣り合う番号は最初の1個がほぼ同じ値になるので、1000倍して離す
  randomSeed(seed * 1000);
  background(42, 9, 95);

  // このseedで使う色: 主役の色、そのほぼ反対側の色、墨色
  let base = random(360);
  let inks = [
    color(base, 62, 84),
    color((base + 160) % 360, 50, 68),
    color(228, 40, 22)
  ];

  noStroke();
  let n = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      // 形・向き・色を偶然に任せる。同じ名前を2回書いた形は2倍出やすい
      let kind = random(['quarter', 'quarter', 'half', 'circle', 'dot', 'lines', 'empty']);
      let turn = floor(random(4));
      let ink = random(inks);

      // 1マスずつ順に現れる。continueは、残りを飛ばして次の繰り返しへ進む
      n += 1;
      if (n > shown) continue;

      push();
      // マス目の位置と大きさは決めておく
      translate(48 + col * 64 + 32, 48 + row * 64 + 32);
      rotate(turn * HALF_PI);
      fill(ink);
      if (kind == 'quarter') arc(-32, -32, 128, 128, 0, HALF_PI);
      if (kind == 'half') arc(0, -32, 64, 64, 0, PI);
      if (kind == 'circle') circle(0, 0, 50);
      if (kind == 'dot') circle(0, 0, 14);
      if (kind == 'lines') {
        for (let i = 0; i < 4; i++) {
          rect(-32, -28 + i * 16, 64, 6);
        }
      }
      pop();
    }
  }

  fill(228, 40, 22);
  text('seed ' + seed, 48, 462);

  // 全部のマスが出てしばらくしたら、次のseedへ
  shown += 0.6;
  if (shown > 36 + 150) nextSeed();
}

function nextSeed() {
  seed += 1;
  shown = 0;
}

function mousePressed() {
  // クリックで次のseedへ
  nextSeed();
}`;

const SCATTER_SKETCH = `// 使う色相をあらかじめ決めておく
let hues = [190, 215, 300, 330, 45];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  // 位置: 0以上width未満、0以上height未満の数
  let x = random(width);
  let y = random(height);
  // 大きさ: 6以上60未満の数
  let size = random(6, 60);
  // 色: 配列の中から1つ
  let hue = random(hues);

  noStroke();
  fill(hue, 70, 100, 35);
  circle(x, y, size);

  // 少しずつ暗くして、古い円を沈める
  if (frameCount % 6 == 0) {
    fill(235, 35, 10, 5);
    rect(0, 0, width, height);
  }
}`;

const SEED_SKETCH = `let seed = 7;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  // 1回描いたら止める。クリックで描き直す
  noLoop();
}

function draw() {
  background(235, 35, 10);
  drawHalf(0);
  drawHalf(300);

  stroke(235, 15, 40);
  line(300, 0, 300, height);
  noStroke();
  fill(0, 0, 90);
  text('randomSeed(' + seed + ')', 16, 28);
  text('randomSeed(' + seed + ')', 316, 28);
}

function drawHalf(left) {
  // seedを設定し直すと、乱数の並びが最初に戻る
  randomSeed(seed);
  noStroke();
  for (let i = 0; i < 16; i++) {
    fill(random(180, 340), 70, 100, 70);
    circle(left + random(40, 260), random(60, 360), random(10, 70));
  }
}

function mousePressed() {
  // クリックでseedを変えて描き直す
  seed += 1;
  redraw();
}`;

const HISTOGRAM_SKETCH = `let flat = [];
let bell = [];
let bins = 60;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  for (let i = 0; i < bins; i++) {
    flat.push(0);
    bell.push(0);
  }
}

function draw() {
  background(235, 35, 10);

  // 毎フレーム10個ずつ数を引き、出た場所の本数を1増やす
  for (let i = 0; i < 10; i++) {
    let a = floor(random(bins));
    flat[a] += 1;

    // 平均30、ばらつき（標準偏差）8の正規分布
    let b = floor(randomGaussian(30, 8));
    if (b >= 0 && b < bins) bell[b] += 1;
  }

  drawBars(flat, 180, 195);
  drawBars(bell, 370, 325);

  noStroke();
  fill(195, 60, 100);
  text('random()', 16, 28);
  fill(325, 60, 100);
  text('randomGaussian()', 16, 218);
}

function drawBars(counts, bottom, hue) {
  // 一番多い所の高さが140になるように縮める
  let most = max(counts);
  noStroke();
  fill(hue, 65, 100);
  for (let i = 0; i < bins; i++) {
    let h = 140 * counts[i] / most;
    rect(i * 10 + 1, bottom - h, 8, h);
  }
}`;

const CHANCE_SKETCH = `let seed = 3;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();
}

function draw() {
  randomSeed(seed);
  background(235, 35, 10);

  for (let y = 25; y < height; y += 50) {
    for (let x = 25; x < width; x += 50) {
      // 0以上1未満の数を1つ引き、どの範囲に入ったかで形を決める
      let r = random();
      if (r < 0.6) {
        // 60%: 小さな点
        noStroke();
        fill(215, 50, 70);
        circle(x, y, 8);
      } else if (r < 0.9) {
        // 30%: 輪
        noFill();
        stroke(190, 70, 100);
        strokeWeight(2);
        circle(x, y, 30);
      } else {
        // 10%: 大きな円
        noStroke();
        fill(330, 70, 100);
        circle(x, y, 44);
      }
    }
  }
}

function mousePressed() {
  // クリックで別の並びにする
  seed += 1;
  redraw();
}`;

const WALK_SKETCH = `let walkers = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 8);
  for (let i = 0; i < 6; i++) {
    walkers.push({ x: 300, y: 200, hue: 185 + i * 28 });
  }
}

function draw() {
  strokeWeight(2);
  for (let w of walkers) {
    for (let i = 0; i < 3; i++) {
      let px = w.x;
      let py = w.y;

      // 上下左右のどれか1つへ、8ピクセル進む
      let dir = floor(random(4));
      if (dir == 0) w.x += 8;
      if (dir == 1) w.x -= 8;
      if (dir == 2) w.y += 8;
      if (dir == 3) w.y -= 8;

      // キャンバスの外へ出ないようにする
      w.x = constrain(w.x, 4, width - 4);
      w.y = constrain(w.y, 0, height);

      stroke(w.hue, 70, 100, 30);
      line(px, py, w.x, w.y);
    }
  }
}

function mousePressed() {
  // クリックで最初から
  background(235, 35, 8);
  for (let w of walkers) {
    w.x = 300;
    w.y = 200;
  }
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

export default function Randomness() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 10</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          乱数と確率
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          random()は、呼ぶたびに違う数を返す関数です。位置・大きさ・色・形の選び方に使うと、1つのプログラムから何通りもの絵が生まれます。
          このページでは、乱数の引き方、同じ絵を再現する方法、偏りのつけ方を扱います。
          下のポスターは、マス目の中の形と色を乱数で選んでいます。クリックすると次のseed（乱数の出発点になる番号）の絵に変わります。
        </p>

        <CodePreview
          title="seedで変わるポスター（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          <code className={code}>let seed = 1;</code>
          を好きな数にすると、その番号の絵から始まります。同じ番号なら、何度実行しても同じ絵です。
        </p>

        <WhyNowBox
          title="なぜここで乱数を扱うのか"
          tags={["random()", "randomSeed()", "randomGaussian()", "確率"]}
        >
          <p>
            ここまでの作品は、式が決まれば絵が1つに決まりました。乱数を入れると、作者は「どんな絵になりうるか」の範囲を決め、
            その中の1枚をコンピュータが引く、という作り方になります。これがジェネラティブアートの中心にある考え方です。
            どこを決めておき、どこを偶然に任せるかが、作品の設計になります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>random()の4つの使い方</h2>
            <p className={para}>
              <code className={code}>random()</code>
              は渡すものによって返すものが変わります。数の範囲を指定する使い方と、配列の中から1つ選ぶ使い方があります。
              下のスケッチは、位置・大きさ・色のそれぞれに違う使い方をしています。
            </p>
            <CodePreview
              title="位置・大きさ・色を乱数で決める"
              language="js"
              code={SCATTER_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書き方
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      返すもの
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row name="random()" desc="0以上1未満の数" />
                  <Row name="random(5)" desc="0以上5未満の数" />
                  <Row name="random(6, 60)" desc="6以上60未満の数" />
                  <Row
                    name="random([190, 215, 300])"
                    desc="配列の要素のどれか1つ"
                  />
                  <Row
                    name="floor(random(4))"
                    desc="0・1・2・3のどれか。小数を切り捨てて整数にする定番の書き方"
                  />
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>random(6, 60)</code>を
                  <code className={code}>random(2, 12)</code>
                  にする（細かい点描になる）
                </li>
                <li>
                  <code className={code}>let hues = [...]</code>
                  の中身を[20, 35, 50]にする（暖色だけの絵になる）
                </li>
                <li>
                  <code className={code}>let y = random(height);</code>を
                  <code className={code}>let y = 200 + random(-40, 40);</code>
                  にする（横一列の帯になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>randomSeed()で同じ絵を再現する</h2>
            <p className={para}>
              乱数で作った絵は、気に入っても次の実行では別の絵になります。
              <code className={code}>randomSeed()</code>
              に番号（seed）を渡すと、その番号に対応した決まった並びの乱数が出るようになります。
              下のスケッチは、左右それぞれを描く前に同じseedを設定しています。左右が同じ絵になることを確かめてください。クリックでseedが変わります。
            </p>
            <CodePreview
              title="同じseedは同じ絵"
              language="js"
              code={SEED_SKETCH}
            />
            <InfoBox
              type="warning"
              title="仕様では毎回違う値、seedを固定すると同じ並び"
            >
              <p>
                公式リファレンスはrandomSeed()について「By default, random() and
                randomGaussian() produce different results each time a sketch is
                run. Calling randomSeed() with a constant argument, such as
                randomSeed(99), makes these functions produce the same results
                each time a sketch is
                run.」と書いています。仕様では実行ごとに違う値が出ます。seedを固定すると、何度実行しても同じ並びになります。
                理由は、random()の数がseedから順に計算で作られているためです。同じ出発点からは同じ並びが出ます。
              </p>
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              draw()の中で毎フレームrandom()を使うと、絵は毎フレーム変わってちらつきます。止めた絵にしたいときは、
              このスケッチのように
              <code className={code}>noLoop()</code>
              で1回だけ描くか、冒頭のポスターのようにdraw()の先頭でrandomSeed()を呼んで毎フレーム同じ並びにします。
            </p>
          </section>

          <section>
            <h2 className={h2}>一様分布と正規分布</h2>
            <p className={para}>
              random()は、範囲の中のどの数も同じ出やすさで返します。これを一様分布と呼びます。
              <code className={code}>randomGaussian()</code>
              は、平均の近くの数が出やすく、離れた数ほど出にくい正規分布で返します。
              下のスケッチは、数を引くたびにその場所の棒を伸ばしています。回数が増えるほど、上は平らに、下は釣り鐘の形に近づきます。
            </p>
            <CodePreview
              title="出やすさをヒストグラムで見る"
              language="js"
              code={HISTOGRAM_SKETCH}
            />
            <InfoBox
              type="warning"
              title="randomGaussian()には上限も下限もない"
            >
              <p>
                公式リファレンスは「There's no minimum or maximum value that
                randomGaussian() might
                return.」と書いています。平均から大きく離れた数もまれに出ます。配列の番号や画面の座標に使うときは、
                このスケッチのように範囲の中かどうかを確かめるか、constrain()で収めます。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>randomGaussian(30, 8)</code>
                  の8を3にする（中央に細く集まる）。15にする（広くなだらかになる）
                </li>
                <li>30を10にする（山が左へ寄る）</li>
                <li>
                  <code className={code}>i &lt; 10</code>
                  の10を1にする（少ない回数ではでこぼこで、回数が増えるにつれて形が整っていく様子が見える）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>確率で選ぶ、重みをつけて選ぶ</h2>
            <p className={para}>
              <code className={code}>random()</code>
              は0以上1未満の数を返すので、
              <code className={code}>if (random() &lt; 0.1)</code>
              は「10%の確率で起きる」という意味になります。数を1つ引いて、0.6未満、0.9未満、それ以外と順に分ければ、
              60%・30%・10%の重みをつけた選択になります。まれに出る大きな円が、絵のアクセントになります。
            </p>
            <CodePreview
              title="60%・30%・10%で形を選ぶ"
              language="js"
              code={CHANCE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>r &lt; 0.6</code>
                  を0.2にする（点が減り、輪が70%になる）
                </li>
                <li>
                  <code className={code}>r &lt; 0.9</code>
                  を0.98にする（大きな円が2%になり、あるかないかの存在になる）
                </li>
              </ul>
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              配列から選ぶときは、出やすくしたい要素を複数回書く方法もあります。冒頭のポスターは
              <code className={code}>
                random(['quarter', 'quarter', 'half', ...])
              </code>
              のように'quarter'を2回書いて、4分の1円がほかの形の2倍出るようにしています。
            </p>
          </section>

          <section>
            <h2 className={h2}>ランダムウォーク</h2>
            <p className={para}>
              乱数を位置そのものではなく「次の1歩の向き」に使うと、前の位置を引き継いだ動きになります。これをランダムウォーク（random
              walk）と呼びます。下のスケッチでは、6つの点がそれぞれ上下左右のどれかへ進み、通った跡を線で残しています。
              1歩ずつは単純でも、重なった跡は地図や回路のような模様になります。
            </p>
            <CodePreview
              title="6つのランダムウォーク"
              language="js"
              code={WALK_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>4か所の8を20にする（目の粗い格子になる）</li>
                <li>
                  <code className={code}>floor(random(4))</code>を
                  <code className={code}>floor(random(5))</code>
                  にし、
                  <code className={code}>if (dir == 4) w.x += 8;</code>
                  を足す（右へ進む向きが2倍出やすくなり、全体が右へ流れる）
                </li>
                <li>
                  向きを選ぶ4行を
                  <code className={code}>w.x += random(-8, 8);</code>と
                  <code className={code}>w.y += random(-8, 8);</code>
                  の2行に替える（格子に沿わない、もつれた糸のような線になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>制約のある偶然</h2>
            <p className={para}>
              すべてを乱数に任せると、どのseedでも似たような散らかった絵になります。まとまりのある絵にするには、
              決めておくことと偶然に任せることを分けます。冒頭のポスターは次のように分けています。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      要素
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      決め方
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row
                    name="位置と大きさ"
                    desc="決めておく。6 × 6のマス目に、マスと同じ大きさで置く"
                  />
                  <Row
                    name="形"
                    desc="偶然に任せる。ただし用意した6種類の中から選ぶ"
                  />
                  <Row
                    name="向き"
                    desc="偶然に任せる。ただし90度きざみの4通りだけ"
                  />
                  <Row
                    name="色"
                    desc="主役の色相だけ偶然に任せ、2色目は色相環のほぼ反対側（160度先）、3色目は墨色に決めておく"
                  />
                </tbody>
              </table>
            </div>
            <p className={para}>
              位置がそろい、向きが4通りに限られ、色が3色に収まっているので、どのseedでも1枚のポスターとして成立します。
              選択肢を絞るほど統一感が増し、広げるほど変化が増えます。
            </p>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="再現できるランダムな絵"
              description="___ を埋めて、何度実行しても同じ絵になるようにし、円の色が配列colorsの中から選ばれるようにしてください。"
              preview
              initialCode={`let colors = [190, 300, 330, 45];

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();
}

function draw() {
  ___(42);
  background(235, 35, 10);
  noStroke();
  for (let i = 0; i < 40; i++) {
    fill(random(___), 70, 100, 60);
    circle(random(width), random(height), random(10, 60));
  }
}`}
              answer={`let colors = [190, 300, 330, 45];

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  noLoop();
}

function draw() {
  randomSeed(42);
  background(235, 35, 10);
  noStroke();
  for (let i = 0; i < 40; i++) {
    fill(random(colors), 70, 100, 60);
    circle(random(width), random(height), random(10, 60));
  }
}`}
              keywords={["randomSeed", "colors"]}
              hints={[
                "乱数の並びを番号で固定する関数randomSeedを、乱数を使う前に呼びます",
                "random()に配列colorsを渡すと、要素のどれか1つが返ります",
              ]}
            />
            <CodingChallenge
              title="中央に集まる点"
              description="___ を埋めて、点がキャンバスの中央付近に多く集まるようにしてください。平均とばらつきを指定できる乱数を使います。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  let x = ___(200, 50);
  let y = ___(150, 35);
  noStroke();
  fill(320, 70, 100, 40);
  circle(x, y, 6);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  let x = randomGaussian(200, 50);
  let y = randomGaussian(150, 35);
  noStroke();
  fill(320, 70, 100, 40);
  circle(x, y, 6);
}`}
              keywords={["randomGaussian"]}
              hints={[
                "平均と標準偏差を渡すと、平均の近くが出やすい数を返す関数randomGaussianを使います",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭のポスターを自分のシリーズにします。変えるのは「選択肢」です。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                形の配列を
                <code className={code}>['quarter', 'quarter', 'empty']</code>
                だけにする。4分の1円と余白だけの、静かな構成になる
              </li>
              <li>
                <code className={code}>(base + 160) % 360</code>
                の160を30にする。近い色相どうしの、落ち着いた配色になる
              </li>
              <li>
                <code className={code}>background(42, 9, 95)</code>を
                <code className={code}>background(228, 40, 14)</code>
                に、墨色の2か所を
                <code className={code}>(42, 9, 95)</code>
                に替える。暗い地に明るい形の、夜の版になる
              </li>
              <li>
                マス目を細かくする。2か所の6を12に、
                <code className={code}>translate()</code>
                の中の64を32に、32を16にし、形の数値（128・64・50・-32など）をすべて半分にする。
                <code className={code}>36 + 150</code>
                の36も144にする
              </li>
            </ul>
            <InfoBox type="success" title="seed番号は作品の一部">
              <p>
                気に入った絵が出たら、seed番号を控えておきます。コードとseedがあれば、いつでも同じ絵を出し直せます。
                seedを1から順に送って気に入った番号を選ぶ作業は、ジェネラティブアートの制作でよく行われる「選ぶ」工程です。
                枠の下の「PNG保存」で、seed番号の入った画像として残せます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="draw()の先頭でrandomSeed(5)を呼び、そのあとrandom()で円を20個描いた。毎フレームの絵はどうなる？"
              options={[
                { label: "毎フレーム違う位置に描かれ、ちらつく" },
                {
                  label: "毎フレーム同じ位置に描かれ、止まった絵に見える",
                  correct: true,
                },
                { label: "5フレームごとに絵が変わる" },
                { label: "円が5個しか描かれない" },
              ]}
              explanation="randomSeed()を同じ番号で呼ぶと、乱数の並びが最初に戻ります。毎フレーム同じ並びの数が出るので、同じ位置に同じ円が描かれます。"
            />
            <Quiz
              question="「20%の確率で赤、それ以外は青」にするとき、if文の条件として正しいものは？"
              options={[
                { label: "random(20) < 1のとき赤にする" },
                { label: "random() < 0.2のとき赤にする", correct: true },
                { label: "random() > 0.2のとき赤にする" },
                { label: "randomSeed(0.2)を呼んでから赤にする" },
              ]}
              explanation="random()は0以上1未満の数を同じ出やすさで返します。0.2未満になるのは全体の20%なので、random() < 0.2が「20%の確率」になります。random(20) < 1は5%です。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "random()は数の範囲からも、配列の中からも選べる",
                  "randomSeed()に同じ番号を渡すと、同じ並びの乱数になり、同じ絵を再現できる",
                  "random()は一様分布、randomGaussian()は平均の近くが出やすい正規分布",
                  "if (random() < 0.1)で「10%の確率」。範囲を順に分けると重みつきの選択になる",
                  "乱数を「次の1歩」に使うとランダムウォークになる",
                  "決めておくことと偶然に任せることを分けると、まとまりのある絵になる",
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
                  title: "p5.js Reference: random()",
                  url: "https://p5js.org/reference/p5/random/",
                  description:
                    "引数の数と種類による返り値の違い。一様分布であることも書かれている",
                },
                {
                  title: "p5.js Reference: randomSeed()",
                  url: "https://p5js.org/reference/p5/randomSeed/",
                  description: "乱数の並びを固定する関数の仕様",
                },
                {
                  title: "p5.js Reference: randomGaussian()",
                  url: "https://p5js.org/reference/p5/randomGaussian/",
                  description:
                    "正規分布の乱数。平均と標準偏差の指定方法が書かれている",
                },
                {
                  title: "The Nature of Code: Chapter 0 Randomness",
                  url: "https://natureofcode.com/random/",
                  description:
                    "Daniel Shiffmanによる、ランダムウォーク・確率・正規分布の解説",
                },
                {
                  title: "Wikipedia: Random walk",
                  url: "https://en.wikipedia.org/wiki/Random_walk",
                  description: "ランダムウォークの定義と、格子上の例",
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
