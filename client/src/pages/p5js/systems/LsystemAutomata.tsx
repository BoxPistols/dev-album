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

// このページの完成形。開いた時点で動いていて、マウスを動かした所に新しいセルが生まれる
const HERO_SKETCH = `let cols = 75;
let rows = 50;
let size = 8;
// 0は死んでいるセル。1以上は生き続けている世代数
let age = [];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  for (let y = 0; y < rows; y++) {
    age[y] = [];
    for (let x = 0; x < cols; x++) {
      age[y][x] = random() < 0.22 ? 1 : 0;
    }
  }
  background(250, 50, 7);
}

function draw() {
  // 半透明で塗り重ねて、消えたセルの跡を少し残す
  background(250, 50, 7, 30);

  // マウスが枠の中で動いたら、そのまわりに種をまく
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
      sow(floor(mouseX / size), floor(mouseY / size));
    }
  }
  // 放っておいても止まらないよう、ときどき自動でまく
  if (frameCount % 180 === 0) {
    sow(floor(random(cols)), floor(random(rows)));
  }
  // 6フレームに1回、世代を進める
  if (frameCount % 6 === 0) advance();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let a = age[y][x];
      if (a === 0) continue;
      // 生まれたては黄、世代を重ねると赤、紫、青へ移る
      let k = min(a, 24) / 24;
      fill((50 - k * 200 + 360) % 360, 70, 100);
      circle(x * size + size / 2, y * size + size / 2, size * 0.85);
    }
  }
}

function sow(cx, cy) {
  for (let i = 0; i < 9; i++) {
    let x = (cx + floor(random(-3, 4)) + cols) % cols;
    let y = (cy + floor(random(-3, 4)) + rows) % rows;
    if (age[y][x] === 0) age[y][x] = 1;
  }
}

function advance() {
  let next = [];
  for (let y = 0; y < rows; y++) {
    next[y] = [];
    for (let x = 0; x < cols; x++) {
      // まわり8マスのうち、生きているセルを数える
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          let xx = (x + dx + cols) % cols;
          let yy = (y + dy + rows) % rows;
          if (age[yy][xx] > 0) n++;
        }
      }
      if (age[y][x] > 0) {
        // 生存: まわりが2つか3つなら生き続ける
        next[y][x] = n === 2 || n === 3 ? age[y][x] + 1 : 0;
      } else {
        // 誕生: まわりがちょうど3つなら生まれる
        next[y][x] = n === 3 ? 1 : 0;
      }
    }
  }
  age = next;
}`;

const ALGAE_SKETCH = `// 書き換え規則。AはABに、BはAに置き換える
let rules = { A: 'AB', B: 'A' };

function setup() {
  createCanvas(600, 340);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(13);
}

function draw() {
  background(160, 35, 8);
  // 50フレームごとに、見せる世代を1つ増やす
  let shown = floor(frameCount / 50) % 10 + 1;
  if (shown > 9) shown = 9;

  noStroke();
  fill(160, 10, 80);
  text('A -> AB    B -> A', 440, 24);

  let s = 'A';
  for (let n = 0; n < shown; n++) {
    let y = 34 + n * 34;
    fill(160, 10, 80);
    text('n = ' + n, 14, y + 5);
    for (let i = 0; i < s.length; i++) {
      if (s[i] === 'A') {
        fill(140, 60, 95);
        circle(74 + i * 9.4, y, 8);
      } else {
        fill(50, 70, 100);
        circle(74 + i * 9.4, y, 5);
      }
    }
    s = rewrite(s);
  }
}

function rewrite(s) {
  let next = '';
  // 全部の文字を、同時に規則どおり置き換える
  for (let i = 0; i < s.length; i++) {
    next += rules[s[i]];
  }
  return next;
}`;

const TURTLE_SKETCH = `let rules = { F: 'F[+F]F[-F]F' };
let sentence = 'F';

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  // 規則を4回適用する
  for (let n = 0; n < 4; n++) {
    sentence = rewrite(sentence);
  }
}

function draw() {
  background(150, 35, 8);

  // 曲がる角度。マウスが枠の中にあれば横位置で変える
  let angle = radians(25.7) + sin(frameCount * 0.02) * 0.03;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    angle = map(mouseX, 0, width, 0, radians(60));
  }

  translate(width / 2, height - 12);
  stroke(95, 55, 92, 85);
  strokeWeight(1.6);
  turtle(sentence, 4.4, angle);
}

function rewrite(s) {
  let next = '';
  for (let i = 0; i < s.length; i++) {
    // 規則がある文字は置き換え、無い文字はそのまま残す
    next += rules[s[i]] || s[i];
  }
  return next;
}

// 文字列を1文字ずつ読んで、亀を動かす
function turtle(s, len, angle) {
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (ch === 'F') {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (ch === '+') {
      rotate(-angle);
    } else if (ch === '-') {
      rotate(angle);
    } else if (ch === '[') {
      push();
    } else if (ch === ']') {
      pop();
    }
  }
}`;

const GARDEN_SKETCH = `// 3種類の植物。違うのは規則・回数・角度・1歩の長さだけ
let plants = [
  { axiom: 'F', rules: { F: 'F[+F]F[-F][F]' }, n: 5, deg: 20, len: 5.2, hue: 95 },
  { axiom: 'F', rules: { F: 'FF-[-F+F+F]+[+F-F-F]' }, n: 4, deg: 22.5, len: 5.2, hue: 165 },
  { axiom: 'X', rules: { X: 'F-[[X]+X]+F[+FX]-X', F: 'FF' }, n: 5, deg: 22.5, len: 4, hue: 320 },
];

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  render();
}

// 動かない絵なのでdraw()は書かず、必要なときだけrender()を呼ぶ
function render() {
  background(225, 45, 9);
  for (let k = 0; k < plants.length; k++) {
    let p = plants[k];
    let s = p.axiom;
    for (let n = 0; n < p.n; n++) {
      s = rewrite(s, p.rules);
    }
    push();
    translate(110 + k * 190, height - 24);
    stroke(p.hue, 50, 95, 70);
    strokeWeight(1);
    // 角度を少しだけばらつかせる
    turtle(s, p.len, radians(p.deg + random(-3, 3)));
    pop();
  }
  // 地面
  stroke(225, 20, 40);
  strokeWeight(1);
  line(20, height - 24, width - 20, height - 24);
}

function rewrite(s, rules) {
  let next = '';
  for (let i = 0; i < s.length; i++) {
    next += rules[s[i]] || s[i];
  }
  return next;
}

function turtle(s, len, angle) {
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (ch === 'F') {
      line(0, 0, 0, -len);
      translate(0, -len);
    } else if (ch === '+') {
      rotate(-angle);
    } else if (ch === '-') {
      rotate(angle);
    } else if (ch === '[') {
      push();
    } else if (ch === ']') {
      pop();
    }
  }
}

function mousePressed() {
  // クリックで、角度を変えて植え直す
  render();
}`;

const ELEMENTARY_SKETCH = `let ruleList = [30, 90, 110];
let which = 0;
let size = 4;
let cells = [];
let row = 0;
let wait = 0;

function setup() {
  createCanvas(600, 420);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  textSize(14);
  start();
}

function start() {
  background(230, 45, 9);
  row = 0;
  wait = 0;
  let count = width / size;
  cells = [];
  for (let i = 0; i < count; i++) cells[i] = 0;
  // 最初は1マスだけを1にする。110番は右端、ほかは中央
  if (ruleList[which] === 110) {
    cells[count - 1] = 1;
  } else {
    cells[count / 2] = 1;
  }
  drawTable(ruleList[which]);
}

// 上の段に8通りの近傍（111から000）、その下に次の状態を描く
function drawTable(rule) {
  fill(230, 10, 90);
  text('rule ' + rule, 14, 28);
  for (let k = 7; k >= 0; k--) {
    let x = 110 + (7 - k) * 60;
    for (let b = 0; b < 3; b++) {
      let on = floor(k / pow(2, 2 - b)) % 2;
      fill(230, 20, on === 1 ? 95 : 28);
      rect(x + b * 13, 8, 11, 11);
    }
    let out = floor(rule / pow(2, k)) % 2;
    fill(40, out === 1 ? 75 : 20, out === 1 ? 100 : 28);
    rect(x + 13, 23, 11, 11);
  }
}

function draw() {
  let rule = ruleList[which];
  // 1フレームに2行ずつ進める
  for (let s = 0; s < 2; s++) {
    let y = 48 + row * size;
    if (y + size > height) {
      // 下端まで来たら少し待って、次の規則へ移る
      wait++;
      if (wait > 240) {
        which = (which + 1) % ruleList.length;
        start();
      }
      return;
    }
    fill(map(row, 0, 93, 190, 330), 55, 100);
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === 1) rect(i * size, y, size, size);
    }

    // 次の行を作る
    let next = [];
    let count = cells.length;
    for (let i = 0; i < count; i++) {
      // 両端の外側は0として扱う
      let left = i > 0 ? cells[i - 1] : 0;
      let me = cells[i];
      let right = i < count - 1 ? cells[i + 1] : 0;
      // 3マスの並びを0〜7の番号にする（111なら7、000なら0）
      let k = left * 4 + me * 2 + right;
      // 規則番号を2進数で書いたときのk桁目が、次の状態
      next[i] = floor(rule / pow(2, k)) % 2;
    }
    cells = next;
    row++;
  }
}

function mousePressed() {
  // クリックで次の規則へ
  which = (which + 1) % ruleList.length;
  start();
}`;

const LIFE_SKETCH = `let cols = 60;
let rows = 40;
let size = 10;
let grid = [];

function setup() {
  createCanvas(600, 400);
  noStroke();
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = random() < 0.25 ? 1 : 0;
    }
  }
}

function draw() {
  background(16, 20, 40);

  if (mouseIsPressed) {
    // 押しているあいだは時間を止めて、セルを描き込む
    let x = floor(mouseX / size);
    let y = floor(mouseY / size);
    if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y][x] = 1;
  } else if (frameCount % 6 === 0) {
    grid = nextGeneration(grid);
  }

  fill(120, 230, 200);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) rect(x * size + 1, y * size + 1, size - 2, size - 2, 2);
    }
  }
}

function nextGeneration(now) {
  let next = [];
  for (let y = 0; y < rows; y++) {
    next[y] = [];
    for (let x = 0; x < cols; x++) {
      let n = countNeighbors(now, x, y);
      if (now[y][x] === 1) {
        // 生存: 2つか3つなら生き続け、それ以外は死ぬ
        next[y][x] = n === 2 || n === 3 ? 1 : 0;
      } else {
        // 誕生: ちょうど3つなら生まれる
        next[y][x] = n === 3 ? 1 : 0;
      }
    }
  }
  return next;
}

function countNeighbors(now, x, y) {
  let n = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      // 端は反対側につなげる
      let xx = (x + dx + cols) % cols;
      let yy = (y + dy + rows) % rows;
      n += now[yy][xx];
    }
  }
  return n;
}

function keyPressed() {
  // cキーで全部消す
  if (key === 'c') {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) grid[y][x] = 0;
    }
  }
}`;

const TURTLE_ROWS: [string, string, string][] = [
  ["F", "1歩前へ進み、線を引く", "line()とtranslate()"],
  ["+", "左へ決まった角度だけ向きを変える", "rotate(-angle)"],
  ["-", "右へ決まった角度だけ向きを変える", "rotate(angle)"],
  ["[", "いまの位置と向きを覚えておく", "push()"],
  ["]", "最後に覚えた位置と向きへ戻る", "pop()"],
];

const NEIGHBOR_ROWS: [string, string, string, string][] = [
  ["111", "0", "0", "0"],
  ["110", "0", "1", "1"],
  ["101", "0", "0", "1"],
  ["100", "1", "1", "0"],
  ["011", "1", "1", "1"],
  ["010", "1", "0", "1"],
  ["001", "1", "1", "1"],
  ["000", "0", "0", "0"],
];

export default function LsystemAutomata() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 18</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          L-systemとセルオートマトン
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          このページで扱う2つの仕組みは、どちらも「短い規則を、全体に同時に、何度も適用する」ものです。
          L-systemは文字列を書き換えて植物の形を作り、セルオートマトンはマス目の状態を書き換えて模様や動きを作ります。
          下の枠はセルオートマトンの1つ、ライフゲームです。枠の中でマウスを動かすと、通った所にセルが生まれます。
        </p>

        <CodePreview
          title="種をまけるライフゲーム（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          色は、そのセルが生き続けている世代数です。生まれたばかりは黄色で、長く残るほど赤、紫、青へ移ります。
        </p>

        <WhyNowBox
          title="なぜここで学ぶのか"
          tags={[
            "L-system",
            "タートルグラフィックス",
            "セルオートマトン",
            "ライフゲーム",
          ]}
        >
          <p>
            前のページの再帰は、絵を描く手順そのものを入れ子にしました。このページでは、手順ではなく
            <strong>規則</strong>
            を書きます。規則は1〜2行なのに、適用をくり返すと予想しにくい形が現れます。規則を1文字変えると別の絵になるので、数値を調整するのとは違う探し方ができます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className={h2}>L-system: 文字列を書き換える</h2>
            <p className={para}>
              L-system（Lindenmayer
              system）は、理論生物学者・植物学者のアリスティド・リンデンマイヤーが1968年に発表した仕組みです。植物の細胞のふるまいと成長の過程を記述するために作られました。
              用意するものは3つです。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-4">
              <li>使う文字（アルファベット）</li>
              <li>最初の文字列（公理、axiom）</li>
              <li>「この文字はこの文字列に置き換える」という書き換え規則</li>
            </ul>
            <p className={para}>
              下は、リンデンマイヤーが藻の成長を表すのに使った規則です。「AはABに、BはAに」の2つだけで、最初の文字列はAです。
              大きい円がA、小さい円がBです。1行下がるごとに、すべての文字が
              <strong className="text-foreground">同時に</strong>
              置き換わります。
            </p>
            <CodePreview
              title="藻の規則（A→AB、B→A）をくり返す"
              language="js"
              code={ALGAE_SKETCH}
            />
            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              文字数は1、2、3、5、8、13…と増えていきます。書き換えを行うrewrite()は、文字列を先頭から読み、規則の表
              <code className={code}>rules</code>
              を引いて新しい文字列を組み立てているだけです。
            </p>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>B: &apos;A&apos;</code>を
                  <code className={code}>B: &apos;AA&apos;</code>
                  にする（増え方が速くなり、すぐ右端を越える）
                </li>
                <li>
                  <code className={code}>let s = &apos;A&apos;</code>を
                  <code className={code}>&apos;B&apos;</code>
                  にする（同じ並びが1行遅れて現れる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>文字を「亀への命令」として読む</h2>
            <p className={para}>
              文字列を絵にするには、1文字ずつを描画の命令として読みます。ペンを持った亀が、命令どおりに歩いて線を引くと考えるので、タートルグラフィックスと呼ばれます。
              植物を描くL-systemでは、次の5文字がよく使われます。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      文字
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      亀の動き
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      p5.jsでの書き方
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {TURTLE_ROWS.map(([ch, meaning, p5]) => (
                    <tr key={ch} className="border-t border-border">
                      <th
                        scope="row"
                        className="text-left p-3 font-mono font-normal"
                      >
                        {ch}
                      </th>
                      <td className="p-3">{meaning}</td>
                      <td className="p-3 font-mono">{p5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={para}>
              <code className={code}>[</code>と<code className={code}>]</code>
              が枝分かれを作ります。
              <code className={code}>[</code>
              で位置を覚え、枝を1本描き、
              <code className={code}>]</code>
              で分かれ道へ戻ります。前のページの木で使ったpush()とpop()と同じ役割です。
              下のスケッチの規則は
              <code className={code}>F → F[+F]F[-F]F</code>
              の1つだけで、これを4回適用した文字列を亀が読んでいます。マウスを左右に動かすと、曲がる角度が変わります。
            </p>
            <CodePreview
              title="規則1つから育つ植物"
              language="js"
              code={TURTLE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>n &lt; 4</code>
                  を2にする（適用が2回になり、規則の形がそのまま読み取れる）。5にするときは
                  <code className={code}>turtle(sentence, 4.4, angle)</code>
                  の4.4を1.5にする
                </li>
                <li>
                  規則を
                  <code className={code}>&apos;F[+F]F[-F][F]&apos;</code>
                  にする（末尾の1文字を角かっこで囲むだけで、枝ぶりが変わる）
                </li>
                <li>
                  規則を
                  <code className={code}>&apos;FF+[+F-F-F]-[-F+F+F]&apos;</code>
                  にして、4.4を9にする（茂みのような形になる）
                </li>
              </ul>
            </InfoBox>
            <InfoBox type="warning" title="文字列は急に長くなる">
              <p>
                この規則ではFが1回の適用で5個に増えます。4回で625個、6回で1万5千個を超えます。draw()の中で毎フレーム読むなら、回数は4〜5回までにします。
                それ以上の回数で描きたいときは、次のスケッチのように1回だけ描いて止めます。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>規則を変えると別の植物になる</h2>
            <p className={para}>
              亀の読み方はそのままで、規則だけを取り替えます。下の3つは、プルシンキェヴィチとリンデンマイヤーの著書『The
              Algorithmic Beauty of
              Plants』（1990年）の図に載っている規則です。この本は著者の研究グループのサイトでPDFが公開されています。
              右の植物の規則にあるXは「描かないが、置き換えには使う」文字で、芽の役をしています。クリックすると、角度を少し変えて植え直します。
            </p>
            <CodePreview
              title="3つの規則が並ぶ庭"
              language="js"
              code={GARDEN_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  どれかの<code className={code}>deg</code>
                  を35にする（枝が大きく開く）、10にする（細長くなる）
                </li>
                <li>
                  右の植物の<code className={code}>n: 5</code>
                  を3にして、<code className={code}>len</code>
                  を14にする（若い苗の姿になる）
                </li>
                <li>
                  <code className={code}>random(-3, 3)</code>を
                  <code className={code}>random(-12, 12)</code>
                  にする（クリックのたびに姿が大きく変わる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>1次元セルオートマトン</h2>
            <p className={para}>
              セルオートマトンは、マス目（セル）の並びを、決まった規則で一斉に書き換えていく仕組みです。いちばん単純なものは、横1列のセルがそれぞれ0か1の値を持ち、
              次の値を「左隣・自分・右隣」の3マスだけで決めます。
            </p>
            <p className={para}>
              3マスの並びは111から000までの8通りです。それぞれに次の値（0か1）を決めれば、規則が1つ決まります。8個の0と1を並べて2進数として読んだ数が、規則の番号です。
              たとえば00011110は10進数で30なので「ルール30」と呼びます。規則は全部で256通りあります。この番号の付け方は、スティーブン・ウルフラムが1983年に導入しました。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <caption className="text-left text-muted-foreground mb-2">
                  3マスの並びと次の値。下の行を左から読むと、規則番号の2進数になる
                </caption>
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      左・自分・右
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      ルール30
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      ルール90
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      ルール110
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {NEIGHBOR_ROWS.map(([pattern, r30, r90, r110]) => (
                    <tr key={pattern} className="border-t border-border">
                      <th
                        scope="row"
                        className="text-left p-3 font-mono font-normal"
                      >
                        {pattern}
                      </th>
                      <td className="p-3 font-mono">{r30}</td>
                      <td className="p-3 font-mono">{r90}</td>
                      <td className="p-3 font-mono">{r110}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      2進数
                    </th>
                    <td className="p-3 font-mono">00011110</td>
                    <td className="p-3 font-mono">01011010</td>
                    <td className="p-3 font-mono">01101110</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={para}>
              下のスケッチは、1列を1行として上から下へ時間を進めます。上端には、いまの規則の8通りの対応を図で出しています。
              最初に1になっているセルは1つだけです。下端まで進むと次の規則へ移り、クリックでも切り替わります。
            </p>
            <CodePreview
              title="ルール30・90・110"
              language="js"
              code={ELEMENTARY_SKETCH}
            />
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mt-4 mb-4">
              <li>
                <strong className="text-foreground">ルール30</strong>:
                規則は単純なのに、不規則に見える模様が続く。数式処理ソフトMathematicaの乱数生成に使われていた時期がある
              </li>
              <li>
                <strong className="text-foreground">ルール90</strong>:
                前のページのシェルピンスキーのギャスケットが現れる
              </li>
              <li>
                <strong className="text-foreground">ルール110</strong>:
                規則的な地の上を、いくつかの形が動いてぶつかり合う。初期状態をうまく作ると、どんな計算も表せること（計算万能性）が示されている
              </li>
            </ul>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>ruleList = [30, 90, 110]</code>
                  に0〜255の好きな番号を足す。18、45、73、150、184あたりは模様がはっきり出る
                </li>
                <li>
                  最初の状態を
                  <code className={code}>
                    cells[i] = random() &lt; 0.5 ? 1 : 0
                  </code>
                  にする（110番の「動く形」が画面全体に現れる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>ライフゲーム</h2>
            <p className={para}>
              マス目を2次元に広げ、まわり8マスを見て次の状態を決めるセルオートマトンが、ライフゲームです。イギリスの数学者ジョン・ホートン・コンウェイが1970年に考案しました。
              各セルは「生」か「死」のどちらかで、規則は次の2つにまとまります。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      いまの状態
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      まわり8マスの生きたセルの数
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      次の状態
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      死
                    </th>
                    <td className="p-3">ちょうど3</td>
                    <td className="p-3">生（誕生）</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      生
                    </th>
                    <td className="p-3">2または3</td>
                    <td className="p-3">生（生存）</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      生
                    </th>
                    <td className="p-3">1以下（過疎）、4以上（過密）</td>
                    <td className="p-3">死</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={para}>
              この規則は、誕生（Birth）が3、生存（Survival）が2と3であることから「B3/S23」とも書きます。
              下のスケッチは色を1つにした最小の形です。マウスを押しているあいだは時間が止まり、なぞった所にセルを描き込めます。cキーで全部消せます。
            </p>
            <CodePreview
              title="描き込めるライフゲーム"
              language="js"
              code={LIFE_SKETCH}
            />
            <InfoBox type="warning" title="次の世代は別の配列に作る">
              <p>
                nextGeneration()は、結果を新しい配列nextに書いています。いまの配列を直接書き換えると、先に更新したセルの新しい値を、隣のセルが数えてしまいます。
                「全部のセルを同時に書き換える」ためには、読む配列と書く配列を分ける必要があります。L-systemのrewrite()が新しい文字列を組み立てていたのも同じ理由です。
              </p>
            </InfoBox>
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  cキーで消してから、斜めに進む5マスの形「グライダー」を描く（3×3の範囲で、1行目は中央、2行目は右端、3行目は3マス全部）
                </li>
                <li>
                  誕生の条件を
                  <code className={code}>n === 3 || n === 6</code>
                  にする（HighLifeと呼ばれる別の規則になる）
                </li>
                <li>
                  <code className={code}>random() &lt; 0.25</code>
                  を0.6にする（過密ですぐに数が減る）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className={h2}>やってみよう</h2>
            <CodingChallenge
              title="枝分かれの命令を足す"
              description="___ を埋めて、[ で位置と向きを覚え、] で元へ戻るようにしてください。埋めると枝分かれした植物が描かれます。"
              preview
              initialCode={`let rules = { F: 'FF', X: 'F[+X]F[-X]+X' };
let sentence = 'X';

function setup() {
  createCanvas(400, 380);
  colorMode(HSB, 360, 100, 100, 100);
  for (let n = 0; n < 5; n++) {
    let next = '';
    for (let i = 0; i < sentence.length; i++) {
      next += rules[sentence[i]] || sentence[i];
    }
    sentence = next;
  }
}

function draw() {
  background(150, 35, 8);
  stroke(95, 55, 92, 85);
  translate(width / 2, height - 10);
  let angle = radians(20);
  for (let i = 0; i < sentence.length; i++) {
    let ch = sentence[i];
    if (ch === 'F') {
      line(0, 0, 0, -5.5);
      translate(0, -5.5);
    } else if (ch === '+') {
      rotate(-angle);
    } else if (ch === '-') {
      rotate(angle);
    } else if (ch === '[') {
      ___();
    } else if (ch === ']') {
      ___();
    }
  }
}`}
              answer={`let rules = { F: 'FF', X: 'F[+X]F[-X]+X' };
let sentence = 'X';

function setup() {
  createCanvas(400, 380);
  colorMode(HSB, 360, 100, 100, 100);
  for (let n = 0; n < 5; n++) {
    let next = '';
    for (let i = 0; i < sentence.length; i++) {
      next += rules[sentence[i]] || sentence[i];
    }
    sentence = next;
  }
}

function draw() {
  background(150, 35, 8);
  stroke(95, 55, 92, 85);
  translate(width / 2, height - 10);
  let angle = radians(20);
  for (let i = 0; i < sentence.length; i++) {
    let ch = sentence[i];
    if (ch === 'F') {
      line(0, 0, 0, -5.5);
      translate(0, -5.5);
    } else if (ch === '+') {
      rotate(-angle);
    } else if (ch === '-') {
      rotate(angle);
    } else if (ch === '[') {
      push();
    } else if (ch === ']') {
      pop();
    }
  }
}`}
              keywords={["push", "pop"]}
              hints={[
                "[ は「いまの位置と向きを覚える」命令です。座標変換を保存する関数push()を呼びます",
                "] は「最後に覚えた所へ戻る」命令です。保存した座標変換を取り出す関数pop()を呼びます",
              ]}
            />
            <CodingChallenge
              title="ライフゲームの規則を書く"
              description="___ を埋めて、誕生と過疎の条件を完成させてください。数はどちらも、まわり8マスの生きたセルの数です。"
              preview
              initialCode={`let cols = 40;
let rows = 30;
let grid = [];

function setup() {
  createCanvas(400, 300);
  noStroke();
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) grid[y][x] = random() < 0.3 ? 1 : 0;
  }
}

function draw() {
  background(16, 20, 40);
  fill(255, 200, 90);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) rect(x * 10 + 1, y * 10 + 1, 8, 8, 2);
    }
  }
  if (frameCount % 6 !== 0) return;

  let next = [];
  for (let y = 0; y < rows; y++) {
    next[y] = [];
    for (let x = 0; x < cols; x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          n += grid[(y + dy + rows) % rows][(x + dx + cols) % cols];
        }
      }
      next[y][x] = grid[y][x];
      // 誕生: 死んだセルのまわりに、生きたセルがちょうどいくつ？
      if (grid[y][x] === 0 && n === ___) next[y][x] = 1;
      // 過疎と過密: 生きたセルが少なすぎても多すぎても死ぬ
      if (grid[y][x] === 1 && (n < ___ || n > 3)) next[y][x] = 0;
    }
  }
  grid = next;
}`}
              answer={`let cols = 40;
let rows = 30;
let grid = [];

function setup() {
  createCanvas(400, 300);
  noStroke();
  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) grid[y][x] = random() < 0.3 ? 1 : 0;
  }
}

function draw() {
  background(16, 20, 40);
  fill(255, 200, 90);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) rect(x * 10 + 1, y * 10 + 1, 8, 8, 2);
    }
  }
  if (frameCount % 6 !== 0) return;

  let next = [];
  for (let y = 0; y < rows; y++) {
    next[y] = [];
    for (let x = 0; x < cols; x++) {
      let n = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          n += grid[(y + dy + rows) % rows][(x + dx + cols) % cols];
        }
      }
      next[y][x] = grid[y][x];
      // 誕生: 死んだセルのまわりに、生きたセルがちょうどいくつ？
      if (grid[y][x] === 0 && n === 3) next[y][x] = 1;
      // 過疎と過密: 生きたセルが少なすぎても多すぎても死ぬ
      if (grid[y][x] === 1 && (n < 2 || n > 3)) next[y][x] = 0;
    }
  }
  grid = next;
}`}
              keywords={["=== 3", "< 2"]}
              hints={[
                "誕生の条件はB3/S23のB3です。まわりの生きたセルがちょうど3つのときなので、空欄に3を入れます",
                "生存できるのは2つか3つのときです。2つより少ないと過疎で死ぬので、空欄に2を入れます",
              ]}
            />
          </section>

          <section>
            <h2 className={h2}>作品にする</h2>
            <p className={para}>
              規則を探すこと自体が制作になります。気に入った規則は、文字列や番号としてそのまま記録しておけます。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                庭のスケッチで、Fを描くときの
                <code className={code}>strokeWeight()</code>
                を、push()の深さに応じて細くする。深さは[で1増やし、]で1減らす変数で数えられる
              </li>
              <li>
                亀の命令に自分の文字を足す。たとえば
                <code className={code}>L</code>
                を「小さな円を描く」にして規則の中に混ぜると、葉や花が付く
              </li>
              <li>
                <code className={code}>+</code>と<code className={code}>-</code>
                の角度に乱数を足し、同じ規則から1本ずつ違う木を並べる
              </li>
              <li>
                冒頭のライフゲームで、世代数を色ではなく円の大きさに使う。古いセルほど大きくすると、安定した形が浮かび上がる
              </li>
              <li>
                1次元セルオートマトンの行を、直線ではなく円周に沿って並べる。時間が外へ広がる年輪のような絵になる
              </li>
            </ul>
          </section>

          <section>
            <h2 className={h2}>理解度チェック</h2>
            <Quiz
              question="L-systemの文字列に出てくる [ と ] の役割は？"
              options={[
                { label: "線の太さを変える" },
                {
                  label: "[ で位置と向きを覚え、] でそこへ戻る。枝分かれを作る",
                  correct: true,
                },
                { label: "規則の適用を1回止める" },
                { label: "文字列の始まりと終わりを示す" },
              ]}
              explanation="[ で亀の状態（位置と向き）を覚え、枝を描いたあと ] で分かれ道へ戻ります。p5.jsではpush()とpop()に対応します。"
            />
            <Quiz
              question="ライフゲームで、次の世代を別の配列に作るのはなぜ？"
              options={[
                { label: "配列を2つ使うと描画が速くなるから" },
                { label: "p5.jsでは配列を書き換えられないから" },
                {
                  label:
                    "すべてのセルを、同じ「いまの状態」をもとに同時に更新するため",
                  correct: true,
                },
                { label: "古い配列を保存して巻き戻すため" },
              ]}
              explanation="いまの配列を直接書き換えると、更新済みのセルの値を隣のセルが数えてしまい、規則どおりになりません。読む配列と書く配列を分けることで、全セルの同時更新になります。"
            />
          </section>

          <section>
            <h2 className={h2}>このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "L-systemは、最初の文字列に書き換え規則をくり返し適用して長い文字列を作る",
                  "文字列はF・+・-・[・]を亀への命令として読むと絵になる。[と]はpush()とpop()",
                  "1次元セルオートマトンは左・自分・右の8通りで次の値を決め、その対応を2進数で読んだ数が規則番号になる",
                  "ライフゲームの規則はB3/S23。まわり3つで誕生、2つか3つで生存",
                  "同時に書き換えるために、結果は新しい文字列・新しい配列に作る",
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
              title="参考リンク"
              links={[
                {
                  title: "The Algorithmic Beauty of Plants（公開PDF）",
                  url: "https://algorithmicbotany.org/papers/#abop",
                  description:
                    "L-systemによる植物のモデル化をまとめた本。庭のスケッチの規則は第1章の図に載っている",
                },
                {
                  title: "Wikipedia: L-system",
                  url: "https://en.wikipedia.org/wiki/L-system",
                  description:
                    "藻の規則をはじめとする例と、亀の命令への読み替え",
                },
                {
                  title: "The Nature of Code: Chapter 7 Cellular Automata",
                  url: "https://natureofcode.com/cellular-automata/",
                  description:
                    "1次元セルオートマトンとライフゲームをp5.jsで実装する章",
                },
                {
                  title: "Wolfram MathWorld: Elementary Cellular Automaton",
                  url: "https://mathworld.wolfram.com/ElementaryCellularAutomaton.html",
                  description: "256通りの規則と番号の付け方",
                },
                {
                  title: "Wolfram MathWorld: Rule 30",
                  url: "https://mathworld.wolfram.com/Rule30.html",
                  description: "ルール30の性質と、乱数生成への利用",
                },
                {
                  title: "Wikipedia: Conway's Game of Life",
                  url: "https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life",
                  description: "規則の原文と、グライダーなどの代表的な形",
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
