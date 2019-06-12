<template>
  <div class="popup-holder">
    <span class="ttl">New:</span>
    <ul class="btns">
      <li>
        <a href="#" @click.prevent="createWindow('doc')">
          <img src="/icons/docs-32.png" width="32" height="32" />
          <span class="label">Document</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="createWindow('sheet')">
          <img src="/icons/spreadsheets-32.png" width="32" height="32" />
          <span class="label">Sheet</span>
        </a>
      </li>
      <li>
        <a href="#" @click.prevent="createWindow('presentation')">
          <img src="/icons/powerpoint-32.png" width="32" height="32" />
          <span class="label">Presentation</span>
        </a>
      </li>
    </ul>
    <a href="#" @click="turnUpLastWindow" class="turn-up">Turn up</a>
    <Settings></Settings>
    <footer class="popup-footer">
      <a href="#" class="rate-us">Rate Us</a>
      <a href="#" class="contact-us">Contact Us</a>
    </footer>
  </div>
</template>

<script>
import Settings from './components/Settings';

export default {
  components: {
    Settings,
  },
  data() {
    return {
      urls: {
        doc: 'https://docs.google.com/create',
        sheet: 'https://sheets.google.com/create',
        presentation: 'https://slides.google.com/create',
      },
    };
  },
  methods: {
    createWindow(type) {
      const url = this.urls[type];
      chrome.runtime.sendMessage({ action: 'create-window', url });
    },
    turnUpLastWindow() {
      chrome.runtime.sendMessage({ action: 'turn-up-window' });
    },
  },
};
</script>

<style lang="scss" scoped>
.popup-holder {
  font-size: 14px;
  line-height: normal;
  a {
    text-decoration: none;
    color: #444;
    outline: 0;
    &:hover {
      text-decoration: underline;
    }
  }
  .popup-footer {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    border-top: 1px solid #f5f5f5;

    .contact-us {
      margin-left: auto;
    }
  }
}
.ttl {
  font-size: 18px;
  line-height: normal;
  display: block;
  padding: 5px 0 7px 10px;
}
.btns {
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    &:not(:last-of-type) {
      border-bottom: 1px solid #f5f5f5;
    }
    a {
      display: flex;
      align-items: center;
      padding: 0 5px;
      line-height: 40px;
      &:hover {
        background: #f5f5f5;
        text-decoration: none;
      }
    }
    img {
      vertical-align: middle;
      margin: 0 5px;
    }
  }
}
</style>
