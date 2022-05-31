class SessionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  # SIGN UP
  def signup
    user =  Parent.create(user_params)
    if user.valid?
      session[:uuid] = user.uuid
      session[:type] = "parent"
      render json: {user: user}
    else
      render json: {error: "Email exists already! Try logging in"}, status: 409
    end
  end

  # LOGGING IN
  def parent_login
    user = Parent.find_by(email: params[:email])
    if user  && user.authenticate(params[:password])
      session[:uuid] = user.uuid
      session[:type] = "parent"
      render json: {user: user}
    else
      render json: {error: "*Invalid username or password"}, status:401
    end
  end

  def child_login
    user = Child.find_by(email: params[:email])
    if user  && user.authenticate(params[:password])
      session[:uuid] = user.uuid
      session[:type] = "child"
      render json: {user: user}
    else
      render json: {error: "*Invalid username or password"}, status:401
    end
  end

  #DELETE SESSION OF CURRENT USER
  def destroy
    if session.clear
      render json: {status: "Logged out!"}
    else
      render json: {status: "Error in logging out!"}
    end
  end


  private

  def user_params
    params.permit(:name,:email,:password, :session)
  end

end
