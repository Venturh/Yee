export const togglePower = (bulb, currentPower) => {
  const power = currentPower === 'on' ? 'off' : 'on';
  bulb.sendCommand({
    id: -1,
    method: 'set_power',
    params: [power, 'smooth', 300],
  });
  return power === 'on' ? 'off' : 'on';
};

export const changeBrightness = (bulb, brightness) => {
  bulb.sendCommand({
    id: -1,
    method: 'set_bright',
    params: [parseInt(brightness), 'smooth', 300],
  });
};

//On Listeners

export const onChange = (devices, yeelight, newProps, toChange) => {
  console.log('newpropsservice', newProps, toChange);
  const index = devices.findIndex(
    e => e.bulb.device.host == yeelight.device.host
  );
  let newState = [...devices];
  newState[index] = {
    ...newState[index],
    params: {
      ...newState[index].params,
      [toChange]: newProps.params[toChange],
    },
  };
  return newState;
};
