import { useState } from "react";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

export default function CameraPage() {
  const [fov, setFov] = useState(75);
  const [posZ, setPosZ] = useState(5);

  return (
    <PageLayout>
      <h1 className="mb-6">カメラを理解する</h1>

      <WhyNowBox tags={["PerspectiveCamera", "視野角", "透視投影"]}>
        <p>
          3D シーンをどの視点から見るかを決めるのが「カメラ」です。
          現実世界と同じように、カメラの位置や角度を変えると見え方が大きく変わります。
        </p>
        <p>
          カメラの設定を理解することで、思い通りの構図で 3D
          シーンを表示できるようになります。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">PerspectiveCamera とは</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        <code>PerspectiveCamera</code>{" "}
        は、人間の目と同じように遠くのものが小さく、近くのものが大きく見える
        「透視投影」カメラです。Three.js で最もよく使われるカメラです。
      </p>

      <h3 className="text-xl font-bold mb-3">4 つのパラメータ</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-lg font-semibold text-primary mb-2">
            fov（視野角）
          </h4>
          <p className="text-sm text-muted-foreground">
            カメラの視野の広さを度数で指定します。値が大きいほど広い範囲が映り、
            小さいほどズームインしたように見えます。一般的に 50〜75 を使います。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-lg font-semibold text-primary mb-2">
            aspect（アスペクト比）
          </h4>
          <p className="text-sm text-muted-foreground">
            描画領域の横幅 / 高さの比率です。通常は{" "}
            <code>window.innerWidth / window.innerHeight</code>{" "}
            を使い、画面に合わせます。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-lg font-semibold text-primary mb-2">
            near（近クリップ面）
          </h4>
          <p className="text-sm text-muted-foreground">
            カメラからこの距離より近いオブジェクトは描画されません。通常は{" "}
            <code>0.1</code> を設定します。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="text-lg font-semibold text-primary mb-2">
            far（遠クリップ面）
          </h4>
          <p className="text-sm text-muted-foreground">
            カメラからこの距離より遠いオブジェクトは描画されません。通常は{" "}
            <code>1000</code> を設定します。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">カメラのコード</h2>

      <CodeBlock
        language="javascript"
        title="PerspectiveCamera の作成"
        showLineNumbers
        code={`// PerspectiveCamera(fov, aspect, near, far)
const camera = new THREE.PerspectiveCamera(
  ${fov},                                      // 視野角（度）
  window.innerWidth / window.innerHeight, // アスペクト比
  0.1,                                    // near（近クリップ面）
  1000                                    // far（遠クリップ面）
);

// カメラの位置を設定
camera.position.z = ${posZ};`}
      />

      <div className="mt-6 mb-8">
        <h3 className="text-xl font-bold mb-3">パラメータを調整してみよう</h3>
        <p className="text-sm text-muted-foreground mb-4">
          スライダーを動かすと、カメラの視野角（fov）と位置（Z軸）がリアルタイムに変化します。
        </p>

        <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
          <ParameterSlider
            label="fov（視野角）"
            value={fov}
            min={20}
            max={120}
            step={1}
            onChange={setFov}
            unit="°"
          />
          <ParameterSlider
            label="position.z"
            value={posZ}
            min={1}
            max={10}
            step={0.1}
            onChange={setPosZ}
          />
        </div>

        <ThreePreview
          caption={`fov: ${fov}° / カメラ位置 Z: ${posZ}`}
          cameraPosition={[0, 0, posZ]}
          cameraFov={fov}
          orbitControls={false}
        >
          {/* グリッド風に複数の立方体を配置して遠近感を示す */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#4F46E5" />
          </mesh>
          <mesh position={[2, 0, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#7C3AED" />
          </mesh>
          <mesh position={[-2, 0, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#2563EB" />
          </mesh>
          <mesh position={[0, 0, -4]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#0EA5E9" />
          </mesh>
          <gridHelper args={[10, 10, "#444444", "#222222"]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
        </ThreePreview>
      </div>

      <InfoBox type="info" title="OrthographicCamera もあります">
        <p>
          Three.js にはもう 1 つ、<code>OrthographicCamera</code>
          （平行投影カメラ）があります。 遠近感がなく、距離に関係なくオブジェクトが同じ大きさに見えます。
          2D ゲームや設計図のような表現に向いています。
        </p>
        <p className="mt-2">
          使い方: <code>new THREE.OrthographicCamera(left, right, top, bottom, near, far)</code>
        </p>
      </InfoBox>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">カメラの位置と向き</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          カメラの位置は <code>camera.position.set(x, y, z)</code>{" "}
          で設定します。カメラがどこを見るかは{" "}
          <code>camera.lookAt(x, y, z)</code> で指定できます。
        </p>

        <CodeBlock
          language="javascript"
          title="カメラの位置と向きの設定"
          code={`// カメラの位置を設定
camera.position.set(3, 3, 3);

// 原点（0, 0, 0）を見る
camera.lookAt(0, 0, 0);`}
        />
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="カメラの位置を調整してみよう"
          description="PerspectiveCameraの位置とlookAtを変更して、立方体を斜めから見るようにしてください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// カメラの位置を設定（x: 3, y: 2, z: 5 に移動）
camera.position.set(___, ___, ___);
// カメラの視点を原点に向ける
camera.lookAt(___, ___, ___);

renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(3, 2, 5);
camera.lookAt(0, 0, 0);

renderer.render(scene, camera);`}
          keywords={['position.set(', 'lookAt(']}
          hints={[
            'camera.position.set(x, y, z) でカメラの位置を設定',
            'camera.lookAt(x, y, z) でカメラの注視点を設定',
            '原点は (0, 0, 0) です',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>PerspectiveCamera は透視投影（遠近感あり）</li>
            <li>fov、aspect、near、far の 4 つのパラメータで制御</li>
            <li>position で位置、lookAt で向きを設定</li>
            <li>OrthographicCamera は平行投影（遠近感なし）</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
