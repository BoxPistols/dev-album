import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

// 飛行機モデル（プリミティブ）
function AirplaneModel() {
  return (
    <group>
      {/* 胴体 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.08, 1.0, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* 主翼 */}
      <mesh>
        <boxGeometry args={[1.5, 0.03, 0.3]} />
        <meshStandardMaterial color="#818CF8" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 尾翼（水平） */}
      <mesh position={[0, 0, -0.45]}>
        <boxGeometry args={[0.5, 0.02, 0.15]} />
        <meshStandardMaterial color="#818CF8" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* 尾翼（垂直） */}
      <mesh position={[0, 0.1, -0.4]}>
        <boxGeometry args={[0.02, 0.22, 0.15]} />
        <meshStandardMaterial color="#6366F1" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* ノーズ */}
      <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

// チェックポイントリング
function Checkpoint({
  position,
  passed,
}: {
  position: [number, number, number];
  passed: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[0.8, 0.06, 8, 32]} />
      <meshStandardMaterial
        color={passed ? "#10B981" : "#F59E0B"}
        emissive={passed ? "#10B981" : "#F59E0B"}
        emissiveIntensity={passed ? 0.5 : 0.3}
      />
    </mesh>
  );
}

// ミニゲームシーン（飛行機が自動飛行してチェックポイントを通過）
function MiniGameScene({
  onUpdateHud,
}: {
  onUpdateHud: (data: { speed: number; altitude: number; score: number; checkpoints: boolean[] }) => void;
}) {
  const aircraftRef = useRef<THREE.Group>(null);
  const checkpointsPassed = useRef([false, false, false, false, false]);
  const scoreRef = useRef(0);

  // チェックポイントの位置
  const checkpoints = useMemo<[number, number, number][]>(
    () => [
      [4, 2.5, 0],
      [0, 3.5, 4],
      [-4, 2.0, 0],
      [0, 3.0, -4],
      [3, 4.0, 3],
    ],
    []
  );

  useFrame((state) => {
    if (!aircraftRef.current) return;

    const t = state.clock.elapsedTime * 0.35;
    const radius = 4.5;

    // 飛行機の位置（８の字に近い軌道）
    const x = Math.cos(t) * radius;
    const z = Math.sin(t * 2) * radius * 0.5;
    const y = 2.5 + Math.sin(t * 1.5) * 1.5;

    aircraftRef.current.position.set(x, y, z);

    // 進行方向を向く
    const nextT = t + 0.02;
    const nextX = Math.cos(nextT) * radius;
    const nextZ = Math.sin(nextT * 2) * radius * 0.5;
    const nextY = 2.5 + Math.sin(nextT * 1.5) * 1.5;
    aircraftRef.current.lookAt(nextX, nextY, nextZ);

    // チェックポイント通過判定
    checkpoints.forEach((cp, i) => {
      if (checkpointsPassed.current[i]) return;
      const dx = x - cp[0];
      const dy = y - cp[1];
      const dz = z - cp[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 1.2) {
        checkpointsPassed.current[i] = true;
        scoreRef.current += 100;
      }
    });

    // すべて通過したらリセット
    if (checkpointsPassed.current.every(Boolean)) {
      checkpointsPassed.current = [false, false, false, false, false];
    }

    // HUD データを親に送信
    const speed = Math.sqrt(
      Math.pow(Math.cos(t) * radius * -0.35, 2) +
      Math.pow(Math.sin(t * 1.5) * 1.5 * 1.5, 2) +
      Math.pow(Math.cos(t * 2) * radius * 0.5 * 0.7, 2)
    );
    onUpdateHud({
      speed: speed * 50,
      altitude: y * 100,
      score: scoreRef.current,
      checkpoints: [...checkpointsPassed.current],
    });
  });

  return (
    <>
      {/* 飛行機 */}
      <group ref={aircraftRef}>
        <AirplaneModel />
      </group>

      {/* チェックポイント */}
      {checkpoints.map((pos, i) => (
        <Checkpoint
          key={i}
          position={pos}
          passed={false}
        />
      ))}

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a472a" roughness={0.9} />
      </mesh>
      <gridHelper args={[30, 30, "#2D5A27", "#1E3A1E"]} position={[0, -0.49, 0]} />

      {/* 空 */}
      <mesh>
        <sphereGeometry args={[40, 16, 8]} />
        <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
      </mesh>

      {/* ライティング */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={0.8} color="#FFF8E1" />
      <fog attach="fog" args={["#87CEEB", 15, 35]} />
    </>
  );
}

// HUD オーバーレイ（Canvas の上に重ねる DOM 要素）
function HudOverlay({
  speed,
  altitude,
  score,
}: {
  speed: number;
  altitude: number;
  score: number;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 左上: 速度 */}
      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider">
          Speed
        </div>
        <div className="text-lg font-bold text-white font-mono">
          {Math.round(speed)}
          <span className="text-xs text-gray-400 ml-1">km/h</span>
        </div>
      </div>

      {/* 右上: 高度 */}
      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
        <div className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">
          Altitude
        </div>
        <div className="text-lg font-bold text-white font-mono">
          {Math.round(altitude)}
          <span className="text-xs text-gray-400 ml-1">m</span>
        </div>
      </div>

      {/* 下部中央: スコア */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
        <div className="text-[10px] text-amber-400 font-medium uppercase tracking-wider text-center">
          Score
        </div>
        <div className="text-xl font-bold text-white font-mono text-center">
          {score.toLocaleString()}
        </div>
      </div>

      {/* 中央のクロスヘア */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/30" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

export default function HudGameloopPage() {
  const [hudData, setHudData] = useState({
    speed: 0,
    altitude: 0,
    score: 0,
    checkpoints: [false, false, false, false, false],
  });

  return (
    <PageLayout>
      <h1 className="mb-6">HUD・スコア・ゲームループ</h1>

      <WhyNowBox tags={["HUD", "ゲームロジック", "当たり判定", "完成"]}>
        <p>
          ゲームを完成させる最後のピースです。
          HUD（Head-Up Display）でプレイヤーに情報を伝え、
          チェックポイントとスコアでゲーム性を加えます。
        </p>
        <p>
          これまで作ってきたすべての要素を統合して、
          実際にプレイできるミニゲームに仕上げましょう。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">HUD（Head-Up Display）</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        HUD は 3D シーンの上に重ねて表示する 2D のインターフェースです。
        速度、高度、スコアなどのゲーム情報をリアルタイムで表示します。
        R3F では Canvas の上に <code>position: absolute</code> の DOM 要素を重ねるか、
        drei の <code>Html</code> コンポーネントを使います。
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { name: "速度計", desc: "現在の飛行速度 (km/h)", color: "text-emerald-500" },
          { name: "高度計", desc: "地面からの高さ (m)", color: "text-blue-500" },
          { name: "スコア", desc: "チェックポイント通過で加算", color: "text-amber-500" },
          { name: "タイマー", desc: "経過時間 / 制限時間", color: "text-rose-500" },
        ].map((item) => (
          <div key={item.name} className="bg-card border border-border rounded-lg p-3 text-center">
            <h4 className={`font-bold text-sm ${item.color}`}>{item.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">ミニゲーム プレビュー</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        飛行機が自動飛行しながらチェックポイント（黄色のリング）を通過するデモです。
        HUD オーバーレイで速度・高度・スコアがリアルタイムに表示されます。
      </p>

      {/* 3D プレビュー + HUD オーバーレイ */}
      <div className="relative rounded-lg border border-border overflow-hidden bg-slate-900">
        <div style={{ height: "500px" }}>
          <ThreePreview
            height="500px"
            cameraPosition={[8, 6, 8]}
            cameraFov={55}
          >
            <MiniGameScene onUpdateHud={setHudData} />
          </ThreePreview>
        </div>
        {/* HUD を Canvas の上に重ねる */}
        <HudOverlay
          speed={hudData.speed}
          altitude={hudData.altitude}
          score={hudData.score}
        />
      </div>
      <div className="px-4 py-2 text-xs text-slate-400 bg-slate-800 border-t border-slate-700 rounded-b-lg">
        ミニゲームデモ - 飛行機が自動飛行しチェックポイントを通過。HUD がリアルタイム更新
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">ゲーム状態の管理</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          ゲームの状態は <code>useRef</code> と <code>useState</code> を使い分けて管理します。
          毎フレーム更新される物理データは <code>useRef</code>、
          UI に反映するデータは <code>useState</code> が適切です。
        </p>

        <CodeBlock
          language="tsx"
          title="ゲーム状態管理"
          showLineNumbers
          code={`import { useRef, useState, useCallback } from "react";

// ゲームの全体状態
interface GameState {
  phase: "menu" | "playing" | "paused" | "gameover";
  score: number;
  time: number;
  checkpoints: boolean[];
}

function useGameState() {
  // UI に表示する値は useState
  const [phase, setPhase] = useState<GameState["phase"]>("menu");
  const [score, setScore] = useState(0);
  const [displayTime, setDisplayTime] = useState(0);

  // 毎フレーム更新する値は useRef（再レンダリングを避ける）
  const timeRef = useRef(0);
  const checkpointsRef = useRef<boolean[]>([]);

  // スコア加算（UI 更新あり）
  const addScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  // 時間更新（毎フレーム、UI 更新は間引く）
  const frameCountRef = useRef(0);
  const updateTime = useCallback((delta: number) => {
    timeRef.current += delta;
    frameCountRef.current++;
    // 10フレームに1回だけ setState（パフォーマンス最適化）
    if (frameCountRef.current % 10 === 0) {
      setDisplayTime(timeRef.current);
    }
  }, []);

  // ゲーム開始
  const startGame = useCallback(() => {
    setPhase("playing");
    setScore(0);
    timeRef.current = 0;
    setDisplayTime(0);
    checkpointsRef.current = new Array(5).fill(false);
  }, []);

  return {
    phase, score, displayTime,
    setPhase, addScore, updateTime, startGame,
    timeRef, checkpointsRef,
  };
}`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">チェックポイント当たり判定</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          飛行機がリングを通過したかどうかは、距離ベースのシンプルな当たり判定で実装します。
          飛行機の位置とチェックポイントの中心間の距離が閾値以下であれば「通過」と判定します。
        </p>

        <CodeBlock
          language="tsx"
          title="チェックポイント当たり判定"
          showLineNumbers
          code={`interface Checkpoint {
  position: THREE.Vector3;
  radius: number;   // リングの半径
  passed: boolean;
}

function checkCheckpoints(
  aircraftPosition: THREE.Vector3,
  checkpoints: Checkpoint[],
  onPass: (index: number) => void
) {
  checkpoints.forEach((cp, index) => {
    if (cp.passed) return; // 通過済みはスキップ

    // 飛行機とチェックポイント中心の距離
    const distance = aircraftPosition.distanceTo(cp.position);

    // リング半径より近ければ通過と判定
    if (distance < cp.radius * 1.5) {
      cp.passed = true;
      onPass(index);
    }
  });
}

// useFrame 内で毎フレーム判定
useFrame(() => {
  if (!aircraftRef.current) return;

  checkCheckpoints(
    aircraftRef.current.position,
    checkpointsRef.current,
    (index) => {
      // 通過時の処理
      addScore(100);
      playSound("checkpoint"); // 効果音
      showEffect(index);       // エフェクト表示
    }
  );
});`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">HUD の実装パターン</h2>

        <CodeBlock
          language="tsx"
          title="DOM オーバーレイ方式の HUD"
          showLineNumbers
          code={`// 方式 1: DOM オーバーレイ（推奨）
// Canvas の上に absolute 配置の DOM 要素を重ねる

function GameScreen() {
  const [hudData, setHudData] = useState({
    speed: 0, altitude: 0, score: 0,
  });

  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <Canvas camera={{ fov: 55 }}>
        <GameScene onHudUpdate={setHudData} />
      </Canvas>

      {/* HUD オーバーレイ（pointer-events-none で3Dの操作を邪魔しない） */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 速度計 - 左上 */}
        <div className="absolute top-4 left-4 bg-black/50 rounded-lg px-3 py-2">
          <div className="text-xs text-emerald-400">SPEED</div>
          <div className="text-2xl font-bold text-white font-mono">
            {Math.round(hudData.speed)} km/h
          </div>
        </div>

        {/* 高度計 - 右上 */}
        <div className="absolute top-4 right-4 bg-black/50 rounded-lg px-3 py-2">
          <div className="text-xs text-blue-400">ALT</div>
          <div className="text-2xl font-bold text-white font-mono">
            {Math.round(hudData.altitude)} m
          </div>
        </div>

        {/* スコア - 下部中央 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="text-3xl font-bold text-white">
            {hudData.score.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="距離ベースの当たり判定を実装しよう"
          description="2つのオブジェクト間の距離を計算し、チェックポイント通過判定を実装してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.GridHelper(10, 10));

// 移動するプレイヤー
const player = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x4F46E5 })
);
scene.add(player);

// チェックポイント（リング）
const checkpoint = new THREE.Mesh(
  new THREE.TorusGeometry(0.8, 0.05, 8, 32),
  new THREE.MeshStandardMaterial({ color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.3 })
);
checkpoint.position.set(3, 0.5, 0);
scene.add(checkpoint);

camera.position.set(5, 4, 5);
camera.lookAt(0, 0, 0);

let score = 0;
let passed = false;

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  // プレイヤーを移動
  player.position.x = Math.cos(t) * 3;
  player.position.z = Math.sin(t) * 3;
  player.position.y = 0.5;

  // 当たり判定: 2点間の距離を計算
  const dx = player.position.x - checkpoint.position.x;
  const dy = player.position.y - checkpoint.position.y;
  const dz = player.position.z - checkpoint.position.z;
  const distance = Math.___(dx * dx + dy * dy + dz * dz);

  // 距離が閾値以下なら通過
  if (!passed && distance < ___) {
    passed = true;
    score += 100;
    checkpoint.material.color.setHex(0x10B981);
    checkpoint.material.emissive.setHex(0x10B981);
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
scene.add(new THREE.GridHelper(10, 10));

const player = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x4F46E5 })
);
scene.add(player);

const checkpoint = new THREE.Mesh(
  new THREE.TorusGeometry(0.8, 0.05, 8, 32),
  new THREE.MeshStandardMaterial({ color: 0xF59E0B, emissive: 0xF59E0B, emissiveIntensity: 0.3 })
);
checkpoint.position.set(3, 0.5, 0);
scene.add(checkpoint);

camera.position.set(5, 4, 5);
camera.lookAt(0, 0, 0);

let score = 0;
let passed = false;

function animate() {
  requestAnimationFrame(animate);
  const t = performance.now() * 0.001;

  player.position.x = Math.cos(t) * 3;
  player.position.z = Math.sin(t) * 3;
  player.position.y = 0.5;

  const dx = player.position.x - checkpoint.position.x;
  const dy = player.position.y - checkpoint.position.y;
  const dz = player.position.z - checkpoint.position.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (!passed && distance < 1.2) {
    passed = true;
    score += 100;
    checkpoint.material.color.setHex(0x10B981);
    checkpoint.material.emissive.setHex(0x10B981);
  }

  renderer.render(scene, camera);
}
animate();`}
          keywords={['sqrt(', 'distance', '1.2']}
          hints={[
            'Math.sqrt() で平方根を計算して距離を求めます',
            '3D空間の距離 = sqrt(dx^2 + dy^2 + dz^2)',
            'チェックポイントのリング半径が0.8なので、閾値は1.2程度が適切',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="ゲーム完成 - 次のステップ">
          <p className="mb-2">
            おめでとうございます！ 飛行シミュレーションゲームの基本構造が完成しました。
            ここから、さらにゲームを発展させるアイデアをいくつか紹介します。
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>効果音の追加</strong> - Web Audio API や Howler.js を使って
              エンジン音やチェックポイント通過音を実装
            </li>
            <li>
              <strong>モバイル対応</strong> - デバイスの傾きセンサー（DeviceOrientation API）で
              スマートフォンを傾けて操作
            </li>
            <li>
              <strong>マルチプレイヤー</strong> - WebSocket（Socket.io）で他プレイヤーと
              同じ空を飛ぶ。位置同期の仕組みを学べる
            </li>
            <li>
              <strong>タイムアタック</strong> - 全チェックポイントをクリアするまでの
              タイムを競うモード
            </li>
            <li>
              <strong>天候システム</strong> - 風の影響、雨、霧などで
              フライトの難易度を変化させる
            </li>
            <li>
              <strong>Vercel にデプロイ</strong> - <code>npx vercel</code> で
              即座にオンラインで遊べるゲームとして公開可能
            </li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
