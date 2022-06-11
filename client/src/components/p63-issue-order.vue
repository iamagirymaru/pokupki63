<template>
  <div class="p63-issue-order">
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item active">
        <a class="text-dark nav-link active" id="nav-newOrder-tab" data-toggle="tab" href="#nav-newOrder" role="tab" aria-controls="nav-newOrder" aria-selected="true">Новые заказы</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" id="nav-oldOrder-tab" data-toggle="tab" href="#nav-oldOrder" role="tab" aria-controls="nav-oldOrder" aria-selected="true">Выданные заказы</a>
      </li>
    </ul>

    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-newOrder" role="tabpanel" aria-labelledby="nav-newOrder-tab">
        <p63-admin-order
          v-for="(order, index) in ordersPayed"
          :key="order.id"
          :admin_order_data="order"
          @changeOrderStatus="changeOrderStatus(index)"
          />
      </div>

      <div class="tab-pane fade" id="nav-oldOrder" role="tabpanel" aria-labelledby="nav-oldOrder-tab">
        <p63-admin-order
          v-for="(order) in ordersIssued"
          :key="order.id"
          :admin_order_data="order"
          />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import p63AdminOrder from './p63-admin-order.vue'
import { withToken } from '../services/api'

export default {
  name: 'p63-issue-order',
  components: {
    p63AdminOrder
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'ADMIN_ORDERS',
      'USER'
    ]),
    ordersPayed: function () {
      return this.ADMIN_ORDERS.filter(order => order.orderStatus === 'Оплачен')
    },
    ordersIssued: function () {
      return this.ADMIN_ORDERS.filter(order => order.orderStatus === 'Выдан')
    }
  },
  methods: {
    ...mapActions([
      'GET_ALL_ORDERS_FOR_ADMIN'
    ]),
    changeOrderStatus(index) {
      withToken(this.USER.userToken)
        .patch('/api/order', {
          id: this.ordersPayed[index].id
        })
        .then(() => setTimeout(this.GET_ALL_ORDERS_FOR_ADMIN, 1500, this.USER.userToken))
        .catch((e) => console.log(e))
    }
  },
  mounted() {
    if (this.USER.userToken) {
     this.GET_ALL_ORDERS_FOR_ADMIN(this.USER.userToken)
    }
  }
}
</script>

<style scoped>
.nav-pills > li > a.active {
    background-color: #29907d !important;
}
</style>
