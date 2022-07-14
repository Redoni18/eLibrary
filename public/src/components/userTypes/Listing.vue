<template>
<div>
    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'insertUserType'}">Insert new user type</router-link>

    </div>
    <vue-good-table
        :columns="columns"
        :rows="typesOfUser"
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
      <span v-if="user.data.isAdmin && props.column.field === 'actions'">
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <template #button-content>
                    <mdb-icon icon="ellipsis-h" class="mr-3" />
                </template>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="showModal=true; userTypes=props.row._id;"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditUserType', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
            </mdb-dropdown-menu>
        </mdb-dropdown> 
      </span>
  </template>
</vue-good-table>



<div>
    <mdb-modal centered v-if="showModal" @close="showModal = false">
    <mdb-modal-body>Are you sure you want to delete selected user type?</mdb-modal-body>
    <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
        <mdb-btn color="danger" @click.native="removeUserType(userTypes)">Delete</mdb-btn>
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
    name: "UserTypesListing",
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
            selectedUserType: {},
            user: JSON.parse(window.localStorage.getItem('user')),
            rowId: null,
            userTypes: null,
            showModal: false,
            columns: [
                {
                    label: 'Type of user',
                    field: 'userType',
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
        typesOfUser() {
            return this.userTypes
        }
    },

    async mounted(){
        await this.fetchUserTypes()
    },

    methods: {
        onRowClick(params){
            if(this.user.data.isAdmin){
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            }
            return
        },
        async fetchUserTypes(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/userTypes")
                    this.userTypes = response.data
                }
            });
        },
        async removeUserType(id) {
            await axios.delete(`http://localhost:8000/api/deleteUserType/${id}`)
            this.$toast.success("User type deleted successfully", {
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
            await this.fetchUserTypes()
        }
    }
}
</script>

<style scoped>

</style>