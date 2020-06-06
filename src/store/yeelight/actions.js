import { Discovery, Device } from 'yeelight-platform';

import { numberToColour } from '@/utils/helper';
import { onChange, changeName, getProps } from '../../utils/bulbService';
const actions = {
  async discovery({ state }) {
    state.discovering = true;
    const discoveryService = new Discovery();
    discoveryService.once('didDiscoverDevice', async device => {
      const yeelight = new Device({ host: device.host, port: device.port });

      yeelight.connect();

      yeelight.on('connected', async () => {
        console.log('device', yeelight);
        const a = await getProps(yeelight);
        console.log('discovery -> a', a);
        state.devices.push({
          id: device.id,
          bulb: yeelight,
          params: {
            power: device.power,
            bright: parseInt(device.bright),
            rgb: numberToColour(device.rgb),
            name: getProps(yeelight),
          },
        });
        state.devices.push({
          id: device.id,
          bulb: yeelight,
          params: {
            power: device.power,
            bright: parseInt(device.bright),
            rgb: numberToColour(device.rgb),
          },
        });
      });

      yeelight.on('deviceUpdate', newProps => {
        if (newProps['method'] === 'props') {
          console.log('props', newProps.params);
          const { power, bright, rgb } = newProps.params;
          if (rgb) {
            state.devices = onChange(
              state.devices,
              yeelight,
              numberToColour(rgb),
              'rgb'
            );
          }
          if (power) {
            console.log('power', power);
            state.devices = onChange(state.devices, yeelight, power, 'power');
          }
          if (bright) {
            state.devices = onChange(state.devices, yeelight, bright, 'bright');
          }
        }
      });
    });
    discoveryService.listen();
    setTimeout(() => {
      discoveryService.socket.close();
    }, 5000);
  },
  async setName({ state }, props) {
    const { name, bulb } = props;
    console.log('changename', name, bulb.bulb);
    changeName(bulb.bulb, name);
    const index = state.devices.findIndex(
      e => e.bulb.device.host == bulb.bulb.device.host
    );
    console.log('index', index);
  },
};

export default actions;
