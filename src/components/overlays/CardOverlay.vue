<template>
  <div class="overlay-card">
    <div class="upper">
      <span class="text-subtitle">{{ name }}</span>
      <ToggleButton
        class="button"
        @toggled="togglePower"
        :active="powerModel"
        size="3.5em"
      />
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
import ColorPicker from '@/components/ColorPicker.vue';
import ToggleButton from '@/components/base/ToggleButton.vue';
import Menu from '@/components/menu/Menu.vue';

export default {
  props: { name: String, bulbs: Array },
  components: { ColorPicker, ToggleButton, Menu },
  data() {
    return {
      menuItems: ['Color', 'CT', 'Scenes', 'Back'],
      selectedMenuItem: 'Color',
      bulb: this.bulbs[0],
      powerModel: this.bulbs[0].power,
      length: 100,
    };
  },
  computed: {
    kelvin: {
      get: function() {
        return '2000';
      },
      set: function(ct) {
        this.setColorTemp({ bulbs: this.bulbs, ct: parseInt(ct) });
      },
    },
    color: {
      get: function() {
        return this.bulbs[0].rgb;
      },
      set: function(color) {
        this.setRgb({ bulbs: this.bulbs, rgb: color });
      },
    },
  },
  methods: {
    ...mapActions('yeelight', ['setColorTemp', 'setRgb', 'setPower']),
    menuSelected(item) {
      this.selectedMenuItem = '';
      if (item === 'Back') {
        this.$emit('toggle');
      }
      this.selectedMenuItem = item;
    },
    togglePower() {
      this.powerModel = !this.powerModel;
      this.setPower({ bulbs: this.bulbs, power: this.powerModel });
    },
    handleResize() {
      this.length =
        document.getElementsByClassName('overlay-card')[0].offsetWidth / 2.5;
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
