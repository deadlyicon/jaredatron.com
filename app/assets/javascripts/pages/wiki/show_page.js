Page.initializer('wiki/show', function(page){

  page.edit = function(){
    Turbolinks.visit(location.pathname+'?edit=1')
  };

  page.body.metakeypress('e', function(event) {
    page.edit();
  });

  page.body.on('dblclick', function(event){
    event.preventDefault();
    page.edit();
  });

  page.body.on('click', '.move-wiki-page', function(event){
    event.preventDefault();
    var current_path = $(this).data('current_path');
    var new_path = prompt('Move '+current_path, current_path);
    $.post(location.pathname, {new_path:new_path}, function(data){
      Turbolinks.visit(data.new_path_path);
    });
  });

});
