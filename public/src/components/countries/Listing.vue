<template>
<div>
    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'addCountry'}">Add country</router-link>
    </div>  
    <vue-good-table
    :columns="columns"
    :rows="countries"
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
                <mdb-dropdown-item @click.native="removeCountry(props.row._id)"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
            </mdb-dropdown-menu>
        </mdb-dropdown>
      </span>
  </template>
</vue-good-table>
</div>
    
</template>

<script>
import axios from 'axios'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';
export default {
    name: "CountriesListing",
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
            countries: null,
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    tooltip: 'Click on a specific row that you want to edit or delete!',
                },
                {
                    label: 'ISO Country Code',
                    field: 'isoCountryCode',
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
        allCountries() {
            return this.countries
        }
    },

    async mounted(){
        await this.fetchCountries()
        
    },

    methods: {
        onRowClick(params){
            if(this.user.data.isAdmin){
                this.toggleButtons = !this.toggleButtons
                this.rowId = params.row._id
            }
            return
        },
        async fetchCountries(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/countries")
                    this.countries = response.data
                    console.log(this.countries)
                }
            });
        },
        async removeCountry(id) {
            console.log('id', id)
            if(window.confirm("Are you sure you want to remove this country?")){
                await axios.delete(`http://localhost:8000/api/deleteCountry/${id}`)
                this.toggleButtons = false
            }
            await this.fetchCountries()
        },
        
    },
    
}
</script>

<style scoped>

</style>