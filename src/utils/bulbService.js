//On Listeners

export const onChange = (devices, yeelight, newProps, toChange) => {
  const index = devices.findIndex(e => e.bulb.host == yeelight.host);
  let newState = [...devices];
  newState[index] = {
    ...newState[index],
    ...newState[index],
    [toChange]: newProps,
  };
  return newState;
};
