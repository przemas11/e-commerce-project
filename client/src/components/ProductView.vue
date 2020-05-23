<template>
  <div class="product-view">
    <div class="card mb-3" style="max-width: 1000px;">
      <div class="row no-gutters ml-4">
        <div class="col-md-2 product-image">
          <img src="../assets/missing-image.png" class="card-img" alt="produkt">
        </div>

        <div class="col-md-6 ml-5">
          <div class="card-body text-left">
            <h5 class="card-title">{{product.name}}</h5>
            <p class="card-text">{{product.description}}</p>
            <p class="card-text">Cena: {{product.price.toFixed(2)}}</p>
          </div>
        </div>

        <div class="management-btns col-md-2" v-if="manage">
          <button type="button" class="btn btn-primary" @click="edit=true">Edytuj produkt</button>
          <button type="button" class="btn btn-danger" @click="addProduct">Usuń produkt</button>
        </div>
        <!-- <div class="col-md-1 add-to-cart">
          Do koszyka
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  props: {
    product: Object,
    manage: false
  },
  data: function () {
    return {
      edit: false
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

.management-btns{ margin-top: auto; margin-bottom: auto; }

.management-btns>button{ width: 100%; margin-bottom: 6px; }

/* .add-to-cart{

} */
</style>
