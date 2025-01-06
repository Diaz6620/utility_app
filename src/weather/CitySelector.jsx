import React from "react"
import  { cities }  from "./cities"

const CitySelector = ({ selectedCity, onCityChange }) => {
  return (
    <div>
      <label htmlFor="city-select">Selecciona una provincia: </label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CitySelector
