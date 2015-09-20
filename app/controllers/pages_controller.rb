class PagesController < ApplicationController
  layout :determine_layout

  def show
    render "pages/#{params[:id]}"
  end

protected

  def determine_layout
    if %(app).include? params[:id].to_s
      "application"
    else
      "static"
    end
  end
end
