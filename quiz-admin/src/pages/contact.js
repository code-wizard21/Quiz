import { useEffect } from "react";
import Head from "next/head";
import { AppBar, Box, Card, CardContent, Container, Grid, Toolbar } from "@mui/material";
import { useSettings } from "../contexts/settings-context";
import { useAuth } from "../hooks/use-auth";
import { gtm } from "../lib/gtm";

const Contact = () => {
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Contact Us | Moxie</title>
      </Head>
      <AppBar elevation={0} sx={{ backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ height: 64, textAlign: "center" }}>
            <h1
              style={{
                margin: "auto",
                color: settings.theme === "light" ? "#000" : "#fff",
              }}
            >
              Contact Us
            </h1>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          pt: "64px",
        }}
      >
        <Box sx={{ py: 9 }}>
          <Container maxWidth="md">
            <Grid
              container
              spacing={6}
              style={{
                justifyContent: "center",
              }}
            >
              <Grid
                item
                md={10}
                sx={{
                  display: {
                    md: "block",
                  },
                }}
                xs={12}
              >
                <Card>
                  <CardContent>
                    <p>
                      If you have any questions or concerns, please contact us at{" "}
                      <a href="mailto:moxieapp@gmail.com">moxieapp@gmail.com</a>
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
