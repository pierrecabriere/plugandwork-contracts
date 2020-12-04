import * as React from 'react';
import { PawViewProps, PawConnectedModel, Models, i18nInstance } from 'plugandwork-toolkit';
import { withTranslation, I18nextProvider, } from 'react-i18next';
import FolderType from 'plugandwork-toolkit/dist/models/Folder';

// Locales
import fr from './locales/fr.json'
import en from './locales/en.json'

// Styles
import './index.scss';
// Keep it
require('./index.css');

const { Folder } = Models;

interface IExamplesAppProps extends PawViewProps {
  folders: PawConnectedModel<FolderType>;
  settings: any;
  t: (string: string, opt?: any) => {}
}

class ExampleApp extends React.Component<IExamplesAppProps> {
  state = {
    _example: 'Plugandwork - Example app with a connexion to model Folder'
  }

  componentDidMount() {
    i18nInstance.addResourceBundle('fr', 'translation', fr)
    i18nInstance.addResourceBundle('en', 'translation', en)
  }

  render() {
    const { _example } = this.state;
    const { t, settings } = this.props;

    return (
      <I18nextProvider i18n={i18nInstance}>
        <div className="example-app">
          <h1>Example app</h1>
          <ul>
            <li>String from state : {_example}</li>
            <li>String from settings : {settings.exampleFieldText}</li>
            <li>String from translation : {t('example_app.name')}</li>
          </ul>
        </div>
      </I18nextProvider>
    );
  }
}

// @ts-ignore
export default withTranslation()(Folder.connect('folders')(ExampleApp)) as React.Component;