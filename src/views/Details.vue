<template lang="pug">
  .container.mt-5
    Header
    hr
    #accordionExample.accordion
      .card(v-for='i in 5')
        .card-header(:id='"heading" + i')
          h2.mb-0
            button.btn.btn-link.btn-block.text-left.text-dark(type='button' data-toggle='collapse' :data-target='"#collapse" + i' aria-expanded='true' :aria-controls='"collapse" + i')
              .form-check
                input.form-check-input(type='checkbox')
                label.form-check-label
                  | Note title {{ i }}
        .collapse(:aria-labelledby='"heading" + i' :id='"collapse" + i' data-parent="#accordionExample" )
          .card-body
            .row
              .col-md-6
                .form-group
                  textarea#exampleFormControlTextarea1.form-control(rows='5' placeholder='Note')
              .col-md-6
                .form-row
                  .col
                    button.btn.btn-secondary.btn-block(type='button') Today
                  .col
                    button.btn.btn-secondary.btn-block(type='button') Tomorrow
                  .col
                    button.btn.btn-secondary.btn-block(type='button') 04-01-2000
                .form-group.mt-4
                  label(for='exampleFormControlSelect1') Priority
                  select#exampleFormControlSelect1.form-control
                    option None
                    option Low
                    option Medium
                    option High
    .input-group.mb-3
      .input-group-prepend
        span#inputGroup-sizing-default.input-group-text +
      input.form-control(type='text' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-default')
</template>

<script>
  import Header from "@/components/Header";
  export default {
    name: 'Details',
    components: {
      Header
    }
  }
</script>

<style scoped>
  .card{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  input:focus{
    box-shadow: none !important;
  }
  textarea{
    resize: none !important;
  }
  textarea:focus{
    box-shadow: none !important;
  }
  button:focus{
    box-shadow: none !important;
  }
</style>