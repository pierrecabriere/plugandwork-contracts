# Contracts app
Paw application to manage and sign files in contract.

# Development
## Setup

**Clone it outside core application to avoid build conflicts**

```shell
git clone git@code.plugandwork.net:plugandwork.app/contracts-app.git
cd contracts-app
npm install
npm start
```

Then inside [package.json of core](https://code.plugandwork.net/plugandwork/core/-/blob/develop/frontend/package.json) add the fallowing

```json
{
  "dependencies": {
    "contracts": "link:../../relative_path/to/contracts-app",
  }
}
```

Then run `yarn` or `npm install`

## TODO
Add process to install app to backend

Start the frontend and backend develoment server and show your app