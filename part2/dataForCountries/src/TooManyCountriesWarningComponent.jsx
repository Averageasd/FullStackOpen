function TooManyCountriesWarningComponent(props) {
  const { tooManyCountriesWarning } = props;
  if (tooManyCountriesWarning === "") {
    return null;
  }
  return <p>{tooManyCountriesWarning}</p>;
}

export default TooManyCountriesWarningComponent;
