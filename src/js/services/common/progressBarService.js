app.factory('progressBarService', function($mdToast) {
  const _show = function() {
    document.getElementById('progress-bar').style.display = "block"
  }

  const _hide = function() {
    setTimeout(() => {
      document.getElementById('progress-bar').style.display = "none"
    }, 700)
  }

  return {
    show: _show,
    hide: _hide
  }

})

