import React from 'react';

const PersonForm = ({name, number, onNameChange, onNumberChange, submitNewPerson}) => {
  return (
      <form>
        <div>name: <input value={name} onChange={onNameChange}/></div>
        <div>number: <input value={number} onChange={onNumberChange}/></div>
        <div>
          <button onClick={submitNewPerson} type="submit">add</button>
        </div>
      </form>
  );
};

export default PersonForm