import PropTypes from "prop-types";
import { Card, CardHeader, Divider } from "@mui/material";
import { OrderSummary } from "./order-summary";

export const OrderLineItems = (props) => {
  const { order, ...other } = props;

  return (
    <Card {...other}>
      <CardHeader title="Line Items" />
      <Divider />
      <OrderSummary order={order} />
    </Card>
  );
};

OrderLineItems.propTypes = {
  order: PropTypes.object,
};
