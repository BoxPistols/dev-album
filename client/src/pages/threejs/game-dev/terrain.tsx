import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import ThreePreview from "@/features/threejs/ThreePreview";
import ParameterSlider from "@/features/threejs/ParameterSlider";
import CodingChallenge from "@/components/CodingChallenge";

// シンプルなノイズ関数（手続き的な地形生成用）
function pseudoNoise(x: number, z: number): number {
  const dot = x * 12.9898 + z * 78.233;
  const sin = Math.sin(dot) * 43758.5453;
  return sin - Math.floor(sin);
}

// 滑らかなノイズ（バイリニア補間）
function smoothNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  // 補間用の smoothstep
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);

  const n00 = pseudoNoise(ix, iz);
  const n10 = pseudoNoise(ix + 1, iz);
  const n01 = pseudoNoise(ix, iz + 1);
  const n11 = pseudoNoise(ix + 1, iz + 1);

  const nx0 = n00 * (1 - ux) + n10 * ux;
  const nx1 = n01 * (1 - ux) + n11 * ux;

  return nx0 * (1 - uz) + nx1 * uz;
}

// 複数オクターブのノイズ
function fbmNoise(x: number, z: number, octaves: number = 3): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxValue = 0;
  for (let i = 0; i < octaves; i++) {
    value += smoothNoise(x * frequency, z * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value / maxValue;
}

// 地形メッシュコンポーネント
function Terrain({ scale }: { scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      // ノイズで高さを決定
      const height = fbmNoise(x * 0.3, y * 0.3, 4) * scale * 2;
      position.setZ(i, height);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  }, [scale]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[30, 30, 80, 80]} />
      <meshStandardMaterial
        color="#2D5A27"
        roughness={0.9}
        metalness={0.05}
        flatShading
      />
    </mesh>
  );
}

// 雲コンポーネント
function Cloud({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position}>
      {/* 複数の球体で雲を構成 */}
      <mesh>
        <sphereGeometry args={[0.5 * scale, 8, 6]} />
        <meshStandardMaterial color="white" transparent opacity={0.7} roughness={1} />
      </mesh>
      <mesh position={[0.4 * scale, 0.1, 0]}>
        <sphereGeometry args={[0.35 * scale, 8, 6]} />
        <meshStandardMaterial color="white" transparent opacity={0.6} roughness={1} />
      </mesh>
      <mesh position={[-0.35 * scale, 0.05, 0.1]}>
        <sphereGeometry args={[0.4 * scale, 8, 6]} />
        <meshStandardMaterial color="white" transparent opacity={0.65} roughness={1} />
      </mesh>
      <mesh position={[0.15 * scale, -0.1, 0.2 * scale]}>
        <sphereGeometry args={[0.3 * scale, 8, 6]} />
        <meshStandardMaterial color="white" transparent opacity={0.55} roughness={1} />
      </mesh>
    </group>
  );
}

// 雲群コンポーネント
function Clouds() {
  const cloudsData = useMemo(
    () => [
      { position: [5, 6, -3] as [number, number, number], scale: 1.2 },
      { position: [-7, 7, 2] as [number, number, number], scale: 0.9 },
      { position: [2, 5.5, 8] as [number, number, number], scale: 1.0 },
      { position: [-4, 8, -6] as [number, number, number], scale: 1.4 },
      { position: [8, 6.5, 5] as [number, number, number], scale: 0.8 },
      { position: [-2, 7.5, -8] as [number, number, number], scale: 1.1 },
      { position: [6, 9, -1] as [number, number, number], scale: 0.7 },
      { position: [-8, 5, 4] as [number, number, number], scale: 1.3 },
    ],
    []
  );

  const groupRef = useRef<THREE.Group>(null);

  // 雲がゆっくり流れるアニメーション
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.01;
  });

  return (
    <group ref={groupRef}>
      {cloudsData.map((cloud, i) => (
        <Cloud key={i} position={cloud.position} scale={cloud.scale} />
      ))}
    </group>
  );
}

// 空の背景球
function Sky() {
  return (
    <mesh>
      <sphereGeometry args={[50, 32, 16]} />
      <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
    </mesh>
  );
}

// 地形プレビューシーン
function TerrainPreviewScene({ terrainScale }: { terrainScale: number }) {
  return (
    <>
      <Sky />
      <Terrain scale={terrainScale} />
      <Clouds />

      {/* 太陽光 */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 5]} intensity={1.0} color="#FFF8E1" />
      <directionalLight position={[-5, 8, -3]} intensity={0.2} color="#93C5FD" />
      {/* 霧で遠方をフェード */}
      <fog attach="fog" args={["#87CEEB", 15, 40]} />
    </>
  );
}

export default function TerrainPage() {
  const [terrainScale, setTerrainScale] = useState(1.5);

  return (
    <PageLayout>
      <h1 className="mb-6">地形と空の環境</h1>

      <WhyNowBox tags={["地形生成", "プロシージャル", "環境デザイン"]}>
        <p>
          環境が没入感を生みます。地形と空がゲームの世界を構成し、
          プレイヤーに「飛んでいる」という感覚を与えます。
        </p>
        <p>
          テクスチャを使わず、手続き的（プロシージャル）にすべてを生成することで、
          外部ファイルへの依存なく豊かな環境を作れます。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">プロシージャル地形の仕組み</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        地形は <code>PlaneGeometry</code> の頂点を上下にずらすことで作成します。
        各頂点の高さをノイズ関数で決定することで、自然な起伏を表現できます。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl mb-2 text-primary font-bold">1</div>
          <h4 className="font-semibold text-sm mb-1">平面を作成</h4>
          <p className="text-xs text-muted-foreground">
            PlaneGeometry で多数のセグメントを持つ平面を生成
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl mb-2 text-primary font-bold">2</div>
          <h4 className="font-semibold text-sm mb-1">頂点を変位</h4>
          <p className="text-xs text-muted-foreground">
            ノイズ関数で各頂点の高さ（Z座標）を変更
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl mb-2 text-primary font-bold">3</div>
          <h4 className="font-semibold text-sm mb-1">法線を再計算</h4>
          <p className="text-xs text-muted-foreground">
            computeVertexNormals() でライティングを正しく反映
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">地形プレビュー</h2>

      <p className="text-muted-foreground mb-4 leading-relaxed">
        スライダーで地形のスケール（高低差）を調整できます。
        雲はゆっくりと回転しています。マウスドラッグで視点を変えてみましょう。
      </p>

      <div className="space-y-3 mb-4 p-4 bg-card border border-border rounded-lg">
        <ParameterSlider
          label="地形スケール"
          value={terrainScale}
          min={0.5}
          max={3}
          step={0.1}
          onChange={setTerrainScale}
        />
      </div>

      <ThreePreview
        height="450px"
        caption={`地形スケール: ${terrainScale.toFixed(1)} - プロシージャルな丘陵地形と雲`}
        cameraPosition={[12, 8, 12]}
        cameraFov={55}
      >
        <TerrainPreviewScene terrainScale={terrainScale} />
      </ThreePreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">地形生成アルゴリズム</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          以下は地形生成の核となるコードです。複数オクターブのノイズ（fBm: Fractional Brownian Motion）を
          使うことで、大きな丘と細かい凹凸を同時に表現しています。
        </p>

        <CodeBlock
          language="tsx"
          title="地形生成のコア実装"
          showLineNumbers
          code={`import { useRef, useEffect } from "react";
import * as THREE from "three";

// 擬似ノイズ関数
function pseudoNoise(x: number, z: number): number {
  const dot = x * 12.9898 + z * 78.233;
  const sin = Math.sin(dot) * 43758.5453;
  return sin - Math.floor(sin);
}

// 滑らかなノイズ（バイリニア補間）
function smoothNoise(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  // Smoothstep 補間
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);

  const n00 = pseudoNoise(ix, iz);
  const n10 = pseudoNoise(ix + 1, iz);
  const n01 = pseudoNoise(ix, iz + 1);
  const n11 = pseudoNoise(ix + 1, iz + 1);

  return (n00 * (1 - ux) + n10 * ux) * (1 - uz)
       + (n01 * (1 - ux) + n11 * ux) * uz;
}

// fBm（複数オクターブ）でリアルな地形を生成
function fbmNoise(x: number, z: number, octaves = 4): number {
  let value = 0, amplitude = 1, frequency = 1, maxValue = 0;
  for (let i = 0; i < octaves; i++) {
    value += smoothNoise(x * frequency, z * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;  // 高周波ほど振幅を小さく
    frequency *= 2;     // 周波数を倍に
  }
  return value / maxValue;
}

// 地形コンポーネント
function Terrain({ scale = 1.5 }: { scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const position = geometry.attributes.position;

    // 各頂点の高さをノイズで決定
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const height = fbmNoise(x * 0.3, y * 0.3, 4) * scale * 2;
      position.setZ(i, height);
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals(); // ライティング用に法線を再計算
  }, [scale]);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[30, 30, 80, 80]} />
      <meshStandardMaterial
        color="#2D5A27"
        roughness={0.9}
        flatShading  // ローポリ感を出す
      />
    </mesh>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">空と雲の実装</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          空は大きな球体の内側にマテリアルを貼ることで表現します（<code>side: BackSide</code>）。
          雲は複数の半透明な球体を組み合わせて、もこもこした形状を作ります。
        </p>

        <CodeBlock
          language="tsx"
          title="空と雲の実装"
          showLineNumbers
          code={`// 空の球体（内側をレンダリング）
function Sky() {
  return (
    <mesh>
      <sphereGeometry args={[50, 32, 16]} />
      <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
    </mesh>
  );
}

// 雲（複数の球体で構成）
function Cloud({ position, scale }: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.5 * scale, 8, 6]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0.4 * scale, 0.1, 0]}>
        <sphereGeometry args={[0.35 * scale, 8, 6]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* さらに球を追加して自然な形に */}
    </group>
  );
}

// 霧を追加して遠方をフェードアウト
<fog attach="fog" args={["#87CEEB", 15, 40]} />`}
        />
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="空と地面のシーンを作ろう"
          description="球体の内側で空を表現し、PlaneGeometry で地面を配置するシーンを作成してください。"
          initialCode={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 空の球体（内側をレンダリング）
const skyGeo = new THREE.SphereGeometry(50, 32, 16);
const skyMat = new THREE.MeshBasicMaterial({
  color: 0x87CEEB,
  side: THREE.___,  // 内側をレンダリング
});
const sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);

// 地面
const groundGeo = new THREE.___(30, 30);
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x2D5A27,
  roughness: 0.9,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

// ライティング
scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const sun = new THREE.DirectionalLight(0xFFF8E1, 1.0);
sun.position.set(10, 15, 5);
scene.add(sun);

camera.position.set(12, 8, 12);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          answer={`const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const skyGeo = new THREE.SphereGeometry(50, 32, 16);
const skyMat = new THREE.MeshBasicMaterial({
  color: 0x87CEEB,
  side: THREE.BackSide,
});
const sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);

const groundGeo = new THREE.PlaneGeometry(30, 30);
const groundMat = new THREE.MeshStandardMaterial({
  color: 0x2D5A27,
  roughness: 0.9,
});
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const sun = new THREE.DirectionalLight(0xFFF8E1, 1.0);
sun.position.set(10, 15, 5);
scene.add(sun);

camera.position.set(12, 8, 12);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);`}
          keywords={['BackSide', 'PlaneGeometry(']}
          hints={[
            'THREE.BackSide を使うと球体の内側がレンダリングされます',
            '地面は PlaneGeometry(幅, 奥行き) で作成します',
            '地面は rotation.x = -Math.PI / 2 で水平に配置します',
          ]}
          preview
        />
      </div>

      <div className="mt-8">
        <InfoBox type="info" title="LOD（Level of Detail）について">
          <p className="mb-2">
            大きな地形を扱う場合、すべてを高解像度でレンダリングするとパフォーマンスが低下します。
            LOD（Level of Detail）は、カメラからの距離に応じて詳細度を切り替えるテクニックです。
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>近距離</strong>: セグメント数が多い高解像度メッシュ
            </li>
            <li>
              <strong>中距離</strong>: セグメント数を減らした中解像度メッシュ
            </li>
            <li>
              <strong>遠距離</strong>: 最低限のセグメント数、または霧でフェードアウト
            </li>
            <li>
              Three.js には <code>THREE.LOD</code> クラスが用意されており、
              距離に応じた自動切り替えが可能
            </li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
