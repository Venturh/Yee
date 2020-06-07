<template>
  <div class="menu">
    <div class="logo-wrapper">
      <Logo class="logo" />
      <span>Yee</span>
    </div>
    <div class="upper">
      <MenuItem
        v-for="(item, index) in menuitems"
        :key="index"
        :itemName="item"
        @click="setSelected"
        :class="{ active: item === currentRoute }"
      />
    </div>
    <div class="down">
      <MenuItem
        itemName="Settings"
        @click="setSelected"
        :class="{ active: currentRoute === 'Settings' }"
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
    return {
      menuitems: ['Dashboard', 'Rooms', 'Scenes'],
      currentRoute: this.$route.name,
    };
  },
  methods: {
    setSelected(itemName) {
      this.$router.push(itemName, () => {});
      this.currentRoute = itemName;
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

.logo-wrapper span {
  margin-top: 0.5em;
  font-size: var(--text-button);
}

.logo {
  fill: var(--primary);
  height: 2.5em;
}

.upper {
  margin-top: 12vh;
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
