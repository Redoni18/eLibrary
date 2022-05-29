<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">

                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Insert a new book
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
                                            <input type="text" class="form-control form-control-sm" id="title" name="title" placeholder="Enter book title"
                                                   v-model="bookTitle"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'title': true, 'is-invalid': errors.has('title') }">
                                            <small v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="author" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Author</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="author" name="author" placeholder="Enter book author"
                                                   v-model="bookAuthor"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'author': true, 'is-invalid': errors.has('author') }">
                                            <small v-show="errors.has('author')" class="help is-danger">{{ errors.first('author') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Enter book description"
                                                   v-model="bookDescription"
                                                   v-validate="'required|min:2|max:150'"
                                                   :class="{'description': true, 'is-invalid': errors.has('description') }"></textarea>
                                            <small v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="year" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Year</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="number" class="form-control form-control-sm" id="year" name="year" placeholder="Enter published year"
                                                   v-model="bookYear"
                                                   v-validate="'required|min:2|max:4'"
                                                   :class="{'year': true, 'is-invalid': errors.has('year') }">
                                            <small v-show="errors.has('year')" class="help is-danger">{{ errors.first('year') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="image" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Cover Image</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input @change="setFile" type="file" class="form-control form-control-sm" id="image" name="bookImage" placeholder="Chose a book cover"
                                                   :class="{'image': true, 'is-invalid': errors.has('image') }">
                                            <small v-show="errors.has('image')" class="help is-danger">{{ errors.first('image') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Insert Book</button>
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
        name: 'Signup',

        data() {
            return {
                bookTitle: null,
                bookAuthor: null,
                bookDescription: null,
                bookYear: null,
                bookCover: null
            }
        },

        methods: {
            ...mapActions({
                createBook: 'createBook'
            }),
            setFile(e){
                this.bookCover = e.target.files[0].name
            },
            create() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.createBook({
                            title: this.bookTitle,
                            author: this.bookAuthor,
                            description: this.bookDescription,
                            year: this.bookYear,
                            image: this.bookCover
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
</style>
