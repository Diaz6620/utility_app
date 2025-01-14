import React from "react"
import  { cities }  from "./cities"
import styles from './CitySelector.module.css'



const CitySelector = ({ selectedCity, onCityChange }) => {
    return (
        <div>
            <label htmlFor="city-select" className={styles.label}>Selecciona una provincia: </label>
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
