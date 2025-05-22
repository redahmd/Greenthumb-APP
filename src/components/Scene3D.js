// src/components/Scene3D.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box() {
  return (
    <mesh rotation={[0.5, 0.5, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Scene3D() {
  return (
    <Canvas style={{ height: "100vh", background: "#272727" }}>
      {/* Lumière ambiante et lumière ponctuelle */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Composant interactif pour contrôler la caméra */}
      <OrbitControls />
      
      {/* Votre objet 3D */}
      <Box />
    </Canvas>
  );
}

export default Scene3D;
