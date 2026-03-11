import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

export default function ResponsivePage() {
  return (
    <PageLayout>
      <h1 className="mb-6">レスポンシブ対応</h1>

      <WhyNowBox tags={["resize", "devicePixelRatio", "アスペクト比"]}>
        <p>
          3D シーンは固定サイズで作成すると、ウィンドウのリサイズや
          異なるデバイスで表示が崩れます。レスポンシブ対応を行うことで、
          どんな画面サイズでも正しく表示される 3D コンテンツを作れます。
        </p>
        <p>
          モバイルユーザーが増え続ける現在、レスポンシブ対応は必須の技術です。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">リサイズ対応が必要な理由</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        Three.js のレンダラーはキャンバスの固定サイズで描画します。
        ウィンドウサイズが変わったとき、以下の 3 つを更新しないと
        表示が崩れます。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">1. レンダラーサイズ</h4>
          <p className="text-sm text-muted-foreground">
            キャンバスの幅と高さを新しいウィンドウサイズに合わせる。
            <code>renderer.setSize()</code> で更新します。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">2. カメラのアスペクト比</h4>
          <p className="text-sm text-muted-foreground">
            アスペクト比が変わると画像が歪みます。
            <code>camera.aspect</code> を更新し <code>updateProjectionMatrix()</code> を呼びます。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">3. ピクセル比</h4>
          <p className="text-sm text-muted-foreground">
            高解像度ディスプレイで鮮明に表示するため、
            <code>renderer.setPixelRatio()</code> で
            デバイスのピクセル比を設定します。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">リサイズイベントの実装</h2>

      <CodeBlock
        language="javascript"
        title="ウィンドウリサイズへの対応"
        showLineNumbers
        code={`// レンダラーの初期設定
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// カメラの初期設定
const camera = new THREE.PerspectiveCamera(
  75,                                    // 視野角
  window.innerWidth / window.innerHeight, // アスペクト比
  0.1,                                   // near
  1000                                   // far
);

// リサイズイベントリスナー
window.addEventListener('resize', () => {
  // レンダラーサイズを更新
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ピクセル比を更新（デバイス変更時に対応）
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // カメラのアスペクト比を更新
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});`}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">コンテナ要素に合わせる場合</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          全画面ではなく、特定のコンテナ要素内に 3D シーンを表示する場合は、
          <code>ResizeObserver</code> を使ってコンテナのサイズ変化を監視します。
        </p>

        <CodeBlock
          language="javascript"
          title="コンテナ要素への対応（ResizeObserver）"
          showLineNumbers
          code={`const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
container.appendChild(renderer.domElement);

// 初期サイズ設定
function updateSize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

// ResizeObserver でコンテナの変化を監視
const observer = new ResizeObserver(() => {
  updateSize();
});
observer.observe(container);

// 初回呼び出し
updateSize();`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">レスポンシブなシーンの例</h2>
        <p className="text-sm text-muted-foreground mb-4">
          下のプレビューはブラウザのウィンドウサイズに追従します。
          R3F（React Three Fiber）ではリサイズ処理が自動で行われるため、
          特別な設定は不要です。
        </p>

        <ThreePreview
          caption="R3F では Canvas がリサイズに自動対応します"
          cameraPosition={[3, 3, 5]}
        >
          {/* メインの球体 */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.2} />
          </mesh>

          {/* 小さなオブジェクト */}
          <mesh position={[-2, 0.3, 1]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#7C3AED" roughness={0.5} />
          </mesh>
          <mesh position={[2, 0.35, -1]}>
            <dodecahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="#059669" roughness={0.4} metalness={0.3} />
          </mesh>

          {/* 床 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#374151" roughness={0.9} />
          </mesh>

          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
        </ThreePreview>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">R3F でのレスポンシブ対応</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          React Three Fiber の <code>Canvas</code> コンポーネントは
          親要素のサイズに自動で追従するため、リサイズイベントの
          手動設定は不要です。ただし、<code>dpr</code>（デバイスピクセル比）は
          明示的に制限することを推奨します。
        </p>

        <CodeBlock
          language="tsx"
          title="R3F での Canvas 設定"
          showLineNumbers
          code={`import { Canvas } from '@react-three/fiber';

function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        dpr={[1, 2]}  // ピクセル比を 1〜2 に制限
      >
        <Scene />
      </Canvas>
    </div>
  );
}

// Canvas は親の div に合わせて自動リサイズ
// window.addEventListener('resize', ...) は不要！`}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="devicePixelRatio とモバイル対策">
          <p>
            <code>window.devicePixelRatio</code> はデバイスの物理ピクセルと CSS ピクセルの比率です。
            Retina ディスプレイでは 2 以上、最新スマートフォンでは 3 になることもあります。
          </p>
          <p className="mt-2">
            ピクセル比が高いほど描画ピクセル数が増え、GPU 負荷が上がります。
            <code>Math.min(window.devicePixelRatio, 2)</code> で上限を 2 に制限することで、
            見た目の品質を保ちつつパフォーマンスを確保できます。
          </p>
          <pre className="mt-2 text-xs bg-black/10 dark:bg-white/10 p-2 rounded">
{`// ピクセル比の制限
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// R3F の場合
<Canvas dpr={[1, 2]}> // 最小 1、最大 2 に制限`}
          </pre>
        </InfoBox>
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="モバイルでの注意点">
          <p>
            モバイルデバイスでは以下の点に注意が必要です。
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>画面回転（orientation change）にも対応する</li>
            <li>タッチイベントはマウスイベントと異なる処理が必要な場合がある</li>
            <li>GPU パフォーマンスが PC より低いため、描画品質を調整する</li>
            <li>ソフトキーボードの表示/非表示でビューポートサイズが変わる</li>
          </ul>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="リサイズ対応を実装しよう"
          description="ウィンドウリサイズ時にレンダラーサイズとカメラのアスペクト比を更新するコードを完成させてください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

// リサイズイベントリスナーを追加
window.addEventListener('___', () => {
  // レンダラーサイズを更新
  renderer.___(window.innerWidth, window.innerHeight);

  // カメラのアスペクト比を更新
  camera.___ = window.innerWidth / window.innerHeight;
  camera.___();

  // 再描画
  renderer.render(scene, camera);
});

renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);
});

renderer.render(scene, camera);`}
          keywords={['resize', 'setSize(', 'aspect', 'updateProjectionMatrix(']}
          hints={[
            "イベント名は 'resize' です",
            'camera.aspect でアスペクト比を更新します',
            'camera.updateProjectionMatrix() でカメラの変更を反映します',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>リサイズ時はレンダラーサイズ、カメラアスペクト比、ピクセル比を更新する</li>
            <li>コンテナ要素に合わせる場合は ResizeObserver を使う</li>
            <li>devicePixelRatio は 2 以下に制限してパフォーマンスを確保</li>
            <li>R3F では Canvas が自動でリサイズ対応してくれる</li>
            <li>モバイルでは回転・タッチ・GPU 性能に注意</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
