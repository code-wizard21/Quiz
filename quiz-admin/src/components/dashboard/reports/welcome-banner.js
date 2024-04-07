import NextLink from "next/link";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const WelcomeBanner = () => (
  <Box
    sx={{
      backgroundColor: "neutral.900",
      borderRadius: 1,
      display: "flex",
      justifyContent: "space-between",
      overflow: "hidden",
      p: 4,
      height: "100%",
    }}
  >
    <div>
      <Typography color="#FFFFFF"
variant="h4">
        Welcome, Chen!
      </Typography>
      <Typography color="#FFFFFF"
sx={{ mt: 2 }}
variant="body1">
        Let’s complete your account information so we can gather more accurate data for you.
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          my: 3,
        }}
      >
        <Typography color="#FFFFFF"
variant="subtitle2">
          2/10
        </Typography>
        <LinearProgress
          sx={{
            borderRadius: 1,
            flexGrow: 1,
            height: "8px",
            ml: 2,
          }}
          value={20}
          variant="determinate"
        />
      </Box>
      <NextLink href="/dashboard/account"
passHref>
        <Button component="a"
variant="contained"
endIcon={<ArrowForwardIcon />}>
          Go to account
        </Button>
      </NextLink>
    </div>
    <Box
      sx={{
        display: {
          lg: "block",
          xs: "none",
        },
        pl: 3,
      }}
    >
      <img src="/static/welcome-banner.svg"
alt="welcome banner" />
    </Box>
  </Box>
);
