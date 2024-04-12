import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Box, Button, Container, Grid, Skeleton, Typography } from "@mui/material";
import { invoiceApi } from "../../../../api/invoice";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { InvoiceDetails } from "../../../../components/dashboard/invoices/invoice-details";
import { InvoiceLineItems } from "../../../../components/dashboard/invoices/invoice-line-items";
import { InvoicePayment } from "../../../../components/dashboard/invoices/invoice-payment";
import { InvoicePaymentHistory } from "../../../../components/dashboard/invoices/invoice-payment-history";
import { Status } from "../../../../components/status";
import { useMounted } from "../../../../hooks/use-mounted";
import { ArrowLeft as ArrowLeftIcon } from "../../../../icons/arrow-left";
import { ExclamationOutlined as ExclamationOutlinedIcon } from "../../../../icons/exclamation-outlined";
import { Eye as EyeIcon } from "../../../../icons/eye";
import { gtm } from "../../../../lib/gtm";

const Invoice = () => {
  const isMounted = useMounted();
  const [invoiceState, setInvoiceState] = useState({ isLoading: true });

  const getInvoice = useCallback(async () => {
    setInvoiceState(() => ({ isLoading: true }));

    try {
      const result = await invoiceApi.getInvoice();

      if (isMounted()) {
        setInvoiceState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setInvoiceState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getInvoice().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const renderContent = () => {
    if (invoiceState.isLoading) {
      return (
        <Box sx={{ py: 4 }}>
          <Skeleton height={42} />
          <Skeleton />
          <Skeleton />
        </Box>
      );
    }

    if (invoiceState.error) {
      return (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "background.default",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <ExclamationOutlinedIcon />
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              {invoiceState.error}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 2 }}>
            <NextLink href="/dashboard/invoices" passHref>
              <Button color="primary" component="a" startIcon={<ArrowLeftIcon />} variant="text">
                Invoices
              </Button>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textPrimary" variant="h4">
              #{invoiceState.data.id}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <NextLink href="/dashboard/invoices/1/preview" passHref>
              <Button
                color="primary"
                component="a"
                size="large"
                startIcon={<EyeIcon />}
                variant="contained"
              >
                Preview
              </Button>
            </NextLink>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Status color="error.main" label="Unpaid" />
          </Box>
        </Box>
        <Grid container spacing={3}>
          <Grid
            container
            item
            lg={8}
            spacing={3}
            sx={{
              height: "fit-content",
              order: {
                md: 2,
                xs: 1,
              },
            }}
            xs={12}
          >
            <Grid item xs={12}>
              <InvoiceDetails invoice={invoiceState.data} />
            </Grid>
            <Grid item xs={12}>
              <InvoicePayment invoice={invoiceState.data} />
            </Grid>
            <Grid item xs={12}>
              <InvoiceLineItems invoice={invoiceState.data} />
            </Grid>
          </Grid>
          <Grid
            container
            item
            lg={4}
            spacing={3}
            sx={{
              height: "fit-content",
              order: {
                md: 2,
                xs: 1,
              },
            }}
            xs={12}
          >
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <InvoicePaymentHistory />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Invoice: Summary | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          flexGrow: 1,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {renderContent()}
        </Container>
      </Box>
    </>
  );
};

Invoice.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Invoice;
