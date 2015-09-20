class WardenFailure < Devise::FailureApp
  def redirect_url
    signin_url
  end

  def respond
    redirect
  end
end
