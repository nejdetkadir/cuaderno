<template lang="pug">
  transition(name='fade' mode='out-in')
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
  .fade-enter{
    opacity: 0;
  }
  .fade-enter-active{
    transition: opacity .2s ease-out;
  }
  .fade-leave-active{
    transition: opacity .2s ease-out;
    opacity: 0;
  }
</style>
