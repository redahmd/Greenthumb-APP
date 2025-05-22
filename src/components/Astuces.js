// src/components/Astuces.js
import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Divider,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

// Quelques catégories d'astuces
const categories = ["Jardinage", "Arrosage", "Plantes d'intérieur", "Compost", "Entretien"];
// Astuces préremplies
const initialTips = [
  {
    title: "Arrosage Matinal",
    description: "Il est conseillé d'arroser votre jardin tôt le matin pour limiter l'évaporation et favoriser l'absorption de l'eau par les racines.",
    category: "Arrosage",
    image: "https://i.ibb.co/q3FtqVq0/Arrosage-Matinal.jpg",
  },
  {
    title: "Taille des Arbustes",
    description: "Effectuez une taille légère au printemps pour encourager une nouvelle croissance et conserver une forme harmonieuse.",
    category: "Jardinage",
    image: "https://i.ibb.co/9H03D2np/Taille-des-Arbustes.jpg",
  },
  {
    title: "Utiliser le Compost",
    description: "Ajoutez du compost organique pour enrichir le sol et favoriser la croissance de vos plantes.",
    category: "Compost",
    image: "https://i.ibb.co/Y7VSgwDY/Utiliser-le-Compost.jpg",
  },
  {
    title: "Plantes pour l'Intérieur",
    description: "Les fougères et les orchidées apportent une touche d'élégance et améliorent la qualité de l'air dans votre maison.",
    category: "Plantes d'intérieur",
    image: "https://i.ibb.co/HTXfjXGH/Plantes-pour-l-Int-rieur.jpg", 
  },
  {
    title: "Paillage Organique",
    description: "Utilisez du paillis pour réduire la croissance des mauvaises herbes et conserver l'humidité du sol.",
    category: "Jardinage",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
  },
];

const Astuces = () => {
  const [tips, setTips] = useState(initialTips);
  const [newTip, setNewTip] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
  const [editingIndex, setEditingIndex] = useState(null);
  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTip({ ...newTip, [name]: value });
  };

  // Pour ajouter ou modifier une astuce
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTip.title && newTip.description && newTip.category && newTip.image) {
      if (editingIndex !== null) {
        // Modification d'une astuce existante
        setTips((prev) => {
          const updated = [...prev];
          updated[editingIndex] = newTip;
          return updated;
        });
        setSnackbar({ open: true, message: "Astuce modifiée !", severity: "success" });
        setEditingIndex(null);
      } else {
        // Ajout d'une nouvelle astuce
        setTips([...tips, newTip]);
        setSnackbar({ open: true, message: "Astuce ajoutée !", severity: "success" });
      }
      setNewTip({ title: "", description: "", category: "", image: "" });
    }
  };

  // Pour supprimer une astuce
  const handleDelete = useCallback(
    (index) => {
      setTips((prev) => prev.filter((_, i) => i !== index));
      setSnackbar({ open: true, message: "Astuce supprimée", severity: "error" });
    },
    []
  );

  // Pour préparer une astuce à l'édition
  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewTip(tips[index]);
  };

  // Filtrer les astuces par recherche et/ou catégorie
  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesSearch =
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? tip.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [tips, searchTerm, selectedCategory]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        padding: theme.spacing(5, 2),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          color: theme.palette.success.main,
          marginBottom: theme.spacing(2.5),
          fontWeight: "bold",
        }}
      >
        🌟 Astuces GreenThumb
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginBottom: theme.spacing(3.75),
          color: theme.palette.text.secondary,
        }}
      >
        Découvrez et partagez vos meilleures astuces pour un jardin sain et florissant !
      </Typography>

      {/* Zone de recherche et de filtrage */}
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto 20px auto",
          display: "flex",
          gap: theme.spacing(2),
          alignItems: "center",
        }}
      >
        <TextField
          label="Rechercher"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            "& .MuiInputLabel-root": { color: theme.palette.text.primary },
          }}
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="select-category-label" sx={{ color: theme.palette.text.primary }}>
            Catégorie
          </InputLabel>
          <Select
            labelId="select-category-label"
            label="Catégorie"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: theme.palette.divider },
              },
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            }}
          >
            <MenuItem value="">
              <em>Toutes</em>
            </MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Formulaire d'ajout ou de modification d'une astuce */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          margin: "20px auto",
          maxWidth: "600px",
          padding: theme.spacing(3),
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
          mb: 5,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ color: theme.palette.text.primary }}>
          {editingIndex !== null ? "Modifier l'astuce" : "Ajouter une astuce"}
        </Typography>
        <TextField
          name="title"
          label="Titre de l'astuce"
          value={newTip.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="description"
          label="Description"
          value={newTip.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
          required
        />
        <TextField
          name="category"
          label="Catégorie"
          value={newTip.category}
          onChange={handleInputChange}
          select
          fullWidth
          margin="normal"
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="image"
          label="Lien de l'image"
          value={newTip.image}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "30px",
              px: 4,
              py: 1.5,
            }}
          >
            {editingIndex !== null ? "Modifier" : "Ajouter"}
          </Button>
        </Box>
      </Box>

      {/* Liste des astuces */}
      <Box sx={{ mt: 7.5 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: theme.spacing(2.5),
            color: theme.palette.text.primary,
          }}
        >
          Liste des astuces
        </Typography>
        {filteredTips.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: "center", color: theme.palette.text.secondary }}>
            Aucune astuce pour l'instant. Ajoutez-en une !
          </Typography>
        ) : (
          filteredTips.map((tip, index) => (
            <Card
              key={index}
              sx={{
                m: theme.spacing(1, "auto"),
                maxWidth: "600px",
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.shape.borderRadius,
              }}
            >
              {tip.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={tip.image}
                  alt={tip.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: "bold" }}>
                  {tip.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                  {tip.description}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.success.main, mt: theme.spacing(1.25) }}>
                  Catégorie : {tip.category}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleEdit(index)}
                >
                  Modifier
                </Button>
                <Button
                  size="small"
                  color="error"
                  sx={{ textTransform: "none" }}
                  onClick={() => handleDelete(index)}
                >
                  Supprimer
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Astuces;
