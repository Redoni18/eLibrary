<template>
    <div class="d-flex justify-content-center align-items-center mb-5">
        <b-card bg-variant="light" style="width: 50%;">
            <div class="d-flex justify-content-center align-items-center mb-4">
                <b-avatar variant="primary" v-if="user.authenticated" :text="user.data.name.slice(0, 2)" size="5rem"></b-avatar> 
            </div>
            <b-form-group
                label="Name: "
                label-for="name"
                label-cols-sm="2"
                label-align-sm="left"                
            >
                <b-form-input readonly v-model="selectedUser.name" id="name"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Email: "
                label-for="email"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input readonly v-model="selectedUser.email" id="email"></b-form-input>
            </b-form-group>

            <b-form-group
                v-if="selectedUser.userType && !user.data.isAdmin"
                label="User Type: "
                label-for="userType"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input readonly v-model="selectedUser.userType.userType" id="userType"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Bio: "
                label-for="bio"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-textarea readonly v-model="selectedUser.bio" placeholder="Write something about yourself..." rows="2" max-rows="3" id="bio"></b-form-textarea>
            </b-form-group>

            <b-form-group
                label="City: "
                label-for="city"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input readonly v-model="selectedUser.city" id="city"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Birthday: "
                label-for="birthday"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input readonly v-model="selectedUser.birthday" id="birthday" type="date"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Social: "
                label-for="social"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input readonly v-model="selectedUser.social1" class="mb-2" id="social1"></b-form-input>
                <b-form-input readonly v-model="selectedUser.social2" class="mb-2" id="social2"></b-form-input>
                <b-form-input readonly v-model="selectedUser.social3" class="mb-2" id="social3"></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-center align-items-start">
                <b-button variant="primary" v-if="user.data.id === userId" @click="editProfile">Edit Profile</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
      return {
          selectedUser: {}
      }
    },
    computed: {
        userId() {
            return this.$route.params.id
        },
        ...mapGetters({
            user: 'getUser'
        }),
    },
    created() {
    },
    async mounted(){
        const response = await this.get_profile(this.userId)
        this.selectedUser = response.data
    },

    methods: {
        ...mapActions({
            get_profile: "get_profile"
        }),
        editProfile() {
            this.$router.push({ name: "editprofile", params: {id: this.userId}})
        }
    }
  }
</script>