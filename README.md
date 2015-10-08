## Quick start

With [Bundler](http://bundler.io) and [npm](http://npmjs.org) do:

1. `git clone https://github.com/rosendi/figure-server.git && cd figure-server`

2. `bundle install`

3. `rake assets:install` or `npm install && tsd install`

4. `rake assets:watch` or `gulp watch`

## Assets management using Gulp

Install a package, and any packages that it depends on:

`rake assets:install:npm` is equivalent to `npm install`

Install definitions for TypeScript ([more info](https://github.com/DefinitelyTyped/tsd) how to use TSD package manager):

`rake assets:install:tsd` (runs `tsd install && tsd rebundle`)

Precompile assets (set `NODE_ENV=production` to optimize it):

`rake assets:precompile` (runs `tsd install && tsd rebundle && gulp`)

Precompile assets and recompile it on any changes while developing:

`rake assets:watch` (runs `gulp watch`)

Remove precompiled assets:

`rake assets:reset` (runs `gulp reset`)

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
