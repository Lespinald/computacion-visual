import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import glsl from "babel-plugin-glsl/macro"; // Para escribir shaders inline

// Vertex shader
const vertexShader = glsl`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader
const fragmentShader = glsl`
  uniform vec2 screenSize;
  varying vec2 vUv;
  void main() {
    vec2 st = vUv * screenSize / 600.0;
    vec3 color = vec3(st.x, st.y, 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Creamos un shaderMaterial con drei
const MyShaderMaterial = shaderMaterial(
  { screenSize: new THREE.Vector2(600, 600) },
  vertexShader,
  fragmentShader
);

// Haz que Fiber lo reconozca como material
extend({ MyShaderMaterial });

function Box() {
  const meshRef = useRef();

  // Rotación animada
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <myShaderMaterial screenSize={[600, 600]} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}