import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Grid,
  Divider,
  Paper,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LockIcon from "@mui/icons-material/Lock";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("Carte bancaire");
  const [info, setInfo] = useState({
    name: "",
    address: "",
    card: "",
    expiration: "",
    cvv: ""
  });
  const [cart, setCart] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = () => {
    setDialogOpen(true);
    setTimeout(() => {
      window.location.href = "/confirmation";
    }, 5000);
    console.log(`📲 SMS envoyé à ${info.name} avec les instructions pour ${paymentMethod}`);
};

  const handleGeneratePDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("🧾 Facture de commande GreenThumb", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Nom: ${info.name}`, 20, 30);
    pdf.text(`Adresse: ${info.address}`, 20, 40);
    let y = 50;
    cart.forEach((item, idx) => {
      pdf.text(`- ${item.name}: ${item.price.toFixed(2)} €`, 20, y);
      y += 10;
    });
    pdf.text(`Total: ${total.toFixed(2)} €`, 20, y + 5);
    pdf.save("facture_greenthumb.pdf");
  };

  return (
    <Box sx={{ bgcolor: "#f5f7fa", py: 5, minHeight: "100vh" }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
          💳 Paiement sécurisé
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={4}>
          Finalisez votre commande avec l'une de nos méthodes de paiement locales ou internationales.
        </Typography>

        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>🧾 Informations de livraison</Typography>
              <Stack spacing={2}>
                <TextField label="Nom complet" name="name" fullWidth required value={info.name} onChange={handleChange} />
                <TextField label="Adresse de livraison" name="address" fullWidth required multiline rows={2} value={info.address} onChange={handleChange} />
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>🛒 Récapitulatif de commande</Typography>
              {cart.length === 0 ? (
                <Typography color="text.secondary">Votre panier est vide.</Typography>
              ) : (
                <List>
                  {cart.map((item, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemText primary={item.name} secondary={`${item.price.toFixed(2)} €`} />
                    </ListItem>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <ListItem>
                    <ListItemText primary="Total" secondary={`${total.toFixed(2)} €`} />
                  </ListItem>
                </List>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>💰 Méthode de paiement</Typography>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Méthode de paiement</InputLabel>
                  <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} label="Méthode de paiement">
                    <MenuItem value="Carte bancaire">Carte bancaire</MenuItem>
                    <MenuItem value="Wafa Cash">Wafa Cash</MenuItem>
                    <MenuItem value="CashPlus">CashPlus</MenuItem>
                    <MenuItem value="Barid Cash">Barid Cash</MenuItem>
                    <MenuItem value="Paiement à la livraison">Paiement à la livraison</MenuItem>
                  </Select>
                </FormControl>
                {paymentMethod === "Carte bancaire" && (
                  <>
                    <TextField label="Numéro de carte" name="card" fullWidth required value={info.card} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><CreditCardIcon /></InputAdornment>) }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField label="Expiration (MM/AA)" name="expiration" fullWidth required value={info.expiration} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><CalendarTodayIcon /></InputAdornment>) }} />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="CVV" name="cvv" fullWidth required value={info.cvv} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>) }} />
                      </Grid>
                    </Grid>
                  </>
                )}
                {paymentMethod !== "Carte bancaire" && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Vous recevrez un SMS avec les instructions de paiement via {paymentMethod}.
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Box textAlign="center">
            <Button variant="contained" color="success" size="large" onClick={handleSubmit} startIcon={<PaymentIcon />}>
              Confirmer la commande
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Animation de succès */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>🎉 Commande validée</DialogTitle>
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ p: 2 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
            <Typography variant="body1">Merci pour votre commande, {info.name} !</Typography>
            <Typography variant="body2">
              Une confirmation vous sera envoyée par e-mail ou SMS dans quelques instants.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              📲 Notification simulée pour {paymentMethod}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleGeneratePDF}>📄 Télécharger la facture</Button>
          <Button variant="contained" color="success" onClick={() => setDialogOpen(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
