function CountryDetailComponent(props) {
  const { singleCountry } = props;
  if (singleCountry) {
    return (
      <div>
        <div>
          <h1>{singleCountry.name}</h1>
          <p>capital {singleCountry.capital}</p>
          <p>area {singleCountry.area}</p>
          <h3>Languages:</h3>
          <CountryLanguages
            languages={singleCountry.languages}
          ></CountryLanguages>
          <img src={singleCountry.flag} alt={singleCountry.flagDesc} />
        </div>
        <CountryWeather singleCountry={singleCountry} />
      </div>
    );
  }
}

function CountryWeather(props) {
  const { singleCountry } = props;
  const { capital, temp, wind } = singleCountry;
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temparature is {temp}</p>
      <p>wind speed : {wind}</p>
    </div>
  );
}

function CountryLanguages(props) {
  const { languages } = props;
  return (
    <ul>
      {languages.map((lang) => {
        return (
          <li key={lang}>
            <p>{lang}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default CountryDetailComponent;
