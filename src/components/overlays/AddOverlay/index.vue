<template>
  <div class="card">
    <h4 class="heading" v-if="type === 'room'">Adding a room ...</h4>

    <AddRoom
      v-if="type === 'room'"
      @send="getData"
      :devices="devices"
      :send="send"
    />

    <div class="buttons">
      <IconButton
        icon="back"
        size="2em"
        @action="$emit('toggleAddRoomOverlay')"
      />
      <IconButton icon="add" size="2em" @action="sendAction" />
    </div>
  </div>
</template>

<script>
import IconButton from '@/components/base/IconButton.vue';
import AddRoom from './AddRoom.vue';

export default {
  props: { type: String, devices: Array },
  components: { IconButton, AddRoom },
  data() {
    return {
      send: false,
    };
  },
  methods: {
    sendAction() {
      this.send = !this.send;
    },
    getData({ toAdd, name }) {
      switch (this.type) {
        case 'room':
          this.$emit('addRoom', { name: name, devices: toAdd });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  background: var(--item);
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -1px -1px 11px 0px rgba(0, 0, 0, 0.5);
  border-radius: 0 0 1em 1em;
}

.heading {
  margin: 1em 0 0 2em;
  align-self: flex-start;
}

.buttons {
  margin: 1em 0;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
</style>
