import { useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Box, Button, Container, Divider, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { productApi } from "../../../api/product";
import { ActionsMenu } from "../../actions-menu";
import { ConfirmationDialog } from "../../confirmation-dialog";
import { Status } from "../../status";
import { useDialog } from "../../../hooks/use-dialog";
import { useMounted } from "../../../hooks/use-mounted";
import { ArrowLeft as ArrowLeftIcon } from "../../../icons/arrow-left";
import { ExclamationOutlined as ExclamationOutlinedIcon } from "../../../icons/exclamation-outlined";

// NOTE: This should be generated based on product data because "/1" represents "/:id" from routing
// //  strategy where ":id" is dynamic depending on current product id
const tabs = [
  {
    href: "/dashboard/products/1",
    label: "Summary",
  },
  {
    href: "/dashboard/products/1/analytics",
    label: "Insights",
  },
  {
    href: "/dashboard/products/1/inventory",
    label: "Inventory",
  },
];

export const ProductLayout = (props) => {
  const { children } = props;
  const isMounted = useMounted();
  const router = useRouter();
  const [discontinueDialogOpen, handleOpenDiscontinueDialog, handleCloseDiscontinueDialog] =
    useDialog();
  const [archiveOpen, handleOpenArchiveDialog, handleCloseArchiveDialog] = useDialog();
  const [productState, setProductState] = useState({ isLoading: true });

  const getProduct = useCallback(async () => {
    setProductState(() => ({ isLoading: true }));

    try {
      const result = await productApi.getProduct();

      if (isMounted()) {
        setProductState(() => ({
          isLoading: false,
          data: result,
        }));
      }
    } catch (err) {
      console.error(err);

      if (isMounted()) {
        setProductState(() => ({
          isLoading: false,
          error: err.message,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProduct().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendInvoice = () => {
    toast.error("This action is not available on demo");
  };

  const handleDiscontinueProduct = () => {
    handleCloseDiscontinueDialog();
    toast.error("This action is not available on demo");
  };

  const handleArchiveProduct = () => {
    handleCloseArchiveDialog();
    toast.error("This action is not available on demo");
  };

  const handleTabsChange = (event, value) => {
    router.push(tabs[value].href);
  };

  const actions = [
    {
      label: "Send Invoice to CustomerLayout",
      onClick: handleSendInvoice,
    },
    {
      label: "Discontinue ProductLayout",
      onClick: handleOpenDiscontinueDialog,
    },
    {
      label: "Archive ProductLayout",
      onClick: handleOpenArchiveDialog,
    },
  ];

  const renderContent = () => {
    if (productState.isLoading) {
      return (
        <Box sx={{ py: 4 }}>
          <Skeleton height={42} />
          <Skeleton />
          <Skeleton />
        </Box>
      );
    }

    if (productState.error) {
      return (
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: (theme) =>
                theme.palette.mode == "light" ? "neutral.50" : "neutral.900",
              display: "flex",
              flexDirection: "column",
              p: 3,
            }}
          >
            <ExclamationOutlinedIcon />
            <Typography color="textSecondary"
sx={{ mt: 2 }}
variant="body2">
              {productState.error}
            </Typography>
          </Box>
        </Box>
      );
    }

    return (
      <>
        <Box sx={{ py: 4 }}>
          <Box sx={{ mb: 2 }}>
            <NextLink href="/dashboard/products"
passHref>
              <Button color="primary"
component="a"
startIcon={<ArrowLeftIcon />}
variant="text">
                Products
              </Button>
            </NextLink>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textPrimary"
variant="h4">
              {productState.data.name}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <ActionsMenu actions={actions} />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Status color="success.main"
label="Published" />
          </Box>
          <Tabs
            allowScrollButtonsMobile
            sx={{ mt: 2 }}
            value={router.isReady ? tabs.findIndex((tab) => tab.href === router.asPath) : false}
            variant="scrollable"
            onChange={handleTabsChange}
            textColor="primary"
          >
            {tabs.map((option, index) => (
              <Tab key={option.href}
label={option.label}
value={index} />
            ))}
          </Tabs>
          <Divider />
        </Box>
        {children}
        <ConfirmationDialog
          message="Are you sure you want to discontinue this product? This can't be undone."
          onCancel={handleCloseDiscontinueDialog}
          onConfirm={handleDiscontinueProduct}
          open={discontinueDialogOpen}
          title="Discontinue ProductLayout"
          variant="error"
        />
        <ConfirmationDialog
          message="Are you sure you want to archive this order? This can't be undone."
          onCancel={handleCloseArchiveDialog}
          onConfirm={handleArchiveProduct}
          open={archiveOpen}
          title="Archive ProductLayout"
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

ProductLayout.propTypes = {
  children: PropTypes.node,
};
