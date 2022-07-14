<template>
    <div class="upcoming-books__container">
         <vue-good-table
            :columns="columns"
            :rows="upComingsFiltered()"
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
                        <mdb-dropdown-item @click.native="showModal=true;currentUpComing=props.row;"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                        <mdb-dropdown-item @click="add(props.row)"><mdb-icon icon="pen" class="mr-3" />Publish</mdb-dropdown-item>
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
            <mdb-modal-body>Are you sure you want to delete upcoming book</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
                <mdb-btn color="danger" @click.native="remove(currentUpComing._id)">Delete</mdb-btn>
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
            showModal: false,
            upcomings: [],
            toggleButtons: false,
            rowId: null,
            editing: false,
            currentUpComing: { id: String , title: String, author: String, date: String },
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
                        label: '',
                        field: 'actions',
                        sortable: false,
                        width: '50px',
                },
            ],
        }
    },
    methods: {
        upComingsFiltered() {
            const filtered = this.upcomings
            for (let i = 0; i < filtered.length; i++){
                const date = new Date(filtered[i].date)
                filtered[i].date = date.toISOString().substring(0, 10);
            }
            return filtered
        },
        edit() {
            this.editing = true
        },
        cancelChanges() {
            this.editing = false
            this.toggleButtons = false
        },
         async refresh() {
            await axios.get('http://localhost:8000/api/upcomings').then(response => { this.upcomings = response.data})
        },
        async saveChanges() {
             const changes = { id: this.currentUpComing.id}
                await axios.put('http://localhost:8000/api/upcoming/edit', this.currentUpComing)
                    .then(response => {
                        this.editing = false
                        this.toggleButtons = false
                        this.refresh()
                    })
        },
           async remove(id) {
               axios.delete(`http://localhost:8000/api/upcoming/delete/${id}`).then(response => {
                   this.editing = false
                   this.toggleButtons = false
                    this.refresh()
                    this.showModal = false;
                })

                this.$toast.success("Upcoming book deleted successfully", {
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
        },
        add(book) {
            const date = book.date
            const newDate = new Date(date)
            const year = newDate.getFullYear()
            this.$router.push(`/books/create/${book.title}/${book.author}/${year}`)
        }
    },
     async mounted() {
        const upcomings = await axios.get('http://localhost:8000/api/upcomings').then(response => {this.upcomings = response.data})
    },
    computed: {
        ...mapGetters({
                user: 'getUser'
            }),
    }
 }
</script>

<style>
.upcoming-books__buttons{
    max-width: 43%;
    margin: 20px;
    font-size: 1vw;
}
</style>