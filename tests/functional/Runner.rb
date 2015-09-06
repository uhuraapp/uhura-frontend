require './BrowserStart.rb'

browser = Initialize.new
browser.selenium_firefox_setUp
browser.login_with_email
browser.selenium_stop