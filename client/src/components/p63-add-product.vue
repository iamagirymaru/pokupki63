<template>
  <div class="p63-add-product">
    <h1 class="text-center m-5">Добавление нового товара</h1>
    <form class="p63-add-product__form m-auto p-3" @submit.prevent="addProduct">
      <div class="d-flex flex-row">
        <img v-if="!imagePreview" class="p63-add-product__img" src="@/assets/images/default.jpeg" alt="prodImg">
        <img v-else class="p63-add-product__img" :src="imagePreview" alt="prodImg">

        <div>
          <div class="p63-add-product__form__name form-group">
            <label for="inputName">Название товара</label>
            <input class="form-control" id="inputName" required v-model="product.name">
          </div>
          <div class="p63-add-product__form__count form-group">
            <label for="inputCount">Количество товара на складе</label>
            <input class="form-control" id="inputCount" required v-model="product.count">
          </div>
          <div class="p63-add-product__form___price form-group">
            <label for="inputPrice">Цена товара, руб</label>
            <input type="number" class="form-control" id="inputPrice" required v-model="product.price">
          </div>
          <div class="p63-add-product__form__set-img form-group custom-file mt-3">
            <input accept="image/jpeg,image/png" type="file" class="custom-file-input" id="imageInput" ref="imageInput" v-on:change="handleFileUpload()">
            <label class="custom-file-label" for="imageInput">Выбрать изображение</label>
          </div>
          
          <button type="submit" class="btn btn-dark text-center mt-3" :disabled="loading">
            Добавить
            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          </button>  
        </div>
      </div>
      
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import { withTokenAndFile } from '../services/api'

export default {
  name: 'p63-add-product',
  props: {},
  data() {
    return {
      loading: false,
      product: {
        name: '',
        count: '',
        price: ''
      },
      image: '',
      imagePreview: ''
    }
    
  },
  computed: {
    ...mapGetters([
      'USER'
    ])
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API'
    ]),

    handleFileUpload(){
      this.image = this.$refs.imageInput.files[0]

      const reader = new FileReader()
       reader.onload = () => {
        this.imagePreview = reader.result
      }
      
      reader.readAsDataURL(this.image)
    },
    addProduct() {
      this.loading = true
      
      const formData = new FormData()

      if (this.image) {
       formData.append('image', this.image)
      }

      formData.append('name', this.product.name)
      formData.append('count', this.product.count)
      formData.append('price', this.product.price)

      
      
      withTokenAndFile(this.USER.userToken)
        .post('/api/product', formData)
        .then((res) => {
          this.loading = false
          alert(res.data.message)
          this.GET_PRODUCTS_FROM_API()
        })
        .catch((e) => {
          this.loading = false
          alert(e.response.data.message)
        })
        this.product.name = this.product.count = this.product.price = this.image = this.imagePreview = ''
    }
  }
}
</script>

<style scoped>
  .p63-add-product__img {
    max-width: 250px;
    max-height: 250px;
    margin: 20px;
  }
  .p63-add-product__form {
    max-width: 50%;
    background-color: #29907d !important
  }
</style>
