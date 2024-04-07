import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";
import { OrderPreviewItem } from "../order/order-preview-item";
import { OrderPreviewList } from "../order/order-preview-list";
import { ResourceUnavailable } from "../../resource-unavailable";

export const CustomerLatestOrders = (props) => {
  const { orders, ...other } = props;

  return (
    <div {...other}>
      <Typography color="textPrimary"
variant="h6"
sx={{ mb: 3 }}>
        New Users
      </Typography>
      {orders.length ? (
        <Card>
          <OrderPreviewList>
            {orders.map((order, index) => (
              <OrderPreviewItem divider={orders.length > index + 1}
key={order.id}
order={order} />
            ))}
          </OrderPreviewList>
        </Card>
      ) : (
        <ResourceUnavailable />
      )}
    </div>
  );
};

CustomerLatestOrders.defaultProps = {
  orders: [],
};

CustomerLatestOrders.propTypes = {
  orders: PropTypes.array,
};
