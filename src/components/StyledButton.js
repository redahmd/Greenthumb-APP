import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const StyledButton = ({ to, children }) => {
  return (
    <Button
      component={Link}
      to={to}
      variant="outlined"
      sx={{
        textTransform: "capitalize",
        "&:hover": { backgroundColor: "limegreen", color: "white" },
      }}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
