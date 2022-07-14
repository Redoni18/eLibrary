<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Add new country
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="addCountry">

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
        name: 'AddCountry',
        data() {
            return {
                countries: [],
                selectedCountry: '',
                name: '',
                isoCountryCode: ''
            }
        },
        mounted() {
            this.getCountries()
        },
        computed: {
            allCountries() {
                return this.countries;
            }
        },  
        methods: {
            async getCountries(){
                const response = await fetch("https://api.countrystatecity.in/v1/countries", requestOptions)
                const allCountries = await response.json()
                for(let i = 0;i<allCountries.length;i++){
                    this.countries.push(
                        {name: allCountries[i].name, isoCode: allCountries[i].iso2}
                    )
                }
            },
            async addCountry() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/addCountry", {name: this.selectedCountry.name, isoCountryCode: this.selectedCountry.isoCode })
                        console.log(this.selectedCountry.name)
                        this.$router.push({path:"/countries/listing"})

                        this.$toast.success("Country added successfully", {
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
