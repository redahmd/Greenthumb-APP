// src/components/AuthPage.js

import React, { useState, useEffect } from "react";
import { Box} from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { useLocation } from "react-router-dom";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

// ------------------------------------------------------------------
// ANIMATIONS MULTICOUCHES
// ------------------------------------------------------------------

const waveAnimation1 = keyframes`
  0%   { background-position: 0 0; }
  50%  { background-position: 400px 0; }
  100% { background-position: 0 0; }
`;

const waveAnimation2 = keyframes`
  0%   { background-position: 0 0; }
  50%  { background-position: -300px 0; }
  100% { background-position: 0 0; }
`;

const colorShift = keyframes`
  0%   { background: rgba(154,205,50,0.4); }
  25%  { background: rgba(122,255,122,0.4); }
  50%  { background: rgba(173,255,47,0.4); }
  75%  { background: rgba(54,220,50,0.4); }
  100% { background: rgba(154,205,50,0.4); }
`;

const glint = keyframes`
  0%   { background-position: 0 0; }
  50%  { background-position: 200px 0; }
  100% { background-position: 0 0; }
`;

// ------------------------------------------------------------------
// STYLED COMPONENTS
// ------------------------------------------------------------------

const Root = styled(Box)({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
});

const VideoBg = styled("video")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -3,
});

const WaveOverlay1 = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  background: `linear-gradient(
    to bottom right,
    rgba(154,205,50,0.4),
    rgba(173,255,47,0.4)
  ), url("https://laviedesreines.com/wp-content/uploads/2021/07/family-park-running-having-fun-735x490.jpg")`,
  backgroundSize: "500px 500px",
  backgroundRepeat: "repeat",
  animation: `${waveAnimation1} 30s infinite linear, ${colorShift} 60s infinite linear`,
  zIndex: -2,
});

const WaveOverlay2 = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  background: `linear-gradient(
    to bottom right,
    rgba(205,255,205,0.1),
    rgba(255,255,255,0.05)
  ), url("https://image.freepik.com/photos-gratuite/famille-heureuse-recolte-dans-jardin_1398-1864.jpg")`,
  backgroundSize: "600px 600px",
  backgroundRepeat: "repeat",
  mixBlendMode: "overlay",
  animation: `${waveAnimation2} 50s infinite linear`,
  zIndex: -1,
});

const Card3D = styled(Box)({
  position: "relative",
  width: "90%",
  maxWidth: 450,
  height: 600,
  perspective: "1200px",
  borderRadius: 24,
  background: `linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  )`,
  backdropFilter: "blur(12px)",
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  animation: `${glint} 8s infinite linear`,
});

const CardInner = styled(Box)(({ mode }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: 24,
  transformStyle: "preserve-3d",
  transition: "transform 1s ease",
  transform: mode === "register" ? "rotateY(180deg)" : "rotateY(0deg)",
}));

const CardFace = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: 24,
  background: "rgba(255,255,255,0.92)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(4),
  boxSizing: "border-box",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
  },
  "&:hover": {
    scrollbarWidth: "thin",
  },
  "&:hover::-webkit-scrollbar": {
    width: "6px",
  },
  "&:hover::-webkit-scrollbar-thumb": {
    backgroundColor: "#aaa",
    borderRadius: "4px",
  },
}));

const CardBack = styled(CardFace)({
  transform: "rotateY(180deg)",
});

// ------------------------------------------------------------------
// COULEURS (restent, même si les boutons ont été retirés)
// ------------------------------------------------------------------



// ------------------------------------------------------------------
// COMPOSANT PRINCIPAL
// ------------------------------------------------------------------

export default function AuthPage() {
  const location = useLocation();

  const [mode, setMode] = useState(() => {
    const params = new URLSearchParams(location.search);
    const formParam = params.get("form");
    if (formParam === "register") return "register";
    return "login";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const formParam = params.get("form");
    if (formParam === "register") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [location.search]);

  const switchToLogin = () => setMode("login");
  const switchToRegister = () => setMode("register");

  return (
    <Root>
      {/* VIDÉO DE FOND */}
      <VideoBg autoPlay loop muted playsInline>
        <source
          src="https://videos.pexels.com/video-files/4625827/4625827-hd_1080_1920_30fps.mp4"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas la lecture vidéo.
      </VideoBg>

      {/* Overlays multiples */}
      <WaveOverlay1 />
      <WaveOverlay2 />

      {/* Carte 3D */}
      <Card3D>
        <CardInner mode={mode}>
          {/* Face avant => LOGIN */}
          <CardFace>
            {/* Phrase et boutons réseaux sociaux supprimés ici */}
            <LoginForm onSwitchToRegister={switchToRegister} />
          </CardFace>

          {/* Face arrière => REGISTER */}
          <CardBack>
            {/* Phrase et boutons réseaux sociaux supprimés ici */}
            <RegisterForm onSwitchToLogin={switchToLogin} />
          </CardBack>
        </CardInner>
      </Card3D>
    </Root>
  );
}
