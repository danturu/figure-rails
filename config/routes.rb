Rails.application.routes.draw do
  get "home"       => "pages#show", as: :home, id: :home
  get "app(*path)" => "pages#show", as: :app,  id: :app

  # authenticated :user do
  #   root to: redirect("app"), as: :authenticated_root, id: :app
  # end

  root to: "pages#show", id: :home
end
