<template>
  <div class="font-wrapper">
    <h3>Text Size</h3>
    <div class="fonts">
      <FontToggle
        v-for="(item, index) in fonts"
        :key="index"
        v-bind="item"
        icon="font"
        :index="index"
        :selected="selected"
        @action="changeFont"
      />
    </div>
  </div>
</template>

<script>
import FontToggle from '@/components/FontToggle.vue';
export default {
  components: { FontToggle },
  data() {
    return {
      font: 'medium',
      selected: 0,
      fonts: [
        { font: 'small', size: '1.75em' },
        { font: 'medium', size: '2em' },
        { font: 'large', size: '2.5em' },
      ],
    };
  },
  methods: {
    changeFont(value) {
      this.font = value;
      this.checkFont(this.font);
    },
    checkFont(toCheck) {
      let htmlElement = document.documentElement;
      switch (toCheck) {
        case 'small':
          localStorage.setItem('fontSize', 'small');
          htmlElement.setAttribute('fontSize', 'small');
          this.selected = 0;
          break;
        case 'medium':
          localStorage.setItem('fontSize', 'medium');
          htmlElement.setAttribute('fontSize', 'medium');
          this.selected = 1;
          break;
        case 'large':
          localStorage.setItem('fontSize', 'large');
          htmlElement.setAttribute('fontSize', 'large');
          this.selected = 2;
          break;
      }
    },
  },
  created() {
    let fontSize = localStorage.getItem('fontSize');
    this.checkFont(fontSize);
  },
};
</script>

<style lang="scss">
.font-wrapper {
  display: flex;
  align-items: center;
}

.fonts {
  margin: 0 0em 1em 1em;
  display: flex;
  align-items: flex-end;
  :nth-child(n) {
    margin-right: 0.7em;
  }
}
</style>
