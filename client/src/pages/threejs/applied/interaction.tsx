import { useState } from "react";
import PageLayout from "@/features/threejs/PageLayout";
import WhyNowBox from "@/components/WhyNowBox";
import InfoBox from "@/components/InfoBox";
import CodeBlock from "@/components/CodeBlock";
import CodeWithPreview from "@/features/threejs/CodeWithPreview";
import CodingChallenge from "@/components/CodingChallenge";

// インタラクティブなボックスコンポーネント
function InteractiveBox({
  position,
  color,
  hoverColor,
}: {
  position: [number, number, number];
  color: string;
  hoverColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      position={position}
      scale={hovered ? 1.2 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={clicked ? "#FBBF24" : hovered ? hoverColor : color}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  );
}

export default function InteractionPage() {
  return (
    <PageLayout>
      <h1 className="mb-6">インタラクション</h1>

      <WhyNowBox tags={["Raycaster", "クリック検出", "ホバー検出"]}>
        <p>
          3D シーンにインタラクション（操作への反応）を加えることで、
          ユーザーが 3D オブジェクトをクリックしたり、ホバーしたりして
          操作できるようになります。
        </p>
        <p>
          インタラクションは 3D を「見るだけ」から「使えるもの」に変える重要な技術です。
        </p>
      </WhyNowBox>

      <h2 className="text-2xl font-bold mb-4">Raycaster の仕組み</h2>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        3D シーンでのクリック・ホバー検出には <code>Raycaster</code>（レイキャスター）を使います。
        カメラの位置からマウスカーソルの方向に見えない「光線（レイ）」を発射し、
        その光線がどのオブジェクトと交差するかを計算する仕組みです。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">1. レイの発射</h4>
          <p className="text-sm text-muted-foreground">
            マウス座標をカメラの視点から 3D 空間の方向に変換し、
            光線（レイ）を作成します。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">2. 交差判定</h4>
          <p className="text-sm text-muted-foreground">
            レイがシーン内のどのオブジェクトと交差するかを
            計算し、結果を距離順に返します。
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h4 className="font-semibold text-primary mb-2">3. イベント処理</h4>
          <p className="text-sm text-muted-foreground">
            交差したオブジェクトに対して、色の変更やアニメーションなど
            任意の処理を実行します。
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3">Raycaster のコード</h2>
      <p className="text-sm text-muted-foreground mb-4">
        ボックスにマウスを乗せると色が変わり、大きくなります。
        クリックすると黄色に切り替わります。R3F の <code>onPointerOver</code> / <code>onPointerOut</code> / <code>onClick</code> イベントを使用しています。
      </p>

      <CodeWithPreview
        language="javascript"
        title="Three.js での Raycaster セットアップ"
        caption="ボックスをホバー・クリックしてみてください"
        cameraPosition={[4, 3, 4]}
        code={`const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// マウス座標を正規化（-1 〜 1）
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// クリックイベント
window.addEventListener('click', () => {
  raycaster.setFromCamera(mouse, camera);

  // シーン内のオブジェクトとの交差判定
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    console.log('クリックされた:', clickedObject);

    // 色を変更する例
    clickedObject.material.color.set(0xff0000);
  }
});

// ホバー検出（アニメーションループ内で実行）
function animate() {
  requestAnimationFrame(animate);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  // 全オブジェクトをリセット
  scene.children.forEach((obj) => {
    if (obj.material) obj.material.emissive?.setHex(0x000000);
  });

  // ホバー中のオブジェクトをハイライト
  if (intersects.length > 0) {
    intersects[0].object.material.emissive?.setHex(0x333333);
  }

  renderer.render(scene, camera);
}`}
      >
        <InteractiveBox position={[-1.5, 0.5, 0]} color="#4F46E5" hoverColor="#818CF8" />
        <InteractiveBox position={[0, 0.5, 0]} color="#059669" hoverColor="#34D399" />
        <InteractiveBox position={[1.5, 0.5, 0]} color="#DC2626" hoverColor="#F87171" />
        <InteractiveBox position={[-0.75, 0.5, -1.5]} color="#7C3AED" hoverColor="#A78BFA" />
        <InteractiveBox position={[0.75, 0.5, -1.5]} color="#EA580C" hoverColor="#FB923C" />

        {/* 床 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="#374151" roughness={0.9} />
        </mesh>

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
      </CodeWithPreview>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">R3F でのインタラクション</h2>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          React Three Fiber では、Raycaster のセットアップが不要で、
          HTML 要素と同じように <code>onClick</code>、<code>onPointerOver</code>、
          <code>onPointerOut</code> などのイベントプロパティを直接使えます。
        </p>

        <CodeBlock
          language="tsx"
          title="R3F でのイベントハンドリング"
          showLineNumbers
          code={`function InteractiveBox() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      scale={hovered ? 1.2 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={(e) => {
        e.stopPropagation(); // イベント伝播を止める
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={clicked ? 'yellow' : hovered ? 'hotpink' : 'blue'}
      />
    </mesh>
  );
}`}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="warning" title="Raycasting のパフォーマンスヒント">
          <p>
            Raycaster は毎フレーム全オブジェクトとの交差判定を行うため、
            オブジェクト数が多いとパフォーマンスに影響します。以下の対策が有効です。
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <code>intersectObjects</code> の対象を限定する（全 children ではなくインタラクティブなオブジェクトのみ）
            </li>
            <li>
              <code>layers</code> を使って判定対象をグループ分けする
            </li>
            <li>
              複雑なメッシュの場合、簡易な BoundingBox で事前判定する
            </li>
            <li>
              <code>e.stopPropagation()</code> でイベント伝播を止め、不要な判定を省く
            </li>
          </ul>
        </InfoBox>
      </div>

      <div className="mt-8">
        <CodingChallenge
          title="Raycaster を使ったクリック検出"
          description="Raycaster を作成し、マウスクリックで 3D オブジェクトの色を赤に変更するコードの空欄を埋めてください。"
          preview
          initialCode={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// ボックスを3つ配置
const geometry = new THREE.BoxGeometry(1, 1, 1);
for (let i = -1; i <= 1; i++) {
  const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
  const box = new THREE.Mesh(geometry, material);
  box.position.x = i * 2;
  scene.add(box);
}
renderer.render(scene, camera);

const raycaster = new THREE.___();
const mouse = new THREE.___();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
  raycaster.___(mouse, camera);

  const intersects = raycaster.___(scene.children);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    obj.material.color.set(0xff0000);
    renderer.render(scene, camera);
  }
});`}
          answer={`// シーンのセットアップ
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// ボックスを3つ配置
const geometry = new THREE.BoxGeometry(1, 1, 1);
for (let i = -1; i <= 1; i++) {
  const material = new THREE.MeshBasicMaterial({ color: 0x4F46E5 });
  const box = new THREE.Mesh(geometry, material);
  box.position.x = i * 2;
  scene.add(box);
}
renderer.render(scene, camera);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const obj = intersects[0].object;
    obj.material.color.set(0xff0000);
    renderer.render(scene, camera);
  }
});`}
          hints={[
            'レイキャスターは THREE.Raycaster() で作成します',
            'マウス座標は THREE.Vector2() で保持します',
            'setFromCamera(mouse, camera) でレイの方向を設定します',
            'intersectObjects() で交差するオブジェクトを取得します',
          ]}
          keywords={['Raycaster()', 'Vector2()', 'setFromCamera(', 'intersectObjects(']}
        />
      </div>

      <div className="mt-8">
        <InfoBox type="success" title="まとめ">
          <ul className="list-disc list-inside space-y-1">
            <li>Raycaster でカメラからレイを発射し、クリック・ホバーを検出</li>
            <li>R3F では onClick / onPointerOver / onPointerOut を直接使える</li>
            <li>e.stopPropagation() でイベントの伝播を制御</li>
            <li>cursor スタイルの変更でユーザーに操作可能であることを伝える</li>
            <li>対象オブジェクトを限定してパフォーマンスを維持</li>
          </ul>
        </InfoBox>
      </div>
    </PageLayout>
  );
}
