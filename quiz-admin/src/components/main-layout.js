import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MainNavbar } from "./main-navbar";
import { HomeNavbar } from "./home-navbar";
import { MainSidebar } from "./main-sidebar";
import { Footer } from "./footer";

const MainLayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: 64,
}));

export const MainLayout = ({ children, ismain }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return (
    <MainLayoutRoot>
      {ismain ? (
        <HomeNavbar />
      ) : (<>
        <MainNavbar onOpenSidebar={() => setOpenSidebar(true)} />
        <MainSidebar onClose={() => setOpenSidebar(false)}
open={lgDown && openSidebar} />
        </>
      )}
      {children}
      <Footer />
    </MainLayoutRoot>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};
