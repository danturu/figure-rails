namespace :assets do
  namespace :install do
    task :npm do
      system("npm install")
    end

    task :tsd do
      system("tsd install")
    end

    task :all => [:npm, :tsd]
  end
end

Rake::Task["assets:precompile"].enhance ["assets:install:tsd"]
