import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

async function getAllPersons() {
  const personsRes = await axios.get(baseUrl);
  return personsRes.data;
}

async function addNewPerson(newPerson) {
  await axios.post(baseUrl, newPerson);
}

async function getPersonByName(name) {
  const person = await axios.get(`${baseUrl}?name=${name}`);
  return person.data;
}

async function deletePerson(id) {
  await axios.delete(`${baseUrl}/${id}`);
}

async function updatePerson(id, personObject) {
  await axios.put(`${baseUrl}/${id}`, personObject);
}

export default {
  getAllPersons,
  addNewPerson,
  getPersonByName,
  deletePerson,
  updatePerson,
};
