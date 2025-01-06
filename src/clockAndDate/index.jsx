import { useState, useEffect } from "react"
import styles from './Index.module.css'

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
        
        <section className={styles.clockContainer}>
            <div>{time.toLocaleTimeString()}</div>
            <div>{date(time)}</div>
        </section>
        
    )
}

export default ClockAndDate