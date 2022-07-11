<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Edit Faculty
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="EditFaculty">

                                    <div class="form-group row">

                                        <label for="emri" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Emri: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="emri" name="emri" 
                                                   v-model="emri"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'emri': true, 'is-invalid': errors.has('emri') }"/>
                                            <small v-show="errors.has('emri')" class="help is-danger">{{ errors.first('emri') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="drejtimi" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Drejtimi: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="drejtimi" name="drejtimi" 
                                                   v-model="drejtimi"
                                                   v-validate="'required|min:2|max:50'"
                                                   :class="{'drejtimi': true, 'is-invalid': errors.has('drejtimi') }"/>
                                            <small v-show="errors.has('drejtimi')" class="help is-danger">{{ errors.first('drejtimi') }}</small>
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
        name: 'editFaculty',

        data() {
            return {
                emri: '',
                drejtimi: '',
            }
        },
        computed: {
            facultyId() {
                return this.$route.params.id
            },
        },
        async mounted(){
            await this.fetchFaculty()
        },
        methods: {
            async fetchFaculty(){
                const response = await axios.get(`http://localhost:8000/api/faculty/${this.facultyId}`)
                this.emri = response.data.emri,
                this.drejtimi = response.data.drejtimi
            },
            async EditFaculty() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.put(`http://localhost:8000/api/editFaculty/${this.facultyId}`, {_id: this.facultyId, emri: this.emri, drejtimi: this.drejtimi})
                        this.emri = null,
                        this.drejtimi = null
                        this.$router.push({path:"/faculties"})
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
