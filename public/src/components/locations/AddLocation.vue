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
                                        <label for="country" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Country: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <v-select v-model="selectedCountry" :options="allCountries" label="name">
                                                <template #search="{attributes, events}">
                                                    <input
                                                    id="country" 
                                                    name="country"
                                                    :required="!selectedCountry"
                                                    :placeholder="!selectedCountry ? 'Select a country...' : ''"
                                                    class="vs__search"
                                                    :class="{'country': true, 'is-invalid': errors.has('country') }"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>
                                            </v-select>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="region" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Region: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <v-select v-model="selectedRegion" :options="allRegions" label="name">
                                                <template #search="{attributes, events}">
                                                    <input
                                                    id="region" 
                                                    name="region"
                                                    :required="!selectedRegion"
                                                    :placeholder="!selectedRegion ? 'Select a region...' : ''"
                                                    class="vs__search"
                                                    :class="{'region': true, 'is-invalid': errors.has('region') }"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>
                                            </v-select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label for="city" class="col-sm-3 col-md-3 col-lg-3 col-form-label">City: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <v-select v-model="selectedCity" :options="allCities" label="name">
                                                <template #search="{attributes, events}">
                                                    <input
                                                    id="city" 
                                                    name="city"
                                                    :required="!selectedCity"
                                                    :placeholder="!selectedCity ? 'Select a city...' : ''"
                                                    class="vs__search"
                                                    :class="{'city': true, 'is-invalid': errors.has('city') }"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>
                                            </v-select>
                                        </div>
                                    </div>

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
                                                   v-validate="'required|numeric|max:20'"
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
    var headers = new Headers();
    headers.append("X-CSCAPI-KEY", "YTlpenh2WjY0RU5QVFFRSURzdnI2QUtYd2I4ZjhMRVE2alc0UjFRQQ==");

    var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
    };
    import axios from 'axios'
    export default {
        name: 'AddLocation',

        data() {
            return {
                regions: [],
                selectedRegion: '',
                name: '',
                countries: [],
                selectedCountry: '',
                locationAddress: '',
                locationPhoneNumber: '',
                region: '',
                iso: '',
                iso2: '',
                cities: [],
                city: '',
                selectedCity: '',
                details: [],
            }
        },
        mounted() {
            this.getCountries()
        },
        computed: {
            allCountries() {
                return this.countries;
            },
            allRegions(){
                return this.regions
            },
            allCities(){
                return this.cities
            },
            allDetails(){
                return this.details
            }
        },
        watch : {
               selectedCountry:function() {
                  this.getRegions()
               },
               selectedRegion:function(){
                this.getCities()
               }
            },
        methods: {
            async getCountries(){
                const response = await axios.get('http://localhost:8000/api/countries')
                console.log(response)               
                this.countries = response.data
                console.log(this.countries)
                // for(let i = 0;i<response.data.length;i++){
                //     this.countries.push(
                //         {name: response.data[i].name, iso: response.data[i].isoCountryCode}
                //     )
                // }
            },
            async getRegions(){
                console.log(this.selectedCountry.isoCountryCode)
                const response = await fetch(`https://api.countrystatecity.in/v1/countries/${this.selectedCountry.isoCountryCode}/states`,requestOptions)
                const allRegions = await response.json()
                this.regions = allRegions
                console.log("rajonet",this.regions)
                console.log(this.regions.iso2)
                // for(let i = 0;i<allCities.length;i++){
                //     this.cities.push(allCities[i].name)
                // }
            },
            async getCities(){
                const response = await fetch(`https://api.countrystatecity.in/v1/countries/${this.selectedCountry.isoCountryCode}/states/${this.selectedRegion.iso2}/cities`,requestOptions)
                const allCities = await response.json()
                this.cities = allCities
                console.log("qytetet",this.cities)
                // for(let i = 0;i<allCities.length;i++){
                //     this.cities.push(allCities[i].name)
                // }
                const response1 = await fetch(`https://api.countrystatecity.in/v1/countries/${this.selectedCountry.isoCountryCode}/states/${this.selectedRegion.iso2}`,requestOptions)
                this.details = await response1.json()
                console.log("detajet",this.details)
                
                console.log(allCities)
                console.log(this.selectedCity)
            },
            async getDetails(){
                const response = await fetch(`https://api.countrystatecity.in/v1/countries/${this.selectedCountry.isoCountryCode}/states/${this.selectedRegion.iso2}`,requestOptions)
                this.details = await response.json()
                console.log("detajet",this.details)
            },    
            async addLocation() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/addLocation", {city:this.selectedCity.name, address: this.locationAddress, phoneNumber: this.locationPhoneNumber, latitude: this.details.latitude,longitude: this.details.longitude})
                        this.selectedCity = null
                        this.locationAddress = null
                        this.locationPhoneNumber = null
                        this.$router.push({path:"/locations/listing"})

                        this.$toast.success("Location added successfully", {
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
                        console.log(selectedCity)
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
