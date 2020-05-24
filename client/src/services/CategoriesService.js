import Api from '@/services/Api'

export default {
  fetchCategories: function () {
    return Api().get('api/categories')
      .then(response => { return response.data })
      .catch(error => console.log(error))
  },

  addCategory (params) {
    return Api().post('api/categories', params)
      .catch(error => console.log(error))
  },

  editCategory (params) {
    return Api().put('api/categories/' + params._id, params)
      .then(response => { return response.data })
      .catch(error => console.log(error))
  },

  deleteCategory (params) {
    return Api().delete('api/categories/' + params._id)
      .then(response => { return response.data })
      .catch(error => console.log(error))
  }
}
