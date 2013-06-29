Page.initializer('wiki/edit', function(page){

  var wiki_page = page.data.wiki_page;

  page.editor = {
    form: page.body.find('.editor form'),
    textarea: page.body.find('.editor textarea'),
    isChanged: function(){
      return this.originalValue !== this.textarea.val();
    },
    save: function() {
      this.form.submit();
    },
    toggleMarkdownCheatsheet: function() {
      page.body.toggleClass('showing-markdown-cheatsheet');
    }
  };
  page.editor.originalValue = page.editor.textarea.val();

  page.draft = {
    key: "wiki_page_draft:"+wiki_page.path,
    val: function() {
      return localStorage[this.key];
    },
    update: function(){
      if (!page.editor.isChanged()) return this;
      console.log('saving draft');
      localStorage[this.key] = page.editor.textarea.val();
      return this;
    },
    clear: function(){
      console.log('clearing draft');
      delete localStorage[this.key];
      return this;
    },
    isPresent: function(){
      return this.key in localStorage;
    },
    isDifferent: function() {
      return page.editor.textarea.val() !== this.val();
    },
    restore: function(){
      if (this.isPresent() && this.isDifferent()){
        console.log('restoring draft');
        page.editor.textarea.val(this.val());
      }
      return this;
    }
  };



  page.body.on('keydown', function(event) {
    if (event.metaKey && String.fromCharCode(event.keyCode) === 'S'){
      event.preventDefault();
      page.editor.save();
    }
  });

  page.body.find('a.show-editor, a.show-markdown-cheatsheet').on('click', function(event){
    event.preventDefault();
    page.editor.toggleMarkdownCheatsheet();
  });

  page.body.find('a.cancel-edit').on('click', function(event){
    page.draft.clear();
  });

  page.editor.form.on('submit', function(){
    page.draft.clear();
  });

  page.editor.textarea.on('keyup', function(){
    page.draft.update();
  });



  if (page.draft.isPresent() && page.draft.isDifferent()){
    if (confirm('You have an unsaved draft. Would you like to restore it?')) page.draft.restore();
  }
  page.editor.textarea.focus();

});
