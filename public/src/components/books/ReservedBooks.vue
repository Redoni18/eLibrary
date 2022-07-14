<template>
    <div class="users_container container">
        <div class="mb-3" v-if="userBorrowedBooks.length">
            <router-link type="submit" class="btn btn-primary" :to="{path: '/reservedBooks/listing'}">Switch to table view</router-link>
        </div>
        <div class="row" v-if="userBorrowedBooks.length">
                
                <book class="single-book" @changePage="changePage(book._id)" v-for="book in userBorrowedBooks" :key="book._id" :title="book.title" :description="book.description" :author="book.author" :year="book.year" :imageUrl="book.imageUrl">

                </book>
        </div>
        <div class="no-books" v-else>
                
                
                <div class="no-books__content">
                    <h3>Oops...looks like you don't have any books reserved at the moment!</h3>
                    <h4>Make sure to purchase a membership before reserving a book!</h4>
                    <b-button variant="primary" @click="goToMembership">Become a member</b-button>
                </div>
        </div>
    </div>
</template>


<script>
    import book from '@/components/books/Book'
    import axios from 'axios'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Book',

        components: { book },
        props: ['pageTitle'],
        data(){
            return {
                userBorrowedBooks: []
            }
        },
        computed: {
            ...mapGetters({
                currentUser: 'getUser'
            })
        },

        methods: {
            changePage(id){
                this.$router.push({name: 'bookDetails', params: {id: id}})
            },
            goToMembership(){
                this.$router.push({path: '/allMemberships'})
            },
            async getUserBooks(){
                const response = await axios.get(`http://localhost:8000/api/user/getBorrowed/${this.currentUser.data.id}`)
                this.userBorrowedBooks = response.data.books
            }
        },

        mounted() {
            this.getUserBooks();
        },
    }
</script>


<style scoped>
    .title {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 30px;
    }

    .row{
        display: flex;
        justify-content: flex-start;
        margin: auto;
    }

    .no-books{
        height: 55vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .no-books__content{
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }



    
</style>