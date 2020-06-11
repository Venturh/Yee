<template>
  <div class="menu">
    <div class="logo-wrapper">
      <Logo />
      <span>Yee</span>
    </div>
    <div class="upper">
      <MenuItem
        v-for="(item, index) in menuitems"
        :key="index"
        :itemName="item"
        :currentRoute="currentRoute"
        @click="setSelected"
        :class="{ active: item === currentRoute }"
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
      menuitems: ['Dashboard', 'Rooms', 'Scenes', 'Settings'],
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  --width: 7.5vw;
  position: relative;
  width: var(--width);

  background: var(--item);

  @include xl {
    --width: 10vw;
  }

  @include md {
    --width: 15vw;
  }
}

.logo-wrapper {
  margin-top: 1em;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.logo-wrapper span {
  margin-top: 0.5em;
  font-size: var(--text-button);
}

.logo-wrapper svg {
  fill: var(--primary);
  height: 2em;
}

.upper {
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  div:last-of-type {
    margin-top: auto;
  }
}

/deep/ .wrapper {
  margin-top: 1em;
}

.down {
  position: absolute;
  bottom: 1em;
}

.active {
  width: var(--width);
  background: var(--body);
}
</style>
