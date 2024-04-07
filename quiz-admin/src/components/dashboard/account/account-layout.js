import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";

const tabs = [
  {
    href: "/dashboard/account",
    label: "General",
  },
  {
    href: "/dashboard/account/notifications",
    label: "Notifications",
  },
];

export const AccountLayout = (props) => {
  const { children } = props;
  const router = useRouter();

  const handleTabsChange = (event, value) => {
    router.push(tabs[value].href);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ py: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textPrimary"
variant="h4">
              Account Settings
            </Typography>
          </Box>
          <Tabs
            allowScrollButtonsMobile
            sx={{ mt: 2 }}
            value={router.isReady ? tabs.findIndex((tab) => tab.href === router.asPath) : false}
            variant="scrollable"
            onChange={handleTabsChange}
            textColor="primary"
          >
            {tabs.map((option, index) => (
              <Tab key={option.href}
label={option.label}
value={index} />
            ))}
          </Tabs>
          <Divider />
        </Box>
        {children}
      </Container>
    </Box>
  );
};

AccountLayout.propTypes = {
  children: PropTypes.node,
};
