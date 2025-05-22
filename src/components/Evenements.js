import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  useTheme,
  Snackbar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

// Données fictives
const initialEvents = [
  {
    title: "Atelier compostage",
    description: "Apprenez à transformer vos déchets verts en compost.",
    date: "2025-04-15",
  },
  {
    title: "Plantation collective",
    description: "Rejoignez-nous pour planter des arbres en ville.",
    date: "2025-04-22",
  },
  {
    title: "Conférence sur l'agriculture urbaine",
    description: "Intervenants experts, débats et échanges d'idées.",
    date: "2025-05-01",
  },
  {
    title: "Visite d’un jardin pédagogique",
    description: "Découverte pour les enfants et les parents.",
    date: "2025-04-18",
  },
  {
    title: "Marché bio local",
    description: "Producteurs locaux, fruits, légumes, miel et plus !",
    date: "2025-04-20",
  },
  {
    title: "Session d’entretien collectif",
    description: "Nettoyage et désherbage du jardin communautaire.",
    date: "2025-04-17",
  },
  {
    title: "Atelier semis",
    description: "Apprenez à semer et faire germer vos plantes.",
    date: "2025-04-25",
  },
  {
    title: "Échange de graines",
    description: "Apportez vos graines et repartez avec de nouvelles variétés.",
    date: "2025-04-30",
  },
];

const Evenements = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", date: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEvent.title && newEvent.description && newEvent.date) {
      setEvents(
        [...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date))
      );
      setNewEvent({ title: "", description: "", date: "" });
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Supprimer cet événement ?")) {
      setEvents(events.filter((_, i) => i !== index));
    }
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(5, 2),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h3" textAlign="center" fontWeight="bold" color="success.main" mb={3}>
        🌿 Événements GreenThumb
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
        Découvrez les prochains événements de jardinage et ajoutez les vôtres !
      </Typography>

      {/* Formulaire */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          margin: "auto",
          maxWidth: 600,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(3),
          borderRadius: 2,
          boxShadow: theme.shadows[4],
        }}
      >
        <Typography variant="h5" mb={2}>Ajouter un événement</Typography>
        <TextField
          name="title"
          label="Titre"
          value={newEvent.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="description"
          label="Description"
          value={newEvent.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
          required
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={newEvent.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
          Ajouter
        </Button>
      </Box>

      {/* Liste des événements */}
      <Box mt={6}>
        <Typography variant="h4" textAlign="center" mb={3}>
          📅 Événements à venir
        </Typography>

        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                sx={{
                  maxWidth: 600,
                  margin: "auto",
                  mb: 2,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[2],
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                    {event.description}
                  </Typography>
                  <Typography variant="body2" color="success.main" mt={1}>
                    📆 {new Date(event.date).toLocaleDateString("fr-FR")}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", px: 2 }}>
                  <Button size="small" color="error" onClick={() => handleDelete(index)}>
                    Supprimer
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      {/* Snackbar succès */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Événement ajouté avec succès !"
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Evenements;
