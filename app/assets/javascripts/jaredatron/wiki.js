Jaredatron.Wiki = {

  edit: function(){
    location.search = '?edit=1'
  },

  save: function(){
    $('.editor form').submit();
  },

  markdown_cheatsheet: function() {
    return $('.markdown-cheatsheet');
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

  $(document).on('click', 'a.markdown', function(event){
    event.preventDefault();
    Jaredatron.Wiki.markdown_cheatsheet().toggle();
  });

});
