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
    <div class="extra-nav" v-show="windowsLength">
      <a href="#" @click="turnUpLastWindow" class="turn-up">Turn up</a>
      <a href="#" @click="togglePinLastWindow" class="pin" v-bind:class="{ disabled: !windowsLength }">
        <span v-show="!pin.active">Pin</span>
        <span v-show="pin.active">Unpin</span>
      </a>
    </div>
    <Settings></Settings>
    <footer class="popup-footer">
      <div class="footer-row">
        <a href="#" class="rate-us"><img src="/icons/rate_us.png" alt=""/></a>
        <a href="#" class="contact-us" @click.prevent.stop="showContactForm = !showContactForm" v-bind:class="{ up: showContactForm }">
          <span>Contact Us</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 560">
            <path
              d="M480 344.181L268.869 131.889c-15.756-15.859-41.3-15.859-57.054 0-15.754 15.857-15.754 41.57 0 57.431l237.632 238.937c8.395 8.451 19.562 12.254 30.553 11.698 10.993.556 22.159-3.247 30.555-11.698L748.186 189.32c15.756-15.86 15.756-41.571 0-57.431s-41.299-15.859-57.051 0L480 344.181z"
            />
          </svg>
        </a>
      </div>
      <ContactForm v-show="showContactForm" />
    </footer>
  </div>
</template>

<script>
import Settings from './components/Settings';
import ContactForm from './components/ContactForm';
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  components: {
    Settings,
    ContactForm,
  },
  data() {
    return {
      urls: {
        doc: 'http://fileredact.com/doc/',
        sheet: 'http://fileredact.com/sheet/',
        presentation: 'http://fileredact.com/presentation/',
      },
      showContactForm: false,
    };
  },
  mounted() {},
  methods: {
    createWindow(type) {
      const url = this.urls[type];
      chrome.runtime.sendMessage({ action: 'create-window', url });
    },
    turnUpLastWindow() {
      chrome.runtime.sendMessage({ action: 'turn-up-window' });
    },
    togglePinLastWindow() {
      chrome.runtime.sendMessage({ action: 'toggle-pin-last-window' });
    },
  },
  computed: {
    ...mapState({
      pin: state => state.pinned,
      windowsLength: state => state.windows.length,
    }),
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
    padding: 5px 10px;
    border-top: 1px solid #f5f5f5;
    .footer-row {
      display: flex;
      align-items: center;
      .contact-us {
        font-size: 14px;
        line-height: normal;
        display: inline-block;
        cursor: pointer;
        margin: 0 0 0 auto;
        &:hover {
          text-decoration: none;
        }
        svg {
          display: inline-block;
          vertical-align: middle;
          width: 14px;
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
.extra-nav {
  display: flex;
  padding: 10px;

  .pin {
    margin-left: auto;
    &.disabled {
      cursor: default;
      pointer-events: none;
      color: #666666;
    }
  }
}
.rate-us {
  img {
    width: 90px;
    height: auto;
    vertical-align: middle;
  }
}
</style>
