import { useState } from "react";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import ThreePreview from "@/features/threejs/ThreePreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

export default function GeometryPage() {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [depth, setDepth] = useState(1);

  return (
    <PageLayout>
      <h1 className="mb-6">ジオメトリ（形）</h1>

      <WhyNowBox tags={["BoxGeometry", "SphereGeometry", "頂点とポリゴン"]}>
        <p>
          ジオメトリは 3D オブジェクトの「骨格」です。
          立方体、球体、円柱など、オブジェクトの形状を定義します。
        </p>
        <p>
          Three.js には多くのプリセットジオメトリが用意されており、
          パラメータを変えるだけで様々な形を作ることができます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">ジオメトリとは</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        ジオメトリは、3D オブジェクトの形状を頂点（ポイント）と面（ポリゴン）で
        表現したデータです。Three.js の <code>Mesh</code>（3Dオブジェクト）は、
        ジオメトリ（形）とマテリアル（質感）を組み合わせて作ります。
      </p>

      <h2 className="text-2xl font-bold mb-4">BoxGeometry を試してみよう</h2>

      <p className="text-sm text-muted-foreground mb-4">
        スライダーで幅・高さ・奥行きを変更して、箱の形がどう変わるか確認しましょう。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="幅（width）"
          value={width}
          min={0.1}
          max={5}
          step={0.1}
          onChange={setWidth}
        />
        <ParameterSlider
          label="高さ（height）"
          value={height}
          min={0.1}
          max={5}
          step={0.1}
          onChange={setHeight}
        />
        <ParameterSlider
          label="奥行き（depth）"
          value={depth}
          min={0.1}
          max={5}
          step={0.1}
          onChange={setDepth}
        />
      </div>

      <CodeWithPreview
        code={`// BoxGeometry(幅, 高さ, 奥行き)
const geometry = new THREE.BoxGeometry(${width.toFixed(1)}, ${height.toFixed(1)}, ${depth.toFixed(1)});
const material = new THREE.MeshStandardMaterial({
  color: 0x4F46E5
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);`}
        title="BoxGeometry"
        caption={`BoxGeometry(${width.toFixed(1)}, ${height.toFixed(1)}, ${depth.toFixed(1)})`}
      >
        <mesh>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color="#4F46E5" />
        </mesh>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
      </CodeWithPreview>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">よく使うジオメトリ一覧</h2>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          Three.js には多くのプリセットジオメトリがあります。
          よく使われるものを紹介します。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* SphereGeometry */}
          <div>
            <h3 className="text-lg font-bold mb-2">SphereGeometry（球）</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code>SphereGeometry(半径, 横分割数, 縦分割数)</code>
              。分割数が多いほど滑らかになります。
            </p>
            <ThreePreview height="250px" caption="SphereGeometry(1, 32, 32)">
              <mesh>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#7C3AED" />
              </mesh>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </ThreePreview>
          </div>

          {/* CylinderGeometry */}
          <div>
            <h3 className="text-lg font-bold mb-2">CylinderGeometry（円柱）</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code>CylinderGeometry(上半径, 下半径, 高さ, 分割数)</code>
              。上下の半径を変えると円錐も作れます。
            </p>
            <ThreePreview height="250px" caption="CylinderGeometry(0.7, 0.7, 2, 32)">
              <mesh>
                <cylinderGeometry args={[0.7, 0.7, 2, 32]} />
                <meshStandardMaterial color="#2563EB" />
              </mesh>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </ThreePreview>
          </div>

          {/* TorusGeometry */}
          <div>
            <h3 className="text-lg font-bold mb-2">TorusGeometry（トーラス）</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code>TorusGeometry(半径, チューブ半径, 分割数, 分割数)</code>
              。ドーナツ型のジオメトリです。
            </p>
            <ThreePreview height="250px" caption="TorusGeometry(1, 0.4, 16, 100)">
              <mesh>
                <torusGeometry args={[1, 0.4, 16, 100]} />
                <meshStandardMaterial color="#0EA5E9" />
              </mesh>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </ThreePreview>
          </div>

          {/* ConeGeometry */}
          <div>
            <h3 className="text-lg font-bold mb-2">ConeGeometry（円錐）</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code>ConeGeometry(半径, 高さ, 分割数)</code>
              。底面が円形の錐体です。
            </p>
            <ThreePreview height="250px" caption="ConeGeometry(1, 2, 32)">
              <mesh>
                <coneGeometry args={[1, 2, 32]} />
                <meshStandardMaterial color="#F59E0B" />
              </mesh>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
            </ThreePreview>
          </div>
        </div>
      </div>

      <InfoBox type="info" title="ジオメトリの分割数（セグメント）">
        <p>
          ジオメトリの分割数を増やすと形が滑らかになりますが、
          頂点数が増えるためパフォーマンスに影響します。
          球体なら 32 分割、トーラスなら 16〜32 分割が一般的な目安です。
        </p>
      </InfoBox>

      <div className="mt-8">
        <CodingChallenge
          title="球体ジオメトリを作ろう"
          description="SphereGeometry を使って、半径 1.5、横分割 32、縦分割 32 の球体メッシュを作成してください。マテリアルは MeshBasicMaterial を使い、色は自由に設定して構いません。"
          preview
          initialCode={`// レンダラーとシーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 4;

// 球体のジオメトリを作成
const geometry = new THREE.___(___);

// マテリアルを作成
const material = new THREE.___({ color: ___ });

// メッシュを作成してシーンに追加
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

renderer.render(scene, camera);`}
          answer={`// レンダラーとシーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 4;

// 球体のジオメトリを作成
const geometry = new THREE.SphereGeometry(1.5, 32, 32);

// マテリアルを作成
const material = new THREE.MeshBasicMaterial({ color: 0x7C3AED });

// メッシュを作成してシーンに追加
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

renderer.render(scene, camera);`}
          hints={[
            '球体は THREE.SphereGeometry(半径, 横分割数, 縦分割数) で作成します',
            'MeshBasicMaterial はライティングなしでも色が見えるマテリアルです',
            'SphereGeometry(1.5, 32, 32) で半径 1.5 の球体ができます',
          ]}
          keywords={['SphereGeometry(1.5, 32, 32)', 'MeshBasicMaterial']}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>ジオメトリは 3D オブジェクトの形状（骨格）を定義する</li>
            <li>BoxGeometry、SphereGeometry など多くのプリセットがある</li>
            <li>パラメータでサイズや分割数を制御できる</li>
            <li>Mesh = Geometry（形）+ Material（質感）</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
