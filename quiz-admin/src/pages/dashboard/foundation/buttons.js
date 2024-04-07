import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Grid,
  Grow,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { DemoPreview } from "../../../components/demo-preview";
import { Plus as PlusIcon } from "../../../icons/plus";
import { gtm } from "../../../lib/gtm";

const options = ["Create a merge commit", "Squash and merge", "Rebase and merge"];

const FoundationButtons = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Foundation: Buttons | Lobang Dashboard</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Typography color="textPrimary"
sx={{ mb: 6 }}
variant="h4">
            Buttons
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 5,
              gridAutoFlow: "row",
            }}
          >
            <DemoPreview
              title="Buttons"
              description="Lobang elements are themed Material-UI components."
            >
              <Grid container
spacing={2}>
                <Grid item>
                  <Button color="primary"
size="large"
variant="contained">
                    Contained
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary"
size="large"
variant="outlined">
                    Outlined
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary"
size="large"
variant="text">
                    Text
                  </Button>
                </Grid>
                <Grid item>
                  <Button color="primary"
size="large"
startIcon={<PlusIcon />}
variant="contained">
                    Icon
                  </Button>
                </Grid>
              </Grid>
            </DemoPreview>
            <DemoPreview title="Button Group">
              <ButtonGroup ref={anchorRef}
variant="contained">
                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button size="small"
onClick={handleToggle}>
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper open={open}
anchorEl={anchorRef.current}
transition
disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={(event) => handleMenuItemClick(event, index)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </DemoPreview>
            <DemoPreview title="Link">
              <Link color="primary"
href="#"
underline="none"
variant="body1">
                Link
              </Link>
            </DemoPreview>
          </Box>
        </Container>
      </Box>
    </>
  );
};

FoundationButtons.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default FoundationButtons;
