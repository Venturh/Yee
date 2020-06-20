<template>
  <div class="wrapper">
    <h1>Rooms</h1>
    <div class="cards">
      <Card
        v-for="(room, index) in rooms"
        :key="index"
        :name="room.name"
        :bulbs="room.devices"
        v-bind="room"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/Card.vue';

export default {
  components: { Card },
  computed: {
    ...mapState('yeelight', {
      rooms: state => state.rooms,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
