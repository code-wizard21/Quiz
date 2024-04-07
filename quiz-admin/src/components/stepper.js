import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem } from "@mui/lab";
import { Check as CheckIcon } from "../icons/check";

const mapSteps = (steps, currentStep) =>
  steps.map((item, index) => {
    if (currentStep > index) {
      return { ...item, value: "complete" };
    }

    if (currentStep === index) {
      return { ...item, value: "active" };
    }

    return { ...item, value: "inactive" };
  });

const getDotStyles = (value) => {
  if (value === "complete") {
    return {
      backgroundColor: "primary.main",
      borderColor: "primary.main",
    };
  }

  if (value === "active") {
    return {
      borderColor: "primary.main",
      color: "primary.main",
    };
  }

  return {
    backgroundColor: "inherit",
    borderColor: (theme) => (theme.palette.mode == "light" ? "neutral.300" : "neutral.700"),
    color: "text.secondary",
  };
};

const getTextColor = (value) => {
  if (value === "complete") {
    return {
      title: "textPrimary",
      content: "textSecondary",
    };
  }

  if (value === "active") {
    return {
      title: "primary.main",
      content: "textSecondary",
    };
  }

  return {
    title: "text.disabled",
    content: "text.disabled",
  };
};

export const Stepper = (props) => {
  const { steps, currentStep, orientation } = props;
  const mappedSteps = mapSteps(steps, currentStep);

  return (
    <Timeline
      sx={{
        flexDirection: orientation === "vertical" ? "column" : "row",
        flexGrow: "inherit",
        overflow: "scroll",
        my: 0,
        p: 0,
      }}
    >
      {mappedSteps.map((item, index) => (
        <Box
          key={item.title}
          sx={{
            display: "flex",
            flex: 1,
            flexDirection: orientation === "vertical" ? "column" : "row",
            alignItems: orientation === "vertical" ? "inherit" : "center",
          }}
        >
          <TimelineItem
            sx={{
              alignItems: "center",
              minHeight: "auto",
              "&::before": {
                display: "none",
              },
            }}
          >
            <TimelineDot
              sx={{
                ...getDotStyles(item.value),
                alignItems: "center",
                alignSelf: "center",
                boxShadow: "none",
                display: "flex",
                flexShrink: 0,
                height: 36,
                justifyContent: "center",
                m: 0,
                width: 36,
              }}
              variant={item.value === "complete" ? "filled" : "outlined"}
            >
              {item.value === "active" ? (
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    borderRadius: "50%",
                    height: 12,
                    width: 12,
                  }}
                />
              ) : (
                item.value === "complete" && <CheckIcon />
              )}
            </TimelineDot>
            <TimelineContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                pr: 1,
              }}
            >
              <Typography color={getTextColor(item.value).title}
noWrap
variant="overline">
                {item.title}
              </Typography>
              <Typography color={getTextColor(item.value).content}
noWrap
variant="body2">
                {item.content}
              </Typography>
            </TimelineContent>
          </TimelineItem>
          {mappedSteps.length > index + 1 && (
            <TimelineConnector
              sx={{
                backgroundColor:
                  item.value === "complete"
                    ? "primary.main"
                    : (theme) => (theme.palette.mode == "light" ? "neutral.200" : "neutral.800"),
                height: orientation === "vertical" ? 22 : 2,
                width: orientation === "vertical" ? 2 : 22,
                my: orientation === "vertical" ? 1 : "inherit",
                ml: orientation === "vertical" ? 2.25 : 0,
                mr: orientation === "vertical" ? 0 : 1,
              }}
            />
          )}
        </Box>
      ))}
    </Timeline>
  );
};

Stepper.defaultProps = {
  orientation: "vertical",
};

Stepper.propTypes = {
  currentStep: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  steps: PropTypes.array.isRequired,
};
