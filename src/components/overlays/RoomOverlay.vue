<template>
  <div class="card">
    <Input @action="renameRoom" :placeholder="roomName" :propDisabled="false" />
    <div v-for="(device, index) in devices" :key="index" class="items">
      <CheckButton icon="check" :toCheck="device" @check="toggleDevice" />
      <span>{{ device.name }}</span>
    </div>
    <div class="buttons">
      <IconButton
        icon="back"
        size="2em"
        @action="$emit('toggleAddRoomOverlay')"
      />
      <IconButton
        icon="add"
        size="2em"
        @action="$emit('addRoom', { name: roomName, devices: toAdd })"
      />
    </div>
  </div>
</template>

<script>
import Input from '@/components/base/Input.vue';
import CheckButton from '@/components/base/CheckButton.vue';
import IconButton from '@/components/base/IconButton.vue';

export default {
  props: { devices: Array },
  components: { Input, CheckButton, IconButton },
  data() {
    return {
      toAdd: [],
      roomName: 'New Room',
    };
  },
  methods: {
    toggleDevice({ device, value }) {
      if (value === true) {
        this.toAdd.push(device);
      } else {
        const toDelete = this.toAdd.findIndex(e => e.id == device.id);
        this.toAdd.splice(toDelete, 1);
      }
    },
    renameRoom(name) {
      console.log('renameRoom -> name', name);
      this.roomName = name;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background: var(--item);
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -1px -1px 11px 0px rgba(0, 0, 0, 0.5);
  border-radius: 0 0 1em 1em;
}

.items {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
