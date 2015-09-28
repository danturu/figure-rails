class Api::V1::FormsController < Api::V1::ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.forms
  end

  def show
    render json: current_user.forms.find(params[:id])
  end

  def create
    render json: current_user.forms.create!(form_params), status: :created
  end

  def update
    form = current_user.forms.find(params[:id]).tap do |event|
      form.update_attributes! form_params
    end

    render json: form
  end

  def destroy
    current_user.forms.find(params[:id]).destroy

    head :no_content
  end

protected

  def form_params
    params.require(:form).permit :name
  end
end
