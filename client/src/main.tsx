import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { runStorageMigration } from "./lib/storage-migration";

// URL 変更に学習記録（完了・ブックマーク・メモ）を追随させる。描画前に 1 回だけ
runStorageMigration();

createRoot(document.getElementById("root")!).render(<App />);
