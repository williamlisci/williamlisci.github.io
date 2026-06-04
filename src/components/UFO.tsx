import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function cruisePosition(t: number, out: THREE.Vector3) {
  out.set(
    3.2 * Math.sin(t * 0.41),
    1.2 * Math.sin(t * 0.27 + 1.1),
    2.8 * Math.sin(t * 0.82 + 0.5),
  );
}

const _desired = new THREE.Vector3();

const UFO: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ringMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const exhaustRef = useRef<THREE.PointLight>(null);

  useFrame((_, dt) => {
    if (!groupRef.current) return;

    const t = performance.now() * 0.001;

    // Smooth movement through space
    cruisePosition(t, _desired);
    groupRef.current.position.lerp(_desired, 1 - Math.exp(-1.4 * dt));

    // Always stay perfectly level
    groupRef.current.rotation.set(0, 0, 0);

    // Pulse underside ring and main light
    const pulse = 2.2 + 1.1 * Math.sin(t * 2.6);

    if (ringMatRef.current) {
      ringMatRef.current.emissiveIntensity = pulse;
    }

    if (lightRef.current) {
      lightRef.current.intensity = pulse * 1.6;
    }

    // Exhaust throb
    if (exhaustRef.current) {
      exhaustRef.current.intensity = 1.2 + 0.8 * Math.sin(t * 7.5);
    }
  });

  const RIM_COUNT = 14;
  const RIM_RADIUS = 1.28;

  return (
    <group ref={groupRef}>
      {/* Main disc hull */}
      <mesh>
        <cylinderGeometry args={[1.35, 1.5, 0.22, 64]} />
        <meshStandardMaterial
          color="#1a1e2e"
          metalness={0.88}
          roughness={0.14}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Top bevel ring */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.1, 1.35, 0.12, 64]} />
        <meshStandardMaterial
          color="#20243a"
          metalness={0.92}
          roughness={0.12}
        />
      </mesh>

      {/* Central dome */}
      <mesh position={[0, 0.24, 0]}>
        <sphereGeometry
          args={[0.72, 48, 24, 0, Math.PI * 2, 0, Math.PI * 0.52]}
        />
        <meshStandardMaterial
          color="#2a3050"
          metalness={0.7}
          roughness={0.18}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Dome inner glow */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry
          args={[0.62, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]}
        />
        <meshStandardMaterial
          color="#3355aa"
          emissive="#1133cc"
          emissiveIntensity={1.1}
          transparent
          opacity={0.4}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Underside glow ring */}
      <mesh position={[0, -0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.14, 24, 96]} />
        <meshStandardMaterial
          ref={ringMatRef}
          color="#aaddff"
          emissive="#55ccff"
          emissiveIntensity={2.2}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      {/* Outer accent ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.42, 0.025, 8, 96]} />
        <meshStandardMaterial
          color="#88aacc"
          emissive="#4488bb"
          emissiveIntensity={1.0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Panel grooves */}
      {[0.6, 0.9, 1.18].map((r, i) => (
        <mesh key={i} position={[0, 0.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r, 0.008, 6, 64]} />
          <meshStandardMaterial
            color="#2a3050"
            emissive="#223366"
            emissiveIntensity={0.4}
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Rim portal lights */}
      {Array.from({ length: RIM_COUNT }).map((_, i) => {
        const angle = (i / RIM_COUNT) * Math.PI * 2;
        const isAlt = i % 2 === 0;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * RIM_RADIUS,
              -0.02,
              Math.sin(angle) * RIM_RADIUS,
            ]}
          >
            <sphereGeometry args={[0.048, 8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive={isAlt ? "#88ddff" : "#ffffff"}
              emissiveIntensity={isAlt ? 3.5 : 5.5}
            />
          </mesh>
        );
      })}

      <pointLight
        ref={lightRef}
        color="#66ccff"
        intensity={5.5}
        distance={7}
        decay={2}
        position={[0, -0.5, 0]}
      />

      <pointLight
        color="#4466ff"
        intensity={0.9}
        distance={2}
        decay={2}
        position={[0, 0.6, 0]}
      />

      <pointLight
        ref={exhaustRef}
        color="#88aaff"
        intensity={1.5}
        distance={3}
        decay={2}
        position={[0, -0.3, 0]}
      />
    </group>
  );
};

export default UFO;
