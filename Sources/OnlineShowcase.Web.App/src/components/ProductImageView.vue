<template>
  <div className="product-grid grid-view-left product-image">
    <span
      className="icon delete edit-element"
      @click.prevent="removeImage(image)"
    />
    <span
      className="edit-element set-primary"
      @click.prevent="setAsPrimaryImage(image)"
    >
      Set as primary
    </span>
    <img src="" alt="" />
  </div>
</template>

<script>
  export default {
    name: 'product-image-view',
    props: {
      image: {
        type: Object,
        required: true
      }
    }
  }
</script>