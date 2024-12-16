import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import personService from "./services/personService";
import FilterByNameForm from "./FilterByNameForm";
import Persons from "./Persons";
import AddPersonForm from "./AddPersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: uuidv4() },
    { name: "Ada Lovelace", number: "39-44-5323523", id: uuidv4() },
    { name: "Dan Abramov", number: "12-43-234345", id: uuidv4() },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: uuidv4() },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getPersons();
  }, [searchTerm]);

  async function getPersons() {
    try {
      let persons = await personService.getAllPersons();
      persons = filterPersonsWithName(persons);
      setPersons(persons);
    } catch (error) {
      alert("Fail to fetch persons!");
    }
  }

  async function addNewPerson() {
    try {
      const newPerson = {
        id: uuidv4(),
        name: newName,
        number: newNumber,
      };
      const personWithName = await getPersonByName(newName);
      if (personWithName) {
        if (
          window.confirm(
            `${newName} is already added to the phonebook, replace the old number with the new one?`
          )
        ) {
          await updatePerson(personWithName.id, {
            ...personWithName,
            number: newPerson.number,
          });
        }
        return;
      }
      await personService.addNewPerson(newPerson);
      resetInputFields();
      await getPersons();
    } catch (error) {
      alert("failed to save new person!");
    }
  }

  function resetInputFields() {
    setNewName("");
    setNewNumber("");
  }

  async function updatePerson(id, personObject) {
    try {
      await personService.updatePerson(id, personObject);
      resetInputFields();
      await getPersons();
    } catch (error) {
      alert("failed to update person!");
    }
  }
  async function deletePerson(id) {
    try {
      await personService.deletePerson(id);
      await getPersons();
    } catch (error) {
      alert("failed to delete person!");
    }
  }

  async function getPersonByName(newName) {
    try {
      const personWithName = await personService.getPersonByName(newName);
      if (personWithName.length > 0) {
        return personWithName[0];
      }
      return null;
    } catch (error) {
      alert("failed to fetch person!");
    }
  }

  function filterPersonsWithName(persons) {
    let filteredPersons = [...persons];
    filteredPersons = filteredPersons.filter((person) =>
      person.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    return filteredPersons;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterByNameForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddPersonForm
        addNewPerson={addNewPerson}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} deletePerson={deletePerson}></Persons>
    </div>
  );
};

export default App;
