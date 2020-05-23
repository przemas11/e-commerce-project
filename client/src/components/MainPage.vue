<template>
  <div class="main-page">
    <navbar v-bind:activeIndex='0'/>

    <div id="content">
      <div class="main-content">
        <p class="display-3">Dzień dobry</p>
        <p class="display-4">Zapraszamy do zakupów w naszym sklepie</p>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
}
</script>

<style scoped>
.main-page{ text-align: center; }

#content{ display: flex; }

.main-content{
  width: 100%;
  margin-right: 150px;
  margin-left: 150px;
  padding: 250px 0;
  background-color: #f0f0f0;
  border-radius: 15px;
}
</style>
