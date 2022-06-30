import axios from "axios";
import KEYS from "../apiKeys";

export const getWeather = async (lat, lng, units) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${units}&appid=${KEYS.OPEN_WEATHER}`
  );
};

export const searchLocation = async (inputValue) => {
  return axios.get(
    `https://www.mapquestapi.com/geocoding/v1/address?key=${KEYS.MAP_QUEST}&location=${inputValue}`
  );
};
