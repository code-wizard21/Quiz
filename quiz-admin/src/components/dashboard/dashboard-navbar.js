import { useState } from "react";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Box, Button, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import { useSettings } from "../../contexts/settings-context";
import { ChevronDown as ChevronDownIcon } from "../../icons/chevron-down";
import { Moon as MoonIcon } from "../../icons/moon";
import { Sun as SunIcon } from "../../icons/sun";
import { AccountPopover } from "./account-popover";
import { OrganizationPopover } from "./organization-popover";
import { Logo } from "../logo";
import { DashboardNavbarMenu } from "./dashboard-navbar-menu";
import { NotificationsPopover } from "./notifications-popover";
import { LanguagePopover } from "./language-popover";

const organizations = [
  {
    id: "6039124832",
    name: "ACME LTD.",
  },
  {
    id: "3828312374",
    name: "Division LTD.",
  },
];

export const DashboardNavbar = () => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const { i18n, t } = useTranslation();
  const { settings, saveSettings } = useSettings();
  const [openMenu, setOpenMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(settings.theme === "dark");
  const [rtlDirection, setRtlDirection] = useState(settings.direction === "rtl");
  const [currentOrganization, setCurrentOrganization] = useState(organizations[0]);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    saveSettings({
      ...settings,
      language,
    });
    toast.success(t("Language changed"));
  };

  const handleSwitchTheme = () => {
    saveSettings({
      ...settings,
      theme: settings.theme === "light" ? "dark" : "light",
    });

    setDarkMode(settings.theme === "light");
  };

  const handleSwitchDirection = () => {
    saveSettings({
      ...settings,
      direction: settings.direction === "ltr" ? "rtl" : "ltr",
    });

    setRtlDirection(settings.direction === "rtl");
  };

  const handleOrganizationChange = (organizationId) => {
    const newOrganization = organizations.find(
      (organization) => organization.id === organizationId
    );

    if (!newOrganization) {
      return;
    }

    setCurrentOrganization(newOrganization);
  };

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: "#000",
        color: "#FFFFFF",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          alignItems: "center",
          display: "flex",
          minHeight: 64,
          px: 3,
          py: 1,
        }}
      >
        <NextLink href="/" passHref>
          <Box
            component="a"
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              style={{
                color: "#000",
                display: "contents",
              }}
            >
              <img src="/logo.png" style={{ height: 40, marginRight: 10 }} />
              <Typography variant="h4" color={"#fff"}>
                QuizMobb
              </Typography>
            </a>
          </Box>
        </NextLink>
        <Divider
          flexItem
          orientation="vertical"
          sx={{
            borderColor: "rgba(255,255,255,0.1)",
            mx: 3,
          }}
        />
        <DashboardNavbarMenu onClose={() => setOpenMenu(false)} open={mdDown && openMenu} />
        <Button
          endIcon={
            <ChevronDownIcon
              fontSize="small"
              sx={{
                ml: 2,
                transition: "transform 250ms",
                transform: openMenu ? "rotate(180deg)" : "none",
              }}
            />
          }
          onClick={() => setOpenMenu(true)}
          sx={{
            color: "primary.contrastText",
            display: {
              md: "none",
              xs: "flex",
            },
          }}
          variant="text"
        >
          Menu
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <LanguagePopover
          language={i18n.language}
          onLanguageChange={handleLanguageChange}
          sx={{
            display: {
              md: "inline-flex",
              xs: "none",
            },
          }}
        />
        <IconButton
          color="inherit"
          onClick={handleSwitchTheme}
          sx={{
            mx: 2,
            display: {
              md: "inline-flex",
              xs: "none",
            },
          }}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </IconButton>
        <NotificationsPopover sx={{ mr: 2 }} />
        <AccountPopover
          currentOrganization={currentOrganization}
          darkMode={darkMode}
          onLanguageChange={handleLanguageChange}
          onOrganizationChange={handleOrganizationChange}
          onSwitchDirection={handleSwitchDirection}
          onSwitchTheme={handleSwitchTheme}
          organizations={organizations}
          rtlDirection={rtlDirection}
        />
      </Toolbar>
    </AppBar>
  );
};
