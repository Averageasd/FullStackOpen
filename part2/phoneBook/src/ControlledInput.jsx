const ControlledInput = (props) => {
  const { setValueForInput, valueForInput } = props;
  return (
    <input
      value={valueForInput}
      onChange={(e) => {
        setValueForInput(e.target.value);
      }}
    />
  );
};

export default ControlledInput;
