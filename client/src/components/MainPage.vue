<template>
  <div class="main-page">
    <navbar v-bind:activeIndex='0'/>

    <div id="content">
      <div class="main-content">
        STRONA GŁÓWNA
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
.main-page{ text-align: center; }

#content{ display: flex; }

.main-content{
  width: 100%;
  margin-right: 150px;
  margin-left: 150px;
  background-color: #cacaca;
}
</style>
