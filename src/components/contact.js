import React from "react";
import { Box, Typography, Grid, Button, TextField, Paper, IconButton, useTheme } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const Contact = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(7.5, 2), backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold", marginBottom: theme.spacing(5), color: theme.palette.text.primary }}>
        Nous Contacter 📞
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: theme.spacing(3), boxShadow: theme.shadows[3], backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h5" sx={{ marginBottom: theme.spacing(2.5), color: theme.palette.text.primary }}>
              Envoyez-nous un message
            </Typography>
            <TextField
              label="Votre Nom"
              fullWidth
              sx={{ marginBottom: theme.spacing(2.5) }}
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Votre Email"
              type="email"
              fullWidth
              sx={{ marginBottom: theme.spacing(2.5) }}
              variant="outlined"
              color="primary"
            />
            <TextField
              label="Votre Message"
              multiline
              rows={4}
              fullWidth
              sx={{ marginBottom: theme.spacing(2.5) }}
              variant="outlined"
              color="primary"
            />
            <Button
              variant="contained"
              color="success"
              fullWidth
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: theme.shape.borderRadius,
                py: 1.5,
                "&:hover": {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              Envoyer
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: theme.spacing(3), boxShadow: theme.shadows[3], backgroundColor: theme.palette.background.paper }}>
            <Typography variant="h5" sx={{ marginBottom: theme.spacing(2.5), color: theme.palette.text.primary }}>
              Coordonnées
            </Typography>
            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", marginBottom: theme.spacing(1.5), color: theme.palette.text.primary }}>
              <LocationOnIcon sx={{ marginRight: theme.spacing(1) }} />
              123 Rue des Jardins, Paris, France
            </Typography>
            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", marginBottom: theme.spacing(1.5), color: theme.palette.text.primary }}>
              <PhoneIcon sx={{ marginRight: theme.spacing(1) }} />
              +33 1 23 45 67 89
            </Typography>
            <Typography variant="body1" sx={{ display: "flex", alignItems: "center", marginBottom: theme.spacing(1.5), color: theme.palette.text.primary }}>
              <EmailIcon sx={{ marginRight: theme.spacing(1) }} />
              contact@greenthumb.com
            </Typography>
            <Box sx={{ marginTop: theme.spacing(2), textAlign: "center" }}>
              <IconButton href="#" target="_blank">
                <LinkedInIcon color="primary" />
              </IconButton>
              <IconButton href="#" target="_blank">
                <FacebookIcon color="primary" />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
