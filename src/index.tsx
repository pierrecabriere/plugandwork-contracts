import { PlugandworkApp } from 'plugandwork-toolkit';
import settingsJSON from "../settings.json";
import ExampleApp from './app';

export default class extends PlugandworkApp {
  static component = ExampleApp;
  static settings = settingsJSON;
}
