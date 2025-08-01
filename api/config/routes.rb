Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :links, only: [:create, :update, :destroy]
      resources :categories, only: [:index] 
    end
  end
  get "up" => "rails/health#show", as: :rails_health_check

end
