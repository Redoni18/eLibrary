<template>
    <div id="app">
        <navbar></navbar>
        <!-- <FooterComponent  v-if="user.authenticated && user.data.isAdmin"></FooterComponent> -->
    </div>
</template>

<script>
    import axios from 'axios'
    import navbar from '@/components/templates/Navbar'
    //import FooterComponent from '@/components/templates/Footer'
    import { mapGetters } from 'vuex'

    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });

export default {
    name: 'App',

    components: {
        navbar,
        //FooterComponent
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        }),
    }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    
</style>
