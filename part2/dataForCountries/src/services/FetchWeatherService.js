import axios from "axios";

const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;
const basedWeatherApi = "https://api.openweathermap.org/data/2.5/weather?";

async function fetchWeatherData(countryJson) {
  let allWeathers = getAllWeathersFromStorage();
  const { lat, lon, name } = countryJson;
  if (!allWeathers[name]) {
    const weatherResponse = await axios.get(
      `${basedWeatherApi}lat=${lat}&lon=${lon}&appid=${weatherKey}`
    );

    const weatherData = weatherResponse.data;
    allWeathers[name] = weatherData;
    localStorage.setItem("allWeathers", JSON.stringify(allWeathers));
    return weatherData;
  }
  console.log('fetching from local storage');
  return allWeathers[name];
}

function getAllWeathersFromStorage() {
  let allWeathers = localStorage.getItem("allWeathers");
  if (!allWeathers) {
    allWeathers = {};
  } else {
    allWeathers = JSON.parse(allWeathers);
  }
  return allWeathers;
}

export default {
  fetchWeatherData,
};
