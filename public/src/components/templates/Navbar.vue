<template>
<div class="body-container">
    <!-- Random user navbar -->
  <div v-if="!user.authenticated || !user.data.isAdmin || switchView">
    <mdb-navbar v-if="user.authenticated" color="unique-color-dark" dark>
    <mdb-navbar-brand>
        <router-link to="/#">
            <img src="../../assets/logo2.png" width="100" alt="">
        </router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
            <mdb-dropdown start tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                Books
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item :to="{path: '/'}">All Books</mdb-dropdown-item>
                <mdb-dropdown-item :to="{path: '/booksList/listing'}">Listing</mdb-dropdown-item>
                <mdb-dropdown-item :to="{path: '/reservedBooks'}">Reserved Books</mdb-dropdown-item>
                <mdb-dropdown-item :to="{path: '/favouriteBooks'}">Favourites</mdb-dropdown-item>
                
            </mdb-dropdown-menu>
        </mdb-dropdown>
        <!-- <router-link :to="({path: '/contact-us'})">
            <mdb-nav-item href="#">Contact Us</mdb-nav-item>
        </router-link> -->
        <router-link :to="({path: '/allMemberships'})">
            <mdb-nav-item href="#">Membership</mdb-nav-item>
        </router-link>
        <router-link :to="({path: '/events'})">
            <mdb-nav-item href="#">Events</mdb-nav-item>
        </router-link>
        <router-link :to="({path: '/request'})">
            <mdb-nav-item>Request</mdb-nav-item>
        </router-link>
        <router-link :to="({path: '/about-us'})">
            <mdb-nav-item>About Us</mdb-nav-item>
        </router-link>
        <router-link :to="({path: '/cartBooks'})">
            <mdb-nav-item>My Cart</mdb-nav-item>
        </router-link>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <b-avatar variant="primary" v-if="user.authenticated" :text="user.data.name.slice(0, 2)" size="2rem"></b-avatar>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item :to="{name: 'userprofile', params: {id: user.data.id}}">My Profile</mdb-dropdown-item>
                <mdb-dropdown-item v-if="user.data.isAdmin" @click="switchViews">Admin Dashboard</mdb-dropdown-item>
                <mdb-dropdown-item @click.native="out">Sign Out</mdb-dropdown-item>
            </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
      <!-- <form>
        <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves
          waves-fixed />
      </form> -->
    </mdb-navbar-toggler>
  </mdb-navbar>


  <mdb-navbar v-else color="unique-color-dark mb-0" dark>
    <mdb-navbar-brand>
        <router-link to="/#">
            <img src="../../assets/logo2.png" width="100" alt="">
        </router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <router-link to="/#">
            <mdb-nav-item href="#">Home</mdb-nav-item>
        </router-link>
      </mdb-navbar-nav>
      <mdb-navbar-nav right>
        <router-link to="/signin">
            <mdb-nav-item>Sign In</mdb-nav-item>
        </router-link>
        <router-link to="/signup">
            <mdb-nav-item>Sign Up</mdb-nav-item>
        </router-link>
      </mdb-navbar-nav>
      <!-- <form>
        <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves
          waves-fixed />
      </form> -->
    </mdb-navbar-toggler>
  </mdb-navbar>
    <div class="p-5 content-container">
        <router-view></router-view>
    </div>
  </div>
    <!-- /Random user navbar -->



<!-- Admin Sidebar and footer -->
<div class="flexible-content" v-else>
    <div class="p-5 content-container">
        <router-view></router-view>
      </div>
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed scrollable">
        <div class="logo-wrapper">
            <router-link to="/#"
                ><img alt="" class="img-fluid sidebar-logo" src="../../assets/logo2.png"
            /></router-link>
        </div>
      <mdb-list-group class="list-group-flush">
        <router-link :to="{path: '/'}" @click.native="activeItem = 1">
          <mdb-list-group-item
          id="sidebar-item"
          :class="activeItem === 1 && 'active'"
            :action="true"
            ><mdb-icon
              icon="home"
              class="mr-3"
            /><p>Home</p></mdb-list-group-item
          >
        </router-link>
        <mdb-list-group-item
            id="sidebar-item"
            :action="true"
            v-if="user.authenticated"
            @click.native="activeItem = 3; showBooksDropdown = !showBooksDropdown;"
            :class="activeItem === 3 && 'active'"
            ><mdb-icon icon="book" class="mr-3" /><p>Books</p>
        </mdb-list-group-item>
        <div v-if="showBooksDropdown" class="sidebar-submenu">
            <router-link v-if="user.authenticated" :to="{path: '/booksList/listing'}">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="list" class="mr-3" /><p>Listing</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/books/create'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="plus" class="mr-3" /><p>Insert Book</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/books/upcomings'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="clock" class="mr-3" /><p>Upcoming Books</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/reservedBooks'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="save" class="mr-3" /><p>Reserved Books</p></mdb-list-group-item
                >
            </router-link>
          </div>
        <mdb-list-group-item
            id="sidebar-item"
            v-if="user.authenticated && user.data.isAdmin"
            @click.native="activeItem = 4; showSettingsDropdown = !showSettingsDropdown;"
            :action="true"
            :class="activeItem === 4 && 'active'"
            ><mdb-icon icon="cog" class="mr-3" /><p>Settings</p>
        </mdb-list-group-item>
            <div v-if="showSettingsDropdown" class="sidebar-submenu">
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/categories'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="puzzle-piece" class="mr-3" /><p>Categories</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/userTypes'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="user-cog" class="mr-3" /><p>User Types</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/locations/listing'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="map-marked-alt" class="mr-3" /><p>Locations</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/memberships'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="user-plus" class="mr-3" /><p>Memberships</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/countries/listing'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="globe" class="mr-3" /><p>Countries</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/requests'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="concierge-bell" class="mr-3" /><p>Requests</p></mdb-list-group-item
                >
            </router-link>
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/faculties'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="school" class="mr-3" /><p>Faculties</p></mdb-list-group-item
                >
            </router-link>

            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/staff'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="briefcase" class="mr-3" /><p>Staff</p></mdb-list-group-item
                >
             </router-link>

             <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/language'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="briefcase" class="mr-3" /><p>Language</p></mdb-list-group-item
                >
             </router-link>

             <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/topic'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="puzzle-piece" class="mr-3" /><p>Topics</p></mdb-list-group-item
                >
             </router-link>

             <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/events/listing'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="calendar-check" class="mr-3" /><p>Events</p></mdb-list-group-item
                >
             </router-link>
             
            <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/users'})">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="users" class="mr-3" /><p>Users</p></mdb-list-group-item
                >
            </router-link>
          </div>
        <router-link v-if="user.authenticated && user.data.isAdmin" :to="({path: '/messages'})">
            <mdb-list-group-item
                id="sidebar-item"
                @click.native="activeItem = 5"
                :action="true"
                :class="activeItem === 5 && 'active'"
                ><mdb-icon icon="envelope" class="mr-3" /><p>Messages</p>
            </mdb-list-group-item>
        </router-link>
        <mdb-list-group-item
            id="sidebar-item"
            v-if="user.authenticated"
            @click.native="activeItem = 2; showProfileDropdown = !showProfileDropdown;"
            :action="true"
            :class="activeItem === 2 && 'active'"
            >
            <mdb-icon icon="user" class="mr-3" />
            <p class="ml-2">Profile</p>
          </mdb-list-group-item>
          <div v-if="showProfileDropdown" class="sidebar-submenu">
            <router-link v-if="user.authenticated" :to="{name: 'userprofile', params: {id: user.data.id}}">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="user" class="mr-3" /><p>Profile</p></mdb-list-group-item
                >
            </router-link>
            <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                @click.native="switchViews"
                ><mdb-icon icon="retweet" class="mr-3" /><p>Go to website</p></mdb-list-group-item
                >
            <router-link v-if="user.authenticated" to="#" @click.native="out">
                <mdb-list-group-item
                id="sidebar-item"
                :action="true"
                ><mdb-icon icon="sign-out-alt" class="mr-3" /><p>Sign Out</p></mdb-list-group-item
                >
            </router-link>
          </div>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <!-- <FooterComponent></FooterComponent> -->
</div>
</div>
<!-- /Admin Sidebar and footer -->
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbBtn,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbFooter,
  waves,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem,
  mdbInput
} from "mdbvue";
    //import FooterComponent from '@/components/templates/Footer'

import { mapActions, mapGetters } from 'vuex'
export default {
  name: "AdminTemplate",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbBtn,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
    ftr: mdbFooter,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbInput,
    //FooterComponent
  },
  data() {
    return {
      activeItem: 1,
      showProfileDropdown: false,
      showBooksDropdown: false,
      showSettingsDropdown: false,
      switchToWebsite: JSON.parse(window.localStorage.getItem('switchToWebsite')),
    };
  },
  mixins: [waves],
  computed: {
        ...mapGetters({
            user: 'getUser'
        }),
        activeLink() {
          return this.activeItem
        },
        switchView() {
            return this.switchToWebsite
        }
    },
    // watch: {
    //     activeItem() {
    //         console.log(this.activeItem)
    //         this.setNavbarColor()
    //     }
    // },

    mounted() {
      this.setNavbarColor()
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
            this.activeItem = 1
            localStorage.setItem('switchToWebsite', JSON.stringify(false))
            this.switchToWebsite = JSON.parse(localStorage.getItem('switchToWebsite'))
        },
        switchViews(){
            if(!this.switchView){
                localStorage.setItem('switchToWebsite', JSON.stringify(true))
                this.switchToWebsite = JSON.parse(localStorage.getItem('switchToWebsite'))
                this.$router.push({path: '/'})
                this.activeItem = 1
            }else{
                localStorage.setItem('switchToWebsite', JSON.stringify(false))
                this.switchToWebsite = JSON.parse(localStorage.getItem('switchToWebsite'))
                this.$router.push({path: '/'})
                this.activeItem = 1
            }

        },
        setNavbarColor(){
          let linkItems = window.location.href.split('/')
          let navItem = linkItems[4]
          switch(navItem){
            case (''):
              this.activeItem = 1;
              break
            case ('userProfile'): 
              this.activeItem = 2
              break
            case ('messages'): 
              this.activeItem = 5
              break
            case ('categories'): 
              this.activeItem = 4
              break
            case ('userTypes'): 
              this.activeItem = 4
              break
            case ('locations'): 
              this.activeItem = 4
              break
            case ('memberships'): 
              this.activeItem = 4
              break
            case ('countries'): 
              this.activeItem = 4
              break
            case ('requests'): 
              this.activeItem = 4
              break
            case ('faculties'): 
              this.activeItem = 4
              break
            case ('users'): 
              this.activeItem = 4
              break
            case ('booksList'): 
              this.activeItem = 3
              break
            case ('books'): 
              this.activeItem = 3
              break
          }
        }
    }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>

<style scoped>
main {
    background-color: #ededee;
}

.flexible-content {
    transition: padding-left 0.3s;
  padding-left: 270px;
  background: #e9e9e9;
  min-height: 100vh;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.scrollable{
    overflow-y: auto;
}

::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #a5a5a5;
  border-radius: 5px; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0d6efd;
}

.sidebar-fixed {
    left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .list-group-item {
    display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    width: 100px;
    overflow-x: hidden;
  }

  #sidebar-item, p{
    display: none !important;
  }
  
  .flexible-content {
    padding-left: 100px;
    margin: auto;
  }
  .flexible-navbar {
    padding-left: 100px;
  }
}

.sidebar-submenu{
transition: 1s;
  margin: 0 10%;
  width: 90%;
  background: #0d6efd;
}

#sidebar-item{
    display: flex !important;
    align-items: center !important;
}

#sidebar-item, p{
    justify-content: flex-start !important;
    text-align: center !important;  
    margin: 0;
}

.logo-wrapper{
    width: 100%;
    margin: 0;
    padding: 0;
}

.logo-wrapper{
   width: 100%;
    padding: 0;
    margin: 20px 0;
    max-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center; 
}

.logo-wrapper img{
    width: 200px;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.footer-logo-wrapper{
    width: 100%;
    padding: 0;
    margin: 0;
    max-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer-logo-wrapper img{
    width: 300px;
    align-items: center;
    justify-content: center;
    margin: auto;
}

.content-container{
    height: 100%;
}

</style>