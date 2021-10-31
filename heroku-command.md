## heroku command list

```bash

heroku create pgfe-admin
heroku create pgfe-server
heroku create pgfe-storefront

heroku buildpacks:add -a pgfe-server heroku/nodejs
heroku buildpacks:add -a pgfe-admin mars/create-react-app
heroku buildpacks:add -a pgfe-storefront heroku/nodejs


heroku buildpacks:add -a pgfe-server https://github.com/lstoll/heroku-buildpack-monorepo -i 1
heroku buildpacks:add -a pgfe-admin https://github.com/lstoll/heroku-buildpack-monorepo -i 1
heroku buildpacks:add -a pgfe-storefront https://github.com/lstoll/heroku-buildpack-monorepo -i 1

heroku config:set -a pgfe-server APP_BASE=packages/server
heroku config:set -a pgfe-admin APP_BASE=packages/admin
heroku config:set -a pgfe-storefront APP_BASE=packages/storefront


git remote add pgfe-server https://git.heroku.com/pgfe-server.git
git remote add pgfe-admin https://git.heroku.com/pgfe-admin.git
git remote add pgfe-storefront https://git.heroku.com/pgfe-storefront.git

git push pgfe-server main
git push pgfe-admin main
git push pgfe-storefront main

heroku apps:open --app pgfe-server

```
