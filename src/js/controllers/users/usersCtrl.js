app.controller('usersCtrl', function ($scope, $state, usersService, notifyService, $mdDialog) {
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

  $scope.findAll = async function() {
    $scope.loading = true
    const response = await usersService.findAll()
    $scope.users = response.data
    $scope.loading = false
  }

  $scope.findAll()

  $scope.confirmDialog = function(ev, id) {
    const confirm = $mdDialog.confirm()
      .title('Alerta')
      .textContent('Deseja realmente remover este usuário?')
      .targetEvent(ev)
      .ok('Sim')
      .cancel('Cancelar')

    $mdDialog.show(confirm).then(function() {
      $scope.removeUser(id)
    }, function() {
      
    })
  }
  
})