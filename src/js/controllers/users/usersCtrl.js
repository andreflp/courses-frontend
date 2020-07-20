app.controller('usersCtrl', function ($scope, $state, $filter, usersService, notifyService, $mdDialog, reportService, progressBarService) {
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

      await $scope.findAll()
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.findAll = async function() {
    progressBarService.show()
    $scope.loading = true

    const response = await usersService.findAll()
    
    $scope.users = response.data
    $scope.loading = false
    progressBarService.hide()
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

  $scope.usersReport = function() {
    let tableData = {}
    let rows = []
    const cols = ['Nome', 'Telefone', 'Cidade', 'Data Admissão']

    $scope.users.forEach(function(user) {
      const row = [user.name, $filter('phone')(user.phone), user.city, $filter('date')(user.admission_date, 'dd/MM/yyyy')]
      rows.push(row)
    })
    
    tableData.rows = rows
    tableData.cols = cols
    tableData.title = 'Relação de usuários'
    tableData.file = 'usuarios'

    reportService.printPDF(tableData)
    
  }
  
})