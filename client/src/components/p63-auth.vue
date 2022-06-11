<template>
  <div class="p63-auth">

    <div v-if="USER.userLogin" class="nav-navbar">
      <p63-user-form/>
    </div>

    <div v-else class="nav-navbar">
      <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#staticAuthWin">
        Авторизация
      </button>
      <div class="modal fade" id="spinner-modal">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-body text-center">
                    <h3><i class="fa fa-cog fa-spin"></i> Working...</h3>
                </div>
            </div>
        </div>
      </div>
      <div class="modal fade" id="staticAuthWin" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content modal-custom">

          <div class="modal-header">
            <h5 class="modal-title text-white" id="staticBackdropLabel">Войдите или зарегистрируйтесь</h5>
            <button type="button" ref="btnClose" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body d-flex flex-column h-75 justify-content-center align-items-center">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="text-dark nav-link active" id="signin-tab" data-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Вход</a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="text-dark nav-link" id="signup-tab" data-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false">Регистрация</a>
                </li>
            </ul>
            <div class="tab-content text-center" id="myTabContent">

              <div class="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab" @submit.prevent="authLogin">
                <form class="form-signin">
                  <h1 class="h3 mb-3 font-weight-normal text-white">Вход</h1>
                  <label for="inputlogin" class="sr-only">Login</label>
                  <input type="text" id="inputlogin" class="form-control" placeholder="Login" required autofocus v-model="form.login">
                  <label for="inputPassword" class="sr-only">Password</label>
                  <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="form.password">
                  <br/>
                  <button class="btn btn-lg btn-dark btn-block " type="submit" :disabled="loading">
                    Вход
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    </button>
                </form>
              </div>

              <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab" @submit.prevent="authRegister">
                <form>
                  <h1 class="h3 mb-3 font-weight-normal text-white">Регистрация</h1>
                  <label for="inputloginUp" class="sr-only">Login</label>
                  <input type="text" id="inputloginUp" class="form-control" placeholder="Login" required autofocus v-model="form.login">
                  <label for="inputPasswordUp" class="sr-only">Password</label>
                  <input type="password" id="inputPasswordUp" class="form-control" placeholder="Password" required  v-model="form.password">
                  <label for="inputRepPasswordUp" class="sr-only">Repeat password</label>
                  <input type="password" id="inputRepPasswordUp" class="form-control" placeholder="Repeat password"  v-model="repPassword">
                  <br/>
                  <button class="btn btn-lg btn-dark btn-block" type="submit" :disabled="loading">
                    Регистрация
                    <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>

        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { withToken } from '../services/api'
import { mapActions, mapGetters } from 'vuex'
import p63UserForm from './p63-user-form.vue'

export default {
  name: 'p63-auth',
  components: {
    p63UserForm
  },
  props: {},
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      repPassword: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'USER'
    ])
  },
  methods: {
    ...mapActions([
      'DECODING_USER_TOKEN',
      'GET_ORDERS_BY_LOGIN',
      'GET_ALL_ORDERS_FOR_ADMIN'
    ]),
    authRegister() {
      if (this.form.password == this.repPassword) {
        this.loading = true
        withToken().post('/api/auth/register', {
            login: this.form.login,
            password: this.form.password
          })
          .then((response) => {
            alert(response.data.message), 
            this.loading = false
            })
          .catch((e) => {
            alert(e.response.data.message),
            this.loading = false
            })
    
        this.form.login = this.form.password = this.repPassword = ''
      } else {
        alert('Пароли не совпадают')
        this.form.password = this.repPassword = ''
      }
    },
    authLogin() {
      this.loading = true
      withToken().post('/api/auth/login', {
        login: this.form.login,
        password: this.form.password
      })
      .then((response) => {
        localStorage.token = response.data.token
        this.DECODING_USER_TOKEN(response.data.token)
        alert(response.data.message)
        this.GET_ORDERS_BY_LOGIN(response.data.token)
        this.GET_ALL_ORDERS_FOR_ADMIN(response.data.token)
        this.form.login = this.form.password = ''
        this.$refs.btnClose.click()
        this.loading = false
      })
      .catch((e) => {
        alert(e.response.data.message)
        this.loading = false
      })
    }
  }
}
</script>

<style>
.modal-custom {
      height: 500px;
      background-color: rgb(74, 142, 115);
}
</style>
