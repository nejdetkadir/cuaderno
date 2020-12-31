<template lang="pug">
  router-view
</template>

<script>
  export default {
    created() {
      this.$store.dispatch("initAuth");
    }
  }
</script>

<style>
  body{
    background-color: beige !important;
  }
</style>
