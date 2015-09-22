require "tilt"

class TypeScriptTemplate < Tilt::Template
  self.default_mime_type = "application/javascript"

  def prepare
  end

  def evaluate(scope, locals, &block)
    @output ||= data
  end
end

