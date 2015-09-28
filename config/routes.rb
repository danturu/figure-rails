Rails.application.routes.draw do
  devise_for :users, skip: [:registrations, :sessions, :passwords]
  as :user do
    get  "signup" => "devise/registrations#new",    as: :signup
    get  "signup" => "devise/registrations#new",    as: :new_user_registration
    post "signup" => "devise/registrations#create", as: :user_registration

    get  "signin" => "devise/sessions#new",     as: :signin
    get  "signin" => "devise/sessions#new",     as: :new_user_session
    post "signin" => "devise/sessions#create",  as: :user_session
    get  "logout" => "devise/sessions#destroy", as: :logout

    get  "password/reset"  => "devise/passwords#new",    as: :reset_password
    get  "password/reset"  => "devise/passwords#new",    as: :new_user_password
    post "password/reset"  => "devise/passwords#create", as: :user_password
    put  "password/reset"  => "devise/passwords#update"
    get  "password/update" => "devise/passwords#edit",   as: :edet_password
    get  "password/update" => "devise/passwords#edit",   as: :edit_user_password
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      def v1_one(name, *actions, **options, &block)
        actions = [:index, :show, :create, :update, :destroy] if actions.empty?
        resource name, options.merge(only: actions), &block
      end

      def v1_many(name, *actions, **options, &block)
        actions = [:index, :show, :create, :update, :destroy] if actions.empty?
        resources name, options.merge(only: actions), &block
      end

      v1_many :forms
    end
  end

  get "home"       => "pages#show", as: :home, id: :home
  get "app(*path)" => "pages#show", as: :app,  id: :app

  authenticated :user do
    root to: redirect("app"), as: :authenticated_root, id: :app
  end

  root to: "pages#show", id: :home
end
