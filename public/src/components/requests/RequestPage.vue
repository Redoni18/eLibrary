<template>
<div class="request-page__container">
    <b-card v-if="!requested" title="Make a Request" :sub-title="user.data.name" style="display: flex; flex-direction: column; align-items: center;text-align: center;">
        <b-form-input v-model="title" :state="!title || title.length > 5"   type="text" size="sm" style="margin: 15px" placeholder="Title of the Book..." />
        <b-form-input  v-model="author" :state="!author ||author.length > 5"  type="text" size="sm" style="margin: 15px"  placeholder="Name of the author..."/>
        <b-form-input   v-model="date" :state="year <= dateNow " type="date" size="sm" style="margin: 15px" placeholder="Date of Publish..." />
        <div>
            <b-button variant="dark" @click="cancel()">Cancel</b-button>
            <b-button variant="info" @click="apply()">Apply</b-button>
        </div>
    </b-card>
    <b-card v-if="requested" title="Request Made" sub-title="Are you going to make another request">
            <b-button variant="dark" @click="cancel()">No, Take me to homepage</b-button>
            <b-button variant="success" @click="requested = false">Yes, let me make another request</b-button>
    </b-card>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'RequestPage',
    data() {
        return {
            title: '',
            author: '',
            date: '',
            year: '',
            requested: false
        }
    },
    methods: {
        async apply() {
            const request = { title: this.title, author: this.author, date: this.date, user: this.user.data.name }
                this.title = ''
                this.author = ''
                this.date = ''
                this.requested = true
            const req = await axios.post('http://localhost:8000/api/request/add', request).then(response => {
                console.log('posted')
            })
            
        },
        cancel() {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        }),
        dateNow() {
            const date = new Date();
            const refinedDate = date.getFullYear();
            return refinedDate
        }
    },
    watch: {
        date() {
            const date = this.date
            const newDate = new Date(date)
            this.year = newDate.getFullYear()
        }
    }
}
</script>

<style>

</style>