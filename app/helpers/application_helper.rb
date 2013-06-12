require 'markdown_renderer'

module ApplicationHelper

  def markdown(text)
    MarkdownRenderer.render(text).html_safe
  end

end
