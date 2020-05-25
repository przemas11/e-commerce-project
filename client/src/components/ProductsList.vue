<template>
  <div class="product-list">
    <ul class="list-group" id="categories">
      <h2>Kategorie</h2>
      <div v-for="category in categories" :key="category._id">
        <a class="list-group-item list-group-item-action" @click="showCategory(category)">{{category.name}}</a>
      </div>
      <a class="list-group-item list-group-item-action" @click="showCategory()">Pozostałe produkty</a>
    </ul>

    <div class="main-content">
      <p class="display-4 center-info" v-if="!categorySelected">Wybierz kategorię</p>

      <div class="products-in-category" v-if="categorySelected">
        <p class="display-4 mt-3">{{currentCategoryInfo}}</p>
        <h2 class="mt-5" v-if="products.length===0">Brak produktów w wybranej kateogrii</h2>
        <div class="products-list" v-for="product in products" :key="product._id">
          <a @click="productClicked(product)">
            <product-view class="product-view" :product="product" v-on:edit="enableEditMode" v-on:delete="deleteRequest" :manage="manage"/>
          </a>
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
    manage: false
  },
  data: function () {
    return {
      categories: [],
      categorySelected: false,
      currentCategoryInfo: '',
      products: []
    }
  },
  methods: {
    getCategories: async function () {
      this.categories = await CategoriesService.fetchCategories()
    },
    showCategory: function (category) {
      this.categorySelected = true
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
      console.log(product)
    }
  },
  mounted: function () {
    this.getCategories()
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

.main-content{
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 15px;
  margin-right: 150px;
  min-width: 720px;
}

.center-info{ padding: 200px 0; }

@media screen and (max-width: 1600px) {
  .categories, .main-content {
    width: 100%;
  }
}

#categories{ min-width: 200px;}
</style>