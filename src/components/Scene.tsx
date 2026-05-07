import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Jellyfish from "./Jellyfish";
import * as THREE from "three";

const Plankton: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  // FIX #10: dùng clock.elapsedTime thay vì tự cộng dồn ref
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        color="#88ffee"
        transparent
        opacity={0.7}
      />
    </points>
  );
};

// FIX #1: Xóa FogBackground – component này chỉ vẽ khối cầu đen không hiệu ứng
// Fragment shader có bug: mix(black, black, n) = black, uTime cũng không được update.

const Scene: React.FC = () => {
  return (
    // FIX #2, #3, #4: dpr giới hạn + gl settings + camera khớp minDistance
    <Canvas
      className="w-full h-full pointer-events-auto"
      style={{ touchAction: "none" }}
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.2} />
      <Jellyfish />
      <Plankton />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={7}
        maxDistance={13}
        enableDamping
        dampingFactor={0.05}
        autoRotate
        autoRotateSpeed={0.3}
      />
      <EffectComposer>
        {/* FIX #8: tăng intensity lên để hiệu ứng rõ hơn xứng với chi phí render pass */}
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.5}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;