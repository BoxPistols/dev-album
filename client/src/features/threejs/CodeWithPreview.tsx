import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import { ReactNode } from "react";

interface CodeWithPreviewProps {
  code: string;
  language?: string;
  title?: string;
  previewHeight?: string;
  children: ReactNode;
  caption?: string;
  cameraPosition?: [number, number, number];
}

export default function CodeWithPreview({
  code,
  language = "javascript",
  title,
  previewHeight = "400px",
  children,
  caption,
  cameraPosition,
}: CodeWithPreviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <CodeBlock code={code} language={language} title={title} showLineNumbers />
      <ThreePreview
        height={previewHeight}
        caption={caption}
        cameraPosition={cameraPosition}
      >
        {children}
      </ThreePreview>
    </div>
  );
}
