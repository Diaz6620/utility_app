import { useState, useEffect } from "react"
import CitySelector from "./CitySelector"

function Weather() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [city, setCity] = useState("Madrid")

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=812f1314d5e54007a3d92843241907&q=${city}&aqi=no`);
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
    <div>
      <CitySelector selectedCity={city} onCityChange={setCity} />
      
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Hubo un error: {error}</p>
      ) : weatherData ? (
        <>
          <div>
            <p>{weatherData.location.name}</p>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <p>Temperatura: {weatherData.current.temp_c}ºC</p>
            <p>Viento: {weatherData.current.wind_kph}Kph</p>
            <p>Humedad: {weatherData.current.humidity}%</p>
          </div>
          <div>
            {weatherData.forecast.forecastday[0].hour.map((hourData, index) => (
              <div key={index}>
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
