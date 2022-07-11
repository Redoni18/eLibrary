<template>
    <b-card class="add-categories__container">
        <div class="add-categories__title">
            <b-label>Category Title</b-label>
            <b-form-input :state="title.length > 4 " v-model="title" placeholder="Category title..." />
        </div>
        <div class="add-categories__description">
            <b-label>Category Description</b-label>
            <b-form-textarea
            id="textarea"
            v-model="description"
            :state="description.length > 10"
            placeholder="Add Description...."
            rows="2"
            max-rows="6"
            />
        </div>
        <div class="add-categories__buttons">
            <b-button @click="generateCancel()" variant="danger">Cancel</b-button>
            <b-button @click="generateCategory()" variant="success">Add</b-button>
        </div>
    </b-card>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            state: true,
            title: '',
            description: ''
        }
    },
    methods: {
        generateCancel() {
            this.$router.push('/categories')
        },
         async generateCategory() {
            const category = { title: this.title, description: this.description}
             await axios.post('http://localhost:8000/api/category/add', category).then(response => {
                this.$router.push('/categories')
                this.$toast.success("Category added successfully", {
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
    }
}
</script>

<style scoped>
.add-categories__title{
    margin-bottom: 20px;
}
.add-categories__description{
    margin-bottom: 20px
}
</style>