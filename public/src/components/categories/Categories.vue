<template>
<b-container v-if="categories.length >= 1" fluid="md" class="categories__container">
    <b-button v-if="user.data.isAdmin" style="margin-bottom: 20px;" variant="primary" @click="generateRoute()">Add Category</b-button>
    <vue-good-table
            :columns="columns"
            :rows="categories"
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
            <span v-if="user.data.isAdmin && props.column.field === 'actions'">
                <mdb-dropdown end tag="li" class="nav-item">
                    <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                        <template #button-content>
                            <mdb-icon icon="ellipsis-h" class="mr-3" />
                        </template>
                    </mdb-dropdown-toggle>
                    <mdb-dropdown-menu>
                        <mdb-dropdown-item @click.native="showModal=true; selectedCategory=props.row"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                        <mdb-dropdown-item @click="generateCategoryPage(props.row)"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
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
            <mdb-modal-body>Are you sure you want to delete selected Category?</mdb-modal-body>
            <mdb-modal-footer>
                <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
                <mdb-btn color="danger" @click.native="remove(selectedCategory)">Delete</mdb-btn>
            </mdb-modal-footer>
            </mdb-modal>
        </div>
</b-container>
</template>

<script>

import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon, mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn} from 'mdbvue';
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
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
            categories: {},
            selectedCategory: {},
            showModal: false,
              columns: [
                    {
                        label: 'Title',
                        field: 'title',
                    },
                    {
                        label: 'Description',
                        field: 'description',
                    },
                    {
                        label: '',
                        field: 'actions',
                        sortable: false,
                        width: '50px',
                    },
                ]
         }
    },
       computed: {
             ...mapGetters({
                user: 'getUser'
             }),
    },
    methods: {
        generateRoute() {
            this.$router.push('/categories/add')
        },
        generateCategoryPage(category) {
            this.$router.push(`/category/${category._id}`)
        },
          async remove(category) {
             await axios.delete(`http://localhost:8000/api/category/delete/${category._id}`)
                 .then(response => {
                    this.showModal = false
                     axios.get('http://localhost:8000/api/categories').then(response => {
                        this.categories = response.data
                   })
                this.$toast.success("Category deleted successfully", {
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
            })
        }
    },
     async mounted() {
         const ctg = await axios.get('http://localhost:8000/api/categories').then(response => {
            this.categories = response.data
        })
    }
 }
</script>

<style>
.categories__column{
    margin: 20px;
}
</style>