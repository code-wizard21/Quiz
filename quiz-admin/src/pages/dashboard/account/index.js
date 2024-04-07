import { useEffect } from "react";
import Head from "next/head";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { AccountDetails } from "../../../components/dashboard/account/account-details";
import { AccountChangePassword } from "../../../components/dashboard/account/account-change-password";
import { Account2FA } from "../../../components/dashboard/account/account-2fa";
import { AccountLayout } from "../../../components/dashboard/account/account-layout";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { gtm } from "../../../lib/gtm";

const AccountGeneral = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Account: General | Lobang Dashboard</title>
      </Head>
      <AccountDetails />
      <AccountChangePassword sx={{ my: 3 }} />
      <Account2FA />
    </>
  );
};

AccountGeneral.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <AccountLayout>{page}</AccountLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default AccountGeneral;
