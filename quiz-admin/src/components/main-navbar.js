import PropTypes from "prop-types";
import NextLink from "next/link";
import { AppBar, Box, Container, IconButton, List } from "@mui/material";
import { Menu as MenuIcon } from "../icons/menu";
import { Logo } from "./logo";
import { MainNavbarLink } from "./main-navbar-link";
import { PagesDropdown } from "./pages-dropdown";

export const MainNavbar = (props) => {
  const { onOpenSidebar } = props;

  return (
    <AppBar elevation={0} sx={{ backgroundColor: "primary.700" }}>
      <Container
        maxWidth="xl"
        sx={{
          alignItems: "center",
          color: "#ffffff",
          display: "flex",
          height: 64,
          position: "relative",
        }}
      >
        <NextLink href="/" passHref>
          <a>QuizMobb</a>
        </NextLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={onOpenSidebar}
          sx={{
            display: {
              md: "none",
            },
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <List
          disablePadding
          sx={{
            display: {
              md: "flex",
              xs: "none",
            },
            position: "static",
          }}
        >
          <MainNavbarLink label="Pages" dropdown={<PagesDropdown />} />
          <NextLink href="/dashboard/reports" passHref>
            <MainNavbarLink component="a" label="Live Demo" />
          </NextLink>
          <NextLink href="/docs/welcome" passHref>
            <MainNavbarLink component="a" label="Docs" />
          </NextLink>
        </List>
      </Container>
    </AppBar>
  );
};

MainNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
