import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Search,
  HelpOutline,
  Group,
  Forum,
  ExpandMore,
  PostAdd,
} from "@mui/icons-material";

const categories = [
  "Entretien du jardin",
  "Plantes d'intérieur",
  "Maladies et ravageurs",
  "Arrosage intelligent",
  "Compost & sols",
  "Semis et plantation",
];

const popularQuestions = [
  {
    question: "Comment protéger mes tomates du mildiou ?",
    answer: "Le mildiou est un champignon. Utilisez du purin d'ortie et évitez d'arroser les feuilles."
  },
  {
    question: "Quel arrosage automatique pour balcon ?",
    answer: "Les systèmes goutte-à-goutte sont idéaux. Ils consomment peu et sont faciles à installer."
  },
  {
    question: "Quand tailler les rosiers ?",
    answer: "La taille s'effectue généralement en février-mars selon la région."
  }
];

export default function CommunauteConfig() {
  const [search, setSearch] = useState("");

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        👥 Communauté GreenThumb
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Posez vos questions, trouvez des réponses et échangez avec d'autres passionnés de jardinage !
      </Typography>

      {/* Barre de recherche */}
      <Box sx={{ mb: 4, maxWidth: 600 }}>
        <TextField
          fullWidth
          placeholder="Rechercher une question ou un sujet..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Box>

      {/* Bouton poser une question */}
      <Box sx={{ mb: 6 }}>
        <Button
          variant="contained"
          startIcon={<PostAdd />}
          size="large"
          color="success"
          sx={{ textTransform: "none", fontWeight: "bold", px: 4 }}
        >
          Poser une question
        </Button>
      </Box>

      {/* Catégories */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        📂 Catégories populaires
      </Typography>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {categories.map((cat, idx) => (
          <Grid item key={idx}>
            <Chip label={cat} color="primary" clickable />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Questions fréquentes */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        ❓ Questions fréquentes
      </Typography>
      {popularQuestions.map((q, i) => (
        <Accordion key={i} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight="medium">{q.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {q.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Invitation à participer */}
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Forum color="primary" sx={{ fontSize: 50 }} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Vous avez une question ou une expertise à partager ?
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{ mt: 2, px: 4 }}
          startIcon={<Group />}
        >
          Rejoindre la communauté
        </Button>
      </Box>
    </Box>
  );
}
