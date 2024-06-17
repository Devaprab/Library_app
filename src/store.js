import {createStore} from 'vuex';
const store = createStore({
    state: {
        baseUrl: 'http://localhost:8080',
        // baseUrl: 'http://192.168.1.11:8080',
        books: []
    },
    getters: {
        displayBooks(state) {
            return state.books;
        },
        getUrl: (state) => state.baseUrl,
    },
    mutations: {
        setBooks(state,payload) {
            state.books = payload;
        }
    }
});
export default store;