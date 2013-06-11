class AuthenticationController < ApplicationController

  def authenticate
    if params[:secret].present? && params[:secret] == ENV['JAREDATRON_SECRET']
      session[:authenticated] = true
    end

    if authenticated?
      redirect_to params[:r] || root_path
    else
      render :authenticate
    end
  end

  def unauthenticate
    session.clear
  end

end
