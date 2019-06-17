import store from './store';

class Bg {
  constructor() {
    // this.findAppTab();
    this.popup;
    this.tabId;
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
            chrome.runtime.sendMessage(chrome.runtime.id, { action: 'window_created' });
          }
        );
      }
      if (msg.action === 'turn-up-window') {
        if (store.getters.windows.length) {
          store.getters.windows.forEach(turnWindow => {
            chrome.windows.update(turnWindow.id, {
              focused: true,
              state: 'normal',
            });
          });
        }
      }
      if (msg.action === 'init-popup') {
        this.tabId = msg.tabId;
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
        sizes.width = screen.width / 2;
        sizes.height = screen.availHeight;
        break;
      case '2x1':
        sizes.height = screen.availHeight / 2;
        sizes.width = screen.width;
        break;
      case '2x2':
        sizes.width = screen.width / 2;
        sizes.height = screen.availHeight / 2;
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
        pos.left = screen.width / 2 - this.getSizes(type).width / 2;
        pos.top = screen.availHeight / 2 - this.getSizes(type).height / 2;
        break;
      case '1x2':
        if (index === 2) {
          pos.left = screen.width / 2;
        }
        break;
      case '2x1':
        if (index === 2) {
          pos.top = screen.availHeight / 2;
        }
        break;
      case '2x2':
        if (index > 1) {
          if (index % 2 === 0) {
            pos.left = screen.width / 2;
          }
          if (index > 2) {
            pos.top = screen.availHeight / 2;
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
