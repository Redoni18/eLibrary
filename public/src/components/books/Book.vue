<template>

    <div class="book-card" @click="sendEvent" @mouseover="changeDefOver" @mouseleave="hover = true">
      <b-card
        :title="title"
        :img-src="imageUrl"
        img-alt="Image"
        img-top
        tag="article"
        img-height="250"
        style="max-width: 15rem;min-width: 15rem;object-fit: contain;"
        class="mb-2 img-thumbnail"
      >
        <b-card-text>
          {{description}}
        </b-card-text>

        <b-button href="#" variant="primary">Read More</b-button>
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
