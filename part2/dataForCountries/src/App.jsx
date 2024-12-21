import { useEffect, useState } from "react";
import findCountryService from "./services/findCountryService";
import fetchWeatherService from "./services/FetchWeatherService";
import ControlledInputComponent from "./ControlledInputComponent";
import TooManyCountriesWarningComponent from "./TooManyCountriesWarningComponent";
import countryModel from "./models/CountryModel";
import DisplayCountryComponent from "./DisplayCountryComponent";
import weatherModel from "./models/weatherModel";

function App() {
  const [countryFilter, setCountryFilter] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [tooManyCountriesWarning, setTooManyCountriesWarning] = useState("");
  const [singleCountry, setSingleCountry] = useState(null);

  useEffect(() => {
    async function getCountriesWithKeyword() {
      if (countryFilter) {
        const filteredCountries = await findCountryService.findCountries(
          countryFilter
        );
        console.log(filteredCountries);
        if (filteredCountries.length > 10) {
          await showMultipleCountriesWarning();
          return;
        }
        const mappedCountries = countryModel.mapCountries(filteredCountries);
        if (mappedCountries.length > 0) {
          if (mappedCountries.length > 1) {
            await showMultipleCountries(mappedCountries);
            return;
          }
          await showSingleCountry(filteredCountries[0]);
        } else {
          await resetCountryData();
        }
      } else {
        await resetCountryData();
      }
    }
    getCountriesWithKeyword();
  }, [countryFilter]);

  async function showMultipleCountriesWarning() {
    setTooManyCountriesWarning("too many countries, specify another filter");
    setFilteredCountries([]);
    await showSingleCountryDetails(null);
  }

  async function resetCountryData() {
    await showSingleCountryDetails(null);
    setTooManyCountriesWarning("");
    setFilteredCountries([]);
  }

  async function showMultipleCountries(mappedCountries) {
    setFilteredCountries(mappedCountries);
    await showSingleCountryDetails(null);
    setTooManyCountriesWarning("");
  }

  async function showSingleCountry(countryJson) {
    const mappedCountry = countryModel.countryFactory(countryJson);
    await showSingleCountryDetails(mappedCountry);
    setTooManyCountriesWarning("");
    setFilteredCountries([]);
  }

  async function showSingleCountryDetails(country) {
    if (country === null) {
      setSingleCountry(null);
      return;
    }
    const weatherJson = await fetchWeatherService.fetchWeatherData(country);
    const mappedWeather = weatherModel.weatherFactory(weatherJson);
    setSingleCountry({ ...country, ...mappedWeather });
  }

  return (
    <div>
      <form>
        find countries
        <ControlledInputComponent
          value={countryFilter}
          setValue={setCountryFilter}
        ></ControlledInputComponent>
      </form>
      <TooManyCountriesWarningComponent
        tooManyCountriesWarning={tooManyCountriesWarning}
      />
      <DisplayCountryComponent
        singleCountry={singleCountry}
        countries={filteredCountries}
        showSingleCountryDetails={showSingleCountryDetails}
      ></DisplayCountryComponent>
    </div>
  );
}

export default App;
