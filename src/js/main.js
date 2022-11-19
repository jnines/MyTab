import '../sass/main.scss';
import { darkHSL, lightHSL } from './config.js';
import {
  clearElements,
  escapeKeyOptions,
  fadeIn,
  optionsBtnOptions,
  renderBg,
  toggleOptions,
} from './helpers.js';
import { storageGet } from './storage.js';
import renderBookmarks from './views/renderBookmarks.js';
import renderGit from './views/renderGit.js';
import renderOptions from './views/renderOptions.js';
import renderOwmWeather from './views/renderOwmWeather.js';
import renderServerMon from './views/renderServerMon.js';
import renderWuWeather from './views/renderWuWeather.js';

export function renderPage(state) {
  const container = document.querySelector('.container');
  const optionsBtn = document.querySelector('.options-btn');
  const overlayEl = document.querySelector('.overlay');
  const bookmarksEl = document.querySelector('.bookmarks');
  const gitEl = document.querySelector('.git');
  const weatherEL = document.querySelector('.weather');
  const serverEl = document.querySelector('.server');
  const bookmarkLength = state?.bookmarks.length;
  const gitLength = state?.git.gitRepos.length;
  const serverURL = state?.serverMon.url;
  const weatherKey = state?.weather.weatherKey;
  clearElements();
  const elValues = [bookmarkLength, gitLength, serverURL, weatherKey].filter(
    Boolean
  ).length;
  renderBg(state?.colors === 'bright' ? lightHSL[0] : darkHSL[0]);

  if (!state) {
    toggleOptions();
    renderOptions();
    return;
  }
  /* Escape clauses */
  if (elValues <= 1) {
    container.classList.remove('container--multi');
    container.classList.add('container--single');
  }

  if (elValues > 1) {
    container.classList.remove('container--single');
    container.classList.add('container--multi');
  }

  if (!weatherKey) {
    weatherEL.classList.remove('flex');
    weatherEL.classList.add('no-display');

    if (bookmarkLength) bookmarksEl.style.gridRow = 'span 2';
  }

  if (!gitLength) {
    gitEl.classList.remove('grid');
    gitEl.classList.add('no-display');

    if (bookmarkLength) bookmarksEl.style.gridColumn = 'span 2';
  }

  if (!serverURL) {
    serverEl.classList.remove('flex');
    serverEl.classList.add('no-display');
  }

  if (bookmarkLength) {
    bookmarksEl.classList.add('grid');
    bookmarksEl.classList.remove('no-display');
    renderBookmarks(state.bookmarks, state.colors);
  }

  if (gitLength) {
    gitEl.classList.add('grid');
    gitEl.classList.remove('no-display');

    if (bookmarkLength) bookmarksEl.removeAttribute('style');
    renderGit(state.git);
  }

  if (serverURL) {
    serverEl.classList.add('flex');
    serverEl.classList.remove('no-display');
    renderServerMon(serverURL, state.colors);
    setInterval(
      renderServerMon,
      state.serverMon.refresh * 1000,
      serverURL,
      state.colors
    );
  }

  /* Geolocation and calling weather rendering function */
  const geoFail = () => {
    const weatherContainer = document.querySelector('.weather');
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    details.textContent = `Require location data to render weather`;
    summary.textContent = `Weather`;
    details.append(summary);
    weatherContainer.append(details);
    fadeIn(weatherContainer);
  };
  const geoSuccess = async (pos) => {
    const { latitude, longitude } = await pos.coords;
    weatherEL.classList.add('flex');
    weatherEL.classList.remove('no-display');
    sessionStorage.setItem('LAT', latitude);
    sessionStorage.setItem('LNG', longitude);
    if (state.weather.type === 'owm') {
      await renderOwmWeather(state.weather);
    }
    if (state.weather.type === 'wu') {
      await renderWuWeather(state.weather);
    }
  };
  if (navigator.geolocation && weatherKey) {
    serverEl.classList.add('flex');
    serverEl.classList.remove('no-display');
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
  }

  optionsBtn.removeEventListener('click', optionsBtnOptions);
  optionsBtn.addEventListener('click', optionsBtnOptions);

  overlayEl.removeEventListener('click', toggleOptions);
  overlayEl.addEventListener('click', toggleOptions);

  document.removeEventListener('keydown', escapeKeyOptions);
  document.addEventListener('keydown', escapeKeyOptions);

  renderOptions();
}

async function init() {
  const data = await storageGet('Options');
  renderPage(data);
}
init();
