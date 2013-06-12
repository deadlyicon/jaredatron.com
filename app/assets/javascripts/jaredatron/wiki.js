Jaredatron.Wiki = {

  edit: function(){
    location.search = '?edit=1'
  },

  save: function(){
    $('.editor form').submit();
  },

  toggleMarkdownCheatsheet: function() {
    $('body').toggleClass('showing-markdown-cheatsheet');
  }

};


Page.change('wiki/show', function(){
  Jaredatron.Metakeydown[69] = function(){
    Jaredatron.Wiki.edit();
  };

  Page.body.on('dblclick', function(event){
    event.preventDefault();
    Jaredatron.Wiki.edit();
  });

  Page.body.on('click', '.move-wiki-page', function(event){
    event.preventDefault();
    var current_path = $(this).data('current_path');
    var new_path = prompt('Move '+current_path, current_path);
    $.post(location.pathname, {new_path:new_path}, function(data){
      Turbolinks.visit(data.new_path_path);
    });
  });
});

Page.change('wiki/edit', function(){
  Jaredatron.Metakeydown[83] = function(){
    Jaredatron.Wiki.save();
  };

  $(document).on('click', 'a.show-markdown-cheatsheet', function(event){
    event.preventDefault();
    Jaredatron.Wiki.toggleMarkdownCheatsheet();
  });

});
