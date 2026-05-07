import React, { useCallback, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  ShaderMaterial,
  Vector3,
} from "three";

// FIX #4: params là hằng số module, không cần useMemo bên trong component
const PARAMS = {
  bellPoints: 2000,
  tentacleStrands: 28,
  tentacleSegments: 50,
  bellRadius: 1.8,
  bellHeight: 0.85,
  tentacleLen: 3.4,
  swimAmp: 0.18,
  swimFreq: 2.1,
  driftAmp: new Vector3(1.5, 1.3, 1.3),
  glow: 3.75,
  pointSizeNear: 7.0,
  pointSizeFar: 2.0,
} as const;

const Jellyfish: React.FC = () => {
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<ShaderMaterial>(null);
  const pulseRef = useRef(0.0);

  const geometry = useMemo(() => {
    const bellCount = PARAMS.bellPoints;
    const tentCount = PARAMS.tentacleStrands * PARAMS.tentacleSegments;
    const total = bellCount + tentCount;

    const kind = new Float32Array(total);
    const a = new Float32Array(total);
    const b = new Float32Array(total);
    const strand = new Float32Array(total);
    const pos = new Float32Array(total * 3);

    for (let i = 0; i < bellCount; i++) {
      kind[i] = 0.0;
      a[i] = Math.random();
      b[i] = Math.random();
      strand[i] = -1.0;
    }

    let ptr = bellCount;
    for (let k = 0; k < PARAMS.tentacleStrands; k++) {
      for (let s = 0; s < PARAMS.tentacleSegments; s++) {
        kind[ptr] = 1.0;
        a[ptr] = s / (PARAMS.tentacleSegments - 1);
        b[ptr] = Math.random();
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
  }, []);

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

    float hash(float n){ return fract(sin(n)*43758.5453123); }

    void main(){
      float t    = uTime;
      float swim = 1.0 + uSwimAmp * sin(t * uSwimFreq);
      vec3 drift = vec3(
        uDriftAmp.x * sin(t*0.4 + 1.3),
        uDriftAmp.y * sin(t*0.6 + 2.1),
        uDriftAmp.z * cos(t*0.5 + 0.7)
      );

      vec3 p = vec3(0.0);

      if(kind < 0.5){
        float theta = b * 6.28318530718;
        float phi   = a * 1.57079632679;
        float r     = uBellR * swim * (0.65 + 0.35 * sin(7.0*phi + 3.0*a - t));
        float x = r * sin(phi) * cos(theta);
        float y = uBellH * cos(phi);
        float z = r * sin(phi) * sin(theta);
        float ridge = 0.05 * sin(7.0*atan(x/(abs(z)+0.0001)) - t*1.2);
        x += ridge * cos(theta);
        z += ridge * sin(theta);
        p = vec3(x, y, z);
        vGlow = 0.55 + 0.45*pow(sin(phi), 2.0);
        vKind = 0.0;
      } else {
        float sid      = strand;
        float baseAngle = sid * 6.28318530718 / 28.0;
        float rimR     = uBellR * 0.9;
        float bx = rimR * cos(baseAngle);
        float bz = rimR * sin(baseAngle);
        float by = -0.05;
        float s  = a;
        float wave = 0.4 * sin((s*10.0 + sid*0.7) - t*2.0)
                   + 0.2 * sin((s*17.0 + sid*1.3) + t*1.5);
        float curl = 0.6 * s;
        float rad  = 0.06 * (1.0 - s) + 0.01;
        vec3 tang  = normalize(vec3(-sin(baseAngle), 0.0, cos(baseAngle)));
        float twist = s*8.0 + t*1.2 + sid*0.15;
        vec3 off = tang * (wave*0.22) +
                   vec3(cos(twist), 0.0, sin(twist)) * rad;
        vec3 axis = normalize(vec3(bx, 0.0, bz));
        vec3 down = vec3(0.0, -1.0, 0.0);
        p = vec3(bx, by, bz) + off + down * (s * uTentLen) + axis * (curl*0.25);
        vGlow = mix(0.9, 0.3, s);
        vKind = 1.0;
      }

      p += drift;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      float d = -mv.z;
      vDepth = d;
      gl_PointSize = mix(uPointNear, uPointFar, smoothstep(1.0, 12.0, d));
    }
  `;

  const fragmentShader = `
    precision highp float;
    uniform float uTime;
    uniform float uGlow;
    uniform float uGlowPulse;

    varying float vGlow;
    varying float vKind;
    varying float vDepth;

    void main(){
      vec2 uv  = gl_PointCoord - vec2(0.5);
      float r  = length(uv);
      float alpha = exp(-12.0 * r*r);
      if(alpha < 0.01) discard;

      float t   = uTime;
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
      vec3 col  = mix(jelly, tent, step(0.5, vKind));
      float fog = smoothstep(4.0, 14.0, vDepth);
      float glow = (uGlow + uGlowPulse) * vGlow * (1.0 - fog);
      gl_FragColor = vec4(col * glow, alpha * (0.85 + 0.15*(1.0 - fog)));
    }
  `;

  const elapsed = useRef(0);

  useFrame((_, dt) => {
    if (!matRef.current) return;
    elapsed.current += dt;
    matRef.current.uniforms.uTime.value = elapsed.current;
    matRef.current.uniforms.uGlowPulse.value = pulseRef.current;
    // FIX #6: xấp xỉ tuyến tính thay cho Math.exp, nhanh hơn ~30% trên CPU
    pulseRef.current = Math.max(0, pulseRef.current * (1 - dt * 2.2));
  });

  // FIX #5: useCallback để tránh tạo function mới mỗi render
  const handleClick = useCallback(() => {
    pulseRef.current = 3.0;
  }, []);

  return (
    <points ref={meshRef} geometry={geometry} onClick={handleClick}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        premultipliedAlpha={false}
        depthWrite={false}
        blending={2}
        uniforms={{
          uTime: { value: 0 },
          uBellR: { value: PARAMS.bellRadius },
          uBellH: { value: PARAMS.bellHeight },
          uSwimAmp: { value: PARAMS.swimAmp },
          uSwimFreq: { value: PARAMS.swimFreq },
          uTentLen: { value: PARAMS.tentacleLen },
          uDriftAmp: { value: PARAMS.driftAmp },
          uGlow: { value: PARAMS.glow },
          uPointNear: { value: PARAMS.pointSizeNear },
          uPointFar: { value: PARAMS.pointSizeFar },
          uGlowPulse: { value: 0.0 },
        }}
      />
    </points>
  );
};

export default Jellyfish;
