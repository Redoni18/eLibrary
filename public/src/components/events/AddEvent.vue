<template>
    <div class="signup_container">

        <div class="row">

            <div class="col-md-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="offset-5">
                                Add new event
                            </div>
                        </div>
                    </div>

                    <div class="card-block">
                        <div class="row">
                            <div class="col-md-10 offset-1">

                                <form method="post" @submit.prevent="addEvent">

                                    <div class="form-group row">
                                        <label for="name" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Name: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="name" name="name" placeholder="Insert name"
                                                   v-model="eventName"
                                                   v-validate="'required|min:2|max:20'"
                                                   :class="{'name': true, 'is-invalid': errors.has('name') }"/>
                                            <small v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="books" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Books</label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <v-select multiple  v-model="selectedBooks" :options="allBooks" label="title">
                                                <template #search="{attributes, events}">
                                                    <input
                                                    id="books" 
                                                    name="books"
                                                    :required="!selectedBooks.length"
                                                    :placeholder="!selectedBooks.length ? 'Select a book..' : ''"
                                                    class="vs__search"
                                                    :class="{'books': true, 'is-invalid': errors.has('books') }"
                                                    v-bind="attributes"
                                                    v-on="events"
                                                    />
                                                </template>
                                            </v-select>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label for="description" class="col-sm-3 col-md-3 col-lg-3 col-form-label">Description: </label>
                                        <div class="col-sm-9 col-md-9 col-lg-9">
                                            <input type="text" class="form-control form-control-sm" id="description" name="description" placeholder="Insert description"
                                                   v-model="eventDescription"
                                                   v-validate="'required|min:2|max:150'"
                                                   :class="{'description': true, 'is-invalid': errors.has('description') }"/>
                                            <small v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</small>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="startDate"  class="col-sm-3 col-md-3 col-lg-3 col-form-label">From:</label>
                                        <b-form-datepicker v-model="startDate" id="startDate" name="startDate" :min="min"
                                        v-validate="'required'"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" 
                                        :class="{'startDate': true, 'is-invalid': errors.has('startDate') }"
                                        locale="en"></b-form-datepicker>
                                        <small v-show="errors.has('startDate')" class="help is-danger">{{ errors.first('startDate') }}</small>
                                    </div>

                                    <div class="form-group row">
                                        <label for="endDate"  class="col-sm-3 col-md-3 col-lg-3 col-form-label">To: </label>
                                        <b-form-datepicker v-model="endDate" id="endDate" name="endDate"
                                        :min="min"
                                        v-validate="'required'"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }" 
                                        :class="{'endDate': true, 'is-invalid': errors.has('endDate') }"
                                        locale="en"></b-form-datepicker>
                                        <small v-show="errors.has('endDate')" class="help is-danger">{{ errors.first('endDate') }}</small>
                                    </div>

                                    <div class="form-group row">
                                        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-3">
                                            <button type="submit" class="btn btn-primary">Add</button>
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
        name: 'AddEvent',

        data() {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const minDate = new Date(today)
            minDate.setMonth(minDate.getMonth())
            minDate.setDate(minDate.getDate())
            return {
                books: [],
                selectedBooks: [],
                eventName: '',
                eventDescription: '',
                startDate: '',
                endDate:'',
                min:minDate,
            }
        },
        mounted() {
            this.getBooks()
        },
        computed: {
            allBooks() {
                return this.books;
            },

        },
        methods: {
            async getBooks(){
                const response = await axios.get('http://localhost:8000/api/books')
                console.log(response)
                for(let i = 0;i<response.data.length;i++){
                    this.books.push(response.data[i])
                }
            },
            async addEvent() {
                this.$validator.validateAll().then( async (result) => {
                    if (result) {
                        await axios.post("http://localhost:8000/api/createEvent", {name: this.eventName, description: this.eventDescription, books: this.selectedBooks, startDate: this.startDate, endDate:this.endDate})
                        this.eventName = null
                        this.eventDescription = null
                        this.selectedBooks = null
                        this.startDate = null
                        this.endDate = null
                        this.$router.push({path:"/events/listing"})
                        this.$toast.success("Event added successfully", {
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
