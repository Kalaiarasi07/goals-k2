class ParentController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def add_child
    user =  Child.create(user_params)
    if user.valid?
      render json: {user: user}
    else
      render json: {error: "error"}, status: 409
    end
  end

  def show_children
    parent_uuid = session[:uuid]
    children = Child.where(parent_id: parent_uuid)
    render json: {children: children}
  end

  private
  def user_params
    parent_id = session[:uuid]
    params.permit(:name, :email, :password).merge(parent_id: parent_id)
  end
end
