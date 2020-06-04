<template>
  <div class="menu">
    <Logo class="logo" />
    <div class="upper">
      <MenuItem
        name="Dashboard"
        icon="dashboard"
        @click="setSelected"
        :index="0"
        :class="{ active: selected === 0 }"
      />
      <MenuItem
        name="Rooms"
        icon="rooms"
        @click="setSelected"
        :index="1"
        :class="{ active: selected === 1 }"
      />
      <MenuItem
        name="Scenes"
        icon="scenes"
        @click="setSelected"
        :index="2"
        :class="{ active: selected === 2 }"
      />
    </div>

    <div class="down">
      <MenuItem
        name="Settings"
        icon="settings"
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
  position: relative;
  width: 7vw;
  height: 100vh;
  background: $item;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  :nth-child(n) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  @include xl {
    width: 10vw;
  }
  @include md {
    width: 20vw;
  }
}

.logo {
  position: absolute;

  fill: $primary;
  height: 4em;
  @include lg {
    height: 3em;
  }
}

.upper {
  margin-top: 15vh;
}

.down {
  margin-bottom: 1em;
}

.active {
  background: $body;
}
</style>
