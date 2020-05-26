<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="navbar-brand">
      <router-link to="/">
        <img src="../assets/aledrogo.png" width="180" class="d-inline-block align-top" alt="aledrogo logo">
      </router-link>
    </div>

    <ul class="navbar-nav">
      <li class="nav-item" v-bind:class='{ active: activeIndex === 0 }'>
        <router-link to="/" class="nav-link"><h5>Strona główna</h5></router-link>
      </li>
      <li class="nav-item" v-bind:class='{ active: activeIndex === 1 }'>
        <router-link to="/store" class="nav-link"><h5>Sklep</h5></router-link>
      </li>
      <li class="nav-item" v-bind:class='{ active: activeIndex === 2 }'>
        <router-link to="/about-us" class="nav-link"><h5>O nas</h5></router-link>
      </li>
      <li class="nav-item" v-bind:class='{ active: activeIndex === 3 }'>
        <router-link to="/contact" class="nav-link"><h5>Kontakt</h5></router-link>
      </li>
    </ul>

    <div class="navbar-cart ml-auto">
      <router-link to="/cart">
        <button class="btn btn-outline-success btn-cart" type="cart">Koszyk</button>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    activeIndex: Number
  }
}

</script>

<style scoped>
.navbar{ margin: 10px 150px; border-radius: 15px; min-width: 1080px;}

.navbar-brand{ margin-left: 40px; margin-right: 70px; }

.nav-item{ margin-right: 40px; }

.nav-link{ padding-top: 15px; }

.btn-cart{ padding: 15px 15px; }
</style>
