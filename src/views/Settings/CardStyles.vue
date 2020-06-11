<template>
  <div class="wrapper">
    <h3>Style</h3>
    <div class="styles">
      <div
        class="yee-circle"
        @click="setSelected(0)"
        :style="{ border: selected == 0 ? '1px solid white' : null }"
      >
        <div class="upper">
          <span>Name</span>
          <div class="button">
            <div class="button-knob" />
          </div>
        </div>
        <div class="slider" />
        <div class="color" />
      </div>

      <div
        class="yee-line"
        @click="setSelected(1)"
        :style="{ border: selected == 1 ? '1px solid white' : null }"
      >
        <div class="upper">
          <span>Name</span>
          <div class="button">
            <div class="button-knob" />
          </div>
        </div>
        <div class="slider" />
        <div class="color" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardStyles',
  data() {
    return {
      selected: localStorage.getItem('cardstyle') || 0,
    };
  },
  methods: {
    setSelected(value) {
      this.selected = value;
      localStorage.setItem('cardstyle', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
}

.styles {
  margin: 0 0em 1em 1em;
  display: flex;
  align-items: flex-end;
  :nth-child(n) {
    margin-right: 0.7em;
  }
}

.yee-circle,
.yee-line {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 8em;
  width: 8em;
  background: var(--item);
  border-radius: 1em;
  cursor: pointer;
}

.yee-circle:hover,
.yee-line:hover {
  transform: scale(1.1);
}

.yee-circle .upper,
.yee-line .upper {
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
}

.yee-circle .button,
.yee-line .button {
  position: relative;
  width: 2em;
  height: 1em;
  border-radius: 1em;
  background: var(--body);
}

.yee-circle .button div,
.yee-line .button div {
  position: absolute;
  right: 0.25em;
  top: 0.2em;
  height: 0.6em;
  width: 0.6em;
  border-radius: 100%;
  background: var(--primary);
}

.yee-circle .slider {
  width: 4em;
  height: 4em;
  border-radius: 100%;
  background: var(--primary);
}

.yee-circle .color {
  width: 1em;
  height: 1em;
  border-radius: 100%;
  background: yellow;
}

.yee-line .upper {
  position: absolute;
  top: 0.5em;
  left: 1.6em;
  justify-content: space-around;
}

.yee-line .slider {
  position: absolute;
  left: 1em;
  height: 6em;
  width: 0.3em;
  border-radius: 1em;
  background: var(--primary);
}
</style>
