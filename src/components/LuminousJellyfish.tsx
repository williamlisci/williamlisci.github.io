// src/LuminousJellyfish.tsx
import {useRef, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import {BufferAttribute, BufferGeometry, Mesh, ShaderMaterial} from "three";

const LuminousJellyfish = () => {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<ShaderMaterial>(null);

    const params = useRef({
        time: 0.1,
        speed: 0.1,

        // Thay đổi kích thước
        scale: 2.0,

        // Điều chỉnh độ sáng
        glowIntensity: 3.0,
        // Tham số Lissajous
        a: 13.2, b: 13.2, c: 13.1, d: Math.PI / 2, e: 0,
        // Các tham số này xác định kích thước hoặc độ lớn của đường cong theo mỗi trục.
        ampX: 2.5, ampY: 1.5, ampZ: 3.5
    });

    const geometry = useMemo(() => {
        const points = [];
        const numPoints = 10000;
        const totalLength = Math.PI * 16;

        for (let i = 0; i < numPoints; i++) {
            const t = (i / numPoints) * totalLength;
            const x = params.current.ampX * Math.sin(params.current.a * t + params.current.d);
            const y = params.current.ampY * Math.sin(params.current.b * t + params.current.e);
            const z = params.current.ampZ * Math.cos(params.current.c * t);
            points.push(x, y, z);
        }

        const newGeometry = new BufferGeometry();
        newGeometry.setAttribute('position', new BufferAttribute(new Float32Array(points), 3));
        return newGeometry;
    }, []);

    // Vertex Shader (Đã sửa)
    const vertexShader = `
    void main() {
      // Thiết lập kích thước của mỗi điểm để hiệu ứng trong fragment shader có thể hiển thị
      gl_PointSize = 5.0; 

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

    // Fragment Shader (Không thay đổi)
    const fragmentShader = `
    uniform float time;
    uniform float glowIntensity;
    
    void main() {
      float dist = length(gl_PointCoord - vec2(0.5, 0.5));
      float glow = exp(-dist * glowIntensity);
      
      // vec3 color = vec3(
      //   0.5 + 0.5 * sin(time * 0.5),
      //   0.5 + 0.5 * sin(time * 0.5 + 2.0),
      //   0.5 + 0.5 * sin(time * 0.5 + 4.0)
      // );
      // Thay đổi công thức màu
        vec3 color = vec3(
          sin(time),        // R
          cos(time * 1.5), // G
          sin(time * 2.0)  // B
        );
      gl_FragColor = vec4(color * glow, glow);
    }
  `;

    useFrame((_state, delta) => {
        if (materialRef.current && materialRef.current.uniforms) {
            params.current.time += delta * params.current.speed;
            materialRef.current.uniforms.time.value = params.current.time;
        }
    });


    return (
        <points ref={meshRef} geometry={geometry}>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    time: {value: params.current.time},
                    glowIntensity: {value: params.current.glowIntensity}
                }}
                transparent
                depthWrite={false}
            />
        </points>
    );
};

export default LuminousJellyfish;
