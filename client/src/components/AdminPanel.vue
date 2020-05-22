<template>
  <div class="admin-panel">
    <navbar/>

    <div id="content">
      <div class="main-content">
        <div class="form-group">
          <label>Zaloguj się</label>
          <input type="login" class="form-control" id="login-input" placeholder="Login">
          <input type="password" class="form-control" id="password-input" placeholder="Password">
          <button type="button" class="btn btn-primary">Zaloguj</button>
        </div>
      </div>
    </div>
    <my-footer/>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel'
}
</script>

<style scoped>
.main-page{ text-align: center; }

#content{ display: flex; }

.main-content{
  width: 100%;
  margin-right: 150px;
  margin-left: 150px;
  padding: 100px 0;
  background-color: #f0f0f0;
  border-radius: 15px;
}

.form-group{ margin: auto; width: 400px; }

.form-control{ margin-bottom: 10px; }
</style>
