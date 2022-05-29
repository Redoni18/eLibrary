

export const storeBook = (state, book) => {
    state.book.data = book;
}

export const storeBooks = (state, books) => {
    state.books = books;
}




// export const removeUser = (state) => {
//     state.user.authenticated = false;
//     state.user.data = null;

//     auth.removeUser();
// }


// export const storeUsers = (state, users) => {
//     state.users = users;
// }
