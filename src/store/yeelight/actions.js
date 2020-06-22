import { Lookup } from 'node-yeelight-wifi';
import _ from 'lodash';

import { onChange } from '@/utils/bulbService';

const actions = {
  async discovery({ state, dispatch }) {
    state.discovering = true;
    let look = new Lookup();
    look.on('detected', device => {
      state.devices.push(device);
      // state.rooms.push({
      //   name: 'Heeßen',
      //   devices: [device, device],
      // });
      //       console.log('discovery ->  state.rooms', state.rooms);
      dispatch('searchForRoom', device);
      state.devices.push(device);

      dispatch('setListeners', device);
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
    bulb
      .sendCommand('set_name', [name])
      .catch(() => console.log(state));
    setTimeout(() => {
      bulb.updateState();
    }, 1500);
    state.loadingName = false;
  },

  searchForRoom({ state }, discoveredDevice) {
    state.loadingName = true;
    let json = localStorage.getItem('rooms');
    if (json) {
      const rooms = JSON.parse(json);
      rooms.forEach(room => {
        const name = room.name;
        const newRoom = { name: name, devices: [] };
        room.devices.forEach(device => {
          if (device.id === discoveredDevice.id) {
            newRoom['devices'].push(discoveredDevice);
          }
        });
        if (newRoom.devices.length > 0) state.rooms.push(newRoom);
      });
    }
  },

  addRoom({ state }, newRoom) {
    const { name, devices } = newRoom;
    console.log('addRoom -> name, devices', name, devices);
    const room = { name: name, devices: [] };
    devices.forEach(device => {
      room['devices'].push(device);
    });
    state.rooms.push(room);
    localStorage.setItem('rooms', JSON.stringify(state.rooms));
  },
};

export default actions;
