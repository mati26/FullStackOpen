import React from 'react';

const Person = ({person, deletePerson}) => {

  const handleDelete = (event) => {
    if (window.confirm(`Delete ${event.target.value} ?`)) {
      deletePerson(person.id);
    }
  };

  return (
      <div>
        {person.name} {person.number}
        <button value={person.name} onClick={handleDelete}>delete</button>
      </div>
  );
};

const Persons = ({persons, deletePerson}) => {
  return (
      <div>{persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}</div>
  );
};

export default Persons;