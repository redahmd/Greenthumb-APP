import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes, styled } from "@mui/system";
// === On ajoute l'import de Link ===
import { Link } from "react-router-dom";

// ==== ANIMATIONS ====
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const fadeAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const bounceKeyframes = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.09);
  }
`;

// ==== STYLED COMPONENTS ====

// Bouton avec un effet de rebond perpétuel, plus un hover supplémentaire
const ZoomButton = styled(Button)({
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: 8,
  // Animation perpétuelle
  animation: `${bounceKeyframes} 2s ease-in-out infinite`,
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#2E7D32", // un vert un peu plus foncé
  },
});

// ==== SLIDING BANNER (DIAPORAMA) ====
const SlidingBanner = () => {
  const slides = [
    {
      title: "Focus du moment : Semer ses tomates",
      description:
        "C’est la saison idéale ! Découvrez pourquoi et comment réussir vos semis de tomates.",
      buttonText: "Voir nos conseils",
      image:
        "https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Promo outillage spécial Printemps",
      description:
        "Bénéficiez de -20% sur notre gamme d’outils de jardinage pour bien démarrer la saison.",
      buttonText: "En profiter",
      image:
        "https://th.bing.com/th/id/OIP.CK20P8hCyQXI7SteHuKmNAHaD1?rs=1&pid=ImgDetMain",
    },
    {
      title: "Rejoignez la Newsletter",
      description:
        "Recevez chaque semaine nos meilleures astuces pour un jardin florissant et bio.",
      buttonText: "Je m’abonne",
      image:
        "https://images.squarespace-cdn.com/content/v1/564392bae4b081513dac5bbc/1617988211167-5F49F12JQQZTPAZIZGEU/Newsletter+photo+2.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change de slide toutes les 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Box
      sx={{
        position: "relative",
        my: 5,
        borderRadius: 2,
        overflow: "hidden",
        textAlign: "center",
        color: "#fff",
        animation: `${pulseAnimation} 8s ease-in-out infinite`,
        transition: "background-image 1s ease-in-out",
        backgroundImage: `url(${slides[currentIndex].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.5)",
        minHeight: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          animation: `${fadeAnimation} 1s`,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          p: 3,
          borderRadius: 2,
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          {slides[currentIndex].title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {slides[currentIndex].description}
        </Typography>
        <ZoomButton variant="contained" color="success">
          {slides[currentIndex].buttonText}
        </ZoomButton>
      </Box>
    </Box>
  );
};

// ==== STATIC BANNER (2 images & 2 accroches) ====
const StaticBanner = () => {
  const items = [
    {
      title: "Événement Spécial : Webinaire Jardin Zen",
      description:
        "Participez à notre conférence en ligne sur les méthodes écologiques pour un jardin zen.",
      buttonText: "S’inscrire",
      image:
        "https://d3n8a8pro7vhmx.cloudfront.net/sparcouncil/pages/331/attachments/original/1458786215/M1.jpg?1458786215",
    },
    {
      title: "Atelier compostage : Passez au vert !",
      description:
        "Apprenez à fabriquer et entretenir un compost naturel chez vous, et réduisez vos déchets.",
      buttonText: "Découvrir",
      image:
        "https://assets.entrepreneur.com/content/3x2/2000/1629823654-shutterstock-407681389.jpg",
    },
  ];

  return (
    <Box
      sx={{
        my: 5,
        textAlign: "center",
      }}
    >
      <Grid container spacing={4}>
        {items.map((item, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.5)",
              }}
            >
              {/* Overlay */}
              <Box
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  p: 2,
                  m: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  maxWidth: 350,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <ZoomButton variant="contained" color="success">
                  {item.buttonText}
                </ZoomButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// ==== FEATURES SECTION PRINCIPALE ====
const FeaturesSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // ===== On associe CHAQUE "title" à une route =====
  //   Tu pourras adapter ces routes selon tes besoins réels.
  const routeMap = {
    "Mon Jardin": "/mon-jardin",
    "Astuces Jardinage": "/astuces",
    "Calendrier des Semis": "/calendrier",
    "Boutique en Ligne": "/boutique",
    "Reconnaissance de Plantes": "/PlantRecognition",
    "Analyse du Sol": "/soil-analysis",
    "Suivi des Maladies": "/maladies",
    "Tableau de Bord": "/dashboard",
    "Communauté": "/communaute"
  };

  const features = [
    {
      title: "Mon Jardin",
      description:
        "Suivez et gérez vos plantes, planifiez les arrosages et surveillez leur croissance.",
      buttonText: "Commencer",
      image:
        "https://images.unsplash.com/photo-1460533893735-45cea2212645?q=80&w=1856&auto=format&fit=crop",
    },
    {
      title: "Astuces Jardinage",
      description:
        "Découvrez les meilleures astuces pour entretenir et améliorer votre jardin.",
      buttonText: "Découvrir",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Communauté",
      description:
        "Rejoignez notre communauté de jardiniers passionnés et partagez vos expériences.",
      buttonText: "Rejoindre",
      image:
        "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?q=80&w=1885&auto=format&fit=crop",
    },
    {
      title: "Calendrier des Semis",
      description:
        "Planifiez vos semis en fonction des saisons et de votre région.",
      buttonText: "Planifier",
      image:
        "https://images.unsplash.com/photo-1621460246390-9a5231195a85?q=80&w=1887&auto=format&fit=crop",
    },
    {
      title: "Boutique en Ligne",
      description:
        "Achetez des graines, des outils et tout ce dont vous avez besoin pour votre jardin.",
      buttonText: "Acheter",
      image:
        "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Reconnaissance de Plantes",
      description: "Identifiez les plantes en prenant simplement une photo.",
      buttonText: "Essayer",
      image:
        "https://images.unsplash.com/photo-1518437042148-3e377ea057df?q=80&w=1887&auto=format&fit=crop",
    },
    {
      title: "Analyse du Sol",
      description:
        "Découvrez la qualité de votre sol et les plantes qui y pousseront le mieux.",
      buttonText: "Analyser",
      image:
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2002&auto=format&fit=crop",
    },
    {
      title: "Suivi des Maladies",
      description:
        "Diagnostiquez les maladies de vos plantes grâce à notre outil intelligent.",
      buttonText: "Diagnostiquer",
      image:
        "https://images.unsplash.com/photo-1620055494738-248ba57ed714?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Tableau de Bord",
      description:
        "Obtenez une vue d'ensemble de votre jardin avec des statistiques détaillées.",
      buttonText: "Voir les statistiques",
      image:
        "https://images.unsplash.com/photo-1600469984476-c713650f1b1b?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  // Découpe en lots de 3
  const chunkFeatures = (arr, size) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const chunkedFeatures = chunkFeatures(features, 3);

  return (
    <Box 
  sx={{ 
    py: 6, 
    px: 2, 
    textAlign: "center", 
    backgroundColor: "background.paper" // ou 'background.default'
  }}
>
  <Typography 
    variant="h4" 
    sx={{ 
      mb: 5, 
      fontWeight: "bold", 
      color: "text.primary" // pour suivre le mode sombre
    }}
  >
    Nos principales fonctionnalités
  </Typography>


      {chunkedFeatures.map((threeFeatures, idx) => (
        <React.Fragment key={idx}>
          {/* Les 3 cartes */}
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {threeFeatures.map((feature, index) => {
              // Lien (route) en fonction du titre
              const linkTarget = routeMap[feature.title] || "/"; 
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      boxShadow: 4,
                      overflow: "hidden",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={feature.image}
                      alt={feature.title}
                      sx={{
                        height: isSmallScreen ? "200px" : "220px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h4" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {feature.description}
                      </Typography>
                      {/* Bouton = Lien */}
                      <ZoomButton
                        variant="contained"
                        color="success"
                        component={Link}
                        to={linkTarget}
                      >
                        {feature.buttonText}
                      </ZoomButton>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Après la première série (idx === 0) → Bannière diaporama */}
          {idx === 0 && <SlidingBanner />}

          {/* Après la deuxième série (idx === 1) → Bannière statique (2 images) */}
          {idx === 1 && <StaticBanner />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default FeaturesSection;
