namespace :assets do
  task :precompile do
    sh "gulp"
  end

  task :clean do
    # noop for Heroku
  end
end
