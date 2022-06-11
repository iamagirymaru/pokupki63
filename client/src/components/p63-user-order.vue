<template>
  <div class="p63-user-order card text-center card-custom">
    
    <div class="card-body p-2 d-flex flex-row">

      <div class="my-auto mx-5">
        <p class="p63-user-order__id text-custom">ID заказа:</p>
        <p class="p63-user-order__id text-custom bg-light align-middle">{{user_order_data.id}}</p>
      </div>

      <div class="my-auto mx-5">
        <p class="p63-user-order__user text-custom">Имя пользователя:</p>
        <p class="p63-user-order__user text-custom bg-light align-middle">{{user_order_data.userLogin}}</p>
      </div>

      <div class="mx-5">
        <p class="p63-user-order__product text-custom">Наименование товара:</p>
        <div class="p63-user-order__product text-custom bg-light"
        v-for="product in user_order_data.products"
        :key="product.id"
        >
          {{ product.name }}
        </div> 
      </div>

      <div class="mr-5">
        <p class="p63-user-order__quantity text-custom">Количество:</p>
        <div class="p63-user-order__product text-custom bg-light"
        v-for="product in user_order_data.products"
        :key="product.id"
        >
          {{ product.quantity }}
        </div>
      </div>
  
      <h4 class="my-auto mr-5 ml-auto p63-admin-order__status">{{ user_order_data.orderStatus }}</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: 'p63-user-order',
  props: {
    user_order_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
  mounted() {}
}

</script>

<style scoped>
  .card-custom {
    background-color: rgb(119, 166, 130);
    margin: 1%;
  }
  .text-custom {
    margin: 4px;
  }
</style>