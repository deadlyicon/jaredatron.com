//= require_self
//= require_tree ./jaredatron

Jaredatron = {
  controller: $('html').attr('controller'),
  action:     $('html').attr('action'),
  page_name:  $('html').attr('page_name')
};


Jaredatron.onPage = function(){
  var args = [].slice.apply(arguments);
  var handler = args.pop();
  if (args.indexOf(this.page_name) != -1) handler.call();
};
