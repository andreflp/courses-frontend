app.controller('courseUsersCtrl', function ($scope, $stateParams, $mdDialog, coursesService, usersService, $element, notifyService) {
  $scope.id = $stateParams.id

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  }

  $scope.selected = []

  $scope.clearSearchTerm = function() {
    $scope.searchTerm = '';
  };

  $element.find('input').on('keydown', function(ev) {
    ev.stopPropagation();
  });

  $scope.sortColumn = function (field) {
    $scope.sort = field
    $scope.direction = !$scope.direction
  }

  $scope.removeCourse = async function(idUser) {
    try {
      await coursesService.removeUserCourse($scope.course.id, idUser)
      notifyService.showSuccess('Removido com sucesso!')
      $scope.findAllCourseUsers()
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.updateCourse = async function() {
    try {
      const userIds = [...$scope.userIds, ...$scope.selected]
      $scope.course.userIds = userIds 
      await coursesService.update($scope.course)
      notifyService.showSuccess('Salvo com sucesso!')
      $scope.findAllCourseUsers()
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.findAllUsersToAssociate =  async function() {
    const userIds = $scope.users.map(user => user.id)
    const response = await usersService.findAllToAssociate({ userIds })
    $scope.usersToAssociate = response.data
  }

  $scope.findAllCourseUsers = async function() {
    $scope.loading = true
    const response = await coursesService.findAllCourseUsers($scope.id)
    $scope.users = response.data[0].users
    $scope.course = response.data[0]
    $scope.userIds = response.data[0].users.map(user => user.id)
    $scope.findAllUsersToAssociate()
    $scope.sortColumn('name')
    $scope.loading = false
  }

  $scope.findAllCourseUsers()

  $scope.confirmDialog = function(ev, id) {
    const confirm = $mdDialog.confirm()
      .title('Alerta')
      .textContent('Deseja realmente remover o usuário deste curso?')
      .targetEvent(ev)
      .ok('Sim')
      .cancel('Cancelar')

    $mdDialog.show(confirm).then(function() {
      $scope.removeCourse(id)
    }, function() {
      
    })
  }

})