require File.expand_path("../boot", __FILE__)

require "active_model/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"

Bundler.require(*Rails.groups)

module FigureServer
  class TypeScriptTemplate < Tilt::Template
    self.default_mime_type = "application/javascript"

    def prepare
    end

    def evaluate(scope, locals, &block)
      @output ||= data
    end
  end

  class Application < Rails::Application
    VERSION = "0.1.0"

    # Custom directories with classes and modules you want to be autoloadable.
    config.autoload_paths += [config.root.join("lib")]

    # Custom directories with assets.
    config.assets.paths += [config.root.join("node_modules"), config.root.join("vendor/assets/javascripts/typings")]

    # Configure default locale.
    config.i18n.default_locale = :en

    # Enable locale fallbacks for I18n.
    config.i18n.fallbacks = true

    # Skip validation of locale.
    config.i18n.enforce_available_locales = false

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Enable escaping HTML in JSON.
    config.active_support.escape_html_entities_in_json = true

    # Precompile fonts.
    config.assets.precompile += %w(*.woff2 *.eot *.ttf *.woff *.svg)

    # TypeScript compiling.

    assets.register_engine '.ts', TypeScriptTemplate

    config.annotations.register_extensions("ts") do |annotation|
      /#\s*(#{annotation}):?\s*(.*)$/
    end

    config.browserify_rails.force = ->(file) { File.extname(file) == ".ts" }

    config.browserify_rails.commandline_options = "-p [tsify --module commonjs --target es5 --noImplicitAny --experimentalDecorators --emitDecoratorMetadata] --extension=.ts"

    # Email sending.

    config.action_mailer.default_options = {
      from: "Figure <no-reply@figure-app.com>"
    }

    config.action_mailer.default_url_options = {
      host: ENV["ACTIONMAILER_HOST"]
    }

    config.action_mailer.smtp_settings = {
      address:              "smtp.mandrillapp.com",
      authentication:       "login",
      domain:               "figure-app.com",
      port:                 "587",
      enable_starttls_auto: true,
      password:             ENV["MANDRILL_PASSWORD"],
      user_name:            ENV["MANDRILL_USERNAME"],
    }

    # Browsers only render web fonts served with the appropriate “Access-Control-Allow-Origin” header.

    config.middleware.insert_before 0, "Rack::Cors" do
      allow do
        origins  "*"
        resource "/assets/*", headers: :any, methods: :get
      end
    end
  end
end

module Sprockets::Rails::Helper
  require Rails.root.join("app/helpers/application_helper.rb")
  include ApplicationHelper
end
