<template lang="pug">
  nav.navbar.navbar-expand-lg.navbar-light.bg-white
    router-link(to='/' tag='a').navbar-brand CUADERNO
    button.navbar-toggler(type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarSupportedContent.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item
          a.nav-link(@click.prevent="logout" href='#') Logout
        li.nav-item.dropdown
          a#navbarDropdown.nav-link.dropdown-toggle(href='#' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false')
            | Dropdown
          .dropdown-menu(aria-labelledby='navbarDropdown')
            a.dropdown-item(href='#') Action
            a.dropdown-item(href='#') Another action
            .dropdown-divider
            a.dropdown-item(href='#') Something else here
        li.nav-item
          a.nav-link.disabled(href='#' tabindex='-1' aria-disabled='true') Disabled
      form.form-inline.my-2.my-lg-0(@submit.prevent="onSaveCollection()")
        input.form-control.mr-sm-2(type='text' v-model='collectionName' placeholder='Collection name' aria-label='Search')
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
      }
    },
  }
</script>

<style scoped>

</style>