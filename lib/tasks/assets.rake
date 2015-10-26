namespace :assets do
  task :precompile do
    sh "gulp"
  end

  task :watch do
    sh "gulp watch"
  end

  task :reset do
    sh "gulp reset"
  end

  task :clean do
    # noop for Heroku
  end
end
