import axios from "axios"
<<<<<<< HEAD
const url = `https://note-service-private.onrender.com/api/notes`
=======

>>>>>>> 63961e65c0d7438fc58704aeb50543683c7cf355

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
