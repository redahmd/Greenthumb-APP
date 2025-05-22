import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

const Forum = () => {
  const [topics, setTopics] = useState([]); // Liste des sujets
  const [newTopic, setNewTopic] = useState({ title: "", content: "" }); // Nouveau sujet

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTopic({ ...newTopic, [name]: value });
  };

  // Soumettre un nouveau sujet
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopic.title && newTopic.content) {
      setTopics([...topics, newTopic]);
      setNewTopic({ title: "", content: "" }); // Réinitialisation du formulaire
    }
  };

  // Utilisation du thème pour accéder aux couleurs du thème
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(5, 2),
        backgroundColor: theme.palette.background.default, // Utilise le fond du thème
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* En-tête du forum */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          textAlign: "center",
          color: theme.palette.success.main, // Utilise une couleur du thème
          marginBottom: theme.spacing(2.5),
          fontWeight: "bold",
        }}
      >
        🌱 Forum GreenThumb
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginBottom: theme.spacing(3.75),
          color: theme.palette.text.secondary, // Utilise la couleur secondaire du texte
        }}
      >
        Discutez, partagez et apprenez avec la communauté de jardiniers passionnés !
      </Typography>

      {/* Formulaire pour ajouter un sujet */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          margin: "20px auto",
          maxWidth: "600px",
          padding: theme.spacing(3),
          backgroundColor: theme.palette.background.paper, // Utilise le papier du thème
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          Ajouter un nouveau sujet
        </Typography>
        <TextField
          name="title"
          label="Titre"
          value={newTopic.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.primary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.divider },
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        <TextField
          name="content"
          label="Contenu"
          value={newTopic.content}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.primary },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: theme.palette.divider },
            },
            "& .MuiOutlinedInput-root.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{
            marginTop: theme.spacing(1),
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "30px",
            px: 4,
            py: 1.5,
            "&:hover": {
              backgroundColor: theme.palette.success.dark,
            },
          }}
        >
          Publier
        </Button>
      </Box>

      {/* Liste des sujets */}
      <Box sx={{ marginTop: theme.spacing(7.5) }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            marginBottom: theme.spacing(2.5),
            color: theme.palette.text.primary,
          }}
        >
          Sujets récents
        </Typography>

        {topics.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: theme.palette.text.secondary,
            }}
          >
            Aucun sujet pour l'instant. Soyez le premier à en créer un !
          </Typography>
        ) : (
          topics.map((topic, index) => (
            <Card
              key={index}
              sx={{
                margin: theme.spacing(1, "auto"),
                maxWidth: "600px",
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {topic.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ whiteSpace: "pre-line" }}
                >
                  {topic.content}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Forum;
