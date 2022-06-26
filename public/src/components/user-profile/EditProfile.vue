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
                <b-form-input v-model="currentUser.name" id="name"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Email: "
                label-for="email"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input v-model="currentUser.email" id="email"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Bio: "
                label-for="bio"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-textarea v-model="currentUser.bio" placeholder="Write something about yourself..." rows="2" max-rows="3" id="bio"></b-form-textarea>
            </b-form-group>

            <b-form-group
                label="City: "
                label-for="city"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input v-model="currentUser.city" id="city"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Birthday: "
                label-for="birthday"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input v-model="currentUser.birthday" id="birthday" type="date"></b-form-input>
            </b-form-group>

            <b-form-group
                label="Social: "
                label-for="social"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input v-model="currentUser.social1" class="mb-2" id="social1"></b-form-input>
                <b-form-input v-model="currentUser.social2" class="mb-2" id="social2"></b-form-input>
                <b-form-input v-model="currentUser.social3" class="mb-2" id="social3"></b-form-input>
            </b-form-group>

            <div class="d-flex justify-content-center align-items-center">
                <b-button variant="success" @click="saveProfile">Save</b-button>
            </div>
        </b-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
      return {
          active: true,
          currentUser: {}
      }
    },
    async mounted(){
        const data = await this.get_profile(this.userId);
        this.currentUser = data.data
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        }),
        userId() {
            return this.$route.params.id
        },
    },
    methods: {
        ...mapActions({
            editProfile: 'editProfile',
            signOut: 'signOut',
            get_profile: "get_profile"
        }),
        async saveProfile() {
            if(this.currentUser.name.length > 2 && this.currentUser.email.length > 10){

                await this.editProfile({
                    _id: this.userId,
                    name: this.currentUser.name,
                    email: this.currentUser.email,
                    bio: this.currentUser.bio,
                    city: this.currentUser.city,
                    birthday: this.currentUser.birthday,
                    social1: this.currentUser.social1,
                    social2: this.currentUser.social2,
                    social3: this.currentUser.social3
                });
            }else {
                return
            }

            await this.getProfile()
        },

        async getProfile(){
            await this.get_profile(this.userId);
            this.$nextTick(function () {
                this.$router.push({name: 'userprofile', params: {id: this.userId}})
            })
        }
    }
  }
</script>