<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <button type="submit" class="btn btn-danger" @click="removeMessage(rowId)">Delete Message</button>

    </div>
  </div>
    <vue-good-table
        :columns="columns"
        :rows="messages"
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
        >
            
    </vue-good-table>
</div>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
    name: "MessagesList",
    data(){
        return {
            messages: [],
            toggleButtons: false,
            rowId: null,
            columns: [
                {
                    label: 'Sender',
                    field: 'senderName',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                    width: '200px',
                },
                {
                    label: 'Message',
                    field: 'messageBody',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Date Sent',
                    field: 'date',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                    width: '100px',
                },
                {
                    label: '',
                    field: 'actions',
                    sortable: false,
                    width: '50px',
                },  
            ],
        }
    },
    async mounted(){
        await this.getMessages()
    },
    computed: {
        allMessages() {
            return this.messages
        }
    },
    methods: {
        ...mapActions({
            getUsers: 'getUsers'
        }),
        onRowClick(params){
            this.toggleButtons = !this.toggleButtons
            this.rowId = params.row._id
        },
        
        async removeMessage(id) {
            if(window.confirm("Are you sure you want to delete this book?")){
                await axios.delete(`http://localhost:8000/api/messages/delete/${id}`)
                this.toggleButtons = false
            }
            await this.getMessages()
        },
        async getMessages() {
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/messages")

                    this.messages = response.data
                    
                    
                }
            });
        },
    }
}
</script>
