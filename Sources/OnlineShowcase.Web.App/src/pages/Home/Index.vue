<template>
  <v-layout>
    <div class="women-product">
      <div class="grid-product">
        <div class="product-grid edit-element">
          <div class="content_box">
            <Link to="products/new">
              <img
                src="../../../static/images/plus.svg"
                class="img-responsive"
                alt="Add new product"
              />
            </Link>
          </div>
        </div>
        <div class="clearfix"> </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
  import VLayout from '@/layouts/Default'

  export default {
    name: 'home-index',
    components: {
      VLayout
    }
  }
</script>
