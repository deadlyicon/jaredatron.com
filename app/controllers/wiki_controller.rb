class WikiController < ApplicationController

  def index
    pages = Wiki::Page.all.sort_by{|page|
      [page.last_viewed_at, page.updated_at, page.created_at, page.path]
    }
    render :index, locals: {pages:pages}
  end

  def show
    page = find_page
    case
    when params[:edit].present?
      view  = :edit
      @title = "editing: #{path}"
    when page.new_record?
      view  = :not_found
      @title = "not found: #{path}"
    else
      view  = :show
      @title = path
      page.viewed!
    end
    @page_name = "wiki/#{view}"
    render view, locals: {page:page}
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

end
