import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

// Overlay sombre adapté au thème pour rendre le texte lisible
const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(0, 0, 0, 0.4)"
      : "rgba(255, 255, 255, 0.4)", // Ajustez selon vos préférences
  zIndex: 2,
}));

// Conteneur du contenu (titre, texte, bouton) avec couleurs basées sur le thème
const ContentContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary, // Utilise la couleur de texte primaire du thème
  padding: theme.spacing(6),
  textAlign: "center",
  minHeight: "400px",
  [theme.breakpoints.up("md")]: {
    minHeight: "600px", // Augmente la hauteur sur desktop
  },
}));

const CallToActionWithImage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        marginTop: theme.spacing(5),
        // Image de fond
        backgroundImage: `url("https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay sombre */}
      <Overlay />

      {/* Contenu par-dessus l’overlay */}
      <ContentContainer>
        <Typography
          variant={isSmallScreen ? "h5" : "h3"}
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          Rejoignez notre communauté
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 5,
            fontWeight: "bold",
            // Couleur héritée de ContentContainer
          }}
        >
          Découvrez la force d'un collectif passionné&nbsp;: échangez vos
          conseils, partagez vos astuces, et laissez-vous inspirer pour
          transformer votre jardin.
        </Typography>
        <Button
          variant="contained"
          color="success"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: theme.palette.success.dark, // Utilise la couleur success du thème
            },
          }}
        >
          Rejoignez-nous maintenant
        </Button>
      </ContentContainer>
    </Box>
  );
};

export default CallToActionWithImage;
