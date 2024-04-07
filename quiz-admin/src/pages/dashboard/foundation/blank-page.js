import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { ArrowLeft as ArrowLeftIcon } from "../../../icons/arrow-left";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { gtm } from "../../../lib/gtm";

const FoundationBlankPage = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Foundation: Blank Page | Lobang Dashboard</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box sx={{ py: 4 }}>
            <Box sx={{ mb: 2 }}>
              <NextLink href="#"
passHref>
                <Button color="primary"
component="a"
startIcon={<ArrowLeftIcon />}
variant="text">
                  Back
                </Button>
              </NextLink>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography color="textPrimary"
variant="h4">
                Blank Page
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                endIcon={<ChevronDownIcon fontSize="small" />}
                size="large"
                variant="contained"
              >
                Actions
              </Button>
            </Box>
            <Tabs allowScrollButtonsMobile
sx={{ mt: 4 }}
value={0}
variant="scrollable">
              <Tab label="Tab Content" />
              <Tab label="Tab Content" />
              <Tab label="Tab Content" />
            </Tabs>
            <Divider />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container
spacing={3}
sx={{ height: "100%" }}>
              <Grid item
md={8}
xs={12}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography color="textPrimary"
variant="body1">
                      Main content
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item
md={4}
xs={12}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography color="textPrimary"
variant="body1">
                      Secondary content
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

FoundationBlankPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default FoundationBlankPage;
