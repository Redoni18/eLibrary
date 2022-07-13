import axios from 'axios'
import * as auth from '../../../helper/auth'


export const signUp = ({ commit }, data ) => {
    return axios.post('http://localhost:8000/api/signup', data).then((response) => {
        commit('storeUser', response.data)

        window.location.replace('#/');
    })
}

export const editProfile = ({ commit }, data ) => {
    return axios.put('http://localhost:8000/api/editProfile/:id', data).then((response) => {
        commit('storeUser', response.data)
    })
}

export const editUser = ({ commit }, data ) => {
    return axios.put('http://localhost:8000/api/editUser/:id', data)
}


export const get_profile = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/userProfile/${id}`)
}

export const get_membership = ({ commit }, id ) => {
    return axios.get(`http://localhost:8000/api/userMembership/${id}`)
}




export const signIn = ({ commit }, data ) => {
    return axios.post('http://localhost:8000/api/signin', data).then((response) => {
        commit('storeUser', response.data)

        window.location.replace('#/');
    })
}


export const signOut = ({ commit } ) => {
    commit('removeUser');

    return Promise.resolve();
}


export const getUsers = ({ commit } ) => {
    return axios.get('http://localhost:8000/api/users').then((response) => {
        commit('storeUsers', response.data)

        return Promise.resolve(response);
    })
}


export const authenticateUser = ({ commit } ) => {
    auth.setHttpToken();
    return axios.get('http://localhost:8000/api/user/auth');
}