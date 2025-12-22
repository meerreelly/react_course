import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#3B82F6',
            light: '#60A5FA',
            dark: '#2563EB',
            contrastText: '#fff',
          },
          secondary: {
            main: '#6366F1',
            light: '#818CF8',
            dark: '#4F46E5',
            contrastText: '#fff',
          },
          background: {
            default: '#F0F7FF',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1E293B',
            secondary: '#64748B',
          },
          divider: '#E2E8F0',
          success: {
            main: '#10B981',
            light: '#34D399',
            dark: '#059669',
          },
          warning: {
            main: '#F59E0B',
            light: '#FBBF24',
            dark: '#D97706',
          },
          error: {
            main: '#EF4444',
            light: '#F87171',
            dark: '#DC2626',
          },
          info: {
            main: '#0EA5E9',
            light: '#38BDF8',
            dark: '#0284C7',
          },
        }
      : {
          primary: {
            main: '#60A5FA',
            light: '#93C5FD',
            dark: '#3B82F6',
            contrastText: '#0F172A',
          },
          secondary: {
            main: '#818CF8',
            light: '#A5B4FC',
            dark: '#6366F1',
            contrastText: '#0F172A',
          },
          background: {
            default: '#0F172A',
            paper: '#1E293B',
          },
          text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
          },
          divider: '#334155',
          success: {
            main: '#34D399',
            light: '#6EE7B7',
            dark: '#10B981',
          },
          warning: {
            main: '#FBBF24',
            light: '#FCD34D',
            dark: '#F59E0B',
          },
          error: {
            main: '#F87171',
            light: '#FCA5A5',
            dark: '#EF4444',
          },
          info: {
            main: '#38BDF8',
            light: '#7DD3FC',
            dark: '#0EA5E9',
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 10,
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            transition: 'transform 0.2s ease-in-out',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light'
            ? '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)'
            : '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
          border: mode === 'light' ? '1px solid #E2E8F0' : '1px solid #334155',
          backgroundImage: 'none',
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
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: mode === 'light'
            ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)'
            : '0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -1px rgba(0,0,0,0.3)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

export default createAppTheme('light');
