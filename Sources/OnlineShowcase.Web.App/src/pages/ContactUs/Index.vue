<template>
  <v-layout>
    <div class="main">
      <div class="reservation_top">
        <div class="contact_right">
          <h3>Contact Form</h3>
          <div class="contact-form">
            <form v-if="true" @submit.prevent="handleSubmit">
              <validation-form-field
                fieldType="input"
                className="textbox"
                placeholder="Type your name"
                name="name"
                type="text"
                v-validate="'required'"
                v-model="name"
                data-vv-value-path="innerValue" 
                data-vv-name="name" 
                :has-error="errors.has('name')"
                :error-message="errors.first('name')"
              />
              <validation-form-field
                fieldType="input"
                className="textbox"
                type="text"
                placeholder="Type your email"
                name="email"
                v-model="email"
                v-validate="'required|email'"
                data-vv-value-path="innerValue" 
                data-vv-name="email" 
                :has-error="errors.has('email')"
                :error-message="errors.first('email')"
              />
              <validation-form-field
                fieldType="textarea"
                className="edit-element"
                placeholder="Type message"
                name="message"
                v-model="message"
                v-validate="'required'"
                data-vv-value-path="innerValue" 
                data-vv-name="message" 
                :has-error="errors.has('message')"
                :error-message="errors.first('message')"
              />
              
              <button :disabled="!isFormValid">Send</button>
              <div class="clearfix" />
            </form>
            <p v-else>Thanks for yor massege!</p>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
  import VLayout from '@/layouts/Default'
  import ValidationFormField from '@/components/ValidationFormField'

  export default {
    name: 'contactus-index',
    components: {
      VLayout,
      ValidationFormField
    },
    data() {
      return {
        email: '',
        name: '',
        message: ''
      }
    },
    computed: {
      isFormValid() {
        return !Object.keys(this.fields).some(key => !this.fields[key].valid)
      }
    },
    methods: {
      handleSubmit() {
        this.$store.dispatch('notifications/create', {
          name: this.name,
          email: this.email,
          message: this.message
        })
      }
    }
  }
</script>
