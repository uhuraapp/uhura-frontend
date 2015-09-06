Given(/^a user has an account, with wrong password or email$/) do
  email_field = $driver.find_element :id => 'email'
  email_field.send_keys 'test@test.com'
  password_field = $driver.find_element :id => 'password'
  password_field.send_keys 'test123@test!'
  sign_in_button = $driver.find_element :css => '.mdl-button--colored'
  sign_in_button.click
end

Then(/^the user should see an log in error message$/) do
  sleep 2
  expected_error_message = $driver.find_element :class => 'error-message'
  expected_error_message.equal?'Error: email or password invalid'
end

