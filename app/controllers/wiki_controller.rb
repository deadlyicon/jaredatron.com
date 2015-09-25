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

  def move
    page = find_page
    new_path = params[:new_path]
    if page.new_record? || new_path.blank?
      render nothing: true, status: :bad_request
      return
    end

    page.path = new_path
    page.save!

    if request.xhr?
      render json: {new_path_path: wiki_page_path(page)}
    else
      redirect_to page
    end
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
    Wiki::Page.where(path: path).first_or_initialize
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
