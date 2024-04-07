import { alpha } from "@mui/material/styles";

// Colors

const neutral = {
  50: "#F9FAFB",
  100: "#F2F4F7",
  200: "#EAECF0",
  300: "#D0D5DD",
  400: "#98A2B3",
  500: "#667085",
  600: "#475467",
  700: "#344054",
  800: "#1D2939",
  900: "#101828",
};

const background = {
  default: "#FFFFFF",
  paper: "#FFFFFF",
};

const divider = neutral["200"];

const primary = {
  contrast: "#FFFFFF",
  dark: "#6941C6",
  light: "#9B8AFB",
  main: "#7A5AF8",
  50: "#F9F5FF",
  100: "#F4EBFF",
  200: "#E9D7FE",
  300: "#D6BBFB",
  400: "#B692F6",
  500: "#9E77ED",
  600: "#7F56D9",
  700: "#6941C6",
};

const secondary = {
  contrast: "#FFFFFF",
  dark: "#1D2939",
  light: "#667085",
  main: "#344054",
};

const success = {
  contrast: "#FFFFFF",
  dark: "#1B774D",
  light: "#52BB8B",
  main: "#27AB6E",
};

const error = {
  contrast: "#FFFFFF",
  dark: "#A53531",
  light: "#EF6F6B",
  main: "#EC4C47",
};

const warning = {
  contrast: "#FFFFFF",
  dark: "#975B1E",
  light: "#E09B55",
  main: "#D9822B",
};

const info = {
  contrast: "#FFFFFF",
  dark: "#0B4E8D",
  light: "#3F8CD4",
  main: "#1070CA",
};

const text = {
  primary: "#101828",
  secondary: "#344054",
};

export const lightThemeOptions = {
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          border: `1px solid ${divider}`,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral["200"],
          color: text.secondary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          ":focus": {
            boxShadow: `${alpha(primary.main, 0.25)} 0 0 0 0.2rem`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: `1px solid ${divider}`,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: text.secondary,
          ":hover:not(.Mui-checked)": {
            color: text.primary,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        avatar: {
          color: neutral["700"],
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        button: {
          "&:before": {
            backgroundColor: primary.main,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: `1px solid ${neutral["300"]}`,
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        checkedIcon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18"
height="18"
rx="9"
fill="currentColor" />
            <rect x="2"
y="2"
width="14"
height="14"
rx="7"
fill="currentColor" />
            <rect x="5"
y="5"
width="8"
height="8"
rx="4"
fill={background.paper} />
          </svg>
        ),
        icon: (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="18"
height="18"
rx="9"
fill="currentColor" />
            <rect x="2"
y="2"
width="14"
height="14"
rx="7"
fill={background.paper} />
          </svg>
        ),
      },
      styleOverrides: {
        root: {
          color: text.secondary,
          ":hover:not(.Mui-checked)": {
            color: text.primary,
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: neutral["100"],
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          ":focus-within": {
            boxShadow: `${alpha(primary.main, 0.25)} 0 0 0 0.2rem`,
          },
        },
        switchBase: {
          "&.Mui-checked+.MuiSwitch-track": {
            backgroundColor: success.main,
          },
          "&.Mui-disabled": {
            "&+.MuiSwitch-track": {
              backgroundColor: alpha(text.primary, 0.08),
            },
            ".MuiSwitch-thumb": {
              backgroundColor: alpha(text.primary, 0.26),
            },
          },
          "&.Mui-checked.Mui-disabled+.MuiSwitch-track": {
            backgroundColor: success.main,
          },
        },
        track: {
          backgroundColor: neutral["500"],
        },
        thumb: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral["50"],
          borderBottom: `1px solid ${divider}`,
          ".MuiTableCell-root": {
            color: text.secondary,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover:hover": {
            backgroundColor: neutral["50"],
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: divider,
          "& .MuiSvgIcon-root": {
            color: alpha(text.primary, 0.38),
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: "#667085",
      disabled: alpha(text.primary, 0.26),
      disabledBackground: alpha(text.primary, 0.08),
      focus: alpha(text.primary, 0.12),
      hover: alpha(text.primary, 0.06),
      selected: alpha(text.primary, 0.08),
    },
    background,
    divider,
    error,
    info,
    mode: "light",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    "none",
    "0px 1px 2px rgba(31, 41, 55, 0.08)",
    "0px 2px 4px rgba(31, 41, 55, 0.08)",
    "0px 3px 4px rgba(31, 41, 55, 0.08)",
    "0px 4px 5px -2px rgba(31, 41, 55, 0.12)",
    "0px 5px 8px -2px rgba(31, 41, 55, 0.12)",
    "0px 6px 10px -2px rgba(31, 41, 55, 0.12)",
    "0px 7px 10px -3px rgba(31, 41, 55, 0.12)",
    "0px 8px 20px -2px rgba(31, 41, 55, 0.12)",
    "0px 9px 12px -2px rgba(31, 41, 55, 0.12)",
    "0px 10px 14px -2px rgba(31, 41, 55, 0.12)",
    "0px 11px 15px -2px rgba(31, 41, 55, 0.12)",
    "0px 12px 17px -2px rgba(31, 41, 55, 0.12)",
    "0px 13px 19px -4px rgba(31, 41, 55, 0.12)",
    "0px 14px 21px -4px rgba(31, 41, 55, 0.12)",
    "0px 15px 22px -4px rgba(31, 41, 55, 0.12)",
    "0px 16px 24px -4px rgba(31, 41, 55, 0.12)",
    "0px 17px 26px -4px rgba(31, 41, 55, 0.12)",
    "0px 18px 28px -4px rgba(31, 41, 55, 0.12)",
    "0px 19px 29px -4px rgba(31, 41, 55, 0.12)",
    "0px 20px 31px -6px rgba(31, 41, 55, 0.12)",
    "0px 21px 33px -6px rgba(31, 41, 55, 0.12)",
    "0px 22px 35px -6px rgba(31, 41, 55, 0.12)",
    "0px 23px 36px -8px rgba(31, 41, 55, 0.12)",
    "0px 24px 46px -8px rgba(31, 41, 55, 0.12)",
  ],
};
