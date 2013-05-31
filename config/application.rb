require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Jaredatron
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.assets.debug = false


    config.app_generators do |c|
      c.test_framework :rspec, :fixture => true, :fixture_replacement => nil
      c.integration_tool :rspec
      c.performance_tool :rspec
    end

  end
end

require 'jaredatron/url_helpers'
