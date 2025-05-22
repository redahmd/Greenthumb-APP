/***************************************************************************
 * NAVBAR FINAL - VERSION ULTRA ++
 * - Esthétique améliorée (animations, transitions)
 * - Correction des bugs du Drawer (fermeture, clics)
 * - UX mobile améliorée
 * - Thème adaptatif (couleurs plus riches)
 **************************************************************************/
import Chat from "./Chat"; // ajuste le chemin si besoin
import ForumIcon from "@mui/icons-material/Forum";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Avatar,
  Badge,
  
  Switch,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  alpha,
  Autocomplete,
  Paper,
  CircularProgress,
  Collapse,
} from "@mui/material";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

// Exemples d’icônes pour les items
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";

import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ScienceIcon from "@mui/icons-material/Science";
import PestControlRodentIcon from "@mui/icons-material/PestControlRodent";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import TimelineIcon from "@mui/icons-material/Timeline";
import HandshakeIcon from "@mui/icons-material/Handshake";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

// Import du contexte et du thème
import { ColorModeContext } from "../ThemeContext";
import { useTheme } from "@mui/material/styles";
// Import du contexte d'authentification
import { useAuth } from "./AuthContext";

/* =========================
   WAVE TOP & WAVE BOTTOM
   ========================= */
const WaveTop = React.memo(function WaveTop() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        lineHeight: 0,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "50px" }}
      >
        <path
          d="M-1.41,94.06 C137.51,9.33 339.07,185.23 501.82,31.85 L500.00,0.00 L0.00,0.00 Z"
          style={{ fill: "#2ecc71" }}
        />
      </svg>
    </Box>
  );
});

const WaveBottom = React.memo(function WaveBottom() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        lineHeight: 0,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "50px" }}
      >
        <path
          d="M-0.89,38.16 C153.24,169.58 337.66,-83.12 500.70,125.03 L500.00,150.00 L0.00,150.00 Z"
          style={{ fill: "#2ecc71" }}
        />
      </svg>
    </Box>
  );
});

/* =========================
   MegaMenuHorizontal
   ========================= */
const MegaMenuHorizontal = React.memo(function MegaMenuHorizontal({
  items = [],
  darkMode,
}) {
  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: 2,
        border: darkMode ? "1px solid #1abc9c" : "1px solid #2ecc71",
        background: darkMode ? alpha("#34495e", 0.8) : "#fff",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap", // évite la compression
          gap: 2,
        }}
      >
        {items.map((item, idx) => (
          <Button
            key={idx}
            component={Link}
            to={item.to}
            variant="text"
            startIcon={item.icon}
            sx={{
              textTransform: "none",
              color: "#32CD32",
              "&:hover": {
                backgroundColor: alpha("#32CD32", 0.1),
                transition: "background-color 0.3s ease",
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>
    </Paper>
  );
});

/* =========================
   Données du menu
   ========================= */
const menuData = [
  {
    name: "Gestion",
    items: [
      { label: "Tableau de bord", icon: <DashboardIcon />, to: "/Dashboard" },
      { label: "Historiques", icon: <TimelineIcon />, to: "/historiques" },
      { label: "Stocks", icon: <AddBusinessIcon />, to: "/stocks" },
    ],
  },
  {
    name: "Communauté",
    items: [
      { label: "Forum", icon: <ForumIcon />, to: "/forum" },
      { label: "Événements", icon: <EventIcon />, to: "/evenements" },
      { label: "Astuces", icon: <TipsAndUpdatesIcon />, to: "/astuces" },
      { label: "Rencontres", icon: <PeopleAltIcon />, to: "/rencontres" },
    ],
  },
  {
    name: "Services",
    items: [
      { label: "Aide Arrosage", icon: <BuildCircleIcon />, to: "/arrosage" },
      { label: "Analyse Sol", icon: <ScienceIcon />, to: "/SoilAnalysis" },
      {
        label: "Protection Plantes",
        icon: <PestControlRodentIcon />,
        to: "/plantProtection",
      },
      { label: "Conseils Experts", icon: <HandshakeIcon />, to: "/ExpertAdvice" },
    ],
  },
  {
    name: "Nous",
    items: [
      { label: "Notre Équipe", icon: <PeopleAltIcon />, to: "/teamSection" },
      { label: "Contact", icon: <ForumIcon />, to: "/contact" },
      { label: "Écolo", icon: <LocalFloristIcon />, to: "/Ecolo" },
    ],
  },
  {
    // Nouveau menu sans sous-items => pas de flèche
    name: "Shop",
    items: [
      { label: "Acheter des produits", icon: <PeopleAltIcon />, to: "/Boutique" },
      { label: "Vendre des produits", icon: <ForumIcon />, to: "/Vendre" },
    ],
  },
];

/* =========================
   NAVBAR PRINCIPALE
   ========================= */
export default function FinalMegaNavbar() {
  // Déclaration des hooks en haut du composant
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  // Récupération du contexte de thème et de couleur
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const darkMode = theme.palette.mode === "dark";

  // Récupération du contexte d'authentification
  const { isAuthenticated, user, logout } = useAuth();

  // Navigation et route courante
  const navigate = useNavigate();
  const location = useLocation();

  // Détecter l'affichage mobile
  const isMobile = useMediaQuery("(max-width:768px)");

  // Gestion du scroll pour ajouter une ombre à la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion des suggestions dans la recherche
  useEffect(() => {
    if (searchText.length > 1) {
      setLoadingSuggestions(true);
      const timer = setTimeout(() => {
        setLoadingSuggestions(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchText]);

  // Fonction pour le bouton "Retour"
  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  // Fonction pour ouvrir/fermer le Drawer (menu mobile)
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Gestion du survol pour le menu horizontal
  const handleMenuOpen = (menuName) => setActiveMenu(menuName);
  const handleMenuClose = () => setActiveMenu(null);

  // Menu utilisateur
  const handleOpenUserMenu = (e) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Fonction de bascule pour le sous-menu dans le Drawer
  const handleSubMenuClick = (menuName) => {
    setOpenSubMenu((prev) => (prev === menuName ? null : menuName));
  };

  // Menu horizontal avec mémoïsation
  const menuHorizontal = React.useMemo(
    () => (
      <Box sx={{ display: "flex", gap: 3 }}>
        {menuData.map((menu) => (
          <Box
            key={menu.name}
            onMouseEnter={() => handleMenuOpen(menu.name)}
            onMouseLeave={handleMenuClose}
            sx={{ position: "relative" }}
          >
            <Button
              sx={{
                color: darkMode ? "#ecf0f1" : "#2c3e50",
                textTransform: "capitalize",
                fontSize: "1rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { color: "#1abc9c" },
              }}
              component={Link}
              to={menu.items.length === 0 ? "/shop" : "#"}
            >
              {menu.name}
              {menu.items.length > 0 && <ExpandMoreIcon />}
            </Button>
            <AnimatePresence>
              {activeMenu === menu.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: "absolute", top: "100%", left: 0, zIndex: 1 }}
                >
                  <MegaMenuHorizontal items={menu.items} darkMode={darkMode} />
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        ))}
      </Box>
    ),
    [darkMode, activeMenu]
  );

  return (
    <>
      {/* WaveTop au-dessus de la navbar */}
      <WaveTop />
      <Dialog open={chatOpen} onClose={() => setChatOpen(false)} fullWidth maxWidth="md">
        <DialogTitle className="flex justify-between items-center">
          💬 Chat botanique
          <IconButton onClick={() => setChatOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Chat />
        </DialogContent>
      </Dialog>

      <AppBar
        position="sticky"
        sx={{
          backgroundColor: darkMode
            ? alpha("#2c3e50", 0.8)
            : "rgba(255, 255, 255, 0.9)",
          color: darkMode ? "#ecf0f1" : "#2c3e50",
          boxShadow: scrolled ? "0 4px 15px rgba(0, 0, 0, 0.2)" : "none",
          padding: scrolled ? "5px 0" : "10px 0",
          transition: "all 0.3s ease",
          width: "100%",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
          zIndex: 1000,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            px: isMobile ? 2 : 4,
          }}
        >
          {/* ZONE GAUCHE : Bouton Menu (mobile) + Bouton Retour (desktop) + Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: darkMode ? "#ecf0f1" : "#27ae60", mr: 2 }}
                aria-label="Ouvrir le menu principal"
              >
                <MenuIcon />
              </IconButton>
            )}
            {!isMobile && location.pathname !== "/" && (
              <Button
                onClick={handleBack}
                color="inherit"
                startIcon={<ArrowBackIcon fontSize="small" />}
                aria-label="Retour à la page précédente"
              >
                Retour
              </Button>
            )}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: darkMode ? "#1abc9c" : "#27ae60",
                fontWeight: "bold",
                fontSize: isMobile ? "1.2rem" : "1.5rem",
                "&:hover": { color: "#2ecc71" },
                transition: "color 0.3s ease",
              }}
            >
              GreenThumb
            </Typography>
          </Box>

          {/* ZONE DROITE */}
          {isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Toggle Dark Mode">
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  aria-label="Changer le thème"
                >
                  {darkMode ? (
                    <Brightness7Icon sx={{ color: "#f1c40f" }} />
                  ) : (
                    <Brightness4Icon sx={{ color: "#27ae60" }} />
                  )}
                </IconButton>
              </Tooltip>
              <IconButton aria-label="Voir les notifications">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon
                    sx={{ color: darkMode ? "#ecf0f1" : "#27ae60" }}
                  />
                </Badge>
              </IconButton>
              {isAuthenticated ? (
  <Box sx={{ display: "flex", gap: 1 }}>
    <Button
      component={Link}
      to="/dashboard"
      startIcon={<DashboardIcon />}
      color="inherit"
    >
      Dashboard
    </Button>
    <Button
      onClick={() => {
        logout(); // ta fonction du contexte
        navigate("/"); // retourne à l'accueil après déconnexion
      }}
      startIcon={<LogoutIcon />}
      color="inherit"
    >
      Se déconnecter
    </Button>
  </Box>
) : (
  <Box sx={{ display: "flex", gap: 1 }}>
    <Button
      component={Link}
      to="/auth?form=login"
      startIcon={<LoginIcon />}
      color="inherit"
    >
      Connexion
    </Button>
    <Button
      component={Link}
      to="/auth?form=register"
      startIcon={<HowToRegIcon />}
      color="inherit"
    >
      Inscription
    </Button>
  </Box>
)}

            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {searchOpen ? (
                <Autocomplete
                  freeSolo
                  options={[
                    "Tomates bio",
                    "Calendrier semis",
                    "Compost maison",
                  ]}
                  loading={loadingSuggestions}
                  loadingText="Chargement..."
                  sx={{
                    width: 250,
                    backgroundColor: darkMode
                      ? alpha("#2c3e50", 0.2)
                      : "#f9f9f9",
                    borderRadius: "15px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#27ae60",
                        transition: "border-color 0.3s ease",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2ecc71",
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Rechercher..."
                      onChange={(e) => setSearchText(e.target.value)}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loadingSuggestions && (
                              <CircularProgress color="inherit" size={16} />
                            )}
                            {params.InputProps.endAdornment}
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setSearchOpen(false)}
                                sx={{ color: "#2c3e50" }}
                                aria-label="Fermer la recherche"
                              >
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  )}
                />
              ) : (
                <IconButton
                  onClick={() => setSearchOpen(true)}
                  sx={{
                    color: darkMode ? "#ecf0f1" : "#27ae60",
                    "&:hover": { color: "#2ecc71" },
                    transition: "color 0.3s ease",
                  }}
                  aria-label="Ouvrir la recherche"
                >
                  <SearchIcon />
                </IconButton>
              )}
              {menuHorizontal}
              <Tooltip title="Ouvrir le chat">
                <IconButton onClick={() => setChatOpen(true)} color="inherit">
                  <ForumIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle Dark Mode">
                <Switch
                  checked={darkMode}
                  onChange={colorMode.toggleColorMode}
                  aria-label="Changer le thème"
                />
              </Tooltip>
              <IconButton aria-label="Voir les notifications">
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon
                    sx={{ color: darkMode ? "#ecf0f1" : "#27ae60" }}
                  />
                </Badge>
              </IconButton>
              {isAuthenticated ? (
                <IconButton
                  onClick={handleOpenUserMenu}
                  aria-label="Ouvrir le menu utilisateur"
                >
                  <Avatar sx={{ bgcolor: "#7f8c8d" }}>
                    {user.name ? user.name[0] : <SwitchAccountIcon /> }
                  </Avatar>
                </IconButton>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    component={Link}
                    to="/auth?form=login"
                    startIcon={<LoginIcon />}
                    color="inherit"
                  >
                    Connexion
                  </Button>
                  <Button
                    component={Link}
                    to="/auth?form=register"
                    startIcon={<HowToRegIcon />}
                    color="inherit"
                  >
                    Inscription
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* WaveBottom en-dessous de la navbar */}
      <WaveBottom />

      {/* Menu Utilisateur (Popup Menu) : affiché uniquement si l'utilisateur est connecté */}
      {user && (
  <Menu
    sx={{ mt: "45px" }}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    keepMounted
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
  >
    <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
      <ListItemIcon>
        <SwitchAccountIcon fontSize="small" />
      </ListItemIcon>
      <Typography textAlign="center">Mon Profil</Typography>
    </MenuItem>

    

    <MenuItem onClick={() => { logout(); handleCloseUserMenu(); }}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <Typography textAlign="center">Déconnexion</Typography>
    </MenuItem>
  </Menu>
)}


      {/* Menu Drawer (Mobile) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            background: darkMode ? "#2c3e50" : "#f5f6fa",
          },
        }}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          {/* En-tête du menu */}
          <Box
            sx={{
              p: 2,
              bgcolor: darkMode ? "#34495e" : "#2ecc71",
              color: darkMode ? "#ecf0f1" : "white",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Menu Principal
            </Typography>
            <Typography variant="caption">GreenThumb</Typography>
          </Box>

          <List sx={{ flex: 1, p: 1 }}>
            {menuData.map((menu) => (
              <React.Fragment key={menu.name}>
                <ListItem
                  disablePadding
                  sx={{
                    "&:hover": {
                      bgcolor: darkMode
                        ? alpha("#ecf0f1", 0.1)
                        : alpha("#2ecc71", 0.1),
                    },
                  }}
                >
                  <ListItemButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubMenuClick(menu.name);
                    }}
                    sx={{ py: 1.5 }}
                  >
                    <ListItemIcon
                      sx={{ color: darkMode ? "#1abc9c" : "#27ae60" }}
                    >
                      {menu.items[0].icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={menu.name}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        color: darkMode ? "#ecf0f1" : "#2c3e50",
                      }}
                    />
                    {menu.items.length > 0 && (
                      <ExpandMoreIcon
                        sx={{
                          transform:
                            openSubMenu === menu.name ? "rotate(180deg)" : "none",
                          transition: "transform 0.3s ease",
                          color: darkMode ? "#1abc9c" : "#27ae60",
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={openSubMenu === menu.name}
                  timeout="auto"
                  unmountOnExit
                  sx={{ ml: 2 }}
                >
                  {menu.items.map((item) => (
                    <ListItemButton
                      key={item.label}
                      component={Link}
                      to={item.to}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDrawerOpen(false);
                      }}
                      sx={{
                        pl: 4,
                        "&:hover": {
                          bgcolor: darkMode
                            ? alpha("#1abc9c", 0.1)
                            : alpha("#2ecc71", 0.1),
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{ color: darkMode ? "#1abc9c" : "#27ae60" }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          color: darkMode ? "#ecf0f1" : "#2c3e50",
                        }}
                      />
                    </ListItemButton>
                  ))}
                </Collapse>
                <Divider sx={{ my: 1 }} />
              </React.Fragment>
            ))}
          </List>

          {/* Section basse du menu */}
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${darkMode ? "#34495e" : "#eee"}`,
            }}
          >
            <ListItemButton
              onClick={colorMode.toggleColorMode}
              sx={{
                borderRadius: 1,
                mb: 1,
                bgcolor: darkMode
                  ? alpha("#1abc9c", 0.1)
                  : alpha("#2ecc71", 0.1),
              }}
            >
              <ListItemIcon>
                {darkMode ? (
                  <Brightness7Icon sx={{ color: "#f1c40f" }} />
                ) : (
                  <Brightness4Icon sx={{ color: "#27ae60" }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={darkMode ? "Mode Clair" : "Mode Sombre"}
                primaryTypographyProps={{
                  color: darkMode ? "#ecf0f1" : "#2c3e50",
                }}
              />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
