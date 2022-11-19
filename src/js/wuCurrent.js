import { weatherHeaders } from './config.js';
export default async function ({ stations, units, weatherKey }) {
  const currentUrls = stations.map((station) =>
    fetch(
      `https://api.weather.com/v2/pws/observations/current?stationId=${station}&format=json&units=${
        units == 'imperial' ? 'e' : 'm'
      }&apiKey=${weatherKey}`,
      weatherHeaders
    ).catch((error) =>
      console.error(`One or more of the servers is unreachable: ${error}`)
    )
  );
  const res = await Promise.any(currentUrls);
  return (await res).json();
}
