import Api from '@/services/Api'

export default {
  fetchProducts: function () {
    return Api().get('api/products')
      .then(response => { return response.data })
      .catch(error => console.log(error))
  },

  addProduct (params) {
    return Api().post('api/products', params)
      .then(response => { return response.data })
      .catch(error => console.log(error))
  },

  editProduct (params) {
    return Api().put('api/products/' + params._id, params)
      .then(response => { return response.data })
      .catch(error => console.log(error))
  },

  deleteProduct (params) {
    return Api().delete('api/products/' + params._id)
      .then(response => { return response.data })
      .catch(error => console.log(error))
  },

  fetchProductsFromCategory (params) {
    return Api().get('api/products/category' + params._id)
      .then(response => { return response.data })
      .catch(error => console.log(error))
  }
}
