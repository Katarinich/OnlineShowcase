<template>
  <ul class="menu">
    <template v-for="category in categories.list">
      <li :key="category.id">
        <manage-icons :base-path="`categories/${category.id}`" />
        <router-link :to="{ path: `/categories/${category.id}` }">
          {{ category.name }}

          <img 
            v-if="hasSubMenu(category)" 
            class="arrow-img" 
            src="../../static/images/arrow1.png" 
            alt="" 
          />
        </router-link>

        <ul
          v-if="hasSubMenu(category)"
          class="cute"
        >
          <template v-for="child in category.children">
            <li :key="child.id">
              <manage-icons :base-path="`categories/${child.id}`" />
              <router-link :to="{ path: `/categories/${child.id}` }">{{ child.name }}</router-link>
            </li>
          </template>
          <li class="edit-element">
            <router-link :to="{ path: `/categories/${category.id}/new` }">
              Add sub category
            </router-link>
          </li>
        </ul>
      </li>
    </template>
    <li class="edit-element">
      <router-link :to="{ name: 'categories.new' }">Add category</router-link>
    </li>
  </ul>
</template>

<script>
  import ManageIcons from './ManageIcons'

  export default {
    name: 'category-list',

    data() {
      return {
        categories: this.$store.state.categories
      }
    },

    components: {
      ManageIcons
    },

    computed: {
      isEditMode() {
        return this.$store.getters['user/isContentEditor']
      }
    },

    methods: {
      hasSubMenu(category) {
        return category.children.length > 0 || this.isEditMode
      }
    },

    created() {
      this.$store.dispatch('categories/all')
    }
  }
</script>
