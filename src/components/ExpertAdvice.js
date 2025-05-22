import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Paper,
  useTheme,
} from "@mui/material";

const ExpertAdvice = () => {
  const theme = useTheme();

  const [adviceList] = useState([
    {
      id: 1,
      title: "Comment améliorer le drainage de votre sol",
      summary: "Découvrez des astuces simples pour éviter l'accumulation d'eau dans votre jardin.",
      image: "https://i.ibb.co/zCp3NtK/Comment-am-liorer-le-drainage-de-votre-sol.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Évitez les ravageurs naturellement",
      summary: "Utilisez des méthodes biologiques pour protéger vos plantes des insectes nuisibles.",
      image: "https://i.ibb.co/VYPPmYdm/vitez-les-ravageurs-naturellement.jpg",
      link: "#",
    },
    {
      id: 3,
      title: "Plantes adaptées aux sols argileux",
      summary: "Découvrez les espèces qui prospèrent dans des sols lourds et compacts.",
      image: "https://i.ibb.co/3yNWz8xK/Plantes-adapt-es-aux-sols-argileux.jpg",
      link: "#",
    },
  ]);

  const [userQuestion, setUserQuestion] = useState("");

  const handleQuestionSubmit = () => {
    if (!userQuestion) {
      alert("Veuillez écrire une question avant de la soumettre.");
      return;
    }

    alert("Votre question a été soumise avec succès ! Un expert vous répondra bientôt.");
    setUserQuestion("");
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(5, 2),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: theme.spacing(5),
          color: theme.palette.text.primary,
        }}
      >
        Conseils des Experts 🌟
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {adviceList.map((advice) => (
          <Grid item xs={12} sm={6} md={4} key={advice.id}>
            <Card
              sx={{
                boxShadow: theme.shadows[3],
                borderRadius: theme.shape.borderRadius,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: theme.shadows[6] },
              }}
            >
              <CardMedia
                component="img"
                image={advice.image}
                alt={advice.title}
                sx={{ height: "180px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: theme.spacing(1.5),
                    color: theme.palette.text.primary,
                  }}
                >
                  {advice.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: theme.spacing(3) }}
                >
                  {advice.summary}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  href={advice.link}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  Lire plus
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: theme.spacing(5), textAlign: "center" }}>
        <Paper
          sx={{
            padding: theme.spacing(3),
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginBottom: theme.spacing(2.5),
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Posez une question à nos experts 🧐
          </Typography>
          <TextField
            label="Votre question"
            multiline
            rows={4}
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            fullWidth
            sx={{ marginBottom: theme.spacing(2.5) }}
            variant="outlined"
            color="primary"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleQuestionSubmit}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: theme.shape.borderRadius,
              py: 1.5,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Soumettre
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default ExpertAdvice;
