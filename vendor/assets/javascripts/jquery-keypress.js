jQuery.fn.keypress = function(targetKey, handler) {
  targetKey = targetKey.toUpperCase();
  this.on('keydown', function(event){
    var pressedKey = String.fromCharCode(event.keyCode)
    if (pressedKey === targetKey) return handler.apply(this, arguments);
  });
};

jQuery.fn.metakeypress = function(targetKey, handler) {
  this.keypress(targetKey, function(event){
    if (event.metaKey) return handler.apply(this, arguments);
  });
};
