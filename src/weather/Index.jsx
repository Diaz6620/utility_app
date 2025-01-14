import { useState, useEffect } from "react"
import CitySelector from "./CitySelector"
import styles from './Index.module.css'

const apiKey = import.meta.env.VITE_API_KEY

function Weather() {
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [city, setCity] = useState("Madrid")

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del clima")
                }
                const data = await response.json()
                setWeatherData(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchWeather()
    }, [city])

    return (
        <div className={styles.mainContainer}>
            <CitySelector selectedCity={city} onCityChange={setCity} /> 
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Hubo un error: {error}</p>
            ) : weatherData ? (
            <>
                <div className={styles.mainData}>
                    <div>
                        <p>{weatherData.location.name}</p>
                        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
                    </div>
                    <div>
                        <p>Temperatura: {weatherData.current.temp_c}ºC</p>
                        <p>Viento: {weatherData.current.wind_kph}Kph</p>
                        <p>Humedad: {weatherData.current.humidity}%</p>
                    </div>
                </div>
                <div className={styles.secData}>
                    {weatherData.forecast.forecastday[0].hour.map((hourData, index) => (
                        <div key={index} className={styles.forecast}>
                            <p>{hourData.time}</p>
                            <img
                                src={`https:${hourData.condition.icon}`}
                                alt={hourData.condition.text}
                                style={{ width: '50px', height: '50px' }}
                            />
                            <p>{hourData.temp_c}°C</p>
                        </div>
                    ))}
                </div>
            </>
            ) : null}
        </div>
    )
}

export default Weather
