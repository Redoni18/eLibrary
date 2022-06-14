<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <router-link :to="{name: 'EditLocation', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit Location</button></router-link>
    <button type="submit" class="btn btn-danger" @click="removeLocation(rowId)">Delete Location</button>

    </div>
  </div>

    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'addLocation'}">Add new location</router-link>

    </div>
    <vue-good-table
        :columns="columns"
        :rows="allLocations"
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
    name: "LocationsListing",
    data() {
        return {
            user: JSON.parse(window.localStorage.getItem('user')),
            toggleButtons: false,
            rowId: null,
            locations: null,
            columns: [
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
        onRowClick(params){
            if(this.user.data.isAdmin){
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            }
            return
        },
        async fetchLocations(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/locations")
                    this.locations = response.data
                }
            });
        },
        async removeLocation(id) {
            console.log('id', id)
            if(window.confirm("Are you sure you want to remove this location?")){
                await axios.delete(`http://localhost:8000/api/deleteLocation/${id}`)
                this.toggleButtons = false
            }
            await this.fetchLocations()
        }
    }
}
</script>

<style scoped>

</style>