import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  MenuItem,
  useTheme,
} from "@mui/material";

const SoilAnalysis = () => {
  const theme = useTheme();

  const [soilData, setSoilData] = useState({
    ph: "",
    moisture: "",
    texture: "",
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleAnalyzeSoil = () => {
    const { ph, moisture, texture } = soilData;

    if (!ph || !moisture || !texture) {
      alert("Veuillez remplir toutes les informations du sol.");
      return;
    }

    const newRecommendations = [];

    if (ph >= 6 && ph <= 7.5) {
      newRecommendations.push("Les légumes comme les tomates, courgettes et carottes.");
    } else if (ph < 6) {
      newRecommendations.push("Les plantes acidophiles comme les myrtilles ou rhododendrons.");
    } else {
      newRecommendations.push("Les cultures tolérantes comme les asperges.");
    }

    if (moisture === "faible") {
      newRecommendations.push("Plantes résistantes à la sécheresse comme les succulentes.");
    } else if (moisture === "élevée") {
      newRecommendations.push("Plantes aimant les sols humides comme les fougères.");
    }

    if (texture === "sableuse") {
      newRecommendations.push("Plantes comme la lavande ou le thym.");
    } else if (texture === "argileuse") {
      newRecommendations.push("Plantes comme les pivoines ou la menthe.");
    }

    setRecommendations(newRecommendations);
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
        Analyse de Sol 🌱
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
          Entrez les caractéristiques de votre sol
        </Typography>
        <TextField
          label="pH du sol"
          type="number"
          value={soilData.ph}
          onChange={(e) => setSoilData({ ...soilData, ph: e.target.value })}
          fullWidth
          sx={{ marginBottom: theme.spacing(2.5) }}
          InputLabelProps={{ shrink: true }}
          placeholder="Exemple : 6.5"
          variant="outlined"
          color="primary"
        />
        <TextField
          select
          label="Humidité du sol"
          value={soilData.moisture}
          onChange={(e) => setSoilData({ ...soilData, moisture: e.target.value })}
          fullWidth
          sx={{ marginBottom: theme.spacing(2.5) }}
          variant="outlined"
          color="primary"
        >
          <MenuItem value="" disabled>
            Choisissez
          </MenuItem>
          <MenuItem value="faible">Faible</MenuItem>
          <MenuItem value="moyenne">Moyenne</MenuItem>
          <MenuItem value="élevée">Élevée</MenuItem>
        </TextField>
        <TextField
          select
          label="Texture du sol"
          value={soilData.texture}
          onChange={(e) => setSoilData({ ...soilData, texture: e.target.value })}
          fullWidth
          sx={{ marginBottom: theme.spacing(2.5) }}
          variant="outlined"
          color="primary"
        >
          <MenuItem value="" disabled>
            Choisissez
          </MenuItem>
          <MenuItem value="sableuse">Sableuse</MenuItem>
          <MenuItem value="limoneuse">Limoneuse</MenuItem>
          <MenuItem value="argileuse">Argileuse</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={handleAnalyzeSoil}
          sx={{
            marginTop: theme.spacing(1),
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "30px",
            py: 1.5,
            "&:hover": {
              backgroundColor: theme.palette.success.dark,
            },
          }}
        >
          Analyser le sol
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
            Recommandations 🌿
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
    </Box>
  );
};

export default SoilAnalysis;
