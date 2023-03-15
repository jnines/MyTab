import {
  getForms,
  getToggles,
  stripSpaces,
  toggleOptions,
  urlToRepo,
} from './helpers.js';
import { renderPage } from './main.js';
import { storageSet } from './storage.js';

export default async function () {
  const optionsBookmarksEl = document.querySelector('#bookmarks');
  const optionsGitEl = document.querySelector('#git');
  const [colors] = getToggles('#colors');
  const [bookmarksForm, gitReposForm] = getForms(
    optionsBookmarksEl,
    optionsGitEl
  );

  const bookmarks = bookmarksForm.filter(
    (bm) =>
      bm.name !== undefined && bm.url !== undefined && bm.icon !== undefined
  );

  const gitRepos = urlToRepo(
    stripSpaces(
      gitReposForm.filter((r) => r.repo !== undefined && r.branch !== undefined)
    )
  );

  const [type, units] = getToggles('#weather-type', '#weather-units').values();
  const stationArr = document
    .querySelector('#stations')
    .value.replaceAll(/\s/g, '')
    .split(',');

  const options = {
    colors,
    bookmarks,
    git: {
      gitRepos,
      gitKey: document.querySelector('#gitkey').value,
    },
    weather: {
      type,
      units,
      weatherKey: document.querySelector('#weather-key').value,
      stations: stationArr,
    },
    serverMon: {
      url: document.querySelector('#server-url').value,
      refresh: document.querySelector('#refresh-time').value,
    },
  };

  storageSet('Options', options);
  renderPage(options);
  toggleOptions();
}
