<template>
<b-card>
    <div class="review-add__container">
        <div class="review-add__info">
            <h1 class="review-info__header">{{$route.params.book}} by {{$route.params.author}}</h1>
                <p>Reviewed by: <b-badge variant="dark">{{user.data.name}}</b-badge></p>
        </div>
        <div class="review-add__textarea">
            <b-form-textarea
                id="textarea"
                v-model="review"
                :state="review.length >= 10"
                placeholder="Write you're review.."
                rows="3"
                max-rows="6"/>
            <div class="textarea__buttons">
                <div class="buttons-cont">
                    <b-button :variant="variant" @click="validate()">{{button}}</b-button>
                    <b-button v-if="review.length >= 10" variant="success" @click="submit()">Submit</b-button>
                </div>
            </div>
        </div>
    </div>
</b-card>
</template>

<script>
 import { mapGetters } from 'vuex'
  import axios from 'axios'
export default{
    name: 'AddReview',
    data(){
        return{
            review: '',
            variant: 'danger',
            button: 'Cancel',
        }
    },
    props:{
        default: true,
    },
    methods:{
        validate(){
            if(this.review.length >= 10 && this.button === 'Clear'){
                this.review = ''
            } else if(this.review < 10 && this.button === 'Cancel'){
                this.$router.push(`/book/${this.$route.params.id}`)
            }
        },
        async submit(){
            const review = {bookId:this.$route.params.id,book: this.$route.params.book, author: this.$route.params.author, review: this.review, username: this.user.data}
             await axios.post(`http://localhost:8000/api/addReview/`, review).then((response) => {

                this.$router.push(`/book/${this.$route.params.id}`)
                this.$toast.success("Review posted successfully", {
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
            })
        }
    },
    watch:{
        review(){
            if(this.review.length >= 10){
                this.variant = 'info'
                this.button = 'Clear'
            } else if(this.review.length <= 0) { 
                this.variant = 'danger'
                this.button = 'Cancel'
            }
        }
    },
      computed: {
            ...mapGetters({
                user: 'getUser'
            })
        },
}
</script>

<style>
.textarea__buttons{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: flex-end;
    width: 100%;
}

.review-info__header{
    font-weight: normal;
    font-size: 2rem;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-word;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
}
</style>
