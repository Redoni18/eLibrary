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
                <mdb-dropdown end tag="li" class="nav-item">
                    <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                        <template #button-content>
                            <mdb-icon icon="ellipsis-h" class="mr-3" />
                        </template>
                    </mdb-dropdown-toggle>
                    <mdb-dropdown-menu>
                        <mdb-dropdown-item @click.native="removeMessage(props.row._id)"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                    </mdb-dropdown-menu>
                </mdb-dropdown>
            </span>
        </template>  
    </vue-good-table>
</div>
</template>

<script>
import axios from 'axios'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';
import {mapActions} from 'vuex'
export default {
    name: "MessagesList",
    components: {
        mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon
    },
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