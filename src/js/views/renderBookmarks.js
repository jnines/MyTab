import { darkHSL, lightHSL } from '../config.js';
import { innerQuotes, randHSL } from '../helpers.js';

export default function (arr) {
  let bookmarkFragment = new DocumentFragment();
  const bookmarksEl = document.querySelector('.bookmarks');
  try {
    arr.forEach((bookmark, colors) => {
      const aHref = document.createElement('a');
      aHref.classList.add('bookmarks__link');
      aHref.href = bookmark?.url;
      aHref.title = bookmark?.name;
      const bmContainer = document.createElement('div');
      bmContainer.classList.add('bookmarks__container');
      bmContainer.style.backgroundColor = randHSL(
        colors === 'dark' ? darkHSL[1] : lightHSL[1]
      );
      const img = document.createElement('i');
      img.setAttribute(
        'class',
        `${
          (bookmark?.icon).includes('<i')
            ? innerQuotes(bookmark.icon)
            : bookmark.icon
        }`
      );
      img.alt = bookmark?.name;
      const innerDiv = document.createElement('div');
      innerDiv.classList.add('bookmarks__title');
      innerDiv.textContent = bookmark?.name;
      bmContainer.append(aHref, img, innerDiv);
      bookmarkFragment.append(bmContainer);
    });
    bookmarksEl.append(bookmarkFragment);
  } catch (error) {
    console.error(error);
  }
}
