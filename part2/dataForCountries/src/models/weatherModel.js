function weatherFactory(weatherJson) {
  console.log(weatherJson);
  const { main, wind } = weatherJson;
  return {
    temp: main.temp,
    wind: wind.speed,
  };
}

export default {
  weatherFactory,
};
