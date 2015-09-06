#Do this before every scenario
Before do
  $stdout.puts 'Browser has started!'
  $driver.get 'http://localhost:4200'
end

#Do this after every scenario
After do
  $driver.quit
  $stdout.puts 'Browser has stopped!'
end
