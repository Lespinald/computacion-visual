import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// 1️⃣ ShaderMaterial correcto
const MyShaderMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.2, 0.0, 0.0),
    screenSize: new THREE.Vector2(600, 600),
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform vec2 screenSize;
  varying vec2 vUv;
  void main() {
    vec2 st = vUv * screenSize / 600.0;
    vec3 color = vec3(st.x, st.y, 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
  `
);

// 2️⃣ Registra el material
extend({ MyShaderMaterial });

// 3️⃣ Componente Box con animación
function Box() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      {/* screenSize se pasa como prop */}
      <myShaderMaterial screenSize={[600, 600]} />
    </mesh>
  );
}

export default function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <Box />
      <OrbitControls />
    </Canvas>
    </div>
    
  );
}