import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  useTheme,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Données fictives pour le tableau de bord
const statsData = [
  { month: "Janvier", connexions: 50, tempsPasse: 120 },
  { month: "Février", connexions: 70, tempsPasse: 200 },
  { month: "Mars", connexions: 100, tempsPasse: 300 },
  { month: "Avril", connexions: 120, tempsPasse: 400 },
  { month: "Mai", connexions: 150, tempsPasse: 500 },
];

const Dashboard = () => {
  // États pour les statistiques principales
  const [totalConnexions] = useState(500);
  const [totalTempsPasse] = useState("50 heures");
  const [totalAjouts] = useState(75);
  const [totalSuppressions] = useState(10);

  // États pour les fonctionnalités supplémentaires
  const [comingSoon, setComingSoon] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Tous");

  // Utilisation du thème pour conserver la cohérence des couleurs
  const theme = useTheme();

  // Bascule pour activer/désactiver le mode "désactivé"
  const handleComingSoonToggle = () => {
    setComingSoon((prev) => !prev);
  };

  // Gestion du changement du mois dans le sélecteur
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Filtrage des données en fonction du mois sélectionné
  const filteredStatsData =
    selectedMonth === "Tous"
      ? statsData
      : statsData.filter((item) => item.month === selectedMonth);

  return (
    <Box sx={{ padding: theme.spacing(2) }}>
      {/* Bouton de bascule hors du contenu grisé pour rester accessible */}
      <Box
        sx={{
          marginBottom: theme.spacing(2),
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleComingSoonToggle}
        >
          {comingSoon ? "Désactiver le mode désactivé" : "Activer le mode désactivé"}
        </Button>
      </Box>

      {/* Contenu du dashboard avec effet désactivé si activé */}
      <Box
        sx={{
          filter: comingSoon ? "grayscale(100%) brightness(0.5)" : "none",
          pointerEvents: comingSoon ? "none" : "auto",
          position: "relative",
          padding: theme.spacing(5, 2),
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        {/* En-tête */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: theme.spacing(5),
            color: theme.palette.text.primary,
          }}
        >
          Tableau de Bord 🌱
        </Typography>

        {/* Sélecteur de mois pour filtrer le graphique */}
        <Box
          sx={{
            marginBottom: theme.spacing(3),
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="select-month-label">Mois</InputLabel>
            <Select
              labelId="select-month-label"
              value={selectedMonth}
              label="Mois"
              onChange={handleMonthChange}
            >
              <MenuItem value="Tous">Tous</MenuItem>
              <MenuItem value="Janvier">Janvier</MenuItem>
              <MenuItem value="Février">Février</MenuItem>
              <MenuItem value="Mars">Mars</MenuItem>
              <MenuItem value="Avril">Avril</MenuItem>
              <MenuItem value="Mai">Mai</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Statistiques principales */}
        <Grid container spacing={3} justifyContent="center">
          {/* Carte 1 : Total Connexions */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.success.main,
                  }}
                >
                  Total Connexions
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {totalConnexions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte 2 : Temps Total Passé */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.info.main,
                  }}
                >
                  Temps Total Passé
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {totalTempsPasse}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte 3 : Total Ajouts */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.warning.main,
                  }}
                >
                  Total Ajouts
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {totalAjouts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Carte 4 : Total Suppressions */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: theme.shadows[3],
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.error.main,
                  }}
                >
                  Total Suppressions
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: theme.palette.text.primary }}
                >
                  {totalSuppressions}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Graphique */}
        <Box sx={{ marginTop: theme.spacing(5) }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: theme.spacing(2),
              color: theme.palette.text.primary,
            }}
          >
            Statistiques Mensuelles 📊
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredStatsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
              />
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                }}
                labelStyle={{ color: theme.palette.text.primary }}
                itemStyle={{ color: theme.palette.text.primary }}
              />
              <Line
                type="monotone"
                dataKey="connexions"
                stroke={theme.palette.primary.main}
                name="Connexions"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="tempsPasse"
                stroke={theme.palette.secondary.main}
                name="Temps Passé (min)"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Résumé supplémentaire */}
        <Box sx={{ marginTop: theme.spacing(5), textAlign: "center" }}>
          <Paper
            sx={{
              padding: theme.spacing(3),
              maxWidth: 800,
              margin: "0 auto",
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[3],
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: theme.spacing(2),
                color: theme.palette.text.primary,
              }}
            >
              Résumé Global 🌟
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: theme.spacing(1), color: theme.palette.text.primary }}
            >
              Nombre total d'activités dans l'application : <strong>635</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: theme.spacing(1), color: theme.palette.text.primary }}
            >
              Temps moyen passé par session : <strong>12 minutes</strong>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.text.primary }}
            >
              Activité la plus populaire : <strong>Ajout de plantes</strong>
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
