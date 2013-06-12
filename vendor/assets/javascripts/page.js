// Page is designed to work with Turbolinks

Page = {
  on: function(events, fn){
    $(this).on(events, fn);
    return this;
  },

  trigger: function(type, data){
    $(this).trigger(type, data);
    return this;
  },

  change: function(page_names, callback){
    page_names = page_names.split(/,\s*/)
    return this.on('change', function(event, page_name){
      if (page_names.indexOf(page_name) !== -1)
        return callback.call(this, page_name);
    });
  }
};


$(document).bind('ready page:change', function(){
  Page.body       = $('body');
  Page.controller = Page.body.attr('controller');
  Page.action     = Page.body.attr('action');
  Page.name       = Page.body.attr('page_name');
  Page.trigger('change', Page.name);
});
