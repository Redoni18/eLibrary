import axios from 'axios'


export const createBook = ({ commit }, data ) => {
    return axios.post('http://localhost:8000/api/createBooks', data).then((response) => {
        commit('storeBook', response.data)

        window.location.replace('#/');
    })
}


export const getBooks = ({ commit } ) => {
    return axios.get('http://localhost:8000/api/books').then((response) => {
        commit('storeBooks', response.data)


        return Promise.resolve(response);
    })
}

// /api/createBooks/:id

export const updateBook = ({ commit }, data ) => {
    return axios.put('http://localhost:8000/api/editBook/:id', data).then((response) => {
        commit('storeBook', response.data)

        window.location.replace('#/books/listing');
    })
}

export const getBook = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/books/${id}`)
}


