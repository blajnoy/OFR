export const windows = state => state.windows;
export const windowById = state => id => state.windows.filter(window => window.id === id);
export const nextIndex = state => type => state.layouts[type].nextIndex;
