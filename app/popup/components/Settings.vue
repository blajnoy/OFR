<template>
  <div class="setting">
    <div @click="toggleSettings" v-bind:class="{ up: isVisible }" class="settings-expand">
      <span>Settings</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 560">
        <path
          d="M480 344.181L268.869 131.889c-15.756-15.859-41.3-15.859-57.054 0-15.754 15.857-15.754 41.57 0 57.431l237.632 238.937c8.395 8.451 19.562 12.254 30.553 11.698 10.993.556 22.159-3.247 30.555-11.698L748.186 189.32c15.756-15.86 15.756-41.571 0-57.431s-41.299-15.859-57.051 0L480 344.181z"
        />
      </svg>
    </div>
    <div v-show="isVisible" class="settings-wrapper">
      <div class="layouts-list">
        <LayoutItem :size="'1x1'" v-bind:class="{ item1x1: true }" />
        <LayoutItem :size="'1x2'" v-bind:class="{ item1x2: true }" />
        <LayoutItem :size="'2x1'" v-bind:class="{ item2x1: true }" />
        <LayoutItem :size="'2x2'" v-bind:class="{ item2x2: true }" />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutItem from './LayoutItem';

export default {
  name: 'Settings',
  components: {
    LayoutItem,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    isVisible() {
      return this.show;
    },
  },
  methods: {
    createWindow() {
      chrome.runtime.sendMessage({ action: 'create-window', url: this.url });
    },
    toggleSettings() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  padding: 10px;
  .settings-expand {
    font-size: 18px;
    line-height: normal;
    display: inline-block;
    color: #444;
    cursor: pointer;
    margin: 0 0 10px;
    svg {
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: auto;
      position: relative;
      transition: all 0.15s ease;
    }
    &.up {
      svg {
        transform: rotate(180deg);
      }
    }
  }
}
.layouts-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin: -10px;
}
</style>
