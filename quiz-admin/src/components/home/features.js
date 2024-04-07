import { Avatar, Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import NextLink from "next/link";
import { downloadTheApp } from "../../utils/app";
const features = [
  {
    image: "/static/feature_1.png",
    name: "1. <br/> Post a <br/> Public Ask",
  },
  {
    image: "/static/feature_2.png",
    name: "2. <br/> Receive Nominations from the Community",
  },
  {
    image: "/static/feature_3.png",
    name: "3. <br/> Message the Nominees you want",
  },
];
const features2 = [
  {
    image: "/static/feature_1.png",
    name: "1. <br/> Browse your <br/> home screen",
  },
  {
    image: "/static/feature_2.png",
    name: "2. <br/> Tap the Ask Details to find out more",
  },
  {
    image: "/static/feature_3.png",
    name: "3. <br/> Nominate the best candidate for the job",
  },
];
export const Features = () => (
  <Box
    sx={{
      py: 15,
      "@media (max-width:767px)": {
        py: 10,
      },
    }}
  >
    <Container
      maxWidth="xl"
      sx={{
        "@media (max-width:767px)": {
          padding: 0,
          paddingLeft: 2,
        },
      }}
    >
      <Typography align="left" color="textPrimary" fontWeight={700} sx={{ mb: 2 }} variant="h2">
        How it works
      </Typography>
      <Typography align="left" color="textPrimary" fontWeight={700} sx={{ mb: 4 }} variant="h4">
        If you are in need of service provider <br /> recommendations & contacts
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          minHeight: 500,
          "& img": {
            width: "100%",
            marginTop: "-25%",
          },
          "@media (max-width:900px)": {
            "& img": {
              width: "100%",
              marginTop: "-75px",
            },
          },
          "@media (max-width:881px)": {
            "& img": {
              width: "100%",
              marginTop: "-100px",
            },
          },
          "@media (max-width:550px)": {
            "& img": {
              width: "100%",
              marginTop: "-150px",
            },
          },
        }}
      >
        {features.map((feature) => (
          <Grid
            item
            key={feature.name}
            md={4}
            xs={12}
          >
            <Box
              sx={{
                backgroundColor: "#F5F5F5",
                padding: 2,
                paddingLeft: 4,
                paddingRight: 4,
                minHeight: 300,
                borderRadius: 2,
                "@media (max-width:767px)": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            >
              <Typography
                color="textPrimary"
                sx={{
                  mb: 1,
                  mt: 3,
                }}
                variant="h3"
                fontWeight={700}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: feature.name,
                  }}
                ></span>
              </Typography>
            </Box>
            <Box
              sx={{
                fontSize: 0,
                position: "relative",
              }}
            >
              <img alt={feature.name} src={feature.image} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Typography
        align="left"
        color="textPrimary"
        fontWeight={700}
        sx={{ mb: 6, mt: 6 }}
        variant="h4"
      >
        If you are ready to help connect <br /> your network to service providers
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          minHeight: 500,
          "& img": {
            width: "100%",
            marginTop: "-25%",
          },
          "@media (max-width:900px)": {
            "& img": {
              width: "100%",
              marginTop: "-75px",
            },
          },
          "@media (max-width:881px)": {
            "& img": {
              width: "100%",
              marginTop: "-100px",
            },
          },
          "@media (max-width:550px)": {
            "& img": {
              width: "100%",
              marginTop: "-150px",
            },
          },
        }}
      >
        {features2.map((feature) => (
          <Grid
            item
            key={feature.name}
            md={4}
            xs={12}
          >
            <Box
              sx={{
                backgroundColor: "#F5F5F5",
                padding: 2,
                paddingLeft: 4,
                paddingRight: 4,
                minHeight: 300,
                borderRadius: 2,
                "@media (max-width:767px)": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            >
              <Typography
                color="textPrimary"
                sx={{
                  mb: 1,
                  mt: 3,
                }}
                variant="h3"
                fontWeight={700}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html: feature.name,
                  }}
                ></span>
              </Typography>
            </Box>
            <Box
              sx={{
                fontSize: 0,
                position: "relative",
              }}
            >
              <img alt={feature.name} src={feature.image} />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        sx={{
          mt: 6,
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Button
            color="primary"
            onClick={downloadTheApp}
            size="large"
            variant="contained"
            style={{
              color: "#fff",
              color: "#fff",
              padding: "10px 30px",
              color: "#fff",
              padding: "10px 30px",
              backgroundColor: "#000",
              borderRadius: 20,
              padding: "10px 20px",
              fontWeight: 600,
            }}
          >
            Download the App
          </Button>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
