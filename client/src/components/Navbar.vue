<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <router-link to="/">
        <img src="../assets/aledrogo.png" width="180" class="d-inline-block align-top" alt="aledrogo logo">
      </router-link>
    </a>
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
.navbar{ margin: 10px 150px; border-radius: 15px; }

.navbar-brand{ margin-left: 40px; margin-right: 70px; }

.nav-item{ margin-right: 40px; }
</style>
