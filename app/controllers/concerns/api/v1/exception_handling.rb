module Api::V1::ExceptionHandling
  extend ActiveSupport::Concern

  included do
    rescue_from ActionController::ParameterMissing, with: :render_422
    rescue_from Mongoid::Errors::MongoidError,      with: :render_422
    rescue_from Mongoid::Errors::DocumentNotFound,  with: :render_404
  end

protected

  def render_error(object, status)
    errors = object.try(:errors) || object.try(:message) || object.try(:to_s)
    render json: errors.to_json, status: status
  end

  def render_400(ex)
    render_error ex, :bad_request
  end

  def render_401(ex)
    render_error ex, :unauthorized
  end

  def render_404(ex)
    render_error ex, :not_found
  end

  def render_422(ex)
    render_error ex, :unprocessable_entity
  end
end
