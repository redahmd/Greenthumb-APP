// src/components/SmartGarden.js
import React, { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  Slider,
  Button
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

/* ====================== */
/*   1. Composants 3D     */
/* ====================== */

// Composant Ground : sol texturé avec une image d'herbe (ou fallback à une couleur unie)
function Ground() {
  const texture = useTexture("/textures/grass.jpg");
  // Configure la texture pour qu'elle se répète sur le sol
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(50, 50);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} color="green" />
    </mesh>
  );
}

// Composant Plant : un simple représentant végétal (tronc et feuillage)
function Plant({ position, name, color }) {
  return (
    <group position={position}>
      {/* Tronc */}
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Feuillage */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color || "green"} />
      </mesh>
    </group>
  );
}

// Composant WaterStream : simule le tuyau d'arrosage
function WaterStream({ active, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      // Animation basique : oscillation verticale en fonction de la vitesse
      ref.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * (speed / 10)) * 0.2;
    }
  });
  if (!active) return null;
  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
      <meshStandardMaterial color="blue" transparent opacity={0.7} />
    </mesh>
  );
}

// Composant RoofCover : affiche ou masque une couverture sur le jardin
function RoofCover({ active }) {
  if (!active) return null;
  return (
    <mesh position={[0, 5, 0]}>
      <boxGeometry args={[100, 0.5, 100]} />
      <meshStandardMaterial color="#555" transparent opacity={0.5} />
    </mesh>
  );
}

// Composant SunLight : simule le soleil avec une lumière directionnelle
function SunLight({ intensity, angle }) {
  // Convertit l'angle en radians et calcule la position de la lumière
  const rad = THREE.MathUtils.degToRad(angle);
  const x = Math.sin(rad) * 30;
  const y = Math.cos(rad) * 30;
  return (
    <directionalLight
      position={[x, y, 10]}
      intensity={intensity}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
    />
  );
}

// Composant GardenScene : regroupe tous les éléments 3D du jardin
function GardenScene({ waterHoseActive, waterSpeed, roofCovered, temperature, sunIntensity, sunAngle, plantsData }) {
  // Ajuste la couleur ambiante en fonction de la température
  const ambientColor = temperature > 25 ? "#ffe5b4" : "#ffffff";
  const ambientIntensity = 0.5;
  
  return (
    <Canvas shadows camera={{ position: [0, 15, 30], fov: 50 }}>
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <SunLight intensity={sunIntensity} angle={sunAngle} />
      <pointLight position={[-10, 10, -10]} intensity={0.3} />
      <OrbitControls />

      <Ground />

      {/* Placement aléatoire des plantes générées */}
      {plantsData.map((plant, index) => (
        <Plant key={index} position={plant.position} name={plant.name} color={plant.color} />
      ))}

      <WaterStream active={waterHoseActive} speed={waterSpeed} />
      <RoofCover active={roofCovered} />
    </Canvas>
  );
}

/* ====================== */
/*  2. Composant Principal */
/* ====================== */

export default function SmartGarden() {
  // États pour gérer les différents paramètres du jardin
  const [waterHoseActive, setWaterHoseActive] = useState(false);
  const [waterSpeed, setWaterSpeed] = useState(50);
  const [roofCovered, setRoofCovered] = useState(false);
  const [temperature, setTemperature] = useState(22);
  const [sunIntensity, setSunIntensity] = useState(0.8);
  const [sunAngle, setSunAngle] = useState(45);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Liste de plantes (extrait de MonJardinConfig) avec positions aléatoires
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allPlantTypes = [
    "Tomate", "Salade", "Carotte", "Concombre", "Aubergine", "Poivron",
    "Courgette", "Fraise", "Basilic", "Menthe", "Thym", "Romarin", "Persil",
    "Coriandre", "Ciboulette", "Chou", "Épinard", "Radis", "Navet", "Betterave"
  ];
  const plantsData = useMemo(() => {
    return allPlantTypes.map((name, index) => {
      // Positions aléatoires pour disperser les plantes dans le jardin
      const x = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      // Palette de couleurs pour varier l'apparence des plantes
      const palette = ["#7CFC00", "#32CD32", "#228B22", "#6B8E23"];
      const color = palette[index % palette.length];
      return { name, position: [x, 0.5, z], color };
    });
  }, [allPlantTypes]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Barre supérieure (AppBar) avec un menu d'accès au panneau de contrôle */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Smart Garden 3D
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Panneau de contrôle latéral (Drawer) */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div style={{ width: 300, padding: 20 }}>
          <Typography variant="h6" gutterBottom>
            Contrôles du Jardin Intelligent
          </Typography>
          <Divider style={{ marginBottom: 10 }} />

          <Typography gutterBottom>Vitesse de l'Eau ({waterSpeed}%)</Typography>
          <Slider
            value={waterSpeed}
            onChange={(e, value) => setWaterSpeed(value)}
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: 10 }}
            onClick={() => setWaterHoseActive(prev => !prev)}
          >
            {waterHoseActive ? "Fermer le Tuyau d'Arrosage" : "Ouvrir le Tuyau d'Arrosage"}
          </Button>

          <Divider style={{ margin: "20px 0" }} />

          <Typography gutterBottom>Température ({temperature}°C)</Typography>
          <Slider
            value={temperature}
            onChange={(e, value) => setTemperature(value)}
            min={10}
            max={40}
            valueLabelDisplay="auto"
          />

          <Divider style={{ margin: "20px 0" }} />

          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginBottom: 10 }}
            onClick={() => setRoofCovered(prev => !prev)}
          >
            {roofCovered ? "Découvrir le Toit" : "Couvrir le Toit"}
          </Button>

          <Divider style={{ margin: "20px 0" }} />

          <Typography gutterBottom>
            Intensité du Soleil ({(sunIntensity * 100).toFixed(0)}%)
          </Typography>
          <Slider
            value={sunIntensity}
            onChange={(e, value) => setSunIntensity(value)}
            min={0}
            max={2}
            step={0.1}
            valueLabelDisplay="auto"
          />

          <Typography gutterBottom>Angle du Soleil ({sunAngle}°)</Typography>
          <Slider
            value={sunAngle}
            onChange={(e, value) => setSunAngle(value)}
            min={0}
            max={90}
            valueLabelDisplay="auto"
          />
        </div>
      </Drawer>

      {/* Zone d'affichage de la scène 3D */}
      <div style={{ height: "100%", marginTop: 64 }}>
        <GardenScene
          waterHoseActive={waterHoseActive}
          waterSpeed={waterSpeed}
          roofCovered={roofCovered}
          temperature={temperature}
          sunIntensity={sunIntensity}
          sunAngle={sunAngle}
          plantsData={plantsData}
        />
      </div>
    </div>
  );
}
