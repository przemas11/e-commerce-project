<template>
  <div class="store">
    <navbar v-bind:activeIndex='1'/>

    <div id="content">
      <ul class="list-group" id="categories">
        <a href="#" class="list-group-item list-group-item-action">Kategoria</a>
        <a href="#" class="list-group-item list-group-item-action">Kategoria</a>
        <a href="#" class="list-group-item list-group-item-action">Kategoria</a>
        <a href="#" class="list-group-item list-group-item-action">Kategoria</a>
        <a href="#" class="list-group-item list-group-item-action">Kategoria</a>
      </ul>

      <div class="main-content">
        SKLEPIK
        <p>test</p>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {}
}
</script>

<style scoped>
.store{ text-align: center; }

#content{ display: flex; }

#categories{
  min-width: 15%;
  padding: 10px 0px;
  margin-left: 150px;
  margin-right: 10px;
}

.main-content{
  width: 100%;
  margin-right: 150px;
  background-color: #cacaca;
}

@media screen and (max-width: 1600px) {
  .categories, .main-content {
    width: 100%;
  }
}
</style>
