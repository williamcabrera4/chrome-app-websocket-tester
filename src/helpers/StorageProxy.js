/* global chrome */

const storageProxy = {
  setItem: () => {},
  getItem: () => {},
};

if (typeof chrome.storage !== 'undefined') {
  storageProxy.setItem = (key, value) => {
    const storageObject = {};
    storageObject[key] = value;
    chrome.storage.local.set(storageObject);
  };
  storageProxy.getItem = (key, callback) => chrome.storage.local.get(key, (value) => {
    const stateObject = JSON.parse(value[key]);
    callback(stateObject);
  });
} else if (typeof window.localStorage !== 'undefined') {
  storageProxy.setItem = (key, value) => window.localStorage.setItem(key, value);
  storageProxy.getItem = (key, callback) => {
    const value = window.localStorage.getItem(key);
    const stateObject = JSON.parse(value);
    callback(stateObject);
  };
}

export default storageProxy;
