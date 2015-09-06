# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exist?(ENV['BUNDLE_GEMFILE'])

require 'rubygems'
require 'capybara'
require 'cucumber'
require 'rspec/expectations'
require 'selenium-webdriver'

$driver = Selenium::WebDriver.for :firefox