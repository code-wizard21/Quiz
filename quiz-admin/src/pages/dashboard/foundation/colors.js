import { useEffect } from "react";
import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { DemoPreview } from "../../../components/demo-preview";
import { gtm } from "../../../lib/gtm";

const sections = [
  {
    title: "Neutrals",
    description:
      "The neutral colors are useful for dividing pages into sections with different backgrounds and borders, or used as text colors, for example.",
    items: [
      {
        label: "neutral-50",
        value: "neutral.50",
      },
      {
        label: "neutral-100",
        value: "neutral.100",
      },
      {
        label: "neutral-200",
        value: "neutral.200",
      },
      {
        label: "neutral-300",
        value: "neutral.300",
      },
      {
        label: "neutral-400",
        value: "neutral.400",
      },
      {
        label: "neutral-500",
        value: "neutral.500",
      },
      {
        label: "neutral-600",
        value: "neutral.600",
      },
      {
        label: "neutral-700",
        value: "neutral.700",
      },
      {
        label: "neutral-800",
        value: "neutral.800",
      },
      {
        label: "neutral-900",
        value: "neutral.900",
      },
    ],
  },
  {
    title: "Colors",
    items: [
      {
        label: "primary-main",
        value: "primary.main",
      },
      {
        label: "error-main",
        value: "error.main",
      },
      {
        label: "warning-main",
        value: "warning.main",
      },
      {
        label: "info-main",
        value: "info.main",
      },
      {
        label: "success-main",
        value: "success.main",
      },
    ],
  },
  {
    title: "Text",
    items: [
      {
        label: "text-primary",
        value: "text.primary",
      },
      {
        label: "text-secondary",
        value: "text.secondary",
      },
    ],
  },
];

const FoundationColors = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Foundation: Colors | Lobang Dashboard</title>
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
            Neutrals
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 5,
              gridAutoFlow: "row",
            }}
          >
            {sections.map((section) => (
              <DemoPreview
                description={section.description}
                key={section.title}
                title={section.title}
              >
                <Grid container
spacing={2}>
                  {section.items.map((item) => (
                    <Grid
                      item
                      key={item.label}
                      md={6}
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                      xs={12}
                    >
                      <Box
                        sx={{
                          backgroundColor: item.value,
                          borderRadius: 1,
                          height: 64,
                          mr: 3,
                          width: 64,
                        }}
                      />
                      <div>
                        <Typography color="textPrimary"
variant="subtitle1">
                          {item.label}
                        </Typography>
                        <Typography color="textSecondary"
variant="body2">
                          {item.description}
                        </Typography>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </DemoPreview>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

FoundationColors.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default FoundationColors;
