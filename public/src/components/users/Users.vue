<template>

    <div class="users_container container">
        <h2 class="title">Users</h2>

        <user v-for="user in users" :key="user._id" :name="user.name" :email="user.email"></user>

    </div>
</template>


<script>
    import user from '@/components/users/User'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Users',

        components: { user },

        methods: {
            ...mapActions({
                getUsers: 'getUsers'
            })
        },

        mounted() {
            this.getUsers();
        },

        computed: {
            ...mapGetters({
                users: 'getUsers'
            })
        },
    }
</script>


<style>
    .title {
        text-align: center;
    }
</style>
