class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def require_authentication!
    return true if authenticated?
    redirect_to authentication_path(r: request.url)
  end

  def authenticated?
    session[:authenticated] == true
  end

  def authenticate!
    session[:authenticated] = true
  end

end
