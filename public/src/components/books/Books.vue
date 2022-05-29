<template>
    <div class="users_container container">
        <h2 class="title">{{pageTitle}}</h2>
        <div class="row">
                
                <book @changePage="changePage(book._id)" v-for="book in books" :key="book._id" :title="book.title" :description="book.description" :author="book.author" :year="book.year">

                </book>
        </div>

    </div>
</template>


<script>
    import book from '@/components/books/Book'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Book',

        components: { book },
        props: ['pageTitle'],

        methods: {
            ...mapActions({
                getBooks: 'getBooks'
            }),
            changePage(id){
                this.$router.push({name: 'bookDetails', params: {id: id}})
            }
        },

        mounted() {
            this.getBooks();
        },

        computed: {
            ...mapGetters({
                books: 'getBooks'
            })
        },

        // data() {
        //     return {
        //         books: [
        //             {
        //                 title: "Harry Potter 1",
        //                 desc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        //                 author: "Elon Musk",
        //                 year: "1969"
        //             },
        //             {
        //                 title: "Harry Potter 2",
        //                 desc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        //                 author: "Elon Musk",
        //                 year: "1970"
        //             },
        //             {
        //                 title: "Harry Potter 3",
        //                 desc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        //                 author: "Elon Musk",
        //                 year: "1971"
        //             },
        //         ]
        //     }
        // },
    }
</script>


<style scoped>
    .title {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 30px;
    }

    
</style>
