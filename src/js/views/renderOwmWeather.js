import { weatherIcon } from '../config.js';
import { capitalize, fadeIn } from '../helpers.js';
import weatherForecast from '../weatherForecast.js';
export default async function (obj) {
  const weatherContainer = document.querySelector('.weather');
  let weatherCurrentFragment = new DocumentFragment();
  let weatherForecastFragment = new DocumentFragment();
  try {
    const { current, daily: forecast } = await weatherForecast(obj);

    if (current && forecast) {
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weatherCur = document.createElement('weather-cur');
      weatherCur.classList.add('weather-cur', 'flex');
      const currentImg = document.createElement('i');
      currentImg.setAttribute(
        'class',
        `fas ${weatherIcon(current.weather[0].icon)}`
      );
      const curTooltip = document.createElement('span');
      curTooltip.classList.add('tooltip', 'tooltip--weather');
      curTooltip.textContent = `${capitalize(
        current.weather[0].description
      )}, Feels like ${Math.round(current.feels_like)}`;
      const currentTempDiv = document.createElement('div');
      currentTempDiv.classList.add('weather-cur__temp');
      currentTempDiv.textContent = `${Math.round(current.temp)}°`;
      weatherCur.append(curTooltip, currentImg, currentTempDiv);
      weatherCurrentFragment.append(weatherCur);

      /* Forecast */
      forecast.forEach((day) => {
        const date = new Date(day.dt * 1000);
        const dayName = daysOfWeek[date.getDay()];
        const dayBlock = document.createElement('div');
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('weather-fc__days');

        const weatherImg = document.createElement('i');
        weatherImg.setAttribute(
          'class',
          `fas ${weatherIcon(day.weather[0].icon)}`
        );
        const weatherColumn = document.createElement('div');
        weatherColumn.classList.add('weather-fc__column');
        const weatherTooltip = document.createElement('span');
        weatherTooltip.classList.add('tooltip', 'tooltip--weather');
        weatherTooltip.textContent = `${capitalize(
          day.weather[0].description
        )}`;
        const highDegDiv = document.createElement('div');
        highDegDiv.classList.add('weather-fc__highs');
        highDegDiv.textContent = `${Math.round(day.temp.max)}°`;
        const lowDegDiv = document.createElement('div');
        lowDegDiv.classList.add(
          'weather-fc__lows',
          'padding-sm--top',
          'padding-sm--bot'
        );
        lowDegDiv.textContent = `${Math.round(day.temp.min)}°`;
        dayHeader.append(dayName);
        weatherColumn.append(
          weatherTooltip,
          dayHeader,
          weatherImg,
          highDegDiv,
          lowDegDiv
        );
        dayBlock.append(weatherColumn);
        weatherForecastFragment.append(dayBlock);
      });
    }

    weatherContainer.append(weatherCurrentFragment, weatherForecastFragment);
    fadeIn(weatherContainer);
  } catch (error) {
    console.error(error);
  }
}
