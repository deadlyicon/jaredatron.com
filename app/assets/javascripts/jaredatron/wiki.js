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

  $(document).on('keydown', function(event){
    if (event.metaKey && event.keyCode === 69) Jaredatron.Wiki.edit();
  });

  $(document).on('dblclick', function(event){
    event.preventDefault();
    Jaredatron.Wiki.edit();
  });

})

Jaredatron.onPage('wiki/edit', function(){

  $(document).on('keydown', function(event){
    if (event.metaKey && event.keyCode === 83){
      event.preventDefault();
      Jaredatron.Wiki.save();
    }
  });

  $(document).on('keydown', '.editor textarea', function(event){
    if (event.metaKey && event.keyCode === 13){
      event.preventDefault();
      Jaredatron.Wiki.save();
    }
  });

  $(document).on('click', 'a.show-markdown-cheatsheet', function(event){
    event.preventDefault();
    Jaredatron.Wiki.toggleMarkdownCheatsheet()
  });

});
