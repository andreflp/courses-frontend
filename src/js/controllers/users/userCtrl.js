app.controller('userCtrl', function ($scope, $stateParams, $state, $filter, usersService, notifyService) {
  $scope.id = $stateParams.id

  $scope.page = $scope.id ? $scope.page = "Editar" : $scope.page = "Novo"

  $scope.findById = async function(id) {
    return usersService.findById(id)
  }

  if($stateParams.id) {
    $scope.findById($stateParams.id).then(response => {
      response.data.admission_date =  $filter('date')(response.data.admission_date, 'dd/MM/yyyy')
      $scope.user = response.data
    })
  }
 
  $scope.saveUser = async function(user) {
    if($scope.id) {
      $scope.save(user)
    } else {
      $scope.update(user)
    }
  }

  $scope.save = async function(user) {
    try {
      if($scope.userForm.$invalid) return
      const date = $scope.formatDate(user.admission_date)
      user.admission_date = date
      await usersService.save(user)
      delete $scope.user
      $scope.userForm.$setPristine()
      notifyService.showSuccess('Salvo com sucesso!')
      $state.go('users')
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.update = async function(user) {
    try {
      if($scope.userForm.$invalid) return
      user.admission_date = $scope.formatDate(user.admission_date)
      await usersService.update(user)
      delete $scope.user
      $scope.userForm.$setPristine()
      notifyService.showSuccess('Salvo com sucesso!')
      $state.go('users')
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.formatDate = function(date) {
    const splitedDate = date.split('/')
    const day = splitedDate[0]
    const month = splitedDate[1]
    const year = splitedDate[2]

    return `${year}-${month}-${day}`
  }

})