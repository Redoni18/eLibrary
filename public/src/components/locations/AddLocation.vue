<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Add new location
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="addLocation">

                                    <div class="form-group row">

                                        <label for="address" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Address: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="address" name="address" placeholder="Add new address"
                                                   v-model="locationAddress"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'address': true, 'is-invalid': errors.has('address') }"/>
                                            <small v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">

                                        <label for="phoneNumber" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Phone Number: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="phoneNumber" name="phoneNumber" placeholder="Insert phone number"
                                                   v-model="locationPhoneNumber"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'phoneNumber': true, 'is-invalid': errors.has('phoneNumber') }"/>
                                            <small v-show="errors.has('phoneNumber')" class="help is-danger">{{ errors.first('phoneNumber') }}</small>
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
        name: 'AddLocation',

        data() {
            return {
                locationAddress: '',
                locationPhoneNumber: '',
            }
        },
        methods: {
            async addLocation() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/addLocation", {address: this.locationAddress, phoneNumber: this.locationPhoneNumber})
                        this.locationAddress = null
                        this.locationPhoneNumber = null
                        this.$router.push({path:"/locations"})
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
