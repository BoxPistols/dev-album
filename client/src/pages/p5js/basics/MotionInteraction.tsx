import PageNavigation from "@/components/PageNavigation";

export default function MotionInteraction() {
  return (
    <div className="min-h-screen bg-background page-enter">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-4">
          <span className="step-badge">STEP 4</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
          動きとインタラクション
        </h1>
        <PageNavigation />
      </div>
    </div>
  );
}
