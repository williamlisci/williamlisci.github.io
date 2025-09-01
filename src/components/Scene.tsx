import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Jellyfish from "./Jellyfish";
import * as THREE from "three";

// Optimized Plankton Particles
const Plankton: React.FC = () => {
    const ref = useRef<THREE.Points>(null);
    const count = 200; // Reduced particle count
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 20;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.02;
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

// Simplified Fog Background
const FogBackground: React.FC = () => {
    return (
        <mesh scale={[50, 50, 50]}>
            <sphereGeometry args={[1, 16, 16]} /> {/* Reduced geometry detail */}
            <shaderMaterial
                side={THREE.BackSide}
                uniforms={{ uTime: { value: 0 } }}
                vertexShader={`
                    varying vec3 vPos;
                    void main() {
                        vPos = position;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
                fragmentShader={`
                    varying vec3 vPos;
                    uniform float uTime;
                    float hash(vec3 p) {
                        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
                    }
                    float noise(vec3 p) {
                        vec3 i = floor(p);
                        vec3 f = fract(p);
                        return mix(
                            mix(
                                mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                                mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y
                            ),
                            mix(
                                mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                                mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y
                            ), f.z
                        );
                    }
                    void main() {
                        float n = noise(normalize(vPos) * 2.0 + uTime * 0.05);
                        // Thay đổi giá trị màu từ vec3(0.0,0.4,0.5) thành vec3(0.0) để có màu đen thuần túy hơn
                        gl_FragColor = vec4(mix(vec3(0.0), vec3(0.0), n), 1.0);
                    }
                `}
            />
        </mesh>
    );
};

// Optimized Scene
const Scene: React.FC = () => {
    return (
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
            {/* Đổi màu nền Canvas thành đen tuyền */}
            <color attach="background" args={["#000000"]} />
            <ambientLight intensity={0.2} />
            <Jellyfish />
            <Plankton />
            <FogBackground />
            <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={7}
                maxDistance={13}
                autoRotate
                autoRotateSpeed={0.3}
            />
            <EffectComposer>
                <Bloom
                    intensity={0.2} // Reduced intensity
                    luminanceThreshold={0.5}
                    luminanceSmoothing={0.5}
                    blendFunction={BlendFunction.ADD}
                />
            </EffectComposer>
        </Canvas>
    );
};

export default Scene;
