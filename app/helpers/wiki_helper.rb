module WikiHelper

  def wiki_page_breadcrums(page)
    slash = '&nbsp;/&nbsp;'.html_safe
    haml_tag '.path' do
      links = []
      page.path.split('/').inject(nil) do |path, part|
        path = path ? "#{path}/#{part}" : part
        links << link_to(part, wiki_page_path(path))
        path
      end if page
      concat slash
      concat links.join(slash).html_safe
    end
  end

  # - tree Wiki::Page::Tree.new.root
  def tree(parent)
    haml_tag('ul.wiki-pages-tree') do
      parent.each do |name, child|
        haml_tag('li') do
          concat link_to name, wiki_page_path(child.path)
          tree(child)
        end
      end
    end
  end

  def link_to_delete_wiki_page(content, page)
    link_to content, wiki_page_path(page), method: 'DELETE', confirm: 'Are you sure?'
  end

end
