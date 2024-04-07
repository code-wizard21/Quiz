import { useEffect, useState } from "react";
import Head from "next/head";
import { Grid } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { ReportsLayout } from "../../../components/dashboard/reports/reports-layout";
// import { Bills } from "../../../components/dashboard/reports/bills";
import { LatestOrders } from "../../../components/dashboard/reports/latest-orders";
import { Notifications } from "../../../components/dashboard/reports/notifications";
import { SummaryItem } from "../../../components/dashboard/reports/summary-item";
import { WelcomeBanner } from "../../../components/dashboard/reports/welcome-banner";
import { Cube as CubeIcon } from "../../../icons/cube";
import { ShoppingCart as ShoppingCartIcon } from "../../../icons/shopping-cart";
import { CustomCreditCard as CustomCreditCardIcon } from "../../../icons/custom-credit-card";
import { gtm } from "../../../lib/gtm";
import {
  getDashboardGraph,
  getDashboardStats,
  getLatestUsers,
} from "../../../api/dashboard.service";

const latestOrders = [
  {
    id: "5273",
    courier: "DHL",
    createdAt: new Date("2021-06-02T14:32:45.475Z"),
    currency: "USD",
    currencySymbol: "$",
    customer: {
      city: "New York",
      country: "USA",
      firstName: "Devon",
      lastName: "Lane",
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: "USD",
        currencySymbol: "$",
        discountAmount: 0,
        image: "/static/product-01.png",
        name: "Watch with Leather Strap",
        quantity: 1,
        sku: "BBAK01-A",
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160,
      },
    ],
    paymentId: "ORIL8823",
    paymentMethod: "debit",
    paymentStatus: "paid",
    status: "delivered",
    trackingCode: "KDO020021",
    totalAmount: 192.5,
    updatedAt: new Date("2021-06-02T14:32:45.475Z"),
  },
  {
    id: "9265",
    courier: "DHL",
    createdAt: new Date("2021-05-12T20:10:45.475Z"),
    currency: "USD",
    currencySymbol: "$",
    customer: {
      city: "Berlin",
      country: "Germany",
      firstName: "Livia",
      lastName: "Louthe",
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: "USD",
        currencySymbol: "$",
        discountAmount: 0,
        image: "/static/product-01.png",
        name: "Watch with Leather Strap",
        quantity: 1,
        sku: "BBAK01-A",
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160,
      },
    ],
    paymentId: "L993DDLS",
    paymentMethod: "paypal",
    paymentStatus: "paid",
    status: "complete",
    trackingCode: null,
    totalAmount: 631,
    updatedAt: new Date("2021-05-12T20:10:45.475Z"),
  },
  {
    id: "9266",
    courier: "UPS",
    createdAt: new Date("2021-02-21T12:12:45.475Z"),
    currency: "USD",
    currencySymbol: "$",
    customer: {
      city: "Hamburg",
      country: "Germany",
      firstName: "Peri",
      lastName: "Ottawell",
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: "USD",
        currencySymbol: "$",
        discountAmount: 0,
        image: "/static/product-01.png",
        name: "Watch with Leather Strap",
        quantity: 1,
        sku: "BBAK01-A",
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160,
      },
    ],
    paymentId: "OPP482L",
    paymentMethod: "creditCard",
    paymentStatus: "paid",
    status: "placed",
    totalAmount: 631,
    updatedAt: new Date("2021-02-21T12:12:45.475Z"),
  },
  {
    id: "1090",
    courier: "UPS",
    createdAt: new Date("2021-09-09T10:10:45.475Z"),
    currency: "USD",
    currencySymbol: "$",
    customer: {
      city: "Madrid",
      country: "Spain",
      firstName: "Thadeus",
      lastName: "Jacketts",
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: "USD",
        currencySymbol: "$",
        discountAmount: 0,
        image: "/static/product-01.png",
        name: "Watch with Leather Strap",
        quantity: 1,
        sku: "BBAK01-A",
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160,
      },
    ],
    paymentId: "DZS194LD",
    paymentMethod: "stripe",
    paymentStatus: "paid",
    status: "processed",
    trackingCode: null,
    totalAmount: 100,
    updatedAt: new Date("2021-09-09T10:10:45.475Z"),
  },
  {
    id: "1111",
    courier: "Purolator",
    createdAt: new Date("2021-05-21T02:02:45.475Z"),
    currency: "USD",
    currencySymbol: "$",
    customer: {
      city: "Barcelona",
      country: "Spain",
      firstName: "Rad",
      lastName: "Jose",
    },
    discountAmount: 0,
    lineItems: [
      {
        currency: "USD",
        currencySymbol: "$",
        discountAmount: 0,
        image: "/static/product-01.png",
        name: "Watch with Leather Strap",
        quantity: 1,
        sku: "BBAK01-A",
        subtotalAmount: 160,
        taxAmount: 32.5,
        totalAmount: 192.5,
        unitAmount: 160,
      },
    ],
    paymentId: "OTIK283L",
    paymentMethod: "debit",
    paymentStatus: "paid",
    status: "processed",
    trackingCode: null,
    totalAmount: 60,
    updatedAt: new Date("2021-05-21T02:02:45.475Z"),
  },
];

const stats = [
  {
    color: "primary.main",
    content: "3450",
    icon: ShoppingCartIcon,
    label: "Orders",
    linkHref: "/dashboard/orders",
    linkLabel: "Orders",
  },
  {
    color: "success.main",
    content: "68",
    icon: CubeIcon,
    label: "Products",
    linkHref: "/dashboard/customers",
    linkLabel: "Products",
  },
  {
    color: "error.main",
    content: "3120",
    icon: CustomCreditCardIcon,
    label: "Transactions",
    linkHref: "#",
    linkLabel: "Transactions",
  },
];

const ReportsOverview = () => {
  const [stats, setStats] = useState(undefined);
  const [latestUsers, setLatestUsers] = useState(undefined);
  const [graphData, setGraphData] = useState(undefined);
  useEffect(() => {
    gtm.push({ event: "page_view" });
    getDashboardStats(2).then((data) => {
      setStats(data);
    });
    getLatestUsers(5).then((data) => {
      setLatestUsers(data);
    });
    getDashboardGraph().then((data) => {
      setGraphData(data);
    });
  }, []);

  const updatedStats = (type) => {
    getDashboardStats(type).then((data) => {
      setStats(data);
    });
  };

  return (
    <>
      <Head>
        <title>Reports: Overview | Lobang Dashboard</title>
      </Head>
      <div>
        <Grid container
spacing={3}>
          <Grid item
md={6}
xs={12}>
            <Notifications stats={stats}
updatedStats={updatedStats} />
          </Grid>
          <Grid item
md={6}
xs={12}>
            <LatestOrders orders={latestUsers} />
          </Grid>
          <Grid item
md={4}
xs={12}>
            <SummaryItem
              color={"primary.main"}
              content={stats?.overAll?.totalAsks}
              icon={ShoppingCartIcon}
              label={"Posts"}
            />
          </Grid>
          <Grid item
md={4}
xs={12}>
            <SummaryItem
              color={"success.main"}
              content={stats?.overAll?.totalUsers}
              icon={CubeIcon}
              label={"Users"}
            />
          </Grid>
          <Grid item
md={4}
xs={12}>
            <SummaryItem
              color={"error.main"}
              content={stats?.overAll?.totalNominations}
              icon={CustomCreditCardIcon}
              label={"Nominations"}
            />
          </Grid>
          <Grid item
xs={12}>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

ReportsOverview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <ReportsLayout>{page}</ReportsLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default ReportsOverview;
