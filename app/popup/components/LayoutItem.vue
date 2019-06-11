<template>
  <div class="layout-item">
    <div v-for="index in cellsLength" :key="index" class="cell">
      {{ index }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutItem',
  props: {
    sizes: {
      type: Object,
      default: {
        cols: 1,
        rows: 1,
      },
    },
  },
  computed: {
    cellsLength() {
      return this.sizes.cols * this.sizes.rows;
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-item {
  border: 2px solid #000;
  width: 100px;
  height: 100px;
  display: flex;
  margin: 10px;

  .cell {
    flex: 25%;
    border: 2px solid red;
  }
}
</style>
