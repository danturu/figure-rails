BowerRails.configure do |bower_rails|
  bower_rails.install_before_precompile = true
  bower_rails.resolve_before_precompile = true
  bower_rails.clean_before_precompile   = false
end
