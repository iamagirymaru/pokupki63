<template>
  <div class="p63-catalog-item card text-center card-custom">
    
    <div class="card-body">
      <img v-if="product_data.imageName" class="card-img-top" v-bind:src="`${publicPath}images/${product_data.imageName}`" alt="card image cap">
      <img v-else class="card-img-top" src="@/assets/images/default.jpeg" alt="card image cap">
      <p class="p63-catalog-item__name text-custom">{{product_data.name}}</p>
      <p class="p63-catalog-item__price text-custom">{{product_data.price}} р</p>
      <button type="mt-auto button" class="p63-catalog-item__add_to-cart__btn btn btn-dark" @click="addToCart">В корзину</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'p63-catalog-item',
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  computed: {},
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data)
    }
  }
}

</script>

<style scoped>
  .card-custom {
    height: 360px;
    width: 18%;
    min-width: 190px;
    background-color: rgba(74, 142, 115, 0.44);
    margin: 3.5%;
  }
  .text-custom {
    margin: 10px;
  }
  .card-img-top {
    min-width: 60%;
    min-height: 60%;
  }
</style>
