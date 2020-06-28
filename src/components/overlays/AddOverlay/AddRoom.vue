<template>
  <div class="add-room">
    <div class="name">
      <span>Name</span>
      <Input
        @action="rename"
        :showIcon="false"
        :placeholder="roomName"
        :propDisabled="false"
      />
    </div>
    <div class="items">
      <div class="item" v-for="(device, index) in devices" :key="index">
        <CheckButton icon="check" :toCheck="device" @check="toggleDevice" />
        <span>{{ device.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/base/Input.vue';
import CheckButton from '@/components/base/CheckButton.vue';
export default {
  props: { devices: Array, send: Boolean },
  components: { Input, CheckButton },
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
    rename(name) {
      this.roomName = name;
    },
  },
  watch: {
    send() {
      this.$emit('send', { toAdd: this.toAdd, name: this.roomName });
    },
  },
};
</script>

<style langs="scss" scoped>
.add-room {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.name span {
  margin-right: 0.5em;
}

.items {
  margin-top: 2em;
  display: grid;
  grid-template-columns: auto auto;
  gap: 1em 2em;
}

.item {
  display: flex;
  align-items: center;
}
</style>
