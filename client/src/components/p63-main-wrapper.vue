<template>
  <div class="p63-main-wrapper">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">

      <h1 class="navbar-brand text-white">Pokupki63</h1>

      <ul class="nav mr-auto" id="nav-tab">

        <li class="nav-item active">
          <a class="text-light nav-link active" id="nav-catalog-tab" data-toggle="tab" href="#nav-catalog" role="tab" aria-controls="nav-catalog" aria-selected="true">Каталог</a>
        </li>
        <li class="nav-item">
          <a class="text-light nav-link" id="nav-cart-tab" data-toggle="tab" href="#nav-cart" role="tab" aria-controls="nav-cart" aria-selected="false">Корзина</a>
        </li>

        <li v-if="USER.userStatus=='Администратор'" class="nav-item dropdown">
          <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Администратор
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item text-dark nav-link" id="nav-AdminOrders-tab" data-toggle="tab" href="#nav-AdminOrder" role="tab" aria-controls="nav-AdminOrder" aria-selected="false">Выдача заказов</a>
            <a class="dropdown-item text-dark nav-link" id="nav-AddProd-tab" data-toggle="tab" href="#nav-AddProd" role="tab" aria-controls="nav-AddProd" aria-selected="false">Добавление товаров в каталог</a>
          </div>
        </li>

      </ul>

      <p63-auth/> 

    </nav>

    <div class="tab-content" id="nav-tabContent">

      <div class="tab-pane fade show active" id="nav-catalog" role="tabpanel" aria-labelledby="nav-catalog-tab">
        <p63-catalog/>
      </div>
      <div class="tab-pane fade" id="nav-cart" role="tabpanel" aria-labelledby="nav-cart-tab">
        <p63-cart/>
      </div>
      <div class="tab-pane fade" id="nav-AdminOrder" role="tabpanel" aria-labelledby="nav-AdminOrder-tab">
        <p63-issue-order/>
      </div>
      <div class="tab-pane fade" id="nav-AddProd" role="tabpanel" aria-labelledby="nav-AddProd-tab">
        <p63-add-product/>
      </div>

    </div>
  </div>
</template>

<script>
import p63Catalog from './p63-catalog.vue'
import p63Cart from './p63-cart.vue'
import p63AddProduct from './p63-add-product'
import p63IssueOrder from './p63-issue-order'
import p63Auth from './p63-auth.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'main-wrapper',
  components: {
    p63Catalog,
    p63Cart,
    p63AddProduct,
    p63IssueOrder,
    p63Auth
  },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'CART',
      'USER'
    ])
  },
  methods: {
    ...mapActions([
      'DECODING_USER_TOKEN'
    ])
  },
  beforeMount() {
    if (localStorage.token) {
      this.DECODING_USER_TOKEN(localStorage.token)
    }
  },
}
</script>

<style scoped>

</style>
