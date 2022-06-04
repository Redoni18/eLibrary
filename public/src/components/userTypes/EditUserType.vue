<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Create new user type
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="editUserType">

                                    <div class="form-group row">

                                        <label for="userType" class="col-sm-3 col-md-3 col-lg-3 col-form-label">User Type: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="userType" name="userType" placeholder="Insert new user type"
                                                   v-model="typeUser"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'userType': true, 'is-invalid': errors.has('userType') }"/>
                                            <small v-show="errors.has('userType')" class="help is-danger">{{ errors.first('userType') }}</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Save</button>
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
    import axios from 'axios'
    export default {
        name: 'InsertUserType',

        data() {
            return {
                typeUser: '',
            }
        },
        computed: {
            userTypeId() {
                return this.$route.params.id
            },
        },
        async mounted(){
            await this.fetchUserType()
        },
        methods: {
            async fetchUserType(){
                const response = await axios.get(`http://localhost:8000/api/userType/${this.userTypeId}`)
                this.typeUser = response.data.userType
                console.log(this.typeUser)
            },
            async editUserType() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.put(`http://localhost:8000/api/editUserType/${this.userTypeId}`, {_id: this.userTypeId, userType: this.typeUser})
                        this.typeUser = null
                        return true;
                    }
                });
            },
        },
    }
</script>


<style scoped>
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
    a {
        color: #42b983;
    }
    label {
        float: left;
    }
    .card-header {
        margin-bottom: 20px;
    }
</style>
