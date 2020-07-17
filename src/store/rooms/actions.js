const actions = {
  searchForRoom({ state }, discoveredDevice) {
    state.loadingName = true;
    let json = localStorage.getItem('rooms');
    if (json) {
      const rooms = JSON.parse(json);
      rooms.forEach(room => {
        const name = room.name;

        //check if room exists
        const find = state.rooms.findIndex(
          savedRoom => savedRoom.name === name
        );
        if (find >= 0) {
          room.devices.forEach(device => {
            if (device.id === discoveredDevice.id) {
              state.rooms[find]['devices'] = [
                ...state.rooms[find]['devices'],
                discoveredDevice,
              ];
            }
          });
          return;
        }

        //if room doesnt exist create new room
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
    const room = { name: name, devices: [] };
    devices.forEach(device => {
      room['devices'].push(device);
    });
    state.rooms.push(room);
    localStorage.setItem('rooms', JSON.stringify(state.rooms));
  },

  setRoomName({ state }, { oldName, newName }) {
    state.loadingName = true;
    console.log('new, old', newName, oldName);
    const index = state.rooms.findIndex(room => room.name === oldName);
    if (index >= 0) {
      state.rooms[index].name = newName;
      localStorage.setItem('rooms', JSON.stringify(state.rooms));
    }
  },

  removeRoom({ state }, name) {
    state.loadingName = true;
    const index = state.rooms.findIndex(room => room.name === name);
    if (index >= 0) {
      state.rooms.splice(index, 1);
      localStorage.setItem('rooms', JSON.stringify(state.rooms));
    }
  },
};

export default actions;
