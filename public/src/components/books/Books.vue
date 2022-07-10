<template>
    <div class="users_container container">
        <h2 class="title">{{pageTitle}}</h2>
        <div class="row">
                
                <book class="single-book" @changePage="changePage(book._id)" v-for="book in books" :key="book._id" @getDataOnHover="changeDefOver(book._id)" :title="book.title" :description="book.description" :author="book.author" :year="book.year" :imageUrl="book.imageUrl">

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
        data(){
            return {
                selectedBook: {}
            }
        },

        methods: {
            ...mapActions({
                getBooks: 'getBooks',
                getBook: 'getBook'
            }),
            changePage(id){
                this.$router.push({name: 'bookDetails', params: {id: id}})
            },
            async changeDefOver(book) {
                const response = await this.getBook(book)
                this.selectedBook = response.data
                console.log(this.selectedBook)
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
        justify-content: center;
    }

    
</style>