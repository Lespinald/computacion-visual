import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Leva, useControls } from 'leva'

function GroupStructure() {
  // Real-time controls for parent group transformation
  const { rotX, rotY, rotZ, posX, posY, posZ } = useControls({
    rotX: { value: 0, min: -Math.PI, max: Math.PI },
    rotY: { value: 0, min: -Math.PI, max: Math.PI },
    rotZ: { value: 0, min: -Math.PI, max: Math.PI },
    posX: { value: 0, min: -5, max: 5 },
    posY: { value: 0, min: -5, max: 5 },
    posZ: { value: 0, min: -5, max: 5 }
  })

  return (
    <group position={[posX, posY, posZ]} rotation={[rotX, rotY, rotZ]}>
      {/* Parent group transformation will affect all children */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="tomato" />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  )
}

function App() {
  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Leva collapsed />
      <Canvas camera={{ position: [5, 5, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        <GroupStructure />
      </Canvas>
    </div>
  )
}

export default App
