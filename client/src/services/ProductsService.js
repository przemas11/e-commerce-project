import Api from '@/services/Api'

export default {
  fetchProducts () {
    return Api().get('products')
  },

  addProduct (params) {
    return Api().post('products', params)
  }
}
