<template>
  <div class="w_content">
    <div class="women">
      <h4 v-if="model.category">{{ model.category.name }}</h4>
      <ul class="w_nav">
        <li>Sort : </li>
        <template v-for="sort in model.sorts">
          <li :key="sort">
            <span v-if="!model.filter || model.filter.sort === sort">{{ sort }}</span>
            <router-link
              v-else
              :to="{ path: model.location.pathname, query: Object.assign({}, model.location.query, { sort }) }"
            >
              {{ sort }}
            </router-link>
          </li>
        </template>
      </ul>
      <div class="clearfix"> </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product-list-header-view',
    props: {
      model: {
        type: Object,
        required: true
      }
    }
  }
</script>
