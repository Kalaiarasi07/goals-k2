Rails.application.routes.draw do
  root 'homepage#index'

  scope path: 'api', as: 'api' do

    post "/parent-login", to: "sessions#parent_login"
    post "/child-login", to: "sessions#child_login"
    post "/signup", to: "sessions#signup"
    post "/logout", to: "sessions#destroy"
    post "/add-child", to: "parent#add_child"
    post "/show-children", to: "parent#show_children"
    post "/show-goals", to: "child#show_goals"
    

  end

  scope path: 'api/v1/goal',as: 'api_v1_goal'do

    post 'show-goal', to:'goal#show'
    post 'create-goal', to:'goal#create'
    post 'deletetask', to:'goal#delete' 
    post 'updatetask', to:'goal#update' 
    post "/completed_status", to: "goal#completed_status"

  end

  get '*path', to: 'react#index', via: :all
end
