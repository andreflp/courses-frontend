app.controller('courseCtrl', function ($scope, $state, $stateParams, coursesService, notifyService) {
  $scope.id = $stateParams.id

  $scope.page = $scope.id ? $scope.page = "Editar" : $scope.page = "Novo"

  $scope.findById = async function(id) {
    return coursesService.findById(id)
  }

  if($stateParams.id) {
    $scope.findById($stateParams.id).then(response => {
      $scope.course = response.data
    })
  }
  
  $scope.saveCourse = async function(course) {
    if($scope.id) {
      $scope.update(course)
    } else {
      $scope.save(course)
    }
  }

  $scope.save = async function(course) {
    try {
      if($scope.courseForm.$invalid) return
      await coursesService.save(course)
      delete $scope.course
      $scope.courseForm.$setPristine()
      $scope.courseForm.$setUntouched()
      notifyService.showSuccess('Salvo com sucesso!')
      $state.go('courses')
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.update = async function(course) {
    try {
      if($scope.courseForm.$invalid) return
      await coursesService.update(course)
      delete $scope.course
      $scope.courseForm.$setPristine()
      $scope.courseForm.$setUntouched()
      notifyService.showSuccess('Salvo com sucesso!')
      $state.go('courses')
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }
  
})