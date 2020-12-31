<template lang="pug">
  .container
    .row
      .col-md-4.mx-auto
        .text-center
          img(:src='logo' height='150')
          hr
        form
          .form-group
            label(for='exampleInputEmail1') Email address
            input#exampleInputEmail1.form-control(type='email' aria-describedby='emailHelp')
          .form-group
            label(for='exampleInputPassword1') Password
            input#exampleInputPassword1.form-control(type='password')
          button.btn.btn-block(type='submit' :class='{"btn-primary" : !isLogin, "btn-success" : isLogin }') {{ isLogin ? 'Sign in' : 'Sign Up' }}
          .text-center.mt-3
            button.btn.btn-outline-secondary.btn-sm(type='button' @click.prevent='isLogin = !isLogin') {{ isLogin ? "I haven't an account yet" : "I have an account" }}d
</template>

<script>
import Header from "@/components/Header";

export default {
  data() {
    return{
      logo: require('../assets/logo.png'),
      isLogin: true
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
  .container{
    margin-top: 130px;
  }
</style>
