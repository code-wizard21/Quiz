import { createTheme as createMuiTheme } from "@mui/material/styles";
import { XCircle as XCircleIcon } from "../icons/x-circle";

const { breakpoints } = createMuiTheme();

export const baseThemeOptions = {
  breakpoints,
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          fontSize: 14,
          letterSpacing: 0.15,
          lineHeight: 1.6,
        },
        option: {
          fontSize: 14,
          letterSpacing: 0.15,
          lineHeight: 1.6,
        },
        paper: {
          boxShadow: "none",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
        sizeLarge: {
          fontSize: 15,
        },
        sizeMedium: {
          fontSize: 14,
        },
        sizeSmall: {
          fontSize: 13,
        },
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingBottom: 20,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 20,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: 16,
          paddingLeft: 24,
          paddingRight: 24,
          paddingTop: 16,
        },
        subheader: {
          fontSize: 14,
        },
        title: {
          fontSize: 16,
        },
      },
    },
    MuiChip: {
      defaultProps: {
        deleteIcon: <XCircleIcon />,
      },
      styleOverrides: {
        avatar: {
          borderRadius: 6,
        },
        root: {
          borderRadius: 6,
          fontWeight: 400,
          letterSpacing: 0,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
        "#nprogress": {
          pointerEvents: "none",
        },
        "#nprogress .bar": {
          backgroundColor: "#5048E5",
          height: 3,
          left: 0,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 2000,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingBottom: 32,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 24,
          "&>:not(:first-of-type)": {
            marginLeft: 16,
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingBottom: 8,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 8,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 24,
          fontWeight: 600,
          paddingBottom: 24,
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 32,
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 14,
          letterSpacing: 0.15,
          lineHeight: 1.43,
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        fontSizeLarge: {
          fontSize: 32,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: 8,
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        button: {
          "&:before": {
            borderRadius: "0px 2px 2px 0px",
            bottom: 0,
            content: '""',
            left: 0,
            position: "absolute",
            top: 0,
            transform: "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 0.25s",
            width: 2,
          },
          "&:active:before": {
            transform: "scaleX(1)",
          },
        },
        dense: {
          paddingBottom: 6,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 6,
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          variant: "body2",
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: 0.15,
          lineHeight: 1.43,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          transition: "color 250ms",
          ":hover, &.Mui-checked:hover": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        filled: {
          "&:focus": {
            backgroundColor: "transparent",
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          fontSize: 32,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          borderRadius: 48,
          height: 24,
          marginBottom: 8,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 8,
          padding: 0,
          width: 44,
        },
        switchBase: {
          padding: 4,
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-checked+.MuiSwitch-track": {
            opacity: 1,
          },
          "&.Mui-disabled": {
            "&+.MuiSwitch-track": {
              opacity: 1,
            },
          },
          "&.Mui-checked.Mui-disabled+.MuiSwitch-track": {
            opacity: 0.5,
          },
        },
        track: {
          opacity: 1,
        },
        thumb: {
          height: 16,
          width: 16,
        },
      },
    },
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 400,
          letterSpacing: 0.15,
          lineHeight: 1.71,
          [breakpoints.up("sm")]: {
            marginLeft: 16,
            marginRight: 16,
            minWidth: "fit-content",
            paddingLeft: 0,
            paddingRight: 0,
            "&:first-of-type": {
              marginLeft: 0,
            },
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          ".MuiTableCell-root": {
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          ":last-of-type .MuiTableCell-root": {
            borderWidth: 0,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "SF Pro Display, sans-serif",
    h1: {
      fontSize: 48,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 36,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {},
    body2: {
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0,
      lineHeight: 1.75,
    },
    caption: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
    overline: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 1,
      lineHeight: 2.46,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
  },
};
