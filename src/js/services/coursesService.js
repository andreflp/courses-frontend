app.factory('coursesService', function($http, config) {
  
  const _findAll = function() {
    return $http.get(`${config.baseUrl}/courses`)
  }

  const _findById = function(id) {
    return $http.get(`${config.baseUrl}/courses/${id}`)
  }

  const _save = function(course) {
    return $http.post(`${config.baseUrl}/courses`, course)
  }

  const _update = function(course) {
    return $http.put(`${config.baseUrl}/courses`, course)
  }

  const _remove = function(id) {
    return $http.delete(`${config.baseUrl}/courses/${id}`)
  }
  

  return {
    findAll: _findAll,
    findById: _findById,
    save: _save,
    update: _update,
    remove: _remove
  }

})