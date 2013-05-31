module WikiHelper

  def header(page=nil, &block)
    haml_tag :header do
      haml_tag '.path' do
        links = [link_to('wiki', wiki_path)]
        page.path.split('/').inject(nil) do |path, part|
          path = path ? "#{path}/#{part}" : part
          links << link_to(part, wiki_page_path(path))
          path
        end if page
        concat links.join('&nbsp;/&nbsp;').html_safe
      end
      haml_tag '.actions' do
        concat capture(&block) if block_given?
      end
    end
  end

end
