Rails.application.routes.draw do
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
    end
  end

  get "home"       => "pages#show", as: :home, id: :home
  get "app(*path)" => "pages#show", as: :app,  id: :app

  # authenticated :user do
  #   root to: redirect("app"), as: :authenticated_root, id: :app
  # end

  root to: "pages#show", id: :home
end
