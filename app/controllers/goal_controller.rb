class GoalController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def show
    goal=Goal.where(goal_category: params[:goal_category], c_uuid: params[:c_uuid])
    render json: goal
      end

  def create
    @goal = Goal.create(goal_params)
    render json: @goal
  end

  def update
    @goal = Goal.find(params[:uuid])
    @goal.update(goal_params)
  end

  def delete
    @goal = Goal.find(params[:id])
    @goal.destroy
  end

  def completed_status
    goal = Goal.find(params[:uuid])
    goal.update(completed: params[:completed])
  end

  private

  def goal_params
    p_uuid = session[:uuid]

    params.require(:goal).permit(:uuid,:goal_name,:goal_category,:points,:due_date,:c_uuid).merge(p_uuid: p_uuid,completed: false)
  end
end
