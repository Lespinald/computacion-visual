import { useState, Suspense } from 'react'
import './App.css'

import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'

import { OBJLoader } from 'three-stdlib'
import { STLLoader } from 'three-stdlib'

import Horse from '../public/Horse'

// Cat OBJ loader
function CatModel(props) {
  const obj = useLoader(OBJLoader, '/cat.obj')
  return <primitive object={obj} {...props} />
}

// STL model loader
function STLModel(props) {
  const geometry = useLoader(STLLoader, '/model.stl')
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}  // Same rotation fix
      position={[0, -1, 0]}            // Adjust height
      {...props}
    >
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function App() {
  const [activeModel, setActiveModel] = useState('horse')

  return (
    <>
      {/* Dropdown to switch models */}
      <div style={{ position: 'absolute', zIndex: 1, top: 10, left: 10 }}>
        <select onChange={(e) => setActiveModel(e.target.value)} value={activeModel}>
          <option value="horse">Horse</option>
          <option value="cat">Cat</option>
          <option value="stl">Duck</option>
        </select>
      </div>

      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={2} />
        <Suspense fallback={null}>
          {activeModel === 'horse' && <Horse scale={22} position={[0, -1, 0]} />}
          {activeModel === 'cat' && <CatModel scale={0.05} position={[0, -1, 0]} />}
          {activeModel === 'stl' && <STLModel scale={0.05} position={[0, -1, 0]} />}
        </Suspense>
        <Environment preset="sunset" />
      </Canvas>
    </>
  )
}

export default App