<template>
  <div class="store">
    <navbar v-bind:activeIndex='1'/>

    <products-list enlarge="true"/>

    <my-footer/>
  </div>
</template>

<script>
import ProductsList from './ProductsList'

export default {
  name: 'MainPage',
  components: {
    'products-list': ProductsList
  },
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>
.store{ text-align: center; }
</style>
