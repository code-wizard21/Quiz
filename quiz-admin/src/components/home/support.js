import { Avatar, AvatarGroup, Box, Button, Card, Container, Grid, Typography } from "@mui/material";

const tech = [
  {
    name: "react",
    icon: "/static/react.svg",
  },
  {
    name: "typescript",
    icon: "/static/typescript.svg",
  },
  {
    name: "figma",
    icon: "/static/figma.svg",
  },
];

const members = [
  {
    avatar: "https://cdn.devias.io/assets/avatars/stefania-vladutu.png",
    name: "Stefania Vladutu",
  },
  {
    avatar: "https://cdn.devias.io/assets/avatars/alexandru-comanescu.png",
    name: "Alexandru Comanescu",
  },
  {
    avatar: "https://cdn.devias.io/assets/avatars/adrian-manea.png",
    name: "Adrian Manea",
  },
];

export const Support = () => (
  <Box>
    <Container maxWidth="xl">
      <Card
        elevation={0}
        sx={{
          backgroundColor: "#F5F5F5",
          borderRadius: 5,
        }}
      >
        <Grid
          container
          sx={{
            pb: {
              md: 6,
              xs: 3,
            },
            pt: {
              md: 8,
              xs: 3,
            },
            px: {
              md: 8,
              xs: 3,
            },
          }}
        >
          <Grid
            item
            md={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mb: {
                md: 0,
                xs: 0,
              },
              pr: {
                md: 4,
              },
              "@media (max-width:767px)": {
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              variant="h1"
              fontWeight="700"
              sx={{
                fontSize: 72,
                "@media (max-width:767px)": {
                  my: 2,
                  fontSize: 36,
                },
              }}
            >
              Get in touch
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                "@media (max-width:767px)": {
                  display: "block",
                },
              }}
            >
              <Typography color="textPrimary" variant="h4" fontWeight={600}>
                Email us :
              </Typography>
              <Button
                color="primary"
                rel="nofollow noreferrer noopener"
                target="_blank"
                variant="text"
                style={{
                  padding: "10px 30px",
                  borderRadius: 20,
                  color: "#fff",
                  backgroundColor: "#000",
                  marginLeft: 10,
                  fontWeight: 600,
                }}
                fontSize={24}
                sx={{
                  "@media (max-width:767px)": {
                    marginLeft: 0,
                    marginTop: 2,
                  },
                }}
              >
                lobangmoxie@gmail.com
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  </Box>
);
