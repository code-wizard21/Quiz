import { Fragment, useEffect } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { AccountLayout } from "../../../components/dashboard/account/account-layout";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../lib/gtm";

const notifications = [
  {
    id: "1",
    name: "newOrders",
    label: "New Orders",
  },
  {
    id: "2",
    name: "newCompanySignups",
    label: "New Company Signups",
  },
  {
    id: "3",
    name: "publishErrors",
    label: "Publish Errors",
  },
];

const AccountNotifications = () => {
  const formik = useFormik({
    initialValues: {
      newCompanySignups: true,
      newOrders: false,
      publishErrors: false,
      unsubscribeAll: false,
    },
    validationSchema: Yup.object().shape({
      newCompanySignups: Yup.boolean(),
      newOrders: Yup.boolean(),
      publishErrors: Yup.boolean(),
      unsubscribeAll: Yup.boolean(),
    }),
    onSubmit: () => {},
  });

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Account: Notifications | Lobang Dashboard</title>
      </Head>
      <Card>
        <CardHeader subheader="Manage your alert notifications"
title="Email Notifications" />
        <Divider />
        <List>
          {notifications.map((notification, index) => (
            <Fragment key={notification.id}>
              <ListItem key={notification.id}>
                <ListItemText primary={notification.label} />
                <ListItemSecondaryAction>
                  <Switch
                    checked={formik.values[notification.name]}
                    color="primary"
                    name={notification.name}
                    onChange={formik.handleChange}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {notifications.length > index + 1 && <Divider />}
            </Fragment>
          ))}
        </List>
      </Card>
      <Box
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: {
            sm: "row",
            xs: "column",
          },
          pt: 3,
        }}
      >
        <Box>
          <Typography color="textPrimary"
sx={{ mb: 1 }}
variant="h6">
            Unsubscribe Notifications
          </Typography>
          <Typography color="textSecondary"
variant="body2">
            Keep in mind that security notifications cannot be turned off
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.unsubscribeAll}
              color="primary"
              name="unsubscribeAll"
              onChange={formik.handleChange}
            />
          }
          label="Unsubscribe"
        />
      </Box>
    </>
  );
};

AccountNotifications.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <AccountLayout>{page}</AccountLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default AccountNotifications;
