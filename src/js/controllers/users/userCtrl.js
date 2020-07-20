app.controller('userCtrl', function ($scope, $stateParams, $state, $filter, usersService, notifyService, progressBarService) {
  $scope.id = $stateParams.id
  $scope.page = $scope.id ? $scope.page = "Editar" : $scope.page = "Novo"

  $scope.findById = async function(id) {
    return usersService.findById(id)
  }

  if($stateParams.id) {
    progressBarService.show()
    
    $scope.findById($stateParams.id).then(response => {
      response.data.admission_date =  $filter('date')(response.data.admission_date, 'dd/MM/yyyy')
      $scope.user = response.data
      progressBarService.hide()
    })
  }
 
  $scope.saveUser = async function(user) {
    if($scope.id) {
      $scope.update(user)
    } else {
      $scope.save(user)
    }
  }

  $scope.save = async function(user) {
    try {
      if($scope.userForm.$invalid) return

      progressBarService.show()
  
      const date = $scope.formatDate(user.admission_date)
      user.admission_date = date

      await usersService.save(user)
      delete $scope.user

      $scope.userForm.$setPristine()
      $scope.userForm.$setUntouched()

      notifyService.showSuccess('Salvo com sucesso!')
      progressBarService.hide()
      $state.go('users')
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      progressBarService.hide()
      console.log(error)
    }
  }

  $scope.update = async function(user) {
    try {
      if($scope.userForm.$invalid) return

      progressBarService.show()

      user.admission_date = $scope.formatDate(user.admission_date)

      await usersService.update(user)
      delete $scope.user

      $scope.userForm.$setPristine()
      $scope.userForm.$setUntouched()

      notifyService.showSuccess('Salvo com sucesso!')
      progressBarService.hide()
      $state.go('users')
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      progressBarService.hide()
      console.log(error)
    }
  }

  $scope.formatDate = function(date) {
    if($scope.id) {
      const splitedDate = date.split('/')
      const day = splitedDate[0]
      const month = splitedDate[1]
      const year = splitedDate[2]
  
      return `${year}-${month}-${day}`
    } else {
      const day = date.substr(0, 2)
      const month = date.substr(2, 2)
      const year = date.substr(4, 4)

       return `${year}-${month}-${day}`
    }

  }

})