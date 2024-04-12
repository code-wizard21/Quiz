import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { format } from "date-fns";
import numeral from "numeral";
import {
  Box,
  Card,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Divider, Grid } from "@mui/material";
import { customerApi } from "../../../../api/customer";
import { useRouter } from "next/router";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { CustomerOrderMenu } from "../../../../components/dashboard/customer/customer-order-menu";
import { ResourceError } from "../../../../components/resource-error";
import { ResourceUnavailable } from "../../../../components/resource-unavailable";
import { Scrollbar } from "../../../../components/scrollbar";
import { Status } from "../../../../components/status";
import { CustomerLayout } from "../../../../components/dashboard/customer/customer-layout";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { useMounted } from "../../../../hooks/use-mounted";
import { gtm } from "../../../../lib/gtm";
import axiosClient from "../../../../api/axiosinstance";
import moment from "moment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const columns = [
  {
    id: "amount",
    label: "Amount",
  },
  {
    id: "trx_date",
    label: "Trx Date",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "item",
    label: "Item",
  },
  {
    id: "email",
    label: "Email",
  },
];

const statusVariants = [
  {
    color: "info.main",
    label: "Placed",
    value: "placed",
  },
  {
    color: "error.main",
    label: "Processed",
    value: "processed",
  },
  {
    color: "warning.main",
    label: "Failed",
    value: "failed",
  },
  {
    color: "success.main",
    label: "Succeeded",
    value: "succeeded",
  },
];

const CustomerOrders = () => {
  const router = useRouter();
  const [user, setUser]=useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  const { customerId } = router.query;
  const isMounted = useMounted();
  const [controller, setController] = useState({
    sort: "desc",
    sort_by: "createdAt",
  });
  const [ordersState, setOrdersState] = useState({ isLoading: true });
  const [data, setData] = useState([]);

  const getOrders = useCallback(async () => {
    setOrdersState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomerOrders({
        sort: controller.sort,
        sort_by: controller.sort_by,
      });
      console.log("result", result);
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
  }, [controller]);

  useEffect(() => {
    getOrders().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    const total = 0;
    const ticket = 0;
    if (router.isReady) {
      axiosClient
        .get(`/payment/${customerId}`)
        .then((result) => {
          setData(result.data);
          console.log('result.data',result.data);
           setUser(result.data[0].user);
          result.data.forEach((item) => {
            console.log(item);
            total += parseInt(item.amount);
            ticket += parseInt(item.item);
          });
          setTotalAmount(total / 100);
          setTotalTicket(ticket);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const displayLoading = ordersState.isLoading;
  const displayError = Boolean(!ordersState.isLoading && ordersState.error);
  const displayUnavailable = Boolean(
    !ordersState.isLoading && !ordersState.error && !ordersState.data?.length
  );

  const handleSortChange = (event, property) => {
    const isAsc = controller.sort_by === property && controller.sort === "asc";

    setController({
      ...controller,
      sort: isAsc ? "desc" : "asc",
      sort_by: property,
    });
  };

  return (
    <>
      <Head>
        <title>Customer: Orders | Lobang Dashboard</title>
      </Head>
      <Typography color="textPrimary" variant="h4">
        {user}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 2,
        }}
        wrap="wrap"
      >
        <Grid container item spacing={2} alignItems="center">
          <Grid item>
            <ShoppingCartIcon />
          </Grid>

          <Grid item>
            <Typography color="textSecondary" variant="body2">
              {totalTicket}
            </Typography>
          </Grid>

          <Grid item>
            <CurrencyExchangeIcon />
          </Grid>

          <Grid item>
            <Typography color="textSecondary" variant="body2">
              Spent :${totalAmount}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
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
          <Scrollbar>
            <Table sx={{ minWidth: 1000 }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      <TableSortLabel
                        active={controller.sort_by === column.id}
                        direction={controller.sort_by === column.id ? controller.sort : "asc"}
                        disabled={ordersState.isLoading}
                        onClick={(event) => handleSortChange(event, column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((order) => {
                  const statusVariant = statusVariants.find(
                    (variant) => variant.value === order.status
                  );

                  return (
                    <TableRow key={order._id}>
                      <TableCell>${parseInt(order.amount) / 100} SGD</TableCell>
                      <TableCell>
                        {moment(order.trx_date).format("MMM dd, yyyy, hh:mm a")}
                      </TableCell>
                      <TableCell>
                        {/* <Status  label={statusVariant.label} /> */}
                        {/* ijijijij */}
                      </TableCell>
                      <TableCell>
                        <Typography color="inherit" variant="inherit">
                          {order.item} Tickets
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {order.email}
                        {/* {numeral(order.totalAmount).format(`${order.currencySymbol}0,0.00`)} */}
                      </TableCell>
                      <TableCell align="right">
                        <CustomerOrderMenu />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
          {displayLoading && (
            <Box sx={{ p: 2 }}>
              <Skeleton height={42} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </Box>
          )}
          {displayError && (
            <ResourceError
              error={ordersState.error}
              sx={{
                height: "100%",
                m: 2,
              }}
            />
          )}
          {displayUnavailable && (
            <ResourceUnavailable
              sx={{
                height: "100%",
                m: 2,
              }}
            />
          )}
        </Card>
      </Box>
    </>
  );
};

CustomerOrders.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      <CustomerLayout>{page}</CustomerLayout>
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerOrders;
