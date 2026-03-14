import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// 飛行機モデル（プリミティブで構成）
function AirplaneModel({
  pitchAngle,
  rollAngle,
}: {
  pitchAngle: number;
  rollAngle: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // スライダーで指定されたピッチとロールを適用
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pitchAngle,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      rollAngle,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* 胴体 - 横向きのシリンダー */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.12, 1.6, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 主翼 - 左右に広がる薄い板 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 0.04, 0.45]} />
        <meshStandardMaterial color="#818CF8" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* 水平尾翼 */}
      <mesh position={[0, 0, -0.7]}>
        <boxGeometry args={[0.8, 0.03, 0.22]} />
        <meshStandardMaterial color="#818CF8" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* 垂直尾翼 */}
      <mesh position={[0, 0.18, -0.65]}>
        <boxGeometry args={[0.03, 0.35, 0.25]} />
        <meshStandardMaterial color="#6366F1" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* ノーズコーン */}
      <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.13, 0.35, 8]} />
        <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* エンジン左 */}
      <mesh position={[-0.5, -0.05, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 6]} />
        <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* エンジン右 */}
      <mesh position={[0.5, -0.05, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.3, 6]} />
        <meshStandardMaterial color="#374151" roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

// プレビューシーン
function AircraftPreviewScene({
  pitchAngle,
  rollAngle,
}: {
  pitchAngle: number;
  rollAngle: number;
}) {
  return (
    <>
      <AirplaneModel pitchAngle={pitchAngle} rollAngle={rollAngle} />
      {/* グリッド */}
      <gridHelper args={[8, 8, "#334155", "#1E293B"]} position={[0, -1.5, 0]} />
      {/* ライティング */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#93C5FD" />
    </>
  );
}

export default function AircraftPage() {
  const [pitchSpeed, setPitchSpeed] = useState(2.0);
  const [rollSpeed, setRollSpeed] = useState(2.0);
  const [moveSpeed, setMoveSpeed] = useState(5.0);

  // スライダーの値からプレビュー用の角度を計算
  // ピッチ: 速度が高いほど機首が上がる表現
  const pitchAngle = (pitchSpeed - 2.5) * 0.2;
  // ロール: 速度に応じた傾き表現
  const rollAngle = (rollSpeed - 2.5) * 0.2;

  return (
    <PageLayout>
      <h1 className="mb-6">飛行機モデルと操作</h1>

      <WhyNowBox tags={["モデリング", "キーボード操作", "プリミティブ"]}>
        <p>
          プレイヤーが操作する飛行機はゲームの主役です。
          高度なモデリングツールを使わなくても、基本的なプリミティブ（箱、円柱、コーン）を
          組み合わせることで、十分にそれらしい飛行機モデルを作ることができます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">飛行機の構造</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        飛行機モデルは以下のパーツで構成します。すべて R3F の基本ジオメトリで作成できます。
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {[
          { name: "胴体", geo: "CylinderGeometry", desc: "横向きに配置した円柱" },
          { name: "主翼", geo: "BoxGeometry", desc: "薄くて幅の広い箱" },
          { name: "尾翼（水平）", geo: "BoxGeometry", desc: "小さめの薄い箱" },
          { name: "尾翼（垂直）", geo: "BoxGeometry", desc: "縦向きの薄い箱" },
          { name: "ノーズ", geo: "ConeGeometry", desc: "前方に配置したコーン" },
          { name: "エンジン", geo: "CylinderGeometry", desc: "主翼下の小さな円柱" },
        ].map((part) => (
          <div key={part.name} className="bg-card border border-border rounded-lg p-3">
            <h4 className="font-semibold text-primary text-sm">{part.name}</h4>
            <p className="text-xs text-muted-foreground mt-1">
              <code>{part.geo}</code>
            </p>
            <p className="text-xs text-muted-foreground">{part.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">飛行機モデルのプレビュー</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        スライダーでピッチ速度・ロール速度・移動速度を調整してみましょう。
        ピッチとロールの値に応じて、飛行機の姿勢が変化します。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="ピッチ速度"
          value={pitchSpeed}
          min={0.5}
          max={5}
          step={0.1}
          onChange={setPitchSpeed}
        />
        <ParameterSlider
          label="ロール速度"
          value={rollSpeed}
          min={0.5}
          max={5}
          step={0.1}
          onChange={setRollSpeed}
        />
        <ParameterSlider
          label="移動速度"
          value={moveSpeed}
          min={1}
          max={10}
          step={0.5}
          onChange={setMoveSpeed}
          unit="m/s"
        />
      </div>

      <CodeWithPreview
        language="tsx"
        title="キーボード入力の管理パターン"
        caption={`ピッチ: ${pitchSpeed.toFixed(1)} / ロール: ${rollSpeed.toFixed(1)} / 速度: ${moveSpeed.toFixed(1)}m/s`}
        cameraPosition={[3, 2, 3]}
        code={`import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function AircraftController() {
  // キー入力の状態を useRef で管理（再レンダリングを避ける）
  const keys = useRef<Record<string, boolean>>({});

  // キーイベントのリスナーを登録
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // クリーンアップ
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const k = keys.current;
    const pitchSpeed = 2.0;
    const rollSpeed = 2.0;
    const moveSpeed = 5.0;

    // W/S キー: ピッチ（機首の上下）
    if (k["KeyW"]) pitch -= pitchSpeed * delta;
    if (k["KeyS"]) pitch += pitchSpeed * delta;

    // A/D キー: ロール（左右の傾き）
    if (k["KeyA"]) roll += rollSpeed * delta;
    if (k["KeyD"]) roll -= rollSpeed * delta;

    // Space / Shift: 加速・減速
    if (k["Space"]) speed += moveSpeed * delta;
    if (k["ShiftLeft"]) speed -= moveSpeed * delta;

    // 飛行機の姿勢と位置を更新
    updateAircraftTransform(pitch, roll, speed, delta);
  });

  return <AirplaneModel />;
}`}
      >
        <AircraftPreviewScene pitchAngle={pitchAngle} rollAngle={rollAngle} />
      </CodeWithPreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">キーマッピング</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">キー</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">アクション</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">e.code</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-2 px-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">W</kbd></td>
                <td className="py-2 px-4">機首を上げる（ピッチアップ）</td>
                <td className="py-2 px-4"><code>KeyW</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">S</kbd></td>
                <td className="py-2 px-4">機首を下げる（ピッチダウン）</td>
                <td className="py-2 px-4"><code>KeyS</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">A</kbd></td>
                <td className="py-2 px-4">左に傾ける（ロール左）</td>
                <td className="py-2 px-4"><code>KeyA</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">D</kbd></td>
                <td className="py-2 px-4">右に傾ける（ロール右）</td>
                <td className="py-2 px-4"><code>KeyD</code></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-2 px-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Space</kbd></td>
                <td className="py-2 px-4">加速</td>
                <td className="py-2 px-4"><code>Space</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Shift</kbd></td>
                <td className="py-2 px-4">減速</td>
                <td className="py-2 px-4"><code>ShiftLeft</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="プリミティブで飛行機を組み立てよう"
          description="円柱（胴体）、箱（主翼）、コーン（ノーズ）を組み合わせて簡易飛行機モデルを作成してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// 胴体 - 横向きの円柱
const bodyGeo = new THREE.___(0.15, 0.12, 1.4, 8);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.rotation.z = Math.PI / 2;
scene.add(body);

// 主翼 - 薄い箱
const wingGeo = new THREE.___(2.0, 0.04, 0.4);
const wingMat = new THREE.MeshStandardMaterial({ color: 0x818CF8 });
const wing = new THREE.Mesh(wingGeo, wingMat);
scene.add(wing);

// ノーズコーン
const noseGeo = new THREE.___(0.12, 0.3, 8);
const noseMat = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const nose = new THREE.Mesh(noseGeo, noseMat);
nose.position.set(0, 0, 0.8);
nose.rotation.x = Math.PI / 2;
scene.add(nose);

scene.add(new THREE.GridHelper(8, 8));

camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x404040));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const bodyGeo = new THREE.CylinderGeometry(0.15, 0.12, 1.4, 8);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
body.rotation.z = Math.PI / 2;
scene.add(body);

const wingGeo = new THREE.BoxGeometry(2.0, 0.04, 0.4);
const wingMat = new THREE.MeshStandardMaterial({ color: 0x818CF8 });
const wing = new THREE.Mesh(wingGeo, wingMat);
scene.add(wing);

const noseGeo = new THREE.ConeGeometry(0.12, 0.3, 8);
const noseMat = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });
const nose = new THREE.Mesh(noseGeo, noseMat);
nose.position.set(0, 0, 0.8);
nose.rotation.x = Math.PI / 2;
scene.add(nose);

scene.add(new THREE.GridHelper(8, 8));

camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          keywords={['CylinderGeometry(', 'BoxGeometry(', 'ConeGeometry(']}
          hints={[
            '胴体は CylinderGeometry(上半径, 下半径, 高さ, セグメント) で作成',
            '主翼は BoxGeometry(幅, 高さ, 奥行き) で薄い板状に',
            'ノーズは ConeGeometry(半径, 高さ, セグメント) で作成',
          ]}
          preview
        />
      </div>

      <div className="mt-6">
        <InfoBox type="info" title="キーマッピングのベストプラクティス">
          <ul className="list-disc list-inside space-y-1">
            <li>
              <code>e.key</code> ではなく <code>e.code</code> を使う
              - キーボード配列（QWERTY / AZERTY 等）に依存しない
            </li>
            <li>
              キー状態は <code>useRef</code> で管理する
              - <code>useState</code> だと毎フレーム再レンダリングが発生して重くなる
            </li>
            <li>
              <code>useEffect</code> のクリーンアップでリスナーを必ず解除する
              - メモリリーク防止
            </li>
            <li>
              複数キー同時押しに対応する - 配列やオブジェクトで全キーの状態を追跡
            </li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
