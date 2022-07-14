<template>
    <div class="signup_container">
        <div class="row">
            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Insert a new Blogpost
                            </div>
                        </div>
                    </div>


                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="create">
                                    <div class="form-group row">

                                        <label for="title" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Title</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="title" name="title" placeholder="Enter post title"
                                                   v-model="blogpostTitle"
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
                                            <input type="text" class="form-control form-control-sm" id="imageUrl" name="imageUrl" placeholder="Or provide an image url"
                                                   v-model="imageUrl"
                                                   v-validate="'required|min:2'"
                                                   :class="{'imageUrl': true, 'is-invalid': errors.has('imageUrl') }"/>
                                            <small v-show="errors.has('imageUrl')" class="help is-danger">{{ errors.first('imageUrl') }}</small>
                                        </div>
                                    </div>


                                    <div class="form-group row">

                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Enter post description"
                                                   v-model="blogpostDescription"
                                                   v-validate="'required|min:2|max:1000'"
                                                   :class="{'description': true, 'is-invalid': errors.has('description') }"></textarea>
                                            <small v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</small>
                                        </div>
                                    </div>


                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Insert Blogpost</button>
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
    import { mapActions } from 'vuex'
    export default {
        name: 'InsertBlogpost',

        data() {
            return {
                blogpostTitle: null,
                blogpostCover: null,
                imageUrl: null,
                blogpostDescription: null,
                
            }
        },
        methods: {
            ...mapActions({
                createBlogpost: 'createBlogpost'
            }),
            setFile(e){
                this.blogpostCover = e.target.files[0].name
            },
            create() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.createBlogpost({
                            title: this.blogpostTitle,
                            image: this.blogpostCover,
                            imageUrl: this.imageUrl,
                            description: this.blogpostDescription,
                           
                        });

                        this.$toast.success("Blogpost published successfully", {
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
            }
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
