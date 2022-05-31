class ChildController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  # all goals for a child
  def show_goals
    # currently logged in child
    c_uuid = session[:uuid]
    goals = Goal.where(c_uuid: c_uuid)
    render json:{goals: goals, c_uuid: c_uuid}
  end
end
