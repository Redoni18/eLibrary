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
         >
         <template v-slot:table-row="props">
            <span v-if="user.data.isAdmin && props.column.field === 'actions'">
                <mdb-dropdown end tag="li" class="nav-item">
                    <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                        <template #button-content>
                            <mdb-icon icon="ellipsis-h" class="mr-3" />
                        </template>
                    </mdb-dropdown-toggle>
                    <mdb-dropdown-menu>
                        <mdb-dropdown-item @click.native="showModal=true;currentRequest=props.row;"><mdb-icon icon="trash" class="mr-3" />Deny</mdb-dropdown-item>
                        <mdb-dropdown-item @click.native="accept(props.row)"><mdb-icon icon="pen" class="mr-3" />Accept</mdb-dropdown-item>
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
            <mdb-modal-body>Are you sure you want to deny this request</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
                <mdb-btn color="danger" @click.native="deny(currentRequest._id)">Deny</mdb-btn>
            </mdb-modal-footer>
            </mdb-modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import {
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
    } from 'mdbvue';
export default {
    name: 'Request',
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
    data() {
        return {
            request: '',
            showModal: false,
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
                    {
                        label: '',
                        field: 'actions',
                        sortable: false,
                        width: '50px',
                },
            ],
        }
    },
    methods: {
        async refresh() {
            await axios.get('http://localhost:8000/api/requests').then(response => { this.request = response.data})
        },
         async deny(id) {
             const deny = await axios.delete(`http://localhost:8000/api/requests/delete/${id}`).then(
                 response => { 
                    this.showModal = false
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
            this.deny(book._id)
            const forwaredUpComing = {title: book.title, author: book.author, date: book.date}
            const forward = await axios.post('http://localhost:8000/api/upcoming/add', forwaredUpComing).then(response => { 
                 this.$toast.success("Request Acceped", {
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
            })
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
        ...mapGetters({
                user: 'getUser'
            }),
    }
}
</script>