import CountriesComponent from "./CountriesComponent";
import CountryDetailComponent from "./CountryDetailComponent";
function DisplayCountryComponent(props) {
  const { singleCountry, countries, showSingleCountryDetails } = props;

  const isOnlyCountry = countries.length === 0;
  if (isOnlyCountry) {
    return <CountryDetailComponent singleCountry={singleCountry} />;
  }
  return (
    <div>
      <CountriesComponent
        countries={countries}
        singleCountry={singleCountry}
        showSingleCountryDetails={showSingleCountryDetails}
      />
      <CountryDetailComponent singleCountry={singleCountry} />
    </div>
  );
}

export default DisplayCountryComponent;
