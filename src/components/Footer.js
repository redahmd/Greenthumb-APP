import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Link as MuiLink,
  useMediaQuery,
  useTheme,
  Divider,
  IconButton,
} from "@mui/material";

// Icônes Material UI
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// Boutons “stores”
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";

// Wave du haut
const WaveTop = ({ theme }) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      lineHeight: 0,
      backgroundColor: theme.palette.primary.main,
    }}
  >
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "60px" }}
    >
      <path
        d="M-0.84,93.22 C115.95,20.18 298.90,211.63 503.24,27.91 L500.00,0.00 L0.00,0.00 Z"
        style={{ fill: theme.palette.background.paper }}
      />
    </svg>
  </Box>
);

// Wave du bas
const WaveBottom = ({ theme }) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      lineHeight: 0,
    }}
  >
    <svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "50px" }}
    >
      <path
        d="M-0.34,25.28 C124.59,174.54 339.52,-53.48 501.34,124.99 L500.00,150.00 L0.00,150.00 Z"
        style={{ fill: theme.palette.primary.main }}
      />
    </svg>
  </Box>
);

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Couleurs de chaque réseau (vous pouvez garder ces couleurs fixes si vous le souhaitez)
  const socialColors = {
    facebook: "#4267B2",
    twitter: "#1DA1F2",
    instagram: "#E1306C",
    linkedin: "#2867B2",
    youtube: "#FF0000",
    pinterest: "#E60023",
    whatsapp: "#25D366",
  };

  // Lien QR code fictif via un service en ligne (QR Code “GreenThumb”)
  const qrCodeUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GreenThumb";

  return (
    <Box sx={{ mt: 8 }}>
      {/* Wave en haut */}
      <WaveTop theme={theme} />

      {/* Corps principal du Footer */}
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.paper,
          px: { xs: 2, md: 6 },
          pt: 4,
          pb: 2,
        }}
      >
        <Grid container spacing={4}>
          {/* Colonne 1 : À propos + Réseaux sociaux */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              🌱 GreenThumb
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, mb: 2, color: theme.palette.text.secondary }}
            >
              GreenThumb est la plateforme n°1 pour tous les passionnés de
              jardinage. Conseils, astuces et inspiration pour cultiver la main
              verte. Rejoignez-nous pour un futur plus vert !
            </Typography>

            {/* Réseaux sociaux */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.facebook,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.twitter,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.instagram,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.linkedin,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.youtube,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.whatsapp,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  backgroundColor: socialColors.pinterest,
                  color: "#fff",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                <PinterestIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Colonne 2 : Liens utiles */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Liens utiles
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <MuiLink href="#" color="inherit" underline="hover">
                À propos
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Politique de confidentialité
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Contactez-nous
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                Blog
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="hover">
                FAQ
              </MuiLink>
            </Box>
          </Grid>

          {/* Colonne 3 : Offices & Contact */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Nos bureaux
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, mb: 1, color: theme.palette.text.secondary }}
            >
              <strong>Paris (France)</strong>
              <br />
              12 Rue des Fleurs, 75001
              <br />
              +33 1 23 45 67 89
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, mb: 1, color: theme.palette.text.secondary }}
            >
              <strong>Casablanca (Maroc)</strong>
              <br />
              45 Avenue du Jardin, 20000
              <br />
              +212 5 22 33 44 55
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, color: theme.palette.text.secondary }}
            >
              <strong>Dakar (Sénégal)</strong>
              <br />
              78 Boulevard Vert, 11000
              <br />
              +221 33 123 45 67
            </Typography>
          </Grid>

          {/* Colonne 4 : Téléchargez l'app + QR code */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Téléchargez l’app
            </Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, mb: 2, color: theme.palette.text.secondary }}
            >
              Ne manquez plus aucune nouveauté. Téléchargez notre application
              et emportez GreenThumb partout avec vous !
            </Typography>

            {/* Boutons “Store” (fictifs) */}
            <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.success.light,
                  },
                }}
                startIcon={<AppleIcon />}
              >
                App Store
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: theme.palette.success.light,
                  },
                }}
                startIcon={<AndroidIcon />}
              >
                Play Store
              </Button>
            </Box>

            {/* QR code (fictif) */}
            <Box
              component="img"
              sx={{
                width: 120,
                height: 120,
                borderRadius: 1,
                border: `1px solid ${theme.palette.background.paper}`,
                objectFit: "contain",
              }}
              src={qrCodeUrl}
              alt="QRCodeFictif"
            />
          </Grid>
        </Grid>

        {/* Séparateur */}
        <Divider
          sx={{
            backgroundColor: theme.palette.divider,
            opacity: 0.2,
            my: 3,
          }}
        />

        {/* Bas de page */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: isSmallScreen ? "center" : "left",
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} GreenThumb - Tous droits réservés.
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic" }} color="text.secondary">
            “Cultivons ensemble un avenir plus vert.”
          </Typography>
        </Box>
      </Box>

      {/* Wave en bas */}
      <WaveBottom theme={theme} />
    </Box>
  );
};

export default Footer;
