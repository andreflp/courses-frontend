app.factory('usersService', function($http, config) {

  const _findAll = function() {
    return $http.get(`${config.baseUrl}/users`)
  }

  const _findAllToAssociate = function(userIds) {
    return $http.get(`${config.baseUrl}/users/associate`, { params: userIds })
  }

  const _findById = function(id) {
    return $http.get(`${config.baseUrl}/users/${id}`)
  }

  const _save = function(user) {
    return $http.post(`${config.baseUrl}/users`, user)
  }

  const _update = function(user) {
    return $http.put(`${config.baseUrl}/users`, user)
  }

  const _remove = function(id) {
    return $http.delete(`${config.baseUrl}/users/${id}`, )
  }

  return {
    findAll: _findAll,
    findById: _findById,
    findAllToAssociate: _findAllToAssociate,
    save: _save,
    update: _update,
    remove: _remove
  }
  
})