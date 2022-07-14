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
                        <mdb-dropdown-item @click.native="showModal = true;selectedMessage = props.row"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                    </mdb-dropdown-menu>
                </mdb-dropdown>
            </span>
        </template>  
    </vue-good-table>

        <div>
        <mdb-modal centered v-if="showModal" @close="showModal = false">
        <mdb-modal-header>
            <mdb-modal-title>Warning</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>Are you sure you want to delete selected message?</mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
            <mdb-btn color="danger" @click.native="removeMessage(selectedMessage._id)">Delete</mdb-btn>
        </mdb-modal-footer>
        </mdb-modal>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon, mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn } from 'mdbvue';
import {mapActions} from 'vuex'
export default {
    name: "MessagesList",
    components: {
        mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon,
        mdbModal,
        mdbModalHeader,
        mdbModalTitle,
        mdbModalBody,
        mdbModalFooter,
        mdbBtn
    },
    data(){
        return {
            messages: [],
            showModal: false,
            selectedMessage: {},
            columns: [
                {
                    label: 'Sender',
                    field: 'senderName',
                    width: '200px',
                },
                {
                    label: 'Message',
                    field: 'messageBody',
                },
                {
                    label: 'Date Sent',
                    field: 'date',
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
            await axios.delete(`http://localhost:8000/api/messages/delete/${id}`)
            this.$toast.success("Message deleted successfully", {
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

            this.showModal = false

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