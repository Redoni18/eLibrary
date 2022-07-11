<template>
    <div>
        <vue-good-table
        :columns="columns"
        :rows="requests"
        :search-options="{
            enabled: true
        }"
        :line-numbers="true"
        :pagination-options="{
            enabled: true,
            perPage: 7,
            perPageDropdown: [5, 7, 10],
            dropdownAllowAll: false,
        }"
        @on-row-click="onRowClick"
         />
         <b-card v-if="toggleButtons" :title="currentRequest.title" :sub-title="`Author: ${currentRequest.author} published in : ${currentRequest.date}`" style="margin-top: 40px;">
            <b-button variant="dark" @click="cancel()">Cancel</b-button>
            <b-button variant="danger" @click="deny(currentRequest.id)">Deny</b-button>
            <b-button variant="success" @click="accept(currentRequest)">Accept</b-button>
         </b-card>   
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Request',
    data() {
        return {
            request: '',
             toggleButtons: false,
            rowId: null,
                currentRequest: { id: String , title: String, author: String, date: String },
            columns: [
                {
                    label: 'Book Title',
                    field: 'title',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Book Author',
                    field: 'author',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Date Published',
                    field: 'date',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Requested By',
                    field: 'user',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
            ],
        }
    },
    methods: {
        onRowClick(params) {
            if (this.toggleButtons) {
                this.currentRequest = null
            } else { 
                for (let i = 0; i < this.request.length; i++){
                    if (this.request[i]._id === params.row._id) {
                        this.currentRequest = { id : this.request[i]._id , title : this.request[i].title, author: this.request[i].author, date: this.request[i].date }
                    }
                }
            }
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            return
        },
        async refresh() {
            await axios.get('http://localhost:8000/api/requests').then(response => { this.request = response.data})
        },
         async deny(id) {
             const deny = await axios.delete(`http://localhost:8000/api/requests/delete/${id}`).then(
                 response => { 
                    this.toggleButtons = false
                    this.$toast.info("Request moved", {
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
                    this.refresh()
                }
            )
        },
        async accept(book) {
            this.toggleButtons = false
            this.currentRequest = null
            this.deny(book.id)
            const forwaredUpComing = {title: book.title, author: book.author, date: book.date}
            const forward = await axios.post('http://localhost:8000/api/upcoming/add', forwaredUpComing).then(response => { 
            })
        },
         cancel() {
             this.toggleButtons = false
            this.currentRequest = null  
        },
    },
     async mounted() { 
         const requests = await axios.get('http://localhost:8000/api/requests').then(response => { this.request = response.data})
    },
    computed: {
        requests() {
            for (let i = 0; i < this.request.length; i++){
                const date = new Date(this.request[i].date)
                this.request[i].date = date.toISOString().substring(0, 10);
            }
            return this.request
        },
    }
}
</script>