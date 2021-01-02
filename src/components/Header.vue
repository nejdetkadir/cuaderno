<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-light.bg-white
    router-link(to='/' tag='a').navbar-brand CUADERNO
    button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item
          router-link(to='/today' tag='a' v-if="$route.path === '/'").nav-link TODAY
        li.nav-item
          a.nav-link(@click.prevent="logout" href='#') logout
      form.form-inline.my-2.my-lg-0(@submit.prevent="onSaveCollection()" v-if="$route.path === '/'")
        input.form-control.mr-sm-2(type='text' v-model='collectionName' maxlength='15' placeholder='Collection name' aria-label='Search')
        button.btn.btn-outline-secondary.my-2.my-sm-0 CREATE
</template>

<script>
  export default {
    name: "Header",
    data() {
      return{
        collectionName: ''
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout");
        this.$router.replace("/auth");
      },
      onSaveCollection() {
        this.$store.dispatch("saveCollection", {
          collectionName: this.collectionName
        });
        this.collectionName = '';
      }
    },
  }
</script>

<style scoped>

</style>