<template>
  <div class="overlay-card">
    <div class="upper">
      <span class="text-subtitle">{{ name }}</span>
      <ToggleButton class="button" @toggled="togglePower" :active="powerModel" size="3.5em" />
    </div>

    <div class="picker">
      <ColorPicker
        v-show="selectedMenuItem === 'Color'"
        colorType="rgb"
        type="Wheel"
        :length="length"
        v-model="color"
      />
      <ColorPicker
        v-show="selectedMenuItem === 'CT'"
        colorType="kelvin"
        :sliderShape="true"
        type="Slider"
        :length="length"
        v-model="kelvin"
      />
    </div>

    <div class="menu">
      <Menu :menuItems="menuItems" @select="menuSelected" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ColorPicker from './ColorPicker.vue';
import ToggleButton from './ToggleButton.vue';
import Menu from './Menu/Menu';

export default {
  props: { bulb: Object, name: String, power: Boolean, rgb: Object },
  components: { ColorPicker, ToggleButton, Menu },
  data() {
    return {
      menuItems: ['Color', 'CT', 'Scenes', 'Back'],
      selectedMenuItem: 'Color',
      powerModel: this.power,
      color: this.rgb,
      kelvin: '2000',
      length: 100,
    };
  },
  methods: {
    ...mapActions('yeelight', ['setColorTemp', 'setRgb']),
    menuSelected(item) {
      this.selectedMenuItem = '';
      if (item === 'Back') {
        this.$emit('toggle');
      }
      this.selectedMenuItem = item;
    },
    togglePower() {
      this.powerModel = !this.powerModel;
      this.bulb.setPower(this.powerModel);
    },
    handleResize() {
      this.length =
        document.getElementsByClassName('overlay-card')[0].offsetWidth / 2.5;
    },
  },
  watch: {
    kelvin(ct) {
      this.setColorTemp({ bulb: this.bulb, ct: parseInt(ct) });
    },
    color() {
      this.setRgb({ bulb: this.bulb, rgb: this.color });
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.length =
      document.getElementsByClassName('overlay-card')[0].offsetWidth / 2.5;
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
.overlay-card {
  position: relative;
  background: var(--item);
  width: 50vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -1px -1px 11px 0px rgba(0, 0, 0, 0.5);
  border-radius: 0 0 1em 1em;

  --menuWidth: 5vw;
  @include lg {
    --menuWidth: 10vw;
  }
}

.upper {
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin: 1em 0 0 calc(var(--menuWidth) * -1);
}

.picker {
  margin-left: calc(var(--menuWidth) * -1);
}

.menu {
  position: absolute;
  right: 0;
}

/deep/ .menu {
  height: 50vh;
  --width: var(--menuWidth);
  background: var(--body);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-bottom-right-radius: 1em;
}

.menu /deep/ .upper {
  height: 50vh;
}
</style>
