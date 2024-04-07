import { useEffect, useState } from "react";
import Head from "next/head";
import { Alert, Card, Grid, useMediaQuery } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { OrganizationLayout } from "../../../components/dashboard/organization/organization-layout";
import { OrganizationBillingInfo } from "../../../components/dashboard/organization/organization-billing-info";
import { OrganizationBillingPlan } from "../../../components/dashboard/organization/organization-billing-plan";
import { PropertyListItem } from "../../../components/property-list-item";
import { gtm } from "../../../lib/gtm";

const OrganizationBilling = () => {
  const [showAlert, setShowAlert] = useState(true);
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const align = mdDown ? "horizontal" : "vertical";

  return (
    <>
      <Head>
        <title>Organization: Billing | Lobang Dashboard</title>
      </Head>
      <div>
        <Grid container
spacing={3}>
          <Grid item
xs={12}>
            <Card>
              <Grid container>
                <Grid item
md={4}
xs={12}>
                  <PropertyListItem
                    align={align}
                    component="div"
                    label="Plan Selected"
                    value="Free"
                  />
                </Grid>
                <Grid item
md={4}
xs={12}>
                  <PropertyListItem align={align}
component="div"
label="Team members"
value="2" />
                </Grid>
                <Grid item
md={4}
xs={12}>
                  <PropertyListItem align={align}
component="div"
label="Users"
value="7000" />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item
xs={12}>
            <OrganizationBillingInfo />
          </Grid>
          {showAlert && (
            <Grid item
xs={12}>
              <Alert onClose={() => setShowAlert(false)}
severity="info">
                You will be charged starting 07/22/2021
              </Alert>
            </Grid>
          )}
          <Grid item
xs={12}>
            <OrganizationBillingPlan />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

OrganizationBilling.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <OrganizationLayout>{page}</OrganizationLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default OrganizationBilling;
