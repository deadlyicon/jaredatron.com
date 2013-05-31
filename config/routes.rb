Jaredatron::Application.routes.draw do

  scope :wiki do
    get    ''        => 'wiki#index', as: 'wiki'
    get    '(*path)' => 'wiki#show', as: 'wiki_page'
    put    '(*path)' => 'wiki#update'
    delete '(*path)' => 'wiki#destroy'
  end

end
