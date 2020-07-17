import { Lookup } from 'node-yeelight-wifi';
import _ from 'lodash';

import { onChange } from '@/utils/bulbService';

const actions = {
  async discovery({ state, dispatch }) {
    state.discovering = true;
    let look = new Lookup();
    look.on('detected', device => {
      state.devices.push(device);
      dispatch('setListeners', device);
      dispatch('rooms/searchForRoom', device, { root: true });
    });
  },

  setListeners({ state }, device) {
    device.on('stateUpdate', device => {
      state.devices = onChange(state.devices, device);
    });
  },
  setPower: _.debounce(function({ state }, { bulbs, power }) {
    state.loading = true;
    bulbs.forEach(bulb => {
      bulb.setPower(power);
    });
    state.loading = false;
  }, 200),

  setBright: _.debounce(function({ state }, { bulbs, bright }) {
    state.loading = true;
    bulbs.forEach(bulb => {
      bulb.setBright(bright, 300);
    });
    state.loading = false;
  }, 200),

  setColorTemp: _.debounce(function({ state }, { bulbs, ct }) {
    state.loadingName = true;
    bulbs.forEach(bulb => {
      bulb.setCT(ct, 300);
    });
    state.loadingName = false;
  }, 200),

  setRgb: _.debounce(function({ state }, { bulbs, rgb }) {
    state.loadingName = true;
    bulbs.forEach(bulb => {
      bulb.setRGB(rgb);
    });

    state.loadingName = false;
  }, 200),

  async setName({ state }, { name, bulb }) {
    state.loadingName = true;
    bulb.sendCommand('set_name', [name]).catch(() => console.log(state));
    setTimeout(() => {
      bulb.updateState();
    }, 1500);
    state.loadingName = false;
  },
};

export default actions;
