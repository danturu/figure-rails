# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

#    class Enginee < Rails::Engine
#      config.app_generators.javascript_engine :coffee
#
#      if config.respond_to?(:annotations)
#        config.annotations.register_extensions("ts") { |annotation| /#\s*(#{annotation}):?\s*(.*)$/ }
#      end
#    end
#
#  module Rails
#    class Engine < ::Rails::Engine
#      config.app_generators.javascript_engine :coffee
#
#      if config.respond_to?(:annotations)
#        config.annotations.register_extensions("coffee") { |annotation| /#\s*(#{annotation}):?\s*(.*)$/ }
#      end
#    end
#  end
# Sprockets.register_engine '.ts', Enginee
