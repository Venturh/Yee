export const togglePower = (bulb, power) => {
  const value = power === true ? 'off' : 'on';
  bulb.sendCommand({
    id: -1,
    method: 'set_power',
    params: [value, 'smooth', 300],
  });
  return !power;
};
