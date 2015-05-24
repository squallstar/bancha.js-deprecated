(function () {

  function App () {
    init();

    function init() {
      $('select').material_select();
    }
  }

  $(document).ready(function() {
    new App();
  });

})();