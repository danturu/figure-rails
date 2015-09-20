class SandboxEmailInterceptor
  def self.delivering_email(message)
    message.to      = ENV["SANDBOX_EMAIL"]
    message.subject = "#{message.to} #{message.subject}"
  end
end
