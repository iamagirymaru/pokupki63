<template>
  <div>
    <h1 class="text-center mt-5">Каталог</h1>
    <div v-if="PRODUCTS.length" class="p63-catalog d-flex flex-wrap justify-content-start">
      <p63-catalog-item
      v-for="product in PRODUCTS"
      :key="product.id"
      :product_data="product"
      @addToCart="addToCart"
      />
    </div>
    <div v-else class="d-flex justify-content-center my-5">
      <div class="spinner-border text-center" role="status">
      <span class="sr-only">Загрузка...</span>
    </div>
    </div>
    
  </div>
</template>

<script>
  import p63CatalogItem from './p63-catalog-item.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'p63-catalog',
    components: {
      p63CatalogItem
    },
    props: {},
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['PRODUCTS'])
    },
    methods: {
      ...mapActions([
        'GET_PRODUCTS_FROM_API',
        'ADD_TO_CART'
        ]),
      addToCart(data) {
        this.ADD_TO_CART(data)
      }
    },
    mounted() {
      this.GET_PRODUCTS_FROM_API()
    }
  }
</script>

<style scoped>
.p63-catalog {
padding-bottom: 10%;
padding-top: 2%;
padding-left: 10%;
padding-right: 10%;
}
</style>
