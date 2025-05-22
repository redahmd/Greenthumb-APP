import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Tooltip,
  Stack,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import { WbSunny, Download, InfoOutlined, Cloud } from "@mui/icons-material";

const allCountries = [
  "Maroc",
  "Tunisie",
  "Algérie",
  "France",
  "Espagne",
  "Italie",
  "Égypte",
  "Sénégal",
  "Cameroun",
  "Canada",
  "Brésil",
  "Inde",
  "Turquie",
  "Afrique du Sud",
  "États-Unis"
];

const plantingDataMaroc = {
  Janvier: ["Pomme de terre", "Salade", "Épinard"],
  Février: ["Tomate", "Salade", "Épinard"],
  Mars: ["Tomate", "Courgette", "Haricot vert"],
  Avril: ["Courgette", "Tomate"],
  Mai: ["Courgette", "Haricot vert"],
  Juin: [],
  Juillet: ["Haricot vert"],
  Août: ["Pomme de terre", "Oignon"],
  Septembre: ["Oignon"],
  Octobre: ["Carotte", "Betterave", "Épinard"],
  Novembre: ["Carotte", "Salade"],
  Décembre: ["Salade", "Betterave"]
};

const cropDescriptions = {
  "Pomme de terre": "Culture très répandue, nécessite un sol bien drainé et riche.",
  "Salade": "Plante facile à cultiver, préfère les climats frais.",
  "Épinard": "Feuille verte nutritive, semis direct en sol frais.",
  "Tomate": "Exige beaucoup de soleil, arrosage régulier.",
  "Courgette": "Plante gourmande, aime les sols riches et l'humidité.",
  "Haricot vert": "Culture rapide, semer après les dernières gelées.",
  "Oignon": "Requiert un sol meuble, semis en lignes.",
  "Carotte": "Sol léger sans cailloux, semis direct.",
  "Betterave": "Riche en nutriments, semis dès le début du printemps."
};

function generateCalendar(month, crops) {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const calendar = {};
  for (let day of days) {
    calendar[day] = crops[day % crops.length] || "Repos";
  }
  return calendar;
}

export default function CalendrierConfig() {
  const [selectedMonth, setSelectedMonth] = useState("Mars");
  const [selectedCountry, setSelectedCountry] = useState("Maroc");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  

  const crops = selectedCountry === "Maroc" ? plantingDataMaroc[selectedMonth] || [] : [];
  const visualCalendar = generateCalendar(selectedMonth, crops);

  useEffect(() => {
    if (selectedCountry === "Maroc") {
      setLoadingWeather(true);
      setTimeout(() => {
        setWeather({ temperature: 22, condition: "Ensoleillé" });
        setLoadingWeather(false);
      }, 1000);
    }
  }, [selectedCountry]);

  const handleExportPDF = async () => {
    const input = document.getElementById("pdf-export");
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.setTextColor(150);
    pdf.setFontSize(32);
    pdf.text("GreenThumb", pdf.internal.pageSize.getWidth() / 2, pdf.internal.pageSize.getHeight() - 10, {
      align: "center",
      angle: 0
    });

    pdf.setTextColor(100);
    pdf.setFontSize(10);
    pdf.text(`Exporté le ${new Date().toLocaleDateString("fr-FR")} - Mois: ${selectedMonth}`, 10, 10);

    pdf.setFontSize(10);
    pdf.text("Page 1", pdf.internal.pageSize.getWidth() - 20, pdf.internal.pageSize.getHeight() - 5);

    pdf.save(`calendrier_semis_${selectedMonth}.pdf`);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        🌿 Calendrier des Semis
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Planifiez vos semis selon votre pays et votre saison locale. Plus de 10 pays bientôt disponibles !
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4, flexWrap: "wrap" }}>
        <Select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {allCountries.map((country) => (
            <MenuItem key={country} value={country}>
              {country} {country !== "Maroc" && <Chip label="Bientôt" size="small" color="warning" sx={{ ml: 1 }} />}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          disabled={selectedCountry !== "Maroc"}
        >
          {Object.keys(plantingDataMaroc).map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>

        <Tooltip title="Télécharger en PDF">
          <span>
            <Button variant="outlined" color="primary" onClick={handleExportPDF} startIcon={<Download />}>
              Export PDF
            </Button>
          </span>
        </Tooltip>
      </Stack>

      {selectedCountry === "Maroc" && (
        <Box sx={{ mb: 4 }}>
          {loadingWeather ? (
            <CircularProgress size={24} />
          ) : weather ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <Cloud color="primary" />
              <Typography variant="body2">
                Météo actuelle estimée : {weather.condition}, {weather.temperature}°C
              </Typography>
            </Stack>
          ) : null}
        </Box>
      )}

      <Box id="pdf-export">
        {selectedCountry !== "Maroc" ? (
          <Typography variant="body2" color="text.secondary">
            Les données pour {selectedCountry} seront bientôt disponibles. ✨🌿
          </Typography>
        ) : crops.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Aucun semis recommandé pour ce mois.
          </Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {crops.map((crop, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ boxShadow: 4 }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={
                        crop === "Haricot vert"
                          ? "https://i.ibb.co/NnrL6LDR/Haricot-vert.jpg"
                          : crop === "Courgette"
                          ? "https://i.ibb.co/1tS71JFv/Courgette.jpg"
                          : crop === "Tomate"
                          ? "https://i.ibb.co/gb5W0hyS/Tomate.jpg"
                          : `https://source.unsplash.com/400x300/?${encodeURIComponent(crop)}`
                      }
                      alt={crop}
                    />
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <WbSunny color="warning" />
                        <Typography variant="body2" color="text.secondary">
                          Saison : {selectedMonth}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" fontWeight="bold">{crop}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {cropDescriptions[crop] || "Informations à venir..."}
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1}>
                        <InfoOutlined fontSize="small" color="disabled" />
                        <Typography variant="caption" color="text.secondary">
                          Semis conseillé au Maroc en {selectedMonth}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 5 }}>
              <Typography variant="h5" mb={2} fontWeight="medium">
                📅 Mini Calendrier Visuel ({selectedMonth})
              </Typography>
              <Paper sx={{ overflowX: "auto" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Jour</TableCell>
                      <TableCell>Culture</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(visualCalendar).map(([day, culture]) => (
                      <TableRow key={day}>
                        <TableCell>{day}</TableCell>
                        <TableCell>{culture}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
