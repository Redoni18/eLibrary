<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                               Edit staff info
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="editStaff">

                                    <div class="form-group row">

                                        <label for="name" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Staff name: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="name" name="name" placeholder="Insert new user type"
                                                   v-model="staffName"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'name': true, 'is-invalid': errors.has('name') }"/>
                                            <small v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="email" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Staff email: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="email" name="email" placeholder="Insert new user type"
                                                   v-model="staffEmail"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'email': true, 'is-invalid': errors.has('email') }"/>
                                            <small v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="position" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Staff position: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="position" name="position" placeholder="Insert new user type"
                                                   v-model="staffPosition"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'position': true, 'is-invalid': errors.has('position') }"/>
                                            <small v-show="errors.has('position')" class="help is-danger">{{ errors.first('position') }}</small>
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
        name: 'InsertStaff',
        data() {
            return {
                staffName: null,
                staffEmail: null,
                staffPosition: null,
            }
        },
        computed: {
            staffId() {
                return this.$route.params.id
            },
        },
         mounted(){
             this.fetchStaff()
        },
        methods: {
            async fetchStaff(){
                const response = await axios.get(`http://localhost:8000/api/staff/${this.staffId}`)
                console.log(response)
                this.staffName = response.data.staffName
                this.staffEmail = response.data.staffEmail
                this.staffPosition = response.data.position
            },
            async editStaff() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.put(`http://localhost:8000/api/editStaff/${this.staffId}`, {_id: this.staffId, staffName: this.staffName, staffEmail: this.staffEmail, position: this.staffPosition})
                        this.staffName = null
                        this.staffEmail = null
                        this.staffPosition = null
                        this.$router.push({path:"/staff"})
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