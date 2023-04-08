import { createTheme, Theme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { ThemeComponents } from './MuiComponents';
import themes, { ThemeVariant } from './variants';

const LOCAL_STORAGE_ACCESS_NAME =
  String(import.meta.env.VITE_LOCAL_STORAGE_PREFIX ?? 'officialLkaLike-_') + `_theme`;

const STORED_THEME_NAME = (localStorage.getItem(LOCAL_STORAGE_ACCESS_NAME) ??
  import.meta.env.VITE_APP_DEFAULT_THEME ??
  ('Light' as ThemeVariant)) as ThemeVariant;

export const useTheme = () => {
  const [targetThemeName, setTargetThemeName] = useState<ThemeVariant>(STORED_THEME_NAME);

  const theme = useMemo<Theme>(
    () =>
      createTheme({
        palette: themes[targetThemeName],

        shape: {
          borderRadius: 6,
        },

        zIndex: {
          mobileStepper: 1000,
          fab: 1050,
          speedDial: 1050,
          appBar: 1100,
          drawer: 1200,
          modal: 1300,
          snackbar: 1400,
          tooltip: 1500,
        },

        typography: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: 16,
        },

        components: ThemeComponents,
      }),
    [targetThemeName],
  );

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_NAME, targetThemeName);
  }, [targetThemeName]);

  return {
    theme,
    setTargetThemeName,
    name: targetThemeName,
  };
};
