import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, Container, Typography } from "@mui/material";
import { orderApi } from "../../../api/order";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { OrderCreateDialog } from "../../../components/dashboard/order/order-create-dialog";
// import { OrdersDnd } from "../../../components/dashboard/order/orders-dnd";
import { OrdersFilter } from "../../../components/dashboard/order/orders-filter";
import { OrdersTable } from "../../../components/dashboard/order/orders-table";
import { useMounted } from "../../../hooks/use-mounted";
import { useSelection } from "../../../hooks/use-selection";
import { Plus as PlusIcon } from "../../../icons/plus";
import { gtm } from "../../../lib/gtm";

const Orders = () => {
  const isMounted = useMounted();
  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: "",
    sort: "desc",
    sort_by: "createdAt",
    view: "all",
  });
  const [ordersState, setOrdersState] = useState({ isLoading: true });
  const [selectedOrders, handleSelect, handleSelectAll] = useSelection(ordersState.data?.orders);
  const [openCreateDialog, setOpenCreateDialog] = useState();
  const [mode, setMode] = useState("dnd");

  const getOrders = useCallback(async () => {
    setOrdersState(() => ({ isLoading: true }));

    try {
      const result = await orderApi.getOrders({
        filters: controller.filters,
        page: controller.page,
        query: controller.query,
        sort: controller.sort,
        sort_by: controller.sort_by,
        view: controller.view,
      });

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

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  return (
    <>
      <Head>
        <title>Order: List | Lobang Dashboard</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
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
              <Typography color="textPrimary"
variant="h4">
                Orders
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                onClick={() => setOpenCreateDialog(true)}
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
                size="large"
              >
                Add
              </Button>
            </Box>
          </Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <OrdersFilter
              disabled={ordersState.isLoading}
              filters={controller.filters}
              mode={mode}
              onFiltersApply={handleFiltersApply}
              onFiltersClear={handleFiltersClear}
              onModeChange={handleModeChange}
              onQueryChange={handleQueryChange}
              onViewChange={handleViewChange}
              query={controller.query}
              selectedOrders={selectedOrders}
              view={controller.view}
            />
            {mode === "table" ? (
              <OrdersTable
                error={ordersState.error}
                isLoading={ordersState.isLoading}
                onPageChange={handlePageChange}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onSortChange={handleSortChange}
                orders={ordersState.data?.orders}
                ordersCount={ordersState.data?.ordersCount}
                page={controller.page + 1}
                selectedOrders={selectedOrders}
                sort={controller.sort}
                sort_by={controller.sort_by}
              />
            ) : (
              // <OrdersDnd
              //   error={ordersState.error}
              //   isLoading={ordersState.isLoading}
              //   orders={ordersState.data?.orders}
              // />
              <></>
            )}
          </Card>
        </Container>
      </Box>
      <OrderCreateDialog onClose={() => setOpenCreateDialog(false)}
open={openCreateDialog} />
    </>
  );
};

Orders.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Orders;
