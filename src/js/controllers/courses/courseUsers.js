app.controller('courseUsersCtrl', function ($scope, $stateParams, $mdDialog, coursesService, usersService, $element, $filter, notifyService, reportService, progressBarService) {
  $scope.id = $stateParams.id
  $scope.selected = []
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  }

  $scope.clearSearchTerm = function() {
    $scope.searchTerm = ''
  }

  $element.find('input').on('keydown', function(ev) {
    ev.stopPropagation()
  })

  $scope.sortColumn = function (field) {
    $scope.sort = field
    $scope.direction = !$scope.direction
  }

  $scope.removeCourse = async function(idUser) {
    try {
      progressBarService.show()

      await coursesService.removeUserCourse($scope.course.id, idUser)

      notifyService.showSuccess('Removido com sucesso!')

      await $scope.findAllCourseUsers()
      
      progressBarService.hide()
    } catch (error) {
      progressBarService.hide()
      notifyService.showError('Ops! Algo deu errado.')
      console.log(error)
    }
  }

  $scope.updateCourse = async function() {
    try {
      progressBarService.show()
      const userIds = [...$scope.userIds, ...$scope.selected]
      $scope.course.userIds = userIds 

      await coursesService.update($scope.course)

      notifyService.showSuccess('Salvo com sucesso!')

      await $scope.findAllCourseUsers()

      progressBarService.hide()
    } catch (error) {
      notifyService.showError('Ops! Algo deu errado.')
      progressBarService.hide()
      console.log(error)
    }
  }

  $scope.findAllUsersToAssociate =  async function() {
    progressBarService.show()
    const userIds = $scope.users.map(user => user.id)

    const response = await usersService.findAllToAssociate({ userIds })

    $scope.usersToAssociate = response.data
    progressBarService.hide()
  }

  $scope.findAllCourseUsers = async function() {
    progressBarService.show()
    $scope.loading = true

    const response = await coursesService.findAllCourseUsers($scope.id)
    
    $scope.users = response.data[0].users
    $scope.course = response.data[0]
    $scope.userIds = response.data[0].users.map(user => user.id)
    
    await $scope.findAllUsersToAssociate()

    $scope.sortColumn('name')
    $scope.loading = false
    progressBarService.hide()
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

  $scope.courseUsersReport = function() {
    progressBarService.show()
    let tableData = {}
    let rows = []
    const cols = ['Nome', 'Telefone', 'Cidade', 'Data Admissão']

    $scope.users.forEach(function(user) {
      const row = [user.name, $filter('phone')(user.phone), user.city, $filter('date')(user.admission_date, 'dd/MM/yyyy')]
      rows.push(row)
    })
    
    tableData.rows = rows
    tableData.cols = cols
    tableData.title = `Usuários do curso ${$scope.course.title}`
    tableData.file = 'usuarios-curso'

    reportService.printPDF(tableData)
    progressBarService.hide()
  }
})