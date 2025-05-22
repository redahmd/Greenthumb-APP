import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PeopleIcon from "@mui/icons-material/People";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const Nous = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
        Nous
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          component={Link}
          to="/histoire"
          startIcon={<HistoryEduIcon />}
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "limegreen", color: "white" },
          }}
        >
          Notre Histoire
        </Button>
        <Button
          component={Link}
          to="/equipe"
          startIcon={<PeopleIcon />}
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "limegreen", color: "white" },
          }}
        >
          Équipe
        </Button>
        <Button
          component={Link}
          to="/contact"
          startIcon={<ContactMailIcon />}
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "limegreen", color: "white" },
          }}
        >
          Contact
        </Button>
      </Box>
    </Box>
  );
};

export default Nous;
