class Api::V1::ApplicationController < ActionController::Metal
  include AbstractController::Rendering
  include AbstractController::Callbacks
  include ActionController::RequestForgeryProtection
  include ActionController::Helpers
  include ActionController::Head
  include ActionController::Redirecting
  include ActionController::Serialization
  include ActionController::StrongParameters
  include ActionController::Rescue
  include ActionController::ConditionalGet
  include ActionController::Rendering
  include ActionController::Renderers::All
  include ActionController::Instrumentation
  include ActionController::ParamsWrapper
  include Devise::Controllers::Helpers
  include Api::V1::ExceptionHandling

  # protect_from_forgery with: :null_session

  wrap_parameters format: [:json]
end
