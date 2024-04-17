import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, Container, Divider, Typography } from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { CustomerDialog } from "../../../components/dashboard/customer/customer-dialog";
import { CustomersFilter } from "../../../components/dashboard/customer/customers-filter";
import { CustomersTable } from "../../../components/dashboard/customer/customers-table";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { useMounted } from "../../../hooks/use-mounted";
import { useSelection } from "../../../hooks/use-selection";
import { Plus as PlusIcon } from "../../../icons/plus";
import { gtm } from "../../../lib/gtm";
import { getUsers } from "../../../api/user.service";

const Customers = () => {
  const isMounted = useMounted();
  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: "",
    sort: "desc",
    sort_by: "createdAt:desc",
    view: "all",
  });
  const [customersState, setCustomersState] = useState({ isLoading: true });
  const [selectedCustomers, handleSelect, handleSelectAll] = useSelection(
    customersState.data?.customers
  );
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const getCustomers = useCallback(async () => {
    setCustomersState(() => ({ isLoading: true }));

    try {
      const result = await getUsers(controller.page + 1, 10, "desc", "createdAt:desc");
      console.log("result",result); 
      if (isMounted()) {
        setCustomersState(() => ({
          isLoading: false,
          data: { customers: result, customersCount: result.total_results },
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setCustomersState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }

  }, [controller, customersState]);

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

  const updateList = (id) => {
    const newCustomers = customersState.data.customers.filter(
      (customer) => customer.id !== id
    );
    setCustomersState({
      ...customersState,
      data: { ...customersState.data, customers: newCustomers, customersCount: customersState.data.customersCount - 1 },
    });
  };

  return (
    <>
      <Head>
        <title>Users: List | Quiz Dashboard</title>
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
                Users {customersState.data?.customersCount && `(${customersState.data?.customersCount})`}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                onClick={() => setOpenCreateDialog(true)}
                size="large"
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
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
            <CustomersFilter
              disabled={customersState.isLoading}
              filters={controller.filters}
              onFiltersApply={handleFiltersApply}
              onFiltersClear={handleFiltersClear}
              onQueryChange={handleQueryChange}
              onViewChange={handleViewChange}
              query={controller.query}
              selectedCustomers={selectedCustomers}
              view={controller.view}
            />
            <Divider />
            <CustomersTable
              customers={customersState.data?.customers}
              customersCount={customersState.data?.customersCount}
              error={customersState.error}
              isLoading={customersState.isLoading}
              onPageChange={handlePageChange}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onSortChange={handleSortChange}
              page={controller.page + 1}
              selectedCustomers={selectedCustomers}
              sort={controller.sort}
              sort_by={controller.sort_by}
              updateList={updateList}
            />
          </Card>
        </Container>
      </Box>
      <CustomerDialog onClose={() => setOpenCreateDialog(false)}
        open={openCreateDialog} />
    </>
  );
};

Customers.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Customers;
