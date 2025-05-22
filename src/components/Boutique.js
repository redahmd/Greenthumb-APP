import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Chip,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Stack,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Badge,
  Tooltip
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Rating } from '@mui/material';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const products = [
  {
    name: "Kit de Plantation Bio",
    description: "Graines, pots biodégradables, tuteur et guide inclus.",
    image: "/images/mo.jpg",
    price: 24.9,
    category: "Graines",
    tag: "Nouveau"
  },
  {
    name: "Outils de Jardinage Premium",
    description: "En acier inoxydable avec poignée ergonomique.",
    image: "/images/71j6Kdlcq5L._AC_.jpg",
    price: 34.5,
    category: "Outils",
    tag: "Éco"
  },
  {
    name: "Composteur de Balcon",
    description: "Compact, sans odeur, idéal pour débuter en compost.",
    image: "/images/balcomposteur-mon-petit-potager.jpg",
    price: 42,
    category: "Compost",
    tag: "Best-seller"
  }
];

export default function Boutique() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const [filter, setFilter] = useState("Tous");
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToCart = (item) => {
    setCart([...cart, item]);
    setSnackbar({ open: true, message: `${item.name} ajouté au panier !` });
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  const handleRatingChange = (name, value) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = filter === "Tous" ? products : products.filter(p => p.category === filter);
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <Box sx={{ p: 4, bgcolor: "#f4f7f6", minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h3" fontWeight="bold">🛒 Boutique GreenThumb</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Suivi de commande bientôt disponible">
            <Button startIcon={<TrackChangesIcon />} disabled variant="outlined" color="warning">
              Suivi Commande (bientôt disponible)
            </Button>
          </Tooltip>
          <IconButton color="primary" onClick={() => setDrawerOpen(true)}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Stack>
      </Stack>

      <Typography variant="body1" mb={4}>Trouvez graines, outils et plus pour votre jardin écologique.</Typography>

      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Typography>Catégorie :</Typography>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="Tous">Tous</MenuItem>
          <MenuItem value="Graines">Graines</MenuItem>
          <MenuItem value="Outils">Outils</MenuItem>
          <MenuItem value="Compost">Compost</MenuItem>
        </Select>
      </Stack>

      <Grid container spacing={3}>
        {filtered.map((product, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card>
              <CardMedia component="img" height="160" image={product.image} alt={product.name} />
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{product.name}</Typography>
                  <IconButton onClick={() => toggleFavorite(product.name)}>
                    {favorites.includes(product.name) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Stack>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Chip label={product.tag} color="success" size="small" sx={{ mt: 1 }} />
                <Typography variant="h6" sx={{ mt: 1.5 }} color="success.main">{product.price.toFixed(2)} €</Typography>
                <Rating
                  name={product.name}
                  value={ratings[product.name] || 0}
                  onChange={(e, newValue) => handleRatingChange(product.name, newValue)}
                  sx={{ mt: 1 }}
                />
              </CardContent>
              <CardActions>
                <Button fullWidth variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
                  Ajouter au panier
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" mb={2}>🧺 Mon Panier</Typography>
          {cart.length === 0 ? (
            <Typography variant="body2">Votre panier est vide.</Typography>
          ) : (
            <>
              <List>
                {cart.map((item, index) => (
                  <ListItem key={index} secondaryAction={
                    <Button size="small" color="error" onClick={() => handleRemoveFromCart(index)}>Retirer</Button>
                  }>
                    <ListItemText primary={item.name} secondary={`${item.price.toFixed(2)} €`} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Total : {total.toFixed(2)} €</Typography>
              <Button fullWidth variant="contained" color="success" sx={{ mt: 2 }} onClick={() => window.location.href = '/checkout'}>
                Commander
              </Button>
            </>
          )}
        </Box>
      </Drawer>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
