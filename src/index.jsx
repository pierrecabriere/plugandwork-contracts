import React from 'react';
import ReactDOM from "react-dom";
import App from './app';
import PublicApp from './public';
import {lib,utils} from "@plugandwork/core-ui"

const { NODE_ENV } = process.env;

class ExampleApp extends lib.PlugandworkApp {
  static component = App;
  static publicComponent = PublicApp;
  static settings = require("./settings.json");
  static icon = require('./images/logo@128.png');

  static handleDoc(doc, view) {
    return [
      { label: "Action 1", link: `/${doc.id}` },
      { label: "Action 2", onClick: () => alert("Hello World !") },
    ]
  }

  static async onInstall(view) {
    console.log("app installed with view :", view.id);
  }

  static async onUninstall(view) {
    console.log("app uninstalled");
  }
}

if (NODE_ENV === "development") {
  ReactDOM.render(
    <React.StrictMode>
      {React.createElement(utils.ReactEntry, { app: ExampleApp })}
    </React.StrictMode>,
    document.getElementById("root")
  );
}

export default ExampleApp;