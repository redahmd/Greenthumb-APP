// src/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Palette pour le mode sombre
            primary: {
              main: "#1abc9c",
            },
            background: {
              default: "#2c3e50",
              paper: "#34495e",
            },
            text: {
              primary: "#ecf0f1",
            },
          }
        : {
            // Palette pour le mode clair
            primary: {
              main: "#27ae60",
            },
            background: {
              default: "#ffffff",
              paper: "#f9f9f9",
            },
            text: {
              primary: "#2c3e50",
            },
          }),
    },
    typography: {
      // Vous pouvez personnaliser la typographie ici
    },
    // Ajoutez d'autres personnalisations de thème si nécessaire
  });
};
