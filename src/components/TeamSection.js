import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia, IconButton, useTheme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const teamMembers = [
  {
    name: "Jean Dupont",
    role: "Développeur Front-End",
    description: "Passionné par les interfaces modernes et intuitives.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1080&auto=format&fit=crop",
    linkedIn: "#",
    github: "#",
    email: "jean.dupont@example.com",
  },
  {
    name: "Marie Curie",
    role: "Data Scientist",
    description: "Experte en analyse de données et intelligence artificielle.",
    photo: "https://images.unsplash.com/photo-1556791000-1572f2316d6f?q=80&w=1080&auto=format&fit=crop",
    linkedIn: "#",
    github: "#",
    email: "marie.curie@example.com",
  },
  {
    name: "Alex Martin",
    role: "Designer UX/UI",
    description: "Créateur de designs élégants et ergonomiques.",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1080&auto=format&fit=crop",
    linkedIn: "#",
    github: "#",
    email: "alex.martin@example.com",
  },
];

const TeamSection = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(7.5, 2), textAlign: "center", backgroundColor: theme.palette.background.default }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: theme.spacing(5), color: theme.palette.text.primary }}>
        Notre Équipe 🌟
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: theme.shadows[3],
                borderRadius: theme.shape.borderRadius,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: theme.shadows[6] },
              }}
            >
              <CardMedia
                component="img"
                image={member.photo}
                alt={member.name}
                sx={{ height: "200px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: theme.spacing(1.5), color: theme.palette.text.primary }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ marginBottom: theme.spacing(2) }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: theme.spacing(3) }}>
                  {member.description}
                </Typography>
                <Box>
                  <IconButton href={member.linkedIn} target="_blank">
                    <LinkedInIcon color="primary" />
                  </IconButton>
                  <IconButton href={member.github} target="_blank">
                    <GitHubIcon color="action" />
                  </IconButton>
                  <IconButton href={`mailto:${member.email}`} target="_blank">
                    <EmailIcon color="error" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamSection;
