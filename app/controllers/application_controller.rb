class ApplicationController < ActionController::Base
  
  helper_method :current_user
  helper_method :logged_in?
  helper_method :parent?
  
  def current_user    
    Parent.find_by(uuid: session[:uuid])  
  end
  
  def parent?
    true if session[:type] === "parent"
  end

  def logged_in?
    !current_user.nil?  
  end

  
end
