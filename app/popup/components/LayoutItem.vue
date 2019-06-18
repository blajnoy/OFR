<template>
  <div v-on:click.prevent="changeLayout" class="layout-item" v-bind:class="{ active: currentLayout === size }">
    <div v-for="index in cellsLength" :key="index" class="cell">
      <img v-if="index % 2 !== 0" src="/icons/docs-32.png" alt="ico" width="32" height="32" />
      <img v-else src="/icons/spreadsheets-32.png" alt="ico" width="32" height="32" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'LayoutItem',
  props: {
    size: String,
  },
  computed: {
    cellsLength() {
      return this.layouts[this.size].cols * this.layouts[this.size].rows;
    },
    ...mapState({
      currentLayout: state => state.currentLayout,
      layouts: state => state.layouts,
    }),
  },
  methods: {
    ...mapActions(['setCurrentLayout']),
    changeLayout() {
      this.setCurrentLayout(this.size);
      chrome.runtime.sendMessage({ action: 'update-current-layout' });
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-item {
  border: 2px solid #000;
  width: 100px;
  height: 100px;
  margin: 10px;
  display: grid;

  &.item1x1 {
    grid-template-columns: 100% 100%;
  }
  &.item1x2 {
    grid-template-columns: 50% 50%;
  }
  &.item2x1 {
    grid-template-rows: 50% 50%;
  }
  &.item2x2 {
    grid-template-columns: 50% 50%;
  }
  &.active {
    border-color: red;
  }
  .cell {
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
