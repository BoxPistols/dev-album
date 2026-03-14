import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// Float + MeshWobbleMaterial のデモ
function WobblyTorus({
  wobbleFactor,
  wobbleSpeed,
}: {
  wobbleFactor: number;
  wobbleSpeed: number;
}) {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh>
        <torusGeometry args={[1, 0.4, 32, 64]} />
        <MeshWobbleMaterial
          color="#8B5CF6"
          factor={wobbleFactor}
          speed={wobbleSpeed}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// 周囲の小さなオブジェクト
function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const positions: [number, number, number][] = [
    [2.5, 0.5, 0],
    [-2.5, -0.3, 0.5],
    [0, 1.5, -2],
    [1.5, -1, 1.5],
    [-1.5, 0.8, -1.5],
  ];

  const colors = ["#EC4899", "#06B6D4", "#F59E0B", "#10B981", "#F43F5E"];

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <Float key={i} speed={1.5 + i * 0.3} floatIntensity={0.8}>
          <mesh position={pos}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={0.3}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function R3FDreiPage() {
  const [wobbleFactor, setWobbleFactor] = useState(2);
  const [wobbleSpeed, setWobbleSpeed] = useState(2);

  return (
    <PageLayout>
      <h1 className="mb-6">drei ヘルパー活用</h1>

      <WhyNowBox tags={["drei", "OrbitControls", "Float", "MeshWobbleMaterial"]}>
        <p>
          <code>@react-three/drei</code> は、R3F（React Three Fiber）と一緒に使う
          便利なヘルパーコンポーネント集です。カメラ操作、テキスト表示、
          アニメーション、マテリアルなど、よく使う機能がすぐに使えるように
          パッケージ化されています。
        </p>
        <p>
          drei を使うことで、複雑な実装を数行のコードに置き換えることができます。
          「車輪の再発明」をせずに、クリエイティブな部分に集中しましょう。
        </p>
      </WhyNowBox>

      {/* OrbitControls */}
      <h2 className="text-2xl font-bold mb-4">1. OrbitControls</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        マウスドラッグでカメラを回転・ズームできるコントロール。
        このマニュアル全体のプレビューで既に使用しています。
        drei では 1 行で追加できます。
      </p>

      <CodeBlock
        language="tsx"
        title="OrbitControls の使い方"
        code={`import { OrbitControls } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      {/* これだけでマウス操作が有効に */}
      <OrbitControls enableDamping />
    </Canvas>
  );
}`}
      />

      {/* Environment */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">2. Environment</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          <code>Environment</code> は環境マップ（HDR 背景）を簡単に追加するコンポーネントです。
          プリセットを指定するだけで、リアルな環境光とリフレクションが得られます。
        </p>

        <CodeBlock
          language="tsx"
          title="Environment プリセットでリアルなライティング"
          code={`import { Environment } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        {/* 環境マップが反射するメタリックなマテリアル */}
        <meshStandardMaterial
          color="#C0C0C0"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* プリセット: sunset, dawn, night, warehouse, city など */}
      <Environment preset="sunset" />
    </Canvas>
  );
}`}
        />
      </div>

      {/* Text */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">3. Text</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          3D シーン内にテキストを表示するコンポーネントです。
          SDF（Signed Distance Field）ベースのレンダリングにより、
          どのズームレベルでも鮮明に表示されます。
        </p>

        <CodeBlock
          language="tsx"
          title="3D シーン内のテキスト表示"
          code={`import { Text } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <Text
        position={[0, 0, 0]}
        fontSize={1}
        color="#6366F1"
        anchorX="center"
        anchorY="middle"
        font="/fonts/NotoSansJP-Bold.woff"  // 日本語フォント
      >
        Hello 3D!
      </Text>
    </Canvas>
  );
}`}
        />
      </div>

      {/* Float */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">4. Float</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          子要素をふわふわと浮遊させるアニメーションラッパーです。
          <code>speed</code>（速度）、<code>floatIntensity</code>（浮遊の振幅）、
          <code>rotationIntensity</code>（回転の強さ）で動きをカスタマイズできます。
        </p>

        <CodeBlock
          language="tsx"
          title="Float で浮遊アニメーション"
          code={`import { Float } from '@react-three/drei';

function FloatingCube() {
  return (
    <Float
      speed={2}              // アニメーション速度
      rotationIntensity={1}  // 回転の強さ
      floatIntensity={1.5}   // 上下の浮遊量
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#EC4899" />
      </mesh>
    </Float>
  );
}`}
        />
      </div>

      {/* MeshWobbleMaterial + インタラクティブデモ */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">5. MeshWobbleMaterial</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          メッシュの頂点をゆらゆらと変形させるマテリアルです。
          <code>factor</code>（変形量）と <code>speed</code>（速度）で
          ゼリーのような揺れの効果を調整できます。
          スライダーで変形量と速度を調整してみましょう。
        </p>

        <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
          <ParameterSlider
            label="変形量（factor）"
            value={wobbleFactor}
            min={0}
            max={6}
            step={0.1}
            onChange={setWobbleFactor}
          />
          <ParameterSlider
            label="速度（speed）"
            value={wobbleSpeed}
            min={0}
            max={5}
            step={0.1}
            onChange={setWobbleSpeed}
          />
        </div>

        <CodeWithPreview
          language="tsx"
          title="MeshWobbleMaterial でゆらゆら効果"
          caption="Float + MeshWobbleMaterial を組み合わせたトーラス"
          cameraPosition={[4, 3, 4]}
          code={`import { MeshWobbleMaterial } from '@react-three/drei';

function WobblyTorus() {
  return (
    <mesh>
      <torusGeometry args={[1, 0.4, 32, 64]} />
      <MeshWobbleMaterial
        color="#8B5CF6"
        factor={2}      // 変形量（0 = 変形なし）
        speed={2}        // 揺れの速度
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}`}
        >
          <WobblyTorus wobbleFactor={wobbleFactor} wobbleSpeed={wobbleSpeed} />
          <FloatingOrbs />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#93C5FD" />
        </CodeWithPreview>
      </div>

      <div className="mt-8">
        <InfoBox title="その他の便利な drei コンポーネント">
          <p className="mb-2">drei には他にも多くの便利なヘルパーがあります。</p>
          <ul className="list-disc list-inside space-y-1">
            <li><code>Html</code> - 3D シーン内に HTML 要素をオーバーレイ表示</li>
            <li><code>Sparkles</code> - キラキラしたパーティクルエフェクト</li>
            <li><code>Stars</code> - 星空の背景を生成</li>
            <li><code>ContactShadows</code> - オブジェクトの接地影をリアルに描画</li>
            <li><code>Center</code> - 子要素を自動的に中央に配置</li>
            <li><code>useGLTF</code> - GLTF モデルの読み込みフック</li>
            <li><code>PresentationControls</code> - ドラッグで回転するプレゼン向けコントロール</li>
          </ul>
          <p className="mt-2">
            公式ドキュメント: <a href="https://github.com/pmndrs/drei" target="_blank" rel="noopener noreferrer" className="underline">github.com/pmndrs/drei</a>
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="メタリックな球体シーンを作ろう"
          description="MeshStandardMaterial の metalness と roughness を調整して、金属的な反射をする球体を作成してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ライティング
scene.add(new THREE.AmbientLight(0x404040));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);
const backLight = new THREE.DirectionalLight(0x93C5FD, 0.3);
backLight.position.set(-3, 3, -3);
scene.add(backLight);

// メタリックな球体を作成
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xC0C0C0,
  ___: 0.9,       // 金属度（0=非金属, 1=金属）
  ___: 0.1,       // 粗さ（0=鏡面, 1=粗い）
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.set(2, 1.5, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);
const backLight = new THREE.DirectionalLight(0x93C5FD, 0.3);
backLight.position.set(-3, 3, -3);
scene.add(backLight);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0xC0C0C0,
  metalness: 0.9,
  roughness: 0.1,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.set(2, 1.5, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          keywords={['metalness', 'roughness']}
          hints={[
            'metalness で金属度を設定します（0=非金属、1=完全な金属）',
            'roughness で表面の粗さを設定します（0=鏡面、1=粗い）',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="drei のまとめ">
          <ul className="list-disc list-inside space-y-1">
            <li><code>OrbitControls</code> - 1 行でカメラ操作を追加</li>
            <li><code>Environment</code> - プリセットでリアルな環境光</li>
            <li><code>Text</code> - 3D シーン内のテキスト表示</li>
            <li><code>Float</code> - ふわふわ浮遊アニメーション</li>
            <li><code>MeshWobbleMaterial</code> - ゼリーのようなゆらゆら効果</li>
            <li>drei を活用すれば、少ないコードでリッチな 3D 表現が可能</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
