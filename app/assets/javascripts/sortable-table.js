SortableTable = {};

SortableTable.comparators = {
  string: function(a,b){
    a = $.trim($(a).text()).toLowerCase();
    b = $.trim($(b).text()).toLowerCase();
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  },
  date: function(a,b){
    a = $(a).data('date');
    b = $(b).data('date');
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  },
};

SortableTable.sort = function(th){
  th = $(th);

  var asc     = th.data('sort_direction') === 'desc';
  var type    = th.data('sort_type') || 'string';
  var table   = th.closest('table.sortable');
  var compare = this.comparators[type];
  var index   = th.index();
  var tbody   = table.find('> tbody');
  var trs     = tbody.find('> tr').get();
  // var tds    = table.find('> tbody > tr > td:nth-child('+(index+1)+')').get();

  th.data('sort_direction', asc ? 'asc' : 'desc');

  trs.sort(function(a,b){
    a = $(a).find('> td:eq('+index+')');
    b = $(b).find('> td:eq('+index+')');
    return compare(a,b);
  });

  if (!asc) trs.reverse();

  tbody.html(trs);

};

$(document).on('click', 'table.sortable > thead > tr > th', function(event){
  event.preventDefault();
  $(this).trigger('sort');
});

$(document).on('sort', 'table.sortable > thead > tr > th', function(){
  SortableTable.sort(this);
});



$(document).bind('ready page:change', function(){
  $('table.sortable > thead > tr > th[data-default_sort]:first').trigger('sort');
});


