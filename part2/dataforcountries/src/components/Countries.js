import Country from './Country';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Countries = ({showCountryHandler, filter}) => {
  const [countries, setCountires] = useState([]);
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

  useEffect(() => {
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountires(response.data);
        });
  }, []);

  const onShowClick = (name) => {
    showCountryHandler(name);
  };

  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (<Country country={country}/>);
  } else if (filteredCountries.length > 10) {
    return (<div>Too many matches, specify another filter</div>);
  } else {
    return (<div>
      {filteredCountries.map(country => <div key={country.name}>{country.name}
        <button value={country.name} onClick={() => onShowClick(country.name)}>show</button>
      </div>)}
    </div>);
  }
};

export default Countries