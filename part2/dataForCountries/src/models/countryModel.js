import { v4 as uuidv4 } from "uuid";

function countryFactory(countryJson) {
  const id = uuidv4();
  const name = countryJson.name.common;
  const capital = countryJson.capital[0];
  const area = countryJson.area;
  const languagesMap = new Map(Object.entries(countryJson.languages));
  const languages = Array.from(languagesMap.values());
  const flag = countryJson.flags.png;
  const flagDesc = countryJson.flags.alt;
  return {
    id: id,
    name: name,
    capital: capital,
    area: area,
    languages: languages,
    flag: flag,
    flagDesc: flagDesc,
    lat: countryJson.latlng[0],
    lon: countryJson.latlng[1],
  };
}

function mapCountries(countriesJson) {
  const countries = [];
  countriesJson.forEach((countryJson) => {
    countries.push(countryFactory(countryJson));
  });
  return countries;
}

export default {
  mapCountries,
  countryFactory,
};
