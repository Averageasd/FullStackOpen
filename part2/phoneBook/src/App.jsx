import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import personService from "./services/personService";
import FilterByNameForm from "./FilterByNameForm";
import Persons from "./Persons";
import AddPersonForm from "./AddPersonForm";
import Notification from "./Notification";
import notificationTypeConstants from "./constants/NotificationType";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    getPersons();
  }, [searchTerm]);

  async function getPersons() {
    try {
      let persons = await personService.getAllPersons();
      persons = filterPersonsWithName(persons);
      setPersons(persons);
    } catch (error) {
      createNotification(
        notificationTypeConstants.ERROR,
        "Failed to fetch persons"
      );
    }
  }

  async function addNewPerson() {
    const newPerson = {
      id: uuidv4(),
      name: newName,
      number: newNumber,
    };
    try {
      const personWithName = getPersonByName(newName);
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
      createNotification(
        notificationTypeConstants.SUCCESS,
        `Added ${newPerson.name}`
      );
      resetInputFields();
      await getPersons();
    } catch (error) {
      createNotification(
        notificationTypeConstants.SUCCESS,
        `Failed to save ${newPerson.name}`
      );
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
      createNotification(
        notificationTypeConstants.SUCCESS,
        `Updated ${personObject.name}`
      );
    } catch (error) {
      createNotification(
        notificationTypeConstants.ERROR,
        `Information of ${personObject.name} has already been removed from the phonebook`
      );
      await getPersons();
    }
  }
  async function deletePerson(id) {
    try {
      await personService.deletePerson(id);
      createNotification(
        notificationTypeConstants.SUCCESS,
        `Deleted person with id ${id}`
      );
      await getPersons();
    } catch (error) {
      createNotification(
        notificationTypeConstants.ERROR,
        `Failed to deleted person with id ${id}`
      );
    }
  }

  function getPersonByName(newName) {
    const personWithName = persons.find((person) => person.name === newName);
    return personWithName;
  }

  function createNotification(type, message) {
    setNotificationType(type);
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationType("");
      setNotificationMessage("");
    }, 5000);
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
      <Notification
        type={notificationType}
        message={notificationMessage}
      ></Notification>
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
