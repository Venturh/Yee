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
  },
  methods: {
    ...mapActions('yeelight', ['discovery', 'setName']),
    change(props) {
      this.setName({ bulb: props.bulb, name: props.name });
    },
  },
  created() {
    this.discovering ? null : this.discovery();
  },
};
</script>

<style>
.wrapper {
}
</style>
