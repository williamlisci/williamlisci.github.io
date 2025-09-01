// src/components/Jellyfish.tsx
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
    BufferAttribute,
    BufferGeometry,
    Mesh,
    ShaderMaterial,
    Vector3,
} from "three";

// const TAU = Math.PI * 2;

const Jellyfish: React.FC = () => {
    const meshRef = useRef<Mesh>(null);
    const materialRef = useRef<ShaderMaterial>(null);
// --- Biến ref để điều khiển hiệu ứng phát sáng ---
    const pulseRef = useRef(0.0);

    // ---- Tham số “sứa bơi” có thể tinh chỉnh nhanh ----
    const params = useMemo(()=> (
        {
            bellPoints: 2000,         // số điểm cấu thành "chuông"
            tentacleStrands: 28,      // số xúc tu
            tentacleSegments: 50,     // số điểm/đốt trên mỗi xúc tu
            bellRadius: 1.8,          // bán kính chuông
            bellHeight: 0.85,         // chiều cao bán cầu
            tentacleLen: 3.4,         // chiều dài xúc tu
            swimAmp: 0.18,            // biên độ phồng/teo chuông
            swimFreq: 2.1,            // tần số bơi (nhịp chuông)
            driftAmp: new Vector3(1.5, 1.3, 1.3), // dao động trôi
            glow: 3.75,               // cường độ phát quang
            pointSizeNear: 7.0,       // kích thước điểm gần
            pointSizeFar: 2.0,        // kích thước điểm xa
        }
    ),[]);

    // ---- Tạo hình học: trộn bell + tentacles vào 1 BufferGeometry ----
    const geometry = useMemo(() => {
        const bellCount = params.bellPoints;

        const tentCount =
            params.tentacleStrands * params.tentacleSegments;

        const total = bellCount + tentCount;

        // Thuộc tính cho shader:
        // kind: 0 = bell, 1 = tentacle
        // a, b: tham số hoá
        // strand: chỉ số xúc tu (để lệch pha)
        const kind = new Float32Array(total);
        const a = new Float32Array(total);
        const b = new Float32Array(total);
        const strand = new Float32Array(total);

        // Dummy positions (tính vị trí thực trong vertex shader)
        const pos = new Float32Array(total * 3);

        // Bell (bán cầu: u in [0,1], v in [0,1))
        for (let i = 0; i < bellCount; i++) {
            const u = Math.random();         // vĩ độ chuẩn hoá
            const v = Math.random();         // kinh độ chuẩn hoá
            kind[i] = 0.0;
            a[i] = u;
            b[i] = v;
            strand[i] = -1.0;                // không dùng
        }

        // Tentacles: s in [0..1] dọc thân; idxStrand = 0..N-1
        let ptr = bellCount;
        for (let k = 0; k < params.tentacleStrands; k++) {
            for (let s = 0; s < params.tentacleSegments; s++) {
                const t = s / (params.tentacleSegments - 1);
                kind[ptr] = 1.0;
                a[ptr] = t;            // vị trí dọc xúc tu
                b[ptr] = Math.random(); // lệch nhỏ cho “lông tơ”
                strand[ptr] = k;
                ptr++;
            }
        }

        const geo = new BufferGeometry();
        geo.setAttribute("position", new BufferAttribute(pos, 3));
        geo.setAttribute("kind", new BufferAttribute(kind, 1));
        geo.setAttribute("a", new BufferAttribute(a, 1));
        geo.setAttribute("b", new BufferAttribute(b, 1));
        geo.setAttribute("strand", new BufferAttribute(strand, 1));
        return geo;
    }, [params]);

    // ---- Shaders ----
    const vertexShader = `
    uniform float uTime;
    uniform float uBellR;
    uniform float uBellH;
    uniform float uSwimAmp;
    uniform float uSwimFreq;
    uniform float uTentLen;
    uniform vec3  uDriftAmp;
    uniform float uPointNear;
    uniform float uPointFar;

    attribute float kind;
    attribute float a;
    attribute float b;
    attribute float strand;

    varying float vGlow;
    varying float vKind;
    varying float vDepth;

    // Hash noise đơn giản
    float hash(float n){ return fract(sin(n)*43758.5453123); }

    void main(){
      float t = uTime;

      // Nhịp bơi: phồng/teo + dao động trôi (drift) theo xyz
      float swim = 1.0 + uSwimAmp * sin(t * uSwimFreq);
      vec3 drift = vec3(
        uDriftAmp.x * sin(t*0.4 + 1.3),
        uDriftAmp.y * sin(t*0.6 + 2.1),
        uDriftAmp.z * cos(t*0.5 + 0.7)
      );

      vec3 p = vec3(0.0);

      if(kind < 0.5){
        // ---- BELL (bán cầu) ----
        // a=u in [0..1] ~ vĩ độ; b=v in [0..1] ~ kinh độ
        float theta = b * 6.28318530718; // 2π
        float phi   = a * 1.57079632679; // 0..π/2
        float r     = uBellR * swim * (0.65 + 0.35 * sin(7.0*phi + 3.0*a - t));
        float x = r * sin(phi) * cos(theta);
        float y = uBellH * cos(phi);
        float z = r * sin(phi) * sin(theta);

        // gợn bề mặt (gợi ý từ “7 arctan(k/e)” trong ảnh)
        float ridge = 0.05 * sin(7.0*atan(x/(abs(z)+0.0001)) - t*1.2);
        x += ridge * cos(theta);
        z += ridge * sin(theta);

        p = vec3(x,y,z);

        // phát sáng mạnh hơn phía rìa
        vGlow = 0.55 + 0.45*pow(sin(phi), 2.0);
        vKind = 0.0;

      } else {
        // ---- TENTACLE ----
        // a=s in [0..1] dọc thân; strand định pha
        float sid = strand;
        float baseAngle = sid * 6.28318530718 / 28.0;

        // điểm gắn xúc tu quanh viền chuông
        float rimR = uBellR * 0.9;
        float bx = rimR * cos(baseAngle);
        float bz = rimR * sin(baseAngle);
        float by = -0.05;

        // đường cong xúc tu (curve) với uốn sóng theo thời gian
        float s = a;                       // 0..1
        float wave = 0.4 * sin( (s*10.0 + sid*0.7) - t*2.0 )
                   + 0.2 * sin( (s*17.0 + sid*1.3) + t*1.5 );
        float curl = 0.6 * s;              // cong về cuối
        float rad  = 0.06 * (1.0 - s) + 0.01;

        // hướng tiếp tuyến quanh chuông
        vec3 tang = normalize(vec3(-sin(baseAngle), 0.0, cos(baseAngle)));

        // offset quanh tiếp tuyến + xoắn nhẹ quanh trục xúc tu
        float twist = s*8.0 + t*1.2 + sid*0.15;
        vec3 off = tang * (wave*0.22) +
                   vec3(cos(twist), 0.0, sin(twist)) * rad;

        // trục chính đi xuống
        vec3 axis = normalize(vec3(bx, 0.0, bz));
        vec3 down = vec3(0.0, -1.0, 0.0);

        p = vec3(bx, by, bz) + off + down * (s * uTentLen)
            + axis * (curl*0.25);

        // phát sáng mạnh ở đầu xúc tu
        vGlow = mix(0.9, 0.3, s);
        vKind = 1.0;
      }

      // trôi toàn cục
      p += drift;

      // ---- Project ----
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;

      // Kích thước điểm theo khoảng cách (giảm khi xa)
      float d = -mv.z;
      vDepth = d;
      float sz = mix(uPointNear, uPointFar, smoothstep(1.0, 12.0, d));
      gl_PointSize = sz;
    }
  `;

    // --- CẬP NHẬT FRAGMENT SHADER ---
    const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform float uGlow;
    uniform float uGlowPulse; // <-- Thêm uniform mới cho hiệu ứng "chạm"

    varying float vGlow;
    varying float vKind;
    varying float vDepth;

    void main(){
      // hình tròn mềm cho mỗi điểm
      vec2 uv = gl_PointCoord - vec2(0.5);
      float r = length(uv);
      float alpha = exp(-12.0 * r*r);
      if(alpha < 0.01) discard;

      // phối màu động (jelly bioluminescence)
      float t = uTime;
      vec3 jelly = vec3(
        0.55 + 0.45*sin(t*0.7 + 0.0),
        0.70 + 0.30*sin(t*1.1 + 2.0),
        0.85 + 0.15*sin(t*1.7 + 4.0)
      );

      vec3 tent = vec3(
        0.90 + 0.10*sin(t*0.9 + 1.0),
        0.50 + 0.50*sin(t*1.3 + 3.0),
        0.60 + 0.40*sin(t*1.9 + 5.0)
      );

      vec3 col = mix(jelly, tent, step(0.5, vKind));

      // làm tối theo chiều sâu nhẹ để tạo cảm giác 3D
      float fog = smoothstep(4.0, 14.0, vDepth);

      // phát quang tổng hợp
      float glow = (uGlow + uGlowPulse) * vGlow * (1.0 - fog); 
      vec3 outCol = col * glow;

      gl_FragColor = vec4(outCol, alpha * (0.85 + 0.15*(1.0 - fog)));
    }
  `;

    // ---- Đồng bộ thời gian ----
    const elapsed = useRef(0);

    useFrame((_, dt) => {
        if (!materialRef.current) return;
        elapsed.current += dt;
        materialRef.current.uniforms.uTime.value = elapsed.current;
        materialRef.current.uniforms.uGlowPulse.value = pulseRef.current;
        pulseRef.current *= Math.exp(-dt * 2.0); // Giảm dần pulse
    });
    // --- Hàm xử lý sự kiện click ---
    const handleClick = () => {
        // Khi click, đặt giá trị pulse lên cao để kích hoạt hiệu ứng
        pulseRef.current = 3.0; // Độ sáng bùng phát, có thể điều chỉnh
    };

    return (
        <points ref={meshRef} geometry={geometry} onClick={handleClick} >
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent
                premultipliedAlpha={false}
                depthWrite={false}
                blending={2} // AdditiveBlending
                uniforms={{
                    uTime: { value: 0 },
                    uBellR: { value: params.bellRadius },
                    uBellH: { value: params.bellHeight },
                    uSwimAmp: { value: params.swimAmp },
                    uSwimFreq: { value: params.swimFreq },
                    uTentLen: { value: params.tentacleLen },
                    uDriftAmp: { value: params.driftAmp },
                    uGlow: { value: params.glow },
                    uPointNear: { value: params.pointSizeNear },
                    uPointFar: { value: params.pointSizeFar },
                    uGlowPulse: { value: 0.0 },
                }}
            />
        </points>
    );
};

export default Jellyfish;
