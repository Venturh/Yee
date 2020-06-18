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
        hsv: device.hsb,
        rgb: device.rgb,
        bulb: device,
      });
      dispatch('setListeners', device);
    });
  },

  setListeners({ state }, device) {
    device.on('stateUpdate', device => {
      console.log('setListeners -> device', device);
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

  setPower({ state }, { bulb, power }) {
    console.log('setPower -> power', bulb, power);
    state.loading = true;
    bulb.setPower(!power);
    state.loading = false;
  },

  async setName({ state }, { name, bulb }) {
    state.loadingName = true;
    bulb.sendCommand('set_name', [name]).catch(() => console.log(state));
    setTimeout(() => {
      bulb.updateState();
    }, 1500);
    state.loadingName = false;
  },

  async setColorTemp({ state }, { bulb, ct }) {
    state.loadingName = true;
    bulb.setCT(ct, 300);
    state.loadingName = false;
  },

  async setRgb({ state }, { bulb, rgb }) {
    const { r, g, b } = rgb;
    state.loadingName = true;
    bulb.setRGB([r, g, b]);
    state.loadingName = false;
  },

  async setHsv({ state }, { bulb, hsv }) {
    const { h, s, v } = hsv;
    state.loadingName = true;
    bulb.setHSV([h, s, v]);
    state.loadingName = false;
  },
};

export default actions;
