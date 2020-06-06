import { colourToNumber } from './helper';

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

export const changeRGB = (bulb, { r, g, b }) => {
  bulb.sendCommand({
    id: 1,
    method: 'set_rgb',
    params: [colourToNumber(r, g, b), 'smooth', 300],
  });
};

export const changeName = async (bulb, name) => {
  bulb.sendCommand({
    id: 1,
    method: 'set_name',
    params: [name],
  });
  const a = getProps(bulb);
  console.log('changeName -> a', a);
};

export const getProps = bulb => {
  return new Promise(resolve => {
    resolve(
      bulb.sendCommand({
        id: 0,
        method: 'get_prop',
        params: ['power'],
      })
    );
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
      [toChange]: newProps,
    },
  };
  return newState;
};
