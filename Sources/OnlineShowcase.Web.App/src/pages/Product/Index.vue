<template>
  <v-layout>
    <div class="single_top">
      <form>
        <div class='single_grid'>
          <div class='grid images_3_of_2'>
            <img :src="productImageSrc(product.imageId)" alt='' />
            <div class='clearfix' />
          </div>

          <div class='desc1 span_3_of_2'>
            <h4 class='view-element'>{{ product.name }}</h4>
            <validation-form-field
              fieldType='input' 
              className='edit-element'
              placeholder='Type product name' 
              name='name'
              v-model="name"
              v-validate="'required'"
              data-vv-value-path="innerValue" 
              data-vv-name="name" 
              :has-error="errors.has('name')"
              :error-message="errors.first('name')"
            />
            <h6>{{ product.viewCount }} views.</h6>
          </div>

          <product-categories-view :categories="product.categories" :notAddedCategories="[]" />

        <div class="clearfix" />
        </div>

        <div class='grid-product'>
          <div class='product-grid upload-files edit-element'>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </div>

          <template v-if="product.images">
            <template v-for="img in product.images">
              <product-image-view :image="img" :key="productImageSrc(img)" />
            </template>
          </template>

          <div class="clearfix" />
        </div>

        <div class='toogle'>
          <h3 class='m_3'>Product Details</h3>
          
          <template v-for="(paragraph, i) in paragraphs">
            <p class='m_text view-element' :key="i">{{ paragraph }}</p>
          </template>

          <validation-form-field
            fieldType="textarea" 
            className='edit-element' 
            placeholder='Type description' 
            name='description' 
            v-model="description"
            v-validate="'required'"
            data-vv-value-path="innerValue" 
            data-vv-name="description" 
            :has-error="errors.has('description')"
            :error-message="errors.first('description')" 
          />
        </div>

        <div class='btn-group edit-element'>
          <button :disabled="!isFormValid">Save</button>
          <a @click="handleCancel" class='button'>Cancel</a>
        </div>
      </form>
    </div>
  </v-layout>
</template>

<script>
  import { mapState } from 'vuex'

  import VLayout from '@/layouts/Default'

  import ProductImageView from '@/components/ProductImageView'
  import ValidationFormField from '@/components/ValidationFormField'
  import ProductCategoriesView from '@/components/ProductCategoriesView'

  import UrlBuilder from '../../utils/url-builder'

  export default {
    name: 'product',
    components: {
      VLayout,
      ValidationFormField,
      ProductCategoriesView
    },
    data() {
      return {
        name: '',
        description: ''
      }
    },
    computed: {
      isFormValid() {
        return !Object.keys(this.fields).some(key => !this.fields[key].valid)
      },
      paragraphs() {
        const { description } = this.product

        return description ? description.split(/\r?\n+/) : []
      },
      ...mapState({
        product: state => state.products.product
      })
    },
    created() {
      this.$store.dispatch('products/find', this.$route.params.productId)
    },
    methods: {
      handleCancel() {
        //todo
      },
      productImageSrc(image) {
        if (!image) {
          return null
        }

        if (typeof image === 'number') {
          return UrlBuilder.buildFileUrl(image)
        }

        return image.preview
      }
    }
  }
</script>