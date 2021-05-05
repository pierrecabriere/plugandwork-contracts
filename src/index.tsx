import { PlugandworkApp } from 'plugandwork-toolkit';
import settingsJSON from "../settings.json";
import App from './app';
import PawModel from 'plugandwork-toolkit/dist/models/PawModel';

export default class extends PlugandworkApp {
  static component = App;
  static settings = settingsJSON;
  static icon = require('../public/logo@128.png');

  static handleDoc(doc: PawModel, view: PawModel) {
    return false;
  }

  static async onInstall(view: any) {
    console.log("app installed with view :", view.id);
  }

  static async onUninstall(view: any) {
    console.log("app uninstalled");
  }
}