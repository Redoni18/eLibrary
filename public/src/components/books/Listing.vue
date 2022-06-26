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
    <template v-if="user.data.isAdmin" v-slot:table-row="props">
      <span v-if="props.column.field === 'actions'">
        <div class="more-options">
          <b-dropdown id="dropdown-right" right text="Right align" variant="link" toggle-class="text-decoration-none text-secondary" no-caret class="m-2">
        <template #button-content>
            <b-icon icon="three-dots"></b-icon>
          </template>
        <b-dropdown-item
          @click="removeBook(props.row._id)"
        >
         <span
            class="d-flex align-items-center"
          >
            <b-icon icon="trash"></b-icon>
            <p class="p-0 m-0 ml-3">Delete</p>
          </span>
        </b-dropdown-item>
        <b-dropdown-item
            :to="{name: 'editBook', params: {id: props.row._id}}"
        >
            <span
              class="d-flex align-items-center"
            >
              <b-icon icon="pen"></b-icon>
              <p class="p-0 m-0 ml-3">Edit</p>
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
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
    name: 'Listing',
    data(){
      return {
        user: JSON.parse(window.localStorage.getItem('user')),
        columns: [
          {
            label: 'Title',
            field: 'title',
            tooltip: 'Click on a specific row that you want to edit or delete!',
          },
          {
            label: 'Author',
            field: 'author',
            tooltip: 'Click on a specific row that you want to edit or delete!',
          },
          {
            label: 'Description',
            field: 'description',
            tooltip: 'Click on a specific row that you want to edit or delete!',
          },
          {
            label: 'Year',
            field: 'year',
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
  methods: {
    ...mapActions({
        getBooks: 'getBooks',
    }),
    
    async removeBook(id) {
      if(window.confirm("Are you sure you want to delete this book?")){
        await axios.delete(`http://localhost:8000/api/books/delete/${id}`)
      }
      await this.getBooks()
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
</style>
