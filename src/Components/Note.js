import React from 'react';

const Note = ({note, updateImportance}) => {
    const label = note.important 
    ? 'make no important':
    'make important'

    return (    
        <li key = {note.id} className="note"> 
        {note.content} {' '}
        <button onClick={updateImportance}>{label}</button>
        </li>
    )

}

export default Note