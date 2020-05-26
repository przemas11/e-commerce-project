<template>
  <div class="product-view">
    <div class="card mb-3" style="max-width: 1000px;">
      <div class="row no-gutters ml-4">
        <div class="row col-md-9" @click="productClicked(product)">
          <div class="product-image">
            <img src="../assets/missing-image.png" class="card-img " alt="produkt">
          </div>

          <div class="col-md-6">
            <div class="card-body text-left">
              <h5 class="card-title"><div class="d-inline" v-if="manage">Nazwa: </div>{{product.name}}</h5>
              <p class="card-text">Cena: {{product.price.toFixed(2)}} zł</p>
              <p class="card-text"><small class="text-muted">Opis: {{product.description}}</small></p>
            </div>
          </div>
        </div>

        <div class="btns-group offset-9 col-2">
          <div class="product-btns" v-if="manage">
            <button type="button" class="btn btn-primary" @click="editProduct">Edytuj produkt</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">Usuń produkt</button>
          </div>

          <div class="product-btns" v-if="!manage">
            <button type="button" class="btn btn-primary" @click="addToCart">Dodaj do koszyka</button>
          </div>
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
      this.$emit('addToCart', this.product)
    },
    productClicked: function () {
      this.$emit('clicked', this.product)
    }
  }
}
</script>

<style scoped>
.card{ margin: 0 auto; }

.product-image{
  width: 150px;
  height: 150px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  overflow: hidden;
}

.card-img img{
  position: absolute;
  max-width: 100%;
  max-height:100%;
  margin-top: auto;
  margin: auto;
}

.btns-group{
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.product-btns{ margin-top: auto; margin-bottom: auto; }

.product-btns>button{ width: 100%; margin-bottom: 6px; }
</style>
