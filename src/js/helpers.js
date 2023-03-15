import { gitDate } from './config.js';
import options from './options.js';

/**
 * Grabs user locale for formatting purposes
 **/
export const locale = navigator.language;

/**
 * Splits string at spaces/hyphens and capitalizes
 * @param str string to be modified
 **/
export const capitalize = (str) => {
  const splitter = str.includes('-') ? '-' : ' ';
  const strSplit = str.split(/[- ]+/);
  const upperCase = strSplit.map(
    (str) => str[0].toUpperCase() + str.slice(1).toLowerCase()
  );
  return upperCase.join(splitter);
};

/**
 * Give a fade-in effect.
 * @param el must have opacity = 0 and visibility set to hidden
 **/
export const fadeIn = (el) => {
  el.style.opacity = 1;
  el.style.visibility = 'visible';
};

/**
 * Enables an input element
 * @param checkbox if checked will enable
 * @param textbox input element
 **/
export const enableTextBox = (checkbox, textbox) => {
  checkbox.checked
    ? textbox.removeAttribute('disabled')
    : textbox.setAttribute('disabled', 'disabled');
};

/**
 * Generates random number, floored so lowest value is possible
 * @param num numeric value input
 **/
export const randFloor = (num) => Math.floor(Math.random() * num);

/**
 * Generates random number
 * @param min lowest possible value
 * @param max highest possible value
 **/
export const randRange = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

/**
 * Generates random direction for gradient between 21deg and 341deg
 **/
export const bgGradientDirection = () => Math.ceil(Math.random() * 320) + 20;

/**
 * Generates a random HSL color code
 * * hue at 360 allows for any color
 * * saturation between 15 and 25 allows for dim pastels
 * @param light lightness range, values pulled from ./config.js and selected by user
 **/
export const randHSL = (light) =>
  `hsl(${randFloor(360)}, ${randRange(15, 25)}%, ${randRange(
    light[0],
    light[1]
  )}%)`;

/**
 * Generates random background gradient, values pulled from ./config.js and selected by user
 * @param colors array of color value arrays
 **/
export const renderBg = (...colors) => {
  document.body.style.backgroundImage = `linear-gradient(${bgGradientDirection()}deg, ${randHSL(
    ...colors
  )}, ${randHSL(...colors)}, ${randHSL(...colors)}), none`;
};

/**
 * Formats dates based on user locale, format pulled from ./config.js
 * @param str date to be formatted
 **/
export const formatDateGit = (str) => str.toLocaleString(locale, gitDate);

/**
 * Takes an array of elements and toggles a class on each
 * @param elArr array of elements
 * @param elClass class to be toggled
 **/
const toggleEl = (elArr, elClass) => {
  elArr.forEach((el) => el.classList.toggle(elClass));
};

/**
 * Sets the Open/showModal to make the background inert for accessability/tab-ability
 **/
export const toggleModal = () => {
  const modalEl = document.querySelector('.modal');
  modalEl.open ? modalEl.close() : modalEl.showModal();
};

/**
 * Toggles Options and overlay modal visibility
 **/
export const toggleOptions = (e) => {
  const modalEl = document.querySelector('.modal');
  const overlayEl = document.querySelector('.overlay');
  toggleEl([modalEl, overlayEl], 'hidden');
  toggleModal();
};

export const toggleOptionsKey = (e) => {
  if ((e && e.key === 'Enter') || (e && e.key === ' ')) {
    toggleOptions();
  }
};

export const optionsKey = (e) => {
  if ((e && e.key === 'Enter') || (e && e.key === ' ')) {
    options();
  }
};

/**
 * Removes all children elements from parent
 * @param els array of parent elements
 **/
export const clearEl = (...els) => {
  els.forEach((el) => {
    while (el?.firstChild) {
      el.removeChild(el.firstChild);
    }
  });
};

/**
 * Creates array of parent elements to have their child elements removed
 **/
export const clearElements = () => {
  const bookmarksEl = document.querySelector('.bookmarks');
  const gitReposEl = document.querySelector('.git');
  const weatherEl = document.querySelector('.weather');
  const serverMonitor = document.querySelector('.server');

  clearEl(bookmarksEl, gitReposEl, weatherEl, serverMonitor);
};

/**
 * Grabs the rows to drag and finds their location relative to other rows
 * @param container the element containing the rows
 * @param y the vertical offset relative to sibling elements
 **/
const getDragAfterElement = (container, y) => {
  const rows = [...container.querySelectorAll('.drag:not(.dragging)')];

  return rows.reduce(
    (closest, child) => {
      const rect = child.getBoundingClientRect();
      const offset = y - rect.top - rect.height / 2;
      if (offset < 0 && offset > closest.offset)
        return { offset, element: child };
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
};

/**
 * Adding event listeners to the rows adding/removing classes relative to events
 * ? Using the dataset to make sure multiple of the same listener isn't applied.  Feels hacky.  There's also the issue of having multiple containers, maybe HTML5 DragAndDrop isn't the way to go?
 * @param container the element containing the rows
 **/
export const dragRows = (container) => {
  const rows = document.querySelectorAll('.drag');
  rows.forEach((row) => {
    if (!row.dataset.dragstart) {
      row.dataset.dragstart = true;
      row.addEventListener('dragstart', () => {
        row.classList.add('dragging');
      });
    }

    if (!row.dataset.dragend) {
      row.dataset.dragend = true;
      row.addEventListener('dragend', () => {
        row.classList.remove('dragging');
      });
    }
  });

  if (!container.dataset.dragover) {
    container.dataset.dragover = true;
    container.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const dragged = document.querySelector('.dragging');
      if (afterElement === null) container.append(dragged);
      container.insertBefore(dragged, afterElement);
    });
  }
};

/**
 * Add listeners to a drag button located in each row
 * * The container event is added because setting a row as draggable = true (at least in FF) no longer allows the user to select the text in the input elements, otherwise it would just be set in the HTML
 * @param containers array of rows
 * @param grabBtns array of the drag buttons on each row
 **/
export const inputDrag = (containers, grabBtns) => {
  containers.forEach((container, i) => {
    grabBtns[i].addEventListener(
      'mousedown',
      () => (container.draggable = true)
    );
    grabBtns[i].addEventListener(
      'mouseup',
      () => (container.draggable = false)
    );
    container.addEventListener('dragend', () => (container.draggable = false));
  });
};

/**
 * Removes the element so that you don't end up with duplicates
 **/
export const clearForms = (els) => {
  document.querySelectorAll(els).forEach((el) => el.remove());
};

/**
 * Options button listeners callback that toggles the options element and scrolls to the top
 **/
export const optionsBtnOptions = () => {
  toggleOptions();
  scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

export const optionsBtnKey = (e) => {
  if ((e && e.key === 'Enter') || (e && e.key === ' ')) {
    optionsBtnOptions();
  }
};

/**
 * Escape key listener callback for closing Options modal
 **/
export const escapeKeyOptions = (e) => {
  const modalEl = document.querySelector('.modal');
  if (e.key === 'Escape' && !modalEl.classList.contains('hidden'))
    toggleOptions();
};

/**
 * Simple scroll down effect, used when adding new rows in the Options section
 * @param container the container container said rows
 **/
export const scrollDown = (container) => {
  container.scrollTop = container.scrollHeight;
};

/**
 * Listener for delete button to remove it's containing row
 * @param btn array of delete buttons
 * @param el element to remove
 **/
export const deleteClosest = (btn, el) => {
  btn.addEventListener('click', (e) => {
    e.target.closest(el).remove();
  });
};

/**
 * Gathers input values from form fields to be stored
 * @param els array of elements containing the rows that contain the input fields
 **/
export const getForms = (...els) =>
  els.map((el) => {
    const res = [...el.querySelectorAll('form')].map((v) => {
      const obj = {};
      v.querySelectorAll('input').forEach((ele) =>
        ele.value == '' ? null : (obj[ele.name] = ele.value)
      );
      return obj;
    });
    return res;
  });

/**
 * Gathers the checked/not checked value from checkboxes used in toggles
 * @param els array of checkboxes
 **/
export const getToggles = (...els) => {
  return els.map((el) => {
    const ele = document.querySelector(el);
    return ele.checked ? ele.dataset.on : ele.dataset.off;
  });
};

/**
 * Strip spaces from user input
 * @param obj the input
 **/
export const stripSpaces = (obj) => {
  return JSON.parse(JSON.stringify(obj).replaceAll(/\s/g, ''));
};

/**
 * Pulls string from within double quotes
 * @param str string to be manipulated
 **/
export const innerQuotes = (str) => {
  if (str.startsWith('<i')) {
    return str.split('"')[1];
  }
};

/**
 * Convert any object repo properties from URl into useable repo property
 * @param arr array of objects to be potentially converted
 **/
export const urlToRepo = (arr) => {
  const repo = arr.map((obj) => {
    const urlParts = obj.repo.split('/');
    return {
      ...obj,
      repo: `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`,
    };
  });
  return repo;
};
