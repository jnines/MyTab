import { exportDate } from './config.js';
import { locale } from './helpers.js';
import renderOptions from './views/renderOptions.js';

/**
 * Get browser type if used as extension, otherwise local
 **/
const getBrowser = () => {
  if (window.location.protocol === 'moz-extension:') return 'browser';
  if (window.location.protocol === 'chrome-extension:') return 'chrome';
  return 'local';
};

/**
 * Promise-ifying chrome's wonky storage
 * @param key name of object key
 **/
const chromeGet = (key) => {
  try {
    return new Promise((res) => {
      chrome.storage.sync.get(key, res);
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Allow for blob/json export of Options data, pretty printed, with current date
 * @param data the Options data
 * @param linkEl the element used to download the file
 **/
export const exportJson = (data, linkEl) => {
  const date = new Date()
    .toLocaleDateString(locale, exportDate)
    .replaceAll('/', '');
  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  linkEl.download = `mytab_${date}.json`;
  linkEl.href = URL.createObjectURL(jsonBlob);
};

/**
 * Allows for importing saved Options json
 **/
export const importJson = function () {
  const reader = new FileReader();
  reader.readAsText(this.files[0]);
  reader.onload = () => renderOptions(JSON.parse(reader.result));
  reader.onerror = () => console.error(reader.error);
};

/**
 * Sets storage based on context the app is running in
 * @param key name of object key
 * @param data the Options data
 **/
export const storageSet = async (key, data) => {
  const browserType = getBrowser();
  if (browserType === 'browser') {
    try {
      await browser.storage.sync.set({ [key]: data });
    } catch (error) {
      console.error(error);
    }
  }
  if (browserType === 'chrome') {
    try {
      await chrome.storage.sync.set({ [key]: data });
    } catch (error) {
      console.error(error);
    }
  }
  if (browserType === 'local') {
    try {
      window.localStorage.setItem('Options', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }
};

/**
 * Grabs the Options data based on the context the app is running
 * @param key name of the object key
 **/
export const storageGet = async (key) => {
  const browserType = getBrowser();
  if (browserType === 'browser') {
    try {
      return await browser.storage.sync.get(key).then((res) => {
        return res.Options;
      });
    } catch (error) {
      console.error(error);
    }
  }
  if (browserType === 'chrome') {
    try {
      return await chromeGet(key).then((res) => {
        return res.Options;
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (browserType === 'local') {
    try {
      return JSON.parse(window.localStorage?.getItem(key));
    } catch (error) {
      console.error(error);
    }
  }
};
