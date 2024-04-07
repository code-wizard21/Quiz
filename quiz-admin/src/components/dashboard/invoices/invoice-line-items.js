import PropTypes from "prop-types";
import { Card, CardHeader, Divider } from "@mui/material";
// import { InvoiceTable } from "./invoice-table";

export const InvoiceLineItems = (props) => {
  const { invoice } = props;

  return (
    <Card>
      <CardHeader title="Line Items" />
      <Divider />
      {/* <InvoiceTable invoice={invoice} /> */}
    </Card>
  );
};

InvoiceLineItems.propTypes = {
  invoice: PropTypes.object.isRequired,
};
