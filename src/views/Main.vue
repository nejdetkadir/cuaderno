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
            .btn-group(role='group')
              router-link(:to='"/details/" + col.id' tag='a')
                button.btn.btn-outline-info VIEW
              button.btn.btn-outline-danger(type='button' @click.prevent='removeCollection(col.id)') DELETE

</template>

<script>
  import Header from "@/components/Header";

  export default {
    data() {
      return{
        cover: require('../assets/note.png')
      }
    },
    methods: {
      removeCollection(id) {
        this.$store.dispatch('deleteCollection', {
          id
        });
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
