import NextLink from "next/link";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Button, Collapse, List, Typography } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { ChevronDown as ChevronDownIcon } from "../../icons/chevron-down";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";

export const DashboardSidebarItem = (props) => {
  const {
    active,
    activeHref,
    external,
    href,
    icon: Icon,
    items,
    onOpen,
    open,
    pinned,
    title,
  } = props;
  const { t } = useTranslation();

  // Branch
  if (items) {
    return (
      <List disablePadding sx={{ width: "100%" }}>
        <li>
          <Button
            endIcon={
              open ? (
                <ChevronDownIcon color="action" fontSize="small" />
              ) : (
                <ChevronRightIcon color="action" fontSize="small" />
              )
            }
            fullWidth
            onClick={onOpen}
            startIcon={<Icon />}
            sx={{
              justifyContent: "flex-start",
              lineHeight: 0,
              minWidth: "fit-content",
              px: 1.25,
              py: 1.25,
              "& .MuiButton-startIcon": {
                color: active ? "primary" : "action.active",
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
                color: active ? "primary" : "text.secondary",
                display: pinned ? "flex" : "none",
                ml: 1.25,
              }}
              variant="inherit"
            >
              {t(title)}
            </Typography>
          </Button>
        </li>
        <Collapse in={open} unmountOnExit>
          <List disablePadding sx={{ width: "100%" }}>
            {items.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <li key={item.href}>
                  <NextLink href={item.href} passHref>
                    <Button
                      component="a"
                      fullWidth
                      sx={{
                        color: isActive ? "primary" : "text.secondary",
                        fontWeight: 400,
                        justifyContent: "flex-start",
                        pl: 5,
                        whiteSpace: "nowrap",
                      }}
                      variant="text"
                    >
                      {t(item.title)}
                    </Button>
                  </NextLink>
                </li>
              );
            })}
          </List>
        </Collapse>
      </List>
    );
  }

  // Leaf
  return (
    <li>
      <NextLink href={href} passHref>
        <Button
          component="a"
          endIcon={external && <ExternalLinkIcon color="action" />}
          fullWidth
          startIcon={<Icon />}
          target={external ? "_target" : "_self"}
          sx={{
            fontWeight: 500,
            justifyContent: "flex-start",
            lineHeight: 0,
            minWidth: "fit-content",
            px: 1.25,
            py: 1.25,
            "& .MuiButton-startIcon": {
              color: active ? "primary" : "text.secondary",
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
              color: active ? "primary" : "text.secondary",
              display: pinned ? "flex" : "none",
              ml: 1.25,
            }}
            variant="inherit"
          >
            {t(title)}
          </Typography>
        </Button>
      </NextLink>
    </li>
  );
};

DashboardSidebarItem.defaultProps = {
  open: false,
  pinned: false,
};

DashboardSidebarItem.propTypes = {
  active: PropTypes.bool,
  activeHref: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  items: PropTypes.array,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  pinned: PropTypes.bool,
  title: PropTypes.string,
};
