class WikiController < ApplicationController

  def index
    pages = Wiki::Page.all.sort_by{|page|
      [page.last_viewed_at, page.updated_at, page.created_at, page.path]
    }
    @title = "Wiki Pages"
    render :index, locals: {pages:pages}
  end

  def show
    page = find_page
    if page.new_record?
      redirect_to wiki_page_path(page, edit:1)
    else
      page.viewed! unless page.new_record?
      render :show, locals: {page:page}
    end
  end

  def edit
    page = find_page
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

end
