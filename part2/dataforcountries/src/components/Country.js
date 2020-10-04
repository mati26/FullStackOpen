import Weather from './Weather';
import React from 'react';

const Country = ({country}) => {
  return (
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
        </ul>
        <div>
          <img src={country.flag} alt="flag" width="100" height="100"/>
        </div>
        <Weather country={country}/>
      </div>
  );
};

export default Country