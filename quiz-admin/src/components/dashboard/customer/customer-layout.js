import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { customerApi } from "../../../api/customer";
import { ActionsMenu } from "../../actions-menu";
import { ConfirmationDialog } from "../../confirmation-dialog";
import { useDialog } from "../../../hooks/use-dialog";
import { useMounted } from "../../../hooks/use-mounted";
import { ArrowLeft as ArrowLeftIcon } from "../../../icons/arrow-left";
import { Calendar as CalendarIcon } from "../../../icons/calendar";
import { Cash as CashIcon } from "../../../icons/cash";
import { ExclamationOutlined as ExclamationOutlinedIcon } from "../../../icons/exclamation-outlined";
import { ShoppingCart as ShoppingCartIcon } from "../../../icons/shopping-cart";

// NOTE: This should be generated based on user data
const stats = [
  {
    content: "Since: Apr 2021",
    icon: <CalendarIcon fontSize="small" sx={{ color: "text.secondary" }} />,
  },
  {
    content: "Orders: 17",
    icon: <ShoppingCartIcon fontSize="small" sx={{ color: "text.secondary" }} />,
  },
  {
    content: "Spent: $ 69.00",
    icon: <CashIcon fontSize="small" sx={{ color: "text.secondary" }} />,
  },
];

// NOTE: This should be generated based on user data because "/1" represents "/:id" from routing
//  strategy where ":id" is dynamic depending on current customer id

export const CustomerLayout = (props) => {
  const { children } = props;
  const isMounted = useMounted();
  const router = useRouter();
  const { customerId } = router.query;
  // console.log(router.query)
  const [banDialogOpen, handleOpenBanDialog, handleCloseBanDialog] = useDialog();
  const [customerState, setCustomerState] = useState({ isLoading: true });

  const getCustomer = useCallback(async () => {
    setCustomerState(() => ({ isLoading: true }));

    try {
      const result = await customerApi.getCustomer();

      if (isMounted()) {
        setCustomerState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setCustomerState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCustomer().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendVerification = () => {
    toast.error("This action is not available on demo");
  };

  const handleSendPasswordReset = () => {
    toast.error("This action is not available on demo");
  };

  const handleBanAccount = () => {
    handleCloseBanDialog();
    toast.error("This action is not available on demo");
  };

  // const handleTabsChange = (event, value) => {
  //   router.push(tabs[value].href);
  // };

  const actions = [
    {
      label: "Send Verification Email",
      onClick: handleSendVerification,
    },
    {
      label: "Send Password Reset Email",
      onClick: handleSendPasswordReset,
    },
    {
      label: "Ban AccountLayout",
      onClick: handleOpenBanDialog,
    },
  ];

  const renderContent = () => {
    if (customerState.isLoading) {
      return (
        <Box sx={{ py: 4 }}>
          <Skeleton height={42} />
          <Skeleton />
          <Skeleton />
        </Box>
      );
    }

    if (customerState.error) {
      return (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <ExclamationOutlinedIcon />
            <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
              {customerState.error}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 2, my:2, display:'flex', justifyContent: 'space-between' }}>
            <NextLink href="/dashboard/customers" passHref>
              <Button color="primary" component="a" startIcon={<ArrowLeftIcon />} variant="text">
                Customers
              </Button>
            </NextLink>

            <ActionsMenu  actions={actions} />
          </Box>

          <Divider />
        </Box>
        {children}
        <ConfirmationDialog
          message="Are you sure you want to ban this account? This can't be undone."
          onCancel={handleCloseBanDialog}
          onConfirm={handleBanAccount}
          open={banDialogOpen}
          title="Ban CustomerLayout"
          variant="error"
        />
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {renderContent()}
      </Container>
    </Box>
  );
};

CustomerLayout.propTypes = {
  children: PropTypes.node,
};
