<template>
  <div>
    <button class="btn" v-on:click="createPopup">new popup</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://docs.google.com/create',
    };
  },
  methods: {
    createPopup() {
      chrome.runtime.sendMessage({ action: 'create-window', url: this.url });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
}
</style>
