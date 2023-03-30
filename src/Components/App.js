import React, {useState, useEffect} from "react";
import Note from "./Note";
import notesServices from "../Services/notes"
import Notification from "./Notification";

const App = () => {
  //el metodo que vamos a usar para cambiar
  //nuestro arreglo 
  //llamamos que es un estado
  //usando useState([])
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


useEffect(()=> {
  notesServices
    .getAll()
    .then(response => {
      setNotes(response)
    })
}, [])

  const addNote = (event) => {
    event.preventDefault()
    //console.log("Button Clicked", event.target)
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }
    notesServices
    .create(noteObject)
    .then(response => {
      setNotes(notes.concat(response))
      setNewNote('')
    })
  } 

  const handleNotChange = (event) => {
    //console.log(event.target)
    setNewNote(event.target.value)
  }

  const updateImportance = (id) => {
    const note = notes.find(x => x.id === id)
    const note2 = {...note, important: !note.important}
    
    notesServices.update(id, note2)
    .then(response => {
      setNotes(notes.map(x => x.id !== id ? x : response))
    })
    .catch(error => {
      setErrorMessage(`the note ${note2.content} was already deleted`)
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(x => x.id !== id))
    })
  }
  const notesToShow = showAll ? 
  notes : notes.filter(x => x.important === true)
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important': 'all'}
      </button>
      <ul>
        {notesToShow.map(x => {
          console.log(x.id, x.content)
          return (
            <Note 
            key={x.id} 
            note = {x} 
            updateImportance={() => updateImportance(x.id)}/>
          )
        })}
        
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNotChange}/>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App