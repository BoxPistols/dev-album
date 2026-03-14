import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import CodingChallenge from "@/components/CodingChallenge";

// プリミティブで作った小さな家
function SimpleHouse() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 本体（壁） */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[2, 1.5, 2]} />
        <meshStandardMaterial color="#E8D5B7" roughness={0.8} />
      </mesh>

      {/* 屋根 */}
      <mesh position={[0, 1.95, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.7, 1, 4]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>

      {/* ドア */}
      <mesh position={[0, 0.45, 1.01]}>
        <boxGeometry args={[0.5, 0.9, 0.05]} />
        <meshStandardMaterial color="#5C3317" roughness={0.9} />
      </mesh>

      {/* 窓 - 左 */}
      <mesh position={[-0.55, 0.9, 1.01]}>
        <boxGeometry args={[0.35, 0.35, 0.05]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* 窓 - 右 */}
      <mesh position={[0.55, 0.9, 1.01]}>
        <boxGeometry args={[0.35, 0.35, 0.05]} />
        <meshStandardMaterial color="#87CEEB" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* 煙突 */}
      <mesh position={[0.6, 2.2, -0.3]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#8B0000" roughness={0.9} />
      </mesh>

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#4A7C59" roughness={0.9} />
      </mesh>
    </group>
  );
}

export default function ModelLoadingPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">3D モデル読み込み</h1>

      <WhyNowBox tags={["GLTFLoader", "glTF / GLB", "useGLTF"]}>
        <p>
          すべての 3D オブジェクトをコードで作るのは大変です。
          Blender や Maya などの 3D モデリングソフトで作成したモデルを読み込むことで、
          複雑で精巧なオブジェクトをシーンに配置できます。
        </p>
        <p>
          モデル読み込みは、実用的な 3D アプリケーションを作る上で欠かせないスキルです。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">glTF フォーマットとは</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        glTF（GL Transmission Format）は、3D モデルの標準フォーマットとして
        広く採用されています。「3D の JPEG」とも呼ばれ、
        ジオメトリ、マテリアル、テクスチャ、アニメーションなどを
        効率的に格納できます。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">.gltf</h4>
          <p className="text-sm text-muted-foreground">
            JSON ベースのテキストフォーマット。テクスチャやバッファは
            外部ファイルとして参照します。デバッグや編集が容易です。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">.glb</h4>
          <p className="text-sm text-muted-foreground">
            すべてのデータを 1 つのバイナリファイルにまとめた形式。
            ファイルサイズが小さく、Web での配信に最適です。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">GLTFLoader の使い方</h2>

      <CodeBlock
        language="javascript"
        title="Three.js の GLTFLoader でモデルを読み込む"
        showLineNumbers
        code={`import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

loader.load(
  '/models/house.glb',      // モデルのパス
  (gltf) => {
    // 読み込み成功時
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);

    // アニメーションがある場合
    if (gltf.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
    }
  },
  (progress) => {
    // 読み込み進捗
    const percent = (progress.loaded / progress.total) * 100;
    console.log(\`読み込み中: \${percent.toFixed(0)}%\`);
  },
  (error) => {
    // エラー時
    console.error('モデル読み込みエラー:', error);
  }
);`}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">React Three Fiber での読み込み</h2>
        <p className="text-sm text-muted-foreground mb-4">
          R3F（React Three Fiber）では <code>@react-three/drei</code> の{" "}
          <code>useGLTF</code> フックを使うことで、より簡潔にモデルを読み込めます。
          下のプレビューは基本ジオメトリを組み合わせた例です（実際のプロジェクトでは .glb ファイルを読み込みます）。
        </p>

        <CodeWithPreview
          language="tsx"
          title="useGLTF を使った React Three Fiber でのモデル読み込み"
          caption="プリミティブで構築した家（実際のプロジェクトでは .glb モデルを使用）"
          cameraPosition={[4, 3, 4]}
          code={`import { useGLTF } from '@react-three/drei';

function HouseModel() {
  // モデルを読み込み（自動キャッシュ付き）
  const { scene } = useGLTF('/models/house.glb');

  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

// プリロード（オプション）
useGLTF.preload('/models/house.glb');`}
        >
          <SimpleHouse />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={0.8} />
        </CodeWithPreview>
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="DRACO 圧縮とモデル最適化">
          <p>
            DRACO は Google が開発した 3D メッシュの圧縮ライブラリです。
            glTF モデルに適用すると、ファイルサイズを大幅に削減できます（通常 60〜90% 減）。
          </p>
          <pre className="mt-2 text-xs bg-black/10 dark:bg-white/10 p-2 rounded">
{`import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);`}
          </pre>
        </InfoBox>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">モデル最適化のポイント</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">ポリゴン数の削減</h4>
            <p className="text-sm text-muted-foreground">
              Blender の Decimate モディファイアなどで、見た目を保ちながら
              ポリゴン数を減らします。モバイル向けは特に重要です。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">テクスチャの圧縮</h4>
            <p className="text-sm text-muted-foreground">
              テクスチャサイズを適切に設定し、KTX2 形式への変換を検討します。
              GPU での展開が高速で、メモリ使用量も削減できます。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">メッシュの結合</h4>
            <p className="text-sm text-muted-foreground">
              同じマテリアルを使うメッシュを結合すると、ドローコール数が
              減りパフォーマンスが向上します。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">LOD（Level of Detail）</h4>
            <p className="text-sm text-muted-foreground">
              カメラからの距離に応じて、異なる詳細度のモデルに切り替える
              テクニック。遠くのオブジェクトは低ポリゴンで描画します。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="モデル読み込みの注意点">
          <p>
            モデルファイルは <code>public</code> フォルダに配置し、
            パスは <code>/models/xxx.glb</code> のように指定します。
            また、大きなモデルの読み込みには時間がかかるため、
            ローディング表示を入れることを推奨します。
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="プリミティブで家を作ってみよう"
          description="BoxGeometry と ConeGeometry を組み合わせて、壁と屋根からなる簡単な家を作成してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ライトを追加
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 壁（箱）を作成
const wallGeometry = new THREE.___(2, 1.5, 2);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xE8D5B7 });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.y = ___;
scene.add(wall);

// 屋根（コーン）を作成
const roofGeometry = new THREE.___(1.7, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = ___;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

camera.position.set(4, 3, 4);
camera.lookAt(0, 1, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const wallGeometry = new THREE.BoxGeometry(2, 1.5, 2);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xE8D5B7 });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.y = 0.75;
scene.add(wall);

const roofGeometry = new THREE.ConeGeometry(1.7, 1, 4);
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.y = 1.95;
roof.rotation.y = Math.PI / 4;
scene.add(roof);

camera.position.set(4, 3, 4);
camera.lookAt(0, 1, 0);
renderer.render(scene, camera);`}
          keywords={['BoxGeometry(', 'ConeGeometry(', 'position.y']}
          hints={[
            '壁は BoxGeometry(幅, 高さ, 奥行き) で作成',
            '屋根は ConeGeometry(半径, 高さ, セグメント数) で作成',
            '壁の高さが1.5なので、y位置は 0.75（半分）に設定します',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>glTF (.glb) は Web 3D の標準フォーマット</li>
            <li>GLTFLoader または useGLTF でモデルを読み込む</li>
            <li>DRACO 圧縮でファイルサイズを大幅に削減できる</li>
            <li>ポリゴン数・テクスチャサイズの最適化がパフォーマンスに重要</li>
            <li>大きなモデルにはローディング表示を入れる</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
