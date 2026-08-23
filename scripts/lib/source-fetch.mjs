// 出典 URL を取得して逐語照合するための共有部品。
//
// verify-sources.mjs（出典レジストリの照合）と verify-verdicts.mjs（監査 JSON の照合）が
// 同じ normalize を使う。ここを 2 箇所に写すと、片方だけ緩めたときに気づけない。

import { execFileSync } from "node:child_process";

const TIMEOUT_MS = 20000;

/**
 * PDF を平文化する。poppler の pdftotext が要る。
 *
 * 入っていない環境では null を返す。「取れなかったもの」を黙って
 * 「一致しなかったもの」に混ぜると、引用の正確さの問題と道具の不在が区別できなくなる。
 */
export function pdfToText(buffer) {
  try {
    return execFileSync("pdftotext", ["-layout", "-", "-"], {
      input: buffer,
      maxBuffer: 64 * 1024 * 1024,
      encoding: "utf8",
    });
  } catch {
    return null;
  }
}

export function isPdf(contentType, body) {
  return contentType.includes("pdf") || body.startsWith("%PDF-");
}

/** HTML/Markdown をざっくり平文化する。引用の照合は正規化した空白の上で行う */
export function toPlainText(body, contentType) {
  let text = body;
  if (contentType.includes("html")) {
    text = text
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ");
  }
  return decodeEntities(text);
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&rsquo;|&#8217;/g, "’");
}

/**
 * 引用照合用の正規化。
 *
 * 吸収してよいのは「同じ文が Markdown 原文と描画後 HTML で見た目だけ変わる」差分に限る。
 * インラインコードのバッククォート、Markdown リンク記法、強調・見出し・箇条書きの記号、
 * バックスラッシュエスケープ、`<code>` の境界が句読点の前に差し込む空白、
 * そして引用符・ダッシュの字体。
 *
 * 記号だけを落とし、語そのものは変えない。語を落とす正規化を足すと
 * 「言い換えた引用」まで通るようになり、捏造を検出するというこの仕組みの目的が失われる。
 * 拡張したら verify-verdicts の fixture（捏造・言い換え・数値改変）で赤を確認すること。
 */
export function normalize(s) {
  return (
    s
      // [text](url) → text
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      // コードブロックの囲み行。言語ラベル（```js）は描画後に出てこない。
      // バッククォートを消す前に、行ごと落とす
      .replace(/^[ \t]*(?:```+|~~~+)[a-zA-Z0-9_+#-]*[ \t]*$/gm, "")
      // インラインコードのバッククォート
      .replace(/`/g, "")
      // Markdown のバックスラッシュエスケープ（\$9.99 は描画後 $9.99）。
      // 対象は CommonMark と同じく ASCII 記号のみ。語には触らない
      .replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, "$1")
      // 強調（**bold** / __bold__ は描画後に記号が消える）
      .replace(/\*\*|__/g, "")
      // 見出し・箇条書き・引用ブロックの行頭記号
      .replace(/^[ \t]*#{1,6}[ \t]+/gm, "")
      .replace(/^[ \t]*[*+-][ \t]+/gm, "")
      .replace(/^[ \t]*>[ \t]?/gm, "")
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/\s+/g, " ")
      // <code> の境界由来の、句読点の直前・括弧の内側の空白
      .replace(/\s+([,.;:!?])/g, "$1")
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")")
      .trim()
  );
}

/**
 * 引用を中略で割る。断片が全て原文に在れば一致とみなす。
 *
 * 認めるのは中略を示す記号だけ（`[…]` `[...]`、および前後を空白で挟んだ `…` `...`）。
 * 語を落とす分割ではないので、言い換えを通す穴にはならない。
 */
export function quoteFragments(quote) {
  return quote
    .split(/\[…\]|\[\.\.\.\]|\s(?:…|\.\.\.)\s/)
    .map(normalize)
    .filter((p) => p.length > 0);
}

// 既定はブラウザを名乗る。CDN 前段で素の HTTP クライアントを弾く出典があるため。
const UA_BROWSER =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36 dev-album-source-verifier";

// 逆に、ブラウザを騙る UA を弾く出典もある（w3.org は上記に 403、こちらには 200）。
// 403 のときだけこちらで取り直す。
const UA_PLAIN = "dev-album-source-verifier";

// 同じホストへ続けて当たると弾かれる。呼び出し側の一律 250ms では、
// web.archive.org のように 1 回の実行で何十件も引くホストの間隔が足りず、
// 503 が返って「取得できない」に落ちる（実測: 703 URL の実行で Wayback 3 件 / Cursor 2 件）。
// ホストごとに最後の要求時刻を覚えて、足りない分だけ待つ。
const HOST_INTERVAL_MS = 1200;
const lastRequestAt = new Map();

async function waitForHostSlot(url) {
  let host;
  try {
    host = new URL(url).host;
  } catch {
    return;
  }
  const last = lastRequestAt.get(host);
  const now = Date.now();
  if (last !== undefined) {
    const wait = HOST_INTERVAL_MS - (now - last);
    if (wait > 0) await sleep(wait);
  }
  lastRequestAt.set(host, Date.now());
}

async function get(url, ua = UA_BROWSER) {
  await waitForHostSlot(url);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      // 言語を指定しないと出典側が地域や既定で別言語版を返すことがある
      // （web.dev が ?hl=pl へ飛ばした実例あり）。照合を再現可能にするため英語に固定する
      headers: { "user-agent": ua, "accept-language": "en" },
    });
    const contentType = res.headers.get("content-type") ?? "";
    // PDF を pdftotext へ渡すため生バイトも残す
    const bytes = Buffer.from(await res.arrayBuffer());
    return {
      status: res.status,
      finalUrl: res.url,
      contentType,
      body: bytes.toString("utf8"),
      bytes,
    };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * GitHub の blob ページは描画後の HTML で、本文は JS に埋め込まれた JSON に入る。
 * 平文化しても原文が出てこないので、ファイルそのものを配信する raw へ寄せる。
 */
function toRawGithub(url) {
  const m = url.match(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+?)(?:[?#].*)?$/,
  );
  return m
    ? `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}/${m[4]}`
    : null;
}

/**
 * 可能なら Markdown 版を取りに行く。
 *
 * 描画後の HTML では表の `|` 区切りやコードブロックの体裁が失われ、
 * 原文に実在する引用でも文字列一致しない。Markdown 原文なら逐語のまま照合できる。
 * 多くのドキュメントサイト（code.claude.com 等）が `<path>.md` を配信している。
 */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchText(url) {
  // クライアント描画の出典（許可リスト）だけ実ブラウザで描画して取る。
  // ここに載らない URL はブラウザに一切触れないので、通常実行の速さは変わらない。
  if (needsBrowser(url)) {
    const rendered = await fetchViaBrowser(url);
    if (rendered) return rendered;
    // chromium を開けなかった。素の fetch へ落とすが、「本文が取れないホストを
    // 取れない道具で引いた」ことを呼び出し側へ伝える（不一致に混ぜない）
    const res = await fetchOnce(url);
    return { ...res, browserUnavailable: browserUnavailableReason() ?? "unknown" };
  }

  // 429 と 503 は連続アクセスで起こる。待ってやり直す（生きている出典を落とさない）。
  // web.archive.org は絞り込むとき 429 ではなく 503 を返すので、両方を対象にする。
  // 単発で叩けば 200 が返るのに一括実行だけ落ちる、という差はここで吸収する。
  const RETRY_STATUSES = new Set([429, 503]);
  let wait = 4000;
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetchOnce(url);
    if (!RETRY_STATUSES.has(res.status)) return res;
    await sleep(wait);
    wait *= 2;
  }
  return fetchOnce(url);
}

async function fetchOnce(url) {
  const raw = toRawGithub(url);
  if (raw) {
    try {
      const r = await get(raw);
      if (r.status === 200) return { ...r, usedRaw: true };
    } catch {
      // raw が引けないときは描画後のページへ落とす
    }
  }

  if (!/\.(md|txt|json)$/.test(url) && !url.includes("?")) {
    const mdUrl = url.replace(/\/$/, "") + ".md";
    try {
      const md = await get(mdUrl);
      if (md.status === 200 && /markdown|plain/.test(md.contentType)) {
        return { ...md, usedMarkdown: true };
      }
    } catch {
      // Markdown 版が無いのは普通のこと。HTML へ落とす
    }
  }

  let res = await get(url);
  // ブラウザを騙る UA を弾く出典があるので、403 のときだけ素直な UA で取り直す
  if (res.status === 403) {
    try {
      const plain = await get(url, UA_PLAIN);
      if (plain.status === 200) return { ...plain, usedPlainUa: true };
    } catch {
      // 取り直しても駄目なら元の 403 を返す
    }
  }

  // meta refresh は HTTP のリダイレクトではないので fetch は追わない。
  // nuxt.com のように版付きパスへ飛ばす出典があり、追わないと本文が数十字で終わる
  const refreshed = await followMetaRefresh(res);
  if (refreshed) return refreshed;

  return res;
}

async function followMetaRefresh(res) {
  if (res.status !== 200 || !res.contentType.includes("html")) return null;
  if (res.body.length > 4000) return null;
  const m = res.body.match(
    /<meta[^>]+http-equiv=["']?refresh["']?[^>]*content=["'][^"']*url=([^"'\s]+)/i,
  );
  if (!m) return null;
  try {
    const next = new URL(m[1], res.finalUrl).toString();
    const r = await get(next);
    if (r.status === 200) return { ...r, followedMetaRefresh: next };
  } catch {
    // 追えなければ元の応答を使う
  }
  return null;
}


// ────────────────────────────────────────────────────────────────────────────
// クライアント描画の出典を実ブラウザで取る経路
//
// なぜホストの許可リストにしたか（判定ごとの `fetchWith: "browser"` にしなかった理由）:
//
//   1. 「本文が JS でしか出てこない」は主張ではなくホストの性質なので、
//      同じホストの URL を足すたびに書き手が思い出す必要のない場所に置く。
//   2. 判定 JSON にも sources.ts にも新しい欄を増やさずに済む。
//      両方に同じ欄を足すと、片方だけ書き忘れたときに黙って素の fetch に落ちる。
//   3. 既定で有効にできる。許可リストに載っていない URL はブラウザに触れないので、
//      700 URL の通常実行は今までどおり素の fetch のままで、起動コストが増えない。
//
// ブラウザは「許可リストの URL が実際に出てきたとき」に 1 度だけ起動して使い回す。
// chromium が入っていない環境では起動に失敗するが、そこで落とさず null を返し、
// 呼び出し側が「未照合」として数える（道具の不在を引用の誤りに混ぜない）。
// ────────────────────────────────────────────────────────────────────────────

const BROWSER_TIMEOUT_MS = 45000;

/** 本文が HTTP 応答に入らない（クライアント描画の）出典のホスト */
export const BROWSER_RENDERED_HOSTS = new Set([
  "m3.material.io",
  "m2.material.io",
  "material.io",
  "developer.apple.com",
  "design.google",
]);

export function needsBrowser(url) {
  try {
    return BROWSER_RENDERED_HOSTS.has(new URL(url).host);
  } catch {
    return false;
  }
}

let browserPromise = null;
/** chromium を開けなかった理由。開けなかったことを「一致しない」に化けさせない */
let browserError = null;

async function getBrowser() {
  if (browserError) return null;
  if (!browserPromise) {
    browserPromise = (async () => {
      const { chromium } = await import("@playwright/test");
      return chromium.launch();
    })().catch((err) => {
      browserError = err;
      return null;
    });
  }
  return browserPromise;
}

/** 使い回していた chromium を閉じる。スクリプトの最後で呼ぶ */
export async function closeBrowser() {
  if (!browserPromise) return;
  const browser = await browserPromise.catch(() => null);
  browserPromise = null;
  if (browser) await browser.close().catch(() => {});
}

export function browserUnavailableReason() {
  return browserError ? browserError.message : null;
}

/**
 * 実ブラウザで開いて `document.body.innerText` を返す。
 *
 * innerText はタグを取り除いた「画面に出ている文字」なので、そのまま照合に使える
 * （toPlainText の HTML 剥がしを通す必要がない）。取得できなければ null。
 */
export async function fetchViaBrowser(url) {
  const browser = await getBrowser();
  if (!browser) return null;

  const context = await browser.newContext({
    userAgent: UA_BROWSER,
    locale: "en-US",
    // 素の fetch 側と同じく英語に固定する。地域で別言語版を返す出典があるため
    extraHTTPHeaders: { "accept-language": "en" },
  });
  const page = await context.newPage();
  try {
    const res = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: BROWSER_TIMEOUT_MS,
    });
    // networkidle は常時通信するページで待ち切れないことがある。
    // 待てなければ待てないまま進む（本文が出ていれば照合はできる）
    await page
      .waitForLoadState("networkidle", { timeout: 15000 })
      .catch(() => {});
    const text = await page.evaluate(() => document.body.innerText);
    return {
      status: res?.status() ?? 0,
      finalUrl: page.url(),
      // HTML 剥がしを二重に掛けないため、平文として返す
      contentType: "text/plain; charset=utf-8",
      body: text,
      bytes: Buffer.from(text, "utf8"),
      usedBrowser: true,
    };
  } finally {
    await context.close().catch(() => {});
  }
}
