export const convertToBool = power => {
  return power === 'on' ? true : false;
};

export function numberToColour(number) {
  const r = (number & 0xff0000) >> 16;
  const g = (number & 0x00ff00) >> 8;
  const b = number & 0x0000ff;

  return { r: r, g: g, b: b };
}

export function colourToNumber(r, g, b) {
  return (r << 16) + (g << 8) + b;
}
