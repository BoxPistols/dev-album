import CodeBlock from '@/components/CodeBlock';
import InfoBox from '@/components/InfoBox';
import WhyNowBox from '@/components/WhyNowBox';
import PageNavigation from '@/components/PageNavigation';
import Quiz from '@/components/Quiz';
import ReferenceLinks from '@/components/ReferenceLinks';
import CodingChallenge from '@/components/CodingChallenge';

export default function PythonPractice() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        {/* STEP バッジ */}
        <div className="mb-4">
          <span className="step-badge">STEP 7</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          Python 実践ユースケース
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          基本文法とライブラリの知識を使って、実務で役立つ Python スクリプトを書いてみましょう。
        </p>

        <WhyNowBox tags={['実践', 'Pandas', 'API', 'テキスト処理', '画像処理']}>
          <p>
            STEP 4-6 で学んだ Python 基本文法・NumPy・Pandas を組み合わせて、
            実際の業務シナリオを再現します。
            ここで紹介する6つのユースケースは、データ分析から Web スクレイピングまで
            Python が得意とする領域をカバーしています。
            それぞれのパターンが ML のどの工程に繋がるかも意識しながら進めましょう。
          </p>
        </WhyNowBox>

        <div className="space-y-12 mt-8">
          {/* ===== Use Case 1: CSV 集計 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Use Case 1: CSV データの集計レポート生成
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              売上データの CSV を読み込んで月別に集計し、レポートとして出力する。
              データ分析の最も基本的なパターンで、Pandas の強みが発揮される場面です。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <h4 className="font-bold text-foreground mb-2">シナリオ</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                EC サイトの売上データ（日付・商品名・金額・個数）が CSV で提供されている。
                月ごとの売上合計と、商品別の売上ランキングを出力したい。
              </p>
            </div>

            <CodeBlock
              code={`import pandas as pd

# CSV の読み込み
df = pd.read_csv("sales.csv", parse_dates=["date"])

# データの確認
print(df.head())
# date        product    amount  quantity
# 2025-01-05  Widget A   1200    3
# 2025-01-12  Widget B   800     1
# ...

# 月別の売上集計
df["month"] = df["date"].dt.to_period("M")
monthly = df.groupby("month")["amount"].sum()
print("=== 月別売上 ===")
print(monthly)

# 商品別の売上ランキング（上位5件）
product_rank = (
    df.groupby("product")["amount"]
    .sum()
    .sort_values(ascending=False)
    .head(5)
)
print("\\n=== 商品別売上 TOP 5 ===")
print(product_rank)

# 結果を CSV に書き出し
monthly.to_csv("monthly_report.csv")
print("\\nレポートを monthly_report.csv に出力しました")`}
              language="python"
              title="売上データの月別集計スクリプト"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              ポイントは <code className="bg-muted px-1 py-0.5 rounded text-xs">groupby()</code> による
              グループ集計です。SQL の <code className="bg-muted px-1 py-0.5 rounded text-xs">GROUP BY</code> と
              同じ考え方で、指定した列でデータをまとめて集約関数（sum, mean, count など）を適用します。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">dt.to_period("M")</code> は
              日付を月単位に変換するアクセサで、時系列集計でよく使います。
            </p>

            <InfoBox type="info" title="parse_dates オプション">
              <p>
                <code className="bg-muted px-1 py-0.5 rounded text-xs">read_csv</code> の
                <code className="bg-muted px-1 py-0.5 rounded text-xs">parse_dates</code> に列名を渡すと、
                文字列を自動的に datetime 型に変換してくれます。
                これにより <code className="bg-muted px-1 py-0.5 rounded text-xs">.dt</code> アクセサが使えるようになり、
                年・月・曜日の抽出が簡単になります。
              </p>
            </InfoBox>
          </section>

          {/* ===== Use Case 2: Web API ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Use Case 2: Web API からデータ取得して分析
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              外部 API からデータを取得して Pandas で分析する。
              JavaScript の <code className="bg-muted px-1 py-0.5 rounded text-xs">fetch</code> に相当するのが
              Python の <code className="bg-muted px-1 py-0.5 rounded text-xs">requests</code> ライブラリです。
              REST API との連携パターンは Web 開発者にとって馴染みのある操作でしょう。
            </p>

            <CodeBlock
              code={`import requests
import pandas as pd

# JSONPlaceholder API からデータを取得
url = "https://jsonplaceholder.typicode.com/posts"
response = requests.get(url)

# ステータスコードの確認（JS の response.ok に相当）
print(f"Status: {response.status_code}")

# JSON → Python の辞書リスト → DataFrame
data = response.json()
df = pd.DataFrame(data)
print(f"取得件数: {len(df)}")
print(df.head())

# ユーザーごとの投稿数を集計
posts_per_user = df.groupby("userId").size()
print("\\n=== ユーザー別投稿数 ===")
print(posts_per_user)

# 本文の文字数を計算して列に追加
df["body_length"] = df["body"].str.len()
print(f"\\n本文の平均文字数: {df['body_length'].mean():.0f}")
print(f"本文の最大文字数: {df['body_length'].max()}")`}
              language="python"
              title="API レスポンスを Pandas で分析"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">response.json()</code> は
              JS の <code className="bg-muted px-1 py-0.5 rounded text-xs">await response.json()</code> と同じく、
              レスポンスボディを辞書（オブジェクト）に変換します。
              Pandas の <code className="bg-muted px-1 py-0.5 rounded text-xs">DataFrame()</code> に
              辞書のリストを渡すと、自動的に列名が認識されてテーブル形式になります。
            </p>

            <div className="overflow-x-auto rounded-xl border border-border mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">JavaScript</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground border-b border-border">Python</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">fetch(url)</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">requests.get(url)</code></td>
                  </tr>
                  <tr className="border-b border-border bg-card">
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">response.ok</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">response.status_code == 200</code></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">await response.json()</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">response.json()</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'headers: { "Content-Type": ... }'}</code></td>
                    <td className="px-4 py-3"><code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'headers={"Content-Type": ...}'}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ===== CodingChallenge 1 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ: CSV データの基本集計
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Use Case 1-2 で学んだ Pandas の集計操作を実践してみましょう。
              穴埋め部分を埋めて、売上データの合計と平均を計算するコードを完成させてください。
            </p>

            <CodingChallenge
              title="CSV データの基本集計"
              description="Pandas を使って売上データの合計と平均を計算するコードを完成させよう。___ の部分を適切なコードで埋めてください。"
              preview={false}
              initialCode={`import pandas as pd

# サンプルデータの作成
data = {
    "product": ["A", "B", "A", "C", "B", "A"],
    "amount": [1200, 800, 1500, 600, 900, 1100],
}
df = pd.DataFrame(data)

# 商品別の売上合計を計算
total = df.___("product")["amount"].___()
print("商品別売上合計:")
print(total)

# 全体の平均売上を計算
avg = df["amount"].___()
print(f"\\n平均売上: {avg:.0f}")`}
              answer={`import pandas as pd

# サンプルデータの作成
data = {
    "product": ["A", "B", "A", "C", "B", "A"],
    "amount": [1200, 800, 1500, 600, 900, 1100],
}
df = pd.DataFrame(data)

# 商品別の売上合計を計算
total = df.groupby("product")["amount"].sum()
print("商品別売上合計:")
print(total)

# 全体の平均売上を計算
avg = df["amount"].mean()
print(f"\\n平均売上: {avg:.0f}")`}
              hints={[
                'グループ化には groupby() メソッドを使います',
                '合計を計算する集約関数は sum() です',
                '平均を計算するメソッドは mean() です',
              ]}
              keywords={['groupby', 'sum', 'mean']}
            />
          </section>

          {/* ===== Use Case 3: テキスト前処理 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Use Case 3: テキストデータの前処理
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              自然言語処理（NLP）や LLM への入力データを準備する際、
              テキストのクリーニングは避けて通れない工程です。
              HTML タグの除去、正規化、ストップワードの除去などを Python の標準ライブラリで行います。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <h4 className="font-bold text-foreground mb-2">シナリオ</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Web から収集したテキストデータを LLM のファインチューニング用に整形したい。
                HTML タグ、余分な空白、記号を除去し、テキストを正規化する。
              </p>
            </div>

            <CodeBlock
              code={`import re
import unicodedata

def clean_text(text: str) -> str:
    # HTML タグを除去
    text = re.sub(r"<[^>]+>", "", text)

    # URL を除去
    text = re.sub(r"https?://\\S+", "", text)

    # Unicode 正規化（全角→半角の統一など）
    text = unicodedata.normalize("NFKC", text)

    # 余分な空白を1つにまとめる
    text = re.sub(r"\\s+", " ", text).strip()

    return text


def remove_stopwords(words: list[str], stopwords: set[str]) -> list[str]:
    return [w for w in words if w not in stopwords]


# 使用例
raw = """
<p>Python は <b>データ分析</b> に最適な言語です。</p>
詳細は　https://example.com/info　を参照。
  余分な   スペースも    あります。
"""

cleaned = clean_text(raw)
print(f"クリーニング後: {cleaned}")
# -> Python は データ分析 に最適な言語です。 詳細は を参照。 余分な スペースも あります。

# 日本語の簡易トークン化（スペース区切り）
tokens = cleaned.split()
print(f"トークン: {tokens}")

# ストップワード除去
stop = {"は", "に", "な", "を", "も"}
filtered = remove_stopwords(tokens, stop)
print(f"フィルタ後: {filtered}")`}
              language="python"
              title="テキストクリーニングの基本パターン"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">re</code> モジュールは Python の正規表現ライブラリで、
              JS の <code className="bg-muted px-1 py-0.5 rounded text-xs">String.replace(/pattern/g, "")</code> に相当します。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">re.sub(pattern, replacement, text)</code> で
              マッチした部分を置換できます。
            </p>

            <InfoBox type="info" title="実務でのトークン化">
              <p>
                上の例ではスペース区切りの簡易トークン化を使っていますが、
                日本語の本格的なトークン化には
                <code className="bg-muted px-1 py-0.5 rounded text-xs">MeCab</code> や
                <code className="bg-muted px-1 py-0.5 rounded text-xs">SudachiPy</code> などの
                形態素解析ライブラリを使います。
                英語であれば <code className="bg-muted px-1 py-0.5 rounded text-xs">nltk</code> や
                <code className="bg-muted px-1 py-0.5 rounded text-xs">spaCy</code> が定番です。
              </p>
            </InfoBox>
          </section>

          {/* ===== Use Case 4: 画像バッチ処理 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Use Case 4: 画像のバッチ処理
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              ML のデータセット準備では、大量の画像を統一サイズにリサイズしたり、
              フォーマットを変換したりする処理が頻出します。
              Pillow（PIL）ライブラリと pathlib を組み合わせてバッチ処理を行います。
            </p>

            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <h4 className="font-bold text-foreground mb-2">シナリオ</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                画像分類モデル用のデータセットを準備したい。
                入力フォルダ内の画像をすべて 224x224 にリサイズし、
                JPEG 形式で出力フォルダに保存する。
              </p>
            </div>

            <CodeBlock
              code={`from pathlib import Path
from PIL import Image

def batch_resize(
    input_dir: str,
    output_dir: str,
    size: tuple[int, int] = (224, 224),
) -> int:
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    # 対象の画像ファイルを収集
    extensions = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
    images = [
        f for f in input_path.iterdir()
        if f.suffix.lower() in extensions
    ]

    processed = 0
    for img_file in images:
        try:
            img = Image.open(img_file)

            # RGBA の場合は RGB に変換（JPEG は透過非対応）
            if img.mode == "RGBA":
                img = img.convert("RGB")

            # リサイズ（アスペクト比を維持せず指定サイズに変換）
            img_resized = img.resize(size, Image.LANCZOS)

            # 出力ファイル名（拡張子を .jpg に統一）
            out_file = output_path / f"{img_file.stem}.jpg"
            img_resized.save(out_file, "JPEG", quality=85)

            processed += 1
        except Exception as e:
            print(f"エラー: {img_file.name} -> {e}")

    return processed


# 実行
count = batch_resize("./raw_images", "./dataset/train", size=(224, 224))
print(f"{count} 件の画像を処理しました")`}
              language="python"
              title="Pillow による画像バッチリサイズ"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">pathlib.Path</code> は
              Python 3 で導入されたファイルパス操作のためのクラスです。
              文字列操作に頼らず、<code className="bg-muted px-1 py-0.5 rounded text-xs">.suffix</code>（拡張子）、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">.stem</code>（ファイル名）、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">.iterdir()</code>（ディレクトリの列挙）
              といったメソッドで直感的にパスを扱えます。
            </p>

            <InfoBox type="warning" title="アスペクト比に注意">
              <p>
                上記のコードはアスペクト比を維持せずリサイズしています。
                画像が歪むのが問題になる場合は、
                <code className="bg-muted px-1 py-0.5 rounded text-xs">ImageOps.fit()</code> で
                中央クロップしてからリサイズする方法や、
                短辺を基準にリサイズしてからパディングを追加する方法があります。
                CNN モデルの入力では正方形が求められることが多いため、
                プロジェクトの要件に合わせて選択してください。
              </p>
            </InfoBox>
          </section>

          {/* ===== Use Case 5: JSON/YAML 操作 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Use Case 5: JSON/YAML 設定ファイルの操作
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Web 開発者には馴染みのある JSON と、インフラ設定で使われる YAML。
              Python では標準ライブラリの <code className="bg-muted px-1 py-0.5 rounded text-xs">json</code> モジュールと
              サードパーティの <code className="bg-muted px-1 py-0.5 rounded text-xs">PyYAML</code> で
              読み書きできます。ML の実験管理でも設定ファイルは頻繁に使われます。
            </p>

            <CodeBlock
              code={`import json
from pathlib import Path

# === JSON の読み書き ===

# JSON ファイルの読み込み
config_path = Path("config.json")
with open(config_path, "r", encoding="utf-8") as f:
    config = json.load(f)

print(f"モデル名: {config['model_name']}")
print(f"学習率: {config['learning_rate']}")

# 設定の更新
config["epochs"] = 50
config["batch_size"] = 64

# JSON ファイルに書き出し（日本語も対応）
with open("config_updated.json", "w", encoding="utf-8") as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print("設定ファイルを更新しました")`}
              language="python"
              title="JSON ファイルの読み書き"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">json.load()</code> でファイルから読み込み、
              <code className="bg-muted px-1 py-0.5 rounded text-xs">json.dump()</code> でファイルに書き出します。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">indent=2</code> を指定すると
              整形された見やすい JSON が出力されます。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">ensure_ascii=False</code> は
              日本語が <code className="bg-muted px-1 py-0.5 rounded text-xs">\u3042</code> のように
              エスケープされるのを防ぎます。
            </p>

            <CodeBlock
              code={`import yaml

# === YAML の読み書き ===

# YAML ファイルの読み込み
with open("experiment.yaml", "r", encoding="utf-8") as f:
    exp_config = yaml.safe_load(f)

# YAML の内容例:
# model:
#   name: "ResNet50"
#   pretrained: true
# training:
#   epochs: 100
#   learning_rate: 0.001
#   optimizer: "Adam"

print(f"モデル: {exp_config['model']['name']}")
print(f"エポック数: {exp_config['training']['epochs']}")

# 設定を変更して書き出し
exp_config["training"]["epochs"] = 200

with open("experiment_v2.yaml", "w", encoding="utf-8") as f:
    yaml.dump(exp_config, f, default_flow_style=False, allow_unicode=True)

# === JSON <-> YAML 変換 ===
def json_to_yaml(json_path: str, yaml_path: str) -> None:
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    with open(yaml_path, "w", encoding="utf-8") as f:
        yaml.dump(data, f, default_flow_style=False, allow_unicode=True)
    print(f"{json_path} -> {yaml_path} に変換しました")`}
              language="python"
              title="YAML の読み書きとフォーマット変換"
              showLineNumbers
            />

            <InfoBox type="success" title="ML 実験管理での活用">
              <p>
                ML プロジェクトでは、ハイパーパラメータ（学習率、バッチサイズ、エポック数など）を
                YAML や JSON の設定ファイルで管理するのが一般的です。
                Hydra や MLflow といった実験管理ツールも YAML ベースの設定を採用しています。
                コードと設定を分離することで、パラメータの変更ごとにコードを書き換える必要がなくなります。
              </p>
            </InfoBox>
          </section>

          {/* ===== Use Case 6: スクレイピング ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Use Case 6: スクレイピングの基礎
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Web ページから情報を抽出するスクレイピングは、
              ML のデータ収集で使われることがあります。
              Python では <code className="bg-muted px-1 py-0.5 rounded text-xs">requests</code> と
              <code className="bg-muted px-1 py-0.5 rounded text-xs">BeautifulSoup</code> の組み合わせが定番です。
            </p>

            <CodeBlock
              code={`import requests
from bs4 import BeautifulSoup

# ページの取得
url = "https://example.com"
response = requests.get(url)
response.encoding = response.apparent_encoding

# HTML の解析
soup = BeautifulSoup(response.text, "html.parser")

# タイトルの取得
title = soup.find("title")
print(f"ページタイトル: {title.text if title else '不明'}")

# すべてのリンクを抽出
links = soup.find_all("a", href=True)
for link in links:
    print(f"  {link.text.strip()} -> {link['href']}")

# 特定のクラスを持つ要素を抽出
# JS の document.querySelectorAll('.article-title') に相当
articles = soup.select(".article-title")
for article in articles:
    print(f"記事: {article.text}")

# テーブルデータの抽出 -> DataFrame
import pandas as pd

tables = pd.read_html(response.text)
if tables:
    print(f"\\nテーブル数: {len(tables)}")
    print(tables[0].head())`}
              language="python"
              title="BeautifulSoup によるスクレイピング"
              showLineNumbers
            />

            <p className="text-muted-foreground mt-4 mb-4 leading-relaxed">
              <code className="bg-muted px-1 py-0.5 rounded text-xs">soup.select()</code> は
              CSS セレクタで要素を検索できるため、フロントエンド開発者には馴染みやすい API です。
              <code className="bg-muted px-1 py-0.5 rounded text-xs">pd.read_html()</code> を使えば、
              HTML 内のテーブルを自動的に DataFrame に変換することもできます。
            </p>

            <InfoBox type="error" title="スクレイピングの注意事項">
              <p>
                スクレイピングを行う際は以下を必ず確認してください。
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>対象サイトの <strong>robots.txt</strong> を確認する</li>
                <li>サイトの <strong>利用規約</strong> でスクレイピングが禁止されていないか確認する</li>
                <li>サーバーに過度な負荷をかけないよう、<strong>リクエスト間隔</strong> を空ける</li>
                <li>個人情報や著作権で保護されたコンテンツの収集には<strong>法的リスク</strong>が伴う</li>
              </ul>
            </InfoBox>
          </section>

          {/* ===== CodingChallenge 2 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              チャレンジ: JSON データの変換
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Use Case 5-6 で学んだ JSON 操作を実践してみましょう。
              JSON 文字列を辞書に変換し、特定のキーを抽出するコードを完成させてください。
            </p>

            <CodingChallenge
              title="JSON データの変換"
              description="JSON 文字列を読み込んで特定のキーを抽出するコードを完成させよう。___ の部分を適切なコードで埋めてください。"
              preview={false}
              initialCode={`import json

# JSON 文字列（API レスポンスを想定）
json_str = '''
{
  "users": [
    {"name": "Alice", "age": 30, "role": "engineer"},
    {"name": "Bob", "age": 25, "role": "designer"},
    {"name": "Carol", "age": 35, "role": "engineer"}
  ]
}
'''

# JSON 文字列を辞書に変換
data = json.___(json_str)

# users リストを取得
users = data["___"]

# engineer のユーザー名だけを抽出（リスト内包表記）
engineers = [u["name"] for u in users if u["___"] == "engineer"]
print(f"エンジニア: {engineers}")`}
              answer={`import json

# JSON 文字列（API レスポンスを想定）
json_str = '''
{
  "users": [
    {"name": "Alice", "age": 30, "role": "engineer"},
    {"name": "Bob", "age": 25, "role": "designer"},
    {"name": "Carol", "age": 35, "role": "engineer"}
  ]
}
'''

# JSON 文字列を辞書に変換
data = json.loads(json_str)

# users リストを取得
users = data["users"]

# engineer のユーザー名だけを抽出（リスト内包表記）
engineers = [u["name"] for u in users if u["role"] == "engineer"]
print(f"エンジニア: {engineers}")`}
              hints={[
                'JSON 文字列を辞書に変換するには json.loads() を使います（load + s = string）',
                'キー名はそのまま辞書のキーとして使えます',
                '条件フィルタにはリスト内包表記の if 句を使います',
              ]}
              keywords={['loads', 'users', 'role']}
            />
          </section>

          {/* ===== 理解度チェック ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">理解度チェック</h2>

            <Quiz
              question="Web API のレスポンス（JSON）を Pandas DataFrame に変換する手順として正しいのは？"
              options={[
                { label: 'pd.read_json(response.text) のみ' },
                { label: 'response.json() で辞書に変換してから pd.DataFrame() に渡す', correct: true },
                { label: 'response.to_dataframe() を呼ぶ' },
                { label: 'json.loads() の結果を直接 print() する' },
              ]}
              explanation="requests の response.json() でまず Python の辞書/リストに変換し、それを pd.DataFrame() に渡すのが標準的な手順です。pd.read_json() でも可能ですが、レスポンスオブジェクトから直接渡せるのは文字列版なので、response.text を使う必要があります。"
            />

            <Quiz
              question="大量のファイルを一括処理するときに便利な Python の標準ライブラリは？"
              options={[
                { label: 'requests' },
                { label: 'numpy' },
                { label: 'pathlib', correct: true },
                { label: 'flask' },
              ]}
              explanation="pathlib は Python 3 で導入されたファイルパス操作の標準ライブラリです。Path.iterdir() でディレクトリ内のファイルを列挙し、.suffix で拡張子を取得、.stem でファイル名を取得するなど、ファイル操作に必要な機能が揃っています。glob パターンも Path.glob() で使えます。"
            />
          </section>

          {/* ===== ユースケース対応表 ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              ユースケースと ML タスクの対応
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              ここまでの6つのユースケースは、それぞれ ML ワークフローの特定の工程に直結しています。
              今の段階では実務スクリプトとして使っている技術が、
              次の STEP 以降で ML の各工程を支える基盤になります。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <h4 className="font-bold text-foreground">データ集計</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pandas groupby / agg</span>
                  <span className="text-primary">&#8594;</span>
                  <span className="font-medium text-foreground">特徴量エンジニアリング</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  集計値（合計・平均・カウント）をモデルの入力特徴量として使う
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <h4 className="font-bold text-foreground">API 連携</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">requests + JSON</span>
                  <span className="text-primary">&#8594;</span>
                  <span className="font-medium text-foreground">モデル API の呼び出し</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  学習済みモデルの推論 API にリクエストを送り、結果を取得する
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <h4 className="font-bold text-foreground">テキスト前処理</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">re + 文字列操作</span>
                  <span className="text-primary">&#8594;</span>
                  <span className="font-medium text-foreground">NLP / LLM 入力整形</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  テキスト分類・感情分析・LLM ファインチューニングのデータ準備
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">4</span>
                  </div>
                  <h4 className="font-bold text-foreground">画像処理</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Pillow + pathlib</span>
                  <span className="text-primary">&#8594;</span>
                  <span className="font-medium text-foreground">CNN のデータセット準備</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  画像分類・物体検出モデルの訓練データを統一サイズで準備する
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">5</span>
                  </div>
                  <h4 className="font-bold text-foreground">設定管理</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">JSON / YAML</span>
                  <span className="text-primary">&#8594;</span>
                  <span className="font-medium text-foreground">実験パラメータ管理</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  学習率・バッチサイズなどのハイパーパラメータを設定ファイルで管理する
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow duration-150">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">6</span>
                  </div>
                  <h4 className="font-bold text-foreground">スクレイピング</h4>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">BeautifulSoup</span>
                  <span className="text-primary">&#8594;</span>
                  <span className="font-medium text-foreground">訓練データの収集</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  公開データがない場合に Web からテキスト・画像を収集してデータセットを構築する
                </p>
              </div>
            </div>
          </section>

          {/* ===== まとめ ===== */}
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-6">このステップのまとめ</h2>
            <div className="rounded-xl border border-border bg-card p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>CSV 集計</strong>: Pandas の groupby + 集約関数でデータの要約を作成できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>API 連携</strong>: requests で外部データを取得し、DataFrame に変換して分析できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>テキスト前処理</strong>: re モジュールと文字列操作でテキストクリーニングを行える</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>画像処理</strong>: Pillow と pathlib で画像のバッチリサイズを実装できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>設定管理</strong>: JSON / YAML の読み書きと相互変換ができる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span><strong>スクレイピング</strong>: BeautifulSoup で HTML を解析し、必要な情報を抽出できる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-0.5">&#10003;</span>
                  <span>各ユースケースが ML ワークフローのどの工程に繋がるかを把握できた</span>
                </li>
              </ul>
            </div>
          </section>

          {/* ===== 公式リファレンス ===== */}
          <section>
            <ReferenceLinks
              links={[
                {
                  title: 'Pandas 公式 - GroupBy',
                  url: 'https://pandas.pydata.org/docs/user_guide/groupby.html',
                  description: 'groupby の詳細な仕様と応用パターン',
                },
                {
                  title: 'Requests 公式ドキュメント',
                  url: 'https://requests.readthedocs.io/en/latest/',
                  description: 'HTTP リクエストの Python ライブラリ',
                },
                {
                  title: 'Python 公式 - re モジュール',
                  url: 'https://docs.python.org/ja/3/library/re.html',
                  description: '正規表現の公式リファレンス（日本語）',
                },
                {
                  title: 'Pillow 公式ドキュメント',
                  url: 'https://pillow.readthedocs.io/en/stable/',
                  description: '画像処理ライブラリの公式ガイド',
                },
                {
                  title: 'Beautiful Soup 公式',
                  url: 'https://www.crummy.com/software/BeautifulSoup/bs4/doc/',
                  description: 'HTML/XML パーサーのドキュメント',
                },
                {
                  title: 'Python 公式 - pathlib',
                  url: 'https://docs.python.org/ja/3/library/pathlib.html',
                  description: 'ファイルパス操作の標準ライブラリ（日本語）',
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
