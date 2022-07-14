<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">

                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Send us a Message!
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="sendMessage">

                                    <div class="form-group row">

                                        <label for="message" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Message Body</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea rows="4" cols="50" type="text" class="form-control form-control-sm" id="message" name="message" placeholder="Say something..."
                                                   v-model="messageBody"
                                                   v-validate="'required|min:2|max:500'"
                                                   :class="{'message': true, 'is-invalid': errors.has('message') }"></textarea>
                                            <small v-show="errors.has('message')" class="help is-danger">{{ errors.first('message') }}</small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Send Message</button>
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
    import { mapActions, mapGetters } from 'vuex'
    import axios from 'axios'
    export default {
        name: 'ContactUs',

        data() {
            return {
                messageBody: '',
            }
        },
        computed: {
            ...mapGetters({
                user: 'getUser'
            })
        },
        mounted() {
            this.getUsers();
        },

        methods: {
            ...mapActions({
                getUsers: 'getUsers'
            }),
            async sendMessage() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/postMessage", {messageBody: this.messageBody, user: this.user.data, senderName: this.user.data})
                    }
                });
                this.$router.push('/contact-us')
                this.messageBody = ''

                this.$toast.success("Message sent successfully", {
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
