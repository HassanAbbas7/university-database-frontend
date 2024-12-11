import React, { useState } from "react";


const CountryAutocomplete = ({allCities, setCityFilter, cityFilter}) => {
    

  const [suggestions, setSuggestions] = useState([]);

  const handleCityInputChange = (e) => {
    const query = e.target.value;
    setCityFilter(query);

    if (query) {
      const filteredSuggestions = allCities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    setCityFilter(city);
    setSuggestions([]); // Hide suggestions after selection
  };

  return (
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Type a country name"
            value={cityFilter}
            onChange={handleCityInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="list-group mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
  );
};

export default CountryAutocomplete;
