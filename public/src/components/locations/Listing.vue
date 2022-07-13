<template>
<div>
<div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'addLocation'}">Add location</router-link>
</div>
<vue-good-table
    :columns="columns"
    :rows="locations"
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
        <div class="more-options">
          <b-dropdown id="dropdown-right" right text="Right align" variant="link" toggle-class="text-decoration-none text-secondary" no-caret class="m-2">
        <template #button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
        <b-dropdown-item
          @click="showModal = true;selectedLocation = props.row"
        >
         <span
            class="d-flex align-items-center"
          >
            <b-icon icon="trash"></b-icon>
            <p class="p-0 m-0 ml-3">Delete</p>
          </span>
        </b-dropdown-item>
        <b-dropdown-item
            :to="{name: 'editLocation', params: {id: props.row._id}}"
        >
            <span
              class="d-flex align-items-center"
            >
              <b-icon icon="pen"></b-icon>
              <p class="p-0 m-0 ml-3">Edit</p>
            </span>
          </b-dropdown-item>
      </b-dropdown>
        </div>
      </span>
  </template>
</vue-good-table>
<div>
    <mdb-modal v-if="showModal" @close="showModal = false">
    <mdb-modal-header>
        <mdb-modal-title>Warning</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>Are you sure you want to delete selected location?</mdb-modal-body>
    <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
        <mdb-btn color="danger" @click.native="removeLocation(selectedLocation)">Delete</mdb-btn>
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
    name: "LocationsListing",
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
            toggleButtons: false,
            rowId: null,
            locations: null,
            showModal: false,
            selectedLocation: {},
            columns: [
                {
                    label: 'City',
                    field: 'city',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Address',
                    field: 'address',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Phone number',
                    field: 'phoneNumber',
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
        allLocations() {
            return this.locations
        }
    },

    async mounted(){
        await this.fetchLocations()
    },

    methods: {
        async fetchLocations(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/locations")
                    this.locations = response.data
                }
            });
        },
        async removeLocation(location) {
            await axios.delete(`http://localhost:8000/api/deleteLocation/${location._id}`)
            this.toggleButtons = false

            this.$toast.success("Location deleted successfully", {
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
            await this.fetchLocations()
        }
    }
}
</script>

<style scoped>

</style>