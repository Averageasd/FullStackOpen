import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

async function findCountries(keyword) {
  const countriesRes = await axios.get(`${baseUrl}`);
  const countries = countriesRes.data;
  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(keyword.toLowerCase())
  );
}

export default {
  findCountries,
};
