import PropTypes from "prop-types";
import NextLink from "next/link";
import { Avatar, Box, Button, Card, CardActions, Divider, Typography } from "@mui/material";
import { ArrowRight as ArrowRightIcon } from "../../../icons/arrow-right";

export const SummaryItem = (props) => {
  const { color, content, icon: Icon, iconColor, label, linkHref, linkLabel, ...other } = props;

  return (
    <Card sx={{ height: "100%" }}
{...other}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          p: 2,
        }}
      >
        {Icon && (
          <Box
            sx={{
              display: "flex",
              mr: 2,
            }}
          >
            <Avatar
              sx={{
                backgroundColor: `${color}`,
                height: 56,
                width: 56,
              }}
            >
              <Icon sx={{ color: "primary.contrastText" }} />
            </Avatar>
          </Box>
        )}
        <div>
          <Typography color="textSecondary"
variant="overline">
            {label}
          </Typography>
          <Typography color="textPrimary"
variant="h6">
            {content}
          </Typography>
        </div>
      </Box>
      {/* <Divider />
      <CardActions
        sx={{
          backgroundColor: (theme) => theme.palette.mode == 'light' ? 'neutral.50' : 'neutral.900',
          px: 3,
          py: 1
        }}
      >
        <NextLink
          href={linkHref}
          passHref
        >
          <Button
            color="primary"
            component="a"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            {linkLabel}
          </Button>
        </NextLink>
      </CardActions> */}
    </Card>
  );
};

SummaryItem.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
};
