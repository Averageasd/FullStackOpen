const Persons = (props) => {
  const { persons, deletePerson } = props;
  return (
    <ul>
      {persons.map((person) => {
        const { name, number, id } = person;
        return (
          <li key={id}>
            {name} {number}
            <button
              onClick={async () => {
                if (window.confirm(`Delete ${name}?`)) {
                  await deletePerson(id);
                }
              }}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
