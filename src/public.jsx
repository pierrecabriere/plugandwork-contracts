import * as React from 'react';

// Styles
import './index.scss';
// Keep it
require('./index.css');

class ExampleAppPublic extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello public !</h1>
      </div>
    );
  }
}

export default ExampleAppPublic;