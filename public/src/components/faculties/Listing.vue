Faculties-Listing.vue

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
    <template v-if="user.data.isAdmin" v-slot:table-row="props">
      <span v-if="user.data.isAdmin && props.column.field === 'actions'">
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <template #button-content>
                    <mdb-icon icon="ellipsis-h" class="mr-3" />
                </template>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="showModal=true;faculties=props.row._id;"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'EditFaculty', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
            </mdb-dropdown-menu>
        </mdb-dropdown> 
      </span>
  </template>
</vue-good-table>

<div>
    <mdb-modal centered v-if="showModal" @close="showModal = false">
    <mdb-modal-header>
        <mdb-modal-title>Warning</mdb-modal-title>
    </mdb-modal-header>
    <mdb-modal-body>Are you sure you want to delete selected Faculty?</mdb-modal-body>
    <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
        <mdb-btn color="danger" @click.native="removeFaculty(faculties)">Delete</mdb-btn>
    </mdb-modal-footer>
    </mdb-modal>
</div>
            
    
</div>
    
</template>

<script>
import axios from 'axios'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon, mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn} from 'mdbvue';


export default {
    name: "FacultiesListing",
    components: {
      mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon,
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbBtn
    },
    data() {
        return {
            showModal: false,
            faculties: null,
            user: JSON.parse(window.localStorage.getItem('user')),
            rowId: null,
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

            this.showModal = false
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