import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { button, folder, useControls } from "leva";
import "./App.css";

// BOX Component with controls
function TweakableBox() {
  const [{ scale, position, color, wireframe }, set] = useControls("Box", () => ({
    transform: folder({
      scale: { value: 1, min: 0.4, max: 4, step: 0.2 },
      position: [0, 0, 0],
    }),
    material: folder({
      color: "#333",
      wireframe: false,
    }),
    reset: button(() =>
      set({
        scale: 1,
        position: [0, 0, 0],
        color: "#333",
        wireframe: false,
      })
    ),
  }));

  return (
    <Box scale={scale} position={position}>
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </Box>
  );
}

// SPHERE Component with controls
function TweakableSphere() {
  const [{ scale, position, color, wireframe }, set] = useControls("Sphere", () => ({
    transform: folder({
      scale: { value: 0.7, min: 0.4, max: 4, step: 0.2 },
      position: [2, 0, 0],
    }),
    material: folder({
      color: "orange",
      wireframe: false,
    }),
    reset: button(() =>
      set({
        scale: 0.7,
        position: [2, 0, 0],
        color: "orange",
        wireframe: false,
      })
    ),
  }));

  return (
    <mesh scale={scale} position={position}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

// CYLINDER Component with controls
function TweakableCylinder() {
  const [{ scale, position, color, wireframe }, set] = useControls("Cylinder", () => ({
    transform: folder({
      scale: { value: 1, min: 0.4, max: 4, step: 0.2 },
      position: [-2, 0, 0],
    }),
    material: folder({
      color: "skyblue",
      wireframe: false,
    }),
    reset: button(() =>
      set({
        scale: 1,
        position: [-2, 0, 0],
        color: "skyblue",
        wireframe: false,
      })
    ),
  }));

  return (
    <mesh scale={scale} position={position}>
      <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </mesh>
  );
}

// Main scene
function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />

      <TweakableBox />
      <TweakableSphere />
      <TweakableCylinder />
    </Canvas>
  );
}

// App component
function App() {
  return (
    <div className="App h-screen">
      <ThreeScene />
    </div>
  );
}

export default App;
