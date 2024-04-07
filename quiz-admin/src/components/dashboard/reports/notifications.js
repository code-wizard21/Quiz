import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { Cube as CubeIcon } from "../../../icons/cube";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";
import { Users as UsersIcon } from "../../../icons/users";
import { Cash as CashIcon } from "../../../icons/cash";
import { ActionsMenu } from "../../actions-menu";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Notifications = ({ stats, updatedStats }) => {
  const [range, setRange] = useState("Last Month");

  const ranges = [
    {
      label: "Last 7 days",
      value: 1,
      onClick: () => {
        updatedStatsAndSetRange(1, "Last 7 Days");
      },
    },
    {
      label: "Last Month",
      value: 2,
      onClick: () => {
        updatedStatsAndSetRange(2, "Last Month");
      },
    },
    {
      label: "Last Year",
      value: 3,
      onClick: () => {
        updatedStatsAndSetRange(3, "Last Year");
      },
    },
  ];

  if (!stats) {
    return null;
  }

  const updatedStatsAndSetRange = (type, range) => {
    updatedStats(type);
    setRange(range);
  };

  return (
    <Card>
      <CardHeader
        action={<ActionsMenu actions={ranges}
label={range}
size="small"
variant="text" />}
        title="Notifications"
      />
      <Divider />
      <List>
        <ListItem divider>
          <ListItemIcon>
            <CubeIcon sx={{ color: "text.secondary" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography color="inherit"
variant="body2">
                <Typography color="inherit"
component="span"
variant="subtitle2">
                  {stats.totalAsks} Posts Created
                </Typography>
              </Typography>
            }
          />
        </ListItem>
        <ListItem divider>
          <ListItemIcon>
            <UsersIcon sx={{ color: "text.secondary" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography color="inherit"
variant="body2">
                <Typography color="inherit"
component="span"
variant="subtitle2">
                  {stats.totalUsers} New Users have Joined
                </Typography>
              </Typography>
            }
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CashIcon sx={{ color: "text.secondary" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography color="inherit"
variant="body2">
                <Typography color="inherit"
component="span"
variant="subtitle2">
                  {stats.totalNominations} Nominations have been made.
                </Typography>
              </Typography>
            }
          />
        </ListItem>
      </List>
      <Divider />
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode == "light" ? "neutral.50" : "neutral.900",
          py: 1,
          px: 3,
        }}
      >
        <Button endIcon={<ArrowForwardIcon />}>See all notifications</Button>
      </Box>
    </Card>
  );
};
