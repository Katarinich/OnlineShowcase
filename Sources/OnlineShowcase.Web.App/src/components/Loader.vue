<template>
  <div class="dimmer active" v-if="visible">
    <div class="loader"></div>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean
      }
    }
  }
</script>

