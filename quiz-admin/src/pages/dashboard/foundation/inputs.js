import { useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Checkbox,
  Container,
  InputAdornment,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { AutocompleteField } from "../../../components/autocomplete-field";
import { InputField } from "../../../components/input-field";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { DemoPreview } from "../../../components/demo-preview";
import { gtm } from "../../../lib/gtm";

const FoundationInputs = () => {
  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Foundation: Inputs | Lobang Dashboard</title>
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
            Page Headers
          </Typography>
          <Box
            sx={{
              display: "grid",
              gap: 5,
              gridAutoFlow: "row",
            }}
          >
            <DemoPreview description="We use native Input"
title="Text Field">
              <Box
                sx={{
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 360,
                }}
              >
                <InputField fullWidth
label="Label"
sx={{ mb: 2 }} />
                <InputField
                  fullWidth
                  label="With Prefix"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                  }}
                />
              </Box>
            </DemoPreview>
            <DemoPreview title="Autocomplete">
              <Box
                sx={{
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: 360,
                }}
              >
                <AutocompleteField
                  filterSelectedOptions
                  fullWidth
                  label="Single Value"
                  options={["Javascript", "Webflow"]}
                  sx={{ mb: 2 }}
                />
                <AutocompleteField
                  filterSelectedOptions
                  fullWidth
                  label="Multivalue"
                  multiple
                  options={["Javascript", "Webflow"]}
                />
              </Box>
            </DemoPreview>
            <DemoPreview title="Checkbox button">
              <Typography color="textPrimary"
sx={{ mb: 2 }}
variant="subtitle2">
                Radio button
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Checkbox defaultChecked />
                <Typography color="textPrimary"
variant="body2">
                  Email
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Checkbox />
                <Typography color="textPrimary"
variant="body2">
                  Push
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Checkbox />
                <Typography color="textPrimary"
variant="body2">
                  SMS
                </Typography>
              </Box>
            </DemoPreview>
            <DemoPreview title="Notifications">
              <Typography color="textPrimary"
sx={{ mb: 2 }}
variant="subtitle2">
                Notifications
              </Typography>
              <RadioGroup defaultValue="email">
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Radio value="email" />
                  <Typography color="textPrimary"
variant="body2">
                    Email
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Radio value="push" />
                  <Typography color="textPrimary"
variant="body2">
                    Push
                  </Typography>
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Radio value="sms" />
                  <Typography color="textPrimary"
variant="body2">
                    SMS
                  </Typography>
                </Box>
              </RadioGroup>
            </DemoPreview>
            <DemoPreview title="Switch button">
              <Typography color="textPrimary"
sx={{ mb: 2 }}
variant="subtitle2">
                Notifications
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Switch defaultChecked />
                <Typography color="textPrimary"
variant="body2">
                  Email
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Switch />
                <Typography color="textPrimary"
variant="body2">
                  Push
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Switch />
                <Typography color="textPrimary"
variant="body2">
                  SMS
                </Typography>
              </Box>
            </DemoPreview>
          </Box>
        </Container>
      </Box>
    </>
  );
};

FoundationInputs.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default FoundationInputs;
