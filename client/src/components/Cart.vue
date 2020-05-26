<template>
  <div class="cart">
    <navbar/>

    <div id="content">
      <div class="main-content">
        <p class="display-4">Koszyk</p>
        <div v-if="cart.length">
          <div v-for="product in cart" :key="product._id">
            <div class="product text-left">
              <div class="row">
                <h2 class="col-10 offset-1">{{product.name}}</h2>
              </div>
              <div class="row">
                <h2 class="col-4 offset-1">Ilość w koszyku: {{product.inCart}}</h2>
                <h2 class="col-4">Cena: {{product.price}} zł</h2>
                <button type="button" class="btn btn-primary btn-custom" @click="plusOne(product)">+</button>
                <button type="button" class="btn btn-primary btn-custom" @click="minusOne(product)">-</button>
                <button type="button" class="btn btn-danger col-1" @click="deleteProduct(product._id)">Usuń</button>
              </div>
              <div class="row">
                <h4 class="col-10 offset-1">Dostawa: {{product.shipping}}</h4>
              </div>
            </div>
          </div>

          <div class="buttons">
            <button type="button" class="btn btn-primary">Przejdź do płatności</button>
            <button type="button" class="btn btn-primary" @click="clearCart">Wyczyść koszyk</button>
          </div>
        </div>
        <div v-else>
          <h2 class="mt-5">Brak produktów w koszyku</h2>
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data: function () {
    return {
      cart: []
    }
  },
  methods: {
    loadCart: function () {
      var retrievedObject = localStorage.getItem('cart')
      if (retrievedObject) {
        this.cart = JSON.parse(retrievedObject)
      }
    },
    saveCart: function () {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    plusOne: function (product) {
      product.inCart += 1
      this.saveCart()
    },
    minusOne: function (product) {
      if (product.inCart) {
        product.inCart -= 1
        if (product.inCart === 0) {
          this.deleteProduct(product._id)
        } else {
          this.saveCart()
        }
      }
    },
    deleteProduct: function (id) {
      var index = this.cart.findIndex(p => p._id === id)
      this.cart.splice(index, 1)
      this.saveCart()
    },
    clearCart: function () {
      this.cart = []
    }
  },
  mounted: function () {
    this.loadCart()
  }
}
</script>

<style scoped>
.main-page{ text-align: center; }

#content{ display: flex; }

.main-content{
  width: 100%;
  margin-right: 150px;
  margin-left: 150px;
  padding: 50px 0;
  background-color: #f0f0f0;
  border-radius: 15px;
}

.product{
  background-color: #e6e6e6;
  border-radius: 15px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
}

.btn-custom{
  width: 45px;
  margin-right: 20px;
}

.buttons{ margin-top: 50px; }
</style>
