import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, List, Skeleton } from "@mui/material";
import { customerApi } from "../../../../api/customer";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { CustomerActivityItem } from "../../../../components/dashboard/customer/customer-activity-item";
import { CustomerLayout } from "../../../../components/dashboard/customer/customer-layout";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { ResourceError } from "../../../../components/resource-error";
import { ResourceUnavailable } from "../../../../components/resource-unavailable";
import { useMounted } from "../../../../hooks/use-mounted";
import { ChevronDown as ChevronDownIcon } from "../../../../icons/chevron-down";
import { gtm } from "../../../../lib/gtm";

const CustomerActivity = () => {
  const isMounted = useMounted();
  const [activitiesState, setActivitiesState] = useState({ isLoading: true });

  const getActivities = useCallback(async () => {
    setActivitiesState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerActivities();

      if (isMounted()) {
        setActivitiesState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setActivitiesState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getActivities().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const displayLoading = activitiesState.isLoading;
  const displayError = Boolean(!activitiesState.isLoading && activitiesState.error);
  const displayUnavailable = Boolean(
    !activitiesState.isLoading && !activitiesState.error && !activitiesState.data?.length
  );
  const disableLoadMore = Boolean(activitiesState.isLoading || activitiesState.error);

  return (
    <>
      <Head>
        <title>Customer: Activity | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <List disablePadding>
            {activitiesState.data?.map((activity) => (
              <CustomerActivityItem divider
key={activity.id}
{...activity} />
            ))}
          </List>
          {displayLoading && (
            <Box sx={{ p: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {displayError && <ResourceError error={activitiesState.error}
sx={{ m: 2 }} />}
          {displayUnavailable && <ResourceUnavailable sx={{ m: 2 }} />}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "auto",
              p: 2,
            }}
          >
            <Button
              color="primary"
              disabled={disableLoadMore}
              endIcon={<ChevronDownIcon />}
              variant="text"
            >
              Load more
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

CustomerActivity.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <CustomerLayout>{page}</CustomerLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerActivity;
