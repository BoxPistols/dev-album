/**
 * 開発用ポートの決定。vite / playwright / server の 3 か所で同じ判定を使う。
 *
 * vite-seo-plugin.ts が client/src/lib/seo.ts を読むのと同じで、
 * ビルド設定から参照する純関数はここに置く（設定ファイル同士を import し合うと、
 * 一方を読むだけでもう一方のプラグインまで評価されてしまう）。
 */

/** PORT を明示しないときの範囲。well-known と vite(5173) / storybook(6006) を避け、
 *  macOS のエフェメラル範囲(49152-)より下に取る */
const RANDOM_MIN = 30000;
const RANDOM_RANGE = 10000;

/**
 * 環境変数の PORT を検証して返す。未指定なら undefined。
 * 不正な値は黙って通さない。Number("abc") は NaN、Number("99999") は範囲外で、
 * どちらもそのまま listen に渡すと「起動はしたが繋がらない」形の分かりにくい失敗になる。
 */
export function parsePort(value: string | undefined): number | undefined {
  if (value === undefined || value === "") return undefined;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1 || n > 65535) {
    throw new Error(
      `PORT には 1〜65535 の整数を指定してください（受け取った値: ${value}）`,
    );
  }
  return n;
}

/** PORT があればその値、無ければ乱数。3000 は他プロジェクトと衝突しやすいので既定にしない */
export function resolveDevPort(value: string | undefined): number {
  return parsePort(value) ?? RANDOM_MIN + Math.floor(Math.random() * RANDOM_RANGE);
}
