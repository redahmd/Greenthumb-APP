import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";

// Exemple de données fictives pour l'historique
const initialHistory = [
  {
    type: "Connexion",
    timestamp: "2025-01-05T14:32:00",
    description: "Connexion réussie à l'application.",
    duration: "15 minutes",
  },
  {
    type: "Ajout de plante",
    timestamp: "2025-01-05T14:40:00",
    description: "Ajout de la plante 'Rose' au jardin.",
  },
  {
    type: "Suppression de plante",
    timestamp: "2025-01-05T15:00:00",
    description: "Suppression de la plante 'Cactus'.",
  },
  {
    type: "Communauté",
    timestamp: "2025-01-05T15:30:00",
    description: "Temps passé dans la section communauté.",
    duration: "30 minutes",
  },
  {
    type: "Déconnexion",
    timestamp: "2025-01-05T16:00:00",
    description: "Déconnexion de l'application.",
  },
];

const Historique = () => {
  const [history] = useState(initialHistory);

  // Simuler un appel API pour récupérer les données d'historique
  useEffect(() => {
    // fetch("/api/historique") // Remplacez par l'URL de votre API
    //   .then((response) => response.json())
    //   .then((data) => setHistory(data))
    //   .catch((error) => console.error("Erreur lors de la récupération de l'historique :", error));
  }, []);

  // Utilisation du thème pour accéder aux couleurs du thème
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(5, 2),
        textAlign: "center",
        backgroundColor: theme.palette.background.default, // Utilise le fond du thème
        minHeight: "100vh",
      }}
    >
      {/* Titre principal */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: theme.spacing(4),
          fontWeight: "bold",
          color: theme.palette.text.primary, // Respecte le thème
        }}
      >
        Historique des Activités
      </Typography>

      {/* Table des activités */}
      <TableContainer
        component={Paper}
        sx={{
          margin: "0 auto",
          maxWidth: "800px",
          backgroundColor: theme.palette.background.paper, // Utilise le papier du thème
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.action.hover, // Couleur de fond pour l'en-tête
                  color: theme.palette.text.primary,
                }}
              >
                Type d'activité
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.text.primary,
                }}
              >
                Date et Heure
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.text.primary,
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.text.primary,
                }}
              >
                Durée
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    index % 2 === 0
                      ? theme.palette.action.hover
                      : theme.palette.background.paper,
                }}
              >
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  {item.type}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  {new Date(item.timestamp).toLocaleString()}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  {item.description}
                </TableCell>
                <TableCell sx={{ color: theme.palette.text.primary }}>
                  {item.duration || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Historique;
