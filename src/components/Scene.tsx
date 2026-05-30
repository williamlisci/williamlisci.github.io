import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import UFO from "./UFO";

const Scene: React.FC = () => (
  <Canvas
    className="w-full h-full pointer-events-auto"
    style={{ touchAction: "auto" }}
    camera={{ position: [0, 2, 10], fov: 58 }}
    dpr={[1, 1.25]}
    gl={{
      antialias: false,
      powerPreference: "high-performance",
    }}
  >
    <color attach="background" args={["#000008"]} />

    {/* Lighting */}
    <ambientLight intensity={0.3} />

    <directionalLight color="#88aaff" intensity={1.4} position={[10, 10, 5]} />

    {/* Optimized starfield */}
    <Stars
      radius={100}
      depth={50}
      count={1500}
      factor={3}
      saturation={0}
      fade
      speed={0.3}
    />

    {/* Gas Giant */}
    <group position={[-40, 20, -80]} rotation={[0.2, -0.4, 0.5]}>
      <mesh>
        <sphereGeometry args={[12, 24, 24]} />
        <meshStandardMaterial color="#4466aa" metalness={0.2} roughness={0.8} />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[22, 0.8, 8, 48]} />
        <meshBasicMaterial color="#88aacc" transparent opacity={0.35} />
      </mesh>

      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[26, 1.2, 8, 48]} />
        <meshBasicMaterial color="#6688aa" transparent opacity={0.18} />
      </mesh>
    </group>

    {/* Distant Moon */}
    <mesh position={[50, -10, -100]}>
      <sphereGeometry args={[6, 16, 16]} />
      <meshStandardMaterial color="#995544" metalness={0.1} roughness={0.9} />
    </mesh>

    <UFO />

    <OrbitControls
      enablePan={false}
      enableZoom
      enableDamping
      dampingFactor={0.05}
      autoRotate
      autoRotateSpeed={0.3}
      minDistance={5}
      maxDistance={18}
      maxPolarAngle={Math.PI * 0.6}
      minPolarAngle={Math.PI * 0.4}
    />

    <EffectComposer>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.6}
        blendFunction={BlendFunction.ADD}
      />

      <Vignette eskil={false} offset={0.2} darkness={0.8} />
    </EffectComposer>
  </Canvas>
);

export default Scene;
