<template>
  <div class="contact">
      <navbar v-bind:activeIndex='3'/>

    <div id="content">
      <div class="main-content">
        <p>Adres: ul. Testowa 123, Poznań</p>
        <p>Tel: 123 123 123</p>
        <p>pon.-pt. 8:00-16:00</p>
        <p>E-mail: test@test.pl</p>
        <p></p>
        <p></p>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {}
}
</script>

<style scoped>
.contact{ text-align: center; }

#content{ display: flex; }

#categories{
  min-width: 15%;
  padding: 10px 0px;
  margin-left: 150px;
  margin-right: 10px;
}

.main-content{
  width: 100%;
  font-size: 30px;
  margin-right: 150px;
  margin-left: 150px;
  padding: 200px 0;
  background-color: #f0f0f0;
  border-radius: 15px;
}
</style>
