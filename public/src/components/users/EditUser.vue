<template>
    <div class="signin_container mt-0">
        <div class="row">

            <div class="col-md-8 offset-2">

                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-1">
                                Edit User Email
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" v-on:submit.prevent="submit">
                                    <div class="form-group row">

                                        <label for="email" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Email</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="email" class="form-control form-control-sm" id="email" name="email" placeholder="Enter email address"
                                                   v-model="selectedUser.email"
                                                   v-validate="'required|email|unique'"
                                                   :class="{'email': true, 'is-invalid': errors.has('email') }">
                                            <small v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-8 offset-sm-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Save Changes</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapActions } from 'vuex'


    export default {
        name: 'EditUser',

        data() {
            return {
                selectedUser: null,
            }
        },
        computed: {
            userId(){
                return this.$route.params.id
            },
            
        },
        async mounted() {
            const response = await this.get_profile(this.userId)
            this.selectedUser = response.data
        },

        methods: {
            ...mapActions({
                editUser: 'editUser',
                get_profile: "get_profile"
            }),
            submit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {

                        this.editUser({
                            _id: this.userId,
                            email: this.selectedUser.email,
                        })

                        this.$router.push('/users')

                        return true;
                    }
                });
            },
        }
    }
</script>


<style scoped>
.signin_container{
        margin-top: 100px;
    }
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    label {
        float: left;
    }
    .title {
        text-align: center;
    }

    .card-header {
        margin-bottom: 20px;
    }
</style>
