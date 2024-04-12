import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, Button,IconButton, List, Typography } from "@mui/material";
import { DashboardSidebarItem } from "./dashboard-sidebar-item";
import { Scrollbar } from "../scrollbar";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";

import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { Cog as CogIcon } from "../../icons/cog";
import { ColorSwatch as ColorSwatchIcon } from "../../icons/color-swatch";
import { CustomChartPie as ChartPieIcon } from "../../icons/custom-chart-pie";
import { CustomCube as CubeIcon } from "../../icons/custom-cube";
import { CustomUsers as UsersIcon } from "../../icons/custom-users";
import { DocumentText as DocumentTextIcon } from "../../icons/document-text";
import { Cube } from "../../icons/cube";
import NextLink from "next/link";
const items = [
  {
    icon: ChartPieIcon,
    title: "Reports",
    href: "/dashboard/reports",
  },
  {
    icon: UsersIcon,
    title: "Users",
    href: "/dashboard/users",
  },
  {
    icon: CubeIcon,
    title: "Quiz",
    href: "/dashboard/quizzes",
  },
  {
    icon: CubeIcon,
    title: "Guest Users",
    href: "/dashboard/users/shadow",
  },
  {
    icon: CubeIcon,
    title: "From Stripe",
    href: "/dashboard/stripe_payment",
  },
  {
    icon: CubeIcon,
    title: "Transactions",
    href: "/dashboard/transactions",
  },
  // {
  //   icon: CubeIcon,
  //   title: "Create Quiz",
  //   href: "/dashboard/quiz/create",
  // },
];

export const DashboardSidebar = (props) => {
  const { onPin, pinned } = props;
  const router = useRouter();
  const [openedItem, setOpenedItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeHref, setActiveHref] = useState("");
  const [hovered, setHovered] = useState(false);

  const handleOpenItem = (item) => {
    if (openedItem === item) {
      setOpenedItem(null);
      return;
    }

    setOpenedItem(item);
  };

  useEffect(() => {
    items.forEach((item) => {
      if (item.items) {
        for (let index = 0; index < item.items.length; index++) {
          const active = item.items[index].partialMatch
            ? router.asPath.startsWith(item.items[index].href)
            : router.asPath === item.items[index].href;

          if (active) {
            setActiveItem(item);
            setActiveHref(item.items[index].href);
            setOpenedItem(item);
            break;
          }
        }
      } else {
        const active = item.partialMatch
          ? router.asPath.startsWith(item.href)
          : router.asPath === item.href;

        if (active) {
          setActiveItem(item);
          setOpenedItem(item);
        }
      }
    });
  }, [router.asPath]);

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        onMouseOver: () => {
          setHovered(true);
        },
        onMouseLeave: () => {
          setHovered(false);
        },
        sx: {
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "neutral.50" : "neutral.900",
          height: "calc(100% - 64px)",
          overflowX: "hidden",
          top: 64,
          transition: "width 250ms ease-in-out",
          width: pinned ? 270 : 73,
          "& .simplebar-content": {
            height: "100%",
          },
          "&:hover": {
            width: 270,
            "& span, p": {
              display: "flex",
            },
          },
        },
      }}
    >
      <Scrollbar
        style={{
          display: "flex",
          flex: 1,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          <Typography variant="h4" color={"red"}>
            QuizMobb
          </Typography>
          <List disablePadding>
            <li>
              <NextLink href='/dashboard/reports' passHref>
                <Button
                  component="a"
                  endIcon={<ExternalLinkIcon color="action" />}
                  fullWidth
                  // startIcon={<Icon />}
                  // target={external ? "_target" : "_self"}
                  sx={{
                    fontWeight: 500,
                    justifyContent: "flex-start",
                    lineHeight: 0,
                    minWidth: "fit-content",
                    px: 1.25,
                    py: 1.25,
                    "& .MuiButton-startIcon": {
                      color: activeItem ? "primary" : "text.secondary",
                      margin: 0,
                    },
                    "& .MuiButton-endIcon": {
                      color: "action.disabled",
                      display: pinned ? "flex" : "none",
                      marginLeft: "auto",
                    },
                  }}
                  variant="text"
                >
                  <Typography
                    color="textPrimary"
                    sx={{
                      color: activeItem ? "primary" : "text.secondary",
                      display: pinned ? "flex" : "none",
                      ml: 1.25,
                    }}
                    variant="inherit"
                  >
                  Report
                  </Typography>
                </Button>
              </NextLink>
              <NextLink href='/dashboard/users' passHref>
                <Button
                  component="a"
                  endIcon={<ExternalLinkIcon color="action" />}
                  fullWidth
                  // startIcon={<Icon />}
                  // target={external ? "_target" : "_self"}
                  sx={{
                    fontWeight: 500,
                    justifyContent: "flex-start",
                    lineHeight: 0,
                    minWidth: "fit-content",
                    px: 1.25,
                    py: 1.25,
                    "& .MuiButton-startIcon": {
                      color: activeItem ? "primary" : "text.secondary",
                      margin: 0,
                    },
                    "& .MuiButton-endIcon": {
                      color: "action.disabled",
                      display: pinned ? "flex" : "none",
                      marginLeft: "auto",
                    },
                  }}
                  variant="text"
                >
                  <Typography
                    color="textPrimary"
                    sx={{
                      color: activeItem ? "primary" : "text.secondary",
                      display: pinned ? "flex" : "none",
                      ml: 1.25,
                    }}
                    variant="inherit"
                  >
                  Users
                  </Typography>
                </Button>
              </NextLink>
              <NextLink href='/dashboard/quizzes' passHref>
                <Button
                  component="a"
                  endIcon={<ExternalLinkIcon color="action" />}
                  fullWidth
                  // startIcon={<Icon />}
                  // target={external ? "_target" : "_self"}
                  sx={{
                    fontWeight: 500,
                    justifyContent: "flex-start",
                    lineHeight: 0,
                    minWidth: "fit-content",
                    px: 1.25,
                    py: 1.25,
                    "& .MuiButton-startIcon": {
                      color: activeItem ? "primary" : "text.secondary",
                      margin: 0,
                    },
                    "& .MuiButton-endIcon": {
                      color: "action.disabled",
                      display: pinned ? "flex" : "none",
                      marginLeft: "auto",
                    },
                  }}
                  variant="text"
                >
                  <Typography
                    color="textPrimary"
                    sx={{
                      color: activeItem ? "primary" : "text.secondary",
                      display: pinned ? "flex" : "none",
                      ml: 1.25,
                    }}
                    variant="inherit"
                  >
                  Quiz
                  </Typography>
                </Button>
              </NextLink>
              <NextLink href='/dashboard/reports' passHref>
                <Button
                  component="a"
                  endIcon={<ExternalLinkIcon color="action" />}
                  fullWidth
                  // startIcon={<Icon />}
                  // target={external ? "_target" : "_self"}
                  sx={{
                    fontWeight: 500,
                    justifyContent: "flex-start",
                    lineHeight: 0,
                    minWidth: "fit-content",
                    px: 1.25,
                    py: 1.25,
                    "& .MuiButton-startIcon": {
                      color: activeItem ? "primary" : "text.secondary",
                      margin: 0,
                    },
                    "& .MuiButton-endIcon": {
                      color: "action.disabled",
                      display: pinned ? "flex" : "none",
                      marginLeft: "auto",
                    },
                  }}
                  variant="text"
                >
                  <Typography
                    color="textPrimary"
                    sx={{
                      color: activeItem ? "primary" : "text.secondary",
                      display: pinned ? "flex" : "none",
                      ml: 1.25,
                    }}
                    variant="inherit"
                  >
                  Report
                  </Typography>
                </Button>
              </NextLink>
            </li>
          </List>
          <Box sx={{ flexGrow: 1 }} />

          <Divider />
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool,
};
