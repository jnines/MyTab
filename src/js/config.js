/**
 * Max HSL lightness value for random colors
 **/
export const darkHSL = [
  [5, 15],
  [20, 35],
];
export const lightHSL = [
  [20, 30],
  [15, 30],
];

/**
 * Fetch headers
 * @param token the git token if available
 **/
export const gitHeaders = (token) => {
  return {
    method: 'GET',
    redirect: 'follow',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
      'User-Agent': 'MyTab',
    },
  };
};

/**
 * Formatting for git dates
 **/
export const gitDate = {
  hour: 'numeric',
  minute: 'numeric',
  month: 'long',
  day: '2-digit',
  year: 'numeric',
};

/**
 * Formatting for export file date
 **/
export const exportDate = {
  month: '2-digit',
  day: '2-digit',
  year: '2-digit',
};

/**
 * Simple header for weather fetch
 **/
export const weatherHeaders = new Headers({ 'Accept-Encoding': 'gzip' });

/**
 * Takes the icon code for weather api and returns the appropriate icon
 * * The use of map/set isn't necessary in any way.  Has better methods and faster in large data sets, which this isn't
 * @param iconNum icon code
 **/
export const weatherIcon = (iconNum) => {
  const iconName = new Map([
    [
      new Set([0, 1, 2, 17, 36, 43, '50d', '50n']).has(iconNum),
      'fa-exclamation',
    ],
    [new Set([3, 4, 37, 38, 47, '11d', '11n']).has(iconNum), 'fa-bolt'],
    [
      new Set([5, 6, 7, 10, 13, 14, 15, 16, 18, 41, 42, 46, '13d', '13n']).has(
        iconNum
      ),
      'fa-snowflake',
    ],
    [new Set([19, 20, 21, 22]).has(iconNum), 'fa-smog'],
    [new Set([23, 24]).has(iconNum), 'fa-wind'],
    [new Set([26, '03d', '03n', '04d', '04n']).has(iconNum), 'fa-cloud'],
    [new Set([28, 30, '02d']).has(iconNum), 'fa-cloud-sun'],
    [new Set([27, 29, '02n']).has(iconNum), 'fa-cloud-moon'],
    [new Set([32, 34, '01d']).has(iconNum), 'fa-sun'],
    [new Set([31, 33, '01n']).has(iconNum), 'fa-moon'],
    [
      new Set([8, 9, 11, 12, 39, 45, '09d', '09n', '10d', '10n']).has(iconNum),
      'fa-cloud-rain',
    ],
    [new Set([44, null]).has(iconNum), 'fa-slash'],
  ]);
  return iconName.get(true) ?? 'fa-poo-storm';
};
