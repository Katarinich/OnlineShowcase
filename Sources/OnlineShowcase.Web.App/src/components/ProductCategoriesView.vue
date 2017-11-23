<template>
  <div class="desc1 span_3_of_2">
    <template v-if="categories">
      <template v-for="category in categories">
        <router-link
          :to="{ path: `/categories/${category.id}` }"
          class="category"
          :key="category.id"
        >
          {{ category.name }}
          <span
            class="icon delete edit-element"
            @click.prevent="removeCategory(category)"
          />
        </router-link>
      </template>
    </template>

    <div class="edit-element">
      <select @click="selectedCategoryChanged">
        <option>Select category</option>
        <template v-if="notAddedCategories">
          <template v-for="category in notAddedCategories">
            <option :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </template>
        </template>
      </select>

      <button @click="addCategory" type="button">add</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'product-categores-view',
    props: {
      categories: {
        type: Array
      },
      notAddedCategories: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        selectedCategoryId: null
      }
    },
    methods: {
      selectedCategoryChanged(event) {
        this.selectedCategoryId = event.target.value
      },
      addCategory() {
        //todo
      },
      removeCategory(category) {
        console.log(category)
        //todo
      }
    }
  }
</script>