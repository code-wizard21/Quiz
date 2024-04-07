import PropTypes from "prop-types";
import NextLink from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  Switch,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/use-auth";
import { usePopover } from "../../hooks/use-popover";
import { ChevronDown as ChevronDownIcon } from "../../icons/chevron-down";
import { Logout as LogoutIcon } from "../../icons/logout";
import { OfficeBuilding as OfficeBuildingIcon } from "../../icons/office-building";
import { User as UserIcon } from "../../icons/user";
import { InputField } from "../input-field";

const languageOptions = {
  en: {
    label: "English",
  },
  de: {
    label: "German",
  },
  es: {
    label: "Spanish",
  },
};

export const AccountPopover = (props) => {
  const {
    currentOrganization,
    darkMode,
    onLanguageChange,
    onOrganizationChange,
    onSwitchDirection,
    onSwitchTheme,
    organizations,
    rtlDirection,
    ...other
  } = props;
  const { i18n } = useTranslation();
  const router = useRouter();
  const { logout } = useAuth();
  const [anchorRef, open, handleOpen, handleClose] = usePopover();

  const handleOrganizationChange = (event) => {
    onOrganizationChange?.(event.target.value);
  };

  const handleLanguageChange = (event) => {
    onLanguageChange(event.target.value);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Box
        onClick={handleOpen}
        ref={anchorRef}
        sx={{
          alignItems: "center",
          cursor: "pointer",
          display: "flex",
          ml: 2,
        }}
        {...other}
      >
        <Avatar
          src="/static/user-chen_simmons.png"
          variant="rounded"
          sx={{
            height: 40,
            width: 40,
          }}
        />
        <Box
          sx={{
            alignItems: "center",
            display: {
              md: "flex",
              xs: "none",
            },
            flex: 1,
            ml: 1,
            minWidth: 120,
          }}
        >
          <div>
            <Typography sx={{ color: "primary.contrastText" }}
variant="caption">
              Operation
            </Typography>
            <Typography sx={{ color: "primary.contrastText" }}
variant="subtitle2">
              Chen Simmons
            </Typography>
          </div>
          <ChevronDownIcon
            sx={{
              color: "primary.contrastText",
              ml: 1,
            }}
          />
        </Box>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            width: 260,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <InputField
          fullWidth
          onChange={handleOrganizationChange}
          select
          SelectProps={{ native: true }}
          value={currentOrganization.id}
          sx={{
            display: {
              md: "none",
            },
            pt: 2,
            px: 2,
          }}
        >
          {organizations.map((organization) => (
            <option key={organization.id}
value={organization.id}>
              {organization.name}
            </option>
          ))}
        </InputField>
        <List>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar variant="rounded"
src="/static/user-chen_simmons.png" />
            </ListItemAvatar>
            <ListItemText primary="Chen Simmons"
secondary="ACME Corp LLC." />
          </ListItem>
          <li>
            <List disablePadding>
              <ListSubheader disableSticky>App Settings</ListSubheader>
              <ListItem
                sx={{
                  display: {
                    md: "none",
                    xs: "flex",
                  },
                }}
              >
                <InputField
                  fullWidth
                  onChange={handleLanguageChange}
                  select
                  SelectProps={{ native: true }}
                  value={i18n.language}
                >
                  {Object.keys(languageOptions).map((option) => (
                    <option key={option}
value={option}>
                      {languageOptions[option].label}
                    </option>
                  ))}
                </InputField>
              </ListItem>
              <ListItem
                sx={{
                  py: 0,
                  display: {
                    md: "none",
                    xs: "flex",
                  },
                }}
              >
                <Switch checked={darkMode}
onChange={onSwitchTheme} />
                <Typography color="textPrimary"
variant="body2">
                  Dark Mode
                </Typography>
              </ListItem>
              <ListItem divider
sx={{ pt: 0 }}>
                <Switch checked={rtlDirection}
onChange={onSwitchDirection} />
                <Typography color="textPrimary"
variant="body2">
                  RTL
                </Typography>
              </ListItem>
            </List>
          </li>
          <NextLink href="/dashboard/organization"
passHref>
            <ListItem button
component="a"
divider
onClick={handleClose}>
              <ListItemIcon>
                <OfficeBuildingIcon />
              </ListItemIcon>
              <ListItemText primary="Organization" />
            </ListItem>
          </NextLink>
          <NextLink href="/dashboard/account"
passHref>
            <ListItem button
component="a"
divider
onClick={handleClose}>
              <ListItemIcon>
                <UserIcon />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </NextLink>
          <ListItem button
onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  currentOrganization: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onOrganizationChange: PropTypes.func.isRequired,
  onSwitchDirection: PropTypes.func.isRequired,
  onSwitchTheme: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired,
  rtlDirection: PropTypes.bool.isRequired,
};
