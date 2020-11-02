import * as React from 'react';
import { PawViewProps, PawConnectedModel, Models } from 'plugandwork-toolkit';
import FolderType from 'plugandwork-toolkit/dist/models/Folder';

import './index.scss';
// Keep it
require('./index.css');

const { Folder } = Models;

interface IExamplesAppProps extends PawViewProps {
  folders: PawConnectedModel<FolderType>;
  settings: any;
}

// @ts-ignore
class ExampleApp extends React.Component<IExamplesAppProps> {
  state = {
    _example: 'Plugandwork - Example app with a connexion to model Folder'
  }

  render() {
    return (
      <div className="example">
        <h1>Example app</h1>
        <ul>
          <li>String from state : {this.state._example}</li>
          <li>String from settings : {this.props.settings.exampleFieldText}</li>
        </ul>
      </div>
    );
  }
}

// @ts-ignore
export default Folder.connect('folders')(ExampleApp) as React.Component;