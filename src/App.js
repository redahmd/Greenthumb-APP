// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Fab, Box, Zoom } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import Auth from "./components/Auth/auth";
import Forum from "./components/Forum";
import Evenements from "./components/Evenements";
import Astuces from "./components/Astuces";
import Rencontre from "./components/Rencontre"; 
import Stocks from "./components/Stocks"; 
import Historiques from "./components/Historiques";
import Dashboard from "./components/Dashboard";
import Arrosage from "./components/Arrosage";
import SoilAnalysis from "./components/SoilAnalysis";
import PlantProtection from "./components/PlantProtection";
import ExpertAdvice from "./components/ExpertAdvice";
import TeamSection from "./components/TeamSection";
import Contact from "./components/contact";
import Ecolo from "./components/Ecolo";
import MonJardinConfig from "./components/MonJardinConfig";
import CommunauteConfig from "./components/CommunauteConfig";
import CalendrierConfig from "./components/CalendrierConfig";
import Boutique from "./components/Boutique";
import MaladiesConfig from "./components/MaladiesConfig";
import PlantRecognition from "./components/PlantRecognition";
import { CustomThemeProvider } from "./ThemeContext";
import { AuthProvider } from './components/AuthContext';
import GardenScene from "./components/GardenScene";
import Checkout from "./components/Checkout";
import Confirmation from "./components/Confirmation";
import LoginForm from "./components/Auth/loginForm";
import RegisterForm from "./components/Auth/registerForm";
import ForgotPassword from "./components/Auth/ForgotPassword";
import VerifyCode from "./components/Auth/VerifyCode";
import SocialLoginSuccess from './components/SocialLoginSuccess';
import ProfilePage from './pages/ProfilePage';
import ChatBot from "./components/ChatBot";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <AuthProvider>
      <CustomThemeProvider>
        <CssBaseline />
        <Router>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Box sx={{ 
            paddingTop: '64px',
            minHeight: '100vh',
            backgroundColor: darkMode ? '#121212' : '#f0f0f0'
          }}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-code" element={<VerifyCode />} />
              <Route path="/social-login-success" element={<SocialLoginSuccess />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/evenements" element={<Evenements />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/astuces" element={<Astuces />} /> 
              <Route path="/rencontres" element={<Rencontre />} />
              <Route path="/stocks" element={<Stocks />} />
              <Route path="/historiques" element={<Historiques />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/arrosage" element={<Arrosage />} />
              <Route path="/soilAnalysis" element={<SoilAnalysis />} />
              <Route path="/plantProtection" element={<PlantProtection />} />
              <Route path="/expertAdvice" element={<ExpertAdvice />} />
              <Route path="/teamSection" element={<TeamSection />} />
              <Route path="/ecolo" element={<Ecolo />} />
              <Route path="/mon-jardin" element={<MonJardinConfig />} />
              <Route path="/communaute" element={<CommunauteConfig />} />
              <Route path="/calendrier" element={<CalendrierConfig />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/maladies" element={<MaladiesConfig />} />
              <Route path="/PlantRecognition" element={<PlantRecognition />} />
              <Route path="/jardin3d" element={<GardenScene />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Bouton flottant du ChatBot */}
            <Fab
              color="success"
              sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000,
                backgroundColor: '#4CAF50',
                '&:hover': {
                  backgroundColor: '#388E3C',
                },
              }}
              onClick={() => setChatOpen(!chatOpen)}
            >
              {chatOpen ? <CloseIcon /> : <ChatIcon />}
            </Fab>

            {/* Fenêtre du ChatBot */}
            <Zoom in={chatOpen}>
              <Box sx={{
                position: 'fixed',
                bottom: 80,
                right: 24,
                width: 350,
                maxHeight: '60vh',
                bgcolor: 'background.paper',
                boxShadow: 3,
                borderRadius: 2,
                zIndex: 999,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{ 
                  p: 2, 
                  flexGrow: 1, 
                  overflowY: 'auto',
                  backgroundColor: darkMode ? '#1E1E1E' : '#FFFFFF',
                  color: darkMode ? '#FFFFFF' : '#000000'
                }}>
                  <ChatBot />
                </Box>
              </Box>
            </Zoom>
          </Box>
        </Router>
      </CustomThemeProvider>
    </AuthProvider>
  );
}

export default App;
