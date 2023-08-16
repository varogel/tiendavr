function buscarProductos() {
    var input = document.getElementById('searchInput');
    var filter = input.value.toUpperCase();
    var containers = document.getElementsByClassName('col-md-3');

    for (var i = 0; i < containers.length; i++) {
      var title = containers[i].getElementsByClassName('titulo-producto')[0];
      if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
        containers[i].style.display = '';
      } else {
        containers[i].style.display = 'none';
      }
    }
  }