import { Discovery, Device } from 'yeelight-platform';

import { onChange } from '../../utils/bulbService';
const actions = {
  async discovery({ state }) {
    const discoveryService = new Discovery();
    discoveryService.once('didDiscoverDevice', device => {
      const yeelight = new Device({ host: device.host, port: device.port });

      yeelight.connect();

      yeelight.on('connected', () => {
        state.devices.push({
          id: device.id,
          bulb: yeelight,
          params: {
            power: device.power,
            bright: parseInt(device.bright),
          },
        });
        state.devices.push({
          id: device.id,
          bulb: yeelight,
          params: {
            power: device.power,
            bright: parseInt(device.bright),
          },
        });
      });

      yeelight.on('deviceUpdate', newProps => {
        if (newProps['method'] === 'props') {
          console.log('props', newProps.params);
          switch (Object.keys(newProps.params)[0]) {
            case 'power':
              console.log('change');
              state.devices = onChange(
                state.devices,
                yeelight,
                newProps,
                'power'
              );
              break;
            case 'bright':
              state.devices = onChange(
                state.devices,
                yeelight,
                newProps,
                'bright'
              );
              break;

            default:
              break;
          }
        }
      });
    });
    discoveryService.listen();
  },
};

export default actions;
