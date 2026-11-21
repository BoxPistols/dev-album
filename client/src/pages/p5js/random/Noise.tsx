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

// このページの完成形。ノイズで決めた向きに沿って、細い線が少しずつ積もっていく
const HERO_SKETCH = `let particles = [];
let age = 0;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  start();
}

function start() {
  // 紙の色で塗り、ノイズの形を変えて最初から
  background(40, 8, 96);
  noiseSeed(floor(random(100000)));
  particles = [];
  for (let i = 0; i < 900; i++) {
    particles.push({ x: random(width), y: random(height) });
  }
  age = 0;
}

function draw() {
  strokeWeight(1);
  for (let p of particles) {
    // その場所のノイズの値を、進む向き（角度）に変える
    let n = noise(p.x * 0.004, p.y * 0.004);
    let a = n * TWO_PI * 2;

    let px = p.x;
    let py = p.y;
    p.x += cos(a) * 1.6;
    p.y += sin(a) * 1.6;

    // ノイズの値で色相も変える。ごく薄い線を重ねて濃淡を作る
    stroke(map(n, 0.25, 0.75, 190, 370) % 360, 65, 50, 13);
    line(px, py, p.x, p.y);

    // 外へ出たとき、またはときどき、別の場所からやり直す
    let outside = p.x < 0 || p.x > width || p.y < 0 || p.y > height;
    if (outside || random() < 0.006) {
      p.x = random(width);
      p.y = random(height);
    }
  }

  // 十分に描いたら、新しい絵を始める
  age += 1;
  if (age > 1500) start();
}

function mousePressed() {
  // クリックで次の絵へ
  start();
}`;

const COMPARE_SKETCH = `let jumpy = [];
let gentle = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(235, 35, 10);

  // 毎フレーム、新しい値を1つずつ右端に足す
  jumpy.push(random());
  gentle.push(noise(frameCount * 0.02));
  if (jumpy.length > 150) {
    jumpy.shift();
    gentle.shift();
  }

  drawGraph(jumpy, 40, 195);
  drawGraph(gentle, 230, 325);

  noStroke();
  fill(195, 60, 100);
  text('random()', 16, 28);
  fill(325, 60, 100);
  text('noise(frameCount * 0.02)', 16, 218);
}

function drawGraph(values, top, hue) {
  noFill();
  stroke(hue, 65, 100);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < values.length; i++) {
    // 0〜1の値を、高さ140の帯の中に描く
    vertex(i * 4, top + 140 - values[i] * 140);
  }
  endShape();
}`;

const SCALE_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(235, 35, 10);
  drawRow(0.003, 20, 190);
  drawRow(0.02, 150, 260);
  drawRow(0.2, 280, 325);
}

function drawRow(step, top, hue) {
  noFill();
  stroke(hue, 65, 100);
  strokeWeight(2);
  beginShape();
  for (let x = 0; x <= width; x += 2) {
    // xに掛ける数（縮尺）が小さいほど、隣との差が小さくなる
    let n = noise(x * step + frameCount * step * 0.5, top);
    vertex(x, top + 100 - n * 100);
  }
  endShape();

  noStroke();
  fill(hue, 50, 100);
  text('noise(x * ' + step + ')', 16, top + 18);
}`;

const CLOUD_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  // 3つ目の引数に時間を入れると、模様が少しずつ変わる
  let t = frameCount * 0.008;

  for (let y = 0; y < height; y += 12) {
    for (let x = 0; x < width; x += 12) {
      // 位置(x, y)と時間tから、0〜1の値を1つ得る
      let n = noise(x * 0.008 + t, y * 0.012, t);

      // 値が小さい所は空の青、大きい所は雲の白にする
      let s = map(n, 0.35, 0.65, 65, 4, true);
      let b = map(n, 0.35, 0.65, 72, 100, true);
      fill(212, s, b);
      rect(x, y, 12, 12);
    }
  }
}`;

const MOUNTAIN_SKETCH = `function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  // 重ねる波の数（4）と、1つ重ねるごとの弱まり方（0.5）
  noiseDetail(4, 0.5);
}

function draw() {
  // 明け方の空と太陽
  background(28, 22, 98);
  fill(12, 45, 100);
  circle(430, 130, 64);

  let t = frameCount * 0.0015;
  for (let layer = 0; layer < 5; layer++) {
    // 奥の層は淡く、手前の層は濃くする
    fill(255 - layer * 6, 22 + layer * 10, 84 - layer * 15);

    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 6) {
      // 2つ目の引数を層ごとに変えて、層ごとに違う稜線にする
      // 手前の層ほど速く横へ流す
      let n = noise(x * 0.006 + t * (layer + 1), layer * 10);
      vertex(x, 110 + layer * 50 + n * 150);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}`;

const FIELD_SKETCH = `let dots = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < 120; i++) {
    dots.push({ x: random(width), y: random(height) });
  }
}

// 場所(x, y)での流れの向きを返す
function flowAngle(x, y) {
  return noise(x * 0.004, y * 0.004, frameCount * 0.002) * TWO_PI * 2;
}

function draw() {
  background(235, 35, 10);

  // 格子の各点に、その場所の向きを短い線で描く
  stroke(235, 20, 45);
  strokeWeight(1);
  for (let y = 12; y < height; y += 25) {
    for (let x = 12; x < width; x += 25) {
      let a = flowAngle(x, y);
      line(x, y, x + cos(a) * 12, y + sin(a) * 12);
    }
  }

  // 粒子は、いまいる場所の向きへ進む
  noStroke();
  for (let d of dots) {
    let a = flowAngle(d.x, d.y);
    d.x += cos(a) * 2;
    d.y += sin(a) * 2;
    if (d.x < 0 || d.x > width || d.y < 0 || d.y > height || random() < 0.01) {
      d.x = random(width);
      d.y = random(height);
    }
    fill(map(a % TWO_PI, 0, TWO_PI, 180, 340), 70, 100);
    circle(d.x, d.y, 5);
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

export default function Noise() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 11</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ノイズ
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          noise()は、近い入力には近い値を返す、なめらかにつながった乱数です。雲、山並み、水の流れのような、
          でたらめではないが規則的でもない形を作れます。
          下の絵は、場所ごとのノイズの値を「進む向き」として使い、その向きに沿って細い線を引き続けたものです。時間とともに線が積もって濃淡が現れます。クリックすると別の絵が始まります。
        </p>

        <CodePreview
          title="流れが描く絵（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          2か所の
          <code className={code}>* 0.004</code>
          を0.012にすると細かく渦を巻く流れに、0.0015にすると大きくうねる流れになります。
        </p>

        <WhyNowBox
          title="なぜここでノイズを扱うのか"
          tags={["noise()", "noiseSeed()", "noiseDetail()", "フローフィールド"]}
        >
          <p>
            前のページのrandom()は、1回ごとに無関係な値を返しました。位置や色に使うと、ばらばらに散った絵になります。
            自然の中の形は、隣どうしが少しずつ違いながらつながっています。noise()はこの「つながった偶然」を作る道具で、
            ジェネラティブアートで有機的な形を作るときの基本になっています。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>random()とnoise()の違い</h2>
            <p className={para}>
              下のスケッチは、毎フレーム値を1つ取り出して右端に足し、折れ線にしています。上の
              <code className={code}>random()</code>
              は前の値と無関係に上下します。下の
              <code className={code}>noise()</code>
              は、前の値の近くから少しずつ動きます。どちらも0〜1の範囲の数を返します。
            </p>
            <CodePreview
              title="random()とnoise()を並べる"
              language="js"
              code={COMPARE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              使い方にも違いがあります。random()は呼ぶだけで新しい値を返しますが、noise()は入力を受け取る関数で、同じ入力には同じ値を返します。
              値を変えたいときは、入力を少しずつ進めます。このスケッチでは
              <code className={code}>frameCount * 0.02</code>
              を入力にしています。
            </p>
            <InfoBox type="info" title="Perlin noiseの由来">
              <p>
                p5.jsのnoise()が返す値は、公式リファレンスでPerlin
                noiseと呼ばれています。同じリファレンスは「Ken
                Perlin invented noise() while animating the original Tron film
                in the 1980s.」と説明しています。WikipediaのPerlin
                noiseの項目によると、Ken
                Perlinがこの方法を開発したのは1983年、論文「An Image
                Synthesizer」で発表したのは1985年で、1997年にはアカデミー賞の技術部門の賞（Academy
                Award for Technical Achievement）を受けています。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>縮尺: 入力に掛ける数で、なめらかさが決まる</h2>
            <p className={para}>
              noise()のなめらかさは、入力をどれだけ細かく進めるかで決まります。
              <code className={code}>noise(x * 0.003)</code>
              のように小さい数を掛けると、隣どうしの入力が近くなり、ゆるやかな起伏になります。
              <code className={code}>noise(x * 0.2)</code>
              のように大きい数を掛けると、random()に近いぎざぎざになります。この掛ける数を、このマニュアルでは縮尺と呼びます。
            </p>
            <CodePreview
              title="縮尺0.003・0.02・0.2"
              language="js"
              code={SCALE_SKETCH}
            />
            <InfoBox type="warning" title="仕様では0〜1、実測では中央に集まる">
              <p>
                公式リファレンスは「noise() always returns values between 0 and
                1.」と書いています。仕様では値の範囲は0〜1です。実測では、0や1の近くの値はほとんど出ません。
                このマニュアルで使っているp5.js
                2.4.0の既定の設定で20万回取り出すことを30回くり返したところ、最小は0.02〜0.08、最大は0.87〜0.91で、0.2未満は約1%、0.8より大きい値は約0.1〜0.2%でした（noiseの種は実行ごとに変わるので、値は毎回少し違います）。
                理由は、noise()が複数の波を重ねて値を作っており、すべての波が同時に最大や最小になることがまれだからです。既定の設定では、重ねる4つの波の強さが0.5・0.25・0.125・0.0625なので、すべてが最大でも合計は0.9375で、1には届きません。
                色や位置に変えるときは、
                <code className={code}>map(n, 0.25, 0.75, ...)</code>
                のように、実際によく出る範囲を入力の範囲にすると、出力の範囲を広く使えます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>2次元のノイズと、時間を足した3次元</h2>
            <p className={para}>
              noise()には引数を3つまで渡せます。
              <code className={code}>noise(x, y)</code>
              は、縦にも横にもなめらかにつながった値を返します。明るさに変えれば雲のような模様になります。3つ目の引数に時間を入れた
              <code className={code}>noise(x, y, t)</code>
              は、その模様が時間とともに少しずつ変形していきます。
            </p>
            <CodePreview title="流れる雲" language="js" code={CLOUD_SKETCH} />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      書き方
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      向いている用途
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <Row
                    name="noise(t)"
                    desc="時間とともにゆらぐ1つの数。位置・大きさ・角度のゆらぎ"
                  />
                  <Row
                    name="noise(x, y)"
                    desc="平面に広がる模様。地形、雲、質感、流れの向き"
                  />
                  <Row
                    name="noise(x, y, t)"
                    desc="時間とともに変形する模様。動く雲、ゆれる水面"
                  />
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>x * 0.008</code>と
                  <code className={code}>y * 0.012</code>
                  をどちらも0.03にする（細かいちぎれ雲になる）
                </li>
                <li>
                  <code className={code}>fill(212, s, b)</code>
                  の212を20にする（夕焼けの色になる）
                </li>
                <li>
                  <code className={code}>map(n, 0.35, 0.65, ...)</code>
                  の2か所を0.48と0.52にする（境目がはっきりし、地図の海岸線のような形になる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>山並みとnoiseDetail()</h2>
            <p className={para}>
              1次元のノイズを高さとして使うと稜線になります。下のスケッチは、5つの稜線を奥から手前へ重ねています。
              2つ目の引数に層ごとに違う数を渡すことで、層ごとに違う形にしています。
            </p>
            <CodePreview
              title="重なる山並み"
              language="js"
              code={MOUNTAIN_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className={code}>noiseDetail()</code>
              は、noise()の細かさを変えます。公式リファレンスによると、noise()の値は「octaves」と呼ばれる層を重ねて作られており、
              既定では4つの層を重ね、1つ重ねるごとに影響が半分になります。1つ目の引数が重ねる数、2つ目が弱まり方です。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>noiseDetail(4, 0.5)</code>を
                  <code className={code}>noiseDetail(1, 0.5)</code>
                  にする（細部がなくなり、なだらかな丘になる。値が最大でも0.5ほどになるので、全体が上へ寄る）
                </li>
                <li>
                  <code className={code}>noiseDetail(8, 0.6)</code>
                  にする（細かい凹凸が増え、岩山のような稜線になる）
                </li>
                <li>
                  <code className={code}>x * 0.006</code>
                  を0.02にする（山の幅が狭くなり、とがった峰が並ぶ）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>フローフィールド</h2>
            <p className={para}>
              2次元のノイズを角度に変えると、場所ごとに向きが決まった「流れの場」になります。これをフローフィールド（flow
              field）と呼びます。式は
              <code className={code}>角度 = noise(x, y) * TWO_PI * 2</code>
              です。下のスケッチの短い線が、その場所の向きです。粒子は、いまいる場所の向きへ進むだけですが、
              隣り合う場所の向きが近いので、なめらかな流れになります。冒頭の作品は、この粒子の通った跡を消さずに残したものです。
            </p>
            <CodePreview
              title="流れの向きと粒子"
              language="js"
              code={FIELD_SKETCH}
            />
            <InfoBox type="info" title="なぜ2を掛けるのか">
              <p>
                noise()の値は中央に集まるので、
                <code className={code}>noise(x, y) * TWO_PI</code>
                だけでは、向きが半周ぶんほどの範囲に偏ります。2を掛けて2周ぶんに広げると、どの向きもまんべんなく現れます。
                <code className={code}>* 2</code>
                を消して、流れが一方向へ寄ることを確かめてください。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="なめらかにさまよう円"
              description="___ を埋めて、円がキャンバスの中をなめらかに動き回るようにしてください。時間を入力にして、0〜1の値を返す関数を使います。"
              preview
              initialCode={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  background(235, 35, 10, 8);
  let t = frameCount * 0.01;
  let x = ___(t) * width;
  let y = ___(t + 100) * height;
  noStroke();
  fill(320, 70, 100);
  circle(x, y, 24);
}`}
              answer={`function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  background(235, 35, 10, 8);
  let t = frameCount * 0.01;
  let x = noise(t) * width;
  let y = noise(t + 100) * height;
  noStroke();
  fill(320, 70, 100);
  circle(x, y, 24);
}`}
              keywords={["noise"]}
              hints={[
                "近い入力に近い値を返す関数noiseを使います。yの入力に100を足しているのは、xと違う動きにするためです",
              ]}
            />
            <CodingChallenge
              title="流れに沿って進む粒子"
              description="___ を埋めて、粒子がノイズで決まる向きへ進むようにしてください。場所からノイズの値を取り、角度に変えます。"
              preview
              initialCode={`let x = 200;
let y = 150;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  let n = ___(x * 0.01, y * 0.01);
  let a = n * ___ * 2;
  x += cos(a) * 2;
  y += sin(a) * 2;
  if (x < 0 || x > width || y < 0 || y > height) {
    x = random(width);
    y = random(height);
  }
  noStroke();
  fill(190, 70, 100, 50);
  circle(x, y, 4);
}`}
              answer={`let x = 200;
let y = 150;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  background(235, 35, 10);
}

function draw() {
  let n = noise(x * 0.01, y * 0.01);
  let a = n * TWO_PI * 2;
  x += cos(a) * 2;
  y += sin(a) * 2;
  if (x < 0 || x > width || y < 0 || y > height) {
    x = random(width);
    y = random(height);
  }
  noStroke();
  fill(190, 70, 100, 50);
  circle(x, y, 4);
}`}
              keywords={["noise", "TWO_PI"]}
              hints={[
                "1つ目の空欄は、場所(x, y)からなめらかな値を返す関数noiseです",
                "2つ目の空欄は、0〜1の値を角度に変えるために掛ける、1周ぶんの角度TWO_PIです",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              冒頭の作品は、紙の色・線の色・流れの縮尺・角度の式の4か所で印象が決まります。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                <code className={code}>background(40, 8, 96)</code>を
                <code className={code}>background(235, 50, 8)</code>
                に、線の色の明るさ50を100に替える。夜空に光の筋が流れる絵になる
              </li>
              <li>
                <code className={code}>let a = n * TWO_PI * 2;</code>を
                <code className={code}>
                  let a = floor(n * 12) * TWO_PI / 6;
                </code>
                にする。向きが60度きざみになり、結晶や回路のような直線の絵になる
              </li>
              <li>
                <code className={code}>strokeWeight(1)</code>
                を0.5に、粒子の数900を2000にする。髪の毛のような繊細な線になる（重いと感じたら数を戻す）
              </li>
              <li>
                粒子をやり直させるときの位置を、キャンバス全体ではなく
                <code className={code}>
                  p.x = 300 + random(-60, 60); p.y = 200 + random(-60, 60);
                </code>
                にする。中央から流れ出す絵になる
              </li>
            </ul>
            <InfoBox type="success" title="気に入った絵を残す">
              <p>
                この作品は、止める時点で絵が変わります。線が積もりきる前の淡い状態も、十分に重なった濃い状態も、それぞれ1枚の作品です。
                枠の下の「一時停止」で止め、「PNG保存」で画像にできます。同じ絵をもう一度出したいときは、
                <code className={code}>noiseSeed(floor(random(100000)))</code>を
                <code className={code}>noiseSeed(7)</code>
                のように決まった番号にし、setup()の先頭に
                <code className={code}>randomSeed(7)</code>
                を足します。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="noise(x * 0.01)で描いた稜線を、もっとぎざぎざにするには？"
              options={[
                { label: "0.01を0.001にする" },
                { label: "0.01を0.1にする", correct: true },
                { label: "noise()の結果に10を掛ける" },
                { label: "noiseSeed()を呼ぶ" },
              ]}
              explanation="入力に掛ける数（縮尺）を大きくすると、隣どうしの入力が離れ、値の差が大きくなります。結果に数を掛けても高さが変わるだけで、なめらかさは変わりません。"
            />
            <Quiz
              question="フローフィールドで粒子がなめらかな流れを描く理由は？"
              options={[
                { label: "粒子どうしが引き合っているから" },
                { label: "粒子の速さが毎フレーム乱数で変わるから" },
                {
                  label: "近い場所のノイズの値が近く、向きも近くなるから",
                  correct: true,
                },
                { label: "粒子がマウスを追いかけているから" },
              ]}
              explanation="noise()は近い入力に近い値を返します。場所を入力にして角度を決めると、隣り合う場所の向きが少しずつしか変わらないので、粒子の通る道はなめらかな曲線になります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "noise()は近い入力に近い値を返す、なめらかにつながった乱数",
                  "入力に掛ける数（縮尺）が小さいほどゆるやかに、大きいほどぎざぎざになる",
                  "noise(x, y)で平面の模様、3つ目の引数に時間を入れると変形する模様になる",
                  "noiseDetail()で重ねる層の数と弱まり方を変え、細部の量を調整できる",
                  "ノイズを角度に変えるとフローフィールドになり、粒子がなめらかな流れを描く",
                  "値は中央に集まるので、map()の入力範囲は実際によく出る範囲に合わせる",
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
                  title: "p5.js Reference: noise()",
                  url: "https://p5js.org/reference/p5/noise/",
                  description:
                    "noise()の仕様。random()との違い、引数の数、由来が書かれている",
                },
                {
                  title: "p5.js Reference: noiseDetail()",
                  url: "https://p5js.org/reference/p5/noiseDetail/",
                  description: "重ねる層（octaves）の数と弱まり方の指定方法",
                },
                {
                  title: "p5.js Reference: noiseSeed()",
                  url: "https://p5js.org/reference/p5/noiseSeed/",
                  description: "ノイズの形を番号で固定する関数の仕様",
                },
                {
                  title: "Wikipedia: Perlin noise",
                  url: "https://en.wikipedia.org/wiki/Perlin_noise",
                  description: "Perlin noiseの歴史と、値の作り方の概要",
                },
                {
                  title: "The Nature of Code: Chapter 0 Randomness",
                  url: "https://natureofcode.com/random/",
                  description:
                    "Daniel Shiffmanによる解説。後半でPerlin noiseとその使い方を扱っている",
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
