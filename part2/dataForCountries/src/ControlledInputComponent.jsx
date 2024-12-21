function ControlledInputComponent(props) {
  const { value, setValue } = props;
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}

export default ControlledInputComponent;
