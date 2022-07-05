<template>
<div>
    <div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <router-link :to="{name: 'EditFaculty', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit Faculty</button></router-link>
    <button type="submit" class="btn btn-danger" @click="removeFaculty(rowId)">Delete Faculty</button>

    </div>
  </div>

    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: '/insertFaculty'}">Insert new Faculty</router-link>

    </div>
    <vue-good-table
        :columns="columns"
        :rows="Faculties"
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
    name: "FacultiesListing",
    data() {
        return {
            user: JSON.parse(window.localStorage.getItem('user')),
            toggleButtons: false,
            rowId: null,
            faculties: null,
            columns: [
                {
                    label: 'Emri',
                    field: 'emri',
                    //tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'Drejtimi',
                    field: 'drejtimi',
                    //tooltip: 'Click on a specific row that you want to edit or delete!',
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
         allFaculties() {
            return this.Faculty
        }
    },

    async mounted(){
        await this.fetchFaculties()
    },

    methods: {
        onRowClick(params){
            if(this.user.data.isAdmin){
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            }
            return
        },
        async fetchFaculties(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/faculties")
                    this.Faculty = response.data  
                }
            });
        },
        async removeFaculty(id) {
            if(window.confirm("Are you sure you want to delete this Faculty?")){
                await axios.delete(`http://localhost:8000/api/deleteFaculty/${id}`)
                this.toggleButtons = false
            }
            await this.fetchFaculties()
        }
    }
}
</script>

<style scoped>

</style>