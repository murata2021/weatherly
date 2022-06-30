import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";

export const getIconFromWeatherAPI = (iconstr) => {
  return `http://openweathermap.org/img/wn/${iconstr}@2x.png`;
};

export const formatCurrentWeatherData = (data) => {
  const { timezone, daily, current } = data;

  const { max, min } = daily[0].temp;
  const { temp, feels_like, humidity, weather, sunset, sunrise, dt } = current;
  let { description, icon } = weather[0];

  return {
    temp,
    feels_like,
    humidity,
    max,
    min,
    description,
    icon,
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    localTime: formatToLocalTime(dt, timezone),
  };
};

export const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

export const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

//TO FURTHER CLEAN LOCATION API RESULTS

const extractUniqueLocations = (locations) => {
  let uniqueTitles = [];
  let uniqueLocations = [];

  for (let location of locations) {
    if (!uniqueTitles.includes(location.title)) {
      uniqueLocations.push(location);
      uniqueTitles.push(location.title);
    }
  }
  return uniqueLocations;
};

//FORMATS LOCATION DATA

export const formatLocationData = (data) => {
  let locations = data
    .filter((el) => el["adminArea5"] !== "" && el["adminArea1"] !== "")
    .map((el, ind) => {
      let content;
      if (el["adminArea3"] !== "") {
        content = `${el["adminArea5"]}, ${el["adminArea3"]}, ${el["adminArea1"]} `;
      } else {
        content = `${el["adminArea5"]}, ${el["adminArea1"]} `;
      }
      return {
        id: uuidv4(),
        title: content,
        lat: el["latLng"].lat,
        lng: el["latLng"].lng,
      };
    });

  return extractUniqueLocations(locations);
};
