import InfoBox from "@/components/InfoBox";

// Jevセクションが未検証の段階にあることを、全ページの冒頭で同じ文面で示す
export default function JevStatusNotice() {
  return (
    <div className="mb-8">
      <InfoBox type="warning" title="このセクションは検証中です">
        Jevは公開から日が浅く、本セクションはまだ完成した教材ではありません。
        本文の実測値は、2026-09-20にjev-1.13.0を呼んで得たものです。
        モデルの版や公式の仕様が変わると結果も変わるため、記述は今後見直します。
        業務で使うかどうかの判断は、公式ドキュメントと自分のデータで確かめてから行ってください。
      </InfoBox>
    </div>
  );
}
