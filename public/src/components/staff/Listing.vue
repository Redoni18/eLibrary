<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <router-link :to="{name: 'EditStaff', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit Staff</button></router-link>
    <button type="submit" class="btn btn-danger" @click="removeStaff(rowId)">Delete Staff</button>

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
        @on-row-click="onRowClick"
        >
            
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