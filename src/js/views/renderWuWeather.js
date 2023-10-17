import { weatherIcon } from '../config.js';
import { fadeIn } from '../helpers.js';
import weatherForecast from '../weatherForecast.js';
import wuCurrent from '../wuCurrent.js';
export default async function (obj) {
  const weatherContainer = document.querySelector('.weather');
  let weatherCurrentFragment = new DocumentFragment();
  let weatherForecastFragment = new DocumentFragment();
  try {
    const current = await wuCurrent(obj);
    const forecast = await weatherForecast(obj);
    if (current && forecast) {
      const referrer = current.observations[0].stationID;
      const dayIcons = forecast.daypart[0].iconCode.filter(
        (_, index) => index % 2 === 0
      );
      const nightIcons = forecast.daypart[0].iconCode.filter(
        (_, index) => index % 2 === 1
      );
      const forecastHigh = forecast.temperatureMax;
      const forecastLow = forecast.temperatureMin;
      const dayNarratives = forecast.daypart[0].narrative.filter(
        (_, index) => index % 2 === 0
      );
      const nightNarratives = forecast.daypart[0].narrative.filter(
        (_, index) => index % 2 === 1
      );
      const aHref = document.createElement('a');
      aHref.classList.add('weather__link');
      aHref.href = `https://www.wunderground.com/forecast/${referrer}`;
      aHref.ariaLabel = 'Weather Underground Forecast';
      aHref.title = 'Weather Underground Forecast';
      /* Create Current Weather */
      const weatherCur = document.createElement('div');
      weatherCur.classList.add('weather-cur', 'flex');
      const currentImg = document.createElement('i');
      currentImg.setAttribute(
        'class',
        `fas ${
          !dayIcons[0] ? weatherIcon(nightIcons[0]) : weatherIcon(dayIcons[0])
        }`
      );
      currentImg.alt = 'Current weather conditions';
      const curTooltip = document.createElement('span');
      curTooltip.classList.add('tooltip', 'tooltip--weather', 'tooltip--short');
      curTooltip.textContent = `Feels like ${
        current.observations[0].imperial?.heatIndex ||
        current.observations[0].metric?.heatIndex ||
        current.observations[0].uk_hybrid?.heatIndex ||
        current.observations[0].imperial?.windChill ||
        current.observations[0].metric?.windChill ||
        current.observations[0].uk_hybrid?.windChill ||
        'Current weather stats not available'
      }°`;
      const currentTempDiv = document.createElement('div');
      currentTempDiv.classList.add('weather-cur__temp');
      currentTempDiv.textContent = `${
        current.observations[0].imperial?.temp ||
        current.observations[0].metric?.temp ||
        current.observations[0].uk_hybrid?.temp ||
        'X'
      }°`;
      weatherCur.append(curTooltip, currentImg, currentTempDiv);
      weatherCurrentFragment.append(weatherCur);
      /* Create forecast */
      const weatherFc = document.createElement('div');
      weatherFc.classList.add('weather-fc', 'flex');
      forecast.dayOfWeek.forEach((day, i) => {
        const dayBlock = document.createElement('div');
        const weatherDaysDiv = document.createElement('div');
        weatherDaysDiv.classList.add('weather-fc__days');
        weatherDaysDiv.textContent = `${day.slice(0, 3).toUpperCase()}`;
        const weatherColumn = document.createElement('div');
        weatherColumn.classList.add('weather-fc__column');
        const weatherTooltip = document.createElement('div');
        weatherTooltip.classList.add('tooltip', 'tooltip--weather');
        weatherTooltip.textContent = `${
          dayNarratives[i]
            ? `${day}: 
            ${dayNarratives[i]}
            
            ${day} evening:
            ${nightNarratives[i]}`
            : `${day} evening:
            ${nightNarratives[i]}`
        }`;
        const dayIconsImg = document.createElement('i');
        dayIconsImg.setAttribute('class', `fas ${weatherIcon(dayIcons[i])}`);
        dayIconsImg.alt = 'Day time weather images';
        const highDegDiv = document.createElement('div');
        highDegDiv.classList.add('weather-fc__highs');
        highDegDiv.textContent = `${
          !forecastHigh[i] ? '--' : forecastHigh[i] + `°`
        }`;
        highDegDiv.alt = 'High temperature for the day';
        const nightIconsImg = document.createElement('i');
        nightIconsImg.setAttribute(
          'class',
          `fas ${weatherIcon(nightIcons[i])}`
        );
        nightIconsImg.alt = 'Night time weather images';
        const lowDegDiv = document.createElement('div');
        lowDegDiv.classList.add('weather-fc__lows');
        lowDegDiv.textContent = `${forecastLow[i]}°`;
        lowDegDiv.alt = 'Low temperature for the day';
        weatherColumn.append(dayIconsImg, highDegDiv, nightIconsImg, lowDegDiv);
        weatherDaysDiv.append(weatherTooltip);
        dayBlock.append(weatherDaysDiv, weatherColumn);
        weatherFc.append(dayBlock);
        weatherForecastFragment.append(weatherFc);
      });
      weatherContainer.append(
        aHref,
        weatherCurrentFragment,
        weatherForecastFragment
      );
      fadeIn(weatherContainer);
    }
  } catch (error) {
    console.error(error);
  }
}
