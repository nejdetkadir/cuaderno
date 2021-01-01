<template lang="pug">
  .container.mt-5
    Header
    hr
    #accordionExample.accordion
      .card(v-for='note in this.$store.getters.getNotes' :id="'note' + note.id")
        .card-header(:id='"heading" + note.id')
          h2.mb-0
            button.btn.btn-link.btn-block.text-left.text-dark(type='button' data-toggle='collapse' :data-target='"#collapse" + note.id' aria-expanded='true' :aria-controls='"collapse" + note.id')
              .form-check
                input.form-check-input(type='checkbox' v-model='noteData' :value="note.id")
                label.form-check-label
                  | {{note.title}}
        .collapse(:aria-labelledby='"heading" + note.id' :id='"collapse" + note.id' data-parent="#accordionExample" )
          .card-body
            .row
              .col-md-6
                .form-group
                  textarea#exampleFormControlTextarea1.form-control(rows='5' placeholder='Note') {{ note.longNote }}
              .col-md-6
                form
                  .form-row
                    .col
                      button.btn.btn-secondary.btn-block(type='button') Today
                    .col
                      button.btn.btn-secondary.btn-block(type='button') Tomorrow
                    .col
                      button.btn.btn-secondary.btn-block(type='button') 04-01-2000
                  .form-group.mt-4
                    label Priority
                    select.form-control(v-model='note.priority')
                      option None
                      option Low
                      option Medium
                      option High
              .col-md-12
                  button.btn.btn-outline-success.btn-block(:id="'button' + note.id") UPDATE
    .input-group.mb-3
      .input-group-prepend
        span#inputGroup-sizing-default.input-group-text +
      input.form-control(type='text' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-default' v-on:keyup.enter='onSaveNote' v-model='title')
</template>

<script>
  import Header from "@/components/Header";
  export default {
    name: 'Details',
    components: {
      Header
    },
    data() {
      return{
        title: '',
        longNote: 'Long text',
        priority: 'None',
        noteData: []
      }
    },
    methods: {
      onSaveNote() {
        this.$store.dispatch('saveNote', {
          title: this.title,
          longNote: this.longNote,
          priority: this.priority
        });
        this.title = '';
      }
    },
    watch: {
      noteData: function (val) {
        if (val.length !== 0) {
          this.$store.dispatch('deleteNote', {
            id: val[0]
          }).then(() => {
            this.noteData = [];
          })
        }
      }
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