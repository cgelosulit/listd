import { useColorScheme as useRNColorScheme } from 'react-native';

const useColorScheme = () => {
  const colorScheme = useRNColorScheme() as 'light' | 'dark';

  return colorScheme;
};

export { useColorScheme };
