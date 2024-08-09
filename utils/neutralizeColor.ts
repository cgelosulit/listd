import tinycolor from 'tinycolor2';

export function neutralizeColor(color: string) {
  const hslColor = tinycolor(color).toHsl();
  const desaturatedColor = tinycolor({
    h: hslColor.h,
    s: hslColor.s * 0.5,
    l: hslColor.l * 0.8,
  }).toHexString();

  return desaturatedColor;
}
