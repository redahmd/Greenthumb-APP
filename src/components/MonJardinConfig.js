import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  Chip,
  LinearProgress,
  Stack,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Slider
} from "@mui/material";
import { motion } from "framer-motion";
import { Delete, Edit, WaterDrop, LocalFlorist, Home } from "@mui/icons-material";
import { PieChart, Pie, Cell, Tooltip as ChartTooltip } from "recharts";

// Palette de couleurs pour les plantes.
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#8A2BE2", "#FF1493", "#7FFF00", "#DC143C",
  "#FF8C00", "#4682B4"
];

const allPlantTypes = [
  "Tomate", "Salade", "Carotte", "Concombre", "Aubergine", "Poivron", "Courgette", "Fraise", "Basilic", "Menthe",
  "Thym", "Romarin", "Persil", "Coriandre", "Ciboulette", "Chou", "Épinard", "Radis", "Navet", "Betterave",
  "Pomme de terre", "Oignon", "Ail", "Laitue", "Brocoli", "Chou-fleur", "Céleri", "Haricot vert", "Pois", "Maïs",
  "Tournesol", "Lavande", "Rose", "Tulipe", "Dahlia", "Hortensia", "Orchidée", "Anémone", "Pivoine", "Bleuet",
  "Marguerite", "Camomille", "Citronnelle", "Géranium", "Jasmin", "Muguet", "Pensée", "Violette", "Sauge", "Verveine"
];

const generateRandomPlants = () =>
  allPlantTypes.slice(0, 50).map((name, index) => ({
    id: index + 1,
    name,
    status: ["Semée", "En croissance", "Mature"][Math.floor(Math.random() * 3)],
    quantity: Math.floor(Math.random() * 5) + 1,
    progress: Math.floor(Math.random() * 100),
    lastWatered: `2025-04-${(Math.floor(Math.random() * 9) + 1)
      .toString()
      .padStart(2, "0")}`,
    color: COLORS[index % COLORS.length]
  }));

// --------- Composant PlantCard ----------
const PlantCard = React.memo(({ plant, onSelect }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: plant.id * 0.02 }}
  >
    <Card
      elevation={2}
      onClick={() => onSelect(plant)}
      sx={{ cursor: "pointer" }}
      aria-label={`Détails de ${plant.name}`}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            {plant.name}
          </Typography>
          <Chip label={plant.status} sx={{ backgroundColor: plant.color, color: "#fff" }} />
        </Stack>
        <Typography>Quantité: {plant.quantity}</Typography>
        <Typography>
          Dernier arrosage: {plant.lastWatered} (Mois: {new Date(plant.lastWatered).toLocaleString("fr-FR", { month: "long" })})
        </Typography>
        <LinearProgress variant="determinate" value={plant.progress} sx={{ my: 1 }} />
      </CardContent>
      <CardActions>
        <Tooltip title="Arroser">
          <IconButton color="primary" aria-label="arroser">
            <WaterDrop />
          </IconButton>
        </Tooltip>
        <Tooltip title="Éditer">
          <IconButton color="default" aria-label="éditer">
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton color="error" aria-label="supprimer">
            <Delete />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  </motion.div>
));

// --------- Composant GardenControls ----------
const GardenControls = () => {
  // Dans cette version, les fonctionnalités avancées sont désactivées avec effet sombre.
  return (
    <Box sx={{ mb: 4, p: 2, bgcolor: "#e0f7fa", borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        Contrôle du Jardin Intelligent
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        <Tooltip title="Bientôt disponible">
          <span>
            <Button
              variant="contained"
              startIcon={<WaterDrop />}
              disabled
              sx={{ bgcolor: "grey.800", opacity: 0.5 }}
            >
              Tuyau d'arrosage
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Bientôt disponible">
          <span>
            <Button
              variant="contained"
              startIcon={<Home />}
              disabled
              sx={{ bgcolor: "grey.800", opacity: 0.5 }}
            >
              Toit Intelligent
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Bientôt disponible">
          <span>
            <Button
              variant="contained"
              disabled
              sx={{ bgcolor: "grey.800", opacity: 0.5 }}
            >
              Analyse du Sol
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Bientôt disponible">
          <span>
            <Button
              variant="contained"
              disabled
              sx={{ bgcolor: "grey.800", opacity: 0.5 }}
            >
              Protection des Plantes
            </Button>
          </span>
        </Tooltip>
      </Stack>
      <Box sx={{ mt: 3 }}>
        <Tooltip title="Bientôt disponible">
          <span>
            <Slider
              value={50}
              disabled
              valueLabelDisplay="auto"
              min={0}
              max={100}
              sx={{ opacity: 0.5 }}
            />
          </span>
        </Tooltip>
        <Typography variant="subtitle1" align="center">
          Contrôle de la Vitesse de l'Eau (Bientôt disponible)
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Tooltip title="Bientôt disponible">
          <span>
            <Slider
              value={22}
              disabled
              valueLabelDisplay="auto"
              min={10}
              max={40}
              sx={{ opacity: 0.5 }}
            />
          </span>
        </Tooltip>
        <Typography variant="subtitle1" align="center">
          Contrôle de la Température (Bientôt disponible)
        </Typography>
      </Box>
      <Typography variant="body1" mt={2}>
        Jardin intelligent : toutes les fonctionnalités avancées seront bientôt disponibles.
      </Typography>
    </Box>
  );
};

// --------- Composant PlantDetailsDialog ----------
const PlantDetailsDialog = React.memo(({ plant, open, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>Détails de la plante</DialogTitle>
    <DialogContent dividers>
      {plant && (
        <>
          <Typography variant="h6">{plant.name}</Typography>
          <Typography>Status : {plant.status}</Typography>
          <Typography>Progression : {plant.progress}%</Typography>
          <Typography>
            Dernier arrosage : {plant.lastWatered} (Mois :{" "}
            {new Date(plant.lastWatered).toLocaleString("fr-FR", { month: "long" })})
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Conseil personnalisé :</strong>{" "}
            {plant.progress < 30
              ? "Arrosez régulièrement et placez en plein soleil."
              : plant.progress < 70
              ? "Ajoutez de l'engrais naturel pour accélérer la croissance."
              : "Plante en bonne santé, continuez ainsi !"}
          </Typography>
        </>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Fermer</Button>
    </DialogActions>
  </Dialog>
));

// --------- Composant PlantChart ----------
const PlantChart = React.memo(({ data }) => (
  <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <ChartTooltip />
    </PieChart>
  </Box>
));

// --------- Composant Principal ---------
export default function MonJardinConfig() {
  const [gardenName] = useState("Mon Vrai Jardin Intelligent");
  const [plants, setPlants] = useState(generateRandomPlants());
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [selectedPlant, setSelectedPlant] = useState(null);
  // Fonctionnalités avancées désactivées dans cette version
  const [waterHoseActive] = useState(false);
  const [roofCovered] = useState(false);
  const [waterSpeed] = useState(50);
  const [temperature] = useState(22);
  
  // Nouvelle variable d'état pour contrôler le champ de saisie
  const [newPlantName, setNewPlantName] = useState("");

  // Handler d'ajout de plante
  const handleAddPlant = useCallback(
    (name) => {
      if (name.trim() === "") return;
      const newPlant = {
        id: Date.now(),
        name,
        status: "Semée",
        quantity: 1,
        progress: 10,
        lastWatered: new Date().toISOString().split("T")[0],
        color: COLORS[plants.length % COLORS.length]
      };
      setPlants((prev) => [newPlant, ...prev]);
      setSnackbar({ open: true, message: `${name} ajoutée !`, severity: "success" });
    },
    [plants.length]
  );

  // Préparation des données pour le graphique
  const chartData = useMemo(
    () =>
      plants.map((p) => ({
        name: p.name,
        value: p.quantity,
        color: p.color
      })),
    [plants]
  );

  // Fermeture du snackbar
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <Box sx={{ bgcolor: "#f9f9f9", color: "#000", minHeight: "100vh", p: 4 }}>
      <Typography variant="h3" fontWeight="bold" mb={2}>
        <LocalFlorist fontSize="large" /> {gardenName}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Zone de saisie pour ajouter une nouvelle plante */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Ajouter une nouvelle plante"
          value={newPlantName}
          onChange={(e) => setNewPlantName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newPlantName.trim() !== "") {
              handleAddPlant(newPlantName);
              setNewPlantName("");
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocalFlorist />
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (newPlantName.trim() !== "") {
              handleAddPlant(newPlantName);
              setNewPlantName("");
            }
          }}
        >
          Ajouter
        </Button>
      </Stack>

      {/* Panneau de contrôle avec toutes les fonctionnalités désactivées */}
      <GardenControls />

      {/* Affichage des cartes de plantes */}
      <Grid container spacing={2}>
        {plants.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant.id}>
            <PlantCard plant={plant} onSelect={setSelectedPlant} />
          </Grid>
        ))}
      </Grid>

      {/* Graphique en secteurs */}
      <PlantChart data={chartData} />

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>

      <PlantDetailsDialog
        plant={selectedPlant}
        open={Boolean(selectedPlant)}
        onClose={() => setSelectedPlant(null)}
      />
    </Box>
  );
}
