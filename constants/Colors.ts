import { neutralizeColor } from '@/utils/neutralizeColor';

const tintColorLight = '#10b981';
const tintColorDark = '#34d399';

export default {
  light: {
    text: '#09090b',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    inputPlaceholderColor: '#9ca3af',
    inputBorderColor: '#d1d5db',
    dropdownSelected: '#f9fafb',
    dropdownBackground: '#f3f4f6',
    subtleGrayBackground: '#f3f4f6',
  },
  dark: {
    text: '#fff',
    background: neutralizeColor('#18181b'),
    tint: neutralizeColor(tintColorDark),
    tabIconDefault: neutralizeColor('rgb(229, 229, 231)'),
    tabIconSelected: neutralizeColor(tintColorDark),
    inputPlaceholderColor: neutralizeColor('#9ca3af'),
    inputBorderColor: neutralizeColor('#3f3f46'),
    dropdownSelected: neutralizeColor('#3f3f46'),
    dropdownBackground: neutralizeColor('#27272a'),
    subtleGrayBackground: neutralizeColor('#f3f4f6'),
  },
};
