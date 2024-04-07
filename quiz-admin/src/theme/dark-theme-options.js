import { alpha } from "@mui/material/styles";

// Colors

export const neutral = {
  50: "#000000",
  100: "#D8DADE",
  200: "#BDBFC7",
  300: "#A1A4AF",
  400: "#868998",
  500: "#6C6F7F",
  600: "#545863",
  700: "#40444F",
  800: "#2B2F3C",
  900: "#1E212A",
};

const background = {
  default: "#171A21",
  paper: neutral["900"],
};

const divider = neutral["800"];

const primary = {
  contrast: "#FFFFFF",
  dark: "#7F56D9",
  light: "#D6BBFB",
  main: "#B692F6",
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
  dark: "#2F6B39",
  light: "#5FC16D",
  main: "#38B249",
};

const error = {
  contrast: "#FFFFFF",
  dark: "#85372B",
  light: "#EB6D57",
  main: "#E6492D",
};

const warning = {
  contrast: "#FFFFFF",
  dark: "#8D682D",
  light: "#F7BB57",
  main: "#F6AB2E",
};

const info = {
  contrast: "#FFFFFF",
  dark: "#1D4580",
  light: "#4483DF",
  main: "#1664D8",
};

const text = {
  primary: "#E1E3EA",
  secondary: "#97A1BA",
  disabled: "rgba(255, 255, 255, 0.38)",
};

export const darkThemeOptions = {
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: neutral["400"],
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral["800"],
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: text.secondary,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        avatar: {
          color: neutral["300"],
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
          border: `1px solid ${neutral["700"]}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
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
          backgroundColor: neutral["900"],
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
              backgroundColor: alpha(text.secondary, 0.86),
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
          borderBottom: `1px solid ${neutral["800"]}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral["900"],
          borderBottom: `1px solid ${neutral["800"]}`,
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
            backgroundColor: neutral["900"],
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderColor: neutral["700"],
          "& .MuiSvgIcon-root": {
            color: alpha(text.primary, 0.38),
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: alpha(text.secondary, 0.86),
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
    mode: "dark",
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 3px -2px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 1px 8px 0px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
  ],
};
