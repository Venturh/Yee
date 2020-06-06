import { Lookup } from 'node-yeelight-wifi';
import { onChange } from '@/utils/bulbService';

const actions = {
  async discovery({ state, dispatch }) {
    state.discovering = true;
    let look = new Lookup();
    look.on('detected', device => {
      state.devices.push({
        id: device.id,
        name: device.name,
        power: device.power,
        bright: device.bright,
        rgb: device.rgb,
        bulb: device,
      });
      dispatch('setListeners', device);
    });
  },

  setListeners({ state }, device) {
    device.on('stateUpdate', device => {
      const { power, bright, rgb, name } = device;
      if (rgb) {
        state.devices = onChange(state.devices, device, rgb, 'rgb');
      }
      if (power != null) {
        state.devices = onChange(state.devices, device, power, 'power');
      }
      if (bright) {
        state.devices = onChange(state.devices, device, bright, 'bright');
      }
      if (name) {
        state.devices = onChange(state.devices, device, name, 'name');
      }
    });
  },

  async setName({ state }, props) {
    // console.log('setName -> props', props.name);

    state.loadingName = true;
    const { name, bulb } = props;
    bulb.sendCommand('set_name', [name]).catch(() => console.log(state));
    setTimeout(() => {
      bulb.updateState();
    }, 1500);
    state.loadingName = false;
    //geht leider nur so noch kleine lade anzeige rein oder so
  },
};

export default actions;
