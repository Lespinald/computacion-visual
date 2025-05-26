import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { DoubleSide } from "three";

function Box({ onClick }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={ref} position={[-1.5, 0, 3]} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="violet" side={DoubleSide} />
    </mesh>
  );
}

function Controls() {
  const { camera, gl: { domElement } } = useThree();
  return <OrbitControls args={[camera, domElement]} />;
}

function Scene() {
  const [active, setActive] = useState(false);
  const [position, setPosition] = useState([0, 0, 0]);
  const { events } = useThree();

  // 🧩 Detectar tecla "r"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r") {
        console.log("Tecla R presionada: reiniciando posición!");
        setPosition([0, 0, 0]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 🖱️ Detectar movimiento del mouse (en la ventana 3D)
  useFrame(({ mouse }) => {
    // Opcional: imprimir coordenadas del mouse
    // console.log("Mouse:", mouse.x, mouse.y);
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={3} />
      <pointLight position={[-3, -3, 2]} />
      <Controls />
      <Box onClick={() => setActive(!active)} />
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="lightgreen" />
      </mesh>
      <mesh position={[0, 1.5, -2]}>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 32]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      {/* 🧩 Interfaz UI HTML */}
      <Html position={[0, 2, 0]}>
        <div style={{ background: "white", padding: "5px", borderRadius: "5px" }}>
          <button onClick={() => setActive(!active)}>
            {active ? "Desactivar" : "Activar"}
          </button>
        </div>
      </Html>

      {/* 🧩 Información de posición */}
      <Html position={[-2, 2, 0]}>
        <div style={{ background: "white", padding: "3px", borderRadius: "3px" }}>
          <p>Posición: {position.join(", ")}</p>
        </div>
      </Html>
    </>
  );
}

export default function App() {
  return (
    <div className="App h-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
