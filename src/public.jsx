import * as React from 'react';

// Styles
import './index.scss';
// Keep it
require('./index.css');

class ExampleAppPublic extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello contact/public !</h1>
        <p>Contact id is : <strong>{this.props.contact}</strong>, you can now make requests through <strong>@plugandwork/core-ui</strong> models.</p>
      </div>
    );
  }
}

export default ExampleAppPublic;