import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", bgcolor: "#f9f9f9" }}>
      <CheckCircleOutlineIcon color="success" sx={{ fontSize: 100, mb: 2 }} />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🎉 Commande Confirmée !
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Merci pour votre confiance. Un e-mail de confirmation a été envoyé.
      </Typography>
      <Button variant="contained" color="success" onClick={() => navigate("/")}>Retour à l'accueil</Button>
    </Box>
  );
}
