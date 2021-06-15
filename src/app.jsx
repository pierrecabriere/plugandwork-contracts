import * as React from 'react';
import {models} from "@plugandwork/core-ui";

// Styles
import './index.scss';
// Keep it
require('./index.css');

class ExampleApp extends React.Component {
  render() {
    return (
      <main>
        <h1>Hello world !</h1>
        {this.props.docs.loading ? "Chargement ..." : `${this.props.docs.list.length} docs`}
      </main>
    );
  }
}

export default models.Doc.connect('docs', { init: true })(ExampleApp);