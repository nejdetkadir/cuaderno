<template lang="pug">
  .container
    .row
      .col-md-4.mx-auto
        .text-center
          img(:src='logo' height='150')
          hr
        form(@submit.prevent="onSubmit")
          .form-group
            label(for='exampleInputEmail1') Email address
            input#exampleInputEmail1.form-control(type='email' aria-describedby='emailHelp' v-model="user.email")
          .form-group
            label(for='exampleInputPassword1') Password
            input#exampleInputPassword1.form-control(type='password' v-model="user.password")
          button.btn.btn-block(type='submit' :class='{"btn-primary" : !isUser, "btn-success" : isUser }') {{ isUser ? 'Sign in' : 'Sign Up' }}
          .text-center.mt-3
            button.btn.btn-outline-secondary.btn-sm(type='submit' @click.prevent='isUser = !isUser') {{ isUser ? "I haven't an account yet" : "I have an account" }}d
</template>

<script>
import Header from "@/components/Header";

export default {
  data() {
    return{
      logo: require('../assets/logo.png'),
      isUser: true,
      user: {
        email: 'nejdetkadir.550@gmail.com',
        password: '5313235157'
      },
    }
  },
  components: {
    Header
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("login", {
        ...this.user, isUser: this.isUser
      });
    }
  }
}
</script>

<style scoped>
  .container{
    margin-top: 130px;
  }
</style>
