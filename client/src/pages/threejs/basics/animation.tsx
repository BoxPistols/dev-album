import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// 回転する立方体コンポーネント（useFrame は Canvas 内で使う必要がある）
function RotatingCube({ speed }: { speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.y += delta * speed * 0.7;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#4F46E5" roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function AnimationPage() {
  const [speed, setSpeed] = useState(1);

  return (
    <PageLayout>
      <h1 className="mb-6">アニメーション</h1>

      <WhyNowBox tags={["requestAnimationFrame", "useFrame", "アニメーションループ"]}>
        <p>
          静止画だけでなく、動きのある 3D シーンを作るにはアニメーションが必要です。
          ブラウザの描画サイクルに合わせて毎フレーム更新することで、
          オブジェクトを滑らかに動かすことができます。
        </p>
        <p>
          アニメーションは 3D コンテンツに命を吹き込む、最も楽しい部分です。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">アニメーションの仕組み</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        アニメーションは「1秒間に何十回も画面を書き換える」ことで実現します。
        映画が 1 秒間に 24 コマの静止画を高速で切り替えるのと同じ原理です。
        ブラウザでは <code>requestAnimationFrame</code>{" "}
        を使って、毎フレーム（通常 60fps）描画を更新します。
      </p>

      <h2 className="text-2xl font-bold mb-4">基本のアニメーションループ</h2>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="回転速度"
          value={speed}
          min={0}
          max={5}
          step={0.1}
          onChange={setSpeed}
        />
      </div>

      <CodeWithPreview
        language="javascript"
        title="requestAnimationFrame によるアニメーション"
        caption={`回転速度: ${speed.toFixed(1)}x`}
        code={`// アニメーションループ
function animate() {
  // 次のフレームで再度この関数を呼ぶ
  requestAnimationFrame(animate);

  // 立方体を回転させる
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // レンダリング
  renderer.render(scene, camera);
}

// アニメーション開始
animate();`}
      >
        <RotatingCube speed={speed} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
      </CodeWithPreview>

      <div className="mt-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">コードの流れ</h2>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              1
            </span>
            <div>
              <strong className="text-foreground">animate 関数を定義</strong> -
              毎フレーム実行される処理を記述
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              2
            </span>
            <div>
              <strong className="text-foreground">requestAnimationFrame</strong> -
              ブラウザの次の描画タイミングで再度 animate を呼ぶよう予約
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              3
            </span>
            <div>
              <strong className="text-foreground">オブジェクトを更新</strong> -
              回転、移動、スケール変更など
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              4
            </span>
            <div>
              <strong className="text-foreground">レンダリング</strong> -
              更新された状態でシーンを再描画
            </div>
          </li>
        </ol>
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="THREE.Clock で時間ベースのアニメーション">
          <p>
            <code>rotation.x += 0.01</code>{" "}
            のような固定値による更新は、フレームレート（fps）によって速度が変わります。
            60fps では滑らかでも、30fps の端末では半分の速さになります。
          </p>
          <p className="mt-2">
            <code>THREE.Clock</code>{" "}
            を使うと、フレーム間の経過時間（delta）を取得でき、
            どの端末でも同じ速度でアニメーションさせることができます。
          </p>
          <pre className="mt-2 text-xs bg-black/10 dark:bg-white/10 p-2 rounded">
{`const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // 前フレームからの経過秒数
  cube.rotation.x += delta * 1.0; // 1秒で約1ラジアン回転

  renderer.render(scene, camera);
}`}
          </pre>
        </InfoBox>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">回転以外のアニメーション</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          回転だけでなく、位置やスケールもアニメーションできます。
          <code>Math.sin</code> を使うと、滑らかな往復運動が作れます。
        </p>

        <CodeBlock
          language="javascript"
          title="位置とスケールのアニメーション"
          showLineNumbers
          code={`const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // 上下に浮遊する動き
  cube.position.y = Math.sin(elapsed) * 0.5;

  // 呼吸するようなスケール変化
  const scale = 1 + Math.sin(elapsed * 2) * 0.1;
  cube.scale.set(scale, scale, scale);

  renderer.render(scene, camera);
}`}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="パフォーマンスの注意点">
          <p>
            アニメーションループ内では、オブジェクトの生成（new）を避けましょう。
            毎フレーム実行されるため、不要なオブジェクト生成は
            メモリ使用量の増加とガベージコレクション（GC）による
            カクつきの原因になります。
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="アニメーションループを完成させよう"
          description="THREE.Clock を使って、立方体を時間ベースで回転させるアニメーションループを書いてください。X軸とY軸の両方を回転させましょう。"
          preview
          initialCode={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 3;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const clock = new THREE.___();

function animate() {
  requestAnimationFrame(___);

  const delta = clock.___();

  cube.rotation.x += delta * ___;
  cube.rotation.y += delta * ___;

  renderer.render(scene, camera);
}

animate();`}
          answer={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 3;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  cube.rotation.x += delta * 1.0;
  cube.rotation.y += delta * 0.7;

  renderer.render(scene, camera);
}

animate();`}
          hints={[
            'THREE.Clock() でクロックを作成します',
            'requestAnimationFrame に渡すのは animate 関数自身です',
            'clock.getDelta() でフレーム間の経過秒数を取得します',
            'delta に速度係数を掛けて回転速度を調整します',
          ]}
          keywords={['Clock()', 'requestAnimationFrame(animate)', 'getDelta()', 'rotation.x', 'rotation.y']}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>requestAnimationFrame で毎フレーム更新・再描画する</li>
            <li>rotation、position、scale を変更してアニメーション</li>
            <li>THREE.Clock の delta で端末に依存しない速度制御</li>
            <li>Math.sin を使うと滑らかな往復運動が作れる</li>
            <li>ループ内でオブジェクト生成を避けてパフォーマンス維持</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
