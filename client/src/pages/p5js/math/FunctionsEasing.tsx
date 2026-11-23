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

// このページの完成形。水滴の位置を「時間の関数」だけで決める噴水
const HERO_SKETCH = `let drops = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(232, 70, 6);
}

function draw() {
  // 半透明で塗り重ねて、少し前の位置を残像にする
  blendMode(BLEND);
  background(232, 70, 6, 20);

  // マウスが枠の中にあるときは、横位置で水の傾きを変える
  let lean = 0;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    lean = map(mouseX, 0, width, -1.8, 1.8);
  }

  // 5つの噴き出し口から、毎フレーム水滴を打ち上げる
  for (let i = 0; i < 5; i++) {
    // 噴き出し口ごとに、強さがゆっくり上下する
    let power = 9.6 + 2.8 * sin(frameCount * 0.025 + i * 1.3);
    for (let k = 0; k < 3; k++) {
      drops.push({
        x0: 100 + i * 100,
        t: 0,
        vx: random(-1, 1) + lean,
        vy: power + random(-0.8, 0.8),
        hue: 178 + i * 24 + random(-8, 8),
        size: random(2, 4.5)
      });
    }
  }

  // 光を重ねるように描く
  blendMode(ADD);
  noStroke();
  for (let d of drops) {
    d.t += 1;
    // xは時間の一次関数、yは時間の二次関数。この2行が放物線を作る
    let x = d.x0 + d.vx * d.t;
    let y = 0.14 * d.t * d.t - d.vy * d.t;

    // 水面（y = 330）より上に水滴、下に薄い映り込みを描く
    fill(d.hue, 70, 62, 60);
    circle(x, 330 + y, d.size);
    fill(d.hue, 70, 30, 30);
    circle(x, 330 - y * 0.25, d.size);

    // 水面まで落ちたら印をつける
    d.done = y > 0;
  }

  // 落ちきった水滴を取り除く
  drops = drops.filter(d => !d.done);
}`;

const GRAPH_SKETCH = `// 入力xを受け取り、出力yを返す規則。これが関数
function straight(x) {
  return 0.5 * x + 20;
}

function curved(x) {
  return 0.006 * x * x - 140;
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(230, 30, 10);
  // 原点をキャンバスの中央へ移す
  translate(width / 2, height / 2);

  // 軸
  stroke(230, 15, 40);
  strokeWeight(1);
  line(-300, 0, 300, 0);
  line(0, -200, 0, 200);

  // xを少しずつ進めながら点を打つと、グラフになる
  // キャンバスのyは下向きなので、-をつけて上下を反転する
  strokeWeight(3);
  for (let x = -300; x <= 300; x += 2) {
    stroke(45, 80, 100);
    point(x, -straight(x));
    stroke(190, 70, 100);
    point(x, -curved(x));
  }

  // いまの入力xと、それぞれの出力
  let x = (frameCount * 1.5) % 600 - 300;
  stroke(230, 15, 55);
  strokeWeight(1);
  line(x, -200, x, 200);
  noStroke();
  fill(45, 80, 100);
  circle(x, -straight(x), 12);
  fill(190, 70, 100);
  circle(x, -curved(x), 12);

  fill(0, 0, 90);
  text('x = ' + round(x), -290, -176);
  fill(45, 80, 100);
  text('0.5 * x + 20 = ' + round(straight(x)), -290, -154);
  fill(190, 70, 100);
  text('0.006 * x * x - 140 = ' + round(curved(x)), -290, -132);
}`;

const THROW_SKETCH = `let t = 0;
let vy = 9;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(230, 30, 10);
}

function draw() {
  // ごく薄く塗り重ねて、古い軌跡をゆっくり消す
  background(230, 30, 10, 3);

  // 横は一定の速さ、縦は上向きの速さから重力のぶんを引く
  let x = 30 + 4.5 * t;
  let y = 360 - vy * t + 0.5 * 0.16 * t * t;

  noStroke();
  fill(map(vy, 6, 10.5, 190, 330), 70, 100);
  circle(x, y, 9);

  t += 1;
  // 地面か右端に着いたら、強さを変えて投げ直す
  if (y > 362 || x > width) {
    t = 0;
    vy = random(6, 10.5);
  }

  // 地面
  stroke(230, 15, 45);
  line(0, 366, width, 366);
}`;

const MAP_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(230, 30, 10);

  // マウスが枠の外にあるあいだは、入力を自動で左右に動かす
  let input = width / 2 + sin(frameCount * 0.02) * 330;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    input = mouseX;
  }

  // constrain: 100〜500の範囲からはみ出さないように止める
  let x = constrain(input, 100, 500);

  // map: 100〜500の位置を、ほかの範囲の数へ移す
  let size = map(x, 100, 500, 20, 220);
  let hue = map(x, 100, 500, 190, 330);

  // 動ける範囲のレール
  stroke(230, 15, 40);
  strokeWeight(2);
  line(100, 340, 500, 340);
  noStroke();
  fill(0, 0, 90);
  circle(x, 340, 12);

  fill(hue, 70, 100, 80);
  circle(width / 2, 170, size);

  fill(0, 0, 90);
  text('x = ' + round(x), 16, 28);
  text('size = map(x, 100, 500, 20, 220) = ' + round(size), 16, 50);
  text('hue = map(x, 100, 500, 190, 330) = ' + round(hue), 16, 72);
}`;

const LERP_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(230, 30, 10);

  // 始点Aは固定、終点Bはマウス（枠の外なら自動で動く）
  let ax = 70;
  let ay = 330;
  let bx = 470 + cos(frameCount * 0.02) * 70;
  let by = 130 + sin(frameCount * 0.03) * 80;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    bx = mouseX;
    by = mouseY;
  }

  let from = color(190, 80, 100);
  let to = color(330, 80, 100);

  noStroke();
  for (let i = 0; i <= 12; i++) {
    // amtは0〜1。0ならA、1ならB、0.5ならちょうど真ん中
    let amt = i / 12;
    let x = lerp(ax, bx, amt);
    let y = lerp(ay, by, amt);
    fill(lerpColor(from, to, amt));
    circle(x, y, lerp(46, 10, amt));
  }
}`;

const EASING_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

// どれも0〜1の入力を受け取り、0〜1の出力を返す
function steady(t) { return t; }
function easeIn(t) { return t * t; }
function easeOut(t) { return 1 - (1 - t) * (1 - t); }
function easeInOut(t) { return t * t * (3 - 2 * t); }

function draw() {
  background(230, 30, 10);

  // 2秒かけて0から1へ進み、少し止まってからくり返す
  let t = constrain((frameCount % 170) / 120, 0, 1);

  drawRow('t', steady, t, 70, 45);
  drawRow('t * t', easeIn, t, 160, 190);
  drawRow('1 - (1 - t) * (1 - t)', easeOut, t, 250, 285);
  drawRow('t * t * (3 - 2 * t)', easeInOut, t, 340, 330);
}

function drawRow(label, ease, t, y, hue) {
  noStroke();
  fill(0, 0, 80);
  text(label, 50, y - 22);

  // 等しい時間ごとの位置を薄く打つ。間隔が広い所ほど速い
  fill(hue, 60, 100, 28);
  for (let i = 0; i <= 20; i++) {
    circle(lerp(60, 540, ease(i / 20)), y, 8);
  }

  // いまの位置
  fill(hue, 70, 100);
  circle(lerp(60, 540, ease(t)), y, 22);
}`;

const FOLLOW_SKETCH = `let xs = [];
let ys = [];
let count = 46;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < count; i++) {
    xs.push(width / 2);
    ys.push(height / 2);
  }
}

function draw() {
  background(230, 30, 10);

  // 目標はマウス。枠の外にあるあいだは自動で動く
  let targetX = width / 2 + cos(frameCount * 0.023) * 220;
  let targetY = height / 2 + sin(frameCount * 0.041) * 130;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    targetX = mouseX;
    targetY = mouseY;
  }

  for (let i = 0; i < count; i++) {
    // 先頭は目標を、2番目以降は1つ前の円を追いかける
    let tx = targetX;
    let ty = targetY;
    if (i > 0) {
      tx = xs[i - 1];
      ty = ys[i - 1];
    }
    // 残りの距離の一部だけ進む。遠いほど速く、近づくほど遅い
    xs[i] += (tx - xs[i]) * 0.22;
    ys[i] += (ty - ys[i]) * 0.22;
  }

  noStroke();
  // 後ろの円から描いて、先頭を一番上に重ねる
  for (let i = count - 1; i >= 0; i--) {
    let amt = i / count;
    fill(lerp(320, 190, amt), 70, 100, lerp(95, 25, amt));
    circle(xs[i], ys[i], lerp(44, 6, amt));
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

export default function FunctionsEasing() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 7</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          関数とイージング
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          関数は「入力の数を受け取り、決まった規則で出力の数を返すもの」です。このページでは一次関数と二次関数をグラフとして描き、
          放物線でボールを投げ、map()とlerp()で数を別の範囲へ移し、動きの緩急（イージング）を式で作ります。
          下の噴水は、水滴の位置を時間の関数2行だけで決めています。枠の中でマウスを左右に動かすと水が傾きます。
        </p>

        <CodePreview
          title="放物線の噴水（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          <code className={code}>0.14 * d.t * d.t</code>
          の0.14を0.3にすると水が重く落ち、0.05にすると高く舞い上がります。
        </p>

        <WhyNowBox
          title="なぜここで関数を扱うのか"
          tags={["一次関数", "二次関数", "map()", "lerp()", "イージング"]}
        >
          <p>
            前の章までは、位置や大きさを「毎フレーム少し足す」ことで動かしてきました。関数を使うと、
            「時刻がtのとき位置はここ」「マウスがここなら色はこれ」と、ある数から別の数を直接決められます。
            動きの形を式として持てるので、速さの変化や曲がり方を狙って作れるようになります。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>関数は入力を出力に変える規則</h2>
            <p className={para}>
              <code className={code}>y = 0.5 * x + 20</code>
              のように、xを何倍かして数を足す形を一次関数と呼びます。グラフは直線になります。
              <code className={code}>y = 0.006 * x * x - 140</code>
              のようにxを2回掛ける形は二次関数で、グラフは放物線になります。JavaScriptでは
              <code className={code}>function</code>
              で同じ規則を書けます。下のスケッチは、xを左端から右端まで少しずつ進めて点を打ち、2つの関数をグラフにしています。
            </p>
            <CodePreview
              title="一次関数と二次関数のグラフ"
              language="js"
              code={GRAPH_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              数学のグラフはyが上向きですが、キャンバスのyは下向きです。そのまま
              <code className={code}>point(x, straight(x))</code>
              と書くと上下が逆の絵になります。このスケッチでは
              <code className={code}>translate()</code>
              で原点を中央へ移し、yに
              <code className={code}>-</code>
              をつけて反転しています。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>0.5 * x + 20</code>
                  の0.5を2にする（直線の傾きが急になる）。-0.5にする（右下がりになる）
                </li>
                <li>
                  <code className={code}>+ 20</code>
                  を-100にする（直線が傾きを保ったまま下へずれる）
                </li>
                <li>
                  <code className={code}>0.006 * x * x</code>
                  の0.006を0.02にする（放物線が細くなる）。-0.006にする（山の形になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>放物線は投げたボールの軌跡</h2>
            <p className={para}>
              入力をxではなく時間tにすると、関数は動きになります。投げたボールの横位置は時間の一次関数（一定の速さで進む）、
              縦位置は時間の二次関数（上向きの速さから、重力で落ちるぶんが引かれていく）です。
              この2つを組み合わせた軌跡が放物線です。冒頭の噴水は、この式を多数の水滴に当てはめたものです。
            </p>
            <CodePreview
              title="ボールを投げる"
              language="js"
              code={THROW_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>0.5 * 0.16 * t * t</code>
                  の0.16を0.4にする（重力が強くなり、低い山になる）
                </li>
                <li>
                  <code className={code}>4.5 * t</code>
                  の4.5を2にする（横の速さが落ち、手前に着地する）
                </li>
                <li>
                  <code className={code}>random(6, 10.5)</code>を
                  <code className={code}>random(9, 10)</code>
                  にする（ほぼ同じ高さの山がそろう）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>map()で範囲を移す、constrain()で範囲に収める</h2>
            <p className={para}>
              マウスの位置（0〜600）を色相（0〜360）や大きさ（20〜220）として使いたいとき、
              範囲を移す計算を毎回書くのは手間です。
              <code className={code}>map()</code>
              は、ある範囲の中での位置の割合を保ったまま、別の範囲の数に移します。公式リファレンスの例では
              <code className={code}>map(2, 0, 10, 0, 100)</code>
              が20を返します。中身は一次関数です。
            </p>
            <CodePreview
              title="位置を大きさと色に移す"
              language="js"
              code={MAP_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書き方
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      返す数
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row
                    name="map(x, 100, 500, 20, 220)"
                    desc="xが100なら20、500なら220、300（真ん中）なら120"
                  />
                  <Row
                    name="map(x, 100, 500, 220, 20)"
                    desc="出力の両端を入れ替えると向きが逆になる。xが大きいほど小さい数"
                  />
                  <Row
                    name="constrain(x, 100, 500)"
                    desc="xが100より小さければ100、500より大きければ500、あいだならxのまま"
                  />
                </tbody>
              </table>
            </div>
            <InfoBox type="warning" title="map()は範囲の外でも止まらない">
              <p>
                map()に入力範囲の外の数を渡すと、出力も範囲の外へそのまま伸びます。
                <code className={code}>map(700, 100, 500, 20, 220)</code>
                は220ではなく320です。範囲に収めたいときはconstrain()を組み合わせるか、map()の6番目の引数にtrueを渡します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>lerp()で2つの数のあいだを取る</h2>
            <p className={para}>
              <code className={code}>lerp(a, b, amt)</code>
              は、aとbのあいだの数を返します。3つ目のamtは0〜1の割合で、0ならa、1ならb、0.5ならちょうど真ん中です。
              位置にも大きさにも使え、色には
              <code className={code}>lerpColor()</code>
              が使えます。下のスケッチは、amtを0から1まで13段階に分けて円を並べています。
            </p>
            <CodePreview
              title="2点のあいだに並べる"
              language="js"
              code={LERP_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>2か所の12を40にする（円が詰まって帯になる）</li>
                <li>
                  <code className={code}>lerp(46, 10, amt)</code>を
                  <code className={code}>lerp(10, 46, amt)</code>
                  にする（マウス側の円が大きくなる）
                </li>
                <li>
                  <code className={code}>let amt = i / 12;</code>の次の行に
                  <code className={code}>amt = amt * amt;</code>
                  を足す（円がA側に寄る。次の節のイージングと同じ考え方）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>イージングは0〜1を0〜1に変える関数</h2>
            <p className={para}>
              同じ距離を同じ時間で動いても、速さの配分で印象が変わります。この配分をイージングと呼びます。
              進み具合tを0〜1で持ち、関数で0〜1の別の数に変えてからlerp()に渡すだけで作れます。
              下の4行は同時に出発して同時に着きます。薄い点は等しい時間ごとの位置で、間隔が広い所ほど速く動いています。
            </p>
            <CodePreview
              title="4つのイージングを比べる"
              language="js"
              code={EASING_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      式
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      動き
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row name="t" desc="一定の速さ。機械的に見える" />
                  <Row
                    name="t * t"
                    desc="ゆっくり動き出して加速する（イーズイン）。落ちる物、去っていく物に合う"
                  />
                  <Row
                    name="1 - (1 - t) * (1 - t)"
                    desc="速く動き出して減速する（イーズアウト）。画面に入ってきて止まる物に合う"
                  />
                  <Row
                    name="t * t * (3 - 2 * t)"
                    desc="動き出しと止まり際の両方がゆるやか。smoothstepと呼ばれる式"
                  />
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className={h2}>残りの距離の一部だけ進む</h2>
            <p className={para}>
              時間を測らずに作れるイージングもあります。
              <code className={code}>x += (target - x) * 0.1</code>
              は「目標までの残りの距離の1割だけ進む」という意味です。遠いときは大きく、近づくほど小さく動くので、
              減速しながら目標に寄っていきます。目標が動き続けても使えるので、マウスへの追従によく使われます。
              下のスケッチは、先頭の円が目標を、ほかの円が1つ前の円を同じ式で追いかけています。
            </p>
            <CodePreview
              title="追いかけて連なる円"
              language="js"
              code={FOLLOW_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  2か所の0.22を0.08にする（遅れが大きくなり、長い尾になる）
                </li>
                <li>0.22を0.6にする（ほぼ遅れずについてきて、短くまとまる）</li>
                <li>
                  <code className={code}>let count = 46;</code>
                  を120にする（尾が長くなる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox
              type="warning"
              title="式の上では届かない、画面の上では届く"
            >
              <p>
                仕様（式）では、残りの距離に毎回0.9を掛けていくだけなので、何フレーム進めても目標とぴったり同じ数にはなりません。
                実測では、差が1ピクセルより小さくなった時点で画面上は止まって見えます。
                また、この式は1フレームごとに1回進むので、フレームの回数が落ちた端末では同じ0.1でも追従が遅く見えます。
                理由は、進む量を時間ではなくdraw()の呼ばれた回数で決めているためです。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="マウスの位置で大きさと色を決める"
              description="___ を埋めて、マウスを右へ動かすほど円が大きくなり、上下の位置で色相が変わるようにしてください。円の中心は50〜350の範囲に収めます。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(230, 30, 10);
  let x = ___(mouseX, 50, 350);
  let size = ___(mouseX, 0, width, 10, 160);
  let hue = ___(mouseY, 0, height, 180, 330);
  noStroke();
  fill(hue, 70, 100);
  circle(x, 150, size);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(230, 30, 10);
  let x = constrain(mouseX, 50, 350);
  let size = map(mouseX, 0, width, 10, 160);
  let hue = map(mouseY, 0, height, 180, 330);
  noStroke();
  fill(hue, 70, 100);
  circle(x, 150, size);
}`}
              keywords={["constrain", "map"]}
              hints={[
                "1つ目の空欄は、数を最小値と最大値のあいだに収める関数constrainです",
                "2つ目と3つ目の空欄は、ある範囲の数を別の範囲へ移す関数mapです",
              ]}
            />
            <CodingChallenge
              title="遅れてついてくる円"
              description="___ を埋めて、円がマウスの位置へ減速しながら近づくようにしてください。「目標までの残りの距離の一部だけ進む」式です。"
              preview
              initialCode={`let x = 200;
let y = 150;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(230, 30, 10);
}

function draw() {
  background(230, 30, 10, 12);
  x += (___ - x) * 0.08;
  y += (___ - y) * 0.08;
  noStroke();
  fill(320, 70, 100);
  circle(x, y, 30);
}`}
              answer={`let x = 200;
let y = 150;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(230, 30, 10);
}

function draw() {
  background(230, 30, 10, 12);
  x += (mouseX - x) * 0.08;
  y += (mouseY - y) * 0.08;
  noStroke();
  fill(320, 70, 100);
  circle(x, y, 30);
}`}
              keywords={["mouseX", "mouseY"]}
              hints={[
                "xの目標はマウスの横位置mouseXです。目標から現在のxを引くと残りの距離になります",
                "yの目標はマウスの縦位置mouseYです。xと同じ形の式になります",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭の噴水は、式の係数と色を変えるだけで別の作品になります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>hue: 178 + i * 24</code>
                の178を10、24を8にする。水が火花の色になる。あわせて
                <code className={code}>0.14</code>
                を0.05にすると、ゆっくり舞う火の粉になる
              </li>
              <li>
                <code className={code}>x0: 100 + i * 100</code>を
                <code className={code}>x0: width / 2</code>
                にし、vxの幅を
                <code className={code}>random(-3, 3)</code>
                に広げる。1か所から広がる噴水になる
              </li>
              <li>
                <code className={code}>circle(x, 330 + y, d.size)</code>を
                <code className={code}>circle(x, 70 - y, d.size)</code>
                に替える。上下が反転し、天井から下へ噴き出す絵になる
              </li>
              <li>
                「追いかけて連なる円」の
                <code className={code}>background(230, 30, 10)</code>
                に4つ目の数として8を足す。尾が残像を引き、筆で描いたような線になる
              </li>
            </ul>
            <InfoBox type="success" title="式を1つ足すと動きが1つ増える">
              <p>
                位置・大きさ・色のどれも数なので、どの関数もどこにでも当てはめられます。噴水の水滴を描く行の
                <code className={code}>d.size</code>を
                <code className={code}>map(d.t, 0, 100, 5, 1)</code>
                に替えれば、時間とともに小さくなる水滴になります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="map(75, 50, 100, 0, 200)が返す数は？"
              options={[
                { label: "75" },
                { label: "100", correct: true },
                { label: "150" },
                { label: "200" },
              ]}
              explanation="75は50〜100のちょうど真ん中です。map()は範囲の中での割合を保つので、0〜200の真ん中である100を返します。"
            />
            <Quiz
              question="t * tのイージングで、0から1へ進むあいだの動きは？"
              options={[
                { label: "最初から最後まで同じ速さ" },
                { label: "速く動き出して、だんだん遅くなる" },
                {
                  label: "ゆっくり動き出して、だんだん速くなる",
                  correct: true,
                },
                { label: "真ん中で一度止まる" },
              ]}
              explanation="tが0.1のときt * tは0.01、0.5のとき0.25、0.9のとき0.81です。前半はほとんど進まず、後半に一気に進むので、加速する動きになります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "関数は入力から出力を決める規則。一次関数は直線、二次関数は放物線になる",
                  "キャンバスのyは下向きなので、グラフを描くときはyの符号を反転する",
                  "map()は範囲を移し、constrain()は範囲に収め、lerp()は2つの数のあいだを取る",
                  "イージングは0〜1を0〜1に変える関数。t * tで加速、1 - (1 - t) * (1 - t)で減速",
                  "x += (target - x) * 0.1は、残りの距離の一部だけ進んで減速しながら追従する",
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
                  title: "p5.js Reference: map()",
                  url: "https://p5js.org/reference/p5/map/",
                  description:
                    "範囲を移す関数の仕様。範囲の外に出さないための6番目の引数も書かれている",
                },
                {
                  title: "p5.js Reference: lerp()",
                  url: "https://p5js.org/reference/p5/lerp/",
                  description: "2つの数のあいだを割合で取る関数の仕様",
                },
                {
                  title: "p5.js Reference: constrain()",
                  url: "https://p5js.org/reference/p5/constrain/",
                  description: "数を最小値と最大値のあいだに収める関数の仕様",
                },
                {
                  title: "p5.js Reference: lerpColor()",
                  url: "https://p5js.org/reference/p5/lerpColor/",
                  description: "2つの色のあいだの色を作る関数の仕様",
                },
                {
                  title: "MDN: easing-function",
                  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/easing-function",
                  description:
                    "CSSのイージング関数の解説。ease-inやease-outの曲線の形を図で確認できる",
                },
                {
                  title: "Wikipedia: Smoothstep",
                  url: "https://en.wikipedia.org/wiki/Smoothstep",
                  description: "t * t * (3 - 2 * t)の式の定義と性質",
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
