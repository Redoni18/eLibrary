<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                               Edit Topic info
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="editTopic">

                                    <div class="form-group row">

                                        <label for="topicName" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Topic name: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="topicName" name="topicName" placeholder="Insert new topic name"
                                                   v-model="topicName"
                                                   v-validate="'required|min:2'"
                                                   :class="{'topicName': true, 'is-invalid': errors.has('topicName') }"/>
                                            <small v-show="errors.has('topicName')" class="help is-danger">{{ errors.first('topicName') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="topicDescription" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Topic Description: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="topicDescription" name="topicDescription" placeholder="Insert new topic description"
                                                   v-model="topicDescription"
                                                   v-validate="'required|min:2'"
                                                   :class="{'topicDescription': true, 'is-invalid': errors.has('topicDescription') }"/>
                                            <small v-show="errors.has('topicDescription')" class="help is-danger">{{ errors.first('topicDescription') }}</small>
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
        name: 'InsertTopic',
        data() {
            return {
                topicName: null,
                topicDescription: null,
            }
        },
        computed: {
            topicId() {
                return this.$route.params.id
            },
        },
         mounted(){
             this.fetchTopic()
        },
        methods: {
            async fetchTopic(){
                const response = await axios.get(`http://localhost:8000/api/topic/${this.topicId}`)
                console.log(response)
                this.topicName = response.data.topicName
                this.topicDescription = response.data.topicDescription
                
            },
            async editTopic() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.put(`http://localhost:8000/api/editTopic/${this.topicId}`, {_id: this.topicId, topicName: this.topicName, topicDescription: this.topicDescription})
                        this.topicName = null
                        this.topicDescription = null
                    
                        this.$router.push({path:"/topic"})

                        this.$toast.success("Topic updated successfully", {
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