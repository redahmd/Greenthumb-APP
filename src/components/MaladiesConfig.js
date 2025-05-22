import React from "react";
import { Box, Typography } from "@mui/material";

export default function MaladiesConfig() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Suivi des Maladies
      </Typography>
      <Typography variant="body1">
        Surveillez l'état de santé de vos plantes et obtenez des conseils 
        pour prévenir ou traiter les maladies courantes.
      </Typography>
    </Box>
  );
}
