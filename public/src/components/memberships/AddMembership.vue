<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Add new membership
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="addMembership">

                                    <div class="form-group row">

                                        <label for="userType" class="col-sm-3 col-md-3 col-lg-3 col-form-label">User Type: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <v-select v-model="selectedUserType" :options="allUserTypes" label="userType">
                                                <template #search="{attributes, events}">
                                                    <input
                                                    id="userType" 
                                                    name="userType"
                                                    :required="!selectedUserType"
                                                    :placeholder="!selectedUserType ? 'Select a user type...' : ''"
                                                    class="vs__search"
                                                    :class="{'userType': true, 'is-invalid': errors.has('userType') }"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>
                                            </v-select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">

                                        <label for="duration" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Duration: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="duration" name="duration" placeholder="Insert duration"
                                                   v-model="membershipDuration"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'duration': true, 'is-invalid': errors.has('duration') }"/>
                                            <small v-show="errors.has('duration')" class="help is-danger">{{ errors.first('duration') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="price" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Price: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="price" name="price" placeholder="Insert price"
                                                   v-model="membershipPrice"
                                                   v-validate="'required|decimal'"
                                                   :class="{'price': true, 'is-invalid': errors.has('price') }"/>
                                            <small v-show="errors.has('price')" class="help is-danger">{{ errors.first('price') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Insert description"
                                                   v-model="membershipDescription"
                                                   v-validate="'required|min:2|max:150'"
                                                   :class="{'description': true, 'is-invalid': errors.has('description') }"/>
                                            <small v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Add</button>
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
        name: 'AddMembership',

        data() {
            return {
                userTypes: [],
                selectedUserType: '',
                membershipDuration: '',
                membershipPrice: '',
                membershipDescription: '',
            }
        },
        mounted() {
            this.getUserTypes()
        },
        computed: {
            allUserTypes() {
                return this.userTypes;
            }
        },
        methods: {
            async getUserTypes(){
                const response = await axios.get('http://localhost:8000/api/userTypes')
                console.log(response)
                for(let i = 0;i<response.data.length;i++){
                    this.userTypes.push(response.data[i])
                }
            },
            async addMembership() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/addMembership", {userType: this.selectedUserType, duration: this.membershipDuration, price: this.membershipPrice, description: this.membershipDescription})
                        this.selectedUserType = null
                        this.membershipDuration = null
                        this.membershipPrice = null
                        this.membershipDescription = null
                        this.$router.push({path:"/memberships"})
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
