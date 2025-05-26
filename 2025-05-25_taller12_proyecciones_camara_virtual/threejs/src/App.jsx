import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, OrthographicCamera } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { DoubleSide, CameraHelper as ThreeCameraHelper } from "three";
import "./App.css";

// Box component with rotation
function Box() {
  const boxRef = useRef();
  const sphereRef = useRef();
  const cylinderRef = useRef();

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.005;
      boxRef.current.rotation.y += 0.01;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0.005;
      sphereRef.current.rotation.y += 0.01;
    }
    if (cylinderRef.current) {
      cylinderRef.current.rotation.x += 0.005;
      cylinderRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      <mesh position={[-1.5, 0, 3]} ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="violet" side={DoubleSide} />
      </mesh>

      <mesh position={[1.5, 0, 0]} ref={sphereRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>

      <mesh position={[0, 1.5, -2]} ref={cylinderRef}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </group>
  );
}

// Orbit controls
function Controls() {
  const { camera, gl: { domElement } } = useThree();
  return <OrbitControls args={[camera, domElement]} />;
}

// Dynamic Camera Helper
function CameraHelper() {
  const { camera, scene } = useThree();

  useEffect(() => {
    const helper = new ThreeCameraHelper(camera);
    scene.add(helper);

    return () => {
      scene.remove(helper);
    };
  }, [camera, scene]);

  return null; // Nothing to render
}

// Scene with dynamic camera
function Scene({ cameraType }) {
  return (
    <>
      {cameraType === "Perspective" ? (
        <PerspectiveCamera
          makeDefault
          fov={60}
          near={0.1}
          far={100}
          position={[2, 2, 2]}
        />
      ) : (
        <OrthographicCamera
          makeDefault
          near={0.1}
          far={100}
          left={-2}
          right={2}
          top={2}
          bottom={-2}
          position={[0, 0, 2]}
        />
      )}

      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <Controls />
      <Box />
      <CameraHelper />
    </>
  );
}

// Main app
export default function App() {
  const [cameraType, setCameraType] = useState("Perspective");

  const toggleCamera = () => {
    setCameraType((prev) =>
      prev === "Perspective" ? "Orthographic" : "Perspective"
    );
  };

  return (
    <div className="App h-screen">
      <button
        onClick={toggleCamera}
        style={{
          position: "absolute",
          zIndex: 1,
          top: 20,
          left: 20,
          padding: "8px 12px",
        }}
      >
        Change Camera
      </button>

      <Canvas>
        <Scene cameraType={cameraType} />
      </Canvas>

      {/* Display active camera type */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          color: "white",
          fontSize: "16px",
          background: "rgba(0,0,0,0.5)",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
      >
        Active Camera: {cameraType}
      </div>
    </div>
  );
}
