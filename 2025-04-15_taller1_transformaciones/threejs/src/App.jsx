import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef()
  const clock = new THREE.Clock()

  useFrame(() => {
    const t = clock.getElapsedTime()

    // Movimiento circular
    const radius = 2
    meshRef.current.position.x = radius * Math.sin(t)
    meshRef.current.position.y = radius * Math.cos(t)

    // Rotación
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01

    // Escala pulsante
    const scale = 1 + 0.3 * Math.sin(t * 2)
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 16, 16]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [100, 100, 5], fov: 1060 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={1} />
      <AnimatedSphere />
      <OrbitControls />
    </Canvas>
  )
}

