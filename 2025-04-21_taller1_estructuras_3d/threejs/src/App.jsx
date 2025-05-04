import { useState, Suspense } from 'react'

import './App.css'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Earth from '../public/Earth'

function App() {
  const [count, setCount] = useState(0)
  return(
  <>
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <OrbitControls enableZoom={false}/>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
      <Environment preset='sunset' />
    </Canvas>
  </>)
  
}

export default App
