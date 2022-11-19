import {
  clearForms,
  deleteClosest,
  dragRows,
  enableTextBox,
  inputDrag,
  optionsBtnOptions,
  scrollDown,
  toggleOptions,
} from '../helpers.js';
import options from '../options.js';
import { exportJson, importJson, storageGet } from '../storage.js';

const closeOptionsBtn = document.querySelector('.options__close');
const optionsBookmarksEl = document.querySelector('#bookmarks');
const optionsGitEl = document.querySelector('#git');
const weatherTypeEl = document.querySelector('#weather-type');
const stationsEl = document.querySelector('.options__inputs--weatherstations');

let optionsBookmarkFragment = new DocumentFragment();
let optionsGitFragment = new DocumentFragment();

const bookmarksOptions = (bName = '', bUrl = '', bIcon = '') => {
  const form = document.createElement('form');
  form.classList.add('options__forms--row', 'drag');
  const grabBtn = document.createElement('span');
  grabBtn.classList.add('btn--drag', 'options__grab');
  const grabIcon = document.createElement('i');
  grabIcon.classList.add('fas', 'fa-bars');
  const nameLabel = document.createElement('label');
  nameLabel.textContent = `Name: `;
  nameLabel.classList.add('options__labels');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Google';
  nameInput.classList.add('options__inputs', 'options__inputs--bookmarks');
  nameInput.value = bName;
  const urlLabel = document.createElement('label');
  urlLabel.textContent = `Url: `;
  urlLabel.classList.add('options__labels');
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.name = 'url';
  urlInput.placeholder = 'https://www.google.com';
  urlInput.classList.add('options__inputs', 'options__inputs--bookmarks');
  urlInput.value = bUrl;
  const iconLabel = document.createElement('label');
  iconLabel.textContent = `Icon: `;
  iconLabel.classList.add('options__labels');
  const iconInput = document.createElement('input');
  iconInput.type = 'text';
  iconInput.name = 'icon';
  iconInput.placeholder = 'fab fa-google';
  iconInput.classList.add('options__inputs', 'options__inputs--bookmarks');
  iconInput.value = bIcon;
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('btn', 'options__delete');
  const delIcon = document.createElement('i');
  delIcon.classList.add('far', 'fa-circle-xmark');

  grabBtn.append(grabIcon);
  nameLabel.append(nameInput);
  urlLabel.append(urlInput);
  iconLabel.append(iconInput);
  deleteBtn.append(delIcon);
  form.append(grabBtn, nameLabel, urlLabel, iconLabel, deleteBtn);
  optionsBookmarkFragment.append(form);
  optionsBookmarksEl.append(optionsBookmarkFragment);
};

const gitOptions = (gRepo = '', gBranch = '') => {
  const form = document.createElement('form');
  form.classList.add('options__forms--row', 'drag');
  const grabBtn = document.createElement('span');
  grabBtn.classList.add('btn--drag', 'options__grab');
  const grabIcon = document.createElement('i');
  grabIcon.classList.add('fas', 'fa-bars');
  const repoLabel = document.createElement('label');
  repoLabel.textContent = `Repo: `;
  repoLabel.classList.add('options__labels');
  const repoInput = document.createElement('input');
  repoInput.name = 'repo';
  repoInput.type = 'text';
  repoInput.placeholder = 'jnines/MyTab';
  repoInput.classList.add('options__inputs', 'options__inputs--git');
  repoInput.value = gRepo;
  const branchLabel = document.createElement('label');
  branchLabel.textContent = `Branch: `;
  branchLabel.classList.add('options__labels');
  const branchInput = document.createElement('input');
  branchInput.type = 'text';
  branchInput.name = 'branch';
  branchInput.placeholder = 'master';
  branchInput.classList.add('options__inputs', 'options__inputs--git');
  branchInput.value = gBranch;
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('btn', 'options__delete');
  const delIcon = document.createElement('i');
  delIcon.classList.add('far', 'fa-circle-xmark');
  deleteBtn.append(delIcon);

  grabBtn.append(grabIcon);
  repoLabel.append(repoInput);
  branchLabel.append(branchInput);
  form.append(grabBtn, repoLabel, branchLabel, deleteBtn);
  optionsGitFragment.append(form);
  optionsGitEl.append(optionsGitFragment);
};

const renderEl = () => {
  const optionsBtn = document.querySelector('.options-btn');

  const addBookmarksBtn = document.querySelector('.options__plus--bookmarks');
  if (!addBookmarksBtn.dataset.add) {
    addBookmarksBtn.dataset.add = true;
    addBookmarksBtn.addEventListener('click', (e) => {
      e.preventDefault();
      bookmarksOptions();
      scrollDown(optionsBookmarksEl);
      const dragEls = document.querySelectorAll('.drag');
      const dragBtns = document.querySelectorAll('.btn--drag');
      dragRows(optionsBookmarksEl);
      inputDrag(dragEls, dragBtns);
    });
  }
  const addGitBtn = document.querySelector('.options__plus--git');
  if (!addGitBtn.dataset.add) {
    addGitBtn.dataset.add = true;
    addGitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      gitOptions();
      scrollDown(optionsGitEl);
      const dragEls = document.querySelectorAll('.drag');
      const dragBtns = document.querySelectorAll('.btn--drag');
      dragRows(optionsGitEl);
      inputDrag(dragEls, dragBtns);
    });
  }
  document.body.addEventListener('load', () =>
    enableTextBox(weatherTypeEl, stationsEl)
  );

  weatherTypeEl.addEventListener('change', () =>
    enableTextBox(weatherTypeEl, stationsEl)
  );

  const saveBtn = document.querySelector('.options__save');

  saveBtn.removeEventListener('click', options);
  saveBtn.addEventListener('click', options);

  closeOptionsBtn.removeEventListener('click', toggleOptions);
  closeOptionsBtn.addEventListener('click', toggleOptions);

  optionsBtn.removeEventListener('click', optionsBtnOptions);
  optionsBtn.addEventListener('click', optionsBtnOptions);
};

export default async function (data) {
  const state = (await data) ?? (await storageGet('Options'));
  const colors = document.querySelector('#colors');
  const weatherType = document.querySelector('#weather-type');
  const weatherUnits = document.querySelector('#weather-units');
  const weatherKey = document.querySelector('#weather-key');
  const stations = document.querySelector('#stations');
  const gitKey = document.querySelector('#gitkey');
  const serverUrl = document.querySelector('#server-url');
  const serverRefresh = document.querySelector('#refresh-time');
  const exportBtn = document.querySelector('.options__export');
  const importInput = document.querySelector('#import-file');

  clearForms('.options__forms--row');
  renderEl();
  importInput.addEventListener('change', importJson);

  state?.bookmarks.forEach((bookmark) =>
    bookmarksOptions(bookmark.name, bookmark.url, bookmark.icon)
  );
  bookmarksOptions();
  state?.git.gitRepos.forEach((repo) => gitOptions(repo.repo, repo.branch));
  gitOptions();
  colors.checked = state?.colors === 'bright' ?? false;
  weatherType.checked = state?.weather.type === 'wu' ?? false;
  weatherUnits.checked = state?.weather.units === 'metric' ?? false;
  weatherKey.value = state?.weather.weatherKey ?? '';
  stations.value = state?.weather.stations.join(', ') ?? '';
  gitKey.value = state?.git.gitKey ?? '';
  serverUrl.value = state?.serverMon.url ?? '';
  serverRefresh.value = state?.serverMon.refresh ?? '';

  dragRows(optionsBookmarksEl);
  dragRows(optionsGitEl);
  enableTextBox(weatherTypeEl, stationsEl);
  const deleteBtn = document.querySelectorAll('.options__delete');
  deleteBtn?.forEach((btn) => {
    deleteClosest(btn, '.options__forms--row');
    btn.addEventListener('click', (e) => {
      e.target.closest('.options__forms--row').remove();
    });
  });

  const dragEls = document.querySelectorAll('.drag');
  const dragBtns = document.querySelectorAll('.btn--drag');
  inputDrag(dragEls, dragBtns);
  exportJson(state, exportBtn);
}
