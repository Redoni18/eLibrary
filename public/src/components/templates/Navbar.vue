<template>
    <div class="navbar_container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#/">eLibrary</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" :to="({path: '/users'})">Users</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Books
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" :to="({path: '/books/listing'})">Listing</router-link>
              <router-link class="dropdown-item" :to="({path: '/books/create'})">Insert Book</router-link>
            </div>
          </li>
          <li class="nav-item active" v-if="user.authenticated">
            <router-link v-if="!user.data.isAdmin" class="nav-link" :to="({path: '/contact-us'})">Contact Us</router-link>
            <router-link v-else class="nav-link" :to="({path: '/messages'})">Messages</router-link>
    
          </li>
        </ul>
        <ul class="nav-item dropdown navbar-nav ml-auto">
    
            <div v-if="user.authenticated">
                <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    {{ user.data.name }}
                </a>
                <div class="dropdown-menu mr-1">
                    <a class="dropdown-item" href="#" v-on:click="out">SignOut</a>
                </div>
            </div>
    
    
            <div v-else>
                <ul class="nav-item navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#/signin">SignIn</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#/signup">SignUp</a>
                    </li>
                </ul>
            </div>
        </ul>
      </div>
    </nav>
    </div>
</template>
    
    
    <script>
        import { mapActions, mapGetters } from 'vuex'
    
        export default {
            name: 'Navbar',
    
            computed: {
                ...mapGetters({
                    user: 'getUser'
                })
            },
            mounted() {
                console.log(this.user)
            },
    
            methods: {
                ...mapActions({
                    signOut: 'signOut'
                }),
                out() {
                    this.signOut();
                    this.$nextTick(function () {
                        window.location.replace('#/signin');
                    })
                }
            }
        }
    </script>
    
    
    <style>
        .navbar_container {
            margin-bottom: 40px;
        }
    </style>
    