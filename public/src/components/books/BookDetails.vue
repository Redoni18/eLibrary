<template>

<div class="book-details">
    <div class="book-details__container">
        <div class="title-abstract__container">
            <h2 class="book-title">{{selectedBook.title}}</h2>
            <hr class="content-seperator">
            <p class="abstract">Abstract: </p>
            <div class="book-abstract">
                {{selectedBook.description}}
            </div>
        </div>

        <div class="quick-info__card">
            <div class="quick-info__row">
                <div class="book-cover__container">
                    <img :src="selectedBook.imageUrl" class="book-cover">
                </div>
                <div class="book-metadata">
                    <p>Year published: {{selectedBook.year}}</p>
                    <p>ISBN: {{selectedBook.isbn}}</p>
                </div>
            </div>
            <hr>
            <div class="book-categories">
                <h3 class="ml-2">Categories: </h3>
                <b-badge v-for="category in selectedBook.categories" pill :key="category.id" variant="primary" class="ml-2">{{category.title}}</b-badge>
            </div>
        </div>
    </div>
    <!-- <div class="book-details__right-column">
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
        </div> -->
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

.book-details{
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
}

.book-details__container{
    width: 800px;
    display: flex;
    justify-content: space-between;
}

.title-abstract__container{
    width: 100%;
}

.book-title{
    width: calc(100% - 40px);
    word-break: break-all;
    color: #2d96e0;
    font-weight: 800;
}

.abstract{
    font-weight: 800;
}

.book-abstract{
    width: calc(100% - 20px);
}

.content-seperator{
    width: calc(100% - 30px);
    margin-left: 0;
}


.quick-info__card{
    padding: 10px;
    width: 300px;
    box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;
    padding: 10px;
    border-radius: 5px;
    height: fit-content;
}

.quick-info__row{
    display: flex;
    width: 280px;
    justify-content: space-between;
}

.book-cover_container{
    width: fit-content;
}

.book-cover{
    object-fit: contain;
    width: 130px;
}

.book-metadata{
    width: 130px;
}

.book-metadata, p{
    font-weight: 700;
}

@media only screen and (max-width: 750px){
    .book-details__container{
        display: flex;
        flex-direction: column;
    }

    .book-abstract{
        width: 100%
    }

    .title-abstract__container{
        margin-bottom: 20px;
    }

    .quick-info__card{
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .content-seperator{
        display: none;
    }

    .quick-info__row{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: fit-content;
    }

    .book-metadata{
        margin-left: 20px;
    }

    .book-categories{
        margin-right: auto;
    }
}

@media only screen and (max-width: 500px){
    .quick-info__card{
        display: none;
    }

    .book-abstract{
        width: 100%
    }
}

</style>