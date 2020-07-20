app.factory('notifyService', function($mdToast) {

  const _showSuccess = function(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .action('Fechar')
      .position('top right')
      .highlightAction(true)
      .highlightClass('md-primary')
      .hideDelay(4000))
  }

  const _showError = function(text) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(text)
      .action('Fechar')
      .position('top right')
      .highlightAction(true)
      .highlightClass('md-accent')
      .hideDelay(4000))
  }

  return {
    showSuccess: _showSuccess,
    showError: _showError
  }

})