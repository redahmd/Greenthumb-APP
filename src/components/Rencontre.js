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

// Rencontres fictives
const initialMeetings = [
  {
    title: "Rencontre entre jardiniers bio",
    description: "Partage d’expériences autour du jardinage sans pesticides.",
    date: "2025-04-20",
    location: "Jardin Botanique de Casablanca",
    organizer: "Marie Dupont",
  },
  {
    title: "Café botanique",
    description: "Discussion autour des plantes médicinales.",
    date: "2025-04-25",
    location: "Café Vert, Rabat",
    organizer: "Association Verte",
  },
  {
    title: "Échange d’astuces pour balcon fleuri",
    description: "Comment avoir un balcon fleuri toute l’année ?",
    date: "2025-05-01",
    location: "Maison du Citoyen, Fès",
    organizer: "Zohra N’Goma",
  },
  {
    title: "Rencontre permaculture",
    description: "Débat et présentation sur la permaculture urbaine.",
    date: "2025-04-22",
    location: "Université Hassan II",
    organizer: "Collectif EcoVie",
  },
  {
    title: "Pique-nique écolo",
    description: "Rencontre décontractée au parc avec repas bio partagés.",
    date: "2025-04-28",
    location: "Parc Lalla Hasna",
    organizer: "Familles Nature",
  },
  {
    title: "Rencontre apiculture urbaine",
    description: "Introduction aux ruches urbaines pour débutants.",
    date: "2025-04-27",
    location: "Toit Jardin - Marrakech",
    organizer: "Bee Friendly",
  },
  {
    title: "Soirée grainothèque",
    description: "Échange de graines et idées pour potagers maison.",
    date: "2025-04-30",
    location: "Centre culturel écologique",
    organizer: "Jardiniers Partageurs",
  },
  {
    title: "Forum jeunes jardiniers",
    description: "Rencontre pour lycéens intéressés par l’agriculture urbaine.",
    date: "2025-04-26",
    location: "Lycée Ibn Batouta",
    organizer: "Club Vert",
  },
];

const Rencontre = () => {
  const theme = useTheme();
  const [meetings, setMeetings] = useState(initialMeetings);
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOrganizer, setSelectedOrganizer] = useState("");

  const uniqueLocations = [...new Set(meetings.map((m) => m.location))];
  const uniqueOrganizers = [...new Set(meetings.map((m) => m.organizer))];

  const filteredMeetings = meetings.filter((meeting) => {
    return (
      (selectedLocation === "" || meeting.location === selectedLocation) &&
      (selectedOrganizer === "" || meeting.organizer === selectedOrganizer)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting({ ...newMeeting, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, date, location, organizer } = newMeeting;
    if (title && description && date && location && organizer) {
      const newList = [...meetings, newMeeting].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setMeetings(newList);
      setNewMeeting({
        title: "",
        description: "",
        date: "",
        location: "",
        organizer: "",
      });
      setSnackbarOpen(true);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Supprimer cette rencontre ?")) {
      setMeetings(meetings.filter((_, i) => i !== index));
    }
  };

  const generateGoogleCalendarLink = (meeting) => {
    const startDate = new Date(meeting.date);
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 2);
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      meeting.title
    )}&dates=${formatDate(startDate)}/${formatDate(
      endDate
    )}&details=${encodeURIComponent(
      meeting.description
    )}&location=${encodeURIComponent(meeting.location)}&sf=true&output=xml`;
  };

  return (
    <Box sx={{ padding: theme.spacing(5, 2), backgroundColor: theme.palette.background.default }}>
      <Typography variant="h3" textAlign="center" fontWeight="bold" color="success.main" mb={3}>
        🌿 Rencontres sociales
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" mb={4}>
        Participez à des rencontres passionnantes entre jardiniers ou organisez les vôtres !
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
        <Typography variant="h5" mb={2}>Ajouter une rencontre</Typography>
        <TextField name="title" label="Titre" value={newMeeting.title} onChange={handleInputChange} fullWidth margin="normal" required />
        <TextField name="description" label="Description" value={newMeeting.description} onChange={handleInputChange} fullWidth multiline rows={3} margin="normal" required />
        <TextField name="date" label="Date" type="date" value={newMeeting.date} onChange={handleInputChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} required />
        <TextField name="location" label="Lieu" value={newMeeting.location} onChange={handleInputChange} fullWidth margin="normal" required />
        <TextField name="organizer" label="Organisateur" value={newMeeting.organizer} onChange={handleInputChange} fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
          Ajouter
        </Button>
      </Box>

      {/* Filtres */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mt: 5, mb: 3 }}>
        <TextField
          select
          label="Filtrer par lieu"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          SelectProps={{ native: true }}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 200 }}
        >
          <option value="">Tous les lieux</option>
          {uniqueLocations.map((location, i) => (
            <option key={i} value={location}>
              {location}
            </option>
          ))}
        </TextField>

        <TextField
          select
          label="Filtrer par organisateur"
          value={selectedOrganizer}
          onChange={(e) => setSelectedOrganizer(e.target.value)}
          SelectProps={{ native: true }}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 200 }}
        >
          <option value="">Tous les organisateurs</option>
          {uniqueOrganizers.map((organizer, i) => (
            <option key={i} value={organizer}>
              {organizer}
            </option>
          ))}
        </TextField>
      </Box>

      {/* Liste des rencontres */}
      <AnimatePresence>
        {filteredMeetings.map((meeting, index) => (
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
                  {meeting.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                  {meeting.description}
                </Typography>
                <Typography variant="body2" color="success.main" mt={1}>
                  📅 {new Date(meeting.date).toLocaleDateString("fr-FR")}
                </Typography>
                <Typography variant="body2" color="info.main" mt={0.5}>
                  📍 {meeting.location}
                </Typography>
                <Typography variant="body2" color="secondary.main" mt={0.5}>
                  👤 Organisé par : {meeting.organizer}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Button size="small" color="error" onClick={() => handleDelete(index)}>
                  Supprimer
                </Button>
                <Button
                  size="small"
                  color="primary"
                  component="a"
                  href={generateGoogleCalendarLink(meeting)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ajouter au calendrier
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Message pour les fonctionnalités à venir */}
      <Typography variant="body2" textAlign="center" mt={5} color="text.secondary">
        📆 Vue calendrier interactive — <strong>Bientôt disponible</strong> !
      </Typography>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Rencontre ajoutée avec succès !"
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Rencontre;
