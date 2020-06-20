export const onChange = (devices, newDevice) => {
  const index = devices.findIndex(e => e.host == newDevice.host);
  //bug in api, sometimes get f.eg: 12.5 instead of 125
  if (newDevice.rgb.r % 1 != 0) {
    newDevice.rgb = {
      r: newDevice.rgb.r * 10 * 2,
      g: newDevice.rgb.g * 10 * 2,
      b: newDevice.rgb.b * 10 * 2,
    };
  }
  let newState = [...devices];
  newState[index] = newDevice;
  return newState;
};
