import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { AppBar, Box, Card, CardContent, Container, Grid, Toolbar } from "@mui/material";
import { AmplifyLogin } from "../../components/authentication/amplify-login";
import { Auth0Login } from "../../components/authentication/auth0-login";
import { JWTLogin } from "../../components/authentication/jwt-login";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { useSettings } from "../../contexts/settings-context";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";

const Login = () => {
  const { platform } = useAuth();
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Login | Lobang Dashboard</title>
      </Head>
      <AppBar elevation={0} sx={{ backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ height: 64 }}></Toolbar>
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
                md={6}
                sx={{
                  display: {
                    md: "block",
                    xs: "none",
                  },
                }}
                xs={12}
              >
                <Card>
                  <CardContent>
                    {platform === "Amplify" && <AmplifyLogin />}
                    {platform === "Auth0" && <Auth0Login />}
                    {platform === "JWT" && <JWTLogin />}
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

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default Login;
