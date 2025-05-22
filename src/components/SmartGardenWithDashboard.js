// src/components/SmartGardenWithDashboard.js
import React, { useState, useMemo } from "react";
import { AppBar, Tabs, Tab, Box, Typography } from "@mui/material";
import MonJardinConfig from "./MonJardinConfig"; // Votre composant existant de configuration du jardin
import { PieChart, Pie, Cell, Tooltip as ChartTooltip } from "recharts";

// Composant GardenDashboard : présente quelques statistiques du jardin
function GardenDashboard({ plants }) {
  // Statistiques calculées à partir de la liste de plantes
  const totalPlants = plants.length;
  const avgProgress = useMemo(() => {
    if (totalPlants === 0) return 0;
    return Math.round(plants.reduce((sum, plant) => sum + plant.progress, 0) / totalPlants);
  }, [plants, totalPlants]);

  // Calcul de la répartition par statut
  const statusCounts = useMemo(() => {
    const counts = { Semée: 0, "En croissance": 0, Mature: 0 };
    plants.forEach((plant) => {
      counts[plant.status] = (counts[plant.status] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
  }, [plants]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord du Jardin Intelligent
      </Typography>
      <Typography variant="body1">Total des plantes : {totalPlants}</Typography>
      <Typography variant="body1">Progression moyenne : {avgProgress}%</Typography>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <PieChart width={300} height={300}>
          <Pie
            data={statusCounts}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {statusCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="#0088FE" />
            ))}
          </Pie>
          <ChartTooltip />
        </PieChart>
      </Box>
    </Box>
  );
}

// Composant principal avec navigation par onglets
export default function SmartGardenWithDashboard() {
  // Pour cet exemple, nous générons des données simulées.
  // Vous pouvez intégrer ici la source de données de MonJardinConfig pour une synchronisation réelle.
  const generateRandomPlants = () => {
    const statuses = ["Semée", "En croissance", "Mature"];
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Plante ${i + 1}`,
      status: statuses[i % statuses.length],
      progress: Math.floor(Math.random() * 100),
      quantity: Math.floor(Math.random() * 5) + 1,
      lastWatered: `2025-04-${((i % 9) + 1).toString().padStart(2, "0")}`,
      color: colors[i % colors.length]
    }));
  };

  const [plants] = useState(generateRandomPlants());
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f9f9" }}>
      <AppBar position="static">
        <Tabs value={tab} onChange={handleTabChange} aria-label="Navigation du Smart Garden">
          <Tab label="Configuration du Jardin" />
          <Tab label="Tableau de Bord" />
        </Tabs>
      </AppBar>
      <Box role="tabpanel" hidden={tab !== 0}>
        {tab === 0 && <MonJardinConfig />}
      </Box>
      <Box role="tabpanel" hidden={tab !== 1}>
        {tab === 1 && <GardenDashboard plants={plants} />}
      </Box>
    </Box>
  );
}
