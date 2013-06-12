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


Jaredatron.onPage('wiki/show', function(){

  Jaredatron.Metakeydown[69] = function(){ Jaredatron.Wiki.edit(); };

  $(document).on('dblclick', function(event){
    event.preventDefault();
    Jaredatron.Wiki.edit();
  });

})

Jaredatron.onPage('wiki/edit', function(){

  Jaredatron.Metakeydown[83] = function(){ Jaredatron.Wiki.save(); };

  $(document).on('click', 'a.show-markdown-cheatsheet', function(event){
    event.preventDefault();
    Jaredatron.Wiki.toggleMarkdownCheatsheet();
  });

});
