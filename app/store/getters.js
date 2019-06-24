export const windows = state => state.windows;
export const pinned = state => state.pinned;
export const length = state => state.windows.length;
export const currentLayout = state => state.currentLayout;
export const windowById = state => id => state.windows.filter(window => window.id === id);
export const nextIndex = state => type => state.layouts[type].nextIndex;
