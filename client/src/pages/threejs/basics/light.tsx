import { useState } from "react";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

export default function LightPage() {
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [directionalIntensity, setDirectionalIntensity] = useState(1);
  const [pointIntensity, setPointIntensity] = useState(1);
  const [pointPosX, setPointPosX] = useState(2);
  const [pointPosY, setPointPosY] = useState(3);

  return (
    <PageLayout>
      <h1 className="mb-6">ライト（光）</h1>

      <WhyNowBox tags={["AmbientLight", "DirectionalLight", "PointLight"]}>
        <p>
          現実世界と同じように、3D シーンにもライト（光源）がなければ
          オブジェクトは見えません。ライトの種類や配置を変えることで、
          シーンの雰囲気を大きく変えることができます。
        </p>
        <p>
          ライティングは 3D グラフィックスをリアルに見せるための重要な要素です。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">3 つの基本ライト</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">
            AmbientLight
          </h3>
          <p className="text-sm text-muted-foreground">
            シーン全体を均一に照らす環境光。影を作らず、
            全方向から同じ強さで照らします。暗くなりすぎないための「ベースライト」です。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">
            DirectionalLight
          </h3>
          <p className="text-sm text-muted-foreground">
            太陽光のような平行光線。特定の方向から一様に照らし、
            影を作ることができます。屋外シーンの主光源として使います。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-primary mb-2">
            PointLight
          </h3>
          <p className="text-sm text-muted-foreground">
            電球のように 1 点から全方向に光を放つ点光源。
            距離によって光が減衰します。室内のランプなどに使います。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">ライトを調整してみよう</h2>

      <p className="text-sm text-muted-foreground mb-4">
        各ライトの強度と位置をスライダーで調整して、
        ライティングがオブジェクトの見え方にどう影響するか確認しましょう。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="環境光の強度"
          value={ambientIntensity}
          min={0}
          max={2}
          step={0.1}
          onChange={setAmbientIntensity}
        />
        <ParameterSlider
          label="平行光の強度"
          value={directionalIntensity}
          min={0}
          max={3}
          step={0.1}
          onChange={setDirectionalIntensity}
        />
        <ParameterSlider
          label="点光源の強度"
          value={pointIntensity}
          min={0}
          max={5}
          step={0.1}
          onChange={setPointIntensity}
        />
        <ParameterSlider
          label="点光源 X 位置"
          value={pointPosX}
          min={-5}
          max={5}
          step={0.1}
          onChange={setPointPosX}
        />
        <ParameterSlider
          label="点光源 Y 位置"
          value={pointPosY}
          min={0}
          max={6}
          step={0.1}
          onChange={setPointPosY}
        />
      </div>

      <CodeWithPreview
        language="javascript"
        title="3 種類のライトを追加"
        caption="スライダーでライトの強度と位置を調整できます"
        cameraPosition={[3, 3, 5]}
        code={`// 環境光 - シーン全体を均一に照らす
const ambientLight = new THREE.AmbientLight(
  0xffffff,  // 色
  ${ambientIntensity.toFixed(1)}         // 強度
);
scene.add(ambientLight);

// 平行光 - 太陽光のような光
const directionalLight = new THREE.DirectionalLight(
  0xffffff,  // 色
  ${directionalIntensity.toFixed(1)}         // 強度
);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 点光源 - 電球のような光
const pointLight = new THREE.PointLight(
  0xFFA500,  // 色（オレンジ）
  ${pointIntensity.toFixed(1)},        // 強度
  100        // 最大距離（0 = 無限）
);
pointLight.position.set(${pointPosX.toFixed(1)}, ${pointPosY.toFixed(1)}, 2);
scene.add(pointLight);`}
      >
        {/* メインの球体 */}
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#4F46E5" roughness={0.4} metalness={0.1} />
        </mesh>

        {/* 床 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        {/* 小さな立方体（参考用） */}
        <mesh position={[2, 0, -1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#7C3AED" roughness={0.6} />
        </mesh>
        <mesh position={[-2, 0.25, 1]}>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshStandardMaterial color="#0EA5E9" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* ライト */}
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={directionalIntensity}
        />
        <pointLight
          position={[pointPosX, pointPosY, 2]}
          intensity={pointIntensity}
          color="#FFA500"
        />

        {/* 点光源の位置を示す小さな球 */}
        <mesh position={[pointPosX, pointPosY, 2]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#FFA500" />
        </mesh>
      </CodeWithPreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">その他のライト</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">SpotLight</h4>
            <p className="text-sm text-muted-foreground">
              スポットライトのように円錐状に光を放つ。
              角度と減衰を設定でき、舞台照明のような表現に使います。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">HemisphereLight</h4>
            <p className="text-sm text-muted-foreground">
              空と地面の色を設定する半球ライト。
              屋外のような自然な環境光を表現できます。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">RectAreaLight</h4>
            <p className="text-sm text-muted-foreground">
              長方形の面から光を放つエリアライト。
              窓からの光やディスプレイの光を再現できます。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">ライトヘルパー</h4>
            <p className="text-sm text-muted-foreground">
              <code>DirectionalLightHelper</code> や <code>PointLightHelper</code>{" "}
              を使うと、ライトの位置や方向を視覚的に確認できます。
            </p>
          </div>
        </div>
      </div>

      <InfoBox type="info" title="影（シャドウ）の基本">
        <p>
          Three.js で影を表示するには、3 つの設定が必要です。
        </p>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>
            レンダラーで影を有効化: <code>renderer.shadowMap.enabled = true</code>
          </li>
          <li>
            ライトで影を有効化: <code>light.castShadow = true</code>
          </li>
          <li>
            オブジェクトで影を設定: <code>mesh.castShadow = true</code> /
            <code>mesh.receiveShadow = true</code>
          </li>
        </ol>
        <p className="mt-2">
          影の計算はGPU負荷が高いため、必要なライトとオブジェクトだけに設定しましょう。
        </p>
      </InfoBox>

      <div className="mt-8">
        <CodingChallenge
          title="ライトを追加してシーンを照らそう"
          description="暗いシーンに AmbientLight と DirectionalLight を追加して、球体を見えるようにしましょう。MeshStandardMaterial はライトがないと真っ黒になります。"
          preview
          initialCode={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 4;

// MeshStandardMaterial の球体（ライトが必要）
const geometry = new THREE.SphereGeometry(1.2, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x4F46E5, roughness: 0.4, metalness: 0.3 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 環境光を追加（空欄を埋めてください）
const ambientLight = new THREE.___(0xffffff, ___);
scene.add(ambientLight);

// 平行光を追加（空欄を埋めてください）
const dirLight = new THREE.___(0xffffff, ___);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

renderer.render(scene, camera);`}
          answer={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 4;

// MeshStandardMaterial の球体（ライトが必要）
const geometry = new THREE.SphereGeometry(1.2, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0x4F46E5, roughness: 0.4, metalness: 0.3 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 環境光を追加
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// 平行光を追加
const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

renderer.render(scene, camera);`}
          hints={[
            '環境光は THREE.AmbientLight(色, 強度) で作成します',
            '平行光は THREE.DirectionalLight(色, 強度) で作成します',
            '環境光の強度は 0.3 程度、平行光は 1.0 程度が自然です',
          ]}
          keywords={['AmbientLight(', 'DirectionalLight(']}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>AmbientLight: 全体を均一に照らすベースライト</li>
            <li>DirectionalLight: 太陽光のような平行光</li>
            <li>PointLight: 電球のような点光源</li>
            <li>ライトの強度と位置でシーンの雰囲気を制御</li>
            <li>MeshStandardMaterial / MeshPhongMaterial はライトが必須</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
