import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// 物理シミュレーション付きの飛行体
function PhysicsAircraft({
  thrust,
  liftCoefficient,
  gravity,
}: {
  thrust: number;
  liftCoefficient: number;
  gravity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: -4, y: 2 });
  const trailRef = useRef<THREE.Points>(null);
  const trailPositions = useRef<number[]>([]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const vel = velocityRef.current;
    const pos = posRef.current;

    // 推力: 前方への加速
    const thrustForce = thrust * 0.02;
    vel.x += thrustForce * delta;

    // 速度の大きさ
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);

    // 揚力: 速度に比例（一定速度以上で浮力が発生）
    const lift = speed * liftCoefficient * 0.3 * delta;
    vel.y += lift;

    // 重力: 常に下方向
    vel.y -= gravity * delta * 0.1;

    // 抗力: 速度の二乗に比例して抵抗
    const drag = 0.02;
    vel.x -= vel.x * drag * speed * delta;
    vel.y -= vel.y * drag * Math.abs(vel.y) * delta;

    // 位置を更新
    pos.x += vel.x * delta * 3;
    pos.y += vel.y * delta * 3;

    // 画面外に出たらリセット
    if (pos.x > 6 || pos.y < -3 || pos.y > 8) {
      pos.x = -4;
      pos.y = 2;
      vel.x = 0;
      vel.y = 0;
      trailPositions.current = [];
    }

    // メッシュの位置を更新
    meshRef.current.position.x = pos.x;
    meshRef.current.position.y = pos.y;

    // 進行方向に向ける
    const angle = Math.atan2(vel.y, vel.x);
    meshRef.current.rotation.z = angle;

    // 軌跡を更新
    trailPositions.current.push(pos.x, pos.y, 0);
    if (trailPositions.current.length > 300) {
      trailPositions.current.splice(0, 3);
    }
    if (trailRef.current) {
      const geo = trailRef.current.geometry;
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(trailPositions.current, 3)
      );
    }
  });

  return (
    <>
      {/* 飛行体（球で表現） */}
      <mesh ref={meshRef} position={[-4, 2, 0]}>
        <sphereGeometry args={[0.15, 12, 8]} />
        <meshStandardMaterial
          color="#4F46E5"
          emissive="#4F46E5"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* 軌跡 */}
      <points ref={trailRef}>
        <bufferGeometry />
        <pointsMaterial color="#818CF8" size={0.03} transparent opacity={0.5} />
      </points>
    </>
  );
}

// 物理プレビューシーン
function PhysicsPreviewScene({
  thrust,
  liftCoefficient,
  gravity,
}: {
  thrust: number;
  liftCoefficient: number;
  gravity: number;
}) {
  return (
    <>
      <PhysicsAircraft
        thrust={thrust}
        liftCoefficient={liftCoefficient}
        gravity={gravity}
      />

      {/* 地面の線 */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 0.5]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>

      {/* グリッド */}
      <gridHelper
        args={[14, 14, "#334155", "#1E293B"]}
        position={[0, -3, 0]}
      />

      {/* 高度のガイドライン */}
      {[0, 2, 4].map((h) => (
        <mesh key={h} position={[0, h - 3, -0.1]}>
          <planeGeometry args={[14, 0.005]} />
          <meshBasicMaterial color="#334155" transparent opacity={0.5} />
        </mesh>
      ))}

      {/* ライティング */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
    </>
  );
}

export default function PhysicsPage() {
  const [thrust, setThrust] = useState(50);
  const [liftCoefficient, setLiftCoefficient] = useState(1.0);
  const [gravity, setGravity] = useState(9.8);

  return (
    <PageLayout>
      <h1 className="mb-6">飛行物理シミュレーション</h1>

      <WhyNowBox tags={["物理演算", "揚力", "重力", "抗力"]}>
        <p>
          リアリティは物理から生まれます。完全な航空力学シミュレーションは複雑ですが、
          シンプルな物理モデルでも十分な「飛行感」を実現できます。
        </p>
        <p>
          4 つの力 - 推力・揚力・重力・抗力 - をバランスよく組み合わせるのがコツです。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">飛行の 4 つの力</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        飛行機が空を飛ぶ仕組みは、4 つの基本的な力のバランスで説明できます。
        ゲームでは、これらをシンプルな数式でモデル化します。
      </p>

      {/* 4つの力カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card border-2 border-blue-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">&#8594;</span>
            <h3 className="font-bold text-blue-500">推力 (Thrust)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            エンジンが生み出す前方への力。プレイヤーの加速操作に対応。
          </p>
          <div className="bg-muted/50 rounded px-3 py-2 font-mono text-xs">
            velocity += thrust * delta
          </div>
        </div>

        <div className="bg-card border-2 border-green-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">&#8593;</span>
            <h3 className="font-bold text-green-500">揚力 (Lift)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            翼が生み出す上方への力。速度と迎え角に比例する。
          </p>
          <div className="bg-muted/50 rounded px-3 py-2 font-mono text-xs">
            lift = speed * liftCoef * angleOfAttack
          </div>
        </div>

        <div className="bg-card border-2 border-red-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">&#8595;</span>
            <h3 className="font-bold text-red-500">重力 (Gravity)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            常に下方向に働く力。質量に比例し一定。
          </p>
          <div className="bg-muted/50 rounded px-3 py-2 font-mono text-xs">
            velocity.y -= gravity * delta
          </div>
        </div>

        <div className="bg-card border-2 border-amber-500/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">&#8592;</span>
            <h3 className="font-bold text-amber-500">抗力 (Drag)</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            空気抵抗。速度の二乗に比例して増大する。
          </p>
          <div className="bg-muted/50 rounded px-3 py-2 font-mono text-xs">
            {"drag = dragCoef * speed * speed"}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">物理シミュレーション プレビュー</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        球体が飛行体を表しています。推力を上げると前方に加速し、揚力係数が高いと
        浮き上がります。重力を上げると落下が速くなります。パラメータを調整して
        飛行のバランスを観察しましょう。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="推力"
          value={thrust}
          min={0}
          max={100}
          step={1}
          onChange={setThrust}
        />
        <ParameterSlider
          label="揚力係数"
          value={liftCoefficient}
          min={0}
          max={2}
          step={0.05}
          onChange={setLiftCoefficient}
        />
        <ParameterSlider
          label="重力"
          value={gravity}
          min={0}
          max={20}
          step={0.5}
          onChange={setGravity}
          unit="m/s²"
        />
      </div>

      <ThreePreview
        height="400px"
        caption={`推力: ${thrust} / 揚力係数: ${liftCoefficient.toFixed(2)} / 重力: ${gravity.toFixed(1)}m/s² - 画面右端でリセット`}
        cameraPosition={[0, 1, 10]}
        cameraFov={50}
        orbitControls={false}
      >
        <PhysicsPreviewScene
          thrust={thrust}
          liftCoefficient={liftCoefficient}
          gravity={gravity}
        />
      </ThreePreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">物理更新関数の実装</h2>

        <CodeBlock
          language="tsx"
          title="飛行物理の更新ロジック"
          showLineNumbers
          code={`interface FlightState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  thrust: number;        // 0〜1 の範囲
  speed: number;         // 現在の速度（計算値）
}

const GRAVITY = 9.8;
const LIFT_COEFFICIENT = 0.5;
const DRAG_COEFFICIENT = 0.02;
const MAX_SPEED = 50;

function updateFlightPhysics(state: FlightState, delta: number) {
  // 1. 推力: 前方（ローカルZ軸方向）に加速
  const forward = new THREE.Vector3(0, 0, 1);
  forward.applyEuler(state.rotation);
  state.velocity.add(forward.multiplyScalar(state.thrust * 20 * delta));

  // 2. 速度の大きさを計算
  state.speed = state.velocity.length();

  // 3. 揚力: 速度に比例して上方向の力を発生
  //    実際の揚力は迎え角にも依存するが、簡略化
  const lift = state.speed * LIFT_COEFFICIENT * delta;
  state.velocity.y += lift;

  // 4. 重力: 常に下方向
  state.velocity.y -= GRAVITY * delta;

  // 5. 抗力: 速度の二乗に比例した抵抗
  const dragMagnitude = DRAG_COEFFICIENT * state.speed * state.speed;
  const dragForce = state.velocity.clone().normalize().multiplyScalar(-dragMagnitude * delta);
  state.velocity.add(dragForce);

  // 6. 最大速度の制限
  if (state.speed > MAX_SPEED) {
    state.velocity.normalize().multiplyScalar(MAX_SPEED);
  }

  // 7. 位置を更新
  state.position.add(state.velocity.clone().multiplyScalar(delta));

  // 8. 地面との衝突判定（簡易）
  if (state.position.y < 0) {
    state.position.y = 0;
    state.velocity.y = Math.max(0, state.velocity.y);
  }
}`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">useFrame での統合</h2>

        <CodeBlock
          language="tsx"
          title="R3F で物理を適用する"
          showLineNumbers
          code={`function PhysicsAircraft() {
  const groupRef = useRef<THREE.Group>(null);
  const flightState = useRef<FlightState>({
    position: new THREE.Vector3(0, 10, 0),
    velocity: new THREE.Vector3(0, 0, 5),
    rotation: new THREE.Euler(0, 0, 0),
    thrust: 0.5,
    speed: 5,
  });

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // delta の上限を設定（タブ切り替え時の大きな値を防止）
    const clampedDelta = Math.min(delta, 0.05);

    // 物理を更新
    updateFlightPhysics(flightState.current, clampedDelta);

    // 3D オブジェクトに反映
    const { position, rotation } = flightState.current;
    groupRef.current.position.copy(position);
    groupRef.current.rotation.copy(rotation);
  });

  return (
    <group ref={groupRef}>
      {/* 飛行機メッシュ */}
    </group>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="重力で落下する球体を作ろう"
          description="重力と地面バウンドを実装して、球体が落下して跳ね返るシミュレーションを作成してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));

// 球体を作成
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x4F46E5 })
);
sphere.position.y = 4;
scene.add(sphere);

// 地面
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

scene.add(new THREE.GridHelper(10, 10));

camera.position.set(3, 3, 5);
camera.lookAt(0, 1, 0);

// 物理パラメータ
let velocityY = 0;
const ___ = 9.8;     // 重力加速度
const bounce = 0.7;   // 反発係数

function animate() {
  requestAnimationFrame(animate);
  const delta = 0.016;

  // 重力を適用
  velocityY -= ___ * delta;

  // 位置を更新
  sphere.position.y += velocityY * delta;

  // 地面との衝突（バウンド）
  if (sphere.position.y < 0.3) {
    sphere.position.y = 0.3;
    velocityY = -velocityY * ___;
  }

  renderer.render(scene, camera);
}
animate();`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x4F46E5 })
);
sphere.position.y = 4;
scene.add(sphere);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x333333 })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

scene.add(new THREE.GridHelper(10, 10));

camera.position.set(3, 3, 5);
camera.lookAt(0, 1, 0);

let velocityY = 0;
const gravity = 9.8;
const bounce = 0.7;

function animate() {
  requestAnimationFrame(animate);
  const delta = 0.016;

  velocityY -= gravity * delta;

  sphere.position.y += velocityY * delta;

  if (sphere.position.y < 0.3) {
    sphere.position.y = 0.3;
    velocityY = -velocityY * bounce;
  }

  renderer.render(scene, camera);
}
animate();`}
          keywords={['gravity', 'velocityY', 'bounce']}
          hints={[
            '重力加速度は 9.8 (m/s^2) が標準です',
            '毎フレーム velocityY から gravity * delta を引きます',
            '反発係数 bounce (0-1) で跳ね返りの強さを制御します',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="リアリズム vs 楽しさのバランス">
          <p className="mb-2">
            物理シミュレーションの精度と、ゲームとしての楽しさはトレードオフの関係にあります。
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>delta のクランプ</strong>: タブ切り替え後の巨大な delta 値で
              物理が破綻するのを防ぐ（<code>Math.min(delta, 0.05)</code>）
            </li>
            <li>
              <strong>揚力を簡略化</strong>: 実際の揚力は迎え角・翼面積・空気密度に依存するが、
              ゲームでは速度との線形関係で十分
            </li>
            <li>
              <strong>操作レスポンス重視</strong>: リアルな飛行機は舵の応答が遅いが、
              ゲームでは即座に反応する方がプレイしやすい
            </li>
            <li>
              <strong>失速のシンプル化</strong>: 低速時に揚力が急激に失われる失速を
              段階的にするとプレイヤーに分かりやすい
            </li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
