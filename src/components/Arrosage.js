import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";

const Arrosage = () => {
  const theme = useTheme();

  const [plants, setPlants] = useState([
    { id: 1, name: "Basilic", nextWatering: "2025-01-10", status: "À arroser" },
    { id: 2, name: "Menthe", nextWatering: "2025-01-12", status: "À arroser" },
    { id: 3, name: "Tomates", nextWatering: "2025-01-15", status: "À arroser" },
  ]);

  const [wateringHistory, setWateringHistory] = useState([]);

  const [selectedPlant, setSelectedPlant] = useState("");
  const [wateringDate, setWateringDate] = useState("");

  const handleScheduleWatering = () => {
    if (!selectedPlant || !wateringDate) {
      alert("Veuillez sélectionner une plante et une date.");
      return;
    }

    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.name === selectedPlant
          ? { ...plant, nextWatering: wateringDate, status: "Planifié" }
          : plant
      )
    );
    alert(`Arrosage planifié pour ${selectedPlant} le ${wateringDate}`);
    setSelectedPlant("");
    setWateringDate("");
  };

  const markAsWatered = (plantId) => {
    const wateredPlant = plants.find((plant) => plant.id === plantId);
    if (wateredPlant) {
      setWateringHistory((prevHistory) => [
        ...prevHistory,
        { ...wateredPlant, wateredOn: new Date().toLocaleDateString() },
      ]);

      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.id === plantId
            ? { ...plant, status: "Arrosé", nextWatering: "" }
            : plant
        )
      );
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(5, 2),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: theme.palette.success.main,
          marginBottom: theme.spacing(5),
        }}
      >
        Gestion des Arrosages 💧
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {plants.map((plant) => (
          <Grid item xs={12} sm={6} md={4} key={plant.id}>
            <Card sx={{ boxShadow: theme.shadows[3] }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginBottom: theme.spacing(1) }}
                >
                  {plant.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: theme.spacing(1) }}
                >
                  Prochain arrosage : {plant.nextWatering || "Non planifié"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      plant.status === "Arrosé"
                        ? theme.palette.success.main
                        : theme.palette.warning.main,
                    marginBottom: theme.spacing(2.5),
                  }}
                >
                  Statut : {plant.status}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => markAsWatered(plant.id)}
                  disabled={plant.status === "Arrosé"}
                >
                  Marquer comme arrosé
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: theme.spacing(5), textAlign: "center" }}>
        <Paper
          sx={{
            padding: theme.spacing(3),
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: theme.spacing(2) }}>
            Planifier un Arrosage 🗓️
          </Typography>
          <TextField
            select
            label="Plante"
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            fullWidth
            sx={{ marginBottom: theme.spacing(2) }}
          >
            {plants.map((plant) => (
              <MenuItem key={plant.id} value={plant.name}>
                {plant.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date d'arrosage"
            type="date"
            value={wateringDate}
            onChange={(e) => setWateringDate(e.target.value)}
            fullWidth
            sx={{ marginBottom: theme.spacing(2) }}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleScheduleWatering}
          >
            Planifier
          </Button>
        </Paper>
      </Box>

      <Box sx={{ marginTop: theme.spacing(5), textAlign: "center" }}>
        <Typography variant="h5" sx={{ marginBottom: theme.spacing(2) }}>
          Historique des Arrosages 📜
        </Typography>
        <List
          sx={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[3],
          }}
        >
          {wateringHistory.length === 0 && (
            <Typography variant="body2" sx={{ padding: theme.spacing(2) }}>
              Aucun arrosage enregistré.
            </Typography>
          )}
          {wateringHistory.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.name} arrosé le ${item.wateredOn}`}
                secondary={`Planifié initialement pour le ${item.nextWatering}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Arrosage;
