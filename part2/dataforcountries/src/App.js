import React, {useState} from 'react';
import './App.css';
import Countries from './components/Countries';
import Filter from './components/Filter';

function App() {
  const [filter, setFilter] = useState('');

  return (
      <div>
        <Filter setFilter={setFilter}/>
        <Countries showCountryHandler={setFilter} filter={filter}/>
      </div>
  );
}

export default App;
