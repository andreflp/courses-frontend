app.controller('coursesCtrl', function ($scope, $state, $mdDialog, notifyService, coursesService) {
  $scope.courses = []

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  }

  $scope.edit = function(id) {
    $state.go('courseEdit', { id: id })
  }

  $scope.sortColumn = function (field) {
    $scope.sort = field
    $scope.direction = !$scope.direction
  }

  $scope.removeCourse = async function(id) {
    try {
      await coursesService.remove(id)
      notifyService.showSuccess('Removido com sucesso!')
      $scope.findAll()
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.findAll = function() {
    coursesService.findAll().then(function(courses) {
      $scope.courses = courses.data
    })
  }

  $scope.findAll()


  $scope.confirmDialog = function(ev, id) {
    const confirm = $mdDialog.confirm()
          .title('Alerta')
          .textContent('Deseja realmente remover este curso?')
          .targetEvent(ev)
          .ok('Sim')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
      $scope.removeCourse(id)
    }, function() {
      
    });
  };

})