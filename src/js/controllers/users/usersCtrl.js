app.controller('usersCtrl', function ($scope, $state, usersService, notifyService) {
  $scope.users = []

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  }

  $scope.edit = function(id) {
    $state.go('userEdit', { id: id })
  }

  $scope.sortColumn = function (field) {
    $scope.sort = field
    $scope.direction = !$scope.direction
  }

  $scope.removeUser = async function(id) {
    try {
      await usersService.remove(id)
      notifyService.showSuccess('Removido com sucesso!')
      $scope.findAll()
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.findAll = function() {
    usersService.findAll().then(function(users) {
      $scope.users = users.data
    })
  }

  $scope.findAll()
  
})

  // $scope.teste = function(id) {
  //   $state.go('userEdit', { id: id })
  // }