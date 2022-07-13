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
        <div class="more-options">
          <b-dropdown id="dropdown-right" right text="Right align" variant="link" toggle-class="text-decoration-none text-secondary" no-caret class="m-2">
        <template #button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
        <b-dropdown-item
          @click="removeCountry(props.row._id)"
        >
         <span
            class="d-flex align-items-center"
          >
            <b-icon icon="trash"></b-icon>
            <p class="p-0 m-0 ml-3">Delete</p>
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
    name: "CountriesListing",
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
            await axios.delete(`http://localhost:8000/api/deleteCountry/${id}`)
            this.toggleButtons = false


            this.$toast.success("Country deleted successfully", {
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
            await this.fetchCountries()
        },
        
    },
    
}
</script>

<style scoped>

</style>