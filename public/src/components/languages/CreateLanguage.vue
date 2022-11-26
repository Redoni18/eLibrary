<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Create new Language
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="createLanguage">

                                    <div class="form-group row">

                                        <label for="languageName" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Language: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="languageName" name="languageName" placeholder="Insert language"
                                                   v-model="languageName"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'languageName': true, 'is-invalid': errors.has('languageName') }"/>
                                            <small v-show="errors.has('languageName')" class="help is-danger">{{ errors.first('languageName') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Create</button>
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
        name: 'InsertLanguage',
        data() {
            return {
                languageName: null,
            }
        },
        methods: {
            async createLanguage() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/createLanguage", {languageName: this.languageName})
                        this.languageName = null
                        this.$router.push({path:"/language"})

                        this.$toast.success("Language added successfully", {
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