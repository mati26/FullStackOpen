import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.some(person => person.name === newName);

    if (personExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const searchFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter handler={searchFilterChange}/>
        <h3>Add a new</h3>
        <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange}
                    onNumberChange={handleNumberChange} submitNewPerson={addPerson}/>
        <h3>Numbers</h3>
        <Persons persons={personsToShow}/>
      </div>
  );
};

export default App;