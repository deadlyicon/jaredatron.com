Jaredatron.Metakeydown = {

};

!function(){
  var lastKeyCode;
  $(window).bind('keydown',function(event){
    console.log(lastKeyCode, event.keyCode);
    var keyCode = (
      lastKeyCode  == 91 && event.keyCode !== 91 ? event.keyCode :
      lastKeyCode !== 91 && event.keyCode  == 91 ? lastKeyCode   : undefined
    );
    lastKeyCode = event.keyCode;
    if (!keyCode) return;
    console.log(keyCode);
    if (keyCode in Jaredatron.Metakeydown){
      event.preventDefault();
      lastKeyCode = 91;
      Jaredatron.Metakeydown[keyCode]();
      return false;
    }
  });
}();
