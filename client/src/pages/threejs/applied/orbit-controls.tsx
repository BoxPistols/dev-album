import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// ゆっくり浮遊する球体
function FloatingSphere({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} />
    </mesh>
  );
}

// OrbitControls をパラメータで制御するシーン
function ControlledScene({
  enableDamping,
  autoRotateSpeed,
  minDistance,
  maxDistance,
}: {
  enableDamping: boolean;
  autoRotateSpeed: number;
  minDistance: number;
  maxDistance: number;
}) {
  return (
    <>
      {/* 中央のオブジェクト */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* 周囲の浮遊オブジェクト */}
      <FloatingSphere position={[2, 0.5, 0]} color="#7C3AED" speed={1.2} />
      <FloatingSphere position={[-2, 0.3, 1]} color="#059669" speed={0.8} />
      <FloatingSphere position={[0, 0.6, -2]} color="#DC2626" speed={1.5} />
      <FloatingSphere position={[1.5, 0.4, 1.5]} color="#EA580C" speed={1.0} />
      <FloatingSphere position={[-1.5, 0.5, -1.5]} color="#0EA5E9" speed={0.9} />

      {/* 床 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#374151" roughness={0.9} />
      </mesh>

      {/* ライト */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 3, 3]} intensity={0.5} color="#FFA500" />

      {/* OrbitControls（ThreePreview のデフォルトではなくカスタム設定を使用） */}
      <OrbitControls
        enableDamping={enableDamping}
        dampingFactor={0.08}
        autoRotate={autoRotateSpeed > 0}
        autoRotateSpeed={autoRotateSpeed}
        minDistance={minDistance}
        maxDistance={maxDistance}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function OrbitControlsPage() {
  const [damping, setDamping] = useState(1);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(2);
  const [minDistance, setMinDistance] = useState(2);
  const [maxDistance, setMaxDistance] = useState(12);

  return (
    <PageLayout>
      <h1 className="mb-6">OrbitControls</h1>

      <WhyNowBox tags={["OrbitControls", "回転", "ズーム", "パン"]}>
        <p>
          OrbitControls は、ユーザーがマウスやタッチ操作で 3D シーンを
          自由に探索できるようにするカメラコントロールです。
          ドラッグで回転、スクロールでズーム、右クリックドラッグで平行移動ができます。
        </p>
        <p>
          3D ビューワーやポートフォリオなど、ほとんどの 3D Web アプリで使われる
          最も基本的なカメラコントロールです。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">OrbitControls の機能</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">回転（Rotate）</h4>
          <p className="text-sm text-muted-foreground">
            左ドラッグまたはワンタッチドラッグでターゲットを中心にカメラを回転します。
            極角（上下）と方位角（左右）を制限できます。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">ズーム（Zoom）</h4>
          <p className="text-sm text-muted-foreground">
            マウスホイールまたはピンチ操作でカメラを近づけたり遠ざけたりします。
            最小・最大距離を設定できます。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">パン（Pan）</h4>
          <p className="text-sm text-muted-foreground">
            右ドラッグまたはツータッチドラッグでカメラの注視点を平行移動します。
            <code>enablePan</code> で無効化も可能です。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3">パラメータを調整してみよう</h2>
      <p className="text-sm text-muted-foreground mb-4">
        スライダーでパラメータを変更し、カメラコントロールの挙動を確認できます。
        マウスドラッグで回転、スクロールでズームしてみてください。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="ダンピング"
          value={damping}
          min={0}
          max={1}
          step={1}
          onChange={setDamping}
          unit={damping > 0 ? " ON" : " OFF"}
        />
        <ParameterSlider
          label="自動回転速度"
          value={autoRotateSpeed}
          min={0}
          max={10}
          step={0.5}
          onChange={setAutoRotateSpeed}
        />
        <ParameterSlider
          label="最小距離"
          value={minDistance}
          min={1}
          max={5}
          step={0.5}
          onChange={setMinDistance}
        />
        <ParameterSlider
          label="最大距離"
          value={maxDistance}
          min={5}
          max={20}
          step={1}
          onChange={setMaxDistance}
        />
      </div>

      <ThreePreview
        caption="ドラッグで回転 / スクロールでズーム / 右ドラッグでパン"
        cameraPosition={[4, 3, 4]}
        orbitControls={false}
      >
        <ControlledScene
          enableDamping={damping > 0}
          autoRotateSpeed={autoRotateSpeed}
          minDistance={minDistance}
          maxDistance={maxDistance}
        />
      </ThreePreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">OrbitControls のセットアップ</h2>

        <CodeBlock
          language="javascript"
          title="Three.js での OrbitControls"
          showLineNumbers
          code={`import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// OrbitControls を作成
const controls = new OrbitControls(camera, renderer.domElement);

// ダンピング（慣性）を有効にする
controls.enableDamping = true;
controls.dampingFactor = 0.08;

// 自動回転
controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

// ズーム距離の制限
controls.minDistance = 2;
controls.maxDistance = 12;

// 回転角度の制限（地面より下を見せない）
controls.maxPolarAngle = Math.PI / 2;

// パンの無効化（必要に応じて）
// controls.enablePan = false;

// アニメーションループ内で更新
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // ダンピング・自動回転に必要
  renderer.render(scene, camera);
}`}
        />
      </div>

      <div className="mt-8">
        <CodeBlock
          language="tsx"
          title="R3F + drei での OrbitControls"
          showLineNumbers
          code={`import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas camera={{ position: [4, 3, 4] }}>
      <Scene />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        autoRotate
        autoRotateSpeed={2}
        minDistance={2}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="その他のカメラコントロール">
          <p>
            OrbitControls 以外にも、用途に応じたカメラコントロールがあります。
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>FlyControls</strong> - フライトシミュレーターのように自由に移動。
              ゲームや広大な空間の探索向き
            </li>
            <li>
              <strong>TrackballControls</strong> - OrbitControls に似ているが、
              上下の回転制限がなく、全方向に自由に回転できる
            </li>
            <li>
              <strong>PointerLockControls</strong> - FPS ゲームのような一人称視点。
              マウスポインターをロックしてカメラを制御
            </li>
            <li>
              <strong>MapControls</strong> - OrbitControls ベースの地図操作向きコントロール。
              左クリックでパン、右クリックで回転
            </li>
          </ul>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="OrbitControls を設定しよう"
          description="OrbitControlsを作成し、ダンピング・自動回転・ズーム距離制限を設定してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 正十二面体を作成
const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));

camera.position.set(4, 3, 4);

// OrbitControls を作成
const controls = new OrbitControls(camera, renderer.domElement);

// ダンピング（慣性）を有効にする
controls.___ = true;
controls.dampingFactor = 0.08;

// 自動回転を有効にする
controls.___ = true;
controls.autoRotateSpeed = 2.0;

// ズーム距離を制限する
controls.___ = 2;
controls.___ = 12;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));

camera.position.set(4, 3, 4);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.08;

controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

controls.minDistance = 2;
controls.maxDistance = 12;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();`}
          keywords={['enableDamping', 'autoRotate', 'minDistance', 'maxDistance']}
          hints={[
            'controls.enableDamping = true でダンピングを有効に',
            'controls.autoRotate = true で自動回転を有効に',
            'controls.minDistance / maxDistance でズーム範囲を制限',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>OrbitControls でドラッグ回転・ズーム・パンを実現</li>
            <li>enableDamping で慣性のある滑らかな操作感</li>
            <li>autoRotate でシーンの自動回転</li>
            <li>minDistance / maxDistance でズーム範囲を制限</li>
            <li>maxPolarAngle で回転角度を制限（地面下を見せない等）</li>
            <li>用途に応じて FlyControls や PointerLockControls も検討</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
