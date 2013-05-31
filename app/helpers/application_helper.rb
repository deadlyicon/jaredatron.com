require 'markdown_renderer'

module ApplicationHelper

  def markdown(text)
    MarkdownRenderer.render(text).html_safe
  end

  # def edit_wiki_page_path(page, params={})
  #   wiki_page_path(page, params.merge(edit:1))
  # end

end
