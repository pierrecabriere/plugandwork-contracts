import { PlugandworkApp } from 'plugandwork-toolkit';
import settingsJSON from "../settings.json";
import App from './app';

// @ts-ignore
export default class extends PlugandworkApp {
  static component = App;
  static settings = settingsJSON;
}