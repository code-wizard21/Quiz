import { useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import { DeviasChevronDown as ChevronDownIcon } from "../icons/devias-chevron-down";
import { DeviasChevronRight as ChevronRightIcon } from "../icons/devias-chevron-right";
import { X as XICon } from "../icons/x";
import { MainSidebarLink } from "./main-sidebar-link";

const sections = [
  {
    title: "Quiz",
    items: [
      {
        title: "List",
        href: "/dashboard/quiz",
      },
      {
        title: "Create",
        href: "/dashboard/quiz/create",
      },
      {
        title: "Inventory",
        href: "/dashboard/quiz/1/inventory",
      },
      {
        title: "Insights",
        href: "/dashboard/quiz/1/analytics",
      },
    ],
  },
  {
    title: "Orders",
    items: [
      {
        title: "List",
        href: "/dashboard/orders",
      },
      {
        title: "Summary",
        href: "/dashboard/orders/1",
      },
    ],
  },
  {
    title: "Customers",
    items: [
      {
        title: "List",
        href: "/dashboard/customers",
      },
      {
        title: "Summary",
        href: "/dashboard/customers/1",
      },
      {
        title: "Orders",
        href: "/dashboard/customers/1/orders",
      },
      {
        title: "Activity",
        href: "/dashboard/customers/1/orders",
      },
    ],
  },
  {
    title: "Invoices",
    items: [
      {
        title: "List",
        href: "/dashboard/invoices",
      },
      {
        title: "Create",
        href: "/dashboard/invoices/create",
      },
      {
        title: "Details",
        href: "/dashboard/invoices/1",
      },
      {
        title: "Preview",
        href: "/dashboard/invoices/1/preview",
      },
    ],
  },
  {
    title: "Dashboards",
    items: [
      {
        title: "Overview",
        href: "/dashboard",
      },
      {
        title: "Reports",
        href: "/dashboard/sales",
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "General",
        href: "/dashboard/account",
      },
      {
        title: "Notifications",
        href: "/dashboard/account/notifications",
      },
    ],
  },
  {
    title: "Organization",
    items: [
      {
        title: "General",
        href: "/dashboard/organization",
      },
      {
        title: "Team",
        href: "/dashboard/organization/team",
      },
      {
        title: "Billing",
        href: "/dashboard/organization/billing",
      },
    ],
  },
];

const MainSidebarSection = (props) => {
  const { section } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <li>
        <Button
          color="inherit"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            width: "100%",
          }}
          variant="text"
          onClick={handleClick}
        >
          {section.title}
          {open ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Button>
      </li>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding sx={{ color: "neutral.500" }}>
          {section.items.map((item) => (
            <NextLink href={item.href} key={item.title} passHref>
              <MainSidebarLink label={item.title} sx={{ pl: 3 }} />
            </NextLink>
          ))}
        </List>
      </Collapse>
    </>
  );
};

MainSidebarSection.propTypes = {
  section: PropTypes.object.isRequired,
};

export const MainSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();

  useEffect(() => {
    if (open && onClose) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      variant="temporary"
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "primary.contrastText",
          width: 256,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pt: 2,
          px: 3,
        }}
      >
        <IconButton onClick={onClose} sx={{ color: "#ffffff" }}>
          <XICon />
        </IconButton>
      </Box>
      <Box
        sx={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
        }}
      >
        <List sx={{ width: "100%" }}>
          <NextLink href="/dashboard" passHref>
            <MainSidebarLink label="Live Demo" />
          </NextLink>
          <NextLink href="/docs/welcome" passHref>
            <MainSidebarLink label="Docs" />
          </NextLink>
          <List
            subheader={
              <ListSubheader disableGutters disableSticky>
                <Typography color="textSecondary" variant="overline" sx={{ pl: 1 }}>
                  Pages
                </Typography>
              </ListSubheader>
            }
            sx={{ width: "100%" }}
          >
            {sections.map((section) => (
              <MainSidebarSection section={section} key={section.title} />
            ))}
          </List>
        </List>
      </Box>
    </Drawer>
  );
};

MainSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
