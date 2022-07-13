<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <router-link :to="{name: 'EditUserType', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit User Type</button></router-link>
    <button type="submit" class="btn btn-danger" @click="removeUserType(rowId)">Delete User Type</button>

    </div>
  </div>

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
    <template v-slot:table-row="props">
      <span v-if="props.column.field === 'userType'" class="title-cell">
        <span @click="fetchUserTypes(props)">{{props.row.userType}}</span>
      </span>
      <span v-if="user.data.isAdmin && props.column.field === 'actions'">
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <template #button-content>
                    <mdb-icon icon="ellipsis-h" class="mr-3" />
                </template>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="removeUserType(props.row._id)"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditUserType', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
            </mdb-dropdown-menu>
        </mdb-dropdown>
      </span>
  </template>
</vue-good-table>
            
    
</div>
    
</template>

<script>
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';

import axios from 'axios'
export default {
    name: "UserTypesListing",
    components: {
      mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon
    },
    data() {
        return {
            user: JSON.parse(window.localStorage.getItem('user')),
            toggleButtons: false,
            rowId: null,
            userTypes: null,
            columns: [
                {
                    label: 'Type of user',
                    field: 'userType',
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
                if(window.confirm("Are you sure you want to delete this type of user?")){    
                
                this.$toast.success("Type of User deleted successfully", {
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
            }
            await this.fetchUserTypes()
        }
    }
}

</script>

<style scoped>

</style>