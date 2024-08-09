import { neutralizeColor } from '@/utils/neutralizeColor';

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#09090b',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: neutralizeColor('rgb(229, 229, 231)'),
    background: neutralizeColor('#18181b'),
    tint: neutralizeColor(tintColorDark),
    tabIconDefault: neutralizeColor('rgb(229, 229, 231)'),
    tabIconSelected: neutralizeColor(tintColorDark),
  },
};
