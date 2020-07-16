app.config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/courses');

  const coursesRouter = {
    url: '/courses',
    templateUrl: '/src/view/courses/courses.html',
    controller: 'coursesCtrl'
  }

  const courseEditRouter = {
    url: '/courses',
    templateUrl: '/src/view/courses/courseForm.html',
    controller: 'coursesCtrl'
  }

  const courseRouter = {
    url: '/course',
    templateUrl: '/src/view/courses/courseForm.html',
    controller: 'courseCtrl'
  }

  const usersCourseRouter = {
    url: '/courses/users/:id',
    templateUrl: '/src/view/courses/usersCourse.html',
    controller: 'usersCourseCtrl'
  }

  const usersRouter = {
    url: '/users',
    templateUrl: "/src/view/users/users.html",
    controller: 'usersCtrl'
  }

  const userEditRouter = {
    url: '/users/:id',
    templateUrl: "/src/view/users/userForm.html",
    controller: 'usersCtrl'
  }

  const userRouter = {
    url: '/user',
    templateUrl: '/src/view/users/userForm.html',
    controller: 'userCtrl'
  }

  $stateProvider.state('courses', coursesRouter)
  $stateProvider.state('course', courseRouter)
  $stateProvider.state('courseEdit', courseEditRouter)
  $stateProvider.state('usersCourse', usersCourseRouter)
  $stateProvider.state('users', usersRouter)
  $stateProvider.state('user', userRouter)
  $stateProvider.state('userEdit', userEditRouter)
})