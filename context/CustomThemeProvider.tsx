import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as SystemUI from 'expo-system-ui';
import { useColorScheme } from '@/hooks/useColorScheme';
import { storage } from '@/utils/mmkv-store';

type ColorScheme = 'light' | 'dark';

interface CustomThemeProviderProps {}

interface MmkvStorageColorScheme {
  theme: ColorScheme;
  system: boolean;
}

const CustomThemeProviderContext = createContext<{
  theme: ColorScheme;
  setTheme: React.Dispatch<React.SetStateAction<ColorScheme>>;
}>({
  theme: 'light',
  setTheme: () => {},
});

const setAsyncStorageColorScheme = (
  colorScheme: ColorScheme,
  system: boolean,
) => {
  const value = { theme: colorScheme, system };
  storage.set('colorScheme', JSON.stringify(value));
};

const getMmkvStorageColorScheme = () => {
  const defaultColorScheme = {
    theme: 'light',
    system: false,
  };
  const value = storage.getString('colorScheme');
  if (value) {
    return JSON.parse(value) as MmkvStorageColorScheme;
  }
  return defaultColorScheme;
};

const CustomThemeProvider: React.FC<
  PropsWithChildren<CustomThemeProviderProps>
> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [currentTheme, setTheme] = useState<ColorScheme>('light');

  const colorForAndroid = useMemo(
    async () => await SystemUI.getBackgroundColorAsync(),
    [],
  );

  useEffect(() => {
    colorForAndroid.then((c) => console.log(c));
    const mmkvStore = getMmkvStorageColorScheme();
    if (mmkvStore && mmkvStore.theme !== currentTheme) {
      if (mmkvStore.system) {
        setTheme(colorScheme);
      } else {
        setTheme(mmkvStore.theme as ColorScheme);
      }
    }
  }, []);

  useEffect(() => {
    setAsyncStorageColorScheme(currentTheme, false);
  }, [currentTheme]);

  return (
    <CustomThemeProviderContext.Provider
      value={{ theme: currentTheme, setTheme }}
    >
      {children}
    </CustomThemeProviderContext.Provider>
  );
};

const useCustomTheme = () => {
  const context = useContext(CustomThemeProviderContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};

export { CustomThemeProvider, useCustomTheme };
