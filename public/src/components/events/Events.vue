<template>
<div>
  <b-tabs content-class="mt-3">
    <b-tab title="Curent events" active>
            <li v-for="event in events"  :key="event.id"> 
                <mdb-card>
                    <mdb-card-body>
                        <mdb-card-title>{{event.name}}</mdb-card-title>
                        <mdb-card-text>{{event.description}} </mdb-card-text>
                        <mdb-card-text>{{event.startDate}} / {{event.endDate}}</mdb-card-text>
                        <div>
                            <b-carousel
                            id="carousel-1"
                            v-model="slide"
                            :interval="94000"
                            controls
                            indicators
                            background="white"
                            img-width="1024"
                            img-height="600"
                            style="text-shadow: 1px 1px 2px #333;"
                            @sliding-start="onSlideStart"
                            @sliding-end="onSlideEnd"
                            >
                            
                            <b-carousel-slide img-blank img-alt="Blank image" v-for="book in event.books" :key="book.id">
                                <div>
                                    <Book  @changePage="changePage(book.id)" :title="book.title" :description="book.description" :year="book.year" :author="book.author" :imageUrl="book.imageUrl"/>
                                </div>
                            </b-carousel-slide>

                            
                            </b-carousel>
                        </div>
                    </mdb-card-body>
                </mdb-card>
            </li>    
    </b-tab>          
    <b-tab title="Upcoming events">
        <li v-for="event in futureEvents"  :key="event.id">
            <mdb-card>
                <mdb-card-body>
                    <mdb-card-title>{{event.name}}</mdb-card-title>
                    <mdb-card-text>{{event.description}} </mdb-card-text>
                    <mdb-card-text>{{event.startDate}} / {{event.endDate}}</mdb-card-text>
                </mdb-card-body>
            </mdb-card>
        </li> 
    </b-tab>
  </b-tabs>
</div>
</template>

<script>

// import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

import Book from '../books/Book.vue';
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardImage, mdbCardHeader, mdbCardBody, mdbCardTitle, mdbCardText, mdbCardFooter, mdbCardUp, mdbCardAvatar, mdbCardGroup, mdbBtn, mdbView, mdbMask, mdbIcon } from 'mdbvue';
export default {
		name: 'Events',
        components: {
            Book,
			mdbContainer,
			mdbRow,
			mdbCol,
			mdbCard,
			mdbCardImage,
			mdbCardHeader,
			mdbCardBody,
			mdbCardTitle,
			mdbCardText,
			mdbCardFooter,
			mdbCardUp,
			mdbCardAvatar,
			mdbCardGroup,
			mdbBtn,
			mdbView,
			mdbMask,
			mdbIcon,
		},
        data() {
            return {
                user: JSON.parse(window.localStorage.getItem('user')),
                events: {},
                pastEvents: {},
                futureEvents: {},
                slide: 0,
                sliding: null
            }
        },
        computed: {
            allEvents() {
                return this.events
            }
        },

        async mounted(){
            await this.fetchEvents()
            await this.fetchFutureEvents()
        },

        methods: {

            async fetchEvents(){
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        const response = await axios.get("http://localhost:8000/api/events/currentEvents")
                        this.events = response.data
                    }
                });
            },
            async fetchFutureEvents(){
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        const response = await axios.get("http://localhost:8000/api/events/futureEvents")
                        this.futureEvents = response.data
                    }
                });
            },
            async removeEvents(event) {
                await axios.delete(`http://localhost:8000/api/deleteMembership/${event._id}`)
                await this.fetchEvents()

                this.$toast.success("Event deleted successfully", {
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
                this.showModal = false
                await this.fetchEvents()
            },
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            },
            changePage(id){
                this.$router.push({name: 'bookDetails', params: {id: id}})
            },

        }   
    }

</script>

<style scoped>
    li{
    list-style-type: none;
}
</style>