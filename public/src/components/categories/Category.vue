<template>
    <b-card v-if="edited">
      <div class="add-categories__title">
            <b-label>New Category Title</b-label>
            <b-form-input :state="title.length > 4 " v-model="title" :placeholder="category.title" />
        </div>
        <div class="add-categories__description">
            <b-label> New Category Description</b-label>
            <b-form-textarea
            id="textarea"
            v-model="description"
            :state="description.length > 10"
            :placeholder="category.description"
            rows="2"
            max-rows="6"
            />
        </div>
        <div style="margin-top: 20px;">
            <b-button variant="dark" @click="editForm('cancel')">Cancel</b-button>
            <b-button variant="success" @click="editForm('save')">Save</b-button>
        </div>
    </b-card>
    <b-card v-else :title="category.title">
        <b-card>
            {{category.description}}
        </b-card>
       <div style="margin-top: 20px;" v-if="user.data.isAdmin">
            <b-button variant="dark" @click="editForm('cancel')">Cancel</b-button>
            <b-button variant="danger" @click.prevent="remove()">Delete</b-button>
            <b-button variant="info" @click="edit()">Edit</b-button>
       </div>
       <div v-else style="margin-top: 20px;">
            <b-button variant="dark"  @click="editForm('cancel')">Return</b-button>
       </div>
    </b-card>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            category: {},
            title: '',
            description: '',
            edited: false
        }
    },
          computed: {
             ...mapGetters({
                user: 'getUser'
             }),
    },
    methods: {
        edit() {
            this.edited = !this.edited
        },
       async editForm(status) {
            if (status === 'cancel') {
                this.title = '',
                    this.description = '',
                    this.edited = false
                this.$router.push('/categories')
            } else if (status === 'save') {
                if (this.title.length < 4 || this.description.length < 10) {
                    this.title = this.category.title
                    this.description = this.category.description
                    this.edited = false
                } else {
                     await axios.put(`http://localhost:8000/api/category/edit/${this.category._id}`, { id: this.category._id, title: this.title, description: this.description }).then(
                        response => {
                            this.$router.push('/categories')
                        }
                    )
                }
            }
        },
         async remove() {
             await axios.delete(`http://localhost:8000/api/category/delete/${this.category._id}`)
                 .then(response => {
                this.$router.push('/categories')
            })
        }
    },
     props: {
        default: true
    },
     async mounted() {
         const category = await axios(`http://localhost:8000/api/category/${this.$route.params.id}`)
             .then(response => {
                 this.category = response.data
                this.title = response.data.title
                this.description = response.data.description
             })
    }
}
</script>