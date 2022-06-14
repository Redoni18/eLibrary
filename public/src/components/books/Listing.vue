<template>
<div>
<div class="form-group row" v-if="toggleButtons">
    <div class="col-sm-10 offset-sm-0 offset-md-0 offset-md-9">
        <router-link :to="{name: 'editBook', params: {id: rowId}}"> <button type="submit" class="btn btn-primary">Edit Book</button></router-link>
        <button type="submit" class="btn btn-danger" @click="removeBook(rowId)">Delete Book</button>

    </div>
  </div>


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
    @on-row-click="onRowClick"
    >
        
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
        toggleButtons: false,
        rowId: null,
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

    onRowClick(params){
      if(this.user.data.isAdmin){
        this.toggleButtons = !this.toggleButtons
        this.rowId = params.row._id
      }
      return
    },
    
    async removeBook(id) {
      if(window.confirm("Are you sure you want to delete this book?")){
        await axios.delete(`http://localhost:8000/api/books/delete/${id}`)
        this.toggleButtons = false
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
