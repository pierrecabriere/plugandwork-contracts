import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import PublicApp from './public';
import { lib, utils } from '@plugandwork/core-ui';
import './index.css';

// keep
require('./index.css');

const { NODE_ENV } = process.env;

class ExampleApp extends lib.PlugandworkApp {
  static component = App;
  static publicComponent = PublicApp;
  static settings = require('./assets/settings.json');
  static icon = require('./assets/logo@128.png').default;

  static handleDoc(doc, view) {
    return [
      { label: 'Action 1', link: `/${doc.id}` },
      { label: 'Action 2', onClick: () => alert('Hello World !') },
    ];
  }

  static async onInstall(view) {
    console.log('app installed with view :', view.id);
  }

  static async onUninstall(view) {
    console.log('app uninstalled');
  }
}

if (NODE_ENV === 'development') {
  try {
    ReactDOM.render(
      <React.StrictMode>
        <div className="h-screen flex overflow-hidden bg-gray-50">
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <div className="bg-white shadow relative z-10">
              <div className="max-w-screen-xl mx-auto flex-shrink-0 flex h-16" />
            </div>
            <main className="flex-1 relative overflow-y-auto focus:outline-none">
              {React.createElement(utils.ReactEntry, { app: ExampleApp })}
            </main>
          </div>
        </div>
      </React.StrictMode>,
      document.getElementById('plugandworkDevRoot')
    );
  } catch (e) {
    console.error(e);
  }
}

export default ExampleApp;
