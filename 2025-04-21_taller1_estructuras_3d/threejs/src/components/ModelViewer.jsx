import { useLoader } from '@react-three/fiber'
import { useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Edges, Points } from '@react-three/drei'
import * as THREE from 'three'
import { Html } from '@react-three/drei'

function ModelViewer() {
  const gltf = useLoader(GLTFLoader, '/modelo.glb')
  const [mode, setMode] = useState('normal') // 'normal', 'edges', 'points'

  const geometry = gltf.scene.children[0].geometry

  // Para bonus: obtener información básica
  const vertices = geometry.attributes.position.count

  return (
    <>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="orange" wireframe={mode === 'wireframe'} />
        {mode === 'edges' && <Edges />}
        {mode === 'points' && (
          <Points>
            <pointsMaterial color="red" size={0.02} />
          </Points>
        )}
      </mesh>

      <Html position={[0, -1.5, 0]}>
        <div style={{ background: 'white', padding: '10px', borderRadius: '8px' }}>
          <h4>Modo: {mode}</h4>
          <p>Vértices: {vertices}</p>
          <button onClick={() => setMode('normal')}>Normal</button>
          <button onClick={() => setMode('edges')}>Aristas</button>
          <button onClick={() => setMode('points')}>Puntos</button>
          <button onClick={() => setMode('wireframe')}>Wireframe</button>
        </div>
      </Html>
    </>
  )
}

export default ModelViewer