<template>
    <b-card :title="$route.params.book" :sub-title="$route.params.author">
                <b-card  v-for="(review,index) in reviews" :key="index+review" :title="`Reviewed by: ${review.username.name}`">
                                <p v-if="!edited">{{review.review}}</p>
                                <b-container v-if="review.username.id == user.data.id || user.data.isAdmin">
                                        <router-link :to="`/review/${$route.params.book}/${$route.params.id}/${review._id}`">Details</router-link>    
                                </b-container>
                 </b-card>
                    <b-button variant="dark" style="margin-top: 20px;" @click="generateBookRoute(review)">Back to Book</b-button>
                    <b-button variant="info" style="margin-top: 20px;" @click="generateAddReview(review)">Add a Review</b-button>
    </b-card>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    namme: "Reviews",
    components:{
    },
    data(){
        return{
            reviews: {},
            review: 0,
            editedReview: '',
            sliding: null,
            edited: false,
            settings: {
                "lazyLoad": "ondemand",
                "dots": true,
                "fade": true,
                "infinite": true,
                "speed": 500,
                "slidesToShow": 1,
                "slidesToScroll": 1
            },
            text1: 'Delete',
            variant1: 'danger',
            text2: 'Edit',
            variant2: 'info',
            saveEdit: false
        }
    },
    computed:{
    },
    methods:{
        reverse(){
            this.edited = !this.edited
            this.editedReview = ''
        },
         async callApi(review){
             let rev = axios.put(`http://localhost:8000/api/editReview/${review._id}`,  { id: review._id, bookId: review.bookId, review: this.editedReview},).then(response => { 
             })
               for(let i=0; i< this.reviews.length;i++){
                    if(this.reviews[i] === review){
                        this.reviews[i].review = this.editedReview
                    }
                }
            // call an api 
            this.edited = false
            this.editedReview = ''
        },
       async deleteApi(review){
             let aw = await axios.delete(`http://localhost:8000/api/review/delete/${review._id}`)
            this.edited = false
            this.editedReview = ''
        },
        generateRoute(review){
            this.$router.push(`/review/${review._id}`)
        },
        generateBookRoute(review){
            this.$router.push(`/book/${this.$route.params.id}`)
        },
        generateAddReview(review){
            this.$router.push(`/review/add/${this.$route.params.id}/${this.$route.params.book}/${this.$route.params.author}`)
        }
    },
    async mounted(){
         let reviews = await axios.get(`http://localhost:8000/api/reviews/${this.$route.params.id}/`).then(response => { this.reviews = response.data})
    },
    props:{
        default: true,
    },
     computed: {
            ...mapGetters({
                user: 'getUser'
            })
        },
}
</script>
