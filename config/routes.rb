Jaredatron::Application.routes.draw do

  get 'focus' => redirect('/wiki/focus'), as: 'focus'

  get  'tracking'       => 'tracking#index', as: 'tracking_root'
  get  'tracking/:type' => 'tracking#new', as: 'tracking'
  post 'tracking/:type' => 'tracking#create'

  match 'authenticate' => 'authentication#authenticate', via: [:get, :post], as: 'authentication'
  get   'unauthenticate' => 'authentication#unauthenticate', as: 'unauthentication'

  scope :wiki do
    get    ''        => 'wiki#index', as: 'wiki'
    get    '(*path)' => 'wiki#edit',  as: 'edit_wiki_page', :constraints => lambda{ |req| req.params[:edit].present? }
    get    '(*path)' => 'wiki#show',  as: 'wiki_page'
    post   '(*path)' => 'wiki#move',                        :constraints => lambda{ |req| req.params[:new_path].present? }
    put    '(*path)' => 'wiki#update'
    delete '(*path)' => 'wiki#destroy'
  end

  root to: 'homepage#show'

end
