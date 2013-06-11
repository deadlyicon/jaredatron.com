Jaredatron::Application.routes.draw do

  get  'tracking/:type' => 'tracking#new', as: 'tracking'
  post 'tracking/:type' => 'tracking#create'

  match 'authenticate' => 'authentication#authenticate', via: [:get, :post], as: 'authentication'

  scope :wiki do
    get    ''        => 'wiki#index', as: 'wiki'
    get    '(*path)' => 'wiki#edit', as: 'edit_wiki_page', :constraints => lambda{ |req| req.params[:edit].present? }
    get    '(*path)' => 'wiki#show', as: 'wiki_page'
    put    '(*path)' => 'wiki#update'
    delete '(*path)' => 'wiki#destroy'
  end

  root to: 'homepage#show'

end
