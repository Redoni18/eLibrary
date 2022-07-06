<template>
<div>
  

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
        @on-row-click="onRowClick"
        >
        <template v-if="user.data.isAdmin" v-slot:table-row="props">
      <span v-if="props.column.field === 'actions'">
        <div class="more-options">
          <b-dropdown id="dropdown-right" right text="Right align" variant="link" toggle-class="text-decoration-none text-secondary" no-caret class="m-2">
        <template #button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
        <b-dropdown-item
          @click="removeStaff(props.row._id)"
        >
         <span
            class="d-flex align-items-center"
          >
            <b-icon icon="trash"></b-icon>
            <p class="p-0 m-0 ml-3">Delete</p>
          </span>
        </b-dropdown-item>
        <b-dropdown-item
            :to="{name: 'EditStaff', params: {id: props.row._id}}"
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
    name: "StaffListing",
    data() {
        return {
            user: JSON.parse(window.localStorage.getItem('user')),
            toggleButtons: false,
            rowId: null,
            staff: null,
            columns: [
                {
                    label: 'Staff name',
                    field: 'staffName',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Staff email',
                    field: 'staffEmail',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Staff position',
                    field: 'position',
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
        allStaff() {
            return this.staff
        }
    },

    async mounted(){
        await this.fetchStaff()
    },

    methods: {
        onRowClick(params){
            if(this.user.data.isAdmin){
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            }
            return
        },
        async fetchStaff(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/staff")
                    this.staff = response.data
                }
            });
        },
        async removeStaff(id) {
            if(window.confirm("Are you sure you want to delete this staff?")){
                await axios.delete(`http://localhost:8000/api/staff/delete/${id}`)
                this.toggleButtons = false
            }
            await this.fetchStaff()
        }
    }
}
</script>

<style scoped>

</style>