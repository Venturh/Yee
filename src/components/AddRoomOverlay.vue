<template>
  <div class="card">
    <div
      v-for="(device, index) in devices"
      :key="index"
      class="items"
    >
      <CheckButton
        icon="check"
        :toCheck="device"
        @check="toggleDevice"
      />
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
        @action="$emit('addRoom', { name: name, devices: toAdd })"
      />
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/CheckButton.vue';
import IconButton from '@/components/IconButton.vue';

export default {
  props: { devices: Array },
  components: { CheckButton, IconButton },
  data() {
    return {
      toAdd: [],
      name: 'Test',
    };
  },
  methods: {
    toggleDevice({ device, value }) {
      console.log('toggleDevice -> device, value', device, value);
      if (value === true) {
        this.toAdd.push(device);
      } else {
        const toDelete = this.toAdd.findIndex(e => e.id == device.id);
        this.toAdd.splice(toDelete, 1);
      }
      console.log('toAdd:', this.toAdd);
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
