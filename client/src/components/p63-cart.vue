<template>
  <div class="p63-cart">
    <ul class="nav nav-pills nav-fill">
      <li class="nav-item active">
        <a class="text-dark nav-link active" id="nav-myCart-tab" data-toggle="tab" href="#nav-myCart" role="tab" aria-controls="nav-myCart" aria-selected="true">Корзина</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" id="nav-myOrderPaid-tab" data-toggle="tab" href="#nav-myOrderPaid" role="tab" aria-controls="nav-myOrderPaid" aria-selected="true">Оплаченные заказы</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" id="nav-myOrderIssued-tab" data-toggle="tab" href="#nav-myOrderIssued" role="tab" aria-controls="nav-myOrderIssued" aria-selected="true">Выданные заказы</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-dark" id="nav-orderAll-tab" data-toggle="tab" href="#nav-orderAll" role="tab" aria-controls="nav-orderAll" aria-selected="true">Все заказы</a>
      </li>
    </ul>

    <div class="tab-content" id="nav-tabContent">
    
      <div class="tab-pane fade show active text-center" id="nav-myCart" role="tabpanel" aria-labelledby="nav-myCart-tab">
        <div class="d-flex flex-wrap">
          <p63-cart-item
          v-for="(item, index) in CART"
          :key="item.id"
          :cart_item_data="item"
          @deleteFromCart="deleteFromCart(index)"
          @increment="increment(index)"
          @decrement="decrement(index)"
          />
        </div>
        <button v-if="CART.length" type="button" class="text-center btn btn-dark" @click="createOrder" :disabled="loading">
          Оплатить
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </button>
      </div>
      <div class="tab-pane fade" id="nav-myOrderPaid" role="tabpanel" aria-labelledby="nav-myOrderPaid-tab">
         <p63-user-order
          v-for="(order) in ordersPayed"
          :key="order.id"
          :user_order_data="order"
          />
      </div>
      <div class="tab-pane fade" id="nav-myOrderIssued" role="tabpanel" aria-labelledby="nav-myOrderIssued-tab">
        <p63-user-order
          v-for="(order) in ordersIssued"
          :key="order.id"
          :user_order_data="order"
          />
      </div>
      <div class="tab-pane fade" id="nav-orderAll" role="tabpanel" aria-labelledby="nav-orderAll-tab">
        <p63-user-order
          v-for="(order) in USER_ORDERS"
          :key="order.id"
          :user_order_data="order"
          />
      </div>

    </div>
  </div>
</template>

<script>
import p63CartItem from './p63-cart-item.vue'
import { mapActions, mapGetters } from 'vuex'
import { withToken, withoutToken } from '../services/api'
import p63UserOrder from './p63-user-order'

export default {
  name: 'p63-cart',
  components: {
    p63CartItem,
    p63UserOrder
  },
  props: {},
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'USER',
      'CART',
      'USER_ORDERS'
    ]),
    ordersPayed: function () {
      return this.USER_ORDERS.filter(order => order.orderStatus === 'Оплачен')
    },
    ordersIssued: function () {
      return this.USER_ORDERS.filter(order => order.orderStatus === 'Выдан')
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM',
      'CLEAR_CART_AFTER_ORDER',
      'GET_PRODUCTS_FROM_API',
      'GET_ORDERS_BY_LOGIN',
      'GET_ALL_ORDERS_FOR_ADMIN'
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    async createOrder() {
      if (this.USER.userLogin) {
        let outOfStock = ''
        this.CART.map(product => {
          if (product.count - product.quantity < 0) {
            outOfStock+=`${[product.name]}: Осталось ${[product.count]} единиц товара\n`
          }
        })
        if(!outOfStock) {
          this.loading = true
          withToken(this.USER.userToken).post('/api/order', {
            products: this.CART
          })
          .then((response) => {
            alert(response.data.message)
            withoutToken().patch('/api/product', {
              products: this.CART
            })
            .then((response) => console.log(response.data.message))
            .catch((e) => console.log(e.response.data.message))
            this.CLEAR_CART_AFTER_ORDER()
            this.loading = false
            this.setUserOrders(this.USER)
            this.GET_PRODUCTS_FROM_API()
            this.GET_ALL_ORDERS_FOR_ADMIN(this.USER.userToken)
          })
          .catch((e) => {
            this.loading = false
            alert(e.response.data.message)
            })
        } else {
          alert(`Заказ не создан.\n${outOfStock}`)
          this.loading = false
        }
      } else {
        alert('Для создания заказа необходимо войти.')
      }
    },
    setUserOrders(user) {
        if (user.userToken) {
          this.GET_ORDERS_BY_LOGIN(user.userToken)
        }
    }
  },
  mounted() {
    this.GET_ORDERS_BY_LOGIN(this.USER.userToken)
  },
}
</script>

<style scoped>
.nav-pills > li > a.active {
    background-color: #29907d !important
}
</style>
