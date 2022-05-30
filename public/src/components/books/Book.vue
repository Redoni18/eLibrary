<template>

    <div class="book-card" @click="sendEvent">
      <b-card
        :title="title"
        :img-src="imageUrl"
        img-alt="Image"
        img-top
        tag="article"
        img-height="250"
        style="max-width: 20rem;min-width: 20rem;"
        class="mb-2"
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

        methods: {
          sendEvent(){
            this.$emit('changePage')
          }
        }
    }
</script>


<style scoped>
.book-card{
  margin: 10px;
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
