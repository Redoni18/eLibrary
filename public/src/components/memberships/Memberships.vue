<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <router-link :to="{name: 'EditMembership', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit Membership</button></router-link>
    <button type="submit" class="btn btn-danger" @click="removeMembership(rowId)">Delete Membership</button>

    </div>
  </div>

    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'addMembership'}">Add new membership</router-link>

    </div>
    <vue-good-table
        :columns="columns"
        :rows="allMemberships"
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
    name: "Memberships",
    data() {
        return {
            user: JSON.parse(window.localStorage.getItem('user')),
            toggleButtons: false,
            rowId: null,
            memberships: null,
            columns: [
                {
                    label: 'User Type',
                    field: 'userType.userType',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Duration',
                    field: 'duration',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Price',
                    field: 'price',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Description',
                    field: 'description',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Premium',
                    field: 'isPremium' ,
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
        allMemberships() {
            return this.memberships
        }
    },

    async mounted(){
        await this.fetchMemberships()
    },

    methods: {
        onRowClick(params){
            if(this.user.data.isAdmin){
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            }
            return
        },
        async fetchMemberships(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/memberships")
                    this.memberships = response.data
                }
            });
        },
        async removeMembership(id) {
            console.log('id', id)
            if(window.confirm("Are you sure you want to remove this membership?")){
                await axios.delete(`http://localhost:8000/api/deleteMembership/${id}`)
                this.toggleButtons = false
            }
            await this.fetchMemberships()
        }
    }
}
</script>

<style scoped>

</style>