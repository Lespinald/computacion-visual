import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function AnimatedSphere() {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    const radius = 2
    meshRef.current.position.x = radius * Math.sin(t)
    meshRef.current.position.y = radius * Math.cos(t)

    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01

    const scale = 1 + 0.3 * Math.sin(t*2)
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}

export default function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <ambientLight intensity={0.4}/>
        <directionalLight position={[0, 0.5, 1]} intensity={1}/>
        <directionalLight position={[0, 1, 0]} intensity={1}/>
        <AnimatedSphere/>
        <OrbitControls makeDefault/>
      </Canvas>
    </div>
  )
}

