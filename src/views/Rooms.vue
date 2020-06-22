<template>
  <div class="section">
    <h1>Rooms</h1>
    <div class="cards">
      <Card
        v-for="(room, index) in rooms"
        :key="index"
        type="Room"
        :name="room.name"
        :bulbs="room.devices"
        @action="toggleCardOverlay"
      />
      <AddCard @add="toggleAddRoomOverlay" />
    </div>
    <div class="overlay">
      <transition name="toggle">
        <CardOverlay
          v-if="showOverlay"
          @toggle="toggleCardOverlay"
          v-bind="selected"
        />
      </transition>
    </div>
    <div class="add-room-overlay">
      <transition name="toggle">
        <RoomOverlay
          v-if="showAddRoomOverlay"
          :devices="devices"
          @toggleAddRoomOverlay="toggleAddRoomOverlay"
          @addRoom="addNewRoom"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Card from '@/components/Card.vue';
import AddCard from '@/components/AddCard.vue';
import CardOverlay from '@/components/overlays/CardOverlay.vue';
import RoomOverlay from '@/components/overlays/RoomOverlay.vue';
export default {
  components: { Card, AddCard, CardOverlay, RoomOverlay },
  computed: {
    ...mapState('yeelight', {
      rooms: state => state.rooms,
      devices: state => state.devices,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['addRoom']),
    toggleCardOverlay(item) {
      this.selected = item;
      this.showOverlay = !this.showOverlay;
    },
    toggleAddRoomOverlay() {
      this.showAddRoomOverlay = !this.showAddRoomOverlay;
    },
    addNewRoom({ name, devices }) {
      console.log('addNewRoom -> name, devices', name, devices);
      this.addRoom({ name, devices });
    },
  },
  data() {
    return {
      showOverlay: false,
      selected: {},
      showAddRoomOverlay: false,
    };
  },
};
</script>

<style lang="scss">
.add-room-overlay {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
</style>
