import { withoutToken, withToken } from '../services/api'
import jwt_decode from "jwt-decode";
import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    cart: [],
    user: {
      userId: '',
      userToken: '',
      userLogin: '',
      userStatus: ''
    },
    userOrders: [],
    adminOrders: []
  },
  getters: {
    PRODUCTS(state) {
      return state.products
    },
    CART(state) {
      return state.cart
    },
    USER(state) {
      return state.user
    },
    USER_ORDERS (state) {
      return state.userOrders
    },
    ADMIN_ORDERS (state) {
      return state.adminOrders
    }
  },
  mutations: {
    SET_PRODUCTS_IN_STATE: (state, products) => {
      state.products = products
    },
    SET_CART: (state, product) => {
      let isProductExists = false
      state.cart.map((item) => {
        if (item.id === product.id) {
          isProductExists = true
          item.quantity++
          }
        })
      if((!isProductExists)) {
        product.quantity = 1
        state.cart.push(product)
      }
    },
    REMOVE_FROM_CART: (state, index) => {
      state.cart.splice(index, 1)
    },
    INCREMENT: (state, index) => {
      state.cart[index].quantity++
    },
    DECREMENT: (state, index) => {
      if(state.cart[index].quantity > 1) {
        state.cart[index].quantity--
      }
    },
    SET_USER_DATA: (state, user) => {
      state.user.userId = user.userId
      state.user.userToken = user.token
      state.user.userLogin = user.login
      state.user.userStatus = user.status
    },
    LOGOUT: (state) => {
      state.user.userId = ''
      state.user.userToken = ''
      state.user.userLogin = ''
      state.user.userStatus = ''
      state.userOrders = []
      state.adminOrders = []
      state.cart = []
    },
    CLEAR_CART: (state) => {
      state.cart = []
    },
    SET_USER_ORDERS: (state, orders) => {
      state.userOrders = orders
    },
    SET_ADMIN_ORDERS: (state, orders) => {
      state.adminOrders = orders
    },
    CLEAR_ADMIN_ORDERS: (state) => {
      state.adminOrders = []
    }
  }, 
  actions: {
    GET_PRODUCTS_FROM_API({commit}) {
      return withoutToken().get('/api/product')
      .then((products) => {
        commit('SET_PRODUCTS_IN_STATE', products.data)
        return products
      })
      .catch((e) => {
        console.log(e)
        return e
      })
    },
    ADD_TO_CART({commit}, product, index) {
      commit('SET_CART', product, index)
    },
    DELETE_FROM_CART({commit}, index) {
      commit('REMOVE_FROM_CART', index)
    },
    INCREMENT_CART_ITEM({commit}, index) {
      commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
      commit('DECREMENT', index)
    },
    DECODING_USER_TOKEN({commit}, token) {
      let user = jwt_decode(token, { payload: true })
      user.token = token
      commit('SET_USER_DATA', user)
    },
    LOGOUT_USER({commit}) {
      commit('LOGOUT')
    },
    CLEAR_CART_AFTER_ORDER({commit}) {
      commit('CLEAR_CART')
    },
    GET_ORDERS_BY_LOGIN({commit}, token) {

      withToken(token)
        .get('/api/order/my_orders')
        .then((orders) => commit('SET_USER_ORDERS', orders.data))
        .catch((e) => console.log(e))
    },
    GET_ALL_ORDERS_FOR_ADMIN({commit}, token) {

      withToken(token)
        .get('/api/order')
        .then((orders) => commit('SET_ADMIN_ORDERS', orders.data))
        .catch((e) => console.log(e))
    },
    CLEAR_ORDERS_BY_ADMIN({commit}) {
      commit('CLEAR_ADMIN_ORDERS')
    },
  },
  modules: {
  }
})