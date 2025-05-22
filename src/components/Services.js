import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Collapse,
  CardMedia,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

/**
 * Un composant “bannière de services” qui se déploie sous la navbar,
 * style “aperçu” : large horizontal, hauteur réduite, et petite description.
 */
const ServicesBanner = () => {
  const [open, setOpen] = useState(false);

  // Toggle l’aperçu
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        width: "100%",
        // On suppose que la Navbar fait ~60px de hauteur, donc on “colle” en dessous
        // Sinon, ce composant pourrait être directement sous <Navbar /> dans l’arbre
        position: "relative",
        zIndex: 9, // pour être au-dessus d’un éventuel contenu
      }}
    >
      {/* Bouton pour déclencher l’aperçu (par exemple, tu peux le placer dans la navbar) */}
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          px: 2,
          py: 1,
        }}
        onClick={handleToggle}
      >
        <Typography
          variant="body1"
          sx={{ color: "limegreen", fontWeight: 600 }}
        >
          Services
        </Typography>
        <ExpandMoreIcon
          sx={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
            color: "limegreen",
          }}
        />
      </Box>

      {/* L’aperçu qui se déploie en slow motion */}
      <Collapse in={open} timeout={1000} unmountOnExit>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Image large (ou partagée) */}
          <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "50%" } }}>
            <CardMedia
              component="img"
              height="200"
              image="https://images.unsplash.com/photo-1598198418503-fd63f5e3d407?auto=format&fit=crop&w=800&q=80"
              alt="Aperçu Services"
              sx={{
                objectFit: "cover",
                width: "100%",
                // Sur grand écran, on a 200px de haut environ
                // Sur petit écran, on peut ajuster plus
              }}
            />
          </Box>

          {/* Texte d’aperçu */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              minHeight: "200px", // la même hauteur que l’image
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1, color: "limegreen" }}>
              Nos Services
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2, lineHeight: 1.5 }}
            >
              Découvrez un aperçu de nos solutions : aide à l’arrosage,
              outillage, conseils personnalisés, analyse du sol, etc. Simplifiez
              votre quotidien au jardin tout en prenant soin de vos plantes.
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ textAlign: "right" }}>
              <Button
                component={Link}
                to="/services" // la page complète
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "limegreen",
                  "&:hover": {
                    backgroundColor: "#229954",
                  },
                }}
              >
                En savoir plus
              </Button>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default ServicesBanner;
