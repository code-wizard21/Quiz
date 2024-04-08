import { Box, Container, Link, Typography } from "@mui/material";
import NextLink from "next/link";
export const Footer = () => (
  <div>
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: {
          sm: "row",
          xs: "column",
        },
        justifyContent: "center",
        py: 3,
        "& a": {
          mt: {
            sm: 0,
            xs: 1,
          },
          "&:not(:last-child)": {
            mr: {
              sm: 5,
              xs: 0,
            },
          },
        },
      }}
    >
      <Typography align="center" color="textSecondary" variant="caption">
        ©2023 QuizMobb.com pte ltd. All rights reserved. <br />
        <NextLink href="/term-of-use" passHref>
          <a
            style={{
              marginRight: 0,
            }}
          >
            Terms of Use
          </a>
        </NextLink>{" "}
        and{" "}
        <NextLink href="/privacy-policy" passHref>
          Privacy Policy
        </NextLink>
      </Typography>
    </Container>
  </div>
);
