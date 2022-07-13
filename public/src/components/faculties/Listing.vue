<template>
<div>

    <div class="mb-3">
        <router-link type="submit" class="btn btn-primary" :to="{path: '/insertFaculty'}">Insert new Faculty</router-link>

    </div>
    <vue-good-table
        :columns="columns"
        :rows="allFaculties"
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
      <span v-if="props.column.field === 'emri'" class="title-cell">
        <span @click="fetchFaculties(props)">{{props.row.emri}}</span>
      </span>
      <span v-if="props.column.field === 'drejtimi'">
        <span>{{props.row.drejtimi}}</span>
      </span>
      <span v-if="user.data.isAdmin && props.column.field === 'actions'">
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <template #button-content>
                    <mdb-icon icon="ellipsis-h" class="mr-3" />
                </template>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="removeFaculty(props.row._id)"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditFaculty', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
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
    name: "FacultiesListing",

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
            faculties: null,
            columns: [
                {
                    label: 'Emri',
                    field: 'emri',
                    
                },
                {
                    label: 'Drejtimi',
                    field: 'drejtimi',
                    
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
            return this.faculties
        }
    },

    async mounted(){
        await this.fetchFaculties()
    },

    methods: {
        async fetchFaculties(){
            this.$validator.validateAll().then( async (result) => {
                if (result) {
                    const response = await axios.get("http://localhost:8000/api/faculties")
                    this.faculties = response.data  
                }
            });
        },

        async removeFaculty(id) {
          await axios.delete(`http://localhost:8000/api/deleteFaculty/${id}`)
            if(window.confirm("Are you sure you want to delete this staff?")){

                this.$toast.success("Faculty deleted successfully", {
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
            await this.fetchFaculties()
        }
    }
  }

</script>

<style scoped>

.more-options{
  transition: 0.3s;
}

.more-options:hover{
  border-radius: 5px;
  background: rgb(230, 230, 230);
  color:rgb(0, 0, 0);
  transition: 0.3s;
}

</style>