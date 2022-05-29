<template>

    <div class="card" @click="sendEvent">
      <img src="./hp.jpg" alt="Avatar" style="width:100%">
      <div class="container">
        <h3>{{title}}</h3>
        <p>{{author}}</p>
        <p>{{description}}</p>
        <p>{{year}}</p>
      </div>
    </div>
</template>


<script>
    export default {
        name: 'Book',

        props: ['title', 'description', 'author', 'year'],

        methods: {
          sendEvent(){
            this.$emit('changePage')
          }
        }
    }
</script>


<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 21%;
  margin: 10px auto;
  background: #f1f1f1;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}

@media only screen and (max-width: 800px) {
  .card {
    width: 40%;
    margin: 10px auto;
  }
}

@media only screen and (max-width: 600px) {
  .card {
    width: 60%;
    margin: 10px auto;
  }
}
</style>
