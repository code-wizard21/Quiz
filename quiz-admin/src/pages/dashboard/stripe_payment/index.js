import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Divider, Typography, Card } from "@mui/material";
import { invoiceApi } from "../../../api/invoice";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { InvoicesFilter } from "../../../components/dashboard/stripe/invoices-filter";
import { StripeTable } from "../../../components/dashboard/stripe/invoices-table";
import { useMounted } from "../../../hooks/use-mounted";
import { useSelection } from "../../../hooks/use-selection";
import { gtm } from "../../../lib/gtm";
import { useRouter } from "next/router";

const Stripe = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: "",
    sort: "desc",
    sort_by: "createdAt",
    view: "all",
  });
  const [invoicesState, setInvoicesState] = useState({ isLoading: true });
  const [count, setCount] = useState(0);
  const [selectedInvoices, handleSelect, handleSelectAll] = useSelection(
    invoicesState.data?.invoices
  );
  const { search } = router.query;

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
      setCount(result.invoicesCount);
      const invoicesResult = {
        invoices: [],
      };
      const searchInput = search;
      let int = parseInt(searchInput);
      if (!isNaN(int)) {
      
        await result.invoices.forEach((element, idx) => {
          if (element.amount == int) {
            invoicesResult.invoices.push({
              id: idx + 1,
              amount: element.amount / 100,
              status: element.status,
              payment_method: element.payment_method,
              card_number:element.payment_method_details.card.last4,
              trx_date: element.trx_date,
            });
          }
        });
        if (isMounted()) {
          setInvoicesState(() => ({
            isLoading: false,
            data: invoicesResult,
          }));
        }
      } else {
        setInvoicesState(() => ({
          isLoading: false,
          data: result,
        }));
      }
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
    getCustomers().catch(console.error);
  }, [controller]);

  useEffect(() => {

      getCustomers().catch(console.error);
    
  }, [search]);

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
        <title>From Stripe: List | Lobang Dashboard</title>
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
              From Stripe({count})
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
         
            </Box>
          </Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <InvoicesFilter
              disabled={invoicesState.isLoading}
              filters={controller.filters}
              onFiltersApply={handleFiltersApply}
              onFiltersClear={handleFiltersClear}
              onQueryChange={handleQueryChange}
              onViewChange={handleViewChange}
              query={controller.query}
              selectedInvoices={selectedInvoices}
              view={controller.view}
            />
            <Divider />
            <StripeTable
              error={invoicesState.error}
              invoices={invoicesState.data?.invoices}
              invoicesCount={invoicesState.data?.invoicesCount}
              isLoading={invoicesState.isLoading}
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

Stripe.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Stripe;
