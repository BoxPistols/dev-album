import { ShieldCheck, ExternalLink } from "lucide-react";

interface VerifiedBoxProps {
  // 実機検証した日付（YYYY-MM-DD）
  verifiedAt: string;
  // 検証時の cmux バージョン（例: "0.63.x"）
  cmuxVersion: string;
  // 検証環境（例: "macOS 15.4 (Apple Silicon)"）
  platform: string;
  // 公式ドキュメントへのリンク（任意）
  officialDocs?: string;
  // 公式ドキュメントのラベル（任意、デフォルト: "公式ドキュメント"）
  officialDocsLabel?: string;
}

export default function VerifiedBox({
  verifiedAt,
  cmuxVersion,
  platform,
  officialDocs,
  officialDocsLabel = "公式ドキュメント",
}: VerifiedBoxProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 mb-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <ShieldCheck size={16} className="text-primary" />
          実機検証済み
        </div>
        <div className="text-muted-foreground">
          <span className="text-foreground">{cmuxVersion}</span>
          <span className="mx-2 text-border">/</span>
          <span>{platform}</span>
          <span className="mx-2 text-border">/</span>
          <span>検証日 {verifiedAt}</span>
        </div>
        {officialDocs && (
          <a
            href={officialDocs}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary underline underline-offset-2 ml-auto"
          >
            {officialDocsLabel}
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
