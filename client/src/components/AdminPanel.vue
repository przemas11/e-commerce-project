<template>
  <div class="admin-panel">
    <navbar/>

    <div id="content">
      <div class="main-content">
        <div class="form-group login-form" v-if="!loggedIn">
          <h1>Zaloguj się</h1>
          <input type="login" class="form-control" placeholder="Login" v-model="loginInput" @keyup.enter="verifyLogin">
          <input type="password" class="form-control" placeholder="Password" v-model="passwordInput" @keyup.enter="verifyLogin">
          <button type="button" class="btn btn-primary" @click="verifyLogin">Zaloguj</button>
        </div>

        <div class="panel" v-if="loggedIn">
          <div class="select-mode" v-if="mode===0">
            <h1 class="display-4">Admin panel</h1>
            <div class="form-group">
              <button type="button" class="btn btn-primary" @click="mode=1">Dodaj nowy produkt</button>
              <button type="button" class="btn btn-secondary" @click="manageProducts">Zarządzaj istniejącymi produkatmi</button>
              <button type="button" class="btn btn-dark" @click="mode=3">Zarządzanie zamówieniami</button>
            </div>
          </div>

          <div class="product-add" v-if="mode===1">
            <h1 class="display-4">Dodawanie nowego produktu</h1>
            <button type="button" class="btn btn-primary" @click="mode=0">Powrót</button>

            <div class="form-group">
              <div class="row justify-content-md-center">
                <div class="col-4">
                  <label>Nazwa</label>
                  <input type="text" class="form-control" placeholder="Nazwa" v-model="newProductName" @keyup.enter="addProduct">
                </div>

                <div class="col-2">
                  <label>Cena</label>
                  <input type="number" class="form-control" placeholder="Cena" v-model="newProductPrice" @keyup.enter="addProduct">
                </div>
              </div>
              <div class="row justify-content-md-center">
                <div class="col-6">
                  <label>Opis</label>
                  <input type="text" class="form-control" placeholder="Opis" v-model="newProductDescription" @keyup.enter="addProduct">
                </div>
              </div>
              <div class="row justify-content-md-center">
                <div class="col-6">
                  <label>Dostawa</label>
                  <input type="text" class="form-control" placeholder="Dostawa" v-model="newProductShipping" @keyup.enter="addProduct">
                </div>
              </div>
              <div class="row justify-content-md-center">
                <div class="col-2">
                  <label>Gwarancja (miesiące)</label>
                  <input type="number" class="form-control" placeholder="Miesiące" v-model="newProductWarranty" @keyup.enter="addProduct">
                </div>
                <div class="col-2">
                  <label>Ilość</label>
                  <input type="number" class="form-control" placeholder="Ilość" v-model="newProductQuantity" @keyup.enter="addProduct">
                </div>
              </div>

              <div class="buttons">
                <button type="button" class="btn btn-primary" @click="addProduct">Dodaj produkt</button>
                <button type="button" class="btn btn-primary" @click="clearInput">Wyczyść pola</button>
              </div>
            </div>
          </div>

          <div class="product-manage" v-if="mode===2">
            <h1 class="display-4">Zarządzanie produktami</h1>
            <button type="button" class="btn btn-primary" @click="mode=0">Powrót</button>

            <div v-for="product in products" :key="product.name">
              <product-view class="product-view" :product="product" :manage="true"/>
            </div>
          </div>

          <div class="orders" v-if="mode===3">
            <h1 class="display-4">Zarządzanie zamówieniami</h1>
            <button type="button" class="btn btn-primary" @click="mode=0">Powrót</button>
          </div>
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import ProductsService from '../services/ProductsService'
import ProductView from './ProductView'

export default {
  name: 'AdminPanel',
  components: {
    'product-view': ProductView
  },
  data: function () {
    return {
      loggedIn: true,
      loginInput: '',
      passwordInput: '',
      mode: 0,
      newProductName: '',
      newProductPrice: null,
      newProductDescription: '',
      newProductShipping: '',
      newProductWarranty: null,
      newProductQuantity: null,
      products: []
    }
  },
  methods: {
    verifyLogin: function () {
      if (this.loginInput === 'admin' && this.passwordInput === 'admin') {
        this.loggedIn = true
        alert('Zalogowano')
      } else {
        alert('Błędne dane logowania')
      }
      this.loginInput = ''
      this.passwordInput = ''
    },

    addProduct: function () {
      if (this.newProductName && this.newProductPrice &&
      this.newProductDescription && this.newProductShipping &&
      this.newProductWarranty && this.newProductQuantity) {
        var pattern = /^\d*$/
        if (pattern.test(this.newProductWarranty) && pattern.test(this.newProductQuantity)) {
          ProductsService.addProduct({
            name: this.newProductName,
            price: this.newProductPrice,
            description: this.newProductDescription,
            shipping: this.newProductShipping,
            warranty: this.newProductWarranty,
            quantity: this.newProductQuantity
          })
          this.clearInput()
        } else {
          alert('Gwarancja lub ilość wypełniona nieprawidłowo')
        }
      } else {
        alert('Proszę wypłenić wszystkie pola')
      }
    },

    getProducts: async function () {
      this.products = await ProductsService.fetchProducts()
    },

    manageProducts: function () {
      this.mode = 2
      this.getProducts()
    },

    clearInput: function () {
      this.newProductName = ''
      this.newProductPrice = null
      this.newProductDescription = ''
      this.newProductShipping = ''
      this.newProductWarranty = null
      this.newProductQuantity = null
    }
  }
}
</script>

<style scoped>
.main-page{ text-align: center; }

#content{ display: flex; }

.main-content{
  width: 100%;
  min-height: 650px;
  margin-right: 150px;
  margin-left: 150px;
  background-color: #f0f0f0;
  border-radius: 15px;
}

.form-control{ margin-bottom: 10px; text-align: center; }

.btn{ margin-bottom: 10px; }

.login-form{ padding-top: 100px; margin: auto; width: 400px; }

.buttons{ margin-top: 30px; }

.panel{ margin-top: 50px; }

h1{ margin-bottom: 20px; }

h1+.btn{ margin-bottom: 30px; }

.product-view{
  margin-bottom: 15px;
}
</style>
