<template>

<div class="book-details__page">
    <div class="book-details">
        <div class="book-details__container">
            <div class="title-abstract__container">
                <h2 class="book-title">{{selectedBlogpost.title}}</h2>
                <hr class="content-seperator">
                <p class="abstract">Abstract: </p>
                <div class="book-abstract">
                    {{selectedBlogpost.description}}
                </div>
            </div>

            <div class="quick-info__card">
                <div class="quick-info__row">
                    <div class="book-cover__container">
                        <img :src="selectedBlogpost.imageUrl" class="book-cover">
                    </div>
                </div>
                <hr class="card-seperator">
            </div>
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

.book-details__page{
    width: 800px;
   display: flex;
    flex-direction: column; 
    margin: auto;
}

.book-details{
    display: flex;
    justify-content: center;
    align-items: center;
}

.book-details__container{
    width: 800px;
    display: flex;
    justify-content: space-between;
}

.title-abstract__container{
    width: 100%;
}

.book-title{
    width: calc(100% - 40px);
    word-break: break-word;
    color: #2d96e0;
    font-weight: 800;
}

.abstract{
    font-weight: 800;
}

.book-abstract{
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

.book-cover_container{
    width: fit-content;
}

.book-cover{
    object-fit: contain;
    width: 130px;
}

.book-metadata{
    width: 130px;
}

.book-metadata, p{
    font-weight: 700;
}

.book-details_reviews{
    width: 100%;
    margin: auto;
}

.reviews-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.single-review{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(223, 223, 223);
    margin-bottom: 10px;
}

.review-body{
    display: flex;
    word-break: break-word;
}


.user-avatar{
    height: 100%;
    margin-top: 0;
}

.review-content{
    height: 100%;
    margin-left: 10px;
}

.review-content small{
    font-weight: bold;
    color: #4094cf;
}

.review-paragraph{
    font-weight: normal;
    width: 100%;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* number of lines to show */
    -webkit-box-orient: vertical;
}


@media only screen and (max-width: 850px){

    .book-details__page {
        width: 500px;
    }

    .book-details__container{
        display: flex;
        flex-direction: column;
    }

    .book-abstract{
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

    .book-metadata{
        margin-left: 20px;
        width: 100%;
    }

    .book-categories{
        margin-right: auto;

    }

    .book-details_reviews{
        width: 100%;
    }
}

@media only screen and (max-width: 500px){
    .book-details__page{
        width: 300px;
    }
    .quick-info__card{
        display: none;
    }

    .book-abstract{
        width: 100%
    }

    .reviews-text{
        display: none;
    }

    .single-review{
        display: none;
    }
}

</style>