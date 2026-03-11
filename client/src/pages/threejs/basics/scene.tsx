import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

export default function ScenePage() {
  return (
    <PageLayout>
      <h1 className="mb-6">シーンを作ろう</h1>

      <WhyNowBox tags={["Three.js", "WebGL", "3Dグラフィックス"]}>
        <p>
          Three.js は、ブラウザ上で 3D グラフィックスを表示するための JavaScript
          ライブラリです。ゲーム、データの可視化、建築ビジュアライゼーション、
          インタラクティブアートなど、幅広い分野で使われています。
        </p>
        <p>
          まずは 3D の世界を構成する最も基本的な要素「シーン」を理解しましょう。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">Three.js の 3 つの要素</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        Three.js で 3D を表示するには、必ず <strong>3 つの要素</strong> が必要です。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Scene</h3>
          <p className="text-sm text-muted-foreground">
            3D オブジェクトを配置する「舞台」。すべてのオブジェクトはシーンに追加します。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Camera</h3>
          <p className="text-sm text-muted-foreground">
            シーンをどの視点から見るかを決める「カメラ」。人間の目の役割です。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Renderer</h3>
          <p className="text-sm text-muted-foreground">
            シーンとカメラの情報から、実際に画面に描画する「レンダラー」。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">最初のシーンを作る</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        以下のコードは、Three.js で最もシンプルなシーンを作るコードです。
        緑色の立方体を表示しています。
      </p>

      <CodeBlock
        language="javascript"
        title="最初の Three.js シーン"
        showLineNumbers
        code={`// 1. シーンを作成
const scene = new THREE.Scene();

// 2. カメラを作成（視野角75度、アスペクト比、描画範囲0.1〜1000）
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// 3. レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 立方体を作成してシーンに追加
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. カメラ位置を調整
camera.position.z = 3;

// 6. レンダリング
renderer.render(scene, camera);`}
      />

      <div className="mt-6 mb-8">
        <h3 className="text-xl font-bold mb-3">プレビュー</h3>
        <p className="text-sm text-muted-foreground mb-4">
          上のコードを実行した結果です。ドラッグで回転、スクロールでズームできます。
        </p>
        <ThreePreview caption="MeshBasicMaterial を使った立方体（ライティング不要）">
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#4F46E5" />
          </mesh>
        </ThreePreview>
      </div>

      <InfoBox type="info" title="Scene は「コンテナ」">
        <p>
          <code>Scene</code> はオブジェクトの入れ物です。3D
          オブジェクト、ライト、カメラなど、表示したいものはすべて{" "}
          <code>scene.add()</code> でシーンに追加します。
        </p>
      </InfoBox>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">コードの流れ</h2>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              1
            </span>
            <div>
              <strong className="text-foreground">Scene を作成</strong> -
              すべてのオブジェクトを入れる箱を用意
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              2
            </span>
            <div>
              <strong className="text-foreground">Camera を作成</strong> -
              どの位置・角度から見るかを決定
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              3
            </span>
            <div>
              <strong className="text-foreground">Renderer を作成</strong> -
              実際に HTML の canvas 要素に描画する機能を準備
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              4
            </span>
            <div>
              <strong className="text-foreground">オブジェクトを追加</strong> -
              ジオメトリ（形）+ マテリアル（質感）= メッシュ（3Dオブジェクト）
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              5
            </span>
            <div>
              <strong className="text-foreground">レンダリング実行</strong> -
              <code>renderer.render(scene, camera)</code> で画面に描画
            </div>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="基本のシーンを書いてみよう"
          description="Scene、Camera、Renderer を作成し、立方体を表示するコードの空欄を埋めてください。"
          preview
          initialCode={`// 1. シーンを作成
const scene = new THREE.___();

// 2. カメラを作成
const camera = new THREE.___(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// 3. レンダラーを作成
const renderer = new THREE.___();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 立方体を作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.___(cube);

// 5. カメラ位置
camera.position.z = 3;

// 6. レンダリング
renderer.___(scene, camera);`}
          answer={`// 1. シーンを作成
const scene = new THREE.Scene();

// 2. カメラを作成
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// 3. レンダラーを作成
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 立方体を作成
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 5. カメラ位置
camera.position.z = 3;

// 6. レンダリング
renderer.render(scene, camera);`}
          hints={[
            'シーンは THREE.Scene() で作成します',
            'カメラは THREE.PerspectiveCamera() です',
            'レンダラーは THREE.WebGLRenderer() を使います',
            'オブジェクトの追加は scene.add()、描画は renderer.render() です',
          ]}
          keywords={['Scene()', 'PerspectiveCamera(', 'WebGLRenderer()', 'scene.add(', 'renderer.render(']}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>Three.js の 3 要素: Scene、Camera、Renderer</li>
            <li>3D オブジェクト = Geometry（形）+ Material（質感）= Mesh</li>
            <li>すべてのオブジェクトは <code>scene.add()</code> でシーンに追加</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
