import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { DoubleSide } from "three";
import './App.css';
import useMousePosition from "./useMousePosition";

function Box({ onKeyPress }) {
  const ref = useRef();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState([-1.5, 0, 3]);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.01;
    }
  });

  // Change box color
  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  // Key movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      onKeyPress(e.key);

      setPosition((prevPos) => {
        let [x, y, z] = prevPos;
        switch (e.key) {
          case "a":
            return [x - 0.1, y, z];
          case "d":
            return [x + 0.1, y, z];
          case "w":
            return [x, y, z + 0.1];
          case "s":
            return [x, y, z- 0.1];
          default:
            return prevPos;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={isActive ? "black" : "aquamarine"}
        side={DoubleSide}
      />
    </mesh>
  );
}

function Controls() {
  const { camera, gl: { domElement } } = useThree();
  return <OrbitControls args={[camera, domElement]} />;
}

function Scene({ onKeyPress }) {

  const { groupX, groupY, groupZ } = useControls({
      groupX: { value: 0, min: -5, max: 5},
      groupY: { value: 0, min: -5, max: 5},
      groupZ: { value: 0, min: -5, max: 5},
  })

  const [active, setActive] = useState(false);

  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <Controls />
      <Box onKeyPress={onKeyPress} />
      <group position={[groupX, groupY, groupZ]}>
      <mesh position={[1.9, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <mesh position={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
          <meshStandardMaterial color="lime" />
        </mesh>
        <mesh position={[1, 1, 0]}>
          <boxGeometry args={[2, 0.5, 0.5]} />
          <meshStandardMaterial color="blue" side={DoubleSide} />
        </mesh>
      </group>

      {/* UI HTML */}
      <Html position={[0, 2, 0]}>
        <div style={{ background: "pink", padding: "5px", borderRadius: "5px" }}>
          <button onClick={() => setActive(!active)}>
            {active ? "Hola" : "Adios"}
          </button>
        </div>
      </Html>
    </>
  );
}

export default function App() {
  const { x, y } = useMousePosition();
  const [pressedKey, setPressedKey] = useState("");

  const handleKeyPress = (key) => {
    setPressedKey(key);
  };

  return (
    <div id="canvas-container" style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene onKeyPress={handleKeyPress} />
      </Canvas>

      <Leva collapsed />

      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          background: "rgba(36, 12, 116, 0.5)",
          color: "white",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        Mouse: X: {x}, Y: {y}
      </div>
      <div
        style={{
          position: "fixed",
          top: 50,
          left: 10,
          background: "rgba(36, 12, 216, 0.5)",
          color: "white",
          padding: "5px",
          borderRadius: "4px",
        }}
      >
        Key: {pressedKey}
      </div>
    </div>
  );
}
