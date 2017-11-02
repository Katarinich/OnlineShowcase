<template>
  <div class='icon-group edit-element'>
    <router-link :to="{ path: `${basePath}/delete` }" class='icon delete'/>
    <router-link :to="{ path: `${basePath}/edit` }" class='icon edit'/>
  </div>
</template>

<script>
  export default {
    name: 'manage-icons',

    props: {
      basePath: {
        type: String,
        required: true
      }
    }
  }
</script>
