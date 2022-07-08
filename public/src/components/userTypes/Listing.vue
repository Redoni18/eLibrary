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
    <template v-if="user.data.isAdmin" v-slot:table-row="props">
      <span v-if="props.column.field === 'actions'">
        <div class="more-options">
          <b-dropdown id="dropdown-right" right text="Right align" variant="link" toggle-class="text-decoration-none text-secondary" no-caret class="m-2">
        <template #button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
        <b-dropdown-item
          @click="removeUserType(props.row._id)"
        >
         <span
            class="d-flex align-items-center"
          >
            <b-icon icon="trash"></b-icon>
            <p class="p-0 m-0 ml-3">Delete</p>
          </span>
        </b-dropdown-item>
        <b-dropdown-item
            :to="{name: 'EditUserType', params: {id: props.row._id}}"
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
            
    
</div>
    
</template>

<script>
import axios from 'axios'
export default {
    name: "UserTypesListing",
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
            if(window.confirm("Are you sure you want to delete this book?")){
                await axios.delete(`http://localhost:8000/api/deleteUserType/${id}`)
                this.toggleButtons = false
            }
            await this.fetchUserTypes()
        }
    }
}
</script>

<style scoped>

</style>