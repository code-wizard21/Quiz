import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";

import { Box, Button, Container, Divider, Typography, Card } from "@mui/material";
import { invoiceApi } from "../../../api/invoice";
import axiosClient from "../../../api/axiosinstance";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";

import { InvoicesTable } from "../../../components/dashboard/user_parshoner/invoices-table";
import { useMounted } from "../../../hooks/use-mounted";
import { useSelection } from "../../../hooks/use-selection";
import { Plus as PlusIcon } from "../../../icons/plus";
import { gtm } from "../../../lib/gtm";

const Invoices = () => {
  const isMounted = useMounted();
  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: "",
    sort: "desc",
    sort_by: "createdAt",
    view: "all",
  });
  const [data, setData] = useState([]);
  const [invoicesState, setInvoicesState] = useState({ isLoading: true });
  const [selectedInvoices, handleSelect, handleSelectAll] = useSelection(
    invoicesState.data?.invoices
  );

  const getCustomers = useCallback(async () => {
    setInvoicesState(() => ({ isLoading: true }));

    try {
      const result = await invoiceApi.getInvoices({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sort_by: controller.sort_by,
        view: controller.view,
      });

      if (isMounted()) {
        setInvoicesState(() => ({
          isLoading: false,
          data: result,
        }));
      }
      console.log(result);
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setInvoicesState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
  }, [controller]);

  useEffect(() => {
    axiosClient.get('/payment/')
      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getCustomers().catch(console.error);
  }, [controller]);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleViewChange = (newView) => {
    setController({
      ...controller,
      page: 0,
      view: newView,
    });
  };

  const handleQueryChange = (newQuery) => {
    setController({
      ...controller,
      page: 0,
      query: newQuery,
    });
  };

  const handleFiltersApply = (newFilters) => {
    const parsedFilters = newFilters.map((filter) => ({
      property: filter.property.name,
      value: filter.value,
      operator: filter.operator.value,
    }));

    setController({
      ...controller,
      page: 0,
      filters: parsedFilters,
    });
  };

  const handleFiltersClear = () => {
    setController({
      ...controller,
      page: 0,
      filters: [],
    });
  };

  const handlePageChange = (newPage) => {
    setController({
      ...controller,
      page: newPage - 1,
    });
  };

  const handleSortChange = (event, property) => {
    const isAsc = controller.sort_by === property && controller.sort === "asc";

    setController({
      ...controller,
      page: 0,
      sort: isAsc ? "desc" : "asc",
      sort_by: property,
    });
  };

  return (
    <>
      <Head>
        <title>Invoice: List | Lobang Dashboard</title>
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
          <Box sx={{ py: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography color="textPrimary" variant="h4">
                Invoices
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <NextLink href="/dashboard/invoices/create" passHref>
                <Button
                  color="primary"
                  component="a"
                  size="large"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  Add
                </Button>
              </NextLink>
            </Box>
          </Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
        
            <Divider />
            <InvoicesTable
              error={data.error}
              invoices={data}
              invoicesCount={data.length}
              isLoading={data.isLoading}
              onPageChange={handlePageChange}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onSortChange={handleSortChange}
              page={controller.page + 1}
              selectedInvoices={selectedInvoices}
              sort={controller.sort}
              sort_by={controller.sort_by}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

Invoices.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Invoices;
