<template v-once>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <div class="bulbs">
      <YeelightCard
        v-for="(item, index) in devices"
        :key="index"
        :bulb="item.bulb"
        name="Plazuhalter"
        :params="item.params"
      />
    </div>
    <div class="picker">
      <chrome-picker
        class="test"
        :disableAlpha="true"
        :disableFields="true"
        v-model="colors"
      />
      {{ colors.rgba }}
      <button @click="changeColor">Change</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { Chrome } from 'vue-color';

import { changeHue } from '@/utils/bulbService';
import { rgbToHsv } from '@/utils/helper';
import YeelightCard from '@/components/YeelightCard';

export default {
  name: 'Home',
  data() {
    return {
      colors: {
        hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
      },
    };
  },
  components: { YeelightCard, 'chrome-picker': Chrome },
  computed: {
    ...mapState('yeelight', {
      devices: state => state.devices,
      loading: state => state.loading,
      discovering: state => state.discovering,
    }),
  },
  methods: {
    ...mapActions('yeelight', ['discovery']),
    changeColor() {
      const hsv = rgbToHsv(this.colors.rgba);
      changeHue(this.devices[0].bulb, hsv);
    },
  },
  created() {
    this.discovering ? null : this.discovery();
  },
};
</script>

<style lang="scss">
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
.wrapper {
  width: 90vw;
  margin: 0 5% 0 5%;
}
.bulbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1em;
}

.picker {
  height: 50vh;
}

.test .vc-chrome-body {
  background: $itemShade;
}
</style>
