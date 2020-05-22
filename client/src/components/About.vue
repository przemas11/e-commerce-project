<template>
  <div class="about">
    <navbar v-bind:activeIndex='2'/>

    <div id="content">
      <div class="main-content">
        O NAS
        <p>test</p>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'About',
  props: {}
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
  background-color: #cacaca;
}
</style>
