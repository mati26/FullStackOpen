import React from 'react';

const Filter = ({setFilter}) => {
  const searchFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
      <div>find countries <input onChange={searchFilterChange}/></div>
  )
}

export default Filter