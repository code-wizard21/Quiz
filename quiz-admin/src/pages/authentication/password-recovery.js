import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { AppBar, Box, Card, CardContent, Container, Grid, Toolbar } from "@mui/material";
import { AmplifyPasswordRecovery } from "../../components/authentication/amplify-password-recovery";
import { GuestGuard } from "../../components/authentication/guest-guard";
// import { ProductFeatures } from "../../components/authentication/product-features";
import { Logo } from "../../components/logo";
import { useSettings } from "../../contexts/settings-context";
import { useAuth } from "../../hooks/use-auth";
import { gtm } from "../../lib/gtm";

const PasswordRecovery = () => {
  const { platform } = useAuth();
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Password Recovery | Lobang Dashboard</title>
      </Head>
      <AppBar elevation={0}
sx={{ backgroundColor: "background.paper" }}>
        <Container maxWidth="md">
          <Toolbar disableGutters
sx={{ height: 64 }}>
            <NextLink href="/"
passHref>
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
            <Grid container
spacing={6}>
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
                {/* <ProductFeatures /> */}
              </Grid>
              <Grid item
md={6}
xs={12}>
                <Card>
                  <CardContent>{platform === "Amplify" && <AmplifyPasswordRecovery />}</CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

PasswordRecovery.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default PasswordRecovery;
