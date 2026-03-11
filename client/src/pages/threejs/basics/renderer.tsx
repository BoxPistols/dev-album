import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

export default function RendererPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">レンダラーの仕組み</h1>

      <WhyNowBox tags={["WebGLRenderer", "GPU", "Canvas"]}>
        <p>
          シーンとカメラを用意しただけでは、画面には何も表示されません。
          3D の世界を実際にピクセルとして画面に描き出すのが「レンダラー」の役割です。
        </p>
        <p>
          レンダラーは GPU（グラフィックスカード）の力を借りて、
          高速に 3D グラフィックスを描画します。仕組みを理解すると、
          パフォーマンスの最適化にも役立ちます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">WebGLRenderer とは</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        <code>WebGLRenderer</code> は Three.js のメインのレンダラーです。
        ブラウザの WebGL API を使い、GPU で高速に 3D
        グラフィックスを描画します。 HTML の{" "}
        <code>&lt;canvas&gt;</code> 要素に描画結果を出力します。
      </p>

      <h2 className="text-2xl font-bold mb-4">レンダラーの基本設定</h2>

      <CodeBlock
        language="javascript"
        title="WebGLRenderer のセットアップ"
        showLineNumbers
        code={`// レンダラーを作成
const renderer = new THREE.WebGLRenderer({
  antialias: true,  // アンチエイリアス（ギザギザを滑らかに）
});

// 描画サイズを設定（ウィンドウサイズに合わせる）
renderer.setSize(window.innerWidth, window.innerHeight);

// デバイスのピクセル比を設定（Retina ディスプレイ対応）
renderer.setPixelRatio(window.devicePixelRatio);

// canvas 要素を HTML に追加
document.body.appendChild(renderer.domElement);

// 描画を実行
renderer.render(scene, camera);`}
      />

      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">各設定の解説</h2>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              antialias（アンチエイリアス）
            </h3>
            <p className="text-sm text-muted-foreground">
              <code>true</code>{" "}
              にすると、3D オブジェクトの輪郭が滑らかになります。
              <code>false</code>
              の場合、斜めの線がギザギザ（ジャギー）に見えることがあります。
              パフォーマンスに若干影響するため、モバイルでは注意が必要です。
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              setSize（描画サイズ）
            </h3>
            <p className="text-sm text-muted-foreground">
              レンダラーの描画領域のサイズをピクセルで指定します。
              通常はウィンドウサイズや親要素のサイズに合わせます。
              ウィンドウリサイズ時には再度呼び出す必要があります。
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              setPixelRatio（ピクセル比）
            </h3>
            <p className="text-sm text-muted-foreground">
              Retina ディスプレイなど高解像度画面での描画品質を向上させます。
              <code>window.devicePixelRatio</code>{" "}
              を渡すと、デバイスに最適な解像度で描画されます。
              ただし値が高いとGPU負荷が増えるため、<code>Math.min(window.devicePixelRatio, 2)</code>{" "}
              のように上限を設けることもあります。
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-primary mb-2">
              domElement（canvas 要素）
            </h3>
            <p className="text-sm text-muted-foreground">
              <code>renderer.domElement</code> は HTML の{" "}
              <code>&lt;canvas&gt;</code> 要素です。
              <code>appendChild</code> で DOM に追加すると、ブラウザ上に
              3D が表示されます。
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">アンチエイリアスの効果</h2>

      <p className="text-sm text-muted-foreground mb-4">
        下のプレビューは、滑らかな球体を表示しています。
        アンチエイリアスにより、輪郭が滑らかに描画されます。
      </p>

      <ThreePreview caption="アンチエイリアス有効の球体（WebGLRenderer の antialias: true に相当）">
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.2} />
        </mesh>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
      </ThreePreview>

      <div className="mt-8">
        <InfoBox type="info" title="canvas 要素について">
          <p>
            Three.js のレンダラーは HTML の <code>&lt;canvas&gt;</code>{" "}
            要素に描画します。 既存の canvas 要素を渡すこともできます。
          </p>
          <pre className="mt-2 text-xs bg-black/10 dark:bg-white/10 p-2 rounded">
            {`const canvas = document.getElementById('myCanvas');
const renderer = new THREE.WebGLRenderer({ canvas });`}
          </pre>
        </InfoBox>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">ウィンドウリサイズ対応</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          ブラウザのウィンドウサイズが変わったとき、レンダラーとカメラも
          更新する必要があります。
        </p>

        <CodeBlock
          language="javascript"
          title="リサイズ対応コード"
          showLineNumbers
          code={`window.addEventListener('resize', () => {
  // カメラのアスペクト比を更新
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // レンダラーのサイズを更新
  renderer.setSize(window.innerWidth, window.innerHeight);
});`}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="パフォーマンスの注意点">
          <p>
            <code>setPixelRatio</code>{" "}
            の値が大きいと描画ピクセル数が増え、GPU の負荷が高くなります。
            モバイル端末では <code>Math.min(window.devicePixelRatio, 2)</code>{" "}
            で上限を 2 に制限するのが一般的です。
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="レンダラーをセットアップしよう"
          description="WebGLRendererを作成し、アンチエイリアスを有効にして球体を描画してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// レンダラーを作成（アンチエイリアスを有効に）
const renderer = new THREE.WebGLRenderer({ ___: true });

// 描画サイズをウィンドウに合わせる
renderer.___(window.innerWidth, window.innerHeight);

// ピクセル比を設定
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// canvas を DOM に追加
document.body.appendChild(renderer.___);

// 球体を作成
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 3;
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
renderer.render(scene, camera);`}
          keywords={['antialias', 'setSize(', 'domElement']}
          hints={[
            'アンチエイリアスは antialias: true で有効にします',
            'renderer.setSize(width, height) でキャンバスサイズを設定',
            'renderer.domElement が canvas 要素です',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>WebGLRenderer が GPU を使って 3D を描画する</li>
            <li>antialias: true で輪郭を滑らかに</li>
            <li>setSize でサイズ、setPixelRatio で解像度を設定</li>
            <li>domElement（canvas）を DOM に追加して表示</li>
            <li>ウィンドウリサイズ時はカメラとレンダラーを両方更新</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
