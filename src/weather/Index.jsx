import { useState, useEffect } from "react";

function Weather() {
    const [weatherData, setWeatherData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL)
                if(!response.ok) {
                    throw new Error('Get weather info FAILED')
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
    }, [])

    return (
        <div>
            {loading && !error ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>Hubo un error: { error }</p>
            ) : (
                <>
                    <div>
                        <p>{weatherData.location.name}</p>
                        <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text}/>
                        <p>Temperatura: {weatherData.current.temp_c}º</p>
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
            )
            }
        </div>
    )
}

export default Weather