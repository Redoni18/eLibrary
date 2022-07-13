<template>
<div>
<vue-good-table
    :columns="columns"
    :rows="books"
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
      <span v-if="props.column.field === 'title'" class="title-cell">
        <span @click="getBook(props)">{{props.row.title}}</span>
      </span>
      <span v-if="props.column.field === 'author'">
        <span>{{props.row.author}}</span>
      </span>
      <span v-if="props.column.field === 'description'">
        <span>{{props.row.description}}</span>
      </span>
      <span v-if="props.column.field === 'year'">
        <span>{{props.row.year}}</span>
      </span>
      <span v-if="user.data.isAdmin && props.column.field === 'actions'">
        <mdb-dropdown end tag="li" class="nav-item">
            <mdb-dropdown-toggle right tag="a" navLink color="secondary-color-dark" slot="toggle" waves-fixed>
                <template #button-content>
                    <mdb-icon icon="ellipsis-h" class="mr-3" />
                </template>
            </mdb-dropdown-toggle>
            <mdb-dropdown-menu>
                <mdb-dropdown-item @click.native="showModal=true;selectedBook=props.row;"><mdb-icon icon="trash" class="mr-3" />Delete</mdb-dropdown-item>
                <mdb-dropdown-item :to="{name: 'editBook', params: {id: props.row._id}}"><mdb-icon icon="pen" class="mr-3" />Edit</mdb-dropdown-item>
            </mdb-dropdown-menu>
        </mdb-dropdown>

      </span>
  </template>
</vue-good-table>
    <div>
    <mdb-modal v-if="showModal" @close="showModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Warning</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>Are you sure you want to delete selected book?</mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="primary" @click.native="showModal = false">Close</mdb-btn>
        <mdb-btn color="danger" @click.native="removeBook(selectedBook)">Delete</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>

</div>
     
</template>

<script>
import { mapActions } from 'vuex'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon, mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn} from 'mdbvue';

import axios from 'axios'
export default {
    name: 'Listing',
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
    data(){
      return {
        showModal: false,
        selectedBook: {},
        user: JSON.parse(window.localStorage.getItem('user')),
        columns: [
          {
            label: 'Title',
            field: 'title',
          },
          {
            label: 'Author',
            field: 'author',
          },
          {
            label: 'Description',
            field: 'description',
          },
          {
            label: 'Year',
            field: 'year',
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
  methods: {
    ...mapActions({
        getBooks: 'getBooks',
    }),
    
    async removeBook(book) {
      await axios.delete(`http://localhost:8000/api/books/delete/${book._id}`)

      this.$toast.success("Book deleted successfully", {
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
      await this.getBooks()
    },
    
    getBook(params){
      this.$router.push({name: 'bookDetails', params: {id: params.row._id}})
    }
  },

    mounted() {
      this.getBooks();
    },

    computed: {
        books() {
          return this.$store.state.books.books
        }
    },
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

.title-cell{
  font-weight: 600;
}

.title-cell:hover{
  cursor: pointer;
  color: #2d96e0;
}
</style>