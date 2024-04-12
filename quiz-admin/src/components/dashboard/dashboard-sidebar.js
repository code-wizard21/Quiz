import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, IconButton, List } from "@mui/material";
import { DashboardSidebarItem } from "./dashboard-sidebar-item";
import { Scrollbar } from "../scrollbar";
import { ChevronLeft as ChevronLeftIcon } from "../../icons/chevron-left";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { Cog as CogIcon } from "../../icons/cog";
import { ColorSwatch as ColorSwatchIcon } from "../../icons/color-swatch";
import { CustomChartPie as ChartPieIcon } from "../../icons/custom-chart-pie";
import { CustomCube as CubeIcon } from "../../icons/custom-cube";
import { CustomUsers as UsersIcon } from "../../icons/custom-users";
import { DocumentText as DocumentTextIcon } from "../../icons/document-text";
import { Cube } from "../../icons/cube";

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
          <List disablePadding>
            {activeItem &&
              items.map((item) => (
                <DashboardSidebarItem
                  active={activeItem?.title === item.title}
                  activeHref={activeHref}
                  key={item.title}
                  onOpen={() => handleOpenItem(item)}
                  open={openedItem?.title === item.title && (hovered || pinned)}
                  pinned={pinned}
                  {...item}
                />
              ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box sx={{ pt: 1 }}>
            <IconButton onClick={onPin}>
              {pinned ? <ChevronLeftIcon color="action" /> : <ChevronRightIcon color="action" />}
            </IconButton>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onPin: PropTypes.func,
  pinned: PropTypes.bool,
};
