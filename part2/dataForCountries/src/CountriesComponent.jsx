function CountriesComponent(props) {
  const { countries, singleCountry, showSingleCountryDetails } = props;
  return (
    <ul>
      {countries.map((country) => {
        const isCountryDetailShow =
          singleCountry !== null && singleCountry.id === country.id;
        return (
          <CountryNameComponent
            key={country.id}
            name={country.name}
            showSingleCountryDetails={showSingleCountryDetails}
            country={country}
            isCountryDetailShow={isCountryDetailShow}
          />
        );
      })}
    </ul>
  );
}

function CountryNameComponent(props) {
  const { name, showSingleCountryDetails, country, isCountryDetailShow } =
    props;
  return (
    <li>
      <p>{name}</p>
      <ShowCountryDetailButton
        showSingleCountryDetails={showSingleCountryDetails}
        country={country}
        isCountryDetailShow={isCountryDetailShow}
      />
    </li>
  );
}

function ShowCountryDetailButton(props) {
  const { showSingleCountryDetails, country, isCountryDetailShow } = props;
  if (!isCountryDetailShow) {
    return (
      <button
        onClick={async () => {
          await showSingleCountryDetails(country);
        }}
      >
        show
      </button>
    );
  }
  return (
    <button
      onClick={async () => {
        await showSingleCountryDetails(null);
      }}
    >
      hide
    </button>
  );
}

export default CountriesComponent;
