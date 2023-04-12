import axios from "axios"
const url = `https://note-service-private.onrender.com/api/notes`

const getAll = () => {
    const request = axios.get(url)
    const NonExist = {
        id: 1000,
        content: " this note is no saved in server",
        date: '2023-03-15',
        important: true
    }
    return request.then(response => response.data.concat(NonExist))
}

const create = newObject => {
    const request = axios.post(url, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${url}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll, create, update
}