import { weatherHeaders } from './config.js';
import { locale } from './helpers.js';
export default async function ({ units, weatherKey, type }) {
  const lat = sessionStorage.getItem('LAT');
  const lng = sessionStorage.getItem('LNG');
  const weatherURL =
    type === 'owm'
      ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=${units}&appid=${weatherKey}`
      : `https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${lat},${lng}&format=json&units=${
          units === 'imperial' ? 'e' : 'm'
        }&language=${locale}&apiKey=${weatherKey}`;
  if (lat && lng) {
    const forecastUrl = fetch(weatherURL, weatherHeaders).catch((error) =>
      console.error(error)
    );
    return (await forecastUrl).json();
  }
}
