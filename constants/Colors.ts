import { neutralizeColor } from '@/utils/neutralize-color';

const emerald100 = '#d1fae5';
const emerald200 = '#a7f3d0';
const emerald300 = '#6ee7b7';
const emerald400 = '#34d399';
const emerald500 = '#10b981';

export default {
  light: {
    text: '#09090b',
    background: '#fff',
    emerald100: emerald100,
    emerald200: emerald200,
    emerald300: emerald300,
    emerald400: emerald400,
    emerald500: emerald500,
    tabIconDefault: '#ccc',
    tabIconSelected: emerald500,
    inputPlaceholderColor: '#9ca3af',
    inputBorderColor: '#d1d5db',
    dropdownSelected: '#f9fafb',
    dropdownBackground: '#f3f4f6',
    subtleGrayBackground: '#f3f4f6',
  },
  dark: {
    text: '#fff',
    background: neutralizeColor('#18181b'),
    emerald100: neutralizeColor(emerald100),
    emerald200: neutralizeColor(emerald200),
    emerald300: neutralizeColor(emerald300),
    emerald400: neutralizeColor(emerald400),
    emerald500: neutralizeColor(emerald500),
    tabIconDefault: neutralizeColor('rgb(229, 229, 231)'),
    tabIconSelected: neutralizeColor(emerald400),
    inputPlaceholderColor: neutralizeColor('#9ca3af'),
    inputBorderColor: neutralizeColor('#3f3f46'),
    dropdownSelected: neutralizeColor('#3f3f46'),
    dropdownBackground: neutralizeColor('#27272a'),
    subtleGrayBackground: neutralizeColor('#f3f4f6'),
  },
};
