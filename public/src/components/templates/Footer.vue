<template>
<div class="footer-component">
    <main>
      <ftr id="myFtr" color="primary-color-dark" class="text-center font-small darken-2 main-footer">
        <div class="pt-4">
        <router-link v-if="!user.authenticated" to="/signup">
          <mdb-btn
            outline="white"
            tag="a"
            target="_blank"
            >Sign Up <mdb-icon icon="user-plus" class="ml-2"
          /></mdb-btn>
        </router-link>
        <router-link v-if="!user.authenticated" to="/signin">
          <mdb-btn
            outline="white"
            tag="a"

            target="_blank"
            >Sign In<mdb-icon icon="sign-in-alt" class="ml-2"
          /></mdb-btn>
        </router-link>
          <div v-else class="footer-logo-wrapper">
            <router-link to="/#"
                ><img alt="" class="img-fluid sidebar-logo" src="../../assets/logo2.png"
            /></router-link>
          </div>
            </div>
        <hr class="my4" />
        <div class="pb-4">
          <a href="#"><mdb-icon fab icon="facebook-square" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="twitter" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="youtube" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="google-plus" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="dribbble" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="pinterest" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="github" class="mr-3"/></a>
          <a href="#"><mdb-icon fab icon="codepen" class="mr-3"/></a>
        </div>
        <p class="footer-copyright mb-0 py-3 text-center">
          &copy; {{ new Date().getFullYear() }} Copyright: LabCourse Group
        </p>
      </ftr>
    </main>
</div>
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
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem,
  mdbInput
} from "mdbvue";

import { mapGetters } from 'vuex'

export default {
    name: 'FooterComponent',
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
        mdbInput
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        }),
    },
    mounted(){
        this.removeClassFromFooter()
    },
    methods: {
        removeClassFromFooter(){
            var element = document.getElementById("myFtr");
            element.classList.remove("mt-4");
        }
    }
}
</script>

<style scoped>

@media (max-width: 1199.98px) {
    .footer-component{
        margin-left: 100px;
    }
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
</style>