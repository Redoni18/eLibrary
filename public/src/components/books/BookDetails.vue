<template>
    <div class="row">
        <div class="leftcolumn">
            <div class="card">
                <h2>{{selectedBook.title}}</h2>
                <h5>{{selectedBook.author}}</h5>
                <div class="main-info">
                    <div class="bookImage">
                        <img src="./hp.jpg" alt="">
                    </div>
                    <div class="book-info">
                        <p>{{selectedBook.description}}</p>
                        <p>Year published: {{selectedBook.year}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "Book Details",
    data() {
        return {
            selectedBook: {},
        }
    },

    async mounted(){
        const response = await this.getBook(this.bookId)
        this.selectedBook = response.data
    },
    computed: {
        bookId() {
            return this.$route.params.id
        },
    },

    methods: {
        ...mapActions({
            updateBook: 'updateBook',
            getBook: 'getBook'
        }),
    }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial;
  padding: 20px;
  background: #f1f1f1;
}

img {
    width: 200px;
}

.leftcolumn {   
  float: right;
  width: 50%;
}

.bookImage {
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 20px;
  width: fit-content;
}

.card {
   background-color: white;
   padding: 20px;
   margin-top: 20px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.main-info{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
}

.main-info div:nth-of-type(2) {
    width: 100%;
    text-align: left;
    padding-left: 20px;
}

@media screen and (max-width: 800px) {
  .leftcolumn {   
    width: 100%;
    padding: 0;
  }
}
</style>