import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DemoPreview } from "../../../components/demo-preview";
import { Status } from "../../../components/status";
import { Scrollbar } from "../../../components/scrollbar";
import { ChevronLeft as ChevronLeftIcon } from "../../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../../icons/chevron-right";
import { DotsVertical as DotsVerticalIcon } from "../../../icons/dots-vertical";
import { gtm } from "../../../lib/gtm";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";

const FoundationTables = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Foundation: Tables | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography color="textPrimary"
sx={{ mb: 6 }}
variant="h4">
            Tables
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 5,
              gridAutoFlow: "row",
            }}
          >
            <DemoPreview
              description={
                <Typography color="textSecondary"
variant="body2">
                  For complex implementation of tables with Filters and Search features check out{" "}
                  <NextLink href="/dashboard/customers"
passHref>
                    <Link color="primary"
component="a"
underline="none"
variant="inherit">
                      Customers
                    </Link>
                  </NextLink>
                  ,{" "}
                  <NextLink href="/dashboard/orders"
passHref>
                    <Link color="primary"
component="a"
underline="none"
variant="inherit">
                      Orders
                    </Link>
                  </NextLink>
                  ,{" "}
                  <NextLink href="/dashboard/products"
passHref>
                    <Link color="primary"
component="a"
underline="none"
variant="inherit">
                      Products
                    </Link>
                  </NextLink>
                  ,{" "}
                  <NextLink href="/dashboard/invoices"
passHref>
                    <Link color="primary"
component="a"
underline="none"
variant="inherit">
                      Invoices
                    </Link>
                  </NextLink>
                  .
                </Typography>
              }
              title="Complex tables"
            >
              <Scrollbar>
                <Table sx={{ minWidth: 600 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>Order id</TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>Invoice date</TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>Due date</TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>Total</TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>Payment method</TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel>Status</TableSortLabel>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow hover>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <Link color="inherit"
href="#"
underline="none"
variant="subtitle2">
                          #DEV5437
                        </Link>
                      </TableCell>
                      <TableCell>02 Jun 2021</TableCell>
                      <TableCell>02 Jun 2021</TableCell>
                      <TableCell>$100.00</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell>
                        <Status color="info.main"
label="Ongoing" />
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <DotsVerticalIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Scrollbar>
              <Divider />
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  p: 2,
                }}
              >
                <Typography
                  color="textSecondary"
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                  variant="body2"
                  whiteSpace="nowrap"
                >
                  Page{" "}
                  <Typography
                    color="textPrimary"
                    component="span"
                    sx={{ mx: 1 }}
                    variant="subtitle2"
                  >
                    1
                  </Typography>
                  of{" "}
                  <Typography
                    color="textPrimary"
                    component="span"
                    sx={{ mx: 1 }}
                    variant="subtitle2"
                  >
                    1
                  </Typography>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton disabled>
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </DemoPreview>
          </Box>
        </Container>
      </Box>
    </>
  );
};

FoundationTables.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default FoundationTables;
