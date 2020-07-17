<template>
  <section class="section">
    <h1>Settings</h1>
    <Fonts />
    <Themes />
    <CardStyles />
    <div class="devices">
      <h3>Devices</h3>
      <YeeItem
        v-for="(item, index) in devices"
        :key="index"
        @changeName="change"
        :bulb="item"
        :name="item.name"
        :power="item.power"
        type="bulb"
      />
    </div>
    <div class="rooms">
      <h3>Rooms</h3>
      <YeeItem
        v-for="(item, index) in rooms"
        :key="index"
        @changeName="change"
        @removeItem="remove"
        :bulb="item"
        :name="item.name"
        :power="item.power"
        type="room"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Themes from './Themes.vue';
import Fonts from './Fonts.vue';
import CardStyles from './CardStyles.vue';
import YeeItem from '@/components/YeeItem.vue';

export default {
  name: 'Settings',
  components: { YeeItem, Themes, Fonts, CardStyles },
  data() {
    return {
      name: '',
    };
  },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
      discovering: state => state.discovering,
    }),
    ...mapState('rooms', {
      rooms: state => state.rooms,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery', 'setName']),
    ...mapActions('rooms', ['setRoomName', 'removeRoom']),
    change(props) {
      if (props.type === 'bulb') {
        this.setName({ bulb: props.bulb, name: props.newName });
      } else if (props.type === 'room') {
        this.setRoomName({ oldName: props.oldName, newName: props.newName });
      }
    },
    remove(props) {
      console.log('remove -> type', props.type);
      if (props.type === 'bulb') {
        console.log('bulb');
      } else if (props.type === 'room') {
        this.removeRoom(props.name);
      }
    },
  },
  created() {
    this.discovering ? null : this.discovery();
  },
};
</script>

<style>
</style>
