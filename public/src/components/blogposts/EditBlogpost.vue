<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">

                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Edit {{selectedBlogpost.title}}
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="edit">
                                    <div class="form-group row">

                                        <label for="title" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Title</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="title" name="title" placeholder="Enter post title"
                                                   v-model="selectedBlogpost.title"
                                                   v-validate="'required|min:2|max:100'"
                                                   :class="{'title': true, 'is-invalid': errors.has('title') }">
                                            <small v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="image" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Cover Image</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input @change="setFile" type="file" class="form-control form-control-sm" id="image" name="blogpostImage" placeholder="Chose a post cover"
                                                   :class="{'image': true, 'is-invalid': errors.has('image') }">
                                            <small v-show="errors.has('image')" class="help is-danger">{{ errors.first('image') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="imageUrl" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Image Url</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="imageUrl" name="imageUrl" placeholder="Or provide an image url"
                                                   v-model="selectedBlogpost.imageUrl"
                                                   v-validate="'required|min:2'"
                                                   :class="{'imageUrl': true, 'is-invalid': errors.has('imageUrl') }"></textarea>
                                            <small v-show="errors.has('imageUrl')" class="help is-danger">{{ errors.first('imageUrl') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Enter post description"
                                                   v-model="selectedBlogpost.description"
                                                   v-validate="'required|min:2|max:1000'"
                                                   :class="{'description': true, 'is-invalid': errors.has('description') }"></textarea>
                                            <small v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Update Blogpost</button>
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
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            selectedBlogpost: {},
        }
    },
    computed: {
        blogpostId() {
            return this.$route.params.id
        },
    },
    async mounted(){
        const response = await this.getBlogpost(this.blogpostId)
        this.selectedBlogpost = response.data
    },
    methods: {
        ...mapActions({
            updateBlogpost: 'updateBlogpost',
            getBlogpost: 'getBlogpost'
        }),
        setFile(e){
            this.selectedBlogpost.image = e.target.files[0].name
        },
        edit () {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.updateBlogpost({
                        _id: this.blogpostId,
                        title: this.selectedBlogpost.title,
                        image: this.selectedBlogpost.image,
                        imageUrl: this.selectedBlogpost.imageUrl,
                        description: this.selectedBlogpost.description, 
                    });

                    this.$toast.success("Blogpost updated successfully", {
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
    }
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

    .signup_container{
        margin-bottom: 15px;
    }
</style>