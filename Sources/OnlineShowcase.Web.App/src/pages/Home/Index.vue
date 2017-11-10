<template>
  <v-layout>
    <div class="women-product">
      <product-list-header-view :model="model"></product-list-header-view>

      <div class="grid-product">
        <div class="product-grid edit-element">
          <div class="content_box">
            <router-link :to="{ name: 'products.new' }">
              <img
                src="../../../static/images/plus.svg"
                class="img-responsive"
                alt="Add new product"
              />
            </router-link>
          </div>
        </div>

        <div 
          v-infinite-scroll="loadMore" 
          :infinite-scroll-disabled="!model.hasMore" 
          :infinite-scroll-immediate-check="false"
          :infinite-scroll-listen-for-event="true"
        >
          <template v-if="products.found">
            <template v-for="product in products.found.products">
              <div class="product-grid" :key="product.id">
                <manage-icons base-path="`products/${product.id}`" />
                <div class="content_box">
                  <router-link :to="{ path: `products/${product.id}` }">
                    <div class="left-grid-view grid-view-left">
                      <img :src="productImageSrc(product)" alt="" />
                    </div>
                  </router-link>
                  <h4>{{ product.name }}</h4>
                  <p>{{ product.summary }}</p>
                </div>
              </div>
            </template>
          </template>
        </div>

        <div class="clearfix"></div>
      </div>
    </div>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'
  import infiniteScroll from 'vue-infinite-scroll'

  import VLayout from '@/layouts/Default'
  import ManageIcons from '@/components/ManageIcons'
  import ProductListHeaderView from './ProductListHeaderView'

  import UrlBuilder from '../../utils/url-builder'

  export default {
    name: 'home-index',
    components: {
      VLayout,
      ManageIcons,
      ProductListHeaderView
    },
    data() {
      return {
        model: {
          filter: {}
        }
      }
    },
    directives: {
      infiniteScroll
    },
    created() {
      this.updateModel(this.products)
    },
    methods: {
      updateModel(model) {
        const { sorts, found, filter } = model

        this.model = {
          ...this.model,
          sorts: Object.keys(sorts),
          filter: found ? found.filter : filter,
          hasMore: !found || found.products.length === found.filter.take,
          location: this.$route.fullPath
        }
      },
      onRouteChange() {
        const { params, query } = this.$route

        const categoryId = !params || !params.categoryId ? null : params.categoryId

        if (this.model.category && categoryId === this.model.category.categoryId) {
          return
        }

        let category = null
        let categories = null

        if (categoryId) {
          category = this.categoryMap[categoryId]

          if (!category) {
            this.model.category = category
            return
          }

          categories = [categoryId]

          category.children.forEach((child) => {
            categories.push(child.id)
          })
        }

        this.model = {
          ...this.model,
          filter: {
            ...this.model.filter,
            skip: 0,
            sort: query.sort || this.model.filter.sort,
            categories
          },
          category
        }

        this.$store.dispatch('products/all', this.model.filter)
      },
      loadMore() {
        if (!this.model.hasMore) {
          return
        }

        const filter = { ...this.model.filter }
        filter.skip += filter.take

        this.$store.dispatch('products/all', filter)
      },
      productImageSrc(product) {
        return UrlBuilder.buildFileUrl(product.imageId)
      }
    },
    computed: {
      ...mapState({
        categoryMap: state => state.categories.categoryMap,
        productList: state => state.products.found,
        products: state => state.products
      })
    },
    watch: {
      $route() {
        this.onRouteChange()
      },
      productList() {
        this.updateModel(this.products)
      },
      categoryMap() {
        this.onRouteChange()
      }
    }
  }
</script>
