import { Link } from "wouter";
import { ArrowRight, Eye, SlidersHorizontal, Share2 } from "lucide-react";
import SketchFrame from "@/features/p5/SketchFrame";
import ReferenceLinks from "@/components/ReferenceLinks";
import { getManualSections, getSectionPages } from "@/lib/navigation";

const HERO_SKETCH = `let points = [];

function setup() {
  createCanvas(720, 380);
  colorMode(HSB, 360, 100, 100, 100);
  background(250, 40, 7);
  for (let i = 0; i < 900; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function draw() {
  // 前のフレームを少しだけ暗くして、線の跡をゆっくり消す
  noStroke();
  fill(250, 40, 7, 3);
  rect(0, 0, width, height);

  strokeWeight(1.2);
  for (const p of points) {
    // その場所のノイズの値を、進む向きとして使う
    const a = noise(p.x * 0.004, p.y * 0.004, frameCount * 0.002) * TWO_PI * 2;
    const nx = p.x + cos(a) * 1.6;
    const ny = p.y + sin(a) * 1.6;
    stroke(280 + sin(a) * 70, 70, 100, 40);
    line(p.x, p.y, nx, ny);
    p.set(nx, ny);
    if (nx < 0 || nx > width || ny < 0 || ny > height || random() < 0.004) {
      p.set(random(width), random(height));
    }
  }
}`;

const TREE_SKETCH = `function setup() {
  createCanvas(360, 240);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(230, 35, 10);
  translate(width / 2, height);
  branch(58, 0);
}

function branch(len, depth) {
  // 枝を1本描いたら、短くした枝を左右に2本、同じ関数で描く
  const sway = sin(frameCount * 0.02 + depth) * 0.06;
  stroke(40 + depth * 28, 50, 95, 90);
  strokeWeight(max(1, 6 - depth));
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 7) {
    push();
    rotate(0.45 + sway);
    branch(len * 0.72, depth + 1);
    pop();
    push();
    rotate(-0.5 + sway);
    branch(len * 0.72, depth + 1);
    pop();
  }
}`;

const WAVE_SKETCH = `function setup() {
  createCanvas(360, 240);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(250, 40, 8);
  for (let y = 20; y < height; y += 20) {
    for (let x = 20; x < width; x += 20) {
      // 中心からの距離をsinに入れると、波紋になる
      const d = dist(x, y, width / 2, height / 2);
      const s = sin(d * 0.06 - frameCount * 0.05);
      fill(300 + s * 50, 65, 100);
      circle(x, y, 4 + (s + 1) * 7);
    }
  }
}`;

const ORBIT_SKETCH = `let particles = [];

function setup() {
  createCanvas(360, 240);
  colorMode(HSB, 360, 100, 100, 100);
  background(240, 40, 7);
  for (let i = 0; i < 120; i++) {
    const a = random(TWO_PI);
    const r = random(30, 110);
    particles.push({
      pos: createVector(width / 2 + cos(a) * r, height / 2 + sin(a) * r),
      vel: createVector(-sin(a), cos(a)).mult(sqrt(225 / r) * random(0.85, 1.1)),
      hue: random(170, 330),
    });
  }
}

function draw() {
  noStroke();
  fill(240, 40, 7, 10);
  rect(0, 0, width, height);
  const center = createVector(width / 2, height / 2);
  for (const p of particles) {
    // 中心へ向かう力を、距離の2乗に反比例する強さで加える
    const force = p5.Vector.sub(center, p.pos);
    const d = constrain(force.mag(), 20, 200);
    force.setMag(225 / (d * d));
    p.vel.add(force);
    p.pos.add(p.vel);
    fill(p.hue, 70, 100, 80);
    circle(p.pos.x, p.pos.y, 2.5);
  }
}`;

const TILE_SKETCH = `function setup() {
  createCanvas(360, 240);
  noLoop();
}

function draw() {
  background(246, 241, 231);
  noFill();
  stroke(58, 46, 110);
  strokeWeight(6);
  const s = 40;
  for (let y = 0; y < height; y += s) {
    for (let x = 0; x < width; x += s) {
      // 2種類の向きのタイルを、乱数で選んで並べる
      push();
      translate(x + s / 2, y + s / 2);
      if (random() < 0.5) rotate(HALF_PI);
      arc(-s / 2, -s / 2, s, s, 0, HALF_PI);
      arc(s / 2, s / 2, s, s, PI, PI + HALF_PI);
      pop();
    }
  }
}

function mousePressed() {
  // クリックで別の並びにする
  redraw();
}`;

const gallery = [
  {
    title: "再帰で育つ木",
    caption: "自分自身を呼ぶ関数が、枝分かれを作る",
    href: "/p5js/systems/fractals",
    code: TREE_SKETCH,
  },
  {
    title: "三角関数の波紋",
    caption: "距離をsinに入れるだけで、波が広がる",
    href: "/p5js/math/trigonometry",
    code: WAVE_SKETCH,
  },
  {
    title: "引力をめぐる粒子",
    caption: "力を足し続けると、軌道が現れる",
    href: "/p5js/math/vectors-forces",
    code: ORBIT_SKETCH,
  },
  {
    title: "タイルの模様（クリックで別案）",
    caption: "2種類のタイルと乱数だけで、毎回違う模様になる",
    href: "/p5js/basics/loops-patterns",
    code: TILE_SKETCH,
  },
];

const steps = [
  {
    icon: <Eye className="w-5 h-5" aria-hidden="true" />,
    title: "見る",
    body: "各ページの冒頭に、そのページで作る作品が動く状態で置いてあります。",
  },
  {
    icon: <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />,
    title: "変える",
    body: "コードはその場で編集できます。数字を1つ変えて、絵がどう変わるかを確かめます。",
  },
  {
    icon: <Share2 className="w-5 h-5" aria-hidden="true" />,
    title: "出す",
    body: "気に入った絵はPNGで保存できます。最後の章で、作品として公開する手順を扱います。",
  },
];

const sectionDescriptions: Record<string, string> = {
  "p5-basics":
    "setup()とdraw()、図形と色、動き、繰り返し、座標変換。絵を描いて動かすための土台を作る。",
  "p5-math":
    "一次関数・二次関数、三角関数、ベクトルと力。数式が形と動きに変わるところを見る。",
  "p5-random":
    "乱数、ノイズ、パーティクルと群れ。偶然を素材にして、毎回違う絵を作る。",
  "p5-media":
    "画像のピクセル、文字、カメラ、音。身のまわりのメディアを絵の入力にする。",
  "p5-systems":
    "フラクタル、L-system、セルオートマトン。単純な規則から複雑な形を育て、作品として仕上げる。",
  "p5-3d": "WEBGLで立体・光・質感を扱い、シェーダーで表面と形を動かす。",
  "p5-game":
    "状態・入力・当たり判定で小さなゲームを1本作り、演出と音で手ざわりを整える。",
  "p5-lab":
    "落下、流体、建物の揺れ、音響解析。研究や設計の現場で使われる計算の原理を再現する。",
  "p5-publish":
    "画像・GIF・印刷用の書き出しと、公開先、ライセンス、説明文の付け方。",
};

const sectionCards = getManualSections("p5js")
  .filter((section) => section.id !== "p5-intro")
  .map((section, index) => {
    const sectionPages = getSectionPages(section.id);
    const first = sectionPages[0];
    const last = sectionPages[sectionPages.length - 1];
    return {
      number: index + 1,
      title: section.title,
      steps:
        first.step === last.step
          ? `STEP ${first.step}`
          : `STEP ${first.step}-${last.step}`,
      description: sectionDescriptions[section.id] ?? "",
      href: first.path,
      topics: sectionPages.map((page) => page.title),
    };
  });

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-20 pb-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary font-medium text-sm">
                コードで描く、動かす、公開する
              </span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
            p5.js / ジェネラティブアート入門
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            p5.jsは、絵を描くためのJavaScriptライブラリです。数行のコードで図形が現れ、数字を変えると絵が変わります。
            このマニュアルでは、はじめての円から、フラクタル、カメラや音を使う作品、3D、ゲーム、物理シミュレーションまでを、
            ページの中で動くスケッチを編集しながら進め、最後に自分の作品を公開します。
          </p>
          <Link
            href="/p5js/basics/first-sketch"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            最初のスケッチを描く
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <SketchFrame
            code={HERO_SKETCH}
            title="ノイズの流れに沿って線が描かれていくスケッチ"
            height={440}
          />
          <p className="text-sm text-muted-foreground mt-3 text-center leading-relaxed">
            上の絵は約30行のスケッチがその場で描いています。同じものは二度と現れません。作り方は
            <Link
              href="/p5js/random/noise"
              className="text-primary underline underline-offset-2 mx-1"
            >
              ノイズ
            </Link>
            のページで扱います。
          </p>
        </div>
      </section>

      {/* 進め方 */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-8">
            進め方
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    {step.icon}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {index + 1}. {step.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted-foreground mt-6 text-center leading-relaxed max-w-2xl mx-auto">
            インストールは要りません。プログラミングの経験は、変数とfor文を見たことがある程度で足ります。
            数学は絵と一緒に導入するので、三角関数を覚えていなくても進められます。
          </p>
        </div>
      </section>

      {/* 作例 */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-3">
            このマニュアルで作るもの
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            どれも数十行のスケッチです。題名から、作り方のページへ移れます。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.map((item) => (
              <figure key={item.title}>
                <SketchFrame code={item.code} title={item.title} height={300} />
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  <Link
                    href={item.href}
                    className="text-primary font-medium underline underline-offset-2"
                  >
                    {item.title}
                  </Link>
                  <span className="block">{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* カリキュラム */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-sans font-bold text-center text-foreground mb-12">
            カリキュラム
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectionCards.map((card) => (
              <Link key={card.href} href={card.href} className="group block">
                <div className="bg-card border border-border rounded-xl p-6 hover:shadow-sm transition-shadow h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-sans font-bold text-sm">
                        {card.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {card.steps}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {card.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {card.topics.join(" / ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 由来 */}
      <section className="py-8 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-card border border-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-bold text-foreground">
            p5.jsとジェネラティブアート
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            p5.jsの公式サイトは、p5.jsを「a friendly tool for learning to code and
            make
            art」と説明しています。元になったProcessingは2001年にCasey
            ReasとBen
            Fryが始めたプロジェクトで、p5.jsはその考え方をブラウザのJavaScriptに持ち込むものとして、2013年にLauren
            Lee McCarthyが作りました。どちらも無料のオープンソースです。
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            ジェネラティブアートは、作者が規則や手順を決め、形の細部をその仕組みに委ねて作る表現です。
            計算機を使った作例は1960年代にさかのぼり、1965年にはGeorg
            NeesとFrieder
            Nakeが計算機で描いた作品を展示しています。乱数やノイズを使って「毎回違う結果になる絵」を作る方法は、このマニュアルの中心になる題材です。
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            このマニュアルのスケッチはp5.jsの2.x系で動かしています。外の記事には1.x系の書き方（preload()など）が多く残っているので、
            書き方が違う箇所は該当するページで先に示します。
          </p>
        </div>
      </section>

      <section className="py-4 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <ReferenceLinks
            title="公式の情報源"
            links={[
              {
                title: "p5.js",
                url: "https://p5js.org/",
                description: "公式サイト。リファレンス・チュートリアル・作例",
              },
              {
                title: "p5.js: About",
                url: "https://p5js.org/about/",
                description: "p5.jsの目的と価値観、関わってきた人たち",
              },
              {
                title: "p5.js Reference",
                url: "https://p5js.org/reference/",
                description: "全関数の仕様と、その場で動く例",
              },
              {
                title: "Processing",
                url: "https://processing.org/",
                description: "p5.jsの元になったプロジェクトの公式サイト",
              },
              {
                title: "The Nature of Code",
                url: "https://natureofcode.com/",
                description:
                  "Daniel Shiffmanによる、自然現象をp5.jsで再現する無料の書籍",
              },
              {
                title: "Generative art（Wikipedia）",
                url: "https://en.wikipedia.org/wiki/Generative_art",
                description: "ジェネラティブアートの定義と、1960年代からの歴史",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
            まずは円を1つ描く
          </h2>
          <p className="text-muted-foreground mb-8">
            setup()とdraw()の2つの関数から始めて、マウスで描ける筆を作ります。
          </p>
          <Link
            href="/p5js/basics/first-sketch"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            はじめてのスケッチへ
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
