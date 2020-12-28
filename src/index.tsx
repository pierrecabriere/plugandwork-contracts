import { PlugandworkApp } from 'plugandwork-toolkit';
import settingsJSON from "../settings.json";
import App from './app';

export default class extends PlugandworkApp {
  static component = App;
  static settings = settingsJSON;
  static icon = require('../public/logo@128.png');

  static async onInstall(view: PawModel) {
    console.log("app installed with view :", view.id);
  }

  static async onUninstall(view: PawModel) {
    console.log("app uninstalled");
  }
}