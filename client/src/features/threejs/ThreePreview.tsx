import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, ReactNode, useEffect } from "react";
import { PerspectiveCamera } from "three";

/** Canvas 内部でカメラの position / fov を動的に更新する */
function CameraController({
  position,
  fov,
}: {
  position: [number, number, number];
  fov: number;
}) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    if (camera instanceof PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  }, [camera, position[0], position[1], position[2], fov]);
  return null;
}

interface ThreePreviewProps {
  children: ReactNode;
  height?: string;
  orbitControls?: boolean;
  caption?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

export default function ThreePreview({
  children,
  height = "400px",
  orbitControls = true,
  caption,
  cameraPosition = [3, 3, 3],
  cameraFov = 50,
}: ThreePreviewProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-slate-900">
      <div style={{ height }}>
        <Canvas
          camera={{ position: cameraPosition, fov: cameraFov }}
          dpr={[1, 1.5]}
        >
          <CameraController position={cameraPosition} fov={cameraFov} />
          <Suspense fallback={null}>
            {children}
            {orbitControls && <OrbitControls enableDamping />}
          </Suspense>
        </Canvas>
      </div>
      {caption && (
        <div className="px-4 py-2 text-xs text-slate-400 bg-slate-800 border-t border-slate-700">
          {caption}
        </div>
      )}
    </div>
  );
}
