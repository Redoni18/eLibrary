<template>

<div class="blog-details__page">
    <div class="blog-details">
        <div class="blog-details__container">
            <div class="title-abstract__container">
                <h2 class="blog-title">{{selectedBlogpost.title}}</h2>
                <hr class="content-seperator">
                <p class="abstract">Abstract: </p>
                <div class="blog-abstract">
                    {{selectedBlogpost.description}}
                </div>
            </div>

            <div class="quick-info__card">
                <div class="quick-info__row">
                    <div class="blog-cover__container">
                        <img :src="selectedBlogpost.imageUrl" class="blog-cover">
                    </div>
                </div>
                <hr class="card-seperator">
            </div>
        </div>
    </div>
</div>

</template>

<script>

import { mapActions, mapGetters  } from 'vuex'
import { mdbDropdown, mdbDropdownItem, mdbDropdownMenu, mdbDropdownToggle, mdbIcon } from 'mdbvue';

export default {
    name: "Blogpost Details",
    components: {
      mdbDropdown,
      mdbDropdownItem,
      mdbDropdownMenu,
      mdbDropdownToggle,
      mdbIcon
    },
    data() {
        return {
            selectedBlogpost: {},
        }
    },

    async mounted(){
        const response = await this.getBlogpost(this.blogpostId)
        this.selectedBlogpost = response.data
        this.response = data.data
    },
    computed: {
        blogpostId() {
            return this.$route.params.id
        },
             ...mapGetters({
                user: 'getUser'
        })
    },

    methods: {
        ...mapActions({
            updateBlogpost: 'updateBlogpost',
            getBlogpost: 'getBlogpost'
        }),
    }
}
</script>


<style scoped>

.blog-details__page{
    width: 800px;
   display: flex;
    flex-direction: column; 
    margin: auto;
}

.blog-details{
    display: flex;
    justify-content: center;
    align-items: center;
}

.blog-details__container{
    width: 800px;
    display: flex;
    justify-content: space-between;
}

.title-abstract__container{
    width: 100%;
}

.blog-title{
    width: calc(100% - 40px);
    word-break: break-word;
    color: #2d96e0;
    font-weight: 800;
}

.abstract{
    font-weight: 800;
}

.blog-abstract{
    width: calc(100% - 20px);
}

.content-seperator{
    width: calc(100% - 30px);
    margin-left: 0;
}


.quick-info__card{
    padding: 10px;
    width: 300px;
    box-shadow: rgb(14 30 37 / 12%) 0px 2px 4px 0px, rgb(14 30 37 / 32%) 0px 2px 16px 0px;
    padding: 10px;
    border-radius: 5px;
    height: fit-content;
}

.quick-info__row{
    display: flex;
    width: 280px;
    justify-content: space-between;
}


.blog-cover{
    object-fit: contain;
    width: 130px;
}


.blog-metadata, p{
    font-weight: 700;
}


@media only screen and (max-width: 850px){

    .blog-details__page {
        width: 500px;
    }

    .blog-details__container{
        display: flex;
        flex-direction: column;
    }

    .blog-abstract{
        width: 100%
    }

    .title-abstract__container{
        margin-bottom: 20px;
    }

    .quick-info__card{
        display: flex;
        width: 100%;
        justify-content: space-around;
    }

    .card-seperator{
        display: none;
    }

    .quick-info__row{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: flex-start;
    }
}

@media only screen and (max-width: 500px){
    .blog-details__page{
        width: 300px;
    }
    .quick-info__card{
        display: none;
    }

    .blog-abstract{
        width: 100%
    }

}

</style>