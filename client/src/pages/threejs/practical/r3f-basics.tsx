import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import CodingChallenge from "@/components/CodingChallenge";

// 回転するトーラスノット
function RotatingKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial color="#6366F1" roughness={0.3} metalness={0.6} />
    </mesh>
  );
}

export default function R3FBasicsPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">React Three Fiber 入門</h1>

      <WhyNowBox tags={["React Three Fiber", "宣言的 3D", "コンポーネント"]}>
        <p>
          React Three Fiber（R3F）は、Three.js を React のコンポーネントとして扱えるようにするライブラリです。
          命令的に書いていた Three.js のコードを、React の宣言的な書き方で記述できます。
        </p>
        <p>
          R3F の哲学は「Three.js のすべてを React コンポーネントとして表現する」こと。
          状態管理、ライフサイクル、コンポーネントの再利用といった React の強力な仕組みを
          そのまま 3D シーン構築に活かせます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">R3F の基本概念</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        R3F は Three.js のオブジェクトを JSX 要素として扱えるようにします。
        <code>&lt;Canvas&gt;</code> がレンダラーとシーンを自動生成し、
        その中に <code>&lt;mesh&gt;</code>、<code>&lt;boxGeometry&gt;</code>、
        <code>&lt;meshStandardMaterial&gt;</code> などを宣言的に配置できます。
        アニメーションには <code>useFrame</code> フックを使います。
      </p>

      <h2 className="text-2xl font-bold mb-4">バニラ Three.js vs R3F の比較</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        同じ「回転するボックス」を、バニラ Three.js と R3F で書いた場合の違いを見てみましょう。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <CodeBlock
          language="javascript"
          title="バニラ Three.js（命令的）"
          showLineNumbers
          code={`import * as THREE from 'three';

// シーン、カメラ、レンダラーを手動で作成
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight,
  0.1, 1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// メッシュを作成してシーンに追加
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x6366f1
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// ライトを追加
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

// アニメーションループを手動で管理
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();`}
        />

        <CodeBlock
          language="tsx"
          title="React Three Fiber（宣言的）"
          showLineNumbers
          code={`import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingBox() {
  const meshRef = useRef(null);

  // useFrame でフレーム毎に実行
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6366F1" />
    </mesh>
  );
}

// Canvas がシーン・カメラ・レンダラーを自動生成
function App() {
  return (
    <Canvas>
      <directionalLight position={[5, 5, 5]} />
      <RotatingBox />
    </Canvas>
  );
}`}
        />
      </div>

      <InfoBox title="コード量の違いに注目">
        <p>
          バニラ Three.js では約 30 行かかる処理が、R3F では約 20 行で記述できます。
          シーン・カメラ・レンダラーの初期化、DOM への追加、リサイズ対応などが
          すべて <code>&lt;Canvas&gt;</code> に内包されています。
          さらに React の状態管理やコンポーネント分割がそのまま使えるため、
          大規模なシーンでもコードの見通しが良くなります。
        </p>
      </InfoBox>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">useFrame でアニメーション</h2>
        <p className="text-sm text-muted-foreground mb-4">
          <code>useFrame</code> は R3F のコアフック。毎フレーム呼び出されるコールバックを登録します。
          <code>delta</code>（前フレームからの経過秒数）を使うと、
          フレームレートに依存しない滑らかなアニメーションが作れます。
        </p>

        <CodeWithPreview
          language="tsx"
          title="RotatingKnot コンポーネント"
          caption="useFrame で回転するトーラスノット（ドラッグで視点変更）"
          cameraPosition={[3, 2, 4]}
          code={`import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RotatingKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* args は Three.js のコンストラクタ引数に対応 */}
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color="#6366F1"
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}`}
        >
          <RotatingKnot />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
        </CodeWithPreview>
      </div>

      <div className="mt-8">
        <InfoBox title="R3F のリコンサイラー（Reconciler）">
          <p>
            R3F は React のカスタムリコンサイラーを使用しています。
            JSX 要素として記述した <code>&lt;mesh&gt;</code> や <code>&lt;boxGeometry&gt;</code> は、
            R3F が内部で対応する Three.js オブジェクト（<code>new THREE.Mesh()</code>、
            <code>new THREE.BoxGeometry()</code>）に変換されます。
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code>&lt;mesh&gt;</code> → <code>new THREE.Mesh()</code></li>
            <li><code>&lt;boxGeometry&gt;</code> → <code>new THREE.BoxGeometry()</code></li>
            <li><code>&lt;meshStandardMaterial&gt;</code> → <code>new THREE.MeshStandardMaterial()</code></li>
            <li>JSX のプロパティ → Three.js オブジェクトのプロパティに自動マッピング</li>
          </ul>
          <p className="mt-2">
            つまり、Three.js で使えるすべてのクラスが小文字キャメルケースの JSX 要素として利用可能です。
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="バニラ Three.js で回転するボックスを作ろう"
          description="requestAnimationFrame を使って立方体を回転させるアニメーションを実装してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6366F1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 3;

// アニメーションループ
function animate() {
  ___(animate);

  // 毎フレーム回転させる
  cube.rotation.___ += 0.01;
  cube.rotation.___ += 0.01;

  renderer.render(scene, camera);
}
animate();`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x6366F1 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add(new THREE.DirectionalLight(0xffffff, 1));
scene.add(new THREE.AmbientLight(0x404040));

camera.position.z = 3;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();`}
          keywords={['requestAnimationFrame(', 'rotation.x', 'rotation.y']}
          hints={[
            'requestAnimationFrame(animate) で次のフレームを予約します',
            'cube.rotation.x と cube.rotation.y で回転を制御します',
            '毎フレーム少しずつ値を加算すると滑らかな回転になります',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="R3F の基本まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li><code>&lt;Canvas&gt;</code> = レンダラー + シーン + カメラを自動セットアップ</li>
            <li>JSX 要素 = Three.js オブジェクトに自動変換される</li>
            <li><code>useFrame</code> = アニメーションループ（毎フレーム実行されるフック）</li>
            <li><code>args</code> プロパティ = Three.js コンストラクタの引数</li>
            <li>React の状態管理やコンポーネント分割がそのまま 3D 開発に使える</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
