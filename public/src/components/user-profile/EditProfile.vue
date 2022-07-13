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
                <b-form-input v-validate="'required|min:2|max:50'" v-model="currentUser.name" id="name" name="name" 
                    :class="{'name': true, 'is-invalid': errors.has('name') }">
                </b-form-input>
                    <small v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</small>
            </b-form-group>

            <b-form-group
                label="Email: "
                label-for="email"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <b-form-input type="email" v-model="currentUser.email" id="email" name="email"
                    v-validate="rules"
                    :class="{'email': true, 'is-invalid': errors.has('email') }">
                ></b-form-input>
                <small v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
            </b-form-group>

            <b-form-group
                v-if="!user.data.isAdmin"
                label="User Type: "
                label-for="userType"
                label-cols-sm="2"
                label-align-sm="left"
            >
                <v-select v-model="currentUser.userType" :options="allUserTypes" label="userType">
                    <template #search="{attributes, events}">
                        <input
                        id="userType" 
                        name="userType"
                        :required="!currentUser.userType"
                        :placeholder="!currentUser.userType ? 'Select user type...' : ''"
                        class="vs__search"
                        :class="{'userType': true, 'is-invalid': errors.has('userType') }"
                        v-bind="attributes"
                        v-on="events"
                        />
                    </template>
                </v-select>
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
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
      return {
          active: true,
          currentUser: {},
          userTypes: [],
          currentEmail: '',
      }
    },
    async mounted(){
        const data = await this.get_profile(this.userId);
        this.currentUser = data.data
        this.currentEmail = data.data.email
        await this.getUserTypes()
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        }),
        userId() {
            return this.$route.params.id
        },
        allUserTypes(){
            
            return this.userTypes
        },
        rules () {
            return this.currentEmail === this.currentUser.email ? 'required|email':'required|email|unique'
        }
        // invalidNameFeedback(){
        //     if(this.currentUser.name.length > 2){
        //         return ''
        //     }else{
        //         return "Name should not be empty"
        //     }
        // },

        // invalidEmailFeedback(){
        //     if(this.currentUser.email.length > 10){
        //         return ''
        //     }else{
        //         return "Email should not be empty"
        //     }
        // }
    },
    methods: {
        ...mapActions({
            editProfile: 'editProfile',
            signOut: 'signOut',
            get_profile: "get_profile"
        }),
        async getUserTypes(){
                const response = await axios.get("http://localhost:8000/api/userTypes")
                console.log(response)
                for(let i = 0;i<response.data.length;i++){
                    this.userTypes.push(response.data[i])
                }
            },
        async saveProfile() {
            await this.$validator.validateAll().then((result) => {
                    if (result && this.currentUser.userType !== null && (this.user.data.isAdmin || !this.currentUser.email.includes('eLibrary'))) {
                        this.editProfile({
                            _id: this.userId,
                            name: this.currentUser.name,
                            email: this.currentUser.email,
                            userType: this.currentUser.userType,
                            bio: this.currentUser.bio,
                            city: this.currentUser.city,
                            birthday: this.currentUser.birthday,
                            social1: this.currentUser.social1,
                            social2: this.currentUser.social2,
                            social3: this.currentUser.social3
                        });

                        this.$toast.success("Profile updated successfully", {
                            position: "top-right",
                            timeout: 5000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,    
                            draggablePercent: 0.6,
                            showCloseButtonOnHover: false,
                            hideProgressBar: true,
                            closeButton: "button",
                            icon: true,
                            rtl: false
                        });

                        this.getProfile()
                    } else {
                        this.$toast.error("Problem while editing profile", {
                            position: "top-right",
                            timeout: 5000,
                            closeOnClick: true,
                            pauseOnFocusLoss: true,
                            pauseOnHover: true,
                            draggable: true,
                            draggablePercent: 0.6,
                            closeButton: "button",
                            icon: true,
                            rtl: false
                        });
                    }
                });

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