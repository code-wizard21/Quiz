import { useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../lib/gtm";

const FoundationShadows = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Foundation: Shadows | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography color="textPrimary"
sx={{ mb: 6 }}
variant="h4">
            Shadows
          </Typography>
          <div>
            <Typography color="textPrimary"
sx={{ mb: 4 }}
variant="body1">
              Lobang uses shadows as a way to emphasize no more than one container (e.g card) on a
              crowded page. We only make use of elevation-8, elevation-16 and elevation-24.
            </Typography>
            <Grid container
spacing={3}>
              {[1, 8, 16, 24].map((value) => (
                <Grid
                  item
                  key={value}
                  md={6}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  xs={12}
                >
                  <Paper
                    elevation={value}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      minHeight: 100,
                      minWidth: 120,
                      mr: 3,
                    }}
                  >
                    <Typography color="textPrimary"
variant="h1">
                      {value}
                    </Typography>
                  </Paper>
                  <Typography color="textPrimary"
variant="subtitle1">
                    elevation-
                    {value}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </Box>
    </>
  );
};

FoundationShadows.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default FoundationShadows;
