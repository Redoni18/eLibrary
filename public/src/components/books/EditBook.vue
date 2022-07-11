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
                                                   v-validate="'required|min:2|max:100'"
                                                   :class="{'title': true, 'is-invalid': errors.has('title') }">
                                            <small v-show="errors.has('title')" class="help is-danger">{{ errors.first('title') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="author" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Author</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="author" name="author" placeholder="Enter book author"
                                                   v-model="selectedBook.author"
                                                   v-validate="'required|min:2|max:100'"
                                                   :class="{'author': true, 'is-invalid': errors.has('author') }">
                                            <small v-show="errors.has('author')" class="help is-danger">{{ errors.first('author') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Enter book description"
                                                   v-model="selectedBook.description"
                                                   v-validate="'required|min:2|max:1000'"
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

                                        <label for="imageUrl" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Image Url</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <textarea type="text" class="form-control form-control-sm" id="imageUrl" name="imageUrl" placeholder="Or provide an image url"
                                                   v-model="selectedBook.imageUrl"
                                                   v-validate="'required|min:2'"
                                                   :class="{'imageUrl': true, 'is-invalid': errors.has('imageUrl') }"></textarea>
                                            <small v-show="errors.has('imageUrl')" class="help is-danger">{{ errors.first('imageUrl') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="isbn" class="col-sm-3 col-md-3 col-lg-3 col-form-label">ISBN</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="number" class="form-control form-control-sm" id="isbn" name="isbn" placeholder="Enter ISBN number"
                                                   v-model="selectedBook.isbn"
                                                   v-validate="'required|min:2|max:13'"
                                                   :class="{'isbn': true, 'is-invalid': errors.has('isbn') }">
                                            <small v-show="errors.has('isbn')" class="help is-danger">{{ errors.first('isbn') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">

                                        <label for="categories" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Category</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <v-select multiple  v-model="selectedBook.categories" :options="allCategories" label="title">
                                                <template #search="{attributes, events}">
                                                    <input
                                                    id="categories" 
                                                    name="categories"
                                                    :required="!selectedBook.categories"
                                                    :placeholder="!selectedBook.categories ? 'Select a category...' : ''"
                                                    class="vs__search"
                                                    :class="{'categories': true, 'is-invalid': errors.has('categories') }"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>
                                            </v-select>
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
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
    data(){
        return {
            selectedBook: {},
            categories: []
        }
    },
    computed: {
        bookId() {
            return this.$route.params.id
        },
        allCategories() {
            return this.categories
        }
    },
    async mounted(){
        const response = await this.getBook(this.bookId)
        this.selectedBook = response.data
        await this.getCategories()
    },
    methods: {
        async getCategories(){
            const response = await axios.get('http://localhost:8000/api/categories')
            console.log(response)
            for(let i = 0;i<response.data.length;i++){
                this.categories.push(response.data[i])
            }
        },
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
                        image: this.selectedBook.image,
                        imageUrl: this.selectedBook.imageUrl,
                        isbn: this.selectedBook.isbn,
                        categories: this.selectedBook.categories
                    });

                    this.$toast.success("Book updated successfully", {
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