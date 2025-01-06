import React, { useState, useEffect } from 'react'
import styles from './Notes.module.css'

function NotesApp() {
    const [note, setNote] = useState("")
    const [notes, setNotes] = useState([])

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || []
        setNotes(savedNotes)
    }, [])

    const handleSaveNote = (e) => {
        e.preventDefault()
        if (note) {
            const newNotes = [...notes, note]
            setNotes(newNotes)
            localStorage.setItem('notes', JSON.stringify(newNotes))
            setNote("")
        }
    }

    const handleDeleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index)
        setNotes(updatedNotes)
        localStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    return (
        <div className={styles.mainContainer}>
            <p>Mis Notas</p>
            <form onSubmit={handleSaveNote}>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Escribe una nueva nota"
                />
                <button type="submit">Guardar Nota</button>
            </form>
            <div>
                <ul>
                    {notes.map((note, index) => (
                        <li key={index}>
                            <span>{note}</span>
                            <button onClick={() => handleDeleteNote(index)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default NotesApp

