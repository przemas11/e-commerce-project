/* eslint-disable vue/require-v-for-key */
<template>
  <div class="product-form">
    <div class="form-group">
      <div class="row justify-content-md-center form-inline">
        <div class="dropdown">
          <input type="text" class="form-control" placeholder="Kategoria" v-model="currentCategory" readonly>
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
            Kategoria
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" v-for="category in categories" :key="category.name" @click="selectCategory(category)">{{category.name}}</a>
          </div>
        </div>
      </div>

      <div class="row justify-content-md-center">
        <div class="col-4">
          <label>Nazwa</label>
          <input type="text" class="form-control" placeholder="Nazwa" v-model="productData.name" @keyup.enter="confirm">
        </div>

        <div class="col-2">
          <label>Cena</label>
          <input type="number" class="form-control" placeholder="Cena" v-model="productData.price" @keyup.enter="confirm">
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-6">
          <label>Opis</label>
          <input type="text" class="form-control" placeholder="Opis" v-model="productData.description" @keyup.enter="confirm">
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-6">
          <label>Dostawa</label>
          <input type="text" class="form-control" placeholder="Dostawa" v-model="productData.shipping" @keyup.enter="confirm">
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-2">
          <label>Gwarancja (miesiące)</label>
          <input type="number" class="form-control" placeholder="Miesiące" v-model="productData.warranty" @keyup.enter="confirm">
        </div>
        <div class="col-2">
          <label>Ilość</label>
          <input type="number" class="form-control" placeholder="Ilość" v-model="productData.quantity" @keyup.enter="confirm">
        </div>
      </div>

      <div class="buttons">
        <button type="button" class="btn btn-primary" @click="confirm">Potwierdź</button>
        <button type="button" class="btn btn-primary" @click="cancel">Anuluj</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CategoriesService from '../services/CategoriesService'

export default {
  name: 'ProductForm',
  props: {
    product: {
      name: '',
      price: null,
      description: '',
      shipping: '',
      warranty: null,
      quantity: null,
      category: ''
    }
  },
  data: function () {
    return {
      productData: Vue.util.extend({}, this.product),
      categories: [],
      currentCategory: ''
    }
  },
  methods: {
    confirm: function () {
      this.$emit('confirm', this.productData)
      this.$emit('cancel')
    },
    cancel: function () {
      this.$emit('cancel')
      this.productData.name = ''
      this.productData.price = null
      this.productData.description = ''
      this.productData.shipping = ''
      this.productData.warranty = null
      this.productData.quantity = null
      this.productData.category = ''
      this.currentCategory = ''
    },
    selectCategory: function (category) {
      this.currentCategory = category.name
      this.productData.category = category._id
    },
    getCategories: async function (callbcack) {
      this.categories = await CategoriesService.fetchCategories()
    }
  },
  mounted: async function () {
    await this.getCategories()
  },
  updated: function () {
    this.currentCategory = this.categories.find(x => x._id === this.productData.category).name
  }
}
</script>

<style scoped>
.dropdown input{ margin-right: 30px; }

.form-control{ margin-bottom: 10px; text-align: center; }

.btn{ margin-bottom: 10px; }

.buttons{ margin-top: 30px; }
</style>
