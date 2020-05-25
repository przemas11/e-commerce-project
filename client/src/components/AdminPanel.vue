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
            <div class="form-row form-group justify-content-center">
              <button type="button" class="btn btn-primary" @click="mode=1">Dodaj nowy produkt</button>
            </div>
            <div class="form-row form-group justify-content-center">
              <button type="button" class="btn btn-info" @click="manageProducts">Zarządzaj istniejącymi produkatmi</button>
            </div>
            <div class="form-row form-group justify-content-center">
              <button type="button" class="btn btn-secondary" @click="manageCategories">Zarządzaj kategoriami</button>
            </div>
            <div class="form-row form-group justify-content-center">
              <button type="button" class="btn btn-dark" @click="mode=4">Zarządzanie zamówieniami</button>
            </div>
          </div>

          <div v-if="mode===1">
            <h1 class="display-4">Dodawanie nowego produktu</h1>
            <button type="button" class="btn btn-primary" @click="mode=0">Powrót</button>
            <product-form v-on:return="mode=0" :product="product" v-on:confirm="newConfirmed"/>
          </div>

          <div class="product-manage" v-if="mode===2">
            <h1 class="display-4">Zarządzanie produktami</h1>
            <button type="button" class="btn btn-primary" @click="closeManagement">Powrót</button>

            <product-form v-if="edit===true" :product="product" :key="formUpdate" v-on:cancel="edit=false" v-on:confirm="editRequest"/>

            <!-- <div v-for="product in products" :key="product._id">
              <product-view class="product-view" :product="product" v-on:edit="enableEditMode" v-on:delete="deleteRequest" :manage="true"/>
            </div> -->
            <products-list v-on:edit="enableEditMode" v-on:delete="deleteRequest" :key="product" manage="true"/>
          </div>

          <div class="categories" v-if="mode===3">
            <h1 class="display-4">Zarządzenie kategoriami</h1>
            <button type="button" class="btn btn-primary" @click="mode=0">Powrót</button>

            <div class="form-group col-4 offset-4">
              <label>Nazwa kategorii</label>
              <input type="text" class="form-control" placeholder="Nazwa" v-model="category.name" @keyup.enter="confirmNewCategory">
              <button type="button" class="btn btn-primary" @click="confirmNewCategory">Dodaj nową kategorię</button>
            </div>

            <div v-for="category in categories" :key="category.name">
              <div class="form-row form-group justify-content-center">
                <h3>{{category.name}}</h3>
                <button type="button" class="btn btn-danger delete-btn" @click="deleteCategory(category._id)">Usuń</button>
              </div>
            </div>
          </div>

          <div class="orders" v-if="mode===4">
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
import CategoriesService from '../services/CategoriesService'
// import ProductView from './ProductView'
import ProductForm from './ProductForm'
import ProductsList from './ProductsList'

export default {
  name: 'AdminPanel',
  components: {
    // 'product-view': ProductView,
    'product-form': ProductForm,
    'products-list': ProductsList
  },
  data: function () {
    return {
      loggedIn: true,
      loginInput: '',
      passwordInput: '',
      mode: 0,
      edit: false,
      product: {
        name: '',
        price: null,
        description: '',
        shipping: '',
        warranty: null,
        quantity: null,
        category: ''
      },
      category: {
        name: ''
      },
      products: [],
      categories: [],
      formUpdate: 0
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
      if (this.product.name && this.product.price &&
      this.product.description && this.product.shipping &&
      this.product.warranty && this.product.quantity && this.product.category) {
        var pattern = /^\d*$/
        if (pattern.test(this.product.warranty) && pattern.test(this.product.quantity)) {
          ProductsService.addProduct({
            name: this.product.name,
            price: this.product.price,
            description: this.product.description,
            shipping: this.product.shipping,
            warranty: this.product.warranty,
            quantity: this.product.quantity,
            category: this.product.category
          })
          this.clearInput()
        } else {
          alert('Gwarancja lub ilość wypełniona nieprawidłowo')
        }
      } else {
        alert('Proszę wypłenić wszystkie pola')
      }
    },

    editProduct: async function () {
      this.products = await ProductsService.editProduct(this.product)
      this.product = undefined
    },

    deleteProduct: async function () {
      this.products = await ProductsService.deleteProduct(this.product)
      this.clearInput()
    },

    getProducts: async function () {
      this.products = await ProductsService.fetchProducts()
      // for (let product of this.products) {
      //   product.catString = this.categories.find(x => x._id === product.category).name
      // }
    },

    manageProducts: function () {
      this.mode = 2
      this.getCategories()
      this.getProducts()
    },

    manageCategories: function () {
      this.mode = 3
      this.getCategories()
    },

    clearInput: function () {
      this.product.name = ''
      this.product.price = null
      this.product.description = ''
      this.product.shipping = ''
      this.product.warranty = null
      this.product.quantity = null
      this.product.category = ''
    },

    closeManagement: function () {
      this.mode = 0
      this.edit = false
      this.clearInput()
    },

    newConfirmed: function (product) {
      this.product = product
      this.addProduct()
    },

    editRequest: function (product) {
      this.product = product
      this.editProduct()
    },

    enableEditMode: function (productId) {
      this.product = this.products.find(x => x._id === productId)
      if (!this.edit) {
        this.edit = true
      } else {
        this.formUpdate += 1
      }
    },

    deleteRequest: function (productId) {
      this.product = this.products.find(x => x._id === productId)
      this.deleteProduct()
    },

    confirmNewCategory: async function () {
      this.categories = await CategoriesService.addCategory(this.category)
    },
    getCategories: async function () {
      this.categories = await CategoriesService.fetchCategories()
    },
    deleteCategory: async function (catId) {
      var cat = this.categories.find(x => x._id === catId)
      this.categories = await CategoriesService.deleteCategory(cat)
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
  background-color: #dadada;
  border-radius: 15px;
}

.form-control{ margin-bottom: 10px; text-align: center; }

.login-form{ padding-top: 100px; margin: auto; width: 400px; }

.panel{ margin-top: 50px; }

h1{ margin-bottom: 20px; }

h1+.btn{ margin-bottom: 30px; }

/* .product-view{ margin-bottom: 15px; } */

.delete-btn{ margin-left: 25px;}
</style>
