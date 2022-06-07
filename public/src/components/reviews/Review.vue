<template>
<b-card :title="`Review by: ${review.book}`">
                                <p v-if="!edited">{{review.review}}</p>
                                <b-form-textarea
                                    v-if="edited"
                                    id="textarea"
                                    v-model="editedReview"
                                    :state="editedReview.length > 10"
                                    placeholder="Edit you're review.."
                                    rows="2"
                                    max-rows="6"/>
                                <b-container v-if="review.username == user.data.name">
                                      <b-button variant="dark" v-if="edited" @click="reverse()">Cancel</b-button>
                                      <b-button variant="danger" v-if="!edited" @click="deleteApi(review)">Delete</b-button>
                                    <b-button variant="info" v-if="!edited" @click="reverse()">Edit</b-button>
                                    <b-button variant="success" v-if="edited && editedReview.length > 10" @click="callApi(review)">Save</b-button>
                                     <b-button v-if="!edited" variant="dark" @click="generateBookRoute(review)">Back to Book</b-button>
                                </b-container>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
    name: 'Review',
    props: {
        default: true
    },
    data(){
        return{
        review: {},
        editedReview: '',
        edited: false,
        }
    },
    methods:{
        reverse(){
            this.edited = !this.edited
            this.editedReview = ''
        },
         async callApi(review){
             let rev = axios.put(`http://localhost:8000/api/editReview/${review._id}`,  { id: review._id, bookId: review.bookId, review: this.editedReview},).then(response => { 
             })
            // call an api 
            this.edited = false
            this.editedReview = ''
            this.$router.push(`/book/${this.$route.params.bookId}`)
        },
       async deleteApi(review){
             let aw = await axios.delete(`http://localhost:8000/api/review/delete/${review._id}`)
            this.edited = false
            this.editedReview = ''
            this.$router.push(`/book/${this.$route.params.bookId}`)
            
        },
        generateBookRoute(review){
            this.$router.push(`/book/${this.$route.params.bookId}`)
        }
    },
     computed: {
            ...mapGetters({
                user: 'getUser'
            })
        },
   async mounted(){
     const  id = this.$route.params.id
     const wait =  await axios.get(`http://localhost:8000/api/review/${this.$route.params.id}/`).then(response => { this.review = response.data})
    }
}
</script>