import { Discovery, Device } from 'yeelight-platform';
import { convertToBool } from '@/utils/helper';
const actions = {
  async discovery({ state }) {
    const discoveryService = new Discovery();
    discoveryService.on('didDiscoverDevice', device => {
      const yeelight = new Device({ host: device.host, port: device.port });
      yeelight.connect();

      yeelight.on('connected', () => {
        state.devices.push({
          id: device.id,
          bulb: yeelight,
          params: {
            power: convertToBool(device.power),
            brightness: device.bright,
          },
        });
      });

      yeelight.on('deviceUpdate', newProps => {
        if (newProps['method'] === 'props') {
          const index = state.devices.findIndex(
            e => e.bulb.device.host == yeelight.device.host
          );
          let newState = [...state.devices];
          newState[index] = {
            ...newState[index],
            params: { power: convertToBool(newProps.params.power) },
          };
          state.devices = newState;
        }
      });
    });
    discoveryService.listen();
  },
};

export default actions;
