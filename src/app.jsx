import * as React from 'react';
import { models } from '@plugandwork/core-ui';
import './index.css';

class ExampleApp extends React.Component {
  render() {
    return (
      <main className="max-w-3xl mx-auto py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1>Hello world !</h1>
        {this.props.docs.loading ? 'Chargement ...' : `${this.props.docs.list.length} docs`}
      </main>
    );
  }
}

export default models.Doc.connect('docs', { init: true })(ExampleApp);
