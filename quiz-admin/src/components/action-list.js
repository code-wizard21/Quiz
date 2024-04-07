import { List } from "@mui/material";

export const ActionList = (props) => (
  <List
    dense
    sx={{
      backgroundColor: (theme) => (theme.palette.mode == "light" ? "neutral.50" : "neutral.900"),
      width: "100%",
    }}
    {...props}
  />
);
