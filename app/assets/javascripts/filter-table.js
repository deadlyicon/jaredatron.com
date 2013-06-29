
$(document).on('change keyup', '[data-filter-table]', function(event) {

  var input   = $(this)
  var strings = input.val().toLowerCase().split(/\s+/)
  var table   = $(input.data('filter-table'));
  var trs     = table.find('> tbody > tr');

  trs.each(function() {
    var tr = $(this);
    var text = tr.text().toLowerCase();
    for (var i = strings.length - 1; i >= 0; i--) {
      if (text.indexOf(strings[i]) === -1){
        tr.hide();
        return;
      }
    };
    tr.show();
  });

});
