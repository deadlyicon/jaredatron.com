Jaredatron::Application.routes.draw do

  scope :wiki do
    get    ''        => 'wiki#index', as: 'wiki'
    get    '(*path)' => 'wiki#edit', as: 'edit_wiki_page', :constraints => lambda{ |req| req.params[:edit].present? }
    get    '(*path)' => 'wiki#show', as: 'wiki_page'
    put    '(*path)' => 'wiki#update'
    delete '(*path)' => 'wiki#destroy'
  end

end
