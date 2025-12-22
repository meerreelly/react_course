import { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '../../styles/theme';
import { useThemeStore } from '../../state/themeStore';
import { ToastContainer } from '../common';

interface ThemedAppProps {
  children: React.ReactNode;
}

export const ThemedApp = ({ children }: ThemedAppProps) => {
  const { mode } = useThemeStore();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
};
