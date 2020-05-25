<template>
  <div class="product-view">
    <div class="card mb-3" style="max-width: 1000px;">
      <div class="row no-gutters ml-4">
        <div class="col-md-2 product-image">
          <img src="../assets/missing-image.png" class="card-img" alt="produkt">
        </div>

        <div class="col-md-6 ml-5">
          <div class="card-body text-left">
            <h5 class="card-title"><div class="d-inline" v-if="manage">Nazwa: </div>{{product.name}}</h5>
            <p class="card-text">Cena: {{product.price.toFixed(2)}} zł</p>
            <!-- <p class="card-text"><div class="d-inline" v-if="manage">Kategoria: </div>{{product.catString}}</p> -->
            <p class="card-text"><small class="text-muted">Opis: {{product.description}}</small></p>
          </div>
        </div>

        <div class="product-btns col-2 offset-1" v-if="manage">
          <button type="button" class="btn btn-primary" @click="editProduct">Edytuj produkt</button>
          <button type="button" class="btn btn-danger" @click="deleteProduct">Usuń produkt</button>
        </div>

        <div class="product-btns col-2 offset-1" v-if="!manage">
          <button type="button" class="btn btn-primary" @click="addToCart">Dodaj do koszyka</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  props: {
    product: undefined,
    manage: false
  },
  data: function () {
    return {
      edit: false
    }
  },
  methods: {
    editProduct: function () {
      this.$emit('edit', this.product._id)
    },
    deleteProduct: function () {
      this.$emit('delete', this.product._id)
    },
    addToCart: function () {
      this.$emit('addToCart', this.product._id)
    }
  }
}
</script>

<style scoped>
.card{ margin: 0 auto; }

/* .product-image{ position: relative; } */

.product-image>img{
  max-width: 100%;
  max-height:100%;
  width: auto;
  height: auto;
  position: absolute;
  align-self: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.product-btns{ margin-top: auto; margin-bottom: auto; }

.product-btns>button{ width: 100%; margin-bottom: 6px; }

/* .add-to-cart{

} */
</style>
