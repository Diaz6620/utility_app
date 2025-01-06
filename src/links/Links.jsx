import React, { useState, useEffect } from 'react'

function Links() {
    const [url, setUrl] = useState("")
    const [name, setName] = useState("")
    const [urls, setUrls] = useState([])

    useEffect(() => {
        const savedUrls = JSON.parse(localStorage.getItem('urls')) || []
        setUrls(savedUrls)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (url && name && !urls.some(item => item.url === url)) {
            const newUrls = [...urls, { name, url }]
            setUrls(newUrls)
            localStorage.setItem('urls', JSON.stringify(newUrls))
            setUrl("")
            setName("")
        }
    }

    const handleDelete = (urlToDelete) => {
        const updatedUrls = urls.filter(item => item.url !== urlToDelete)
        setUrls(updatedUrls)
        localStorage.setItem('urls', JSON.stringify(updatedUrls))
    }

    return (
        <div className="App">
            <h1>Accesos Directos a URLs</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del acceso directo"
                />
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Añadir URL"
                />
                <button type="submit">Guardar</button>
            </form>
            <div>
            <h2>Mis Accesos Directos</h2>
            <ul>
                {urls.map((savedUrl, index) => (
                    <li key={index}>
                        <a href={savedUrl.url} target="_blank" rel="noopener noreferrer">
                            <img 
                                src={`https://www.google.com/s2/favicons?domain=${savedUrl.url}`} 
                                alt="favicon" 
                                style={{ width: '20px', height: '20px' }} 
                            />
                            {savedUrl.name}
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
