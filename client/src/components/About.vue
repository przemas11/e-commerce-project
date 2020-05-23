<template>
  <div class="about">
    <navbar v-bind:activeIndex='2'/>

    <div id="content">
      <div class="main-content display-4">
        Strona zawierająca informacje o sklepie
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about{ text-align: center; }

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
  margin-left: 150px;
  padding: 250px 0;
  background-color: #f0f0f0;
  border-radius: 15px;
}
</style>
