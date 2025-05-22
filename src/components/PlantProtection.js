import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  useTheme,
} from "@mui/material";

const PlantProtection = () => {
  const theme = useTheme();

  const [symptoms, setSymptoms] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [alertHistory, setAlertHistory] = useState([]);

  const handleAnalyzeSymptoms = () => {
    if (!symptoms) {
      alert("Veuillez décrire les symptômes observés.");
      return;
    }

    let newRecommendations = [];
    if (symptoms.toLowerCase().includes("tache")) {
      newRecommendations.push("Utilisez un fongicide pour traiter les taches foliaires.");
    }
    if (symptoms.toLowerCase().includes("jaunissement")) {
      newRecommendations.push(
        "Vérifiez les niveaux d'azote dans le sol. Ajoutez un engrais riche en azote si nécessaire."
      );
    }
    if (symptoms.toLowerCase().includes("insecte")) {
      newRecommendations.push(
        "Inspectez la plante pour détecter des ravageurs comme les pucerons. Utilisez des insecticides naturels."
      );
    }

    setAlertHistory((prev) => [
      ...prev,
      { symptoms, date: new Date().toLocaleDateString(), recommendations: newRecommendations },
    ]);

    setRecommendations(newRecommendations);
    setSymptoms("");
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
          color: theme.palette.text.primary,
          marginBottom: theme.spacing(5),
        }}
      >
        Protection des Plantes 🌿
      </Typography>

      <Paper
        sx={{
          padding: theme.spacing(3),
          maxWidth: "600px",
          margin: "0 auto",
          boxShadow: theme.shadows[3],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: theme.spacing(2.5),
            textAlign: "center",
            color: theme.palette.text.primary,
          }}
        >
          Signaler un problème 📋
        </Typography>
        <TextField
          label="Décrivez les symptômes observés"
          multiline
          rows={4}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          fullWidth
          sx={{ marginBottom: theme.spacing(2.5) }}
          variant="outlined"
          color="primary"
        />
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleAnalyzeSymptoms}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "30px",
            py: 1.5,
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          Analyser
        </Button>
      </Paper>

      {recommendations.length > 0 && (
        <Box sx={{ marginTop: theme.spacing(5), textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: theme.spacing(2.5),
              color: theme.palette.text.primary,
            }}
          >
            Recommandations 🛠️
          </Typography>
          <List
            sx={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
            }}
          >
            {recommendations.map((rec, index) => (
              <ListItem key={index}>
                <ListItemText primary={rec} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {alertHistory.length > 0 && (
        <Box sx={{ marginTop: theme.spacing(5), textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: theme.spacing(2.5),
              color: theme.palette.text.primary,
            }}
          >
            Historique des alertes 📜
          </Typography>
          <List
            sx={{
              maxWidth: "600px",
              margin: "0 auto",
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
            }}
          >
            {alertHistory.map((alert, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Symptômes : ${alert.symptoms}`}
                  secondary={`Date : ${alert.date} | Recommandations : ${alert.recommendations.join(
                    ", "
                  )}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default PlantProtection;
