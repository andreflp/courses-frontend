app.factory('coursesService', function($http, config) {
  
  const _findAll = function() {
    return $http.get(`${config.baseUrl}/courses`)
  }

  const _findAllCourseUsers = function(id) {
    return $http.get(`${config.baseUrl}/courses/${id}/users`)
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

  const _updatePartial = function(course) {
    return $http.patch(`${config.baseUrl}/courses`, course)
  }

  const _remove = function(id) {
    return $http.delete(`${config.baseUrl}/courses/${id}`)
  }

  const _removeUserCourse = function(idCourse, idUser) {
    return $http.delete(`${config.baseUrl}/courses/${idCourse}/${idUser}`)
  }
  

  return {
    findAll: _findAll,
    findById: _findById,
    save: _save,
    update: _update,
    updatePartial: _updatePartial,
    remove: _remove,
    removeUserCourse: _removeUserCourse,
    findAllCourseUsers: _findAllCourseUsers
  }

})