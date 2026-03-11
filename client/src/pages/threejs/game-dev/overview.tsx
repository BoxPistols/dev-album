import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

// スタイル付き飛行機（プリミティブで構成）
function StylizedAirplane({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={groupRef}>
      {/* 胴体 - 横向きのシリンダー */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.12, 1.4, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* 主翼 */}
      <mesh position={[0, 0, 0]}>
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
      {/* ノーズコーン */}
      <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.12, 0.3, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

// 円を描いて飛ぶ飛行機のシーン
function FlyingAirplaneScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * 0.5;
    const radius = 3;
    // 円軌道上を移動
    groupRef.current.position.x = Math.cos(t) * radius;
    groupRef.current.position.z = Math.sin(t) * radius;
    groupRef.current.position.y = Math.sin(t * 2) * 0.5;
    // 進行方向を向く
    groupRef.current.rotation.y = -t + Math.PI / 2;
    // 旋回時のバンク角
    groupRef.current.rotation.z = Math.sin(t) * 0.3;
  });

  return (
    <>
      <StylizedAirplane groupRef={groupRef} />
      {/* 軌道を示すリング */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[3, 0.01, 8, 64]} />
        <meshBasicMaterial color="#6366F1" transparent opacity={0.3} />
      </mesh>
      {/* グリッド */}
      <gridHelper args={[10, 10, "#334155", "#1E293B"]} />
      {/* ライティング */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#93C5FD" />
    </>
  );
}

export default function OverviewPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">ゲーム設計の全体像</h1>

      <WhyNowBox tags={["ゲーム開発", "アーキテクチャ", "飛行シミュレーション"]}>
        <p>
          ゲーム開発を通じて Three.js の実践力を高めましょう。
          飛行シミュレーションは、3D プログラミングの総合演習として最適なテーマです。
        </p>
        <p>
          カメラワーク、物理演算、入力処理、HUD など、ゲーム開発に必要な要素を
          ひとつずつ積み上げていきます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">ゲームアーキテクチャの全体像</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        飛行シミュレーションゲームは、いくつかの独立したシステムが連携して動作します。
        まずは全体の構成を把握しましょう。
      </p>

      {/* アーキテクチャ図 */}
      <div className="rounded-lg border border-border bg-card p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-center text-foreground">
          ゲームアーキテクチャ フロー
        </h3>
        <div className="flex flex-col items-center gap-3">
          {/* ゲームループ（最上位） */}
          <div className="w-full max-w-md bg-primary/10 border-2 border-primary rounded-lg p-3 text-center">
            <div className="font-bold text-primary text-sm">Game Loop</div>
            <div className="text-xs text-muted-foreground">requestAnimationFrame で毎フレーム実行</div>
          </div>
          <div className="text-muted-foreground">&#8595;</div>
          {/* 中段のシステム群 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {[
              { name: "Input System", desc: "キーボード / マウス入力", color: "bg-violet-500/10 border-violet-500" },
              { name: "Physics", desc: "推力・揚力・重力・抗力", color: "bg-blue-500/10 border-blue-500" },
              { name: "Scene Graph", desc: "3D オブジェクト管理", color: "bg-emerald-500/10 border-emerald-500" },
              { name: "Camera", desc: "追従カメラ・視点切替", color: "bg-amber-500/10 border-amber-500" },
              { name: "Collision", desc: "当たり判定", color: "bg-rose-500/10 border-rose-500" },
              { name: "HUD / UI", desc: "速度・高度・スコア表示", color: "bg-cyan-500/10 border-cyan-500" },
            ].map((system) => (
              <div
                key={system.name}
                className={`${system.color} border rounded-lg p-2.5 text-center`}
              >
                <div className="font-semibold text-foreground text-xs">{system.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{system.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground">&#8595;</div>
          {/* レンダリング */}
          <div className="w-full max-w-md bg-slate-500/10 border-2 border-slate-500 rounded-lg p-3 text-center">
            <div className="font-bold text-foreground text-sm">Renderer</div>
            <div className="text-xs text-muted-foreground">Three.js WebGLRenderer で画面に描画</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">ゲームループの基本構造</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        ゲームループはゲームの心臓部です。毎フレーム（約 60 回/秒）、
        入力の読み取り → 状態の更新 → 描画 というサイクルを繰り返します。
      </p>

      <CodeBlock
        language="typescript"
        title="ゲームループの基本構造"
        showLineNumbers
        code={`// ゲームの状態
const gameState = {
  aircraft: { position: new THREE.Vector3(), velocity: new THREE.Vector3() },
  score: 0,
  time: 0,
};

// 入力の状態（押されているキーを追跡）
const keys: Record<string, boolean> = {};
window.addEventListener('keydown', (e) => { keys[e.code] = true; });
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

// ゲームループ
let prevTime = performance.now();

function gameLoop() {
  requestAnimationFrame(gameLoop);

  const now = performance.now();
  const delta = (now - prevTime) / 1000; // 秒単位の経過時間
  prevTime = now;

  // 1. 入力処理
  handleInput(keys, delta);

  // 2. 物理更新（推力、揚力、重力、抗力）
  updatePhysics(gameState, delta);

  // 3. 当たり判定
  checkCollisions(gameState);

  // 4. カメラ更新
  updateCamera(gameState.aircraft, delta);

  // 5. HUD 更新
  updateHUD(gameState);

  // 6. レンダリング
  renderer.render(scene, camera);
}

gameLoop();`}
      />

      <div className="mt-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">飛行機プレビュー</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          完成イメージです。プリミティブ（円柱、箱、コーン）を組み合わせてスタイル化した飛行機が、
          円軌道上を飛行しています。マウスドラッグで視点を変更できます。
        </p>

        <ThreePreview
          height="400px"
          caption="プリミティブで構成した飛行機が円軌道を飛行するデモ"
          cameraPosition={[5, 4, 5]}
          cameraFov={50}
        >
          <FlyingAirplaneScene />
        </ThreePreview>
      </div>

      <h2 className="text-2xl font-bold mb-4">R3F でのゲームループ</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        React Three Fiber では、<code>useFrame</code> フックがゲームループの役割を果たします。
        Canvas 内のコンポーネントで <code>useFrame</code> を使うことで、
        毎フレームの更新ロジックを記述できます。
      </p>

      <CodeBlock
        language="tsx"
        title="R3F の useFrame でゲームループを実現"
        showLineNumbers
        code={`import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function Aircraft() {
  const groupRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3(0, 0, 0.1));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. 入力に基づいて速度を更新
    // （キー入力の処理は省略）

    // 2. 物理を適用
    velocity.current.y -= 9.8 * delta * 0.01; // 重力

    // 3. 位置を更新
    groupRef.current.position.add(
      velocity.current.clone().multiplyScalar(delta)
    );

    // 4. カメラ追従は別コンポーネントで処理
  });

  return (
    <group ref={groupRef}>
      {/* 飛行機のメッシュ */}
    </group>
  );
}`}
      />

      <div className="mt-8">
        <CodingChallenge
          title="ゲームループの基本を書こう"
          description="requestAnimationFrame でゲームループを作成し、キー入力の追跡と立方体の移動を実装してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.GridHelper(10, 10));

camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

// キー入力の追跡
const keys = {};
window.addEventListener('___', (e) => { keys[e.code] = true; });
window.addEventListener('___', (e) => { keys[e.code] = false; });

const speed = 2;

// ゲームループ
function gameLoop() {
  ___(gameLoop);

  // キー入力で移動
  if (keys['KeyW']) cube.position.z -= speed * 0.016;
  if (keys['KeyS']) cube.position.z += speed * 0.016;
  if (keys['KeyA']) cube.position.x -= speed * 0.016;
  if (keys['KeyD']) cube.position.x += speed * 0.016;

  renderer.render(scene, camera);
}
gameLoop();`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.GridHelper(10, 10));

camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const keys = {};
window.addEventListener('keydown', (e) => { keys[e.code] = true; });
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

const speed = 2;

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (keys['KeyW']) cube.position.z -= speed * 0.016;
  if (keys['KeyS']) cube.position.z += speed * 0.016;
  if (keys['KeyA']) cube.position.x -= speed * 0.016;
  if (keys['KeyD']) cube.position.x += speed * 0.016;

  renderer.render(scene, camera);
}
gameLoop();`}
          keywords={['keydown', 'keyup', 'requestAnimationFrame(']}
          hints={[
            "キーが押された時は 'keydown' イベント、離された時は 'keyup' イベント",
            'requestAnimationFrame(gameLoop) で次フレームを予約します',
            'keys オブジェクトにキー状態を記録して毎フレーム参照します',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="開発編で作る 6 つのステップ">
          <p className="mb-2">
            このセクションでは、以下の 6 ステップで飛行シミュレーションゲームを完成させます。
          </p>
          <ol className="list-decimal list-inside space-y-1">
            <li><strong>ゲーム設計の全体像</strong>（このページ） - アーキテクチャとゲームループ</li>
            <li><strong>飛行機モデルと操作</strong> - プリミティブで飛行機を作り、キーボード操作を実装</li>
            <li><strong>地形と空の環境</strong> - 手続き的な地形生成と空の表現</li>
            <li><strong>飛行物理シミュレーション</strong> - 推力・揚力・重力・抗力の実装</li>
            <li><strong>カメラ追従と視点切替</strong> - 三人称・コックピット・シネマティック視点</li>
            <li><strong>HUD・スコア・ゲームループ</strong> - UI オーバーレイとゲーム完成</li>
          </ol>
        </InfoBox>
      </div>

      <div className="mt-6">
        <InfoBox type="warning" title="前提知識">
          <p>
            開発編では、基礎編・応用編・実践編（特に R3F 入門と drei ヘルパー）で
            学んだ知識を前提とします。まだ完了していない場合は、先にそちらを進めてください。
          </p>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
