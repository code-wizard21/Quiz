import NextLink from "next/link";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { downloadTheApp } from "../../utils/app";

export const Hero = () => (
  <Box
    sx={{
      pt: 8,
    }}
    style={{
      backgroundImage: "url(static/home_bg.png)",
    }}
  >
    <Container maxWidth="md">
      <Typography align="center" color="textPrimary" variant="h1" fontWeight={700}>
        Got Moxie? Need Moxie?
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        sx={{
          color: "#576570",
          fontSize: 24,
          mb: 5,
          mt: 2,
          fontWeight: 400,
          lineHeight: 1.4,
          "@media (max-width:767px)": {
            display: "none",
          },
        }}
      >
        Facere natus mollitia ut voluptates velit nisi nemo ab. Repellat blanditiis nemo rem autem iste eligendi. Labore ea et commodi provident nihil doloribus. Sunt id mollitia corrupti.
      </Typography>
      <Typography
        align="center"
        color="textSecondary"
        sx={{
          color: "#576570",
          fontSize: 24,
          mb: 5,
          mt: 2,
          fontWeight: 400,
          lineHeight: 1.4,
          display: "none",
          "@media (max-width:767px)": {
            display: "flex",
          },
        }}
      >
        Odio vitae dolore sapiente. Doloremque iusto reprehenderit. Rem eum numquam cum minus. Repellendus aperiam esse consectetur eaque. Earum molestiae delectus aliquam sequi corporis. Consequatur voluptas nam necessitatibus itaque dolorem voluptatem recusandae nostrum.
      </Typography>
      <Grid container justifyContent="center" spacing={2} sx={{ mb: 6 }} wrap="wrap">
        <Grid item>
          <Button
            color="primary"
            onClick={downloadTheApp}
            size="large"
            variant="contained"
            style={{
              color: "#fff",
              backgroundColor: "#000",
              borderRadius: 20,
              padding: "10px 20px",
              fontWeight: 600,
            }}
          >
            Download the App
          </Button>
        </Grid>
      </Grid>
    </Container>
    {/* <Grid
      container
      sx={{
        display: "flex",
        "@media (max-width:1200px)": {
          padding: "0 20px",
        },
        "@media (max-width:767px)": {
          display: "none",
        },
      }}
    >
      <Grid item sm={0} md={0} lg={1} />
      <Grid item sm={3} md={3} lg={3}>
        <Grid
          container
          spacing={2}
          style={{
            marginTop: 20,
          }}
        >
          <Grid item xs={12}>
            <Typography
              align="right"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 24,
                mb: 3,
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1
                }
              }}
            >
              <b>Connect with other Lobang Kings & Queens</b>
            </Typography>
            <Typography
              align="right"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                color: "#576570",
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1
                }
              }}
            >
              We are what happens when all the lobang kings & queens come together to pool their
              lobangs to get help instantly.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="right"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 24,
                mb: 3,
                mt: 2,
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1,
                  mt: 1
                }
              }}
            >
              <b>Get help for yourself or your network instantly.</b>
            </Typography>
            <Typography
              align="right"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                color: "#576570",
                lineHeight: 1.4,
              }}
            >
              Check them out with verified reviews. Build your network and influence for the world
              to see. <br />
              <br /> Collect verified reviews about your services (Coming soon) <br />
              <br /> Boost you reputation as a Lobang King or Queen.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={6} md={6} lg={4}>
        <Image
          src="/static/home_phone.png"
          alt="hero"
          layout="responsive"
          width={500}
          height={1000}
        />
      </Grid>
      <Grid item sm={3} md={3} lg={3}>
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: '150px',
            '@media (max-width:1200px)': {
              marginTop: '100px !important'
            },
            '@media (max-width:991px)': {
              marginTop: '0px !important'
            }
          }}
        >
          <Grid item xs={12}>
            <Typography
              align="left"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 24,
                mb: 3,
                mt: 2,
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1,
                  marginTop: '20px !important'
                }
              }}
            >
              <b>Never let a Lobang get away anymore.</b>
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                color: "#576570",
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1
                }
              }}
            >
              Know someone who needs a lobang to make their day? Want to buy something at the best
              possible rate? Looking for a service provider who has a reliable track record? <br />{" "}
              <br /> <b> We got you covered!</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="left"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 24,
                mb: 3,
                mt: 2,
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1,
                  mt: 1
                }
              }}
            >
              <b>A spam free community that shares Lobangs with verified profiles</b>
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                color: "#576570",
                lineHeight: 1.4,
                '@media (max-width:991px)': {
                  mb: 1
                }
              }}
            >
              Who knows, you might be the next Lobang King we are looking for!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={0} md={0} lg={1}/>
    </Grid>
    <Grid
      container
      sx={{
        display: "none",
        "@media (max-width:767px)": {
          display: "flex",
        },
      }}
    >
      <Grid xs={0} sm={2}/>
      <Grid
        item
        xs={8}
        sm={8}
        sx={{
          "@media (max-width:767px)": {
            padding: 2,
          },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            "@media (max-width:767px)": {
              marginTop: 0,
            },
          }}
        >
          <Grid item xs={12}>
            <Typography
              align="right"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 22,
                mb: 1,
                lineHeight: 1.5,
              }}
            >
              <b>Connect with other Lobang Kings & Queens</b>
            </Typography>
            <Typography
              align="right"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                lineHeight: 1.5,
                color: "#576570",
              }}
            >
              We are what happens when all the lobang kings & queens come together to pool their
              lobangs to get help instantly.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="right"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 22,
                mb: 1,
                mt: 2,
                lineHeight: 1.5,
              }}
            >
              <b>Get help for yourself or your network instantly.</b>
            </Typography>
            <Typography
              align="right"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                lineHeight: 1.5,
                color: "#576570",
              }}
            >
              Check them out with verified reviews. Build your network and influence for the world
              to see. Collect verified reviews about your services (Coming soon) <br /> <br /> Boost
              you reputation as a Lobang King or Queen.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} sm={2}>
        <div
          style={{
            position: "relative",
            width: "auto",
            height: "100%",
          }}
        >
          <Image src="/static/mobile_hero_1.png" alt="hero" layout="fill" />
        </div>
      </Grid>
    </Grid>
    <Grid
      container
      sx={{
        mt: 2,
        display: "none",
        "@media (max-width:767px)": {
          display: "flex",
        },
      }}
    >
      <Grid item xs={4}sm={2} >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image src="/static/mobile_hero_2.png" alt="hero" layout="fill" />
        </div>
      </Grid>
      <Grid item xs={8} sm={8}>
        <Grid
          container
          spacing={2}
          sx={{
            "@media (max-width:767px)": {
              padding: 2,
            },
          }}
        >
          <Grid item xs={12}>
            <Typography
              align="left"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 22,
                mb: 1,
                mt: 2,
                lineHeight: 1.5,
              }}
            >
              <b>Never let a Lobang get away anymore.</b>
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                lineHeight: 1.5,
                color: "#576570",
              }}
            >
              Know someone who needs a lobang to make their day? Want to buy something at the best
              possible rate? Looking for a service provider who has a reliable track record? <br />{" "}
              <br /> <b> We got you covered! </b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="left"
              color="textPrimary"
              fontWeight={700}
              sx={{
                fontSize: 22,
                mb: 1,
                mt: 2,
                lineHeight: 1.5,
              }}
            >
              <b>A spam free community that shares Lobangs with verified profiles</b>
            </Typography>
            <Typography
              align="left"
              color="textSecondary"
              fontWeight={400}
              sx={{
                fontSize: 20,
                mb: 3,
                lineHeight: 1.5,
                color: "#576570",
              }}
            >
              Who knows, you might be the next Lobang King we are looking for!
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={0} sm={2}/>
    </Grid> */}
  </Box>
);
