import ControlledInput from "./ControlledInput";
const AddPersonForm = (props) => {
  const { addNewPerson, setNewName, setNewNumber, newName, newNumber } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewPerson();
      }}
    >
      <div>
        name:
        <ControlledInput
          setValueForInput={setNewName}
          valueForInput={newName}
        />
      </div>
      <div>
        number:
        <ControlledInput
          setValueForInput={setNewNumber}
          valueForInput={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
