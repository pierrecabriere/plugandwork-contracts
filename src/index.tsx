import * as React from 'react';
import { PawViewProps, PawConnectedModel, Models } from 'plugandwork-toolkit';
import FolderType from 'plugandwork-toolkit/dist/models/Folder';

import './index.scss';
// Keep it
require('./index.css')

const { Folder } = Models;

interface IExamplesAppProps extends PawViewProps {
  folders: PawConnectedModel<FolderType>;
}

const ExamplesApp: React.FunctionComponent<IExamplesAppProps> = ({ folders, ...rest }) => {
  const [_example, set_example] = React.useState('Plugandwork - Example app with a connexion to model Folder');

  return(
    <div className="example">
      <h1>{_example}</h1>
    </div>
  );
};

// @ts-ignore
export default Folder.connect('folders')(ExamplesApp);
