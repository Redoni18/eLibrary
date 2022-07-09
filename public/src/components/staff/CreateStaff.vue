<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Insert Staff
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="createStaff">

                                    <div class="form-group row">

                                        <label for="staffName" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Staff Name: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="staffName" name="staffName" placeholder="Insert name"
                                                   v-model="staffName"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'staffName': true, 'is-invalid': errors.has('staffName') }"/>
                                            <small v-show="errors.has('staffName')" class="help is-danger">{{ errors.first('staffName') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="staffEmail" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Staff email: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="staffEmail" name="staffEmail" placeholder="Insert email"
                                                   v-model="staffEmail"
                                                   v-validate="'required|min:2|max:30'"
                                                   :class="{'staffEmail': true, 'is-invalid': errors.has('staffEmail') }"/>
                                            <small v-show="errors.has('staffEmail')" class="help is-danger">{{ errors.first('staffEmail') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="position" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Staff Position: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="position" name="position" placeholder="Insert position"
                                                   v-model="staffPosition"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'position': true, 'is-invalid': errors.has('position') }"/>
                                            <small v-show="errors.has('position')" class="help is-danger">{{ errors.first('position') }}</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Insert</button>
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
                staffEmail:null,
                staffPosition:null,
            }
        },
        methods: {
            async createStaff() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/createStaff", {staffName: this.staffName, staffEmail: this.staffEmail, position: this.staffPosition})
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
