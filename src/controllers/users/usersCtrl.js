app.controller('usersCtrl', function ($scope) {
  $scope.name = "Users Controller"
  
  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.desserts = [
    { 
      name: "Pitanga",
      calories: 20,
      fat: 21,
      carbs: 25,
      protein: 22,
      sodium: 55,
      calcium: 55,
      iron: 46,
    },
    { 
      name: "Açaí",
      calories: 620,
      fat: 221,
      carbs: 27,
      protein: 32,
      sodium: 75,
      calcium: 75,
      iron: 34,
    },
  ];;
  
  function success() {
    $scope.desserts = [
      { 
        name: "Pitanga",
        calories: 20,
        fat: 21,
        carbs: 25,
        protein: 22,
        sodium: 55,
        calcium: 55,
        iron: 46,
      },
      { 
        name: "Açaí",
        calories: 620,
        fat: 221,
        carbs: 27,
        protein: 32,
        sodium: 75,
        calcium: 75,
        iron: 34,
      },
    ];;
  }
  
  $scope.getDesserts = function () {
    $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
  };
})