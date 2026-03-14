import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// 飛行機モデル（プリミティブ）
function AirplaneModel() {
  return (
    <group>
      {/* 胴体 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.12, 1.4, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* 主翼 */}
      <mesh>
        <boxGeometry args={[2.0, 0.04, 0.4]} />
        <meshStandardMaterial color="#818CF8" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 尾翼（水平） */}
      <mesh position={[0, 0, -0.6]}>
        <boxGeometry args={[0.7, 0.03, 0.2]} />
        <meshStandardMaterial color="#818CF8" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 尾翼（垂直） */}
      <mesh position={[0, 0.15, -0.6]}>
        <boxGeometry args={[0.03, 0.3, 0.2]} />
        <meshStandardMaterial color="#6366F1" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* ノーズ */}
      <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 0.3, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

// 円軌道を飛ぶ飛行機 + カメラ追従
function FlyingAircraftWithCamera({
  followDistance,
  followHeight,
  smoothing,
}: {
  followDistance: number;
  followHeight: number;
  smoothing: number;
}) {
  const aircraftRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // カメラの現在位置（スムージング用）
  const cameraTarget = useRef(new THREE.Vector3());
  const cameraLookAt = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!aircraftRef.current) return;

    const t = state.clock.elapsedTime * 0.4;
    const radius = 5;

    // 飛行機の位置を更新（円軌道 + 上下動）
    const aircraftX = Math.cos(t) * radius;
    const aircraftZ = Math.sin(t) * radius;
    const aircraftY = 2 + Math.sin(t * 1.5) * 1;

    aircraftRef.current.position.set(aircraftX, aircraftY, aircraftZ);

    // 進行方向を向く
    const nextX = Math.cos(t + 0.01) * radius;
    const nextZ = Math.sin(t + 0.01) * radius;
    aircraftRef.current.lookAt(nextX, aircraftY, nextZ);

    // バンク角
    aircraftRef.current.rotation.z = Math.sin(t) * 0.3;

    // 三人称カメラ: 飛行機の後方上方から追従
    // 飛行機の後方方向ベクトルを計算
    const backward = new THREE.Vector3(0, 0, -1);
    backward.applyQuaternion(aircraftRef.current.quaternion);

    // 目標カメラ位置 = 飛行機位置 + 後方 * 距離 + 上方 * 高さ
    const targetCamPos = new THREE.Vector3(
      aircraftX + backward.x * followDistance,
      aircraftY + followHeight,
      aircraftZ + backward.z * followDistance
    );

    // lerp でスムーズに追従
    cameraTarget.current.lerp(targetCamPos, smoothing);
    cameraLookAt.current.lerp(
      new THREE.Vector3(aircraftX, aircraftY, aircraftZ),
      smoothing
    );

    camera.position.copy(cameraTarget.current);
    camera.lookAt(cameraLookAt.current);
  });

  return (
    <group ref={aircraftRef}>
      <AirplaneModel />
    </group>
  );
}

// カメラデモシーン
function CameraPreviewScene({
  followDistance,
  followHeight,
  smoothing,
}: {
  followDistance: number;
  followHeight: number;
  smoothing: number;
}) {
  return (
    <>
      <FlyingAircraftWithCamera
        followDistance={followDistance}
        followHeight={followHeight}
        smoothing={smoothing}
      />

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#1a472a" roughness={0.9} />
      </mesh>
      <gridHelper args={[40, 40, "#2D5A27", "#1E3A1E"]} position={[0, -0.99, 0]} />

      {/* チェックポイントのリング */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 5,
            2 + Math.sin(angle * 2) * 0.5,
            Math.sin(angle) * 5,
          ]}
          rotation={[0, -angle + Math.PI / 2, 0]}
        >
          <torusGeometry args={[1, 0.05, 8, 32]} />
          <meshStandardMaterial
            color="#F59E0B"
            emissive="#F59E0B"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}

      {/* 空 */}
      <mesh>
        <sphereGeometry args={[50, 16, 8]} />
        <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
      </mesh>

      {/* ライティング */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} color="#FFF8E1" />
      <fog attach="fog" args={["#87CEEB", 20, 50]} />
    </>
  );
}

export default function CameraPage() {
  const [followDistance, setFollowDistance] = useState(6);
  const [followHeight, setFollowHeight] = useState(3);
  const [smoothing, setSmoothing] = useState(0.05);

  return (
    <PageLayout>
      <h1 className="mb-6">カメラ追従と視点切替</h1>

      <WhyNowBox tags={["カメラ追従", "lerp", "視点切替"]}>
        <p>
          カメラワークがゲーム体験を決めます。
          プレイヤーが操作する飛行機をどの視点から追いかけるかで、
          没入感やプレイのしやすさが大きく変わります。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">3 つのカメラモード</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        飛行シミュレーションでは、3 種類のカメラモードを用意するのが一般的です。
        それぞれの特徴を理解しましょう。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border-2 border-primary/30 rounded-lg p-5">
          <h3 className="font-bold text-primary mb-2">三人称 (Third Person)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            飛行機の後方上方からの追従。最もプレイしやすく、初心者向け。
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 機体全体が見える</li>
            <li>- 周囲の状況を把握しやすい</li>
            <li>- lerp によるスムーズな追従</li>
          </ul>
        </div>

        <div className="bg-card border-2 border-amber-500/30 rounded-lg p-5">
          <h3 className="font-bold text-amber-500 mb-2">コックピット (Cockpit)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            パイロット視点。機体位置にカメラを配置し、前方を見る。
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 最も没入感が高い</li>
            <li>- 速度感を実感できる</li>
            <li>- VR との相性が良い</li>
          </ul>
        </div>

        <div className="bg-card border-2 border-emerald-500/30 rounded-lg p-5">
          <h3 className="font-bold text-emerald-500 mb-2">シネマティック (Cinematic)</h3>
          <p className="text-sm text-muted-foreground mb-3">
            飛行機の周囲を自動で周回するカメラ。リプレイや演出向け。
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>- 映画のようなアングル</li>
            <li>- 自動回転で全方位を表示</li>
            <li>- スクリーンショット撮影向き</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">三人称カメラのプレビュー</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        スライダーでカメラの追従距離、高さ、スムージング（追従の滑らかさ）を調整できます。
        スムージングの値が小さいほど遅延が大きく、滑らかに追従します。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="追従距離"
          value={followDistance}
          min={3}
          max={15}
          step={0.5}
          onChange={setFollowDistance}
          unit="m"
        />
        <ParameterSlider
          label="追従高さ"
          value={followHeight}
          min={1}
          max={8}
          step={0.5}
          onChange={setFollowHeight}
          unit="m"
        />
        <ParameterSlider
          label="スムージング"
          value={smoothing}
          min={0.01}
          max={0.2}
          step={0.01}
          onChange={setSmoothing}
        />
      </div>

      <CodeWithPreview
        language="tsx"
        title="三人称カメラの追従ロジック"
        caption={`追従距離: ${followDistance.toFixed(1)}m / 高さ: ${followHeight.toFixed(1)}m / スムージング: ${smoothing.toFixed(2)}`}
        cameraPosition={[0, 5, 10]}
        code={`import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ThirdPersonCamera({
  target,            // 追従対象の Group ref
  distance = 6,      // 後方への距離
  height = 3,        // 上方のオフセット
  smoothing = 0.05,  // 追従の滑らかさ (0=動かない, 1=即座に追従)
}: {
  target: React.RefObject<THREE.Group>;
  distance?: number;
  height?: number;
  smoothing?: number;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!target.current) return;

    // 飛行機の後方方向を取得
    const backward = new THREE.Vector3(0, 0, -1);
    backward.applyQuaternion(target.current.quaternion);

    // 目標カメラ位置 = 飛行機位置 + 後方 * 距離 + 上方 * 高さ
    const targetPos = target.current.position.clone()
      .add(backward.multiplyScalar(distance))
      .add(new THREE.Vector3(0, height, 0));

    // lerp で滑らかに追従
    currentPos.current.lerp(targetPos, smoothing);
    currentLookAt.current.lerp(target.current.position, smoothing);

    // カメラに適用
    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null; // カメラはシーンの子ではない
}`}
      >
        <CameraPreviewScene
          followDistance={followDistance}
          followHeight={followHeight}
          smoothing={smoothing}
        />
      </CodeWithPreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">視点切替の実装</h2>

        <CodeBlock
          language="tsx"
          title="カメラモード切替ロジック"
          showLineNumbers
          code={`type CameraMode = "thirdPerson" | "cockpit" | "cinematic";

function CameraController({
  target,
  mode,
}: {
  target: React.RefObject<THREE.Group>;
  mode: CameraMode;
}) {
  const { camera } = useThree();
  const currentPos = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!target.current) return;
    const pos = target.current.position;
    const quat = target.current.quaternion;

    switch (mode) {
      case "thirdPerson": {
        // 後方上方から追従
        const back = new THREE.Vector3(0, 0, -1).applyQuaternion(quat);
        const targetPos = pos.clone()
          .add(back.multiplyScalar(6))
          .add(new THREE.Vector3(0, 3, 0));
        currentPos.current.lerp(targetPos, 0.05);
        camera.position.copy(currentPos.current);
        camera.lookAt(pos);
        break;
      }
      case "cockpit": {
        // パイロット視点（機体位置 + 少し上）
        const cockpitPos = pos.clone().add(new THREE.Vector3(0, 0.3, 0));
        camera.position.copy(cockpitPos);
        // 前方を向く
        const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(quat);
        camera.lookAt(pos.clone().add(forward.multiplyScalar(10)));
        break;
      }
      case "cinematic": {
        // 周回カメラ
        const t = state.clock.elapsedTime * 0.3;
        const orbitRadius = 8;
        camera.position.set(
          pos.x + Math.cos(t) * orbitRadius,
          pos.y + 4,
          pos.z + Math.sin(t) * orbitRadius
        );
        camera.lookAt(pos);
        break;
      }
    }
  });

  return null;
}

// キーで切替
// 1キー: 三人称, 2キー: コックピット, 3キー: シネマティック
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (e.code === "Digit1") setMode("thirdPerson");
    if (e.code === "Digit2") setMode("cockpit");
    if (e.code === "Digit3") setMode("cinematic");
  };
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);`}
        />
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="lerp でカメラを滑らかに追従させよう"
          description="線形補間（lerp）を使って、移動するオブジェクトにカメラを滑らかに追従させてください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.GridHelper(20, 20));

// 移動するターゲット
const target = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x4F46E5 })
);
scene.add(target);

// カメラの現在位置（lerp用）
const cameraPos = new THREE.Vector3(0, 5, 10);
const smoothing = ___;  // 0.05 = ゆっくり追従

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  // ターゲットを円軌道で移動
  target.position.x = Math.cos(t * 0.5) * 5;
  target.position.z = Math.sin(t * 0.5) * 5;
  target.position.y = 0.25;

  // カメラの目標位置 = ターゲットの後方上方
  const targetCamPos = new THREE.Vector3(
    target.position.x,
    target.position.y + 5,
    target.position.z + 8
  );

  // lerp で滑らかにカメラを移動
  cameraPos.___(targetCamPos, smoothing);
  camera.position.copy(cameraPos);
  camera.___(target.position);

  renderer.render(scene, camera);
}
animate();`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.GridHelper(20, 20));

const target = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.5, 0.5),
  new THREE.MeshStandardMaterial({ color: 0x4F46E5 })
);
scene.add(target);

const cameraPos = new THREE.Vector3(0, 5, 10);
const smoothing = 0.05;

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  target.position.x = Math.cos(t * 0.5) * 5;
  target.position.z = Math.sin(t * 0.5) * 5;
  target.position.y = 0.25;

  const targetCamPos = new THREE.Vector3(
    target.position.x,
    target.position.y + 5,
    target.position.z + 8
  );

  cameraPos.lerp(targetCamPos, smoothing);
  camera.position.copy(cameraPos);
  camera.lookAt(target.position);

  renderer.render(scene, camera);
}
animate();`}
          keywords={['lerp(', 'lookAt(', '0.05']}
          hints={[
            'Vector3.lerp(目標, 補間率) で滑らかに目標に近づきます',
            'camera.lookAt(position) でカメラをターゲットに向けます',
            'smoothing は 0.05 程度がゆっくりとした自然な追従になります',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="3D酔い（モーションシックネス）の防止">
          <p className="mb-2">
            カメラワーク次第では、プレイヤーが 3D 酔いを感じることがあります。
            以下の点に注意しましょう。
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>急激なカメラの回転を避ける</strong> - lerp のスムージング値を適切に設定する
            </li>
            <li>
              <strong>視野角（FOV）を広げすぎない</strong> - 45-60 度が快適な範囲
            </li>
            <li>
              <strong>固定の参照点を用意する</strong> - HUD やコックピットフレームで安定感を与える
            </li>
            <li>
              <strong>ロール（Z軸回転）を抑える</strong> - 水平線が傾くと酔いやすい。
              カメラのロールは機体の 50% 程度に抑えるとよい
            </li>
            <li>
              <strong>FPS を安定させる</strong> - フレームレートの低下や不安定さは酔いの原因
            </li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
