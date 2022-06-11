<template>
  <div class="p63-cart-item card text-center card-custom">
    
    <div class="card-body d-flex flex-row">
      <img v-if="cart_item_data.imageName" class="card-img-top" v-bind:src="`${publicPath}images/${cart_item_data.imageName}`" alt="card image cap">
      <img v-else class="card-img-top" src="@/assets/images/default.jpeg" alt="card image cap">
      <div>
        <p class="p63-cart-item__name text-custom">{{cart_item_data.name}}</p>
        <p class="p63-cart-item__price text-custom">{{cart_item_data.price}} р</p>
      </div>

      <div>
        <p class="text-custom"> Кол-во</p>
          <span class="d-flex flex-row text-custom">
            <span class="text-custom quantity-btn" @click = decrItem>-</span>
            <p class="p63-cart-item__quantity text-custom">{{cart_item_data.quantity}}</p>
            <span class="text-custom quantity-btn" @click = incrItem>+</span>
          </span>
      </div>

      <button type="button" class=" ml-auto p63-catalog-item__add_to-cart__btn btn btn-dark" @click="delToCart">Удалить</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'p63-cart-item',
  props: {
    cart_item_data: {
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
    decrItem() {
      this.$emit('decrement')
    },
    incrItem() {
      this.$emit('increment')
    },
    delToCart () {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
   
  }
}

</script>

<style scoped>
  .card-custom {
    height: 160px;
    width: 31%;
    min-width: 470px;
    background-color: rgba(74, 142, 115, 0.44);
    margin: 1%;
  }
  .text-custom {
    margin: 8px;
  }
  .card-img-top {
    max-width: 136px;
    max-height: 146px;
  }
  .quantity-btn {
    cursor: pointer;
  }
</style>