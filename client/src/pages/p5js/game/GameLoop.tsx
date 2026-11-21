import CodePreview from "@/components/CodePreview";
import InfoBox from "@/components/InfoBox";
import WhyNowBox from "@/components/WhyNowBox";
import PageNavigation from "@/components/PageNavigation";
import Quiz from "@/components/Quiz";
import ReferenceLinks from "@/components/ReferenceLinks";
import CodingChallenge from "@/components/CodingChallenge";

const code = "bg-muted px-1 py-0.5 rounded text-xs";

// このページの完成形。操作されるまでは自動操縦で動き、開いた時点で遊んでいる様子が見える
const HERO_SKETCH = `// ひかりうけ: 落ちてくる光をランタンで受け、岩をよける
let player;
let items = [];
let stars = [];
let score = 0;
let life = 3;
let elapsed = 0;
let spawnTimer = 0;
let over = false;
let demo = true;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  textFont('sans-serif');
  for (let i = 0; i < 70; i++) {
    stars.push({ x: random(width), y: random(height), s: random(1, 2.4) });
  }
  resetGame();
}

function resetGame() {
  player = { x: width / 2, y: height - 46, r: 24 };
  items = [];
  score = 0;
  life = 3;
  elapsed = 0;
  spawnTimer = 0;
  over = false;
}

function draw() {
  // 前のフレームからの経過時間（秒）
  const dt = min(deltaTime, 50) / 1000;
  if (!over) {
    readInput(dt);
    updateItems(dt);
  }
  drawScene();
  drawHud();
}

// 入力: 矢印キーとマウスのどちらでも動かせる
function readInput(dt) {
  const speed = 420;
  let used = false;
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= speed * dt;
    used = true;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += speed * dt;
    used = true;
  }
  if (mouseX !== pmouseX && mouseY > 0 && mouseY < height) {
    player.x = mouseX;
    used = true;
  }
  if (used && demo) {
    // 操作された時点で、最初から始める
    demo = false;
    const x = player.x;
    resetGame();
    player.x = x;
  }
  if (demo) {
    // 自動操縦: いちばん下にある光へ寄っていく
    let target = null;
    for (const it of items) {
      if (it.kind === 'light' && (target === null || it.y > target.y)) target = it;
    }
    if (target !== null) {
      player.x += constrain(target.x - player.x, -speed * dt * 0.7, speed * dt * 0.7);
    }
  }
  player.x = constrain(player.x, player.r, width - player.r);
}

// 更新: 出す、落とす、当たりを調べる、消す
function updateItems(dt) {
  elapsed += dt;
  // 難易度は時間とともに上がり、3で頭打ちになる
  const level = min(3, 1 + elapsed / 30);
  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = 0.7 / level;
    const isRock = random() < 0.3;
    items.push({
      kind: isRock ? 'rock' : 'light',
      x: random(30, width - 30),
      y: -20,
      r: isRock ? 15 : 10,
      vy: random(110, 170) * (0.5 + level * 0.5),
      hit: false,
    });
  }
  for (const it of items) {
    it.y += it.vy * dt;
    // 円同士の当たり判定
    if (dist(it.x, it.y, player.x, player.y) < it.r + player.r) {
      it.hit = true;
      if (it.kind === 'light') score += 10;
      else if (!demo) life -= 1;
    }
  }
  items = items.filter((it) => !it.hit && it.y < height + 30);
  if (life <= 0) over = true;
}

function drawScene() {
  background(236, 50, 9);
  noStroke();
  // 地平線に近いほど明るくなる空と、手前の丘
  for (let i = 0; i < 7; i++) {
    fill(268, 55, 42, 7);
    rect(0, height - 170 + i * 24, width, 170 - i * 24);
  }
  fill(220, 20, 95, 55);
  for (const s of stars) circle(s.x, s.y, s.s);
  fill(240, 45, 6);
  ellipse(150, height + 60, 520, 170);
  ellipse(480, height + 70, 460, 170);

  for (const it of items) {
    if (it.kind === 'light') {
      // 尾を引く光
      stroke(46, 50, 100, 30);
      strokeWeight(2);
      line(it.x, it.y - it.r * 4.5, it.x, it.y);
      noStroke();
      fill(46, 70, 100, 14);
      circle(it.x, it.y, it.r * 4.4);
      fill(46, 60, 100, 28);
      circle(it.x, it.y, it.r * 2.8);
      fill(50, 25, 100);
      circle(it.x, it.y, it.r * 1.5);
    } else {
      // 岩は角ばった形にして、色以外でも見分けられるようにする
      push();
      translate(it.x, it.y);
      rotate(it.y * 0.02);
      fill(228, 25, 38);
      stroke(228, 15, 78);
      strokeWeight(2);
      square(-it.r, -it.r, it.r * 2);
      pop();
    }
  }

  // ランタン
  noStroke();
  fill(40, 70, 100, 10);
  circle(player.x, player.y, player.r * 3.6);
  fill(40, 60, 100, 20);
  circle(player.x, player.y, player.r * 2.7);
  fill(44, 30, 100);
  circle(player.x, player.y, player.r * 2);
  noFill();
  stroke(30, 55, 62);
  strokeWeight(3);
  circle(player.x, player.y, player.r * 2 - 9);
  arc(player.x, player.y - player.r, player.r, player.r, PI, TWO_PI);
}

function drawHud() {
  noStroke();
  fill(0, 0, 100, 90);
  textAlign(LEFT, TOP);
  textSize(18);
  text('SCORE ' + score, 16, 14);
  textAlign(RIGHT, TOP);
  text('のこり ' + life, width - 16, 14);
  textAlign(CENTER, CENTER);
  if (demo) {
    textSize(17);
    fill(0, 0, 100, 80);
    text('マウスを動かすか ← → キーを押すと始まります', width / 2, 64);
  }
  if (over) {
    fill(232, 45, 10, 78);
    rect(0, 0, width, height);
    fill(0, 0, 100);
    textSize(30);
    text('おしまい', width / 2, height / 2 - 34);
    textSize(18);
    text('SCORE ' + score, width / 2, height / 2 + 6);
    textSize(16);
    fill(0, 0, 100, 80);
    text('クリックかEnterキーでもう一度', width / 2, height / 2 + 44);
  }
}

function mousePressed() {
  if (over) resetGame();
}

function keyPressed() {
  if (over && key === 'Enter') resetGame();
}`;

const MOVE_SKETCH = `// 段階1: ランタンを左右に動かす
let player;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  // 状態: 位置と半径を1つのオブジェクトにまとめる
  player = { x: width / 2, y: height - 60, r: 24 };
}

function draw() {
  background(232, 45, 10);

  // 入力: 矢印キーが押されているあいだ動く
  const speed = 7;
  if (keyIsDown(LEFT_ARROW)) player.x -= speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += speed;
  // マウスが動いたら、その位置へ移す
  if (mouseX !== pmouseX) player.x = mouseX;
  // 画面の外へ出さない
  player.x = constrain(player.x, player.r, width - player.r);

  // 描画
  noStroke();
  fill(40, 60, 100, 12 + sin(frameCount * 0.05) * 5);
  circle(player.x, player.y, player.r * 3.4);
  fill(44, 30, 100);
  circle(player.x, player.y, player.r * 2);
  noFill();
  stroke(30, 55, 62);
  strokeWeight(3);
  circle(player.x, player.y, player.r * 2 - 9);

  noStroke();
  fill(0, 0, 100, 75);
  text('← → キー、またはマウスで動かす   x = ' + round(player.x), 16, 28);
}`;

const DELTA_SKETCH = `let a = 0;
let b = 0;
let slow = false;

function setup() {
  createCanvas(600, 240);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  background(232, 45, 10);

  // 上: 1フレームに3ピクセル進む（速さがフレームの回数で決まる）
  a += 3;
  // 下: 1秒に180ピクセル進む（速さが時間で決まる）
  b += 180 * (deltaTime / 1000);
  if (a > width) a = 0;
  if (b > width) b = 0;

  noStroke();
  fill(0, 0, 100, 80);
  text('いま毎秒' + round(frameRate()) + 'フレーム（クリックで60と20を切り替え）', 16, 28);
  fill(0, 0, 100, 60);
  text('1フレームに3ピクセル', 16, 80);
  text('1秒に180ピクセル（deltaTimeを掛ける）', 16, 160);

  fill(190, 60, 100);
  circle(a, 104, 22);
  fill(46, 60, 100);
  circle(b, 184, 22);
}

function mousePressed() {
  slow = !slow;
  frameRate(slow ? 20 : 60);
}`;

const FALL_SKETCH = `// 段階2: 光を次々に出して落とす
let items = [];
let spawnTimer = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
}

function draw() {
  const dt = min(deltaTime, 50) / 1000;
  background(232, 45, 10);

  // 0.5秒ごとに1つ、配列に足す
  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = 0.5;
    items.push({ x: random(30, width - 30), y: -20, r: 10, vy: random(110, 170) });
  }

  // 全部を少し下へ進める
  for (const it of items) {
    it.y += it.vy * dt;
  }

  // 画面の下へ出たものを配列から外す
  items = items.filter((it) => it.y < height + 30);

  noStroke();
  for (const it of items) {
    fill(46, 70, 100, 14);
    circle(it.x, it.y, it.r * 4.4);
    fill(46, 60, 100, 28);
    circle(it.x, it.y, it.r * 2.8);
    fill(50, 25, 100);
    circle(it.x, it.y, it.r * 1.5);
  }

  fill(0, 0, 100, 75);
  text('配列に入っている数: ' + items.length, 16, 28);
}`;

const HIT_SKETCH = `// 段階3: 光とランタンの当たり判定
let player;
let items = [];
let spawnTimer = 0;
let caught = 0;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  player = { x: width / 2, y: height - 60, r: 24 };
}

function draw() {
  const dt = min(deltaTime, 50) / 1000;
  background(232, 45, 10);

  if (keyIsDown(LEFT_ARROW)) player.x -= 420 * dt;
  if (keyIsDown(RIGHT_ARROW)) player.x += 420 * dt;
  if (mouseX !== pmouseX) player.x = mouseX;
  player.x = constrain(player.x, player.r, width - player.r);

  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = 0.6;
    items.push({ x: random(30, width - 30), y: -20, r: 10, vy: 130, hit: false });
  }

  for (const it of items) {
    it.y += it.vy * dt;
    // 中心同士の距離
    const d = dist(it.x, it.y, player.x, player.y);
    // 距離が半径の合計より小さければ、重なっている
    if (d < it.r + player.r) {
      it.hit = true;
      caught += 1;
    }
    // 近くにある光へ、距離を表す線を引く
    if (d < 150) {
      stroke(0, 0, 100, 35);
      strokeWeight(1);
      line(it.x, it.y, player.x, player.y);
      noStroke();
      fill(0, 0, 100, 70);
      text(round(d), (it.x + player.x) / 2 + 6, (it.y + player.y) / 2);
    }
  }
  items = items.filter((it) => !it.hit && it.y < height + 30);

  noStroke();
  for (const it of items) {
    fill(46, 60, 100, 28);
    circle(it.x, it.y, it.r * 2.8);
    fill(50, 25, 100);
    circle(it.x, it.y, it.r * 2);
  }
  fill(40, 60, 100, 16);
  circle(player.x, player.y, player.r * 3.2);
  fill(44, 30, 100);
  circle(player.x, player.y, player.r * 2);

  fill(0, 0, 100, 75);
  text('受けた数: ' + caught + '   半径の合計 = ' + (10 + player.r), 16, 28);
}`;

const AABB_SKETCH = `let a;
let b;

function setup() {
  createCanvas(600, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(13);
  a = { x: 0, y: 0, w: 96, h: 64 };
  b = { x: 360, y: 120, w: 150, h: 96 };
}

function draw() {
  background(232, 45, 10);

  // マウスが枠の中にあればマウスに、なければ自動で動く
  let cx = 330 + cos(frameCount * 0.013) * 190;
  let cy = 160 + sin(frameCount * 0.021) * 90;
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    cx = mouseX;
    cy = mouseY;
  }
  a.x = cx - a.w / 2;
  a.y = cy - a.h / 2;

  // 4つの条件がすべて成り立つときだけ重なっている
  const c1 = a.x < b.x + b.w;
  const c2 = a.x + a.w > b.x;
  const c3 = a.y < b.y + b.h;
  const c4 = a.y + a.h > b.y;
  const hit = c1 && c2 && c3 && c4;

  strokeWeight(hit ? 4 : 1.5);
  stroke(190, 50, 100);
  fill(190, 60, 100, hit ? 45 : 18);
  rect(b.x, b.y, b.w, b.h);
  stroke(46, 50, 100);
  fill(46, 60, 100, hit ? 45 : 18);
  rect(a.x, a.y, a.w, a.h);

  noStroke();
  fill(0, 0, 100, 85);
  text(hit ? '重なっている' : '離れている', 16, 26);
  fill(0, 0, 100, 65);
  text('aの左 < bの右 : ' + c1, 16, 52);
  text('aの右 > bの左 : ' + c2, 16, 72);
  text('aの上 < bの下 : ' + c3, 16, 92);
  text('aの下 > bの上 : ' + c4, 16, 112);
  fill(0, 0, 100, 85);
  text('a', a.x + 6, a.y + 18);
  text('b', b.x + 6, b.y + 18);
}`;

const SCORE_SKETCH = `// 段階4: スコア、残り、難易度、終了ともう一度
let player;
let items = [];
let score = 0;
let life = 3;
let elapsed = 0;
let spawnTimer = 0;
let over = false;

function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100, 100);
  resetGame();
}

// 状態をすべて最初の値に戻す
function resetGame() {
  player = { x: width / 2, y: height - 46, r: 24 };
  items = [];
  score = 0;
  life = 3;
  elapsed = 0;
  spawnTimer = 0;
  over = false;
}

function draw() {
  const dt = min(deltaTime, 50) / 1000;
  background(232, 45, 10);

  if (!over) {
    // 入力
    if (keyIsDown(LEFT_ARROW)) player.x -= 420 * dt;
    if (keyIsDown(RIGHT_ARROW)) player.x += 420 * dt;
    if (mouseX !== pmouseX) player.x = mouseX;
    player.x = constrain(player.x, player.r, width - player.r);

    // 難易度: 30秒ごとに1上がり、3で止まる
    elapsed += dt;
    const level = min(3, 1 + elapsed / 30);

    // 出す
    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      spawnTimer = 0.7 / level;
      const isRock = random() < 0.3;
      items.push({
        kind: isRock ? 'rock' : 'light',
        x: random(30, width - 30),
        y: -20,
        r: isRock ? 15 : 10,
        vy: random(110, 170) * (0.5 + level * 0.5),
        hit: false,
      });
    }

    // 落とす、当たりを調べる
    for (const it of items) {
      it.y += it.vy * dt;
      if (dist(it.x, it.y, player.x, player.y) < it.r + player.r) {
        it.hit = true;
        if (it.kind === 'light') score += 10;
        else life -= 1;
      }
    }
    items = items.filter((it) => !it.hit && it.y < height + 30);
    if (life <= 0) over = true;
  }

  // 描画
  for (const it of items) {
    if (it.kind === 'light') {
      noStroke();
      fill(46, 60, 100, 28);
      circle(it.x, it.y, it.r * 2.8);
      fill(50, 25, 100);
      circle(it.x, it.y, it.r * 2);
    } else {
      push();
      translate(it.x, it.y);
      rotate(it.y * 0.02);
      fill(228, 25, 38);
      stroke(228, 15, 78);
      strokeWeight(2);
      square(-it.r, -it.r, it.r * 2);
      pop();
    }
  }
  noStroke();
  fill(40, 60, 100, 16);
  circle(player.x, player.y, player.r * 3.2);
  fill(44, 30, 100);
  circle(player.x, player.y, player.r * 2);

  fill(0, 0, 100, 90);
  textAlign(LEFT, TOP);
  textSize(18);
  text('SCORE ' + score, 16, 14);
  textAlign(RIGHT, TOP);
  text('のこり ' + life, width - 16, 14);

  if (over) {
    textAlign(CENTER, CENTER);
    fill(232, 45, 10, 78);
    rect(0, 0, width, height);
    fill(0, 0, 100);
    textSize(30);
    text('おしまい', width / 2, height / 2 - 20);
    textSize(14);
    text('クリックかEnterキーでもう一度', width / 2, height / 2 + 24);
  }
}

function mousePressed() {
  if (over) resetGame();
}

function keyPressed() {
  if (over && key === 'Enter') resetGame();
}`;

export default function GameLoop() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 22</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          ゲームの骨格
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          落ちてくる光をランタンで受け、岩をよける小さなゲーム「ひかりうけ」を1本、段階を追って組み立てます。
          下の枠は完成形です。操作するまでは自動で動いています。枠の中でマウスを動かすか、枠をクリックしてから
          ← → キーを押すと、自分の番が始まります。
        </p>

        <CodePreview
          title="ひかりうけ（このページの完成形）"
          language="js"
          code={HERO_SKETCH}
        />
        <p className="text-sm text-muted-foreground mt-3 mb-10 leading-relaxed">
          丸い光を受けると10点、四角い岩に当たると残りが1つ減り、残りが0になると終わります。
          キーボードで遊ぶときは、先にプレビュー枠を1回クリックしてください。クリックで枠にフォーカスが入り、キーの入力が届くようになります。
        </p>

        <WhyNowBox
          title="なぜここでゲームを作るのか"
          tags={["keyIsDown()", "dist()", "deltaTime", "配列とオブジェクト"]}
        >
          <p>
            ゲームは、これまでのページで扱った変数・配列・マウスとキー・距離の計算を1つのスケッチにまとめる題材です。
            部品は新しくありません。新しいのは、draw()の中を「入力を読む、状態を更新する、当たりを調べる、描く」の順に並べる組み立て方です。
            この順番は、次のページの演出にも、後半のシミュレーションにもそのまま使えます。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ゲームを作る3つの要素
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              どのゲームも、次の3つに分けて考えると書き始められます。完成形のコードにも、この3つがそのままの形で入っています。
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      要素
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      中身
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      「ひかりうけ」では
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      状態
                    </th>
                    <td className="p-3">いまの様子を表す変数</td>
                    <td className="p-3 font-mono">
                      player / items / score / life / over
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      入力
                    </th>
                    <td className="p-3">遊ぶ人の操作を読む</td>
                    <td className="p-3 font-mono">
                      keyIsDown(LEFT_ARROW) / mouseX
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      更新と描画
                    </th>
                    <td className="p-3">
                      状態を少し進め、当たりを調べ、いまの状態を描く
                    </td>
                    <td className="p-3 font-mono">
                      readInput() → updateItems() → drawScene()
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              描画は状態を読むだけにして、状態を書き換える処理は更新の側にまとめます。こうしておくと、あとで絵だけを差し替えても動きは変わりません。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階1: 自分を動かす
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最初に作るのは、左右に動くランタンだけです。位置と半径は
              <code className={code}>player</code>
              という1つのオブジェクトにまとめます。
              <code className={code}>keyIsDown(LEFT_ARROW)</code>
              は、そのキーが押されているあいだずっとtrueを返すので、押しっぱなしでなめらかに動きます。
              マウスは、動いたときだけ（
              <code className={code}>mouseX !== pmouseX</code>
              ）位置を写します。こうすると、マウスを枠の中に置いたままでもキーで動かせます。
            </p>
            <CodePreview
              title="段階1: 矢印キーとマウスで動かす"
              language="js"
              code={MOVE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>const speed = 7</code>
                  の7を2や16にする（キーで動く速さが変わる）
                </li>
                <li>
                  <code className={code}>
                    constrain(player.x, player.r, width - player.r)
                  </code>
                  の行を消す（画面の外へ出ていく）
                </li>
                <li>
                  <code className={code}>player.x = mouseX</code>を
                  <code className={code}>
                    player.x = lerp(player.x, mouseX, 0.1)
                  </code>
                  にする（遅れてついてくる動きになる）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              速さを時間で決める（deltaTime）
            </h2>
            <InfoBox type="warning" title="仕様の60回と、実測の回数">
              <p>
                仕様ではdraw()は1秒に60回を目標に呼ばれますが、実測では端末の性能や描く量によって回数が変わります。
                公式リファレンスも「By default, draw() tries to run 60 times per
                second. The actual rate depends on many
                factors.」と書いています。「1フレームに7ピクセル」と書いたゲームは、回数が半分の端末では半分の速さになり、遊ぶ人によって難しさが変わります。
              </p>
            </InfoBox>
            <p className="text-muted-foreground my-4 leading-relaxed">
              そこで、速さを「1秒に何ピクセル」で決め、前のフレームからの経過時間を掛けます。
              <code className={code}>deltaTime</code>
              は、公式リファレンスで「A Number variable that tracks the number
              of milliseconds it took to draw the last
              frame.」と説明されている変数です。単位はミリ秒なので、1000で割って秒に直します。
              下のスケッチをクリックすると、draw()の回数が毎秒20回に落ちます。上の円は遅くなり、下の円は同じ速さで進み続けます。
            </p>
            <CodePreview
              title="フレームで決める速さ、時間で決める速さ"
              language="js"
              code={DELTA_SKETCH}
            />
            <p className="text-muted-foreground mt-4 leading-relaxed">
              完成形では
              <code className={code}>const dt = min(deltaTime, 50) / 1000</code>
              と書いて、1フレームぶんの時間に上限を付けています。別のタブを見ていて戻ってきた直後は、止まっていた時間がまとめてdeltaTimeに入ることがあり、そのまま掛けると物が一気に飛ぶためです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階2: 落ちてくる物を出す
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              落ちてくる光は数が増えたり減ったりするので、配列
              <code className={code}>items</code>
              に入れます。1つの光は位置・半径・落ちる速さを持つオブジェクトです。毎フレームやることは3つあります。
              タイマーが0になったら1つ足す、全部を少し下へ進める、画面の下へ出たものを外す、です。
              <code className={code}>
                items.filter((it) =&gt; it.y &lt; height + 30)
              </code>
              は、条件に合う要素だけを残した新しい配列を作ります。
            </p>
            <CodePreview
              title="段階2: 配列に足す、進める、外す"
              language="js"
              code={FALL_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>spawnTimer = 0.5</code>
                  の0.5を0.1にする（光が雨のように降る）
                </li>
                <li>
                  <code className={code}>random(110, 170)</code>を
                  <code className={code}>random(40, 400)</code>
                  にする（速さがばらつき、追い越しが起きる）
                </li>
                <li>
                  <code className={code}>items = items.filter(...)</code>
                  の行を消す（左上の数が増え続ける。見えない物が配列に残っている）
                </li>
              </ul>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階3: 当たり判定
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              2つの円が重なっているかどうかは、中心同士の距離と半径の合計を比べれば分かります。距離は
              <code className={code}>dist(x1, y1, x2, y2)</code>
              で求められます。
              <code className={code}>dist(...) &lt; r1 + r2</code>
              なら重なっています。下のスケッチは、近くの光への距離を線と数で表示します。数が半径の合計より小さくなった瞬間に、光が消えて受けた数が増えます。
            </p>
            <CodePreview
              title="段階3: 円同士は、距離 < 半径の合計"
              language="js"
              code={HIT_SKETCH}
            />
            <p className="text-muted-foreground my-4 leading-relaxed">
              四角い物同士は、辺が座標軸に平行な長方形（AABB: axis-aligned
              bounding
              box）として比べます。横方向と縦方向のそれぞれで範囲が重なっていれば当たりで、条件は4つの比較になります。
              下の枠の中でマウスを動かして、4つがすべてtrueになる位置を確かめてください。
            </p>
            <CodePreview
              title="矩形同士は、4つの比較（AABB）"
              language="js"
              code={AABB_SKETCH}
            />
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted text-foreground">
                    <th scope="col" className="text-left p-3 font-semibold">
                      形
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      重なっている条件
                    </th>
                    <th scope="col" className="text-left p-3 font-semibold">
                      向いている物
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      円と円
                    </th>
                    <td className="p-3 font-mono">
                      dist(a.x, a.y, b.x, b.y) &lt; a.r + b.r
                    </td>
                    <td className="p-3">丸い物、回転する物、粒</td>
                  </tr>
                  <tr className="border-t border-border">
                    <th scope="row" className="text-left p-3 font-normal">
                      矩形と矩形
                    </th>
                    <td className="p-3 font-mono">
                      a.x &lt; b.x + b.w &amp;&amp; a.x + a.w &gt; b.x
                      &amp;&amp; a.y &lt; b.y + b.h &amp;&amp; a.y + a.h &gt;
                      b.y
                    </td>
                    <td className="p-3">床、壁、ブロック、ボタン</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <InfoBox type="info" title="見た目と当たりの形は別でよい">
              <p>
                「ひかりうけ」の岩は四角く描いていますが、判定は円で行っています。回転する四角を正確に判定するより計算が短く、角がかすっただけでは当たらないので、遊ぶ人にとっても納得しやすい結果になります。
                <code className={code}>r: isRock ? 15 : 10</code>
                の15を小さくすると、岩の判定だけが甘くなります。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              段階4: スコアと終了
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              最後に、当たった結果を状態に書き込みます。光なら
              <code className={code}>score</code>
              を増やし、岩なら
              <code className={code}>life</code>
              を減らし、0になったら
              <code className={code}>over</code>
              をtrueにします。overのあいだは入力と更新を飛ばして描画だけを続けるので、画面は最後の状態で止まります。
              もう一度遊ぶときは
              <code className={code}>resetGame()</code>
              で状態をすべて最初の値に戻します。戻し忘れた変数があると2回目の挙動が変わるので、最初の値は1か所にまとめます。
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              難易度は経過時間から決めます。
              <code className={code}>level = min(3, 1 + elapsed / 30)</code>
              は30秒ごとに1上がり、3で止まります。この値で、出る間隔を短くし、落ちる速さを上げています。
            </p>
            <CodePreview
              title="段階4: スコア、残り、難易度、もう一度"
              language="js"
              code={SCORE_SKETCH}
            />
            <InfoBox type="info" title="数字を変えてみる">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <code className={code}>random() &lt; 0.3</code>
                  の0.3を0.6にする（岩の割合が増える）
                </li>
                <li>
                  <code className={code}>elapsed / 30</code>
                  の30を5にする（すぐに難しくなる）
                </li>
                <li>
                  <code className={code}>min(3, ...)</code>
                  の3を6にする（上限が上がり、長く遊ぶほど厳しくなる）
                </li>
                <li>
                  <code className={code}>score += 10</code>を
                  <code className={code}>score += round(10 * level)</code>
                  にする（後半ほど点が高くなる。levelを使えるように、宣言をdraw()の外へ出す）
                </li>
              </ul>
            </InfoBox>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              ページ冒頭の完成形は、この段階4に3つを足したものです。背景の星、操作されるまでの自動操縦（
              <code className={code}>demo</code>
              ）、そして入力・更新・描画を関数に分ける整理です。動きの中身は同じです。
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              やってみよう
            </h2>
            <CodingChallenge
              title="光を受けたら数える"
              description="___ を埋めて、光が時間に合わせて落ち、ランタンに重なったら消えて数が増えるようにしてください。枠の中でマウスを動かすとランタンが動きます。"
              preview
              initialCode={`let player;
let items = [];
let timer = 0;
let caught = 0;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  player = { x: 200, y: 250, r: 24 };
}

function draw() {
  // 経過時間を秒に直す
  const dt = ___ / 1000;
  background(232, 45, 10);
  if (mouseX !== pmouseX) player.x = mouseX;

  timer -= dt;
  if (timer <= 0) {
    timer = 0.5;
    items.push({ x: random(20, 380), y: -10, r: 10, hit: false });
  }
  for (const it of items) {
    it.y += 140 * dt;
    // 中心同士の距離を求めて、半径の合計と比べる
    if (___(it.x, it.y, player.x, player.y) < it.r + player.r) {
      it.hit = true;
      caught += 1;
    }
  }
  items = items.filter((it) => !it.hit && it.y < 320);

  noStroke();
  fill(50, 40, 100);
  for (const it of items) circle(it.x, it.y, it.r * 2);
  fill(44, 30, 100);
  circle(player.x, player.y, player.r * 2);
  fill(0, 0, 100, 80);
  text('受けた数: ' + caught, 12, 24);
}`}
              answer={`let player;
let items = [];
let timer = 0;
let caught = 0;

function setup() {
  createCanvas(400, 300);
  colorMode(HSB, 360, 100, 100, 100);
  textSize(14);
  player = { x: 200, y: 250, r: 24 };
}

function draw() {
  // 経過時間を秒に直す
  const dt = deltaTime / 1000;
  background(232, 45, 10);
  if (mouseX !== pmouseX) player.x = mouseX;

  timer -= dt;
  if (timer <= 0) {
    timer = 0.5;
    items.push({ x: random(20, 380), y: -10, r: 10, hit: false });
  }
  for (const it of items) {
    it.y += 140 * dt;
    // 中心同士の距離を求めて、半径の合計と比べる
    if (dist(it.x, it.y, player.x, player.y) < it.r + player.r) {
      it.hit = true;
      caught += 1;
    }
  }
  items = items.filter((it) => !it.hit && it.y < 320);

  noStroke();
  fill(50, 40, 100);
  for (const it of items) circle(it.x, it.y, it.r * 2);
  fill(44, 30, 100);
  circle(player.x, player.y, player.r * 2);
  fill(0, 0, 100, 80);
  text('受けた数: ' + caught, 12, 24);
}`}
              keywords={["deltaTime", "dist"]}
              hints={[
                "前のフレームからの経過時間（ミリ秒）が入っている変数deltaTimeを書きます",
                "2点の間の距離を返す関数distを書きます。引数は2つの中心の座標です",
              ]}
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              作品にする
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              骨格はそのままに、題材と決まりを自分のものに替えます。完成形のコードで変える場所は次のとおりです。
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
              <li>
                題材を替える。drawScene()の中の光・岩・ランタンの描き方だけを書き換える（雨粒と傘、音符と五線、落ち葉とかご）
              </li>
              <li>
                種類を増やす。
                <code className={code}>kind</code>
                に3つ目の値（たとえば残りが1つ戻る物）を足し、当たったときの分岐を1つ足す
              </li>
              <li>
                動きを替える。
                <code className={code}>it.y += it.vy * dt</code>
                の横に
                <code className={code}>it.x += sin(it.y * 0.03) * 60 * dt</code>
                を足すと、揺れながら落ちる
              </li>
              <li>
                向きを替える。上下を入れ替えて、下から昇る泡を上で受けるゲームにする
              </li>
              <li>
                決まりを替える。光を逃したら残りが減る、岩を一定数よけたら点が入る、など
              </li>
            </ul>
            <InfoBox type="success" title="まず1分遊べる形にする">
              <p>
                決まりを足す前に、いまの形で1分続けて遊んでみてください。速すぎる、広すぎる、単調だ、といった感想が、次に変える数字を教えてくれます。
                手ざわりを整える方法は次のページで扱います。
              </p>
            </InfoBox>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              理解度チェック
            </h2>
            <Quiz
              question="半径20の円と半径10の円があります。中心同士の距離がいくつのとき「重なっている」と判定される？"
              options={[
                { label: "距離が30より小さいとき", correct: true },
                { label: "距離が20より小さいとき" },
                { label: "距離が10より小さいとき" },
                { label: "距離がちょうど30のときだけ" },
              ]}
              explanation="円同士は、中心間の距離が半径の合計（20 + 10 = 30）より小さければ重なっています。dist(...) < r1 + r2と書きます。"
            />
            <Quiz
              question="x += 5と書いた動きを、端末の速さに左右されないようにするには？"
              options={[
                { label: "frameRate(60)を呼べば、どの端末でも必ず60回になる" },
                {
                  label:
                    "速さを「1秒に300ピクセル」と決め、x += 300 * (deltaTime / 1000) と書く",
                  correct: true,
                },
                { label: "xをframeCountで割る" },
                { label: "draw()の中でbackground()を呼ばない" },
              ]}
              explanation="frameRate()は目標値で、実際の回数は端末と負荷で変わります。経過時間deltaTime（ミリ秒）を掛けると、回数が変わっても1秒あたりに進む距離が同じになります。"
            />
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              このステップのまとめ
            </h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "ゲームは状態・入力・更新と描画の3つに分けて書く",
                  "draw()の中は、入力を読む、更新する、当たりを調べる、描く、の順に並べる",
                  "数が変わる物は配列に入れ、足す・進める・外すを毎フレーム行う",
                  "円同士はdist() < 半径の合計、矩形同士は4つの比較（AABB）で判定する",
                  "速さは1秒あたりで決めてdeltaTimeを掛けると、端末の速さに左右されない",
                  "最初の値を1つの関数にまとめておくと、もう一度遊ぶ処理が1行で書ける",
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
                  title: "p5.js Reference: deltaTime",
                  url: "https://p5js.org/reference/p5/deltaTime/",
                  description:
                    "前のフレームを描くのにかかった時間（ミリ秒）を持つ変数",
                },
                {
                  title: "p5.js Reference: keyIsDown()",
                  url: "https://p5js.org/reference/p5/keyIsDown/",
                  description:
                    "キーが押されているあいだtrueを返す関数。2.x系での変更点も書かれている",
                },
                {
                  title: "p5.js Reference: dist()",
                  url: "https://p5js.org/reference/p5/dist/",
                  description: "2点の間の距離を求める関数",
                },
                {
                  title: "p5.js Reference: draw()",
                  url: "https://p5js.org/reference/p5/draw/",
                  description:
                    "既定の回数（60回）と実際の回数の違いが書かれている",
                },
                {
                  title: "MDN: 2D collision detection",
                  url: "https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection",
                  description:
                    "矩形同士（AABB）と円同士の当たり判定の考え方と式",
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
