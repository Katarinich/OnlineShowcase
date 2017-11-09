<template>
  <div>
    <component
      :is="fieldType"
      :type="type"
      :class="className"
      :placeholder="placeholder"
      :name="name"
      v-model.trim="innerValue"
      @blur="handleChange"
      @input="handleChange"
    />
    <span v-if="hasError" class="form-error is-visible">{{ errorMessage }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      hasError: Boolean,
      errorMessage: String,
      fieldType: String,
      placeholder: String,
      type: String,
      name: String,
      className: String
    },
    data() {
      return {
        innerValue: null
      }
    },
    watch: {
      innerValue(value) {
        this.$emit('input', value)
      }
    },
    methods: {
      handleChange(e) {
        this.innerValue = e.target.value
      }
    }
  }
</script>