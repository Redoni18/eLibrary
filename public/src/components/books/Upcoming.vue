<template>
    <div class="upcoming-books__container">
        <b-card v-if="toggleButtons" :title="currentUpComing.title" :sub-title="`Published By ${currentUpComing.author} in ${currentUpComing.date}`" style="margin-bottom: 40px;">
            <b-card v-if="!editing" style="height: 200px; display: flex; flex-direction: row; justify-content: space-between;">
                <b-button variant="dark" class="upcoming-books__buttons" @click="cancelChanges()">Cancel Changes</b-button>
                <b-button variant="danger" class="upcoming-books__buttons" @click="showModal = true">Remove up-coming Book</b-button>
                <b-button variant="info" class="upcoming-books__buttons" @click="edit()">Edit up-coming Book Details</b-button>
                <b-button variant="success" class="upcoming-books__buttons" @click="add(currentUpComing)">Release up-coming Book</b-button>
            </b-card>
                <b-card v-if="editing">
                   Enter the title <b-form-input  :state="currentUpComing.title.length > 2" v-model="currentUpComing.title" type="text"  :placeholder="currentUpComing.title"/>
                    Enter the author <b-form-input  :state="currentUpComing.author.length > 2"   v-model="currentUpComing.author" type="text" :placeholder="currentUpComing.author" />
                   Enter the published date <b-form-input :state="currentUpComing.date < Date.now"  v-model="currentUpComing.date" type="date" />
                    <b-button variant="dark" class="upcoming-books__buttons" @click="cancelChanges()">Cancel Changes</b-button>
                    <b-button variant="success" class="upcoming-books__buttons" @click="saveChanges()">Save Changes</b-button>
                </b-card>
         </b-card>
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
        @on-row-click="onRowClick"
         />

         <div>
            <mdb-modal v-if="showModal" @close="showModal = false">
            <mdb-modal-header>
                <mdb-modal-title>Warning</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body>Are you sure you want to delete selected book?</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
                <mdb-btn color="danger" @click.native="remove(currentUpComing.id)">Delete</mdb-btn>
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
    mdbBtn} from 'mdbvue';
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
            ],
        }
    },
    methods: {
        onRowClick(params) {
            if (this.toggleButtons) {
                this.currentUpComing = null
            } else { 
                for (let i = 0; i < this.upcomings.length; i++){
                    if (this.upcomings[i]._id === params.row._id) {
                        this.currentUpComing = { id : this.upcomings[i]._id , title : this.upcomings[i].title, author: this.upcomings[i].author, date: this.upcomings[i].date }
                    }
                }
            }
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            return
        },
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
    computed: {}
 }
</script>

<style>
.upcoming-books__buttons{
    max-width: 43%;
    margin: 20px;
    font-size: 1.4vw;
}
</style>