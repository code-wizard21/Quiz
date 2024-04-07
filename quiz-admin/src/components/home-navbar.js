import PropTypes from "prop-types";
import NextLink from "next/link";
import { AppBar, Box, Container, Typography } from "@mui/material";

export const HomeNavbar = (props) => {
  return (
    <AppBar
      elevation={0}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: "center",
          color: "#000",
          display: "flex",
          height: 64,
          position: "relative",
        }}
      >
        <NextLink href="/"
passHref>
          <a
            style={{
              color: "#000",
              display: 'contents'
            }}
          >
            <img src='/logo.png' style={{ height: 40, marginRight: 10 }} />
            <Typography
              variant="h4">Moxie</Typography>
          </a>
        </NextLink>
        <Box sx={{ flexGrow: 1 }} />
      </Container>
    </AppBar>
  );
};

HomeNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
