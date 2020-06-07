<template>
  <div class="menu">
    <div class="logo-wrapper">
      <Logo class="logo" />
      <p>Logo</p>
    </div>
    <div class="upper">
      <MenuItem
        name="Dashboard"
        icon="dashboard"
        :selected="selected === 0 ? true : false"
        @click="setSelected"
        :index="0"
        :class="{ active: selected === 0 }"
      />
      <MenuItem
        name="Rooms"
        icon="rooms"
        :selected="selected === 1 ? true : false"
        @click="setSelected"
        :index="1"
        :class="{ active: selected === 1 }"
      />
      <MenuItem
        name="Scenes"
        icon="scenes"
        :selected="selected === 2 ? true : false"
        @click="setSelected"
        :index="2"
        :class="{ active: selected === 2 }"
      />
    </div>

    <div class="down">
      <MenuItem
        name="Settings"
        icon="settings"
        :selected="selected === 3 ? true : false"
        @click="setSelected"
        :index="3"
        :class="{ active: selected === 3 }"
      />
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue';
import Logo from '@/assets/bulb.svg';
export default {
  name: 'Menu',
  components: { MenuItem, Logo },
  data() {
    return { selected: 0 };
  },
  methods: {
    setSelected(value) {
      console.log('setSelectred', value);
      this.selected = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  --width: 6vw;
  position: relative;
  width: var(--width);
  height: 100vh;
  background: var(--item);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @include xl {
    --width: 10vw;
  }
  @include md {
    --width: 20vw;
  }
}

.logo-wrapper {
  margin-top: 1em;
  height: 10vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.logo {
  fill: var(--primary);
  height: 3em;
}

.upper {
  margin-top: 12.5vh;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.down {
  margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.active {
  width: var(--width);
  background: var(--body);
}
</style>
