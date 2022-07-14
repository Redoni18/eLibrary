<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Edit location
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="editLocation">

                                    <div class="form-group row">
                                        <label for="city" class="col-sm-3 col-md-3 col-lg-3 col-form-label">City: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9"  style="text-align:center">
                                            <span>{{city}}</span>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="address" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Address: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="address" name="address" placeholder="Add new address"
                                                   v-model="locationAddress"
                                                   v-validate="'required|min:2|max:50'"
                                                   :class="{'address': true, 'is-invalid': errors.has('address') }"/>
                                            <small v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="phoneNumber" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Phone Number: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="phoneNumber" name="phoneNumber" placeholder="Insert new phone number"
                                                   v-model="locationPhoneNumber"
                                                   v-validate="'required|numeric|max:20'"
                                                   :class="{'phoneNumber': true, 'is-invalid': errors.has('phoneNumber') }"/>
                                            <small v-show="errors.has('phoneNumber')" class="help is-danger">{{ errors.first('phoneNumber') }}</small>
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
        name: 'EditLocation',

        data() {
            return {
                city: '',
                locationAddress: '',
                locationPhoneNumber: '',
            }
        },
        computed: {
            locationId() {
                return this.$route.params.id
            },
        },
        async mounted(){
            await this.fetchLocation()
        },
        methods: {
            async fetchLocation(){
                const response = await axios.get(`http://localhost:8000/api/location/${this.locationId}`)
                this.city = response.data.city
                this.locationAddress = response.data.address
                this.locationPhoneNumber = response.data.phoneNumber
                this.latitude = response.data.latitude
                this.longitude = response.data.longitude
            },
            async editLocation() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.put(`http://localhost:8000/api/editLocation/${this.locationId}`, {_id: this.locationId,city:this.city, address: this.locationAddress, phoneNumber: this.locationPhoneNumber,latitude: this.latitude, longitude:this.longitude})
                        this.locationAddress = null
                        this.locationPhoneNumber = null
                        this.$router.push({path:"/locations/listing"})
                        
                        this.$toast.success("Location updated successfully", {
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
