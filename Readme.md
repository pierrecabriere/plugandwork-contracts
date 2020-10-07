# Examples app
Paw application example.

# Development
## Node app setup

**Clone it outside core application to avoid build conflicts**

```shell
git clone git@code.plugandwork.net:plugandwork.app/examples-app.git
cd examples-app
npm install
npm run-script build
```

After installed, there following scripts are auto-running
- build app (to dist folder)
- compress app (with [compressor file](./compressor.js))

If need, you can add more files and folders to archives by adding it to `files` or `folders` variables into [compressor file](./compressor.js)

## Rails app setup

⚠️⚠️⚠️ When app is zipped go to core server and start it with `rails s` ⚠️⚠️⚠️ 

**need a started server to run api requests**

Into another shell, in core folder do
```shell
bundle exec rake store:install_app

****************************************************************************************************
___Plugandwork frontend apps installer___
****************************************************************************************************
Welcome to development apps installer
What the user_id to link app (default is admin)
5ce414424ac06e5c12769a47 # type user id and/or press Enter

What is the name of the package ? (ex: emails)
examples # type package name and press Enter

What is the mode of the package ? (default is same of name)
# type package mode and/or press Enter

What is the version of the package ? (default: 1.0.0)
# type package version and/or press Enter

What is the type of the package ? (default: view)
# type package type and/or press Enter

What is the absolute path of the package ? (ex: /path/of/package.zip)
path/to/examples_app/examples.zip # type package name and press Enter

Create app
App created with id 5f7db9f0d19554e5a986f120
Publish package
Package published
Active app
App actived
Install app for user example@plugandwork.fr
App installed !
```

**Start the frontend and backend develoment server and show your working app**

## Live reload
After installed app on core server, you can replace as follow inside [package.json of core](https://code.plugandwork.net/plugandwork/core/-/blob/develop/frontend/package.json)

```diff
{
  "dependencies": {
    - "examples": "file:../../relative_path/to/examples-app",
    + "examples": "link:../../relative_path/to/examples-app",
  }
}
```

Then run `yarn` or `npm install`

Now, you can run `npm start` into example app folder to watch changes, then frontend autorefesh !