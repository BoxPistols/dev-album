import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import CodingChallenge from "@/components/CodingChallenge";

export default function MaterialPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">マテリアル（質感）</h1>

      <WhyNowBox tags={["MeshBasicMaterial", "MeshStandardMaterial", "MeshPhongMaterial"]}>
        <p>
          マテリアルは 3D オブジェクトの「見た目」を決める要素です。
          同じ形のオブジェクトでも、マテリアルを変えるだけで
          金属のように光ったり、ゴムのようにマットになったりします。
        </p>
        <p>
          ジオメトリが骨格なら、マテリアルは皮膚や服のようなものです。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">3 つの基本マテリアル</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        Three.js には多くのマテリアルがありますが、まずは最も基本的な 3
        種類を比較してみましょう。下のプレビューで同じ球体を 3
        つの異なるマテリアルで表示しています。
      </p>

      <ThreePreview
        height="350px"
        caption="左: MeshBasicMaterial / 中央: MeshStandardMaterial / 右: MeshPhongMaterial"
        cameraPosition={[0, 2, 6]}
      >
        {/* MeshBasicMaterial - ライティング不要 */}
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>

        {/* MeshStandardMaterial - PBR マテリアル */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#4F46E5" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* MeshPhongMaterial - ハイライト付き */}
        <mesh position={[3, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial color="#4F46E5" shininess={100} />
        </mesh>

        {/* ラベル用の平面 */}
        <group position={[-3, -1.8, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.5, 1]} />
            <meshBasicMaterial color="#1E1B4B" />
          </mesh>
        </group>
        <group position={[0, -1.8, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.5, 1]} />
            <meshBasicMaterial color="#1E1B4B" />
          </mesh>
        </group>
        <group position={[3, -1.8, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.5, 1]} />
            <meshBasicMaterial color="#1E1B4B" />
          </mesh>
        </group>

        {/* ライティング（Standard と Phong に必要） */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-3, 3, 3]} intensity={0.5} />
      </ThreePreview>

      <div className="mt-8 space-y-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            MeshBasicMaterial（ベーシック）
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            最もシンプルなマテリアル。ライティング（光）の影響を受けないため、
            均一な色で表示されます。ワイヤーフレームやデバッグ用途に適しています。
          </p>
          <CodeBlock
            language="javascript"
            code={`const material = new THREE.MeshBasicMaterial({
  color: 0x4F46E5,
  // wireframe: true,  // ワイヤーフレーム表示
});`}
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            MeshStandardMaterial（スタンダード）
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            PBR（物理ベースレンダリング）マテリアル。
            <code>roughness</code>（粗さ）と <code>metalness</code>
            （金属感）で質感をリアルに制御できます。
            最も推奨されるマテリアルです。
          </p>
          <CodeBlock
            language="javascript"
            code={`const material = new THREE.MeshStandardMaterial({
  color: 0x4F46E5,
  roughness: 0.4,   // 0: 鏡面 〜 1: マット
  metalness: 0.3,   // 0: 非金属 〜 1: 金属
});`}
          />
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-lg font-semibold text-primary mb-3">
            MeshPhongMaterial（フォン）
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            光沢のあるハイライトが特徴のマテリアル。
            <code>shininess</code>{" "}
            でハイライトの鋭さを制御します。
            Standard より軽量ですが、リアリティは劣ります。
          </p>
          <CodeBlock
            language="javascript"
            code={`const material = new THREE.MeshPhongMaterial({
  color: 0x4F46E5,
  shininess: 100,   // ハイライトの鋭さ（デフォルト: 30）
  specular: 0x444444, // ハイライトの色
});`}
          />
        </div>
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="ライティングとマテリアルの関係">
          <p>
            <code>MeshBasicMaterial</code>{" "}
            はライトの影響を受けないため、シーンにライトがなくても表示されます。
          </p>
          <p className="mt-2">
            一方、<code>MeshStandardMaterial</code> と{" "}
            <code>MeshPhongMaterial</code>{" "}
            はライトがないと真っ黒になります。
            これらを使う場合は、必ずシーンにライトを追加しましょう。
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">マテリアルの選び方</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-3 font-semibold">マテリアル</th>
                <th className="text-left p-3 font-semibold">ライト</th>
                <th className="text-left p-3 font-semibold">パフォーマンス</th>
                <th className="text-left p-3 font-semibold">用途</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-t border-border">
                <td className="p-3 font-mono text-foreground">MeshBasicMaterial</td>
                <td className="p-3">不要</td>
                <td className="p-3">最速</td>
                <td className="p-3">デバッグ、UI要素、ワイヤーフレーム</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-mono text-foreground">MeshStandardMaterial</td>
                <td className="p-3">必要</td>
                <td className="p-3">やや重い</td>
                <td className="p-3">リアルな質感（推奨）</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3 font-mono text-foreground">MeshPhongMaterial</td>
                <td className="p-3">必要</td>
                <td className="p-3">中程度</td>
                <td className="p-3">光沢のある表現、ゲーム向き</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="マテリアルを比較してみよう"
          description="3つの球体に異なるマテリアルを設定して、見た目の違いを確認しましょう。左は MeshBasicMaterial、中央は MeshBasicMaterial（wireframe）、右は MeshBasicMaterial（色を変えて）で作成してください。"
          preview
          initialCode={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 6;

// 左: 通常のベーシックマテリアル
const geo = new THREE.SphereGeometry(1, 32, 32);
const mat1 = new THREE.___({ color: 0x4F46E5 });
const sphere1 = new THREE.Mesh(geo, mat1);
sphere1.position.x = -3;
scene.add(sphere1);

// 中央: ワイヤーフレーム表示
const mat2 = new THREE.___({ color: 0x7C3AED, wireframe: ___ });
const sphere2 = new THREE.Mesh(geo, mat2);
scene.add(sphere2);

// 右: 別の色
const mat3 = new THREE.___({ color: 0x0EA5E9 });
const sphere3 = new THREE.Mesh(geo, mat3);
sphere3.position.x = 3;
scene.add(sphere3);

renderer.render(scene, camera);`}
          answer={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 6;

// 左: 通常のベーシックマテリアル
const geo = new THREE.SphereGeometry(1, 32, 32);
const mat1 = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
const sphere1 = new THREE.Mesh(geo, mat1);
sphere1.position.x = -3;
scene.add(sphere1);

// 中央: ワイヤーフレーム表示
const mat2 = new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true });
const sphere2 = new THREE.Mesh(geo, mat2);
scene.add(sphere2);

// 右: 別の色
const mat3 = new THREE.MeshBasicMaterial({ color: 0x0EA5E9 });
const sphere3 = new THREE.Mesh(geo, mat3);
sphere3.position.x = 3;
scene.add(sphere3);

renderer.render(scene, camera);`}
          hints={[
            'MeshBasicMaterial はライト不要で色が表示されます',
            'wireframe: true でワイヤーフレーム表示になります',
            '色は 0x に続けて16進数で指定します',
          ]}
          keywords={['MeshBasicMaterial', 'wireframe: true']}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>マテリアルは 3D オブジェクトの「見た目」を決める</li>
            <li>MeshBasicMaterial: ライト不要、最もシンプル</li>
            <li>MeshStandardMaterial: PBR、最もリアル（推奨）</li>
            <li>MeshPhongMaterial: 光沢表現、Standard より軽量</li>
            <li>Standard / Phong はライトがないと真っ黒になる</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
