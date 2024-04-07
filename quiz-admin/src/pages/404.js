import NextLink from "next/link";
import Head from "next/head";
import { Box, Button, Container, Typography } from "@mui/material";
import { EmojiSadOutlined as EmojiSadIcon } from "../icons/emoji-sad-outlined";

const NotFound = () => (
  <>
    <Head>
      <title>Error: Not Found | Material Kit Pro</title>
    </Head>
    <Box
      sx={{
        backgroundColor: "background.paper",
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: 5,
          py: 14,
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EmojiSadIcon sx={{ color: "text.secondary" }} />
        <Typography align="center"
color="textPrimary"
sx={{ my: 2 }}
variant="h3">
          Nothing here!
        </Typography>
        <Typography align="center"
color="textSecondary"
variant="body2">
          The page requested does not exist.
        </Typography>
        <NextLink href="/"
passHref>
          <Button color="primary"
component="a"
sx={{ mt: 2 }}
variant="text">
            Take me home
          </Button>
        </NextLink>
      </Container>
    </Box>
  </>
);

export default NotFound;
