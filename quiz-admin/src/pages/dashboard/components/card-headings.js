import { useEffect } from "react";
import Head from "next/head";
import { Box, Button, Card, CardHeader, Container, IconButton, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { DotsVertical as DotsVerticalIcon } from "../../../icons/dots-vertical";
import { gtm } from "../../../lib/gtm";

const ComponentsCardHeaders = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Components: Card Headers | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography color="textPrimary" sx={{ mb: 6 }} variant="h4">
            Card Headers
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 5,
              gridAutoFlow: "row",
            }}
          >
            <div>
              <Typography color="textPrimary" sx={{ mb: 2 }} variant="body1">
                Simple card header
              </Typography>
              <Card>
                <CardHeader title="Orders" />
              </Card>
            </div>
            <div>
              <Typography color="textPrimary" sx={{ mb: 2 }} variant="body1">
                Simple card header with description
              </Typography>
              <Card>
                <CardHeader subheader="List of the latest orders" title="Orders" />
              </Card>
            </div>
            <div>
              <Typography color="textPrimary" sx={{ mb: 2 }} variant="body1">
                Card header with actions
              </Typography>
              <Card>
                <CardHeader
                  action={
                    <div>
                      <Button
                        color="primary"
                        endIcon={<ChevronDownIcon fontSize="small" />}
                        size="small"
                        variant="text"
                      >
                        Most recent
                      </Button>
                      <IconButton size="small">
                        <DotsVerticalIcon fontSize="small" />
                      </IconButton>
                    </div>
                  }
                  subheader="List of the latest orders"
                  sx={{
                    "& .MuiCardHeader-action": {
                      alignSelf: "center",
                    },
                  }}
                  title="Orders"
                />
              </Card>
            </div>
          </Box>
        </Container>
      </Box>
    </>
  );
};

ComponentsCardHeaders.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ComponentsCardHeaders;
