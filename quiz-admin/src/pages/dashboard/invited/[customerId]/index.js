import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Grid } from "@mui/material";
import { customerApi } from "../../../../api/customer";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { CustomerDialog } from "../../../../components/dashboard/customer/customer-dialog";
import { CustomerInfo } from "../../../../components/dashboard/customer/customer-info";
import { CustomerLatestOrders } from "../../../../components/dashboard/customer/customer-latest-orders";
import { CustomerNotes } from "../../../../components/dashboard/customer/customer-notes";
import { CustomerProperties } from "../../../../components/dashboard/customer/customer-properties";
import { CustomerLayout } from "../../../../components/dashboard/customer/customer-layout";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { ResourceError } from "../../../../components/resource-error";
import { ResourceLoading } from "../../../../components/resource-loading";
import { useMounted } from "../../../../hooks/use-mounted";
import { gtm } from "../../../../lib/gtm";

const CustomerSummary = () => {
  const isMounted = useMounted();
  const [customerState, setCustomerState] = useState({ isLoading: true });
  const [ordersState, setOrdersState] = useState({ isLoading: true });
  const [notesState, setNotesState] = useState({ isLoading: true });
  const [openInfoDialog, setOpenInfoDialog] = useState(false);

  const getCustomer = useCallback(async () => {
    setCustomerState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomerState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setCustomerState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrders = useCallback(async () => {
    setOrdersState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerOrders();

      if (isMounted()) {
        setOrdersState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setOrdersState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotes = useCallback(async () => {
    setNotesState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerNotes();

      if (isMounted()) {
        setNotesState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setNotesState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomer().catch(console.error);
    getOrders().catch(console.error);
    getNotes().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const renderContent = () => {
    // Wait for all resources to load
    if (customerState.isLoading || notesState.isLoading || ordersState.isLoading) {
      return <ResourceLoading />;
    }

    // If any resource has an error, display only 1 error message
    if (customerState.error || notesState.error || ordersState.error) {
      return <ResourceError />;
    }

    return (
      <>
        <Grid container
spacing={3}>
          <Grid container
item
lg={4}
spacing={3}
sx={{ height: "fit-content" }}
xs={12}>
            <Grid item
xs={12}>
              <CustomerInfo onEdit={() => setOpenInfoDialog(true)}
customer={customerState.data} />
            </Grid>
            <Grid item
xs={12}>
              <CustomerProperties customer={customerState.data} />
            </Grid>
          </Grid>
          <Grid container
item
lg={8}
spacing={3}
sx={{ height: "fit-content" }}
xs={12}>
            <Grid item
xs={12}>
              <CustomerLatestOrders orders={ordersState.data} />
            </Grid>
            <Grid item
xs={12}>
              <CustomerNotes notes={notesState.data} />
            </Grid>
          </Grid>
        </Grid>
        <CustomerDialog
          customer={customerState.data}
          onClose={() => setOpenInfoDialog(false)}
          open={openInfoDialog}
        />
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Customer: Summary | Lobang Dashboard</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>{renderContent()}</Box>
    </>
  );
};

CustomerSummary.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <CustomerLayout>{page}</CustomerLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerSummary;
