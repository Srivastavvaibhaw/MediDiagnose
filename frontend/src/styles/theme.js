// src/styles/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom color palette
const palette = {
  primary: {
    main: '#4361ee',
    light: '#738eef',
    dark: '#2c49c7',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#3f8efc',
    light: '#6ba8fd',
    dark: '#2b63b1',
    contrastText: '#ffffff',
  },
  accent: {
    main: '#00b4d8',
    light: '#33c3e0',
    dark: '#007d97',
    contrastText: '#ffffff',
  },
  success: {
    main: '#10b981',
    light: '#3fc79a',
    dark: '#0b815a',
    contrastText: '#ffffff',
  },
  warning: {
    main: '#f59e0b',
    light: '#f7b139',
    dark: '#ab6e07',
    contrastText: '#ffffff',
  },
  error: {
    main: '#ef4444',
    light: '#f26969',
    dark: '#a72f2f',
    contrastText: '#ffffff',
  },
  info: {
    main: '#3b82f6',
    light: '#629ef7',
    dark: '#295bac',
    contrastText: '#ffffff',
  },
  text: {
    primary: '#1e293b',
    secondary: '#475569',
    disabled: '#94a3b8',
  },
  background: {
    default: '#f8fafc',
    paper: '#ffffff',
    light: '#f1f5f9',
  },
  divider: 'rgba(0, 0, 0, 0.08)',
};

// Define custom typography settings
const typography = {
  fontFamily: [
    'Poppins',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ].join(','),
  h1: {
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.3,
    letterSpacing: '0em',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.3,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
    letterSpacing: '0.01071em',
  },
  button: {
    fontSize: '0.95rem',
    fontWeight: 500,
    letterSpacing: '0.02857em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase',
  },
};

// Define custom shape settings
const shape = {
  borderRadius: 10,
};

// Define custom shadows
const shadows = [
  'none',
  '0 2px 4px rgba(0, 0, 0, 0.05)',
  '0 4px 6px rgba(0, 0, 0, 0.05)',
  '0 6px 8px rgba(0, 0, 0, 0.05)',
  '0 8px 10px rgba(0, 0, 0, 0.05)',
  '0 10px 15px rgba(0, 0, 0, 0.05)',
  '0 12px 20px rgba(0, 0, 0, 0.05)',
  '0 14px 25px rgba(0, 0, 0, 0.05)',
  '0 16px 30px rgba(0, 0, 0, 0.05)',
  '0 18px 35px rgba(0, 0, 0, 0.05)',
  '0 20px 40px rgba(0, 0, 0, 0.05)',
  '0 22px 45px rgba(0, 0, 0, 0.05)',
  '0 24px 50px rgba(0, 0, 0, 0.05)',
  '0 26px 55px rgba(0, 0, 0, 0.05)',
  '0 28px 60px rgba(0, 0, 0, 0.05)',
  '0 30px 65px rgba(0, 0, 0, 0.05)',
  '0 32px 70px rgba(0, 0, 0, 0.05)',
  '0 34px 75px rgba(0, 0, 0, 0.05)',
  '0 36px 80px rgba(0, 0, 0, 0.05)',
  '0 38px 85px rgba(0, 0, 0, 0.05)',
  '0 40px 90px rgba(0, 0, 0, 0.05)',
  '0 42px 95px rgba(0, 0, 0, 0.05)',
  '0 44px 100px rgba(0, 0, 0, 0.05)',
  '0 46px 105px rgba(0, 0, 0, 0.05)',
  '0 48px 110px rgba(0, 0, 0, 0.05)',
];

// Create the theme
const theme = createTheme({
  palette,
  typography,
  shape,
  shadows,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          padding: '0.6rem 1.5rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          boxShadow: '0 4px 10px rgba(67, 97, 238, 0.2)',
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)',
        },
        elevation3: {
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s ease',
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(67, 97, 238, 0.1)',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 6,
          backgroundColor: '#1e293b',
          padding: '8px 12px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: palette.primary.main,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: palette.primary.main,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: palette.primary.main,
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          border: `1px solid ${palette.text.disabled}`,
          backgroundColor: palette.background.default,
          opacity: 1,
        },
      },
    },
  },
});

export default theme;
