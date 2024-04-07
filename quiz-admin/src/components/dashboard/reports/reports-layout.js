import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { gtm } from "../../../lib/gtm";

const tabs = [
  {
    href: "/dashboard/reports",
    label: "Overview",
  },
];

export const ReportsLayout = (props) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleTabsChange = (event, value) => {
    router.push(tabs[value].href);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ pb: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Typography color="textPrimary"
variant="h4">
              Reports
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

ReportsLayout.propTypes = {
  children: PropTypes.node,
};
