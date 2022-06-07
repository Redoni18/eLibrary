<template>
<b-container v-if="categories.length >= 1" fluid="md" class="categories__container">
    <b-row  v-for="(category,index) in categories" :key="category+index" class="categories__row">
        <b-col class="categories__column">
            <b-card class="categories__card" :title="category.title">
                         <b-card style="margin-bottom: 10px;">
                             {{category.description}}
                         </b-card>
                               <b-button :id="`categories__details-${index}`" variant="dark" @click="generateCategoryPage(category)" >Details</b-button>
            </b-card>
        </b-col>
    </b-row>
    <div v-if="user.data.isAdmin" style="margin-top: 20px;">
        <b-button :id="`categories__add-${index}`" variant="success" @click="generateRoute()">Add a Category</b-button>
    </div>
</b-container>
 <b-card v-else-if="categories.length < 1 && user.data.isAdmin" title="There's no categories">
        <div style="padding-top 20px; display: flex; flex-direction: row; justify-content: flex-end;">
            <b-button :id="`categories__none-add-${index}`" variant="success" @click="generateRoute()">Add a Category</b-button>
        </div>
    </b-card>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            categories: {}
         }
    },
       computed: {
             ...mapGetters({
                user: 'getUser'
             }),
    },
    methods: {
        generateRoute() {
            this.$router.push('/categories/add')
        },
        generateCategoryPage(category) {
            this.$router.push(`/category/${category._id}`)
        }
    },
     async mounted() {
         const ctg = await axios.get('http://localhost:8000/api/categories').then(response => {
            this.categories = response.data
        })
    }
 }
</script>