<template>
    <div class="user_container">

        <div class="media">
            <div class="media-left">
                <b-avatar variant="primary" v-if="user.authenticated" :text="name.slice(0, 2)" size="2rem"></b-avatar>
            </div>
            <div class="media-body">
                <h6 class="media-heading">{{ name }}</h6>
                <span>{{ email }}</span>
            </div>
        </div>

        <hr>

    </div>
</template>


<script>
import { mapGetters } from 'vuex'
    export default {
        name: 'User',

        props: ['name', 'email'],
        computed: {
            ...mapGetters({
                user: 'getUser'
            }),
        }
    }
</script>


<style>
    img {
        margin-right: 10px;
    }
</style>
