<template>
    <div class="home_container" v-if="!user.data.isAdmin">
        <div class="home-container__entrance">
            <h1 class="home-container__welcome">Welcome {{user.data.name}}</h1>
                    <button class="home-container__explore" @click="explore()">Explore</button>
        </div>
        <div class="home-container__details">
            <div class="home-container__dtl-textct">
                       <h2 class="home-container__details-text"></h2>
            </div>
                    <div v-for="(category,index) in categories" :key="category.title + index" class="home-container__details-category">
                       <div class="details__category">
                         <h3 v-if="filterBooks(category.title).length > 0 && index <= 3" class="details__title">{{category.title}}</h3>
                       </div>
                       <b-container style="display: flex;flex-direction: row; justify-content: space-between;">
                        <b-row v-for="(book,bkindex) in filterBooks(category.title)" :key="book">
                            <b-col>
                                <div class="details__book" v-if="index <= 3 && bkindex <= 3 ">
                                    <router-link :to="`/book/${book._id}`">
                                        <img :src="book.imageUrl" alt="a book" class="details__book-image">
                                    </router-link>
                                 </div>
                            </b-col>
                        </b-row>
                       </b-container>
                    </div>
        </div>
            <div class="home-container__locations">
                <h1 class="home-container__locations-heading">LOCATIONS</h1>
                <div class="locations__grid">
                    <div class="locations__card" v-for="location in locationsFilter" :key="location._id">
                        <img src="../assets/ping.png" alt="" class="location-card__image">
                        <h4>{{location.address}}</h4>
                        <p>{{location.phoneNumber}}</p>
                        <a :href="`https://www.google.com/maps/place/${location.address}`" target="_blank">Find</a>
                    </div>
                </div>
            </div>
            <div class="home-container__request">
                <div class="home-container__request-bttn">
                    <h4>Got any books that you want to read but we don't have ?</h4>
                    <b-button v-if="!request" variant="light" @click="request = !request">Request Any</b-button>
                </div>
                    <b-card v-if="request" class="home-container__request-modal" title="Book Request" style="color:black; width: 50%; margin: auto;">
                        <b-badge variant="light">Title {{title}}</b-badge>
                        <b-form-input placeholder="Book title..." type="text" v-model="title" />
                        <b-badge variant="light">Author {{author}}</b-badge>
                        <b-form-input placeholder="Book Author"  type="text" v-model="author" />
                        <b-badge variant="light">Date {{date}}</b-badge>
                        <b-form-input placeholder="Date Published..." type="date" v-model="date"/>
                        <div style="display: flex;flex-direction: row; justify-content: center; align-items: center; margin-top: 20px;">
                            <b-button variant="danger" style="margin-right: 10px;" @click="reset()">Cancel</b-button>
                            <b-button variant="success" style="margin-left: 10px;" @click="apply()">Apply</b-button>
                        </div>
                    </b-card>
            </div>
    </div>
    <div v-else>
        <books :pageTitle="pageTitle + user.data.name"></books>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
    import books from './books/Books.vue'
    export default {
        name: 'Home',
        components: {books},
        data() {
            return{
                pageTitle: 'Welcome ',
                categories: [],
                books: [],
                locations: [],
                request: false,
                title: '',
                author: '',
                date: ''
            }
    },
    methods: {
        filterBooks(category) {
            const filtered = []
            for (let i = 0; i < this.books.length; i++){
                if (this.books[i] || this.books[i].categories[0].title === category) {
                    console.log('true')
                    filtered.push(this.books[i])
                }
            }
            return filtered
        },
            reset() {
                    this.title = ''
                    this.author = ''
                    this.date = ''
                        this.request = false
        },
        async apply() {
            if (this.title.length > 4 && this.author.length > 4 && this.date) {
                await axios.put(`http://localhost:8000/api/request/book/${this.title}/${this.author}/${this.date}/${this.user.data}`)
                    .then(response => {
                        this.reset()
                        console.log(response.data)
                })
            } else {
                this.reset()
            }
        },
        explore() {
            document.querySelector('.home-container__details-category').scrollIntoView({
                behavior: 'smooth'
            })
        } 
             
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
            locationsFilter() {
                const returnable = []
                for (let i = 0; i < this.locations.length; i++){
                    if (i <= 2) {
                        returnable.push(this.locations[i])
                    }
                }
                return returnable
            }
         },
    async mounted() {
          const ctg = await axios.get('http://localhost:8000/api/categories').then(response => {
            this.categories = response.data
          }) 
            const books = await axios.get('http://localhost:8000/api/books').then(
                    response => { this.books = response.data}
            )
        const locations =  await axios.get("http://localhost:8000/api/locations").then(response => {
                this.locations = response.data
              })   
        }
        
    }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;1,100;1,200;1,300&display=swap');

*{
    margin: 0;
    box-sizing: border-box;
}

.container{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
   padding: 0;
   margin: 0;
   box-sizing: border-box; 
}
.home_container{

    font-family: 'Montserrat', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #2A3A54;
    .home-container__entrance{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #2A3A54;
        color: aliceblue;
        text-align: center;
        width: 100%;
        margin: auto;
        height: 200px;
        &:hover{
            transition: 0.4s ease-in;
            background: white;
            color: #2A3A54;
            box-shadow: -2px -2px rgb(76, 76, 76);
            .home-container__explore{
                display: unset;
                &:hover{
                    transition: 2s ease-in;
                }
            }
        }
        .home-container__explore{
            width: 30%;
            border-radius: 0.9rem;
            background: #2A3A54;
            color: aliceblue;
            display: none;

        }
        .home-container__welcome{
            margin-bottom: 20px;
        }
        .home-container__user{
            margin-left: 80px;
        }
    }
    .home-container__details{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: #2A3A54;
        color: aliceblue;
        text-align: center;
        .home-container__dtl-textct{
            display: flex;
            flex-direction: column;
            margin: auto;
            width: 100%;
            text-align: center;
            justify-content: space-between;
            .home-container__details-text{
            font-size: 45px;
            letter-spacing: 0.2rem;
            }
        }
        .home-container__details-category{
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            .details__category{
                text-align: center;
                width: 40%;
                .details__title{
                    font-size: 38px;
                    color: aliceblue;
                    letter-spacing: 0.4rem;
                    margin-left: 30%;
                    margin-top: 15px;
                }
            }
            .details__book{
                margin-top: 15px;
                width: 100%;
                  transform:
                    rotate3d(.4,-.840,0,13deg)
                    rotate(1deg);
                box-shadow:
                    2em 4em 6em -2em rgba(0,0,0,.5),
                    1em 2em 3.5em -2.5em rgba(0,0,0,.5);
                transition:
                    transform .4s ease,
                    box-shadow .4s ease;
                border-radius: .5em;

                &:hover {
                    transform:
                    rotate3d(0,0,0,0deg)
                    rotate(0deg);
                    transition: 0.3s ease-in;
                    border: 2px solid #3C99DC;
                }
                .details__book-image{
                    width: 200px;
                    height: 200px;
                    margin: 10px;
                }
            }
        }
        .home-container__request{
            display: flex;
            flex-direction: column;
            margin-top: 80px;
            justify-content: center;
        }
    }
    .home-container__locations{
        display: flex;
        flex-direction: column;
        width: 100%;
        .home-container__locations-heading{
            margin-top: 80px;
            color: aliceblue;
            text-align: center;
            letter-spacing: 0.6rem;
        }
        .locations__grid{
            
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .locations__card{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 25%;
            margin: 10px;
            border-radius: 2rem;
            height: 200px;
            
            background: aliceblue;
            color: #2A3A54;
            .location-card__image{
                object-fit: cover;
                width: 30px;
            }
        }
        }
    
    }
    .home-container__request{
        color: aliceblue;
             .home-container__request-bttn{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
                align-items: center;
                height: 80px;
                margin-bottom: 40px;
            }
    }
}

</style>
