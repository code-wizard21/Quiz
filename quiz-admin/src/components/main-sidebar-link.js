import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

export const MainSidebarLink = forwardRef((props, ref) => {
  const { label, sx, ...other } = props;

  return (
    <li>
      <Button
        color="inherit"
        ref={ref}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          width: "100%",
          ...sx,
        }}
        variant="text"
        {...other}
      >
        {label}
      </Button>
    </li>
  );
});

MainSidebarLink.propTypes = {
  label: PropTypes.string,
  sx: PropTypes.object,
};
