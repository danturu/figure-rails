## Development

### Install assets including TypeScript definition files.

`rake assets:install:node`

## Deployment on Heroku.

Read article about [managing multiple environments](https://devcenter.heroku.com/articles/multiple-environments on Heroku.

Push changes to stagging remote:

`git push staging master` or `git push staging BRANCH:master`

### Support Node.js on Heorku.

Override the Heroku default buildpack:

`heroku buildpacks:set https://github.com/ddollar/heroku-buildpack-multi.git`

### Define environment vars:

See `.env.example` for required environment variables.

### Install one of the following plugins:

- MongoDB: MongoLab (default), Compose MongoDB

### Heroku commands to production.

Heroku commands by default goes to the staging app. To run a command on the production app, simply use the `--remote production` option:

`heroku ps --remote production`

### Set staging as a default remote.

`git config heroku.remote staging`

## Share a web service on your local development.

Installation:

`$ npm install -g localtunnel`

Now use the command line app to request a tunnel to your local server:

`$ lt --subdomain figure --port 5000`
