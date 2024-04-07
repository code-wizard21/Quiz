import PropTypes from "prop-types";
import { List } from "@mui/material";

export const OrderPreviewList = (props) => {
  const { children, ...other } = props;

  return (
    <List disablePadding
sx={{ width: "100%" }}
{...other}>
      {children}
    </List>
  );
};

OrderPreviewList.propTypes = {
  children: PropTypes.node,
};
