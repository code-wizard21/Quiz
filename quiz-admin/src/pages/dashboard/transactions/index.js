import {  useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Divider, Typography, Card } from "@mui/material";
import axiosClient from "../../../api/axiosinstance";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { TransactionsTable } from "../../../components/dashboard/transactions/invoices-table";
import { useSelection } from "../../../hooks/use-selection";
import { Plus as PlusIcon } from "../../../icons/plus";
import { gtm } from "../../../lib/gtm";

const Transactions = () => {

  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: "",
    sort: "desc",
    sort_by: "createdAt",
    view: "all",
  });
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [invoicesState, setInvoicesState] = useState({ isLoading: true });
  const [selectedInvoices, handleSelect, handleSelectAll] = useSelection(
    invoicesState.data?.invoices
  );


  useEffect(() => {
    axiosClient.get('/payment/')
      .then((result) => {
        setData(result.data);
        setCount(result.data.length);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

 
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);


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
        <title>Transactions: List | Lobang Dashboard</title>
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
              Transactions({count})
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
             
                <Button
                  color="primary"
                  component="a"
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
        
            <Divider />
            <TransactionsTable
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

Transactions.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Transactions;
