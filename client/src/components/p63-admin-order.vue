<template>
  <div class="p63-admin-order card text-center card-custom">
    
    <div class="card-body p-2 d-flex flex-row">

      <div class="my-auto mx-5">
        <p class="p63-admin-order__id text-custom">ID заказа:</p>
        <p class="p63-admin-order__id text-custom bg-light align-middle">{{admin_order_data.id}}</p>
      </div>

      <div class="my-auto mx-5">
        <p class="p63-admin-order__user text-custom">Имя пользователя:</p>
        <p class="p63-admin-order__user text-custom bg-light align-middle">{{admin_order_data.userLogin}}</p>
      </div>

      <div class="mx-5">
        <p class="p63-admin-order__product text-custom">Наименование товара:</p>
        <div class="p63-admin-order__product text-custom bg-light"
        v-for="product in admin_order_data.products"
        :key="product.id"
        >
          {{ product.name }}
        </div> 
      </div>

      <div class="mr-5">
        <p class="p63-admin-order__quantity text-custom">Количество:</p>
        <div class="p63-admin-order__product text-custom bg-light"
        v-for="product in admin_order_data.products"
        :key="product.id"
        >
          {{ product.quantity }}
        </div>
      </div>
  
      <button type="button" class="my-auto mr-5 ml-auto p63-admin-order__issue btn btn-dark" 
        v-if="admin_order_data.orderStatus=='Оплачен'"
        @click="issueOrder"
        :disabled="loading"
        >
        Выдать
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      </button>
      <h4 v-else class="my-auto mr-5 ml-auto p63-admin-order__status">Выдан</h4>
    </div>

  </div>
</template>

<script>
export default {
  name: 'p63-admin-order',
  props: {
    admin_order_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {},
  methods: {
    issueOrder () {
      this.loading = true
      this.$emit('changeOrderStatus')
    }
  },
  mounted() {
  
  }
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