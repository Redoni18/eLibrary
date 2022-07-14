<template>

    <div class="book-card" @click="sendEvent" @mouseover="changeDefOver" @mouseleave="hover = true">
      <b-card
        :img-src="imageUrl"
        img-alt="Image"
        img-top
        tag="article"
        img-height="250"
        style="max-width: 15rem;min-width: 15rem;object-fit: contain;"
        class="mb-2 img-thumbnail"
      >

        <b-card-text class="title-book">
          <h6>{{title}}</h6>
        </b-card-text>
      
        <b-button size="md" variant="primary">Read More</b-button>  
      </b-card>
    </div>
</template>


<script>
    export default {
        name: 'Book',

        props: ['title', 'description', 'author', 'year', 'imageUrl'],
        data(){
          return {
            hover: true
          }
        },

        methods: {
          sendEvent(){
            this.$emit('changePage')
          },
          changeDefOver(){
            if(this.hover){
              this.$emit('getDataOnHover')
            }
            this.hover = false;
          }
        }
    }
</script>


<style scoped>
.book-card{
  margin: 10px;
  transition: 0.3s ease;
}

.book-card:hover{
  cursor: pointer;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transition: 0.3s ease;
}

.title-book{
  overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 2; /* number of lines to show */
   -webkit-box-orient: vertical;
}

.title-book h6{
  font-weight: bold;
}

@media only screen and (max-width: 1050px){
  .book-card{
    margin: 10px auto;
  }
}

@media only screen and (max-width: 995px){
  .book-card{
    margin: 10px auto;
  }
}
</style>
