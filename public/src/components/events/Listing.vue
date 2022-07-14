<template>
<div>
<div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'addEvent'}">Add event</router-link>
</div>
<vue-good-table
    :columns="columns"
    :rows="events"
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
    <template v-if="user.data.isAdmin" v-slot:table-row="props">
      <span v-if="props.column.field === 'actions'">
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <template #button-content>
                    <mdb-icon icon="ellipsis-h" class="mr-3" />
                </template>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="showModal = true;selectedEvent=props.row;"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditEvent', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
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
      <mdb-modal-body>Are you sure you want to delete selected event?</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
        <mdb-btn color="danger" @click.native="removeEvent(selectedEvent)">Delete</mdb-btn>
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

export default {
    name: "EventListing",
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
            user: JSON.parse(window.localStorage.getItem('user')),
            rowId: null,
            events: null,
            showModal: false,
            selectedEvent: {},
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Description',
                    field: 'description',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Start date',
                    field: 'startDate',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'End date',
                    field: 'endDate',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: '',
                    field: 'actions',
                    sortable: false,
                    width: '50px',
                },
            
            ],
        };
    },
    computed: {
        allEvents() {
            return this.events
        }
    },

    async mounted(){
        await this.fetchEvents()
    },

    methods: {

        async fetchEvents(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/events")
                    this.events = response.data
                }
            });
        },
        async removeEvent(event) {
            await axios.delete(`http://localhost:8000/api/deleteEvent/${event._id}`)
            await this.fetchEvents()

            this.$toast.success("Event deleted successfully", {
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
            await this.fetchEvents()
        }
    }
}
</script>

<style scoped>

</style>