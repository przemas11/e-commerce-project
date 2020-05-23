import Api from '@/services/Api'

export default {
  fetchProducts: function () {
    return Api().get('products').then(response => { return response.data })
      .catch(error => console.log(error))
  },

  addProduct (params) {
    return Api().post('products', params)
      .catch(error => console.log(error))
  }
}
