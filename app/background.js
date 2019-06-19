import store from './store';

class Bg {
  constructor() {
    this.pinned = {
      active: false,
      id: null,
    };
    this.initListeners();
    this.onWindowRemoved();
  }

  initListeners() {
    chrome.runtime.onMessage.addListener(msg => {
      if (msg.action === 'create-window') {
        const { currentLayout } = store.state;
        const nextIndex = store.getters.nextIndex(currentLayout);
        const { width, height } = this.getSizes(currentLayout);
        const { top, left } = this.getPosition(currentLayout, nextIndex);
        chrome.windows.create(
          {
            type: 'popup',
            url: msg.url,
            width,
            height,
            top,
            left,
          },
          win => {
            const newWindow = {
              id: win.id,
              index: nextIndex,
              type: currentLayout,
            };
            store.commit('INC_WINDOW', newWindow);
            store.commit('INC_NEXT_WINDOW_INDEX', currentLayout);
          }
        );
      }
      if (msg.action === 'turn-up-window') {
        if (store.getters.windows.length) {
          store.getters.windows.forEach(turnWindow => {
            chrome.windows.get(turnWindow.id, window => {
              if (!window) store.commit('REMOVE_WINDOW', turnWindow.id);
            });
            chrome.windows.update(turnWindow.id, {
              focused: true,
              state: 'normal',
            });
          });
        }
      }
      if (msg.action === 'toggle-pin-last-window') {
        if (!this.pinned.active) {
          chrome.windows.getLastFocused({ populate: true }, win => {
            this.pinned.id = win.id;
            this.pinned.active = true;
          });
        } else {
          this.pinned.active = false;
        }
      }
      if (msg.action === 'update-current-layout') {
        const { currentLayout } = store.state;
        const { width, height } = this.getSizes(currentLayout);
        let nextIndex = 0;
        if (store.getters.windows.length) {
          store.getters.windows.forEach(updatingWindow => {
            if (!nextIndex) {
              store.commit('SET_NEXT_WINDOW_INDEX', { type: currentLayout, index: 1 });
            } else {
              store.commit('INC_NEXT_WINDOW_INDEX', currentLayout);
            }
            nextIndex = store.getters.nextIndex(currentLayout);
            const { top, left } = this.getPosition(currentLayout, nextIndex);
            chrome.windows.update(updatingWindow.id, {
              focused: true,
              state: 'normal',
              width,
              height,
              top,
              left,
            });
          });
        }
      }
    });
    chrome.windows.onFocusChanged.addListener(curId => {
      if (this.pinned.active && this.pinned.id !== curId) {
        chrome.windows.update(this.pinned.id, {
          focused: true,
        });
      }
    });
  }

  getSizes(type) {
    const sizes = {
      width: 1000,
      height: 800,
    };
    switch (type) {
      case '1x1':
        break;
      case '1x2':
        sizes.width = parseInt(screen.width / 2, 10);
        sizes.height = parseInt(screen.availHeight, 10);
        break;
      case '2x1':
        sizes.height = parseInt(screen.availHeight / 2, 10);
        sizes.width = parseInt(screen.width, 10);
        break;
      case '2x2':
        sizes.width = parseInt(screen.width / 2, 10);
        sizes.height = parseInt(screen.availHeight / 2, 10);
        break;
      default:
        break;
    }
    return sizes;
  }

  getPosition(type, index = 1) {
    const pos = {
      top: 0,
      left: 0,
    };
    switch (type) {
      case '1x1':
        pos.left = parseInt(screen.width / 2 - this.getSizes(type).width / 2, 10);
        pos.top = parseInt(screen.availHeight / 2 - this.getSizes(type).height / 2, 10);
        break;
      case '1x2':
        if (index === 2) {
          pos.left = parseInt(screen.width / 2, 10);
        }
        break;
      case '2x1':
        if (index === 2) {
          pos.top = parseInt(screen.availHeight / 2, 10);
        }
        break;
      case '2x2':
        if (index > 1) {
          if (index % 2 === 0) {
            pos.left = parseInt(screen.width / 2, 10);
          }
          if (index > 2) {
            pos.top = parseInt(screen.availHeight / 2, 10);
          }
        }
        break;
      default:
        break;
    }
    return pos;
  }

  onWindowRemoved() {
    chrome.windows.onRemoved.addListener(windowId => {
      const { index, type } = store.getters.windowById(windowId)[0];
      store.commit('SET_NEXT_WINDOW_INDEX', { type, index });
      store.commit('REMOVE_WINDOW', windowId);
    });
  }
}

const bg = new Bg();
