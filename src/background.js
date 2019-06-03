import store from './store';

class Bg {
  constructor() {
    this.APP_URL = 'https://whatschrome.org/new_launcher/';

    this.findAppTab();
    this.initListeners();
    /*this.onIconClicked();
    this.onWindowRemoved();*/
    //this.onWindowFocusChanged();
  }

  initListeners() {
    chrome.runtime.onMessage.addListener((msg, s, sr) => {
      if(msg.action === 'create-window') {
        const width = 1000;
        const height = 800;
        chrome.windows.create({
          type: 'popup',
          url : msg.url,
          width,
          height,
          left: screen.width / 2 - width / 2,
        });
      }
    });
  }

  findAppTab() {
    chrome.tabs.query({url: this.APP_URL, windowType: 'popup'}, tabs => {
      if(tabs && tabs[0] && tabs[0].id && tabs[0].windowId) {
        this.appTabId    = tabs[0].id;
        this.appWindowId = tabs[0].windowId;
      }
    });
  }

  onIconClicked() {
    chrome.browserAction.onClicked.addListener(() => {
      if(this.appWindowId) {
        chrome.windows.update(this.appWindowId, {focused: true});
      } else {
        const width = 1000;
        const height = 800;
        chrome.windows.create({
          type     : 'popup',
          url      : this.APP_URL,
          width,
          height,
          left     : screen.width/2 - width/2,
        }, window => {
          this.appWindowId = window.id;
          this.appTabId    = window.tabs[0].id;
        });
      }
    });
  }

  onWindowRemoved() {
    chrome.windows.onRemoved.addListener(windowId => {
      if(windowId === this.appWindowId) {
        this.appTabId    = null;
        this.appWindowId = null;
      }
    });
  }

  onWindowFocusChanged() {
    chrome.windows.onFocusChanged.addListener(windowId => {
      chrome.storage.local.get({windowPinned: false}, storage => {
        if(storage.windowPinned && this.appWindowId && windowId !== this.appWindowId) {
          chrome.windows.update(this.appWindowId, {focused: true});
        }
      });
    });
  }
}


const bg = new Bg();