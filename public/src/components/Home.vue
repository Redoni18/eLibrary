<template>
    <div class="home_container container">
        <books :pageTitle="pageTitle + user.data.name"></books>
        

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
    import books from './books/Books.vue'
    export default {
        name: 'Home',
        components: {books},
        data() {
            return{
                pageTitle: 'Welcome ' 
            }
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            })
        },
    }
</script>
