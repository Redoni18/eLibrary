import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)


import auth from './modules/auth'
import books from './modules/books'


export default new Vuex.Store({
    modules: {
        auth,
        books
    }
})
