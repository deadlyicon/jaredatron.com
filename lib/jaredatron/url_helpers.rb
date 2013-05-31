module Jaredatron::UrlHelpers

  # def wiki_page_path(page, params)
  #   "#{wiki_path}/#{page.path}"
  # end

  def edit_wiki_page_path(page, params={})
    wiki_page_path(page, params.merge(edit:1))
  end

end


# this mixes in our meta routes after the routset is cleared
class ActionDispatch::Routing::RouteSet::NamedRouteCollection

  def clear_with_url_helpers
    clear_without_url_helpers
    @module.send :include, Jaredatron::UrlHelpers
    @helpers.push *Jaredatron::UrlHelpers.instance_methods
  end

  alias_method_chain :clear, :url_helpers

end
