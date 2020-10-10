import React, {useEffect, useState} from 'react';
import './App.css';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
      const [persons, setPersons] = useState([]);
      const [newName, setNewName] = useState('');
      const [newNumber, setNewNumber] = useState('');
      const [newFilter, setNewFilter] = useState('');
      const [notificationMessage, setNotificationMessage] = useState(null);
      const [type, setType] = useState(null);

      useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons);
            });
      }, []);

      const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()));

      const addPerson = (event) => {
            event.preventDefault();
            const existingPerson = persons.find(person => person.name === newName);

            const newPerson = {
              name: newName,
              number: newNumber,
            };
            if (typeof existingPerson !== 'undefined') {
              if (window.confirm(
                  `${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.updatePerson(existingPerson.id, newPerson).then(updatedPerson => {
                      setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
                      setNotificationMessage(`Changed number of ${newName}`);
                    },
                ).catch(error => {
                  setNotificationMessage(`Information of ${newName} has already been removed from server`);
                  setPersons(persons.filter(person => person.name !== newName))
                  setType('error')
                });

              }
            } else {
              personService
                  .createPerson(newPerson)
                  .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                  });
              setNotificationMessage(
                  `Added ${event.target.value}`,
              );
            }
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
              setNotificationMessage(null);
              setType(null);
            }, 5000);
          }
      ;

      const deletePerson = id => {
        personService
            .deletePerson(id)
            .then(
                setPersons(persons.filter(person => person.id !== id)),
            );
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
            <Notification message={notificationMessage} type={type}/>
            <Filter handler={searchFilterChange}/>
            <h3>Add a new</h3>
            <PersonForm name={newName} number={newNumber} onNameChange={handleNameChange}
                        onNumberChange={handleNumberChange} submitNewPerson={addPerson}/>
            <h3>Numbers</h3>
            <Persons persons={personsToShow} deletePerson={deletePerson}/>
          </div>
      );
    }
;

export default App;