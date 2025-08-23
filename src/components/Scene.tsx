// src/components/Scene.tsx
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LuminousJellyfish from '../components/LuminousJellyfish';

const Scene = () => {
    return (
        <Canvas camera={{ position: [3, 3, 3], fov: 75 }}>
            <ambientLight intensity={0.1} />
            <pointLight position={[10, 10, 10]} color="#00ffff" intensity={0.5} />

            <Suspense fallback={null}>
                <LuminousJellyfish />
            </Suspense>

            <OrbitControls enableZoom={true} />
        </Canvas>
    );
};

export default Scene;
