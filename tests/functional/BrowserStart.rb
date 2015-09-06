require 'rubygems'
require 'selenium-webdriver'

$driver = Selenium::WebDriver.for :firefox

class Initialize

  def selenium_firefox_setUp
    $driver.get 'http://localhost:4200'
  end

  def selenium_stop
    $driver.quit
  end

  def login_with_email
    email_field = $driver.find_element :id => 'email'
    email_field.send_keys 'test@test.com'
    password_field = $driver.find_element :id => 'password'
    password_field.send_keys 'test123@test!'
    sign_in_button = $driver.find_element :css => '.mdl-button--colored'
    sign_in_button.click
  end
end


