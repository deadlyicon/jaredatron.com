class WikiController < ApplicationController

  before_filter :require_authentication!
  before_filter :correct_url, only: [:show, :edit]

  def index
    pages = Wiki::Page.all
    @title = "Wiki Pages"
    render :index, locals: {pages:pages}
  end

  def show
    page = find_page
    if page.new_record?
      redirect_to wiki_page_path(page, edit:1)
    else
      page.viewed!
      render :show, locals: {page:page}
    end
  end

  def edit
    page = find_page
    page.content ||= "# #{page.path.split('/').last.gsub(/[-_]/,' ').humanize}\n\n"
    @title = "editing: #{path}"
    render :edit, locals: {page:page}
  end

  def update
    page = find_page
    page.content = params[:wiki_page][:content]
    page.save!
    redirect_to wiki_page_path(page)
  end

  def destroy
    page = find_page
    page.destroy
    redirect_to wiki_path
  end

  private

  def path
    params[:path]
  end

  def find_page
    Wiki::Page.find_or_initialize_by_path(path)
  end

  def correct_url
    currected_path = path.downcase.gsub(/\s+/,'-')
    if path != currected_path
      url = URI.parse(request.url)
      url.path = wiki_page_path(currected_path)
      redirect_to url.to_s
    end
  end

end
