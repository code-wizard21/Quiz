import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { Alert, AppBar, Box, Card, CardContent, Container, Grid, Toolbar } from "@mui/material";
import { AmplifyPasswordReset } from "../../components/authentication/amplify-password-reset";
import { GuestGuard } from "../../components/authentication/guest-guard";
// import { ProductFeatures } from "../../components/authentication/product-features";
import { Logo } from "../../components/logo";
import { useSettings } from "../../contexts/settings-context";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";

const PasswordReset = () => {
  const { platform } = useAuth();
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const showAlert = typeof window !== "undefined" && sessionStorage.getItem("username");

  return (
    <>
      <Head>
        <title>Password Reset | Lobang Dashboard</title>
      </Head>
      <AppBar elevation={0} sx={{ backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Toolbar disableGutters sx={{ height: 64 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo variant={settings.theme === "dark" ? "light" : "dark"} />
              </a>
            </NextLink>
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
            {showAlert && (
              <Alert severity="success" sx={{ mb: 3 }} variant="filled">
                If this email address was used to create an account, instructions to reset your
                password will be sent to you.
              </Alert>
            )}
            <Grid
              container
              spacing={6}
              style={{
                justifyContent: "center",
              }}
            >
              <Grid item md={6} xs={12}>
                <Card>
                  <CardContent>{platform === "JWT" && <AmplifyPasswordReset />}</CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

PasswordReset.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordReset;
