<template lang="pug">
  .container.mt-5
    Header
    hr
    .row
      .col-md-12
        ul.list-group
          li.list-group-item(v-for='today in this.$store.getters.getToday' :class="{'list-group-item-info': today.priority === 'Low', 'list-group-item-warning': today.priority === 'Medium', 'list-group-item-danger': today.priority === 'High'}") {{today.title}}
        .alert.alert-danger.text-center(v-if='this.$store.getters.getToday.length === 0')
          | You are free today! :)
</template>

<script>
  import Header from "@/components/Header";
  export default {
    name: "Today",
    components: {
      Header
    }
  }
</script>

<style scoped>

</style>