import { useState } from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import { format } from "date-fns";
import { Box, Collapse, Divider, IconButton, Link, ListItem, Typography } from "@mui/material";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { Status } from "../../status";
import { OrderSummary } from "./order-summary";

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
    label: "Delivered",
    value: "delivered",
  },
  {
    color: "success.main",
    label: "Complete",
    value: "complete",
  },
];

export const OrderPreviewItem = (props) => {
  const { order, ...other } = props;
  const [expanded, setExpanded] = useState(false);

  const handleExpandedChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <ListItem
      disableGutters
      disablePadding
      key={order.id}
      sx={{
        width: "100%",
        flexDirection: "column",
        alignItems: "stretch",
      }}
      {...other}
    >
      <Box
        sx={{
          display: {
            sm: "flex",
            xs: "block",
          },
          p: 2,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              mr: 2,
              px: 1.5,
              py: 0.5,
            }}
          >
            <Typography color="textSecondary"
variant="h5">
              {format(new Date(order.createdAt), "dd")}
            </Typography>
            <Typography color="textSecondary"
variant="caption">
              {format(new Date(order.createdAt), "MMM yy")}
            </Typography>
          </Box>
          <div>
            <NextLink href="/dashboard/customers/1"
passHref>
              <Link
                color="textPrimary"
                component="a"
                sx={{ display: "block" }}
                underline="none"
                variant="body2"
              >
                {`${order.name} ${order.surname}`}
              </Link>
            </NextLink>
            <NextLink href="/dashboard/orders/1"
passHref>
              <Link color="textSecondary"
component="a"
underline="none"
variant="body2">
                {`#${order.id}`}
              </Link>
            </NextLink>
          </div>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            ml: {
              sm: 0,
              xs: 1.5,
            },
          }}
        >
          {/* <Status
            color={statusVariant.color}
            label={statusVariant.label}
          /> */}
          <IconButton onClick={handleExpandedChange}
sx={{ ml: 3 }}>
            <ChevronDownIcon
              sx={{
                transition: "transform 150ms",
                transform: expanded ? "rotate(180deg)" : "none",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expanded}>
        <Divider />
        {/* <OrderSummary order={order} /> */}
      </Collapse>
    </ListItem>
  );
};

OrderPreviewItem.propTypes = {
  order: PropTypes.object.isRequired,
};
