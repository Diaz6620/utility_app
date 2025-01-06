import { useState, useEffect } from "react"

function ClockAndDate() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timerId)
    }, [])

    const date = (n) => {
        return n.toLocaleDateString(undefined, {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        
        <section>
            <div>{time.toLocaleTimeString()}</div>
            <div>{date(time)}</div>
        </section>
        
    )
}

export default ClockAndDate