import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

// メインのジオメトリ：浮遊する正二十面体
function FloatingIcosahedron() {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshWobbleMaterial
          color="#7C3AED"
          factor={0.4}
          speed={1.5}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
}

// 浮遊する小さな球体群
function FloatingSpheres() {
  const spheres = useMemo(() => {
    const items: {
      position: [number, number, number];
      color: string;
      scale: number;
      speed: number;
      floatIntensity: number;
    }[] = [
      { position: [3, 1.5, -1], color: "#EC4899", scale: 0.2, speed: 2, floatIntensity: 1.2 },
      { position: [-2.5, 0.8, 1.5], color: "#06B6D4", scale: 0.15, speed: 1.8, floatIntensity: 1.0 },
      { position: [1.5, -0.5, 2.5], color: "#F59E0B", scale: 0.25, speed: 1.5, floatIntensity: 1.5 },
      { position: [-3, 2, -2], color: "#10B981", scale: 0.18, speed: 2.2, floatIntensity: 0.8 },
      { position: [2.5, -1, -2.5], color: "#F43F5E", scale: 0.22, speed: 1.3, floatIntensity: 1.3 },
      { position: [-1.5, 2.5, 0.5], color: "#8B5CF6", scale: 0.12, speed: 2.5, floatIntensity: 1.1 },
      { position: [0.5, -1.5, 3], color: "#14B8A6", scale: 0.16, speed: 1.7, floatIntensity: 0.9 },
      { position: [-3.5, -0.5, -1], color: "#FB923C", scale: 0.2, speed: 2.0, floatIntensity: 1.4 },
    ];
    return items;
  }, []);

  return (
    <group>
      {spheres.map((sphere, i) => (
        <Float
          key={i}
          speed={sphere.speed}
          floatIntensity={sphere.floatIntensity}
          rotationIntensity={0.3}
        >
          <mesh position={sphere.position} scale={sphere.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={sphere.color}
              emissive={sphere.color}
              emissiveIntensity={0.4}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// グリッド床面
function GroundGrid() {
  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[20, 20, "#4338CA", "#312E81"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0F0D1A"
          transparent
          opacity={0.8}
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}

// 回転するリングの装飾
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#6366F1"
        emissive="#6366F1"
        emissiveIntensity={0.5}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// ポートフォリオシーン全体
function PortfolioScene() {
  return (
    <>
      <FloatingIcosahedron />
      <FloatingSpheres />
      <OrbitRing />
      <GroundGrid />

      {/* ライティング */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#F8FAFC" />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#93C5FD" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#A78BFA" />
    </>
  );
}

export default function PortfolioScenePage() {
  return (
    <PageLayout>
      <h1 className="mb-6">ポートフォリオ 3D シーン作成</h1>

      <WhyNowBox tags={["ポートフォリオ", "総合演習", "デプロイ"]}>
        <p>
          ここまで学んできた Three.js と R3F の知識を集約して、
          実際にポートフォリオサイトに組み込める 3D シーンを作成します。
        </p>
        <p>
          幾何学的な形状、浮遊アニメーション、カスタムマテリアル、ライティングを
          組み合わせて、プロフェッショナルな見た目のインタラクティブシーンを完成させましょう。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">完成シーンのプレビュー</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        以下のシーンには、これまでのセクションで学んだ要素がすべて含まれています。
        マウスドラッグで視点を変更してみましょう。
      </p>

      <ThreePreview
        height="500px"
        caption="ポートフォリオ 3D シーン - 浮遊する正二十面体とパーティクル"
        cameraPosition={[5, 3, 5]}
        cameraFov={45}
      >
        <PortfolioScene />
      </ThreePreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">シーンの構成要素</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">FloatingIcosahedron</h4>
            <p className="text-sm text-muted-foreground">
              Float + MeshWobbleMaterial を使った正二十面体。
              ゆらゆら揺れながら浮遊するメインオブジェクト。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">FloatingSpheres</h4>
            <p className="text-sm text-muted-foreground">
              複数の小さな球体を Float でそれぞれ独立して浮遊させます。
              emissive で軽く発光させています。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">OrbitRing</h4>
            <p className="text-sm text-muted-foreground">
              useFrame で回転する細いリング。
              emissive で光る軌道リングの表現です。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">GroundGrid</h4>
            <p className="text-sm text-muted-foreground">
              gridHelper と半透明の平面を組み合わせた床面。
              SF 的な雰囲気を演出します。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">完全なソースコード</h2>

        <CodeBlock
          language="tsx"
          title="PortfolioScene.tsx - 完全な R3F コンポーネント"
          showLineNumbers
          code={`"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

// メインオブジェクト：浮遊する正二十面体
function FloatingIcosahedron() {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshWobbleMaterial
          color="#7C3AED"
          factor={0.4}
          speed={1.5}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
}

// 周囲の浮遊する球体
function FloatingSpheres() {
  const spheres = useMemo(() => [
    { position: [3, 1.5, -1] as const, color: "#EC4899", scale: 0.2, speed: 2 },
    { position: [-2.5, 0.8, 1.5] as const, color: "#06B6D4", scale: 0.15, speed: 1.8 },
    { position: [1.5, -0.5, 2.5] as const, color: "#F59E0B", scale: 0.25, speed: 1.5 },
    { position: [-3, 2, -2] as const, color: "#10B981", scale: 0.18, speed: 2.2 },
    { position: [2.5, -1, -2.5] as const, color: "#F43F5E", scale: 0.22, speed: 1.3 },
    { position: [-1.5, 2.5, 0.5] as const, color: "#8B5CF6", scale: 0.12, speed: 2.5 },
    { position: [0.5, -1.5, 3] as const, color: "#14B8A6", scale: 0.16, speed: 1.7 },
    { position: [-3.5, -0.5, -1] as const, color: "#FB923C", scale: 0.2, speed: 2.0 },
  ], []);

  return (
    <group>
      {spheres.map((s, i) => (
        <Float key={i} speed={s.speed} floatIntensity={1}>
          <mesh position={[...s.position]} scale={s.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// 回転するリング
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.2;
      ringRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#6366F1"
        emissive="#6366F1"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// グリッド床面
function GroundGrid() {
  return (
    <group position={[0, -2, 0]}>
      <gridHelper args={[20, 20, "#4338CA", "#312E81"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#0F0D1A"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// メインコンポーネント
export default function PortfolioScene() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [5, 3, 5], fov: 45 }}>
        <FloatingIcosahedron />
        <FloatingSpheres />
        <OrbitRing />
        <GroundGrid />

        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#93C5FD" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#A78BFA" />

        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">使用している技術の整理</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">技術</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">使い方</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">学習セクション</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>Canvas</code></td>
                <td className="py-3 px-4">シーン全体のラッパー</td>
                <td className="py-3 px-4">R3F 入門</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>useFrame</code></td>
                <td className="py-3 px-4">リングの回転アニメーション</td>
                <td className="py-3 px-4">R3F 入門</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>Float</code></td>
                <td className="py-3 px-4">正二十面体・球体の浮遊</td>
                <td className="py-3 px-4">drei ヘルパー</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>MeshWobbleMaterial</code></td>
                <td className="py-3 px-4">正二十面体のゆらゆら効果</td>
                <td className="py-3 px-4">drei ヘルパー</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>OrbitControls</code></td>
                <td className="py-3 px-4">マウスによるカメラ操作</td>
                <td className="py-3 px-4">OrbitControls</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code>emissive</code></td>
                <td className="py-3 px-4">球体の自己発光</td>
                <td className="py-3 px-4">マテリアル / ライト</td>
              </tr>
              <tr>
                <td className="py-3 px-4"><code>gridHelper</code></td>
                <td className="py-3 px-4">床面のグリッド表示</td>
                <td className="py-3 px-4">シーン構築</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="次のステップ：デプロイと活用">
          <p className="mb-2">
            完成した 3D シーンをポートフォリオに組み込みましょう。
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Vercel にデプロイ: <code>npx vercel</code> で即座に公開可能</li>
            <li>既存のポートフォリオサイトに埋め込み: Canvas コンポーネントを配置するだけ</li>
            <li>背景として使用: <code>position: fixed</code> でフルスクリーン背景に</li>
            <li>スクロール連動: <code>@react-three/drei</code> の <code>ScrollControls</code> で実現</li>
            <li>モデルの追加: GLTF モデルを読み込んでシーンに配置</li>
          </ul>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="ポートフォリオ用シーンの基盤を作ろう"
          description="グリッド床面、複数ライト、正二十面体を配置したシーンの基盤を作成してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// メインオブジェクト: 正二十面体
const geometry = new THREE.___(1.2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x7C3AED,
  roughness: 0.15,
  metalness: 0.85,
});
const ico = new THREE.Mesh(geometry, material);
scene.add(ico);

// グリッドヘルパーを追加
const grid = new THREE.___Helper(20, 20, 0x4338CA, 0x312E81);
grid.position.y = -2;
scene.add(grid);

// ライティング（3つのライトで立体感を出す）
scene.add(new THREE.AmbientLight(0xffffff, ___));
const mainLight = new THREE.DirectionalLight(0xF8FAFC, 0.8);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);
const fillLight = new THREE.DirectionalLight(0x93C5FD, 0.3);
fillLight.position.set(-3, 3, -3);
scene.add(fillLight);

camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1.2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x7C3AED,
  roughness: 0.15,
  metalness: 0.85,
});
const ico = new THREE.Mesh(geometry, material);
scene.add(ico);

const grid = new THREE.GridHelper(20, 20, 0x4338CA, 0x312E81);
grid.position.y = -2;
scene.add(grid);

scene.add(new THREE.AmbientLight(0xffffff, 0.3));
const mainLight = new THREE.DirectionalLight(0xF8FAFC, 0.8);
mainLight.position.set(5, 5, 5);
scene.add(mainLight);
const fillLight = new THREE.DirectionalLight(0x93C5FD, 0.3);
fillLight.position.set(-3, 3, -3);
scene.add(fillLight);

camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          keywords={['IcosahedronGeometry(', 'GridHelper(', 'AmbientLight(']}
          hints={[
            '正二十面体は IcosahedronGeometry(半径, detail) で作成',
            'グリッドは GridHelper(サイズ, 分割数, 色1, 色2) で作成',
            'AmbientLight の第2引数は強度です（0.3 程度が適切）',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="本番環境でのパフォーマンス最適化">
          <p className="mb-2">
            3D コンテンツを本番サイトに組み込む際は、以下の点に注意しましょう。
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>ジオメトリの頂点数を抑える</strong> -
              モバイルでは特に重要。<code>args</code> のセグメント数を減らす
            </li>
            <li>
              <strong>DPR（Device Pixel Ratio）を制限する</strong> -
              <code>&lt;Canvas dpr={`{[1, 1.5]}`}&gt;</code> で高解像度ディスプレイの負荷を抑制
            </li>
            <li>
              <strong>不要な re-render を防ぐ</strong> -
              <code>useMemo</code>、<code>React.memo</code> を活用
            </li>
            <li>
              <strong>モバイル判定で簡易版に切り替え</strong> -
              オブジェクト数やエフェクトを削減するレスポンシブ対応
            </li>
            <li>
              <strong>Suspense でローディング管理</strong> -
              テクスチャやモデルの読み込み中にフォールバックを表示
            </li>
            <li>
              <strong>frameloop を制御</strong> -
              <code>&lt;Canvas frameloop=&quot;demand&quot;&gt;</code> で必要時のみレンダリング
            </li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
