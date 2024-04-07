import NextLink from "next/link";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ChevronRight as ChevronRightIcon } from "../../icons/chevron-right";
import { ChevronDown as ChevronDownIcon } from "../../icons/chevron-down";
import { ExternalLink as ExternalLinkIcon } from "../../icons/external-link";

export const DashboardNavbarMenuItem = (props) => {
  const {
    active,
    activeHref,
    external,
    href,
    icon: Icon,
    items,
    onClose,
    onOpenItem,
    open,
    title,
  } = props;
  const { t } = useTranslation();

  // Branch
  if (items) {
    return (
      <List disablePadding
sx={{ width: "100%" }}>
        <ListItemButton
          divider
          key={title}
          onClick={onOpenItem}
          sx={{
            alignItems: "center",
            display: "flex",
            px: 2.25,
            py: 2.25,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 1,
            }}
          >
            <Icon color={active ? "primary" : "action"} />
          </ListItemIcon>
          <ListItemText
            primary={t(title)}
            primaryTypographyProps={{
              color: active ? "primary" : "text.secondary",
              sx: { fontWeight: 600 },
              variant: "body2",
            }}
          />
          {open ? (
            <ChevronDownIcon color="action"
fontSize="small" />
          ) : (
            <ChevronRightIcon color="action"
fontSize="small" />
          )}
        </ListItemButton>
        <Collapse in={open}
unmountOnExit>
          <List disablePadding
sx={{ width: "100%" }}>
            {items.map((item) => {
              const isActive = activeHref === item.href;

              return (
                <NextLink href={item.href}
key={item.href}
passHref>
                  <ListItemButton
                    component="a"
                    divider
                    onClick={onClose}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      pl: 6,
                      py: 1.5,
                    }}
                  >
                    <ListItemText
                      primary={t(item.title)}
                      primaryTypographyProps={{
                        color: isActive ? "primary" : "text.secondary",
                        variant: "body2",
                      }}
                      sx={{ my: 0 }}
                    />
                  </ListItemButton>
                </NextLink>
              );
            })}
          </List>
        </Collapse>
      </List>
    );
  }

  // Leaf
  return (
    <>
      <NextLink href={href}
passHref>
        <ListItemButton
          component="a"
          divider
          onClick={onClose}
          sx={{
            alignItems: "center",
            display: "flex",
            px: 3,
            py: 1.5,
          }}
          target={external ? "_target" : "_self"}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: 1,
            }}
          >
            <Icon color={active ? "primary" : "action"} />
          </ListItemIcon>
          <ListItemText
            primary={t(title)}
            primaryTypographyProps={{
              color: "inherit",
              sx: { fontWeight: 500 },
              variant: "caption",
            }}
          />
          {external && <ExternalLinkIcon color="action" />}
        </ListItemButton>
      </NextLink>
    </>
  );
};

DashboardNavbarMenuItem.defaultProps = {
  open: false,
};

DashboardNavbarMenuItem.propTypes = {
  active: PropTypes.bool,
  activeHref: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  items: PropTypes.array,
  onClose: PropTypes.func,
  onOpenItem: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
