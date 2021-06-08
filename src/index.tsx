import { PlugandworkApp } from 'plugandwork-toolkit';
import settingsJSON from "../settings.json";
import App from './app';
import PublicApp from './public';
import PawModel from 'plugandwork-toolkit/dist/models/PawModel';

export default class extends PlugandworkApp {
  static component = App;
  static publicComponent = PublicApp;
  static settings = settingsJSON;
  static icon = require('../public/logo@128.png');

  static handleDoc(doc: PawModel, view: PawModel) {
    // returns actions depending on input doc and view.
    // returns false if no action.

    return [
      { label: "Action 1", link: `/${doc.id}` },
      { label: "Action 2", onClick: () => alert("Hello World !") },
    ]
  }

  static async onInstall(view: any) {
    console.log("app installed with view :", view.id);
  }

  static async onUninstall(view: any) {
    console.log("app uninstalled");
  }
}