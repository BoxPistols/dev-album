import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// 発光する球体
function GlowingSphere({ intensity }: { intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 + 1;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial
        color="#4F46E5"
        emissive="#4F46E5"
        emissiveIntensity={intensity}
        roughness={0.1}
        metalness={0.3}
      />
    </mesh>
  );
}

// 周囲の小さなオブジェクト
function SurroundingObjects() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[2, 0.3, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#7C3AED" roughness={0.5} />
      </mesh>
      <mesh position={[-2, 0.3, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#059669" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.3, 2]}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#DC2626" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.3, -2]}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#EA580C" roughness={0.4} />
      </mesh>
    </group>
  );
}

// Bloom エフェクト付きのシーン
function BloomScene({
  bloomIntensity,
  luminanceThreshold,
  emissiveIntensity,
}: {
  bloomIntensity: number;
  luminanceThreshold: number;
  emissiveIntensity: number;
}) {
  return (
    <>
      <GlowingSphere intensity={emissiveIntensity} />
      <SurroundingObjects />

      {/* 床 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>

      {/* ライト */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* ポストプロセシング */}
      <EffectComposer>
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function PostProcessingPage() {
  const [bloomIntensity, setBloomIntensity] = useState(1.5);
  const [luminanceThreshold, setLuminanceThreshold] = useState(0.6);

  return (
    <PageLayout>
      <h1 className="mb-6">ポストプロセシング入門</h1>

      <WhyNowBox tags={["EffectComposer", "Bloom", "ポストプロセシング"]}>
        <p>
          ポストプロセシングとは、3D シーンのレンダリング結果に対して
          画像処理のエフェクトを適用する技術です。
          映画のような光のにじみ（Bloom）、被写界深度、色調補正など、
          シーンの印象を大きく変えるビジュアルエフェクトを追加できます。
        </p>
        <p>
          ポストプロセシングは 3D コンテンツにプロフェッショナルな仕上がりを与えます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">EffectComposer の仕組み</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        ポストプロセシングは <code>EffectComposer</code> を使って実現します。
        通常のレンダリングでは直接画面に描画しますが、EffectComposer を使うと
        レンダリング結果を一度テクスチャに描画し、そのテクスチャにエフェクトを
        順番に適用してから画面に表示します。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">1. レンダーパス</h4>
          <p className="text-sm text-muted-foreground">
            通常の 3D シーンをテクスチャにレンダリングします。
            これがエフェクトチェーンの入力になります。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">2. エフェクトパス</h4>
          <p className="text-sm text-muted-foreground">
            Bloom、SSAO、色調補正などのエフェクトを
            順番に適用します。複数のエフェクトを連鎖できます。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">3. 最終出力</h4>
          <p className="text-sm text-muted-foreground">
            すべてのエフェクトが適用された結果が画面に表示されます。
            最後のパスがスクリーンへの出力を担当します。
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">Bloom エフェクト</h2>
        <p className="text-sm text-muted-foreground mb-4">
          スライダーで Bloom の強度と輝度閾値を調整できます。
          中央の球体が <code>emissive</code>（自己発光）マテリアルを使用しており、
          Bloom エフェクトによって光がにじんで見えます。
        </p>

        <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
          <ParameterSlider
            label="Bloom 強度"
            value={bloomIntensity}
            min={0}
            max={3}
            step={0.1}
            onChange={setBloomIntensity}
          />
          <ParameterSlider
            label="輝度閾値"
            value={luminanceThreshold}
            min={0}
            max={1}
            step={0.05}
            onChange={setLuminanceThreshold}
          />
        </div>

        <CodeWithPreview
          language="javascript"
          title="EffectComposer + Bloom の基本セットアップ"
          caption="Bloom エフェクトで発光する球体"
          cameraPosition={[4, 3, 4]}
          code={`import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

// EffectComposer を作成
const composer = new EffectComposer(renderer);

// 1. レンダーパス（シーンを描画）
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// 2. Bloom エフェクト
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,   // 強度 (intensity)
  0.4,   // 半径 (radius)
  0.85   // 閾値 (threshold)
);
composer.addPass(bloomPass);

// アニメーションループでは renderer.render() の代わりに使用
function animate() {
  requestAnimationFrame(animate);
  composer.render(); // renderer.render(scene, camera) ではなくこちら
}`}
        >
          <BloomScene
            bloomIntensity={bloomIntensity}
            luminanceThreshold={luminanceThreshold}
            emissiveIntensity={2}
          />
        </CodeWithPreview>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">R3F でのポストプロセシング</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          React Three Fiber では <code>@react-three/postprocessing</code> を使って、
          宣言的にポストプロセシングを追加できます。
        </p>

        <CodeBlock
          language="tsx"
          title="R3F + @react-three/postprocessing"
          showLineNumbers
          code={`import { EffectComposer, Bloom } from '@react-three/postprocessing';

function Scene() {
  return (
    <>
      {/* 発光する球体 */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#4F46E5"
          emissive="#4F46E5"       // 自己発光色
          emissiveIntensity={2}    // 発光の強さ
        />
      </mesh>

      {/* ポストプロセシング */}
      <EffectComposer>
        <Bloom
          intensity={1.5}            // Bloom の強度
          luminanceThreshold={0.6}    // 発光する輝度の閾値
          luminanceSmoothing={0.9}    // 閾値の滑らかさ
          mipmapBlur                  // 高品質なブラー
        />
      </EffectComposer>
    </>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">よく使うポストプロセシングエフェクト</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Bloom</h4>
            <p className="text-sm text-muted-foreground">
              明るい部分の光がにじんで広がるエフェクト。
              ネオンサインや発光するオブジェクトの表現に最適です。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">SSAO</h4>
            <p className="text-sm text-muted-foreground">
              Screen Space Ambient Occlusion。オブジェクトの隙間や角に
              自然な影を追加し、奥行き感を強調します。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Depth of Field</h4>
            <p className="text-sm text-muted-foreground">
              被写界深度。カメラのフォーカス距離に応じて、
              前景や背景をぼかし、映画のような表現ができます。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Vignette</h4>
            <p className="text-sm text-muted-foreground">
              画面の周辺部を暗くするエフェクト。
              視点を中央に集中させる演出効果があります。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="パフォーマンスへの影響">
          <p>
            ポストプロセシングは追加の描画パスを必要とするため、
            GPU 負荷が増加します。以下の点に注意しましょう。
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>エフェクトの数は必要最小限に抑える</li>
            <li>モバイルデバイスでは一部エフェクトを無効にすることを検討</li>
            <li>Bloom の半径（radius）を大きくしすぎると負荷が増える</li>
            <li>SSAO は特に重いので、品質設定を適切に調整する</li>
            <li>
              <code>@react-three/postprocessing</code> は複数エフェクトを
              1 つのシェーダーパスに統合するため、Three.js の生 EffectComposer より効率的
            </li>
          </ul>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="発光する球体を作ろう"
          description="emissive マテリアルを使って自己発光する球体を作成してください。Bloom エフェクトの素材になる発光オブジェクトです。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x202020));
scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

// 発光する球体を作成
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x4F46E5,
  ___: 0x4F46E5,         // 自己発光色
  ___: 2.0,              // 発光の強さ
  roughness: 0.1,
  metalness: 0.3,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 床を追加
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x1a1a2e })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
scene.add(floor);

camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x202020));
scene.add(new THREE.DirectionalLight(0xffffff, 0.5));

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x4F46E5,
  emissive: 0x4F46E5,
  emissiveIntensity: 2.0,
  roughness: 0.1,
  metalness: 0.3,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x1a1a2e })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
scene.add(floor);

camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          keywords={['emissive', 'emissiveIntensity']}
          hints={[
            'emissive プロパティで自己発光色を設定します',
            'emissiveIntensity で発光の強さを制御します（1以上で明るく光る）',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>ポストプロセシングはレンダリング結果に画像エフェクトを適用する技術</li>
            <li>EffectComposer でエフェクトをチェーン（連鎖）して適用する</li>
            <li>Bloom は明るい部分を光らせる最もよく使われるエフェクト</li>
            <li>emissive マテリアルと組み合わせて発光表現を作る</li>
            <li>エフェクト数とパラメータを適切に設定してパフォーマンスを維持</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
