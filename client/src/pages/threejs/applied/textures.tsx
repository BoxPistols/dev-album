import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import CodingChallenge from "@/components/CodingChallenge";

// チェッカーボードテクスチャを生成するカスタムフック
function useCheckerboardTexture(size = 256, divisions = 8) {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const cellSize = size / divisions;

    for (let y = 0; y < divisions; y++) {
      for (let x = 0; x < divisions; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#4F46E5" : "#E0E7FF";
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [size, divisions]);
}

// テクスチャ付きで回転する立方体
function TexturedBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useCheckerboardTexture();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={texture} roughness={0.4} />
    </mesh>
  );
}

export default function TexturesPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">テクスチャ</h1>

      <WhyNowBox tags={["TextureLoader", "UVマッピング", "CanvasTexture"]}>
        <p>
          テクスチャは 3D オブジェクトの表面に画像を貼り付ける技術です。
          単色のマテリアルだけでは表現できない、木目、レンガ、金属の質感など
          リアルな見た目を実現するための重要な要素です。
        </p>
        <p>
          テクスチャを使いこなすことで、3D シーンのクオリティが劇的に向上します。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">TextureLoader の基本</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        Three.js では <code>TextureLoader</code> を使って画像ファイルをテクスチャとして読み込みます。
        読み込んだテクスチャはマテリアルの <code>map</code> プロパティに設定することで、
        オブジェクトの表面に貼り付けることができます。
      </p>

      <CodeBlock
        language="javascript"
        title="TextureLoader によるテクスチャの読み込み"
        showLineNumbers
        code={`// テクスチャローダーを作成
const loader = new THREE.TextureLoader();

// テクスチャを読み込む
const texture = loader.load('/textures/brick.jpg');

// マテリアルに設定
const material = new THREE.MeshStandardMaterial({
  map: texture,           // カラーテクスチャ
  roughness: 0.8,
  metalness: 0.1,
});

// メッシュに適用
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);`}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">UV マッピングとは</h2>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          UV マッピングとは、2D のテクスチャ画像を 3D オブジェクトの表面にどう貼り付けるかを
          定義する座標系です。U は画像の横方向、V は縦方向に対応します。
          各頂点に (U, V) 座標を割り当てることで、テクスチャの
          どの部分がオブジェクトのどの面に表示されるかが決まります。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">UV 座標系</h4>
            <p className="text-sm text-muted-foreground">
              U は横方向（0〜1）、V は縦方向（0〜1）の座標です。
              (0,0) が左下、(1,1) が右上になります。
              BoxGeometry などの基本形状には UV 座標が自動で設定されています。
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">テクスチャの繰り返し</h4>
            <p className="text-sm text-muted-foreground">
              <code>texture.wrapS</code> と <code>texture.wrapT</code> を
              <code>THREE.RepeatWrapping</code> に設定すると、テクスチャを繰り返しタイル状に
              貼ることができます。<code>texture.repeat.set(2, 2)</code> で 2x2 に繰り返します。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-3">チェッカーボードテクスチャ</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Canvas API を使ってプロシージャルに生成したチェッカーボードテクスチャを
          立方体に貼り付けています。外部画像ファイルを使わずにテクスチャを作成する方法です。
        </p>

        <CodeWithPreview
          language="javascript"
          title="CanvasTexture でプロシージャルテクスチャを生成"
          caption="CanvasTexture で生成したチェッカーボードテクスチャ"
          cameraPosition={[3, 3, 3]}
          code={`// Canvas でチェッカーボードを描画
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const ctx = canvas.getContext('2d');

const cellSize = 256 / 8;
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    ctx.fillStyle = (x + y) % 2 === 0 ? '#4F46E5' : '#E0E7FF';
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}

// CanvasTexture として使用
const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

const material = new THREE.MeshStandardMaterial({ map: texture });`}
        >
          <TexturedBox />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
        </CodeWithPreview>
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="テクスチャの種類">
          <p>テクスチャにはさまざまな種類があり、組み合わせて使うことでリアルな質感を表現できます。</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Diffuse（カラー）マップ</strong> - オブジェクトの基本色を定義する。<code>map</code> プロパティに設定
            </li>
            <li>
              <strong>Normal（法線）マップ</strong> - 表面の凹凸感を擬似的に表現。ジオメトリを変更せずにディテールを追加できる
            </li>
            <li>
              <strong>Roughness（粗さ）マップ</strong> - 表面の粗さを部分ごとに制御。白い部分が粗く、黒い部分が滑らか
            </li>
            <li>
              <strong>Metalness（金属度）マップ</strong> - 金属部分と非金属部分を定義
            </li>
            <li>
              <strong>Ambient Occlusion（AO）マップ</strong> - 環境遮蔽を表現し、隙間や角に自然な影をつける
            </li>
          </ul>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodeBlock
          language="javascript"
          title="複数テクスチャの組み合わせ"
          showLineNumbers
          code={`const loader = new THREE.TextureLoader();

const material = new THREE.MeshStandardMaterial({
  map: loader.load('/textures/brick_color.jpg'),          // カラー
  normalMap: loader.load('/textures/brick_normal.jpg'),    // 法線
  roughnessMap: loader.load('/textures/brick_rough.jpg'),  // 粗さ
  aoMap: loader.load('/textures/brick_ao.jpg'),            // 環境遮蔽
});`}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="テクスチャサイズの注意点">
          <p>
            テクスチャのサイズは 2 のべき乗（256, 512, 1024, 2048 など）が推奨です。
            2 のべき乗でないサイズを使うと、GPU がリサイズ処理を行うためパフォーマンスに影響します。
          </p>
          <p className="mt-2">
            また、大きなテクスチャはメモリを大量に消費します。
            モバイル端末では 1024x1024 以下に抑えることを推奨します。
          </p>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="CanvasTexture でチェッカーボードを作ろう"
          description="Canvas API を使ってチェッカーボードテクスチャを生成し、立方体に貼り付けてください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Canvas でチェッカーボードを描画
const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const ctx = canvas.getContext('2d');

const cellSize = 256 / 8;
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    ctx.fillStyle = (x + y) % 2 === 0 ? '#4F46E5' : '#E0E7FF';
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}

// CanvasTexture を作成
const texture = new THREE.___(canvas);

// マテリアルの map にテクスチャを設定
const material = new THREE.MeshBasicMaterial({ ___: texture });
const geometry = new THREE.BoxGeometry(2, 2, 2);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const canvas = document.createElement('canvas');
canvas.width = 256;
canvas.height = 256;
const ctx = canvas.getContext('2d');

const cellSize = 256 / 8;
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    ctx.fillStyle = (x + y) % 2 === 0 ? '#4F46E5' : '#E0E7FF';
    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}

const texture = new THREE.CanvasTexture(canvas);

const material = new THREE.MeshBasicMaterial({ map: texture });
const geometry = new THREE.BoxGeometry(2, 2, 2);
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(3, 2, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          keywords={['CanvasTexture(', 'map:']}
          hints={[
            'Canvas からテクスチャを作るには THREE.CanvasTexture(canvas) を使います',
            'マテリアルにテクスチャを貼るには map プロパティを使います',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>TextureLoader で画像をテクスチャとして読み込む</li>
            <li>UV マッピングで 2D テクスチャを 3D 表面に貼り付ける</li>
            <li>CanvasTexture でプロシージャルなテクスチャを生成できる</li>
            <li>Diffuse, Normal, Roughness など複数のマップを組み合わせてリアルな質感を表現</li>
            <li>テクスチャサイズは 2 のべき乗が推奨</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
