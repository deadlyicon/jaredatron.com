function Page(body){
  this.body = $(body);
  this.name = this.body.attr('page_name');
  // prevent double initialization
  if (Page.current && Page.current.name === this.name) return Page.current;
  this.data = this.body.find('.page-data').data('data') || {};
  var initializer = Page.initializers[this.name];
  if (initializer) initializer(this);
}

Page.initializers = {};
Page.initializer = function(name, initializer) {
  Page.initializers[name] = initializer;
};

Page.prototype.on = function(events, fn){
  $(this).on(events, fn);
  return this;
};

Page.prototype.trigger = function(type, data){
  $(this).trigger(type, data);
  return this;
};

$(document).bind('page:change', function(){
  page = Page.current = new Page(document.body);
});
