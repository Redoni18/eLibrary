<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
        <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
         <router-link :to="{name: 'EditStaff', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit Staff</button></router-link>
    

        </div>
    </div>

    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'insertStaff'}">Insert new staff</router-link>

    </div>
    <vue-good-table
        :columns="columns"
        :rows="allStaff"
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
                <mdb-dropdown-item @click.native="showModal = true;staff=props.row._id;"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditStaff', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
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
      <mdb-modal-body>Are you sure you want to delete selected membership?</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
        <mdb-btn color="danger" @click.native="removeStaff(staff)">Delete</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</div>


</template>

<script>

import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon, mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn } from 'mdbvue';

import axios from 'axios'
export default {
    name: "StaffListing",
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
            staff: null,
            columns: [
                {
                    label: 'Staff name',
                    field: 'staffName',

                },
                {
                    label: 'Staff email',
                    field: 'staffEmail',
                   
                },
                {
                    label: 'Staff position',
                    field: 'position',
                   
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
        allStaff() {
            return this.staff
        }
    },
    async mounted(){
        await this.fetchStaff()
    },
    methods: {
        async fetchStaff(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/staff")
                    this.staff = response.data
                }
            });
        },
        
        async removeStaff(id) {
            await axios.delete(`http://localhost:8000/api/staff/delete/${id}`)
                this.$toast.success("Staff deleted successfully", {
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
                await this.fetchStaff()
        }
    }  
}
</script>

<style scoped>
</style>