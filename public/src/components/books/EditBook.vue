<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">

                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Edit {{selectedBook.title}}
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
                                            <input type="text" class="form-control form-control-sm" id="title" name="title" placeholder="Enter book title"
                                                   v-model="selectedBook.title"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'title': true, 'is-invalid': errors.has('title') }">
                                            <small v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="author" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Author</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="author" name="author" placeholder="Enter book author"
                                                   v-model="selectedBook.author"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'author': true, 'is-invalid': errors.has('author') }">
                                            <small v-show="errors.has('author')" class="help is-danger">{{ errors.first('author') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Enter book description"
                                                   v-model="selectedBook.description"
                                                   v-validate="'required|min:2|max:150'"
                                                   :class="{'description': true, 'is-invalid': errors.has('description') }"></textarea>
                                            <small v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="year" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Year</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="number" class="form-control form-control-sm" id="year" name="year" placeholder="Enter published year"
                                                   v-model="selectedBook.year"
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
                                            <button type="submit" class="btn btn-primary">Update Book</button>
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
    data(){
        return {
            selectedBook: {}
        }
    },
    computed: {
        bookId() {
            return this.$route.params.id
        },
    },
    async mounted(){
        const response = await this.getBook(this.bookId)
        this.selectedBook = response.data
    },
    methods: {
        ...mapActions({
            updateBook: 'updateBook',
            getBook: 'getBook'
        }),
        setFile(e){
            this.selectedBook.image = e.target.files[0].name
        },
        edit () {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.updateBook({
                        _id: this.bookId,
                        title: this.selectedBook.title,
                        author: this.selectedBook.author,
                        description: this.selectedBook.description,
                        year: this.selectedBook.year,
                        image: this.selectedBook.image
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
</style>

