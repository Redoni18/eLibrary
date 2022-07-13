<template>
<div>
<div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: 'addMembership'}">Add membership</router-link>
</div>
<vue-good-table
    :columns="columns"
    :rows="memberships"
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
                <mdb-dropdown-item @click.native="removeMembership(props.row._id)"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditMembership', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
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
    name: "MembershipListing",
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