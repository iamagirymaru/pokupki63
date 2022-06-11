<template>
  <div class="p63-user-form d-flex flex-row">
    <h3 class="text-light m-2">{{USER.userLogin}}</h3>
    <button class="btn btn-success mr-2" data-toggle="modal" data-target="#staticUserProfile" type="button">Профиль</button>

    <div class="modal fade" id="staticUserProfile" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticUserProfileLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticUserProfileLabel">Заголовок модального окна</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>Id: {{ USER.userId }}</p>
            <p>Имя пользователя: {{ USER.userLogin }}</p>
            <div>
              Статус: {{ USER.userStatus }}
              <button class="btn btn-dark" @click="changeStatus" :disabled="loading">
                Изменить
                <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
          </div>
        </div>
      </div>
    </div>
    
    <button @click="logoutUser" class="btn btn-danger" type="button">Выйти</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import { withToken } from '../services/api'

  export default {
    name: 'p63-user-form',
    components: {},
    props: {},
    data() {
      return {
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
        'LOGOUT_USER',
        'DECODING_USER_TOKEN',
        'GET_ALL_ORDERS_FOR_ADMIN',
        'CLEAR_ORDERS_BY_ADMIN'
      ]),
      changeStatus() {
        this.loading = true
        withToken(this.USER.userToken).patch('/api/auth/login')
        .then((response) => {
          this.CLEAR_ORDERS_BY_ADMIN()
          localStorage.token = response.data.token
          this.DECODING_USER_TOKEN(response.data.token)
          this.loading = false
          alert(`Смена статуса прошла успешно. Ваш текущий статус: ${this.USER.userStatus}.`)
          this.GET_ALL_ORDERS_FOR_ADMIN(response.data.token)
        })
        .catch((e) => {
          this.loading = false
          console.log(e)
        })
      },
      logoutUser() {
        localStorage.clear()
        this.LOGOUT_USER()
      }
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
