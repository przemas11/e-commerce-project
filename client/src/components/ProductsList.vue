<template>
  <div class="product-list">
    <ul class="list-group col-md-2" id="categories">
      <h2>Kategorie</h2>
      <div v-for="category in categories" :key="category._id">
        <a class="list-group-item list-group-item-action" @click="showCategory(category)">{{category.name}}</a>
      </div>
      <a class="list-group-item list-group-item-action" @click="showCategory()">Pozostałe produkty</a>
    </ul>

    <div class="products" v-if="!productView">
      <p class="display-4 center-info" v-if="!categorySelected">Wybierz kategorię</p>

      <div class="products-in-category" v-if="categorySelected">
        <p class="display-4 mt-3">{{currentCategoryInfo}}</p>
        <h2 class="mt-5" v-if="products.length===0">Brak produktów w wybranej kateogrii</h2>
        <div class="products-list" v-for="product in products" :key="product._id">
          <product-view class="product-view" :product="product" @edit="enableEditMode"
          @delete="deleteRequest" @clicked="productClicked" @addToCart="addToCart" :manage="manage"/>
        </div>
      </div>
    </div>

    <div class="col-md-8" v-if="productView">
      <div class="card">
        <div class="card-img-container">
          <img class="card-img-top" src="../assets/missing-image.png" alt="produkt">
        </div>

        <div class="card-body">
          <h1 class="card-title">{{currentProduct.name}}</h1>
          <h4 class="card-text">Opis: {{currentProduct.description}}</h4>
          <h4 class="card-text">Dostawa: {{currentProduct.shipping}}</h4>
          <h4 class="card-text">Gwarancja (miesiące): {{currentProduct.warranty}}</h4>
          <h4 class="card-text">Dostępna ilość: {{currentProduct.quantity}}</h4>
          <div class="btn btn-success" @click="addToCart">Dodaj do koszyka</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsService from '../services/ProductsService'
import CategoriesService from '../services/CategoriesService'
import ProductView from './ProductView'

export default {
  name: 'ProductsList',
  components: {
    'product-view': ProductView
  },
  props: {
    manage: false,
    enlarge: false
  },
  data: function () {
    return {
      categories: [],
      categorySelected: false,
      currentCategoryInfo: '',
      products: [],
      productView: false,
      currentProduct: undefined,
      cart: []
    }
  },
  methods: {
    getCategories: async function () {
      this.categories = await CategoriesService.fetchCategories()
    },
    showCategory: function (category) {
      this.categorySelected = true
      this.productView = false
      this.currentProduct = undefined
      if (category) {
        this.currentCategoryInfo = 'Kategoria ' + category.name
        this.getProductsFromCategory(category.name)
        // this.$router.push({ path: '/' })
      } else {
        this.currentCategoryInfo = 'Pozostałe produkty'
        this.getProductsFromCategory(undefined)
      }
    },
    getProductsFromCategory: async function (catName) {
      if (catName) {
        this.products = await ProductsService.fetchProductsFromCategory(
          this.categories.find(x => x.name === catName))
      } else {
        this.products = await ProductsService.fetchProductsFromCategory({ _id: 'other' })
      }
    },
    enableEditMode: function (productId) {
      this.$emit('edit', productId)
    },
    deleteRequest: function (productId) {
      this.$emit('delete', productId)
    },
    productClicked: function (product) {
      if (this.enlarge) {
        this.productView = true
        this.currentProduct = product
      }
    },
    addToCart: function (product) {
      // get product
      var tempProduct
      if (this.currentProduct) {
        // add product from product view
        tempProduct = this.currentProduct
      } else {
        // add product from product list
        tempProduct = product
      }

      // check if exists in the cart
      var index = this.cart.findIndex(x => x._id === tempProduct._id)
      if (index < 0) {
        // add new product to the cart
        tempProduct.inCart = 1
        this.cart.push(tempProduct)
      } else {
        // increment quantity in cart
        this.cart[index].inCart += 1
      }
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  },
  mounted: function () {
    this.getCategories()

    var retrievedObject = localStorage.getItem('cart')
    if (retrievedObject) {
      this.cart = JSON.parse(retrievedObject)
    }
  }
}
</script>

<style scoped>
.product-list{ display: flex; margin-bottom: 30px; }

#categories{
  min-width: 15%;
  padding: 10px 0px;
  margin-left: 150px;
  margin-right: 10px;
}

.products{
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 15px;
  margin-right: 150px;
  min-width: 720px;
}

.card-img-container{
  width: 500px;
  max-height: 500px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.card-img-container:hover{
  width: 800px;
  max-height: 800px;
}

.card-img-top img{
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  position: relative;
  align-self: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.center-info{ padding: 200px 0; }

@media screen and (max-width: 1600px) {
  .categories, .main-content {
    width: 100%;
  }
}

#categories{ min-width: 200px;}
</style>
