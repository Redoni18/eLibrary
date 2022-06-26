<template>
<div>
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
        >
          <template v-slot:table-row="props">
            <span v-if="props.column.field === 'actions'">
                <div class="more-options">
                <b-dropdown id="dropdown-right" right text="Right align" variant="link" toggle-class="text-decoration-none text-secondary" no-caret class="m-2">
                <template #button-content>
                    <b-icon icon="three-dots"></b-icon>
                </template>
                <b-dropdown-item
                @click="removeMessage(props.row._id)"
                >
                <span
                    class="d-flex align-items-center"
                >
                    <b-icon icon="trash"></b-icon>
                    <p class="p-0 m-0 ml-3">Delete</p>
                </span>
                </b-dropdown-item>
            </b-dropdown>
                </div>
            </span>
        </template>  
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
        
        async removeMessage(id) {
            if(window.confirm("Are you sure you want to delete this book?")){
                await axios.delete(`http://localhost:8000/api/messages/delete/${id}`)
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

<style scoped>
.more-options{
  transition: 0.3s;
}

.more-options:hover{
  border-radius: 5px;
  background: rgb(230, 230, 230);
  color:rgb(0, 0, 0);
  transition: 0.3s;
}
</style>