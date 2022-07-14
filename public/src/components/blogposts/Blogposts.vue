<template>
    <div class="users_container container">
        <h2 class="title">{{pageTitle}}</h2>
        <div class="row">
                
                <blogpost class="single-blogpost" @changePage="changePage(blogpost._id)" v-for="blogpost in blogposts" :key="blogpost._id" @getDataOnHover="changeDefOver(blogpost._id)" :title="blogpost.title" :imageUrl="blogpost.imageUrl" :description="blogpost.description">

                </blogpost>
        </div>

    </div>
</template>


<script>
    import blogpost from '@/components/blogposts/Blogpost'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'Blogpost',

        components: { blogpost },
        props: ['pageTitle'],
        data(){
            return {
                selectedBlogpost: {}
            }
        },

        methods: {
            ...mapActions({
                getBlogposts: 'getBlogposts',
                getBlogpost: 'getBlogpost'
            }),
            changePage(id){
                this.$router.push({name: 'blogpostDetails', params: {id: id}})
            },
            async changeDefOver(blogpost) {
                const response = await this.getBlogpost(blogpost)
                this.selectedBlogpost = response.data
                console.log(this.selectedBlogpost)
            }
        },

        mounted() {
            this.getBlogposts();
        },


        computed: {
            ...mapGetters({
                blogposts: 'getBlogposts'
            })
        },
    }
</script>


<style scoped>
    .title {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 30px;
    }

    .row{
        display: flex;
        justify-content: center;
    }

    
</style>