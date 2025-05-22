import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import EcoIcon from "@mui/icons-material/Nature";

const initiatives = [
  {
    title: "Réduction de l'eau",
    description: "Apprenez à économiser l'eau grâce à des techniques de jardinage innovantes.",
    action: "Découvrir",
  },
  {
    title: "Compostage facile",
    description: "Transformez vos déchets organiques en un engrais naturel pour vos plantes.",
    action: "Commencer",
  },
  {
    title: "Biodiversité",
    description: "Favorisez la biodiversité en accueillant des pollinisateurs dans votre jardin.",
    action: "Explorer",
  },
];

const Ecolo = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: theme.spacing(7.5, 2.5),
        backgroundColor: theme.palette.success.light,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: theme.spacing(5),
          color: theme.palette.text.primary,
        }}
      >
        Nos Initiatives Écologiques ♻️
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {initiatives.map((initiative, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: theme.shadows[3],
                textAlign: "center",
                borderRadius: theme.shape.borderRadius,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.shadows[6],
                },
              }}
            >
              <CardContent>
                <EcoIcon
                  sx={{
                    fontSize: "50px",
                    color: theme.palette.success.main,
                    marginBottom: theme.spacing(1.25),
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: theme.spacing(1.25),
                    color: theme.palette.text.primary,
                  }}
                >
                  {initiative.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: theme.spacing(2.5) }}
                >
                  {initiative.description}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: theme.shape.borderRadius,
                  }}
                >
                  {initiative.action}
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
              color: theme.palette.text.primary,
            }}
          >
            Impact Environnemental 🌍
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
            Ensemble, nous avons économisé <strong>10 000 litres d'eau</strong> et réduit les déchets de <strong>25%</strong>.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Ecolo;
