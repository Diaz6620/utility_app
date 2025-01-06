import React, { useState, useEffect } from 'react'
import styles from './Links.module.css'

function Links() {
    const [url, setUrl] = useState("")
    const [urls, setUrls] = useState([])

    useEffect(() => {
        const savedUrls = JSON.parse(localStorage.getItem('urls')) || []
        setUrls(savedUrls)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (url && !urls.some(item => item.url === url)) {
            const newUrls = [...urls, { name, url }]
            setUrls(newUrls)
            localStorage.setItem('urls', JSON.stringify(newUrls))
            setUrl("")
        }
    }

    const handleDelete = (urlToDelete) => {
        const updatedUrls = urls.filter(item => item.url !== urlToDelete)
        setUrls(updatedUrls)
        localStorage.setItem('urls', JSON.stringify(updatedUrls))
    }

    return (
        <div className={styles.mainContainer}>
            <p>Mis accesos directos</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Añadir URL"
                />
                <button type="submit">Guardar</button>
            </form>
            <div>
            <ul className={styles.elementContainer}>
                {urls.map((savedUrl, index) => (
                    <li className={styles.element} key={index}>
                        <a href={savedUrl.url} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={`https://www.google.com/s2/favicons?domain=${savedUrl.url}`} 
                                alt="favicon" 
                                style={{ width: '20px', height: '20px' }} 
                            />
                        </a>
                        <button onClick={() => handleDelete(savedUrl.url)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            </div>
        </div>
    )
}

export default Links
