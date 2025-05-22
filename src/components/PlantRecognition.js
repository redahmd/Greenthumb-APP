import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CssBaseline,
  Container,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// 🌿 Thème Spotify-like
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1db954" },   // Vert Spotify
    secondary: { main: "#191414" }, // Noir Spotify
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

function PlantRecognition() {
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // 📤 Ouvrir le sélecteur de fichiers
  const handleOpenFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 📥 Lors du choix d’une image
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const localUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(localUrl);
      setResults([]);
    }
  };

  // 🚀 Appel API PlantNet avec FormData
  const handleSendToPlantNet = async () => {
    if (!file) {
      alert("Veuillez importer une image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("organs", "leaf"); // ou flower, fruit…
    formData.append("images", file);

    try {
      const response = await fetch(
        "https://my-api.plantnet.org/v2/identify/all?api-key=2b10RdhflGcppBqU3I5avvr8e",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erreur HTTP PlantNet :", errorText);
        throw new Error("Réponse API non valide");
      }

      const data = await response.json();
      console.log("🌿 Réponse complète API :", data);

      if (data.results && data.results.length > 0) {
        const top3 = data.results.slice(0, 3);
        setResults(top3);
      } else {
        alert("Aucune plante reconnue.");
        setResults([]);
      }
    } catch (err) {
      console.error("🚨 Erreur dans l'appel API :", err);
      alert("Erreur lors de la reconnaissance.");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Télécharger l’image locale
  const handleDownloadImage = () => {
    if (!previewImage) {
      alert("Aucune image à télécharger !");
      return;
    }
    const a = document.createElement("a");
    a.href = previewImage;
    a.download = "plante.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          🌿 Reconnaissance de Plante
        </Typography>

        <Box display="flex" gap={2} mb={3}>
          <Button variant="contained" onClick={handleOpenFilePicker}>
            📤 Importer une image
          </Button>
          <Button variant="contained" color="success" onClick={handleSendToPlantNet}>
            🌱 Identifier
          </Button>
          <Button variant="outlined" onClick={handleDownloadImage}>
            💾 Télécharger
          </Button>
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Aperçu image locale */}
        {previewImage && (
          <Card sx={{ maxWidth: "100%", mb: 3 }}>
            <CardMedia component="img" image={previewImage} alt="Aperçu" />
          </Card>
        )}

        {/* Loader */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Résultats PlantNet */}
        {results.length > 0 && (
          <>
            <Typography variant="h5" mb={2}>
              🌸 Top 3 Résultats :
            </Typography>
            <Grid container spacing={3}>
              {results.map((result, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="180"
                      image={result.images?.[0]?.url?.s || ""}
                      alt={`Plante ${index + 1}`}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {result.species.scientificNameWithoutAuthor}
                      </Typography>
                      <Typography variant="body2">
                        Confiance : {Math.round(result.score * 100)}%
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default PlantRecognition;
