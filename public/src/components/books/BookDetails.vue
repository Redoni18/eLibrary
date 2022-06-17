<template>
    <div class="row">
        <div class="leftcolumn">
            <div class="card">
                <h2>{{selectedBook.title}}</h2>
                <h5>{{selectedBook.author}}</h5>
                <div class="main-info">
                    <div class="bookImage">
                        <img :src="selectedBook.imageUrl" alt="">
                    </div>
                    <div class="book-info">
                        <p>{{selectedBook.description}}</p>
                        <p>Year published: {{selectedBook.year}}</p>
                        <b-badge v-for="category in selectedBook.categories" pill :key="category.id" variant="primary" class="ml-2">{{category.title}}</b-badge>
                    </div>

                </div>
            </div>
        </div>
        <div class="book-details__right-column">
            <div class="right-column__reviews-container">
                <b-card title="Reviews" :sub-title="`${selectedBook.title} Reviews`">
                        <div v-for="(review,index) in reviews" :key="index">
                            <b-card class="mt-3" v-if="index < 3" :title="review.book" :sub-title="`Reviewed by: ${review.username}`">
                                <p>{{review.review}}</p>
                            </b-card>
                        </div>
                    <router-link :to="`/reviews/${selectedBook._id}/${selectedBook.title}/${selectedBook.author}`" class="card-link">Check out Reviews</router-link>
                    <router-link :to="`/review/add/${selectedBook._id}/${selectedBook.title}/${selectedBook.author}`"><b-badge pill variant="primary">Add a review</b-badge></router-link>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters  } from 'vuex'
export default {
    name: "Book Details",
    data() {
        return {
            selectedBook: {},
            reviews: {}
        }
    },

    async mounted(){
        const response = await this.getBook(this.bookId)
        this.selectedBook = response.data
        let reviews = await axios.get(`http://localhost:8000/api/reviews/${response.data._id}/`).then(response => { this.reviews = response.data})
    },
    computed: {
        bookId() {
            return this.$route.params.id
        },
             ...mapGetters({
                user: 'getUser'
        })
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
.book-details__right-column{
    display: flex;
    margin: auto;
}
.right-column__reviews-container{
    width: 500px;
    height: 400px;
}
</style>