import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Spa } from "@mui/icons-material";
import { SmartToy, SupportAgent, LocalFlorist } from "@mui/icons-material";

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Palette de couleurs
  const colors = {
    primary: "#27ae60",
    secondary: "#2c3e50",
    accent: "#f1c40f",
    text: "#ecf0f1",
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: colors.secondary,
      }}
    >
      {/* Vidéo Vimeo */}
      <Box
        component="iframe"
        src="https://player.vimeo.com/video/1042814539?autoplay=1&muted=1&loop=1&background=1"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100vw",
          height: "56.25vw",
          minHeight: "100vh",
          minWidth: "177.77vh",
          transform: "translate(-50%, -50%)",
          border: "none",
          filter: "brightness(0.7) saturate(1.2)",
          zIndex: 0,
        }}
        loading="lazy"
      />

      {/* Overlay de contraste */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(45deg, ${colors.secondary}99 30%, transparent 100%)`,
          zIndex: 1,
        }}
      />

      {/* Contenu principal */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: isMobile ? 2 : 4,
          px: isMobile ? 1 : 4,
        }}
      >
        {/* Titre animé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant={isMobile ? "h4" : "h1"}
            sx={{
              fontWeight: 900,
              color: colors.text,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              mb: 10,
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
              justifyContent: "center",
              fontSize: isMobile ? "2.5rem" : "4rem",
              lineHeight: 1.5,
            }}
          >
            <motion.span
              animate={{
                scale: [1, 1.05, 1],
                transition: { repeat: Infinity, duration: 3 },
              }}
            >
              Créez un jardin
            </motion.span>
            <motion.span style={{ color: colors.primary }}>
              Qui vous ressemble
            </motion.span>
            {!isMobile && (
              <Spa sx={{ fontSize: "inherit", color: colors.accent }} />
            )}
          </Typography>
        </motion.div>

        {/* Sous-titre */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Typography
            variant={isMobile ? "body2" : "h5"}
            sx={{
              color: colors.text,
              maxWidth: "800px",
              mb: 4,
              fontWeight: 500,
              lineHeight: 1.5,
              px: 2,
              backdropFilter: "blur(4px)",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "8px",
              py: 1,
              fontSize: isMobile ? "0.900rem" : "1.8rem",
            }}
          >
            Découvrez comment transformer votre espace en un havre de paix avec nos outils innovants.
          </Typography>
        </motion.div>

        {/* Boutons premium */}
        <Box
          sx={{
            display: "flex",
            gap: isMobile ? 2 : 3,
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
            maxWidth: "600px",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: isMobile ? "100%" : "auto" }}
          >
            <Button
              fullWidth
              variant="contained"
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate("/auth?form=register")}
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                color: colors.text,
                px: isMobile ? 4 : 10,
                py: isMobile ? 4 : 3,
                borderRadius: "8px",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(39, 174, 96, 0.4)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(39, 174, 96, 0.6)",
                },
              }}
            >
              Commencer gratuitement
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: isMobile ? "100%" : "auto" }}
          >
            <Button
              fullWidth
              variant="outlined"
              size={isMobile ? "medium" : "large"}
              onClick={() => navigate("/auth?form=login")}
              sx={{
                borderColor: colors.text,
                color: colors.text,
                px: isMobile ? 5 : 8,
                py: isMobile ? 2 : 3,
                borderRadius: "8px",
                fontWeight: 900,
                "&:hover": {
                  backgroundColor: "rgba(236, 240, 241, 0.1)",
                  borderWidth: 5,
                },
              }}
            >
              Accéder à mon compte
            </Button>
          </motion.div>
        </Box>



{/* Cartes fonctionnalités (cachées sur mobile) */}
{!isMobile && (
  <Box
    sx={{
      mt: 4,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 3,
      width: "100%",
      maxWidth: "1200px",
    }}
  >
    {[
      {
        icon: <SmartToy sx={{ fontSize: "5rem", color: colors.accent }} />,
        title: "Jardin Intelligent",
        description: "Optimisez votre jardin avec nos conseils personnalisés",
      },
      {
        icon: <SupportAgent sx={{ fontSize: "5rem", color: colors.primary }} />,
        title: "Assistant Personnel",
        description: "Votre assistant jardin toujours disponible",
      },
      {
        icon: <LocalFlorist sx={{ fontSize: "5rem", color: colors.accent }} />,
        title: "Bien-être Vert",
        description: "Découvrez les bienfaits du jardinage",
      },
    ].map((card, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{ width: "30%" }}
      >
        <Box
          sx={{
            padding: 3,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
        >
          {card.icon}
          <Typography variant="h6" sx={{ mt: 2, mb: 1, color: colors.text }}>
            {card.title}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.text }}>
            {card.description}
          </Typography>
        </Box>
      </motion.div>
    ))}
  </Box>
)}

      </Box>
    </Box>
  );
};

export default HeroSection;