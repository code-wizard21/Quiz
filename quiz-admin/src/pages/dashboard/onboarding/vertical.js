import { useEffect } from "react";
import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { Wizard } from "../../../components/dashboard/onboarding/wizard";
import { gtm } from "../../../lib/gtm";

const OnboardingVertical = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Components: Onboarding Vertical | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography color="textPrimary"
sx={{ mb: 6 }}
variant="h4">
            Onboarding Vertical
          </Typography>
          <Typography color="textPrimary"
sx={{ mb: 2 }}
variant="h6">
            Vertical Stepper
          </Typography>
          <Wizard />
        </Container>
      </Box>
    </>
  );
};

OnboardingVertical.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OnboardingVertical;
