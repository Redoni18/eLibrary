<template>

<div class="book-details__page">
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
                        <p>Author: {{selectedBook.author}}</p>
                        <p>Published: {{selectedBook.year}}</p>
                        <p>ISBN: {{hyphenatedISBN ? hyphenatedISBN : selectedBook.isbn}}</p>
                    </div>
                </div>
                <hr class="card-seperator">
                <div class="book-categories">
                    <h3 class="ml-2">Categories: </h3>
                    <b-badge v-for="category in selectedBook.categories" pill :key="category.id" variant="primary" class="ml-2">{{category.title}}</b-badge>
                </div>
            </div>
        </div>
    </div>

    <div class="book-details_reviews mt-5">
        <div class="reviews-header">
            <h2 class="reviews-text">Reviews:</h2>
            <div class="more-actions">
                <router-link :to="`/reviews/${selectedBook._id}/${selectedBook.title}/${selectedBook.author}`" class="card-link">
                    <b-button size="sm" variant="primary">Read All</b-button>
                </router-link>

                <router-link :to="`/review/add/${selectedBook._id}/${selectedBook.title}/${selectedBook.author}`">
                    <b-button size="sm" variant="success">Post a review</b-button>
                </router-link>
            </div>
        </div>
        <hr class="content-seperator">
        <div v-for="(review,index) in reviews" :key="index">
            <div v-if="index < 3" class="single-review">
                <div class="review-body">
                    <b-avatar class="user-avatar" variant="primary" v-if="user.authenticated" :text="review.username.name.slice(0, 2)" size="2rem"></b-avatar>
                    <div class="review-content">
                        <small>{{review.username.name}}</small>
                        <p class="review-paragraph">{{review.review}}</p>
                    </div>
                </div>
                <div v-if="review.username.id == user.data.id || user.data.isAdmin" class="more-actions__button">
                    <mdb-dropdown end tag="li" class="nav-item">
                        <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                            <template #button-content>
                                <mdb-icon icon="ellipsis-h" class="mr-3" />
                            </template>
                        </mdb-dropdown-toggle>
                        <mdb-dropdown-menu>
                            <mdb-dropdown-item @click.native="deleteReview(review._id)"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                        </mdb-dropdown-menu>
                    </mdb-dropdown>
                </div>
            </div>
        </div>

    </div>
</div>

</template>

<script>
const ISBN = require('isbn3')
import axios from 'axios'
import { mapActions, mapGetters  } from 'vuex'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';

export default {
    name: "Book Details",
    components: {
        mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon
    },
    data() {
        return {
            selectedBook: {},
            reviews: {},
            hyphenatedISBN: null
        }
    },

    async mounted(){
        const response = await this.getBook(this.bookId)
        this.selectedBook = response.data
        this.hyphenatedISBN = ISBN.hyphenate(this.selectedBook.isbn)
        await this.fetchReviews(response.data._id)
        const data = await axios.get(`http://localhost:8000/api/reviews/${response.data._id}/`)
        this.response = data.data
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

        async deleteReview(reviewId){
            await axios.delete(`http://localhost:8000/api/review/delete/${reviewId}`)
            await this.fetchReviews(this.bookId)
            this.$toast.success("Review deleted successfully", {
                position: "top-right",
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false
            });
        },

        async fetchReviews(book){
            await axios.get(`http://localhost:8000/api/reviews/${book}/`).then(response => { this.reviews = response.data})
        }
    }
}
</script>


<style scoped>

.book-details__page{
    width: 800px;
   display: flex;
    flex-direction: column; 
    margin: auto;
}

.book-details{
    display: flex;
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
    word-break: break-word;
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

.book-details_reviews{
    width: 100%;
    margin: auto;
}

.reviews-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.single-review{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(223, 223, 223);
    margin-bottom: 10px;
}

.review-body{
    display: flex;
    word-break: break-word;
}


.user-avatar{
    height: 100%;
    margin-top: 0;
}

.review-content{
    height: 100%;
    margin-left: 10px;
}

.review-content small{
    font-weight: bold;
    color: #4094cf;
}

.review-paragraph{
    font-weight: normal;
    width: 100%;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
}

@media only screen and (min-width: 1400px){

    .book-details__page {
        width: 1000px;
    }

    .book-details__container{
        width: 100%;
    }
}


@media only screen and (max-width: 850px){

    .book-details__page {
        width: 500px;
    }

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

    .card-seperator{
        display: none;
    }

    .quick-info__row{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
    }

    .book-metadata{
        margin-left: 20px;
        width: 100%;
    }

    .book-categories{
        margin-right: auto;

    }

    .book-details_reviews{
        width: 100%;
    }
}

@media only screen and (max-width: 500px){
    .book-details__page{
        width: 300px;
    }
    .quick-info__card{
        display: none;
    }

    .book-abstract{
        width: 100%
    }

    .reviews-text{
        display: none;
    }

    .single-review{
        display: none;
    }
}

</style>