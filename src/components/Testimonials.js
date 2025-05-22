import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import { keyframes } from "@mui/system";

// Animation de fondu pour les témoignages (apparition progressive)
const fadeIn = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`;

/** Composant réutilisable pour un diaporama de témoignages */
const TestimonialSlideshow = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // On change de témoignage toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data.length]);

  const current = data[currentIndex];

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        height: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // Légère animation de fade-in à chaque changement de slide
        animation: `${fadeIn} 0.8s`,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <Avatar
        src={current.image}
        alt={current.name}
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          "{current.text}"
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          - {current.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

/** Composant principal qui affiche 3 cartes de diaporama */
const Testimonials = () => {
  // === Data pour la première carte ===
  const card1Data = [
    {
      name: "Fatou Diouf",
      text: "GreenThumb m’a permis de cultiver un potager magnifique malgré mon petit balcon !",
      image:
        "https://c.stocksy.com/a/yEz100/z9/473740.jpg",
    },
    {
      name: "Ahmed El-Fassi",
      text: "Grâce à la communauté, j’ai appris à fertiliser naturellement mon sol. Incroyable !",
      image:
        "https://thumbs.dreamstime.com/b/portrait-arabe-d-homme-56832975.jpg",
    },
    {
      name: "Luc Dupont",
      text: "Les rappels d’arrosage sont super pratiques, mes plantes sont en pleine forme !",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?fit=crop&w=500&q=80",
    },
  ];
  // === Data pour la deuxième carte ===
  const card2Data = [
    {
      name: "Amina Touré",
      text: "Enfin une appli claire pour débuter en jardinage bio. Merci GreenThumb !",
      image:
        "https://www.leral.net/photo/art/default/47528048-37574216.jpg?v=1593016715",
    },
    {
      name: "Mehdi Ben Youssef",
      text: "La reconnaissance de plantes m’a aidé à sauver ma menthe en quelques clics.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ben_Affleck_by_Gage_Skidmore_3.jpg/1200px-Ben_Affleck_by_Gage_Skidmore_3.jpg",
    },
    {
      name: "Eva Müller",
      text: "J’adore partager mes astuces d’arrosage et mes photos de potager sur la communauté !",
      image:
        "https://profile-images.xing.com/images/8fe0dff4155720ba303c69539cbdf4dd-5/eva-m%C3%BCller.1024x1024.jpg",
    },
  ];

  // === Data pour la troisième carte ===
  const card3Data = [
    {
      name: "Hawa Diakité",
      text: "Top pour suivre l’évolution de mes plantes et programmer chaque étape de culture.",
      image:
        "https://thumbs.dreamstime.com/b/osten-frau-10847966.jpg",
    },
    {
      name: "Shouira Mensoura",
      text: "Les fonctionnalités d’analyse du sol m’ont fait gagner un temps fou !",
      image:
        "https://huffpost-focus.sirius.press/2022/07/23/0/0/1000/1000/0/0/60/0/89c463f_1658617942784-5fe4714d260000e9060c5f52.jpeg",
    },
    {
      name: "Thomas Lebrun",
      text: "Je recommande à tous les amateurs de jardinage, même expérimentés !",
      image:
        "https://tropiques-atrium.fr/wp-content/uploads/2019/06/Thomas-Lebrun-01.jpg",
    },
  ];

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
    Ils nous font confiance
  </Typography>




      {/* 3 colonnes : chacune héberge un diaporama */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TestimonialSlideshow data={card1Data} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TestimonialSlideshow data={card2Data} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TestimonialSlideshow data={card3Data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Testimonials;
