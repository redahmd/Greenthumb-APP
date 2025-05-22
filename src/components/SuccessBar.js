// src/components/SuccessBar.js
import React, { useEffect } from "react";
import { styled, keyframes } from "@mui/system";
import PropTypes from "prop-types";

// Définir l'animation pour la rétraction de la barre
const retract = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

// Styled component pour la barre
const Bar = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  height: "4px",
  backgroundColor: theme.palette.success.main, // Couleur verte
  animation: `${retract} 4s forwards`,
  zIndex: 1300, // Assurez-vous que la barre est au-dessus des autres éléments
}));

const SuccessBar = ({ onComplete }) => {
  useEffect(() => {
    // Après l'animation (4 secondes), exécuter la fonction onComplete
    const timer = setTimeout(() => {
      onComplete();
    }, 4000); // 4000 ms = 4 secondes

    return () => clearTimeout(timer);
  }, [onComplete]);

  return <Bar />;
};

SuccessBar.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default SuccessBar;
