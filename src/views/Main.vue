<template lang="pug">
  .container.mt-5
    Header
    hr
    .row
      .col-sm-3(v-for='col in this.$store.getters.getCollections')
        .card.text-center.mt-2.shadow.p-3.mb-3.rounded
          img(:src='cover')
          .card-body
            h5.card-title {{col.collectionName}}
            router-link(:to='"/details/" + col.id' tag='a').btn.btn-outline-secondary VIEW
</template>

<script>
  import Header from "@/components/Header";

  export default {
    data() {
      return{
        cover: require('../assets/note.png')
      }
    },
    components: {
      Header
    },
    created() {
      this.$store.dispatch('initCollections');
    }
  }
</script>

<style scoped>
  .card{
    display: block !important;
  }
</style>
