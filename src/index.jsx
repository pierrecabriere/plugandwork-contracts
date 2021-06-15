import { PlugandworkApp } from 'plugandwork-toolkit';
import settingsJSON from "../settings.json";
import App from './app';
import PublicApp from './public';

export default class extends PlugandworkApp {
  static component = App;
  static publicComponent = PublicApp;
  static settings = settingsJSON;
  static icon = require('../public/logo@128.png');

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