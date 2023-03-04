import { darkHSL, lightHSL } from '../config.js';
import { capitalize, fadeIn, randHSL } from '../helpers.js';

import serverMonitorData from '../serverMonitorData.js';
export default async function (url, colors) {
  const serverMonitor = document.querySelector('.server');
  let serverMonitorFragment = new DocumentFragment();
  try {
    const data = await serverMonitorData(url);

    data.forEach((arr) => {
      const status = document.createElement('div');
      status.classList.add(
        'server__status',
        `${
          arr?.status === 'online'
            ? 'server__status--on'
            : 'server__status--off'
        }`
      );
      status.textContent = `${capitalize(arr?.status)}`;
      const title = document.createElement('div');
      title.setAttribute('class', 'server__title');
      title.textContent = capitalize(arr?.name);
      const img = document.createElement('i');
      img.setAttribute('class', `${arr?.fa_icon}`);
      img.style.color = randHSL(
        colors.colors === 'dark' ? [...darkHSL[1]] : [...lightHSL[1]]
      );
      img.alt = arr?.name;
      const aHref = document.createElement('a');
      aHref.classList.add('server__link');
      aHref.href = arr?.url;
      aHref.target = '_blank';
      aHref.ariaLabel = arr?.name;
      aHref.title = arr?.name;
      const smContainer = document.createElement('div');
      smContainer.classList.add('server__container');

      smContainer.append(aHref, img, title, status);
      serverMonitorFragment.append(smContainer);
    });
    serverMonitor.textContent = '';
    serverMonitor.append(serverMonitorFragment);
    fadeIn(serverMonitor);
  } catch (error) {
    console.error(error);
  }
}
